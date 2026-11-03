import { z } from "zod";
import { publicProcedure, protectedProcedure, router, rateLimit } from "../_core/trpc";
import { insertPlaybookLead, listPlaybookLeads, insertLead } from "../db";
import { notifyOwner } from "../_core/notification";
import { sendLeadNotificationEmail } from "../email";

const PLAYBOOK_PDF_BY_TOPIC: Record<string, string> = {
  "performance-hormonal": "/manus-storage/Guia_Performance_Hormonal_Checkup_Dr_Felipe_Bulhoes.pdf",
  "estetica-intima": "/manus-storage/Guia_Estetica_Intima_Masculina_Dr_Felipe_Bulhoes.pdf",
  "prostata-cirurgia": "/manus-storage/Guia_Saude_Prostata_Cirurgia_Dr_Felipe_Bulhoes.pdf",
  "fertilidade-vasectomia": "/manus-storage/Guia_Fertilidade_Microcirurgia_Vasectomia_Dr_Felipe_Bulhoes.pdf",
};

const PLAYBOOK_PDF_URL = PLAYBOOK_PDF_BY_TOPIC["performance-hormonal"];

export const playbookRouter = router({
  /**
   * Public: register a lead (name + phone/WhatsApp + email + chosen topic + origin) and return the topic's PDF download URL.
   */
  // Lead-capture form: limit submissions per IP so it can't be scripted
  // to spam the leads table / owner notification email.
  requestDownload: publicProcedure
    .use(rateLimit({ windowMs: 60 * 60 * 1000, max: 5 }))
    .input(
      z.object({
        name: z.string().min(2, "Nome é obrigatório"),
        email: z.string().email("Email inválido"),
        phone: z.string().min(8, "WhatsApp é obrigatório").optional(),
        topicId: z.string().optional(),
        topicTitle: z.string().optional(),
        source: z.string().optional(),
        originDetails: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const selectedTopicId = input.topicId && PLAYBOOK_PDF_BY_TOPIC[input.topicId]
        ? input.topicId
        : "performance-hormonal";
      const resolvedPdfUrl = PLAYBOOK_PDF_BY_TOPIC[selectedTopicId] || PLAYBOOK_PDF_URL;
      const selectedTopicTitle = input.topicTitle || "Performance Hormonal, Testosterona & Check-up 35+";
      const sourceLabel = (input.source || `guia-${selectedTopicId}`).slice(0, 64);
      const originSummary = input.originDetails || sourceLabel;

      try {
        await insertPlaybookLead({
          name: input.name,
          email: input.email,
          source: sourceLabel,
        });

        // Also register in the main CRM/Leads table when phone (WhatsApp) is provided
        if (input.phone && typeof insertLead === "function") {
          insertLead({
            name: input.name,
            phone: input.phone,
            email: input.email,
            reason: `Guia PDF escolhido: ${selectedTopicTitle} | Origem: ${originSummary}`,
            source: `guia-${selectedTopicId}`.slice(0, 64),
          }).catch(() => {});

          sendLeadNotificationEmail({
            name: input.name,
            phone: input.phone,
            email: input.email,
            reason: `Lead Guia PDF [${selectedTopicTitle}] (Avaliação SDR / Kommo) — Origem: ${originSummary}`,
          }).catch(() => {});
        }

        // Notify owner about new playbook lead (non-blocking)
        notifyOwner({
          title: `📥 Novo Lead — Guia PDF: ${selectedTopicTitle} (SDR / Kommo)`,
          content: [
            `Nome: ${input.name}`,
            input.phone ? `WhatsApp: ${input.phone}` : null,
            `Email: ${input.email}`,
            `Tema Escolhido: ${selectedTopicTitle}`,
            `Origem: ${originSummary}`,
          ]
            .filter(Boolean)
            .join("\n"),
        }).catch(() => {});

        return {
          success: true,
          downloadUrl: resolvedPdfUrl,
          message: "Obrigado! Seu guia está pronto para download.",
        };
      } catch (error) {
        console.error("[Playbook] Failed to register lead:", error);
        return {
          success: false,
          downloadUrl: resolvedPdfUrl,
          message: "Seu guia está liberado abaixo.",
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
