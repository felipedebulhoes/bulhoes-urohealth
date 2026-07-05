/**
 * Advanced Tracking Module — Google Ads Attribution & UTM Persistence
 * 
 * Funcionalidades:
 * 1. Captura e persiste gclid, gbraid, wbraid e UTMs por 90 dias (localStorage + cookies first-party)
 * 2. Eventos GA4 específicos por tipo de clique (lead_whatsapp, lead_doctoralia, lead_phone, lead_maps)
 * 3. Placeholders para labels de conversão Google Ads por tipo de evento
 * 4. WhatsApp parametrizado com mensagens diferentes por página/campanha
 * 5. Listener global de cliques para captura automática de eventos de contato
 * 
 * Google Ads ID: AW-18050357375
 * GA4 ID: G-PJHFGVQPS6
 */

// ===== CONFIGURAÇÃO =====
const GOOGLE_ADS_ID = "AW-18050357375";
const STORAGE_KEY = "fb_ads_attribution";
const COOKIE_PREFIX = "ads_";
const EXPIRY_DAYS = 90;

// Placeholders para labels de conversão Google Ads (configurar no painel do Google Ads)
const GOOGLE_ADS_LABELS: Record<string, string> = {
  lead_whatsapp: "1tRMCJ6z3ZscEP-wip9D",
  lead_doctoralia: "1tRMCJ6z3ZscEP-wip9D",
  lead_phone: "1tRMCJ6z3ZscEP-wip9D",
  lead_maps: "",
  lead_chat: "1tRMCJ6z3ZscEP-wip9D",
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

// ===== COOKIES FIRST-PARTY =====

/**
 * Define um cookie first-party com expiração configurável
 */
function setCookie(name: string, value: string, days: number = EXPIRY_DAYS): void {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/; SameSite=Lax`;
}

/**
 * Obtém um cookie pelo nome
 */
function getCookie(name: string): string | null {
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(nameEQ)) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }
  return null;
}

/**
 * Persiste parâmetros individuais em cookies first-party como backup
 */
function persistToCookies(data: AttributionData): void {
  const params = ["gclid", "gbraid", "wbraid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
  params.forEach((param) => {
    const value = data[param];
    if (value) {
      try {
        setCookie(`${COOKIE_PREFIX}${param}`, value);
      } catch {
        // Cookie indisponível
      }
    }
  });
}

/**
 * Recupera parâmetros de cookies first-party (fallback quando localStorage falha)
 */
function getFromCookies(): Partial<AttributionData> | null {
  const params = ["gclid", "gbraid", "wbraid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
  const result: Partial<AttributionData> = {};
  let hasAny = false;

  params.forEach((param) => {
    const value = getCookie(`${COOKIE_PREFIX}${param}`);
    if (value) {
      (result as any)[param] = value;
      hasAny = true;
    }
  });

  return hasAny ? result : null;
}

// ===== GCLID / UTM PERSISTENCE =====

/**
 * Captura gclid, gbraid, wbraid e UTMs da URL e persiste em localStorage + cookies por 90 dias.
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

  // Persistir em localStorage
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage indisponível (modo privado em alguns browsers)
  }

  // Persistir em cookies first-party (backup)
  persistToCookies(data);
}

/**
 * Recupera dados de atribuição persistidos.
 * Tenta localStorage primeiro, depois cookies como fallback.
 * Retorna null se expirado ou inexistente.
 */
export function getAttribution(): AttributionData | null {
  if (typeof window === "undefined") return null;

  // Tentar localStorage primeiro
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data: AttributionData = JSON.parse(raw);
      if (Date.now() > data.expiry) {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        return data;
      }
    }
  } catch {
    // localStorage indisponível
  }

  // Fallback: tentar cookies
  const cookieData = getFromCookies();
  if (cookieData) {
    return {
      ...cookieData,
      timestamp: Date.now(),
      expiry: Date.now() + EXPIRY_DAYS * 24 * 60 * 60 * 1000,
    } as AttributionData;
  }

  return null;
}

// ===== ENGAGEMENT METRICS =====

/**
 * Rastreia tempo na página, interações (cliques, scrolls) e profundidade de scroll.
 * Métricas são anexadas automaticamente a cada evento de conversão.
 */
const engagement = {
  pageLoadTime: Date.now(),
  clicks: 0,
  scrolls: 0,
  maxScrollDepth: 0,
  initialized: false,
};

/**
 * Inicializa rastreamento de engajamento na página.
 * Deve ser chamado uma vez no carregamento.
 */
export function initEngagementTracking(): void {
  if (typeof window === "undefined" || engagement.initialized) return;
  engagement.initialized = true;
  engagement.pageLoadTime = Date.now();
  engagement.clicks = 0;
  engagement.scrolls = 0;
  engagement.maxScrollDepth = 0;

  // Contar cliques
  document.addEventListener("click", () => {
    engagement.clicks++;
  }, { passive: true });

  // Contar scrolls e profundidade máxima
  let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
  window.addEventListener("scroll", () => {
    if (!scrollTimeout) {
      engagement.scrolls++;
    }
    // Debounce scroll count (1 scroll = 1 gesto contínuo)
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => { scrollTimeout = null; }, 150);

    // Calcular profundidade de scroll
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      const depth = Math.round((scrollTop / docHeight) * 100);
      if (depth > engagement.maxScrollDepth) {
        engagement.maxScrollDepth = depth;
      }
    }
  }, { passive: true });

  // Reset ao navegar (SPA)
  const originalPushState = history.pushState;
  history.pushState = function (...args) {
    engagement.pageLoadTime = Date.now();
    engagement.clicks = 0;
    engagement.scrolls = 0;
    engagement.maxScrollDepth = 0;
    return originalPushState.apply(this, args);
  };
}

/**
 * Retorna métricas de engajamento atuais
 */
function getEngagementMetrics() {
  return {
    time_on_page_seconds: Math.round((Date.now() - engagement.pageLoadTime) / 1000),
    interactions_clicks: engagement.clicks,
    interactions_scrolls: engagement.scrolls,
    max_scroll_depth_percent: engagement.maxScrollDepth,
  };
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
  
  // Anexar dados de atribuição e métricas de engajamento ao evento
  const attribution = getAttribution();
  const engagementData = getEngagementMetrics();
  const enrichedParams: Record<string, string | number | boolean | undefined> = {
    ...params,
    page_path: window.location.pathname,
    service_context: getServiceContext(),
    // Métricas de engajamento
    time_on_page_seconds: engagementData.time_on_page_seconds,
    interactions_clicks: engagementData.interactions_clicks,
    interactions_scrolls: engagementData.interactions_scrolls,
    max_scroll_depth_percent: engagementData.max_scroll_depth_percent,
    // Atribuição
    ...(attribution?.gclid && { gclid: attribution.gclid }),
    ...(attribution?.gbraid && { gbraid: attribution.gbraid }),
    ...(attribution?.wbraid && { wbraid: attribution.wbraid }),
    ...(attribution?.utm_source && { utm_source: attribution.utm_source }),
    ...(attribution?.utm_medium && { utm_medium: attribution.utm_medium }),
    ...(attribution?.utm_campaign && { utm_campaign: attribution.utm_campaign }),
    ...(attribution?.utm_term && { utm_term: attribution.utm_term }),
    ...(attribution?.utm_content && { utm_content: attribution.utm_content }),
  };

  window.gtag("event", eventName, enrichedParams);
}

function fireGoogleAdsConversion(eventType: string, value: number) {
  if (typeof window === "undefined" || !window.gtag) return;

  const label = GOOGLE_ADS_LABELS[eventType];
  if (!label) return;
  // Não disparar se label for placeholder
  if (label.includes("AQUI")) return;

  window.gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${label}`,
    value,
    currency: "BRL",
  });
}

