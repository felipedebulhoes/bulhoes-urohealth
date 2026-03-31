import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
const NOTIFICATION_EMAIL = "drfelipebulhoes@bulhoesurohealth.com";
const FROM_EMAIL = "leads@bulhoesurohealth.com"; // Requires domain verification in Resend
const FROM_EMAIL_FALLBACK = "onboarding@resend.dev"; // Resend default sender for testing

let resendClient: Resend | null = null;

function getResendClient(): Resend | null {
  if (!RESEND_API_KEY) {
    console.warn("[Email] RESEND_API_KEY not configured, email notifications disabled");
    return null;
  }
  if (!resendClient) {
    resendClient = new Resend(RESEND_API_KEY);
  }
  return resendClient;
}

export type LeadEmailData = {
  name: string;
  phone: string;
  email?: string;
  reason?: string;
  preferredLocation?: string;
  chatHistory?: string;
};

/**
 * Send an email notification to the doctor when a new lead is captured via chat.
 * Returns true if email was sent successfully, false otherwise.
 * Never throws — failures are logged and silently handled.
 */
export async function sendLeadNotificationEmail(lead: LeadEmailData): Promise<boolean> {
  const client = getResendClient();
  if (!client) {
    return false;
  }

  const locationMap: Record<string, string> = {
    campinas: "Campinas Day Hospital",
    "sp-paulista": "Clinovi Paulista (Av. Paulista)",
    "sp-moema": "Clinovi Moema",
  };
  const locationLabel = lead.preferredLocation
    ? locationMap[lead.preferredLocation] || lead.preferredLocation
    : "Não informado";

  const subject = `Novo Lead via Chat AI: ${lead.name}`;

  // Build plain text body
  const textBody = [
    `Novo paciente demonstrou interesse em agendar consulta pelo assistente virtual do site.`,
    ``,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `DADOS DO PACIENTE`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `Nome: ${lead.name}`,
    `Telefone: ${lead.phone}`,
    lead.email ? `Email: ${lead.email}` : null,
    `Motivo: ${lead.reason || "Não informado"}`,
    `Local preferido: ${locationLabel}`,
    ``,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `AÇÕES RÁPIDAS`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `WhatsApp: https://wa.me/55${lead.phone.replace(/\D/g, "")}`,
    `Ligar: tel:+55${lead.phone.replace(/\D/g, "")}`,
    lead.email ? `Email: mailto:${lead.email}` : null,
    ``,
    `Acesse o painel de leads no site para mais detalhes e histórico do chat.`,
  ]
    .filter(Boolean)
    .join("\n");

  // Build HTML body
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #0f766e, #0d9488); padding: 24px 32px; color: #ffffff;">
      <h1 style="margin: 0; font-size: 20px; font-weight: 600;">Novo Lead via Chat AI</h1>
      <p style="margin: 8px 0 0; font-size: 14px; opacity: 0.9;">Um paciente demonstrou interesse em agendar consulta</p>
    </div>
    
    <!-- Body -->
    <div style="padding: 32px;">
      
      <!-- Patient Info -->
      <h2 style="font-size: 16px; color: #374151; margin: 0 0 16px; border-bottom: 2px solid #0d9488; padding-bottom: 8px;">Dados do Paciente</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          <td style="padding: 8px 12px; font-weight: 600; color: #6b7280; width: 140px; vertical-align: top;">Nome</td>
          <td style="padding: 8px 12px; color: #111827;">${lead.name}</td>
        </tr>
        <tr style="background-color: #f9fafb;">
          <td style="padding: 8px 12px; font-weight: 600; color: #6b7280; vertical-align: top;">Telefone</td>
          <td style="padding: 8px 12px; color: #111827;">${lead.phone}</td>
        </tr>
        ${lead.email ? `<tr>
          <td style="padding: 8px 12px; font-weight: 600; color: #6b7280; vertical-align: top;">Email</td>
          <td style="padding: 8px 12px; color: #111827;">${lead.email}</td>
        </tr>` : ""}
        <tr style="background-color: #f9fafb;">
          <td style="padding: 8px 12px; font-weight: 600; color: #6b7280; vertical-align: top;">Motivo</td>
          <td style="padding: 8px 12px; color: #111827;">${lead.reason || "Não informado"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; font-weight: 600; color: #6b7280; vertical-align: top;">Local preferido</td>
          <td style="padding: 8px 12px; color: #111827;">${locationLabel}</td>
        </tr>
      </table>
      
      <!-- Quick Actions -->
      <h2 style="font-size: 16px; color: #374151; margin: 0 0 16px; border-bottom: 2px solid #0d9488; padding-bottom: 8px;">Ações Rápidas</h2>
      <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 24px;">
        <a href="https://wa.me/55${lead.phone.replace(/\D/g, "")}" style="display: inline-block; padding: 10px 20px; background-color: #25D366; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">WhatsApp</a>
        <a href="tel:+55${lead.phone.replace(/\D/g, "")}" style="display: inline-block; padding: 10px 20px; background-color: #3b82f6; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">Ligar</a>
        ${lead.email ? `<a href="mailto:${lead.email}" style="display: inline-block; padding: 10px 20px; background-color: #8b5cf6; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">Email</a>` : ""}
      </div>
      
      <!-- Footer note -->
      <p style="font-size: 13px; color: #9ca3af; margin: 0; border-top: 1px solid #e5e7eb; padding-top: 16px;">
        Acesse o <strong>painel de leads</strong> no site para ver o histórico completo do chat e gerenciar este contato.
      </p>
    </div>
    
    <!-- Footer -->
    <div style="background-color: #f9fafb; padding: 16px 32px; text-align: center;">
      <p style="margin: 0; font-size: 12px; color: #9ca3af;">
        Notificação automática do site bulhoesurohealth.com
      </p>
    </div>
  </div>
</body>
</html>`;

  try {
    // Try with custom domain first, fall back to Resend default
    const fromEmail = RESEND_API_KEY ? FROM_EMAIL : FROM_EMAIL_FALLBACK;
    
    const { data, error } = await client.emails.send({
      from: `Dr. Felipe de Bulhões - Leads <${fromEmail}>`,
      to: [NOTIFICATION_EMAIL],
      subject,
      html: htmlBody,
      text: textBody,
    });

    if (error) {
      // If custom domain fails, try with Resend default sender
      if (fromEmail === FROM_EMAIL) {
        console.warn("[Email] Custom domain failed, trying Resend default sender:", error);
        const { data: fallbackData, error: fallbackError } = await client.emails.send({
          from: `Bulhões UroHealth Leads <${FROM_EMAIL_FALLBACK}>`,
          to: [NOTIFICATION_EMAIL],
          subject,
          html: htmlBody,
          text: textBody,
        });

        if (fallbackError) {
          console.error("[Email] Fallback send also failed:", fallbackError);
          return false;
        }

        console.log("[Email] Lead notification sent via fallback:", fallbackData?.id);
        return true;
      }

      console.error("[Email] Failed to send lead notification:", error);
      return false;
    }

    console.log("[Email] Lead notification sent successfully:", data?.id);
    return true;
  } catch (error) {
    console.error("[Email] Error sending lead notification:", error);
    return false;
  }
}

/**
 * Validate that the Resend API key is configured and non-empty.
 * Returns true if the key appears valid, false otherwise.
 * Note: The API key may be restricted to sending only, so we validate format rather than making API calls.
 */
export function validateResendApiKey(): boolean {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.trim().length === 0) {
    return false;
  }
  // Resend API keys start with "re_"
  if (apiKey.startsWith("re_")) {
    console.log("[Email] Resend API key format validated (re_ prefix)");
    return true;
  }
  // Accept any non-empty key (might be a full-access key without re_ prefix)
  console.log("[Email] Resend API key present (non-standard format)");
  return true;
}
