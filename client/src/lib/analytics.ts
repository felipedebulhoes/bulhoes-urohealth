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

// ===== CONVERSÕES OTIMIZADAS (Enhanced Conversions) =====

/**
 * Normaliza número de telefone para formato E.164 (ex: +5511981124455).
 * Remove tudo que não é dígito, adiciona +55 se não tiver DDI.
 */
function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("55") && digits.length >= 12) {
    return `+${digits}`;
  }
  if (digits.length >= 10) {
    return `+55${digits}`;
  }
  return `+55${digits}`;
}

/**
 * Envia user_data normalizado ao Google Ads para Conversões Otimizadas.
 * NUNCA incluir informações clínicas — apenas email e telefone do formulário.
 * Deve ser chamado ANTES de disparar o evento de conversão.
 */
export function setUserDataForOptimizedConversions(data: {
  email?: string;
  phone?: string;
}): void {
  if (typeof window === "undefined" || !window.gtag) return;

  const userData: Record<string, string> = {};

  if (data.email) {
    userData.email = data.email.trim().toLowerCase();
  }
  if (data.phone) {
    userData.phone_number = normalizePhone(data.phone);
  }

  if (Object.keys(userData).length > 0) {
    window.gtag("set", "user_data", userData);
  }
}

/**
 * Dispara todos os eventos de conversão do formulário WhatsApp:
 * - user_data para Conversões Otimizadas
 * - conversion Google Ads
 * - lead_form_submit, contact_whatsapp, lead_whatsapp
 * - Meta Lead
 * Retorna uma Promise que resolve após o delay técnico (800ms).
 */
export function fireFormConversionEvents(data: {
  email?: string;
  phone?: string;
}): Promise<void> {
  return new Promise((resolve) => {
    // 1. Enviar user_data para Enhanced Conversions
    setUserDataForOptimizedConversions(data);

    // 2. Conversão principal Google Ads
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "conversion", {
        send_to: GOOGLE_ADS_SEND_TO,
        value: 100,
        currency: "BRL",
      });

      // 3. Eventos GA4 adicionais
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

    // 4. Meta Lead
    trackMetaLead({ content_name: "form_whatsapp" });

    // 5. Aguardar janela técnica antes do redirecionamento
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
 * Dispara conversão no GA4 (contact_whatsapp + lead_whatsapp) + Google Ads + Meta Pixel
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
  trackMetaSchedule({ content_name: `whatsapp_${source}` });
}

/**
 * Rastreia clique na Doctoralia
 * Dispara conversão no GA4 (contact_doctoralia + lead_doctoralia) + Google Ads + Meta Pixel
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
  trackMetaSchedule({ content_name: source });
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

// ===== META PIXEL EVENTS =====

/**
 * Dispara evento Lead no Meta Pixel
 * Usado quando um lead é captado (chat, formulário)
 * 
 * Valores otimizados baseados no ticket médio de consulta urológica particular:
 * - Consulta padrão: R$600-800
 * - Procedimento (vasectomia, estética): R$3.000-8.000
 * - Lead qualificado (formulário com dados): R$250 (taxa de conversão ~30%)
 * - Lead frio (chat genérico): R$150
 */
export function trackMetaLead(data?: { content_name?: string; value?: number }) {
  // Valor dinâmico baseado no tipo de lead
  const defaultValue = getLeadValue(data?.content_name);
  const value = data?.value || defaultValue;

  if (typeof window !== "undefined" && window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: data?.content_name || 'agendamento',
      value,
      currency: 'BRL',
    }, { eventID: `lead_${Date.now()}` });
  }
}

/**
 * Calcula valor do lead baseado no contexto/origem
 * Valores calibrados para otimização do algoritmo Meta Ads
 */
function getLeadValue(contentName?: string): number {
  if (!contentName) return 150;
  
  // Leads de alto valor (procedimentos cirúrgicos)
  if (contentName.includes('vasectomia')) return 400;
  if (contentName.includes('estetica') || contentName.includes('engrossamento')) return 500;
  if (contentName.includes('andrologia') || contentName.includes('performance')) return 350;
  if (contentName.includes('robotica') || contentName.includes('cirurgia')) return 600;
  
  // Leads de formulário com dados (qualificados)
  if (contentName.includes('form_')) return 250;
  
  // Leads de chat (qualificação variável)
  if (contentName.includes('chat')) return 200;
  
  // Lead genérico
  return 150;
}

/**
 * Dispara evento Schedule no Meta Pixel
 * Usado quando o paciente clica para agendar (Doctoralia, Rede D'Or, WhatsApp)
 * 
 * Valores otimizados baseados no canal de agendamento:
 * - Doctoralia: R$300 (alta intenção, taxa de conversão ~50%)
 * - WhatsApp: R$200 (intenção média, taxa de conversão ~35%)
 * - Rede D'Or: R$350 (alta intenção, paciente já no sistema)
 * - Telefone: R$180 (intenção variável)
 */
export function trackMetaSchedule(data?: { content_name?: string; value?: number }) {
  // Valor dinâmico baseado no canal de agendamento
  const defaultValue = getScheduleValue(data?.content_name);
  const value = data?.value || defaultValue;

  if (typeof window !== "undefined" && window.fbq) {
    window.fbq('track', 'Schedule', {
      content_name: data?.content_name || 'consulta',
      value,
      currency: 'BRL',
    }, { eventID: `schedule_${Date.now()}` });
  }
}

/**
 * Calcula valor do agendamento baseado no canal e contexto
 * Valores calibrados para otimização do algoritmo Meta Ads
 */
function getScheduleValue(contentName?: string): number {
  if (!contentName) return 200;
  
  // Canal Doctoralia (alta intenção)
  if (contentName.includes('doctoralia')) return 300;
  
  // Canal Rede D'Or (alta intenção)
  if (contentName.includes('rededorsaoluiz') || contentName.includes('rede_dor')) return 350;
  
  // Canal WhatsApp (intenção média-alta)
  if (contentName.includes('whatsapp')) return 200;
  
  // Contexto de procedimento específico (alto ticket)
  if (contentName.includes('vasectomia')) return 400;
  if (contentName.includes('estetica') || contentName.includes('engrossamento')) return 450;
  if (contentName.includes('andrologia')) return 350;
  if (contentName.includes('robotica')) return 500;
  
  // Agendamento genérico
  return 200;
}
