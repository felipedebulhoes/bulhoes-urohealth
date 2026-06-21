import { NOT_ADMIN_ERR_MSG, UNAUTHED_ERR_MSG } from '@shared/const';
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { TrpcContext } from "./context";

const t = initTRPC.context<TrpcContext>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

function getClientIp(req: TrpcContext["req"]): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0]!.trim();
  }
  return req.socket?.remoteAddress || "unknown";
}

/**
 * Simple in-memory sliding-window rate limiter for public procedures that are
 * costly (LLM calls) or easy to spam (lead-capture forms). Each call to
 * `rateLimit(...)` creates its own independent counter store, so unrelated
 * procedures don't share a budget.
 *
 * Note: counters live in process memory, so this resets on deploy/restart and
 * isn't shared across multiple server instances. That's an acceptable
 * trade-off for this single-instance app; if it's ever scaled horizontally,
 * move this to a shared store (e.g. Redis).
 */
export function rateLimit({
  windowMs,
  max,
  message = "Muitas tentativas. Aguarde um momento e tente novamente.",
}: {
  windowMs: number;
  max: number;
  message?: string;
}) {
  const hits = new Map<string, { count: number; resetAt: number }>();

  return t.middleware(async ({ ctx, next }) => {
    const ip = getClientIp(ctx.req);
    const now = Date.now();
    const entry = hits.get(ip);

    if (!entry || now > entry.resetAt) {
      hits.set(ip, { count: 1, resetAt: now + windowMs });
    } else {
      entry.count += 1;
      if (entry.count > max) {
        throw new TRPCError({ code: "TOO_MANY_REQUESTS", message });
      }
    }

    // Opportunistic cleanup so the map doesn't grow unbounded under load.
    if (hits.size > 5000) {
      hits.forEach((value, key) => {
        if (now > value.resetAt) hits.delete(key);
      });
    }

    return next();
  });
}

const requireUser = t.middleware(async opts => {
  const { ctx, next } = opts;

  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

export const protectedProcedure = t.procedure.use(requireUser);

export const adminProcedure = t.procedure.use(
  t.middleware(async opts => {
    const { ctx, next } = opts;

    if (!ctx.user || ctx.user.role !== 'admin') {
      throw new TRPCError({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }

    return next({
      ctx: {
        ...ctx,
        user: ctx.user,
      },
    });
  }),
);
