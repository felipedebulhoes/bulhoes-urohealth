export const CONSENT_STORAGE_KEY = "lgpd_consent";
export const CONSENT_VERSION = "2.0";

export interface ConsentPreferences {
  analytics: boolean;
  marketing: boolean;
}

interface StoredConsent extends ConsentPreferences {
  version: string;
  timestamp: number;
}

const defaultConsent: ConsentPreferences = { analytics: false, marketing: false };
const marketingStorageKeys = [
  "fb_ads_attribution",
  "ads_gclid",
  "ads_gbraid",
  "ads_wbraid",
  "ads_utm_source",
  "ads_utm_medium",
  "ads_utm_campaign",
  "ads_utm_term",
  "ads_utm_content",
];

function getWindow(): Window | null {
  return typeof window === "undefined" ? null : window;
}

function clearMarketingStorage(browser: Window) {
  for (const key of marketingStorageKeys) {
    try {
      browser.localStorage.removeItem(key);
    } catch {
      // Armazenamento local pode estar indisponível no modo privado.
    }
    if (typeof document !== "undefined") {
      document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
    }
  }
}

function applyGoogleConsent(preferences: ConsentPreferences) {
  const browser = getWindow() as (Window & { gtag?: (...args: unknown[]) => void }) | null;
  if (!browser?.gtag) return;

  browser.gtag("consent", "update", {
    analytics_storage: preferences.analytics ? "granted" : "denied",
    ad_storage: preferences.marketing ? "granted" : "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

function applyMetaConsent(preferences: ConsentPreferences) {
  const browser = getWindow() as (Window & { fbq?: (...args: unknown[]) => void }) | null;
  if (!browser?.fbq) return;
  browser.fbq("consent", preferences.marketing ? "grant" : "revoke");
}

export function readConsent(): ConsentPreferences {
  const browser = getWindow();
  if (!browser) return defaultConsent;

  try {
    const raw = browser.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return defaultConsent;
    const stored = JSON.parse(raw) as Partial<StoredConsent>;
    if (stored.version !== CONSENT_VERSION) return defaultConsent;
    return {
      analytics: stored.analytics === true,
      marketing: stored.marketing === true,
    };
  } catch {
    return defaultConsent;
  }
}

export function hasAnalyticsConsent() {
  return readConsent().analytics;
}

export function hasMarketingConsent() {
  return readConsent().marketing;
}

export function saveConsent(preferences: ConsentPreferences) {
  const browser = getWindow();
  if (!browser) return;

  const normalized: ConsentPreferences = {
    analytics: preferences.analytics === true,
    marketing: preferences.marketing === true,
  };
  const stored: StoredConsent = {
    ...normalized,
    version: CONSENT_VERSION,
    timestamp: Date.now(),
  };

  try {
    browser.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // Sem persistência local, a preferência continua válida na página atual.
  }

  applyGoogleConsent(normalized);
  applyMetaConsent(normalized);
  if (!normalized.marketing) clearMarketingStorage(browser);
  browser.dispatchEvent(new Event("cookie_consent_updated"));
}
