# Spec 02: Pipeline de Leads & Conversão

> **Status:** Aprovado  
> **Versão:** 1.0  
> **Escopo:** Ingestão de leads, assistente virtual, tRPC, Drizzle ORM e LGPD

---

## 1. Esquema Relacional de Dados (`leads`)

O banco de dados relacional (MySQL gerenciado via Drizzle ORM) armazena os leads capturados na tabela `leads`:

```typescript
// shared/schema.ts ou drizzle/schema.ts
export const leads = mysqlTable("leads", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  email: varchar("email", { length: 255 }),
  message: text("message"),
  clinicPreference: varchar("clinic_preference", { length: 100 }), // "Campinas Day Hospital", "Clinovi Paulista", etc.
  specialty: varchar("specialty", { length: 100 }),                // "Próstata", "Cálculo Renal", "Robótica", etc.
  utmSource: varchar("utm_source", { length: 100 }),
  utmMedium: varchar("utm_medium", { length: 100 }),
  utmCampaign: varchar("utm_campaign", { length: 100 }),
  status: mysqlEnum("status", ["novo", "contatado", "agendado", "descartado"]).default("novo").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

---

## 2. Contrato de API (tRPC Router)

### 2.1. Mutação: `leads.create`
Recebe a submissão de leads originadas pelo `AIChatWidget` ou pelo modal de contato:

```typescript
// Input Zod Schema
export const createLeadSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  phone: z.string().min(8, "Telefone válido é obrigatório"),
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),
  message: z.string().optional(),
  clinicPreference: z.string().optional(),
  specialty: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});
```

### 2.2. Fluxo de Execução do Servidor:
1. Valida a carga com `createLeadSchema`.
2. Insere o registro na tabela `leads`.
3. Dispara e-mail de notificação para a equipe do consultório através do serviço **Resend**:
   - Assunto: `[Novo Lead Site] ${name} - ${clinicPreference || "Geral"}`
   - Destinatário configurado via variável `NOTIFICATION_EMAIL`.
4. Retorna confirmação segura `{ success: true, leadId: lead.id }`.

---

## 3. Classificação de Intenção no Assistente Virtual (`AIChatWidget.tsx`)

O assistente no frontend monitora as mensagens do paciente para identificar intenções de conversão:

```typescript
// Expressão regular de triagem de intenção de agendamento
export const BOOKING_INTENT_REGEX = 
  /(agendar|consulta|marcar|horário|valor|preço|quanto custa|endereço|localização|telefone|contato|onde atende|convênio|unimed)/i;

// Expressão regular de urgência/emergência urológica
export const URGENT_SYMPTOMS_REGEX = 
  /(febre.*rim|sangue.*urina|cólica.*forte|dor.*insuportável|retenção|não consigo urinar)/i;
```

### Comportamento em Caso de Urgência:
Se o paciente relatar sintomas de alta urgência (como febre alta com cólica nefrética ou retenção urinária aguda), o widget emite alerta imediato recomendando a procura do pronto-atendimento hospitalar mais próximo (ex: Hospital São Luiz Campinas).

---

## 4. Conformidade com a LGPD e Ética Médica

1. **Minimização de Dados:** Nunca solicitar prontuários completos, diagnósticos sensíveis ou números de documentos (como CPF) em formulários abertos de contato inicial.
2. **Consentimento Explícito:** Formulários de lead exibem termo: *"Ao enviar, você concorda com o contato exclusivo da nossa equipe para esclarecimento e agendamento de consulta, em conformidade com a nossa Política de Privacidade."*
3. **Criptografia em Trânsito:** Toda a comunicação é conduzida via protocolo HTTPS com TLS 1.3 e certificados válidos.
