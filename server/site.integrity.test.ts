import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");

describe("Integridade das páginas públicas", () => {
  it("mantém o fallback noscript do Meta Pixel dentro do body", () => {
    const html = readFileSync(resolve(projectRoot, "client/index.html"), "utf8");
    const head = html.match(/<head>[\s\S]*?<\/head>/)?.[0] ?? "";
    const body = html.match(/<body>[\s\S]*?<\/body>/)?.[0] ?? "";

    expect(head).not.toContain("<noscript>");
    expect(body).toContain("facebook.com/tr?id=1730608694762791");
  });

  it("oferece um CTA rastreado para a agenda da Doctoralia sem iframe incorporado", () => {
    const page = readFileSync(resolve(projectRoot, "client/src/pages/Agendamento.tsx"), "utf8");

    expect(page).toContain('href="/agendar/doctoralia"');
    expect(page).toContain('trackDoctoraliaClick("agendamento_page")');
    expect(page).not.toContain("data-zlw-type");
  });

  it("não mantém referências ao arquivo antigo do logotipo", () => {
    const files = [
      "client/src/components/Header.tsx",
      "client/src/components/Footer.tsx",
      "client/src/components/CampaignLayout.tsx",
      "client/src/components/EducationalLayout.tsx",
      "client/src/pages/Agendamento.tsx",
    ];

    for (const file of files) {
      const source = readFileSync(resolve(projectRoot, file), "utf8");
      expect(source).not.toContain("logo-landscape_be6628b3.svg");
      expect(source).toContain("logo-landscape-dr-felipe_cc84d4a3.svg");
    }
  });

  it("mantém páginas e seções secundárias em carregamento sob demanda", () => {
    const app = readFileSync(resolve(projectRoot, "client/src/App.tsx"), "utf8");
    const home = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");

    expect(app).toContain('const Blog = lazy(() => import("./pages/Blog"))');
    expect(home).toContain('lazy(() => import("@/components/AIChatWidget"))');
    expect(home).toContain("<DeferredSection");
  });

  it("usa o renderizador Markdown leve sem carregar streamdown", () => {
    const files = [
      "client/src/components/AIChatBox.tsx",
      "client/src/components/AIChatWidget.tsx",
      "client/src/pages/AdminKeywords.tsx",
      "client/src/pages/BlogPost.tsx",
    ];

    for (const file of files) {
      const source = readFileSync(resolve(projectRoot, file), "utf8");
      expect(source).toContain("LightMarkdown");
      expect(source).not.toContain('from "streamdown"');
      expect(source).not.toContain('import("streamdown")');
    }
  });

  it("mantém feedback acessível nos CTAs e compartilhamento social rastreado", () => {
    const cta = readFileSync(resolve(projectRoot, "client/src/components/CTAButtonWithAnimation.tsx"), "utf8");
    const share = readFileSync(resolve(projectRoot, "client/src/components/SocialShareButtons.tsx"), "utf8");
    const analytics = readFileSync(resolve(projectRoot, "client/src/lib/analytics.ts"), "utf8");

    expect(cta).toContain("aria-busy={isLoading}");
    expect(cta).toContain("loadingText");
    expect(share).toContain("navigator.share");
    expect(share).toContain("trackSocialShare");
    expect(analytics).toContain('trackEvent("share_content"');
  });
});