/**
 * Determina o contexto do serviço baseado na página atual
 */
function getServiceContext(): string {
  if (typeof window === "undefined") return "geral";
  const pathname = window.location.pathname;
  if (pathname.includes("vasectomia")) return "vasectomia";
  if (pathname.includes("andrologia")) return "andrologia";
  if (pathname.includes("estetica-intima")) return "estetica_intima";
  if (pathname.includes("glp1") || pathname.includes("canetas")) return "glp1";
  if (pathname.includes("cirurgia-robotica")) return "cirurgia_robotica";
  if (pathname.includes("litotripsia")) return "litotripsia";
  if (pathname.includes("biopsia")) return "biopsia";
  if (pathname === "/") return "marca";
  return "geral";
}

// ===== FUNÇÕES DE TRACKING POR TIPO =====

/**
 * Evento: lead_whatsapp
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
 */
export function trackLeadMaps(source: string, location?: string) {
  fireGA4Event("lead_maps", {
    event_category: "engagement",
    event_label: source,
    location: location || "unknown",
  });
}

// ===== LISTENER GLOBAL DE CLIQUES (FALLBACK) =====

/**
 * Detecta tipo de evento baseado na URL do link
 */
function getContactEventType(url: string): string | null {
  if (url.includes("wa.me") || url.includes("whatsapp") || url.includes("api.whatsapp")) {
    return "lead_whatsapp";
  }
  if (url.includes("doctoralia.com.br") || url.includes("rededorsaoluiz.com.br")) {
    return "lead_doctoralia";
  }
  if (url.startsWith("tel:")) {
    return "lead_phone";
  }
  if (url.includes("maps.google.com") || url.includes("maps.app.goo.gl") || url.includes("google.com/maps")) {
    return "lead_maps";
  }
  return null;
}

