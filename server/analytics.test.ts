import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock window.gtag
const mockGtag = vi.fn();

describe("Google Analytics 4 — Event Tracking", () => {
  beforeEach(() => {
    // Setup global gtag mock
    (globalThis as any).window = {
      gtag: mockGtag,
      dataLayer: [],
      location: { pathname: "/test" },
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
    delete (globalThis as any).window;
  });

  it("should export all tracking functions", async () => {
    const analytics = await import("@/lib/analytics");
    expect(analytics.trackEvent).toBeDefined();
    expect(analytics.trackLeadGenerated).toBeDefined();
    expect(analytics.trackWhatsAppClick).toBeDefined();
    expect(analytics.trackDoctoraliaClick).toBeDefined();
    expect(analytics.trackPhoneClick).toBeDefined();
    expect(analytics.trackChatOpen).toBeDefined();
    expect(analytics.trackEducationalPageView).toBeDefined();
    expect(analytics.trackCtaClick).toBeDefined();
  });

  it("should call gtag with correct event name and params via trackEvent", async () => {
    const { trackEvent } = await import("@/lib/analytics");
    trackEvent("test_event", { key: "value" });
    expect(mockGtag).toHaveBeenCalledWith("event", "test_event", { key: "value" });
  });

  it("should track lead generation with generate_lead event", async () => {
    const { trackLeadGenerated } = await import("@/lib/analytics");
    trackLeadGenerated({
      name: "João Silva",
      phone: "(11) 99999-0000",
      reason: "Consulta urológica",
      location: "Campinas",
    });
    expect(mockGtag).toHaveBeenCalledWith("event", "generate_lead", {
      event_category: "conversion",
      event_label: "Consulta urológica",
      lead_source: "ai_chat",
      preferred_location: "Campinas",
    });
  });

  it("should track WhatsApp clicks with contact_whatsapp event", async () => {
    const { trackWhatsAppClick } = await import("@/lib/analytics");
    trackWhatsAppClick("hero_section");
    expect(mockGtag).toHaveBeenCalledWith("event", "contact_whatsapp", {
      event_category: "contact",
      event_label: "hero_section",
      contact_method: "whatsapp",
    });
  });

  it("should track Doctoralia clicks with contact_doctoralia event", async () => {
    const { trackDoctoraliaClick } = await import("@/lib/analytics");
    trackDoctoraliaClick("contact_section");
    expect(mockGtag).toHaveBeenCalledWith("event", "contact_doctoralia", {
      event_category: "contact",
      event_label: "contact_section",
      contact_method: "doctoralia",
    });
  });

  it("should track phone clicks with contact_phone event", async () => {
    const { trackPhoneClick } = await import("@/lib/analytics");
    trackPhoneClick("footer");
    expect(mockGtag).toHaveBeenCalledWith("event", "contact_phone", {
      event_category: "contact",
      event_label: "footer",
      contact_method: "phone",
    });
  });

  it("should track chat open with chat_open event", async () => {
    const { trackChatOpen } = await import("@/lib/analytics");
    trackChatOpen();
    expect(mockGtag).toHaveBeenCalledWith("event", "chat_open", {
      event_category: "engagement",
      event_label: "ai_chat_widget",
    });
  });

  it("should track educational page views with page_view_educational event", async () => {
    const { trackEducationalPageView } = await import("@/lib/analytics");
    trackEducationalPageView("Infertilidade Masculina", "/educativo/infertilidade-masculina");
    expect(mockGtag).toHaveBeenCalledWith("event", "page_view_educational", {
      event_category: "content",
      event_label: "Infertilidade Masculina",
      page_path: "/educativo/infertilidade-masculina",
    });
  });

  it("should track CTA clicks with cta_click event", async () => {
    const { trackCtaClick } = await import("@/lib/analytics");
    trackCtaClick("agendar_consulta", "header_desktop");
    expect(mockGtag).toHaveBeenCalledWith("event", "cta_click", {
      event_category: "conversion",
      event_label: "agendar_consulta",
      cta_source: "header_desktop",
    });
  });

  it("should handle missing gtag gracefully (no error thrown)", async () => {
    // Remove gtag from window
    (globalThis as any).window = { dataLayer: [], location: { pathname: "/" } };
    const { trackEvent } = await import("@/lib/analytics");
    expect(() => trackEvent("test_event")).not.toThrow();
  });

  it("should use default values when optional params are missing in trackLeadGenerated", async () => {
    const { trackLeadGenerated } = await import("@/lib/analytics");
    trackLeadGenerated({ name: "Maria", phone: "(11) 98888-0000" });
    expect(mockGtag).toHaveBeenCalledWith("event", "generate_lead", {
      event_category: "conversion",
      event_label: "chat_lead",
      lead_source: "ai_chat",
      preferred_location: "not_specified",
    });
  });
});
