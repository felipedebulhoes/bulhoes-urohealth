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
 * - share_content: compartilhamento de conteúdo por plataforma
 */

import { hasAnalyticsConsent, hasMarketingConsent } from "./consent";

// Tipagem global para Google tags.
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Google Ads Conversion IDs
const GOOGLE_ADS_CONVERSION_ID = "AW-18050357375";
const GOOGLE_ADS_CONVERSION_LABEL = "1tRMCJ6z3ZscEP-wip9D";
const GOOGLE_ADS_SEND_TO = `${GOOGLE_ADS_CONVERSION_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`;

/**
 * Dispara todos os eventos de conversão do formulário WhatsApp:
 * - conversão Google Ads agregada, sem identificadores pessoais
 * - lead_form_submit, contact_whatsapp, lead_whatsapp
 * Não envia evento ao Meta Pixel: uma solicitação de contato em contexto de
 * saúde pode refletir interesse em atendimento médico.
 * Retorna uma Promise que resolve após o delay técnico (800ms).
 */
export function fireFormConversionEvents(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.gtag && hasMarketingConsent()) {
      window.gtag("event", "conversion", {
        send_to: GOOGLE_ADS_SEND_TO,
        value: 100,
        currency: "BRL",
      });
    }

    if (typeof window !== "undefined" && window.gtag && hasAnalyticsConsent()) {
      window.gtag("event", "lead_form_submit", {
        event_category: "conversion",
        contact_method: "whatsapp",
      });
      window.gtag("event", "contact_whatsapp", {
        event_category: "contact",
        contact_method: "whatsapp",
      });
      window.gtag("event", "lead_whatsapp", {
        event_category: "conversion",
        contact_method: "whatsapp",
      });
    }

    // 4. Aguardar janela técnica antes do redirecionamento
    setTimeout(resolve, 800);
  });
}

/**
 * Envia um evento personalizado para o GA4
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && window.gtag && hasAnalyticsConsent()) {
    window.gtag("event", eventName, params);
  }
}

/**
 * Dispara conversão no Google Ads
 * Chamado automaticamente nos eventos de conversão principais
 */
export function trackGoogleAdsConversion(value: number = 100.0) {
  if (typeof window !== "undefined" && window.gtag && hasMarketingConsent()) {
    window.gtag("event", "conversion", {
      send_to: GOOGLE_ADS_SEND_TO,
      value: value,
      currency: "BRL",
    });
  }
}

/**
 * Rastreia a captação de um lead pelo chat
 * Dispara conversão no GA4 e no Google Ads. A origem clínica não é enviada ao Meta.
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
}

/**
 * Rastreia clique no WhatsApp
 * Dispara conversão no GA4 (contact_whatsapp + lead_whatsapp) e no Google Ads.
 */
export function trackWhatsAppClick(source: string) {
  trackEvent("contact_whatsapp", {
    event_category: "contact",
    event_label: source,
    contact_method: "whatsapp",
  });
  trackEvent("lead_whatsapp", {
    event_category: "conversion",
    event_label: source,
    contact_method: "whatsapp",
  });
  trackGoogleAdsConversion(50.0);
}

/**
 * Rastreia clique na Doctoralia
 * Dispara conversão no GA4 (contact_doctoralia + lead_doctoralia) e no Google Ads.
 */
export function trackDoctoraliaClick(source: string) {
  trackEvent("contact_doctoralia", {
    event_category: "contact",
    event_label: source,
    contact_method: "doctoralia",
  });
  trackEvent("lead_doctoralia", {
    event_category: "conversion",
    event_label: source,
    contact_method: "doctoralia",
  });
  trackGoogleAdsConversion(80.0);
}

/**
 * Rastreia clique no telefone
 * Dispara conversão no GA4 (lead_phone) + Google Ads
 */
export function trackPhoneClick(source: string) {
  // Evento legado (manter para compatibilidade)
  trackEvent("contact_phone", {
    event_category: "contact",
    event_label: source,
    contact_method: "phone",
  });
  // Evento GA4 específico para Google Ads
  trackEvent("lead_phone", {
    event_category: "conversion",
    event_label: source,
    contact_method: "phone",
  });
  trackGoogleAdsConversion(50.0);
}

/**
 * Rastreia clique em Google Maps / rotas (secundário)
 */
export function trackMapsClick(source: string, location?: string) {
  trackEvent("lead_maps", {
    event_category: "engagement",
    event_label: source,
    location: location || "unknown",
  });
  // Não dispara conversão Google Ads (evento secundário)
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

/**
 * Rastreia compartilhamentos sem enviar título, texto clínico ou dados pessoais.
 */
export function trackSocialShare(platform: string, source: string) {
  trackEvent("share_content", {
    event_category: "engagement",
    method: platform,
    content_type: "website_content",
    content_source: source,
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

/**
 * Rastreia a seleção de um conteúdo relacionado sem enviar títulos, termos
 * clínicos digitados ou qualquer dado identificável do visitante.
 */
export function trackRelatedContentClick(source: string, destinationPath: string) {
  trackEvent("select_content", {
    event_category: "engagement",
    content_type: "related_content",
    content_source: source,
    item_id: destinationPath,
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

type PrototypeEventName =
  | "prototype_page_view"
  | "journey_entry_selected"
  | "topic_hub_open"
  | "prototype_section_view"
  | "faq_open"
  | "cta_schedule"
  | "cta_whatsapp"
  | "email_contact_submit"
  | "guide_download"
  | "faq_helpful"
  | "faq_search"
  | "mens_health_filter";

/**
 * Eventos de validação do protótipo. Envia apenas identificadores fixos de
 * interface; nunca respostas, sintomas, diagnósticos ou texto digitado.
 */
export function trackPrototypeEvent(
  eventName: PrototypeEventName,
  componentId: string,
  itemId: string = "not_applicable"
) {
  trackEvent(eventName, {
    event_category: "prototype_validation",
    component_id: componentId,
    item_id: itemId,
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  });
}
