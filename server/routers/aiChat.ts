import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../_core/trpc";
import { invokeLLM, type Message } from "../_core/llm";
import { notifyOwner } from "../_core/notification";
import { insertLead, listLeads, updateLeadStatus } from "../db";
import { sendLeadNotificationEmail } from "../email";
import { TRPCError } from "@trpc/server";

const SYSTEM_PROMPT = `Você é o assistente virtual do consultório do Dr. Felipe de Bulhões, urologista formado pelo Instituto D'Or de Ensino e Pesquisa, com CRM-SP 218.298 e RQE 108.766. Atende em Campinas (Campinas Day Hospital e Clinovi Paulista) e São Paulo (Clinovi Moema).

REGRAS IMPORTANTES:
1. Você é um assistente informativo e acolhedor. NÃO faça diagnósticos nem prescreva medicamentos.
2. Sempre oriente o paciente a agendar uma consulta presencial para avaliação individualizada.
3. Responda em português brasileiro, de forma clara, empática e acessível.
4. Use linguagem leiga, evitando jargões médicos quando possível. Quando usar termos técnicos, explique-os.
5. Para agendar consulta, oriente o paciente a entrar em contato pelo WhatsApp: (11) 98112-4455.
6. Seja breve e objetivo nas respostas (máximo 3-4 parágrafos).
7. Nunca invente informações. Se não souber algo, diga que o paciente deve consultar o médico.
8. Quando perguntarem sobre formas de pagamento, informe que nas unidades Clinovi (Paulista e Moema) o pagamento é realizado no local antes da consulta, via PIX, cartão de crédito ou débito. Não discuta valores específicos de consulta.
9. COLETA DE CONTATO: Quando o paciente demonstrar interesse em agendar consulta, pergunte se gostaria de deixar o nome e telefone para que a secretária entre em contato. Se o paciente fornecer dados de contato na conversa, responda normalmente confirmando que os dados serão encaminhados.

ÁREAS DE ATUAÇÃO DO DR. FELIPE:
- Cirurgia Robótica (prostatectomia, nefrectomia parcial, cistectomia, pieloplastia)
- Litotripsia a Laser (ureterolitotripsia flexível com bainha de aspiração navegável)
- Tratamentos para HPB (RTU bipolar, HoLEP, BipolEP, Rezum, Aquablation, UroLift)
- Biópsia de Próstata (transperineal com fusão de imagens)
- Vasectomia (técnica no-scalpel)
- Urodinâmica
- Câncer de Próstata, Bexiga e Rim
- Disfunção Erétil e Hipogonadismo
- Cálculos Renais e Ureterais
- Infecção Urinária
- Procedimentos Andrológicos (postectomia, varicocele)

LOCAIS DE ATENDIMENTO:
- Campinas Day Hospital: Av. Benjamin Constant, 1991 — Cambuí, Campinas/SP (convênios e particular)
- Clinovi Paulista: Av. Paulista, 807, 17° andar, São Paulo/SP (apenas particular — PIX, cartão de crédito ou débito no local)
- Clinovi Moema: Av. Lavandisca, 741, 4° andar, São Paulo/SP (apenas particular — PIX, cartão de crédito ou débito no local)

AGENDAMENTO:
- WhatsApp: (11) 98112-4455
- Doctoralia: https://www.doctoralia.com.br/felipe-de-bulhoes/urologista/campinas

Quando o paciente perguntar sobre um procedimento específico, você pode mencionar que há conteúdo educativo detalhado no site (bulhoesurohealth.com) na seção Educativo.`;

const MAX_MESSAGES = 20;

