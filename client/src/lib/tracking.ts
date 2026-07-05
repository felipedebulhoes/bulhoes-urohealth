/**
 * Advanced Tracking Module — Google Ads Attribution & UTM Persistence
 * 
 * Funcionalidades:
 * 1. Captura e persiste gclid, gbraid, wbraid e UTMs por 90 dias (localStorage)
 * 2. Eventos GA4 específicos por tipo de clique (lead_whatsapp, lead_doctoralia, lead_phone, lead_maps)
 * 3. Placeholders para labels de conversão Google Ads por tipo de evento
 * 4. WhatsApp parametrizado com mensagens diferentes por página/campanha
 * 
 * Google Ads ID: AW-18050357375
 * GA4 ID: G-PJHFGVQPS6
 */

// ===== CONFIGURAÇÃO =====
const GOOGLE_ADS_ID = "AW-18050357375";
const STORAGE_KEY = "fb_ads_attribution";
const EXPIRY_DAYS = 90;

// Placeholders para labels de conversão Google Ads (configurar no painel do Google Ads)
// Cada tipo de conversão pode ter seu próprio label
const GOOGLE_ADS_LABELS: Record<string, string> = {
  lead_whatsapp: "1tRMCJ6z3ZscEP-wip9D", // Label principal (atualizar quando criar conversões separadas)
  lead_doctoralia: "1tRMCJ6z3ZscEP-wip9D", // Placeholder — criar conversão separada no Google Ads
  lead_phone: "1tRMCJ6z3ZscEP-wip9D", // Placeholder — criar conversão separada no Google Ads
  lead_maps: "", // Secundário — sem conversão Ads por padrão
  lead_chat: "1tRMCJ6z3ZscEP-wip9D", // Label principal
};

// ===== TIPOS =====
interface AttributionData {
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  landing_page?: string;
  timestamp: number;
  expiry: number;
}

// ===== GCLID / UTM PERSISTENCE =====

/**
 * Captura gclid, gbraid, wbraid e UTMs da URL e persiste em localStorage por 90 dias.
 * Deve ser chamado uma vez no carregamento da página (App.tsx ou main.tsx).
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const gclid = params.get("gclid");
  const gbraid = params.get("gbraid");
  const wbraid = params.get("wbraid");
  const utm_source = params.get("utm_source");
  const utm_medium = params.get("utm_medium");
  const utm_campaign = params.get("utm_campaign");
  const utm_term = params.get("utm_term");
  const utm_content = params.get("utm_content");

  // Só persiste se houver algum parâmetro de atribuição
  const hasAttribution = gclid || gbraid || wbraid || utm_source || utm_medium || utm_campaign;
  if (!hasAttribution) return;

  const now = Date.now();
  const expiry = now + EXPIRY_DAYS * 24 * 60 * 60 * 1000;

  const data: AttributionData = {
    ...(gclid && { gclid }),
    ...(gbraid && { gbraid }),
    ...(wbraid && { wbraid }),
    ...(utm_source && { utm_source }),
    ...(utm_medium && { utm_medium }),
    ...(utm_campaign && { utm_campaign }),
    ...(utm_term && { utm_term }),
    ...(utm_content && { utm_content }),
    landing_page: window.location.pathname,
    timestamp: now,
    expiry,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage indisponível (modo privado em alguns browsers)
  }
}

/**
 * Recupera dados de atribuição persistidos. Retorna null se expirado ou inexistente.
 */
export function getAttribution(): AttributionData | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const data: AttributionData = JSON.parse(raw);
    if (Date.now() > data.expiry) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

// ===== EVENTOS GA4 ESPECÍFICOS =====

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    fbq: (...args: any[]) => void;
  }
}

function fireGA4Event(eventName: string, params: Record<string, string | number | boolean | undefined>) {
  if (typeof window === "undefined" || !window.gtag) return;
  
  // Anexar dados de atribuição ao evento
  const attribution = getAttribution();
  const enrichedParams: Record<string, string | number | boolean | undefined> = {
    ...params,
    ...(attribution?.gclid && { gclid: attribution.gclid }),
    ...(attribution?.utm_source && { utm_source: attribution.utm_source }),
    ...(attribution?.utm_medium && { utm_medium: attribution.utm_medium }),
    ...(attribution?.utm_campaign && { utm_campaign: attribution.utm_campaign }),
    ...(attribution?.utm_term && { utm_term: attribution.utm_term }),
  };

  window.gtag("event", eventName, enrichedParams);
}