/**
 * Inicializa listener global de cliques para captura automática de eventos de contato.
 * Funciona como fallback — captura cliques em links de contato mesmo sem onClick explícito.
 * Deve ser chamado uma vez no carregamento da página.
 */
export function initGlobalContactListener(): void {
  if (typeof window === "undefined") return;

  const handleClick = (e: MouseEvent) => {
    // Encontrar o link mais próximo (pode ser o target ou um pai)
    const target = (e.target as HTMLElement).closest("a") as HTMLAnchorElement | null;
    if (!target || !target.href) return;

    const eventType = getContactEventType(target.href);
    if (!eventType) return;

    // Verificar se já foi rastreado por onClick explícito (evitar duplicação)
    if (target.dataset.tracked === "true") return;

    fireGA4Event(eventType, {
      event_category: "conversion",
      event_label: `global_${window.location.pathname.replace(/\//g, "_")}`,
      contact_method: eventType.replace("lead_", ""),
      link_url: target.href,
      link_text: target.textContent?.trim()?.substring(0, 50) || "",
    });

    // Disparar conversão Google Ads
    const values: Record<string, number> = {
      lead_whatsapp: 50.0,
      lead_doctoralia: 80.0,
      lead_phone: 50.0,
      lead_maps: 0,
    };
    if (values[eventType]) {
      fireGoogleAdsConversion(eventType, values[eventType]);
    }
  };

  // Usar capture phase para pegar antes da navegação
  document.addEventListener("click", handleClick, true);
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

  // Adicionar origem do tráfego (UTM) na mensagem para rastrear campanhas
  const attribution = getAttribution();
  let finalMessage = message;
  const trafficParts: string[] = [];
  if (attribution?.utm_source) trafficParts.push(attribution.utm_source);
  if (attribution?.utm_medium) trafficParts.push(attribution.utm_medium);
  if (attribution?.utm_campaign) trafficParts.push(attribution.utm_campaign);
  if (!trafficParts.length && (attribution?.gclid || attribution?.gbraid || attribution?.wbraid)) {
    trafficParts.push("google", "cpc");
  }
  if (trafficParts.length > 0) {
    finalMessage += `\n[via: ${trafficParts.join("/")}]`;
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
