import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { buildSocialMetadataSnapshot } from "./routers/socialPreview";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function contextFor(role: "admin" | "user" | null): TrpcContext {
  const user: AuthenticatedUser | null = role
    ? {
      id: role === "admin" ? 1 : 2,
      openId: `${role}-user`,
      email: `${role}@example.com`,
      name: role,
      loginMethod: "manus",
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    }
    : null;

  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => {} } as TrpcContext["res"],
  };
}

describe("social preview router", () => {
  it("builds a deterministic technical snapshot for an indexable route", () => {
    const snapshot = buildSocialMetadataSnapshot("/vasectomia-sem-bisturi?utm_source=test", 7);

    expect(snapshot.path).toBe("/vasectomia-sem-bisturi");
    expect(snapshot.createdByUserId).toBe(7);
    expect(snapshot.title).toContain("Vasectomia Sem Bisturi");
    expect(snapshot.contentHash).toMatch(/^[a-f0-9]{64}$/);
  });

  it("rejects snapshots for non-indexable routes", () => {
    expect(() => buildSocialMetadataSnapshot("/admin/social-preview", 7)).toThrow();
    expect(() => buildSocialMetadataSnapshot("/rota-inexistente", 7)).toThrow();
  });

  it("rejects unauthenticated and regular users before image or history work", async () => {
    await expect(appRouter.createCaller(contextFor(null)).socialPreview.history({ path: "/" })).rejects.toThrow();
    await expect(appRouter.createCaller(contextFor("user")).socialPreview.imageAudit({ path: "/" })).rejects.toThrow();
  });
});
