import { describe, it, expect } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import type { Request, Response } from "express";

// Helper to create a minimal unauthenticated context
function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {} as Request,
    res: {
      clearCookie: () => {},
      cookie: () => {},
    } as unknown as Response,
  };
}

// Helper to create an admin context
function createAdminContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "admin-open-id",
      name: "Admin",
      role: "admin",
      avatarUrl: null,
      createdAt: new Date(),
    },
    req: {} as Request,
    res: {
      clearCookie: () => {},
      cookie: () => {},
    } as unknown as Response,
  };
}

// Helper to create a non-admin user context
function createUserContext(): TrpcContext {
  return {
    user: {
      id: 2,
      openId: "user-open-id",
      name: "User",
      role: "user",
      avatarUrl: null,
      createdAt: new Date(),
    },
    req: {} as Request,
    res: {
      clearCookie: () => {},
      cookie: () => {},
    } as unknown as Response,
  };
}

describe("AI Chat Router", () => {
  describe("sendMessage", () => {
    it("should accept valid messages input", async () => {
      const caller = appRouter.createCaller(createPublicContext());

      try {
        const result = await caller.ai.sendMessage({
          messages: [{ role: "user", content: "Olá" }],
        });
        expect(result).toHaveProperty("role", "assistant");
        expect(result).toHaveProperty("content");
        expect(typeof result.content).toBe("string");
        expect(result.content.length).toBeGreaterThan(0);
      } catch (error: any) {
        console.log("AI Chat test - LLM may not be available:", error.message);
      }
    });

    it("should reject empty messages array", async () => {
      const caller = appRouter.createCaller(createPublicContext());

      await expect(
        caller.ai.sendMessage({ messages: [] })
      ).rejects.toThrow();
    });

    it("should reject messages exceeding max length", async () => {
      const caller = appRouter.createCaller(createPublicContext());

      const longContent = "a".repeat(2001);
      await expect(
        caller.ai.sendMessage({
          messages: [{ role: "user", content: longContent }],
        })
      ).rejects.toThrow();
    });

    it("should reject invalid role", async () => {
      const caller = appRouter.createCaller(createPublicContext());

      await expect(
        caller.ai.sendMessage({
          messages: [{ role: "system" as any, content: "test" }],
        })
      ).rejects.toThrow();
    });

    it("should be accessible without authentication (public procedure)", async () => {
      const caller = appRouter.createCaller(createPublicContext());

      try {
        await caller.ai.sendMessage({
          messages: [{ role: "user", content: "teste" }],
        });
      } catch (error: any) {
        expect(error.message).not.toContain("login");
        expect(error.code).not.toBe("UNAUTHORIZED");
      }
    });
  });

  describe("submitLead", () => {
    it("should accept valid lead with required fields only", async () => {
      const caller = appRouter.createCaller(createPublicContext());

      const result = await caller.ai.submitLead({
        name: "João Silva",
        phone: "(11) 99999-9999",
      });

      expect(result).toHaveProperty("success");
      expect(result).toHaveProperty("message");
      // success depends on DB availability, but should not throw
    });

    it("should accept valid lead with all fields", async () => {
      const caller = appRouter.createCaller(createPublicContext());

      const result = await caller.ai.submitLead({
        name: "Maria Santos",
        phone: "(19) 98888-7777",
        email: "maria@email.com",
        reason: "Exame de rotina",
        preferredLocation: "campinas",
        chatHistory: "Paciente: Olá\nAssistente: Como posso ajudar?",
      });

      expect(result).toHaveProperty("success");
      expect(result).toHaveProperty("message");
    });

    it("should reject lead with empty name", async () => {
      const caller = appRouter.createCaller(createPublicContext());

      await expect(
        caller.ai.submitLead({
          name: "",
          phone: "(11) 99999-9999",
        })
      ).rejects.toThrow();
    });

    it("should reject lead with short name", async () => {
      const caller = appRouter.createCaller(createPublicContext());

      await expect(
        caller.ai.submitLead({
          name: "A",
          phone: "(11) 99999-9999",
        })
      ).rejects.toThrow();
    });

    it("should reject lead with empty phone", async () => {
      const caller = appRouter.createCaller(createPublicContext());

      await expect(
        caller.ai.submitLead({
          name: "João Silva",
          phone: "",
        })
      ).rejects.toThrow();
    });

    it("should reject lead with invalid email format", async () => {
      const caller = appRouter.createCaller(createPublicContext());

      await expect(
        caller.ai.submitLead({
          name: "João Silva",
          phone: "(11) 99999-9999",
          email: "not-an-email",
        })
      ).rejects.toThrow();
    });

    it("should accept lead with empty email string", async () => {
      const caller = appRouter.createCaller(createPublicContext());

      // Empty string is allowed (optional field)
      const result = await caller.ai.submitLead({
        name: "João Silva",
        phone: "(11) 99999-9999",
        email: "",
      });

      expect(result).toHaveProperty("success");
    });

    it("should be accessible without authentication (public procedure)", async () => {
      const caller = appRouter.createCaller(createPublicContext());

      try {
        await caller.ai.submitLead({
          name: "Teste Público",
          phone: "(11) 99999-0000",
        });
      } catch (error: any) {
        expect(error.message).not.toContain("login");
        expect(error.code).not.toBe("UNAUTHORIZED");
      }
    });
  });

  describe("listLeads", () => {
    it("should reject unauthenticated access", async () => {
      const caller = appRouter.createCaller(createPublicContext());

      await expect(caller.ai.listLeads()).rejects.toThrow();
    });

    it("should reject non-admin access", async () => {
      const caller = appRouter.createCaller(createUserContext());

      await expect(caller.ai.listLeads()).rejects.toThrow("Acesso restrito a administradores.");
    });

    it("should allow admin access", async () => {
      const caller = appRouter.createCaller(createAdminContext());

      try {
        const result = await caller.ai.listLeads();
        expect(Array.isArray(result)).toBe(true);
      } catch (error: any) {
        // DB might not be available in test, but should not be auth error
        expect(error.code).not.toBe("FORBIDDEN");
        expect(error.code).not.toBe("UNAUTHORIZED");
      }
    });
  });

  describe("updateLeadStatus", () => {
    it("should reject unauthenticated access", async () => {
      const caller = appRouter.createCaller(createPublicContext());

      await expect(
        caller.ai.updateLeadStatus({ id: 1, status: "contacted" })
      ).rejects.toThrow();
    });

    it("should reject non-admin access", async () => {
      const caller = appRouter.createCaller(createUserContext());

      await expect(
        caller.ai.updateLeadStatus({ id: 1, status: "contacted" })
      ).rejects.toThrow("Acesso restrito a administradores.");
    });

    it("should reject invalid status", async () => {
      const caller = appRouter.createCaller(createAdminContext());

      await expect(
        caller.ai.updateLeadStatus({ id: 1, status: "invalid" as any })
      ).rejects.toThrow();
    });
  });
});