export const aiChatRouter = router({
  /**
   * Send a message to the AI assistant and get a response.
   * Accepts the conversation history and returns the assistant's reply.
   */
  sendMessage: publicProcedure
    .input(
      z.object({
        messages: z.array(
          z.object({
            role: z.enum(["user", "assistant"]),
            content: z.string().min(1).max(2000),
          })
        ).min(1).max(MAX_MESSAGES),
      })
    )
    .mutation(async ({ input }) => {
      const llmMessages: Message[] = [
        { role: "system", content: SYSTEM_PROMPT },
        ...input.messages.slice(-MAX_MESSAGES),
      ];

      try {
        const response = await invokeLLM({
          messages: llmMessages,
          maxTokens: 1024,
        });

        const content = response.choices?.[0]?.message?.content;
        if (!content || typeof content !== "string") {
          throw new Error("Empty response from AI");
        }

        return {
          role: "assistant" as const,
          content,
        };
      } catch (error) {
        console.error("[AI Chat] Error:", error);
        return {
          role: "assistant" as const,
          content:
            "Desculpe, estou com dificuldades técnicas no momento. Para falar diretamente com a equipe do Dr. Felipe, entre em contato pelo WhatsApp: (11) 98112-4455.",
        };
      }
    }),

  /**
   * Submit a lead (patient contact info) collected via chat.
   * Public procedure — no auth required.
   */
  submitLead: publicProcedure
    .input(
      z.object({
        name: z.string().min(2).max(256),
        phone: z.string().min(8).max(32),
        email: z.string().email().optional().or(z.literal("")),
        reason: z.string().max(1000).optional(),
        preferredLocation: z.string().max(64).optional(),
        chatHistory: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const lead = await insertLead({
          name: input.name,
          phone: input.phone,
          email: input.email || undefined,
          reason: input.reason || undefined,
          preferredLocation: input.preferredLocation || undefined,
          source: "ai-chat",
          chatHistory: input.chatHistory || undefined,
        });

        // Notify the owner about the new lead
        const locationMap: Record<string, string> = {
          campinas: "Campinas Day Hospital",
          "sp-paulista": "Clinovi Paulista (Av. Paulista)",
          "sp-moema": "Clinovi Moema",
        };
        const locationLabel = input.preferredLocation
          ? locationMap[input.preferredLocation] || input.preferredLocation
          : "Não informado";

        // Send Manus platform notification
        await notifyOwner({
          title: `Novo Lead via Chat AI: ${input.name}`,
          content: `Um paciente demonstrou interesse em agendar consulta pelo assistente virtual.\n\nNome: ${input.name}\nTelefone: ${input.phone}${input.email ? `\nEmail: ${input.email}` : ""}\nMotivo: ${input.reason || "Não informado"}\nLocal preferido: ${locationLabel}\n\nAcesse o painel de leads no site para mais detalhes.`,
        });

        // Send email notification (non-blocking, won't fail the lead submission)
        sendLeadNotificationEmail({
          name: input.name,
          phone: input.phone,
          email: input.email || undefined,
          reason: input.reason || undefined,
          preferredLocation: input.preferredLocation || undefined,
          chatHistory: input.chatHistory || undefined,
        }).catch((err) => console.error("[Email] Background send failed:", err));

        return {
          success: true,
          message: "Dados recebidos com sucesso! A equipe entrará em contato em breve.",
        };
      } catch (error) {
        console.error("[AI Chat] Lead submission error:", error);
        return {
          success: false,
          message: "Houve um problema ao salvar seus dados. Por favor, entre em contato pelo WhatsApp: (11) 98112-4455.",
        };
      }
    }),

  /**
   * List all leads (admin only).
   */
  listLeads: protectedProcedure
    .input(
      z.object({
        status: z.enum(["new", "contacted", "scheduled", "completed"]).optional(),
      }).optional()
    )
    .query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Acesso restrito a administradores." });
      }
      return listLeads(input ? { status: input.status } : undefined);
    }),

  /**
   * Update lead status (admin only).
   */
  updateLeadStatus: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["new", "contacted", "scheduled", "completed"]),
        notes: z.string().max(2000).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Acesso restrito a administradores." });
      }
      const success = await updateLeadStatus(input.id, input.status, input.notes);
      if (!success) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Lead não encontrado." });
      }
      return { success: true };
    }),
});