function fireGoogleAdsConversion(eventType: string, value: number) {
  if (typeof window === "undefined" || !window.gtag) return;

  const label = GOOGLE_ADS_LABELS[eventType];
  if (!label) return; // Sem label configurado = não dispara conversão Ads

  window.gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${label}`,
    value,
    currency: "BRL",
  });
}

/**
 * Evento: lead_whatsapp
 * Disparado quando o paciente clica no botão de WhatsApp
 */
export function trackLeadWhatsApp(source: string, campaign?: string) {
  fireGA4Event("lead_whatsapp", {
    event_category: "conversion",
    event_label: source,
    contact_method: "whatsapp",
    campaign: campaign || "organic",
  });
  fireGoogleAdsConversion("lead_whatsapp", 50.0);
}

/**
 * Evento: lead_doctoralia
 * Disparado quando o paciente clica no botão de agendamento Doctoralia
 */
export function trackLeadDoctoralia(source: string, campaign?: string) {
  fireGA4Event("lead_doctoralia", {
    event_category: "conversion",
    event_label: source,
    contact_method: "doctoralia",
    campaign: campaign || "organic",
  });
  fireGoogleAdsConversion("lead_doctoralia", 80.0);
}

/**
 * Evento: lead_phone
 * Disparado quando o paciente clica em um link tel:
 */
export function trackLeadPhone(source: string, phoneNumber?: string) {
  fireGA4Event("lead_phone", {
    event_category: "conversion",
    event_label: source,
    contact_method: "phone",
    phone_number: phoneNumber || "unknown",
  });
  fireGoogleAdsConversion("lead_phone", 50.0);
}

/**
 * Evento: lead_maps (secundário)
 * Disparado quando o paciente clica em "Como chegar" / Google Maps
 */
export function trackLeadMaps(source: string, location?: string) {
  fireGA4Event("lead_maps", {
    event_category: "engagement",
    event_label: source,
    location: location || "unknown",
  });
  // Não dispara conversão Ads (evento secundário)
}

// ===== WHATSAPP PARAMETRIZADO =====

/**
 * Gera URL do WhatsApp com mensagem personalizada por página/campanha.
 * Inclui UTM/gclid tracking na mensagem quando disponível.
 */
export function getWhatsAppUrl(options: {
  phone?: string;
  page: string;
  campaign?: string;
  customMessage?: string;
}): string {
  const { phone = "5511981124455", page, campaign, customMessage } = options;

  // Mensagens padrão por página/campanha
  const messages: Record<string, string> = {
    "vasectomia": "Olá! Gostaria de agendar uma consulta sobre vasectomia sem bisturi com o Dr. Felipe Bulhões.",
    "vasectomia-sem-bisturi": "Olá! Gostaria de agendar uma consulta sobre vasectomia sem bisturi com o Dr. Felipe Bulhões.",
    "andrologia": "Olá! Gostaria de agendar uma consulta de andrologia com o Dr. Felipe Bulhões.",
    "andrologia-performance-masculina": "Olá! Gostaria de agendar uma consulta sobre saúde e performance masculina com o Dr. Felipe Bulhões.",
    "estetica-intima": "Olá! Gostaria de agendar uma consulta sobre estética íntima masculina com o Dr. Felipe Bulhões.",
    "estetica-intima-masculina": "Olá! Gostaria de agendar uma consulta sobre estética íntima masculina com o Dr. Felipe Bulhões.",
    "campinas": "Olá! Gostaria de agendar uma consulta com o Dr. Felipe Bulhões em Campinas.",
    "homepage": "Olá! Gostaria de agendar uma consulta com o Dr. Felipe Bulhões.",
    "guia-glp1": "Olá! Gostaria de agendar uma consulta sobre canetas GLP-1 e saúde masculina com o Dr. Felipe Bulhões.",
    "default": "Olá! Gostaria de agendar uma consulta com o Dr. Felipe Bulhões.",
  };

  const message = customMessage || messages[page] || messages[campaign || ""] || messages["default"];

  // Adicionar referência de campanha se disponível
  const attribution = getAttribution();
  let finalMessage = message;
  if (attribution?.utm_campaign) {
    finalMessage += ` [ref: ${attribution.utm_campaign}]`;
  }

  return `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(finalMessage)}`;
}

/**
 * Mensagens de WhatsApp para Campinas Day Hospital
 */
export function getWhatsAppCampinasUrl(page: string): string {
  return getWhatsAppUrl({
    phone: "5519998559890",
    page,
    campaign: "campinas",
  });
}
