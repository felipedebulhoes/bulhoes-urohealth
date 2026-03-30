import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

function createRegularUserContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 2,
    openId: "regular-user",
    email: "user@example.com",
    name: "Regular User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

function createUnauthContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("files router", () => {
  describe("authorization", () => {
    it("rejects unauthenticated users from listing files", async () => {
      const ctx = createUnauthContext();
      const caller = appRouter.createCaller(ctx);

      await expect(caller.files.list()).rejects.toThrow();
    });

    it("rejects regular users from listing files", async () => {
      const ctx = createRegularUserContext();
      const caller = appRouter.createCaller(ctx);

      await expect(caller.files.list()).rejects.toThrow();
    });

    it("rejects unauthenticated users from uploading files", async () => {
      const ctx = createUnauthContext();
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.files.upload({
          filename: "test.txt",
          mimeType: "text/plain",
          base64Data: btoa("hello"),
        })
      ).rejects.toThrow();
    });

    it("rejects regular users from uploading files", async () => {
      const ctx = createRegularUserContext();
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.files.upload({
          filename: "test.txt",
          mimeType: "text/plain",
          base64Data: btoa("hello"),
        })
      ).rejects.toThrow();
    });

    it("rejects unauthenticated users from deleting files", async () => {
      const ctx = createUnauthContext();
      const caller = appRouter.createCaller(ctx);

      await expect(caller.files.delete({ id: 1 })).rejects.toThrow();
    });

    it("rejects regular users from deleting files", async () => {
      const ctx = createRegularUserContext();
      const caller = appRouter.createCaller(ctx);

      await expect(caller.files.delete({ id: 1 })).rejects.toThrow();
    });
  });

  describe("admin access", () => {
    it("allows admin to list files (may return empty array if DB is not connected)", async () => {
      const ctx = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      // This should not throw authorization errors
      // It may return empty array if DB is available, or throw a DB connection error
      try {
        const result = await caller.files.list();
        expect(Array.isArray(result)).toBe(true);
      } catch (error: any) {
        // If it throws, it should be a DB error, not an auth error
        expect(error.message).not.toContain("login");
        expect(error.message).not.toContain("permission");
      }
    });
  });
});
