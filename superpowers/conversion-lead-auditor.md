# Superpower: Conversion & Lead Auditor

> **Especialidade:** Auditoria de Funis de Agendamento, Captura de Leads, Mensageria WhatsApp e Rastreamento Analítico  
> **Escopo:** `AIChatWidget.tsx`, `ScheduleBanner.tsx`, `LeadModal.tsx`, rotas tRPC (`server/routers/leads.ts`), notificações Resend e eventos GA4.

---

## 1. Mapeamento de Canais de Conversão

O ecossistema Bulhões UroHealth possui quatro vias principais de conversão do paciente:

```
                  ┌───────────────────────────────┐
                  │    Paciente no Site Web       │
                  └──────────────┬────────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         ▼                       ▼                       ▼
┌──────────────────┐   ┌──────────────────┐   ┌──────────────────┐
│   WhatsApp CTA   │   │  Doctoralia CTA  │   │  AI Chatbot &    │
│  (19) 99855-9890 │   │ Perfil Oficial   │   │  Formulário Web  │
└────────┬─────────┘   └────────┬─────────┘   └────────┬─────────┘
         │                      │                      │
         ▼                      ▼                      ▼
  Conversa Direta       Agendamento Online      tRPC lead.create
  com a Secretária      no Consultório Escolhido       │
                                                       ▼
                                                Disparo de E-mail
                                                via Resend API
```

---

## 2. Parâmetros Obrigatórios para Links de WhatsApp

Todos os botões que direcionam para o WhatsApp da equipe de atendimento devem incluir parâmetros de rastreamento (UTM) e mensagem contextualizada:

### Formato Padrão:
```typescript
const phone = "5519998559890";
const text = encodeURIComponent(
  `Olá! Gostaria de agendar uma consulta com o Dr. Felipe de Bulhões.\n(Origem: ${origem} | Ref: Site Oficial)`
);
const whatsappUrl = `https://wa.me/${phone}?text=${text}`;
```

### Mensagens por Contexto:
- **Página de HoLEP / HPB:** `"Olá! Gostaria de informações sobre o tratamento a laser da próstata (HoLEP/Rezum) com o Dr. Felipe."`
- **Página de Cálculos Renais:** `"Olá! Gostaria de agendar uma avaliação para cálculo renal / litotripsia a laser com o Dr. Felipe."`
- **Página de Cirurgia Robótica:** `"Olá! Gostaria de agendar uma consulta de avaliação para cirurgia robótica urológica."`
- **Teleconsulta:** `"Olá! Gostaria de agendar uma teleconsulta médica com o Dr. Felipe de Bulhões."`

---

## 3. Assistente de IA Urológico (`AIChatWidget.tsx`)

O widget de chat inteligente possui um motor de detecção de intenção:

### 3.1. Expressões Regulares de Intenção de Agendamento:
O assistente detecta automaticamente intenções de agendamento ou emergência através de regex:
```typescript
const BOOKING_INTENT_REGEX = /(agendar|consulta|marcar|horário|valor|preço|quanto custa|endereço|localização|telefone|contato|onde atende|convênio|unimed)/i;
```
Ao detectar a intenção, o chat exibe o card de conversão com atalhos para WhatsApp, Doctoralia ou o formulário nativo de contato.

### 3.2. Fluxo do Formulário de Lead Nativo:
1. Paciente preenche: Nome, Telefone/WhatsApp, E-mail (opcional), Motivo da Consulta e Unidade de Preferência.
2. Cliente chama a mutação tRPC:
   ```typescript
   trpc.leads.create.useMutation();
   ```
3. O servidor insere o registro na tabela `leads` do MySQL via Drizzle ORM.
4. Se a chave `RESEND_API_KEY` estiver configurada no `.env`, dispara um e-mail de alerta imediato para a equipe médica.

---

## 4. Auditoria de Eventos no Google Analytics 4 (GA4)

Cada interação de conversão dispara eventos via `window.gtag`:

| Ação do Usuário | Nome do Evento GA4 | Parâmetros Enviados |
|---|---|---|
| Clique em botão de WhatsApp | `contact_whatsapp` | `{ location: string, specialty?: string }` |
| Clique em link da Doctoralia | `contact_doctoralia` | `{ clinic_name: string }` |
| Envio do formulário de lead | `generate_lead` | `{ method: "chat_widget" \| "lead_modal" }` |
| Clique em CTA principal (Hero) | `cta_click` | `{ cta_text: string, section: "hero" }` |
| Início de interação com Chat | `chat_started` | `{ trigger: "auto" \| "manual" }` |

---

## 5. Checklist de Verificação de Integridade do Funil

Antes de concluir qualquer atualização no site:
- [ ] Testar clique no botão flutuante de agendamento (`ScheduleBanner.tsx`).
- [ ] Testar envio de lead de teste pelo `AIChatWidget.tsx` e confirmar status de sucesso.
- [ ] Verificar no console do navegador se nenhum erro de rede (como 400 ou 500) é retornado nas chamadas tRPC.
- [ ] Conferir se os links da Doctoralia direcionam para os consultórios corretos (Campinas Day Hospital, Clinovi Paulista e Clinovi Pinheiros).
