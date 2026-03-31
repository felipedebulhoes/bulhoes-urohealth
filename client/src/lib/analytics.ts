/**
 * Google Analytics 4 — Event Tracking Utilities
 * ID de medição: G-PJHFGVQPS6
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

// Tipagem global para gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

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
 * Rastreia a captação de um lead pelo chat
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
}

/**
 * Rastreia clique no WhatsApp
 */
export function trackWhatsAppClick(source: string) {
  trackEvent("contact_whatsapp", {
    event_category: "contact",
    event_label: source,
    contact_method: "whatsapp",
  });
}

/**
 * Rastreia clique na Doctoralia
 */
export function trackDoctoraliaClick(source: string) {
  trackEvent("contact_doctoralia", {
    event_category: "contact",
    event_label: source,
    contact_method: "doctoralia",
  });
}

/**
 * Rastreia clique no telefone
 */
export function trackPhoneClick(source: string) {
  trackEvent("contact_phone", {
    event_category: "contact",
    event_label: source,
    contact_method: "phone",
  });
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
 */
export function trackCtaClick(ctaType: string, source: string) {
  trackEvent("cta_click", {
    event_category: "conversion",
    event_label: ctaType,
    cta_source: source,
  });
}
