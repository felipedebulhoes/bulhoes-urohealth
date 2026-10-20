import { beforeEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const readSource = (path: string) => readFileSync(resolve(projectRoot, path), "utf8");

describe("mensuração pública com privacidade", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("configura Consent Mode negado antes de qualquer tag e não habilita Conversões Otimizadas", () => {
    const html = readSource("client/index.html");
    const consentDefault = html.indexOf("gtag('consent', 'default'");
    const gaConfig = html.indexOf("gtag('config', 'G-PJHFGVQPS6'");

    expect(consentDefault).toBeGreaterThan(-1);
    expect(consentDefault).toBeLessThan(gaConfig);
    expect(html).toContain("ad_storage: 'denied'");
    expect(html).toContain("ad_user_data: 'denied'");
    expect(html).toContain("ad_personalization: 'denied'");
    expect(html).toContain("analytics_storage: 'denied'");
    expect(html).not.toContain("allow_enhanced_conversions");
    expect(html).not.toContain("fbevents.js");
  });

  it("carrega Meta e GTM somente após o consentimento aplicável", () => {
    const app = readSource("client/src/App.tsx");
    const gtm = readSource("client/src/components/GoogleTagManager.tsx");

    expect(app).toContain("<MetaPixel />");
    expect(gtm).toContain("readConsent()");
    expect(gtm).toContain("consent_analytics: consent.analytics");
    expect(gtm).toContain("consent_marketing: consent.marketing");
  });

  it("não envia email ou telefone do formulário para mensuração", () => {
    const analytics = readSource("client/src/lib/analytics.ts");
    const tracking = readSource("client/src/lib/tracking.ts");
    const quickForm = readSource("client/src/components/QuickContactForm.tsx");
    const contactForm = readSource("client/src/pages/Contato.tsx");

    expect(analytics).not.toContain("user_data");
    expect(analytics).not.toContain("setUserDataForOptimizedConversions");
    expect(analytics).toContain("export function fireFormConversionEvents(): Promise<void>");
    expect(quickForm).toContain("await fireFormConversionEvents();");
    expect(contactForm).toContain("await fireFormConversionEvents();");
    expect(tracking).toContain("hasAnalyticsConsent");
    expect(tracking).toContain("hasMarketingConsent");
  });

  it("aplica a preferência escolhida imediatamente e permite sua revogação", async () => {
    const banner = readSource("client/src/components/CookieBanner.tsx");
    const privacyPolicy = readSource("client/src/pages/PrivacyPolicy.tsx");
    const stored = new Map<string, string>();
    const gtag = vi.fn();
    const dispatchEvent = vi.fn();

    (globalThis as typeof globalThis & { window: Window }).window = {
      gtag,
      localStorage: {
        getItem: (key: string) => stored.get(key) ?? null,
        setItem: (key: string, value: string) => stored.set(key, value),
      },
      dispatchEvent,
    } as unknown as Window;

    const consent = await import("@/lib/consent");
    consent.saveConsent({ analytics: true, marketing: false });

    expect(consent.readConsent()).toEqual({ analytics: true, marketing: false });
    expect(gtag).toHaveBeenCalledWith("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });

    consent.saveConsent({ analytics: false, marketing: false });
    expect(consent.readConsent()).toEqual({ analytics: false, marketing: false });
    expect(banner).toContain("open_cookie_preferences");
    expect(privacyPolicy).toContain("Gerenciar preferências de cookies");
  });
});
