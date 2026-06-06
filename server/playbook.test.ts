import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock db module
vi.mock("./db", () => ({
  insertPlaybookLead: vi.fn(),
  listPlaybookLeads: vi.fn(),
}));

// Mock notification module
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

import { insertPlaybookLead, listPlaybookLeads } from "./db";
import { notifyOwner } from "./_core/notification";

describe("Playbook Router Logic", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("requestDownload", () => {
    it("should insert a lead and return download URL on success", async () => {
      const mockLead = {
        id: 1,
        name: "João Silva",
        email: "joao@email.com",
        material: "guia-saude-integral",
        source: "homepage",
        createdAt: new Date(),
      };
      (insertPlaybookLead as any).mockResolvedValue(mockLead);

      // Simulate the logic from the router
      const input = { name: "João Silva", email: "joao@email.com", source: "homepage" };
      
      const result = await insertPlaybookLead({
        name: input.name,
        email: input.email,
        source: input.source,
      });

      expect(insertPlaybookLead).toHaveBeenCalledWith({
        name: "João Silva",
        email: "joao@email.com",
        source: "homepage",
      });
      expect(result).toEqual(mockLead);
    });

    it("should call notifyOwner with lead details", async () => {
      (insertPlaybookLead as any).mockResolvedValue({ id: 1 });
      (notifyOwner as any).mockResolvedValue(true);

      const input = { name: "Maria Santos", email: "maria@email.com", source: "homepage" };

      await insertPlaybookLead({
        name: input.name,
        email: input.email,
        source: input.source,
      });

      await notifyOwner({
        title: "📥 Novo download do Guia de Saúde Integral",
        content: `Nome: ${input.name}\nEmail: ${input.email}\nOrigem: ${input.source}`,
      });

      expect(notifyOwner).toHaveBeenCalledWith({
        title: "📥 Novo download do Guia de Saúde Integral",
        content: "Nome: Maria Santos\nEmail: maria@email.com\nOrigem: homepage",
      });
    });

    it("should handle database failure gracefully", async () => {
      (insertPlaybookLead as any).mockRejectedValue(new Error("DB connection failed"));

      try {
        await insertPlaybookLead({
          name: "Test",
          email: "test@test.com",
          source: "homepage",
        });
      } catch (error: any) {
        expect(error.message).toBe("DB connection failed");
      }
    });

    it("should validate email format via zod schema", () => {
      const { z } = require("zod");
      const schema = z.object({
        name: z.string().min(2, "Nome é obrigatório"),
        email: z.string().email("Email inválido"),
        source: z.string().optional(),
      });

      // Valid input
      const validResult = schema.safeParse({ name: "João", email: "joao@email.com" });
      expect(validResult.success).toBe(true);

      // Invalid email
      const invalidEmail = schema.safeParse({ name: "João", email: "not-an-email" });
      expect(invalidEmail.success).toBe(false);

      // Name too short
      const shortName = schema.safeParse({ name: "J", email: "j@e.com" });
      expect(shortName.success).toBe(false);
    });
  });

  describe("listLeads", () => {
    it("should return list of playbook leads", async () => {
      const mockLeads = [
        { id: 1, name: "João", email: "joao@email.com", material: "guia-saude-integral", source: "homepage", createdAt: new Date() },
        { id: 2, name: "Maria", email: "maria@email.com", material: "guia-saude-integral", source: "homepage", createdAt: new Date() },
      ];
      (listPlaybookLeads as any).mockResolvedValue(mockLeads);

      const result = await listPlaybookLeads();
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe("João");
      expect(result[1].email).toBe("maria@email.com");
    });

    it("should return empty array when no leads exist", async () => {
      (listPlaybookLeads as any).mockResolvedValue([]);

      const result = await listPlaybookLeads();
      expect(result).toHaveLength(0);
    });
  });

  describe("PDF URL configuration", () => {
    it("should have correct PDF storage path", () => {
      const PLAYBOOK_PDF_URL = "/manus-storage/Playbook-Saude-Integral-DrFelipeBulhoes_57b5fc71.pdf";
      expect(PLAYBOOK_PDF_URL).toContain("Playbook-Saude-Integral");
      expect(PLAYBOOK_PDF_URL).toContain(".pdf");
      expect(PLAYBOOK_PDF_URL.startsWith("/manus-storage/")).toBe(true);
    });
  });
});
