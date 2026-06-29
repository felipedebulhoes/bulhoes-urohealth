/**
 * Google Analytics 4 + Google Ads — Event Tracking Utilities
 * GA4 ID: G-PJHFGVQPS6
 * Google Ads ID: AW-18050357375
 * Conversion Label: 1tRMCJ6z3ZscEP-wip9D
 *
 * Eventos de conversão rastreados:
 * - generate_lead: quando um lead é captado pelo chat
 * - contact_whatsapp: clique no botão de WhatsApp
 * - contact_doctoralia: clique no botão de agendamento Doctoralia
 * - contact_phone: clique no botão de telefone
 * - chat_open: quando o chat é aberto
 * - page_view_educational: visualização de página educativa
 * - cta_click: clique em qualquer CTA de agendamento
 */

// Tipagem global para gtag e Meta Pixel
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    fbq: (...args: any[]) => void;
  }
}

// Google Ads Conversion IDs
const GOOGLE_ADS_CONVERSION_ID = "AW-18050357375";
const GOOGLE_ADS_CONVERSION_LABEL = "1tRMCJ6z3ZscEP-wip9D";
const GOOGLE_ADS_SEND_TO = `${GOOGLE_ADS_CONVERSION_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`;

/**
 * Envia um evento personalizado para o GA4
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

/**
 * Dispara conversão no Google Ads
 * Chamado automaticamente nos eventos de conversão principais
 */
export function trackGoogleAdsConversion(value: number = 100.0) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", {
      send_to: GOOGLE_ADS_SEND_TO,
      value: value,
      currency: "BRL",
    });
  }
}

/**
 * Rastreia a captação de um lead pelo chat
 * Dispara conversão no GA4 E no Google Ads
 */
export function trackLeadGenerated(data: {
  name: string;
  phone: string;
  reason?: string;
  location?: string;
}) {
  trackEvent("generate_lead", {
    event_category: "conversion",
    event_label: data.reason || "chat_lead",
    lead_source: "ai_chat",
    preferred_location: data.location || "not_specified",
  });
  // Dispara conversão no Google Ads (lead = conversão principal)
  trackGoogleAdsConversion(100.0);
  // Dispara Lead no Meta Pixel
  trackMetaLead({ content_name: data.reason || 'chat_lead' });
}

/**
 * Rastreia clique no WhatsApp
 * Dispara conversão no Google Ads (contato = conversão)
 */
export function trackWhatsAppClick(source: string) {
  trackEvent("contact_whatsapp", {
    event_category: "contact",
    event_label: source,
    contact_method: "whatsapp",
  });
  trackGoogleAdsConversion(50.0);
  // Dispara Schedule no Meta Pixel (WhatsApp = intenção de agendamento)
  trackMetaSchedule({ content_name: `whatsapp_${source}` });
}

/**
 * Rastreia clique na Doctoralia
 * Dispara conversão no Google Ads (agendamento = conversão)
 */
export function trackDoctoraliaClick(source: string) {
  trackEvent("contact_doctoralia", {
    event_category: "contact",
    event_label: source,
    contact_method: "doctoralia",
  });
  trackGoogleAdsConversion(80.0);
  // Dispara Schedule no Meta Pixel
  trackMetaSchedule({ content_name: source });
}

/**
 * Rastreia clique no telefone
 * Dispara conversão no Google Ads (contato = conversão)
 */
export function trackPhoneClick(source: string) {
  trackEvent("contact_phone", {
    event_category: "contact",
    event_label: source,
    contact_method: "phone",
  });
  trackGoogleAdsConversion(50.0);
}

/**
 * Rastreia abertura do chat
 */
export function trackChatOpen() {
  trackEvent("chat_open", {
    event_category: "engagement",
    event_label: "ai_chat_widget",
  });
}

/**
 * Rastreia visualização de página educativa
 */
export function trackEducationalPageView(pageTitle: string, pagePath: string) {
  trackEvent("page_view_educational", {
    event_category: "content",
    event_label: pageTitle,
    page_path: pagePath,
  });
}

/**
 * Rastreia clique em CTA de agendamento
 * Dispara conversão no Google Ads (CTA = intenção de conversão)
 */
export function trackCtaClick(ctaType: string, source: string) {
  trackEvent("cta_click", {
    event_category: "conversion",
    event_label: ctaType,
    cta_source: source,
  });
  trackGoogleAdsConversion(30.0);
}

// ===== META PIXEL EVENTS =====
// test_event_code para validação no Events Manager
const META_TEST_EVENT_CODE = 'TEST85913';

/**
 * Dispara evento Lead no Meta Pixel
 * Usado quando um lead é captado (chat, formulário)
 */
export function trackMetaLead(data?: { content_name?: string; value?: number }) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: data?.content_name || 'agendamento',
      value: data?.value || 100.0,
      currency: 'BRL',
    }, { eventID: `lead_${Date.now()}` });
    // Enviar test event para validação
    window.fbq('track', 'Lead', {
      content_name: data?.content_name || 'agendamento',
      value: data?.value || 100.0,
      currency: 'BRL',
      test_event_code: META_TEST_EVENT_CODE,
    });
  }
}

/**
 * Dispara evento Schedule no Meta Pixel
 * Usado quando o paciente clica para agendar (Doctoralia, Rede D'Or, WhatsApp)
 */
export function trackMetaSchedule(data?: { content_name?: string; value?: number }) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq('track', 'Schedule', {
      content_name: data?.content_name || 'consulta',
      value: data?.value || 80.0,
      currency: 'BRL',
    }, { eventID: `schedule_${Date.now()}` });
    // Enviar test event para validação
    window.fbq('track', 'Schedule', {
      content_name: data?.content_name || 'consulta',
      value: data?.value || 80.0,
      currency: 'BRL',
      test_event_code: META_TEST_EVENT_CODE,
    });
  }
}
