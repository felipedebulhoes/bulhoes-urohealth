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

  it("nunca envia o motivo da consulta nem dados do chat ao Google Analytics", async () => {
    const gtag = vi.fn();
    const consent = JSON.stringify({ version: "2.0", analytics: true, marketing: true, timestamp: Date.now() });
    (globalThis as any).window = {
      gtag,
      dataLayer: [],
      location: { pathname: "/" },
      localStorage: { getItem: (key: string) => (key === "lgpd_consent" ? consent : null) },
    };

    const { trackLeadGenerated } = await import("@/lib/analytics");
    // Simula uma chamada antiga que ainda passasse dados do formulário.
    (trackLeadGenerated as (data: Record<string, string>) => void)({
      name: "Paciente Teste",
      phone: "(11) 99999-0000",
      reason: "teste123",
      location: "Campinas",
    });

    const sent = JSON.stringify(gtag.mock.calls);
    expect(sent).toContain("generate_lead");
    expect(sent).not.toContain("teste123");
    expect(sent).not.toContain("Paciente Teste");
    expect(sent).not.toContain("99999");

    const widget = readSource("client/src/components/AIChatWidget.tsx");
    const call = widget.slice(widget.indexOf("trackLeadGenerated("), widget.indexOf("trackLeadGenerated(") + 120);
    expect(call).not.toMatch(/reason|name|phone|email/);
    delete (globalThis as any).window;
  });

  it("remove a mensagem do WhatsApp dos links enviados pelo rastreamento global", async () => {
    const { sanitizeLinkUrl } = await import("@/lib/tracking");
    expect(sanitizeLinkUrl("https://wa.me/5511981124455?text=Ol%C3%A1%2C%20sou%20Jo%C3%A3o")).toBe("https://wa.me/5511981124455");
    expect(sanitizeLinkUrl("https://www.doctoralia.com.br/x#agenda")).toBe("https://www.doctoralia.com.br/x");
    expect(sanitizeLinkUrl("tel:+551933014300")).toBe("tel:+551933014300");
    expect(readSource("client/src/lib/tracking.ts")).toContain("link_url: sanitizeLinkUrl(target.href)");
  });

  it("o download de guia envia só o identificador do material, sem o tema clínico por extenso", () => {
    const playbook = readSource("client/src/components/PlaybookSection.tsx");
    const call = playbook.slice(playbook.indexOf('trackEvent("playbook_download"'), playbook.indexOf("fireFormConversionEvents().catch"));
    expect(call).not.toContain("topic_title");
    expect(call).not.toMatch(/cleanName|cleanEmail|phone/);
  });
});
