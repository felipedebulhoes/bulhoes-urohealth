import { z } from "zod";
import { publicProcedure, protectedProcedure, router, rateLimit } from "../_core/trpc";
import { insertPlaybookLead, listPlaybookLeads } from "../db";
import { notifyOwner } from "../_core/notification";

const PLAYBOOK_PDF_URL = "/manus-storage/Playbook-Saude-Integral-DrFelipeBulhoes_57b5fc71.pdf";

export const playbookRouter = router({
  /**
   * Public: register a lead (name + email) and return the PDF download URL.
   */
  // Lead-capture form: limit submissions per IP so it can't be scripted
  // to spam the leads table / owner notification email.
  requestDownload: publicProcedure
    .use(rateLimit({ windowMs: 60 * 60 * 1000, max: 5 }))
    .input(
      z.object({
        name: z.string().min(2, "Nome é obrigatório"),
        email: z.string().email("Email inválido"),
        source: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await insertPlaybookLead({
          name: input.name,
          email: input.email,
          source: input.source || "homepage",
        });

        // Notify owner about new playbook lead (non-blocking)
        notifyOwner({
          title: "📥 Novo download do Guia de Saúde Integral",
          content: `Nome: ${input.name}\nEmail: ${input.email}\nOrigem: ${input.source || "homepage"}`,
        }).catch(() => {});

        return {
          success: true,
          downloadUrl: PLAYBOOK_PDF_URL,
          message: "Obrigado! Seu guia está pronto para download.",
        };
      } catch (error) {
        console.error("[Playbook] Failed to register lead:", error);
        return {
          success: false,
          downloadUrl: null,
          message: "Erro ao processar. Tente novamente.",
        };
      }
    }),

  /**
   * Admin: list all playbook leads.
   */
  listLeads: protectedProcedure.query(async () => {
    return listPlaybookLeads();
  }),
});
