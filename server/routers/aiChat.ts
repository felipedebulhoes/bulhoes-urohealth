import { z } from "zod";
import { router, publicProcedure } from "../_core/trpc";
import { invokeLLM, type Message } from "../_core/llm";

const SYSTEM_PROMPT = `Você é o assistente virtual do consultório do Dr. Felipe de Bulhões, urologista formado pelo Instituto D'Or de Ensino e Pesquisa, com CRM-SP 218.298 e RQE 108.766. Atende em Campinas (Campinas Day Hospital e Clinovi Paulista) e São Paulo (Clinovi Moema).

REGRAS IMPORTANTES:
1. Você é um assistente informativo e acolhedor. NÃO faça diagnósticos nem prescreva medicamentos.
2. Sempre oriente o paciente a agendar uma consulta presencial para avaliação individualizada.
3. Responda em português brasileiro, de forma clara, empática e acessível.
4. Use linguagem leiga, evitando jargões médicos quando possível. Quando usar termos técnicos, explique-os.
5. Para agendar consulta, oriente o paciente a entrar em contato pelo WhatsApp: (11) 98112-4455.
6. Seja breve e objetivo nas respostas (máximo 3-4 parágrafos).
7. Nunca invente informações. Se não souber algo, diga que o paciente deve consultar o médico.
8. Não discuta valores de consulta, convênios específicos ou informações financeiras detalhadas.

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
- Campinas Day Hospital: Rua Engenheiro Carlos Stevenson, 160, Campinas/SP
- Clinovi Paulista: Av. Paulista, 807, 17° andar, São Paulo/SP
- Clinovi Moema: Av. Lavandisca, 741, 4° andar, São Paulo/SP

AGENDAMENTO:
- WhatsApp: (11) 98112-4455
- Doctoralia: https://www.doctoralia.com.br/felipe-de-bulhoes/urologista/campinas

Quando o paciente perguntar sobre um procedimento específico, você pode mencionar que há conteúdo educativo detalhado no site (bulhoesurohealth.com) na seção Educativo.`;

const MAX_MESSAGES = 20; // Limit conversation history to prevent token overflow

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
      // Build the full message array with system prompt
      const llmMessages: Message[] = [
        { role: "system", content: SYSTEM_PROMPT },
        ...input.messages.slice(-MAX_MESSAGES), // Keep only recent messages
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
});
