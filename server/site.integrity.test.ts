import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");

function collectTsxFiles(directory: string): string[] {
  return readdirSync(directory).flatMap(entry => {
    const path = resolve(directory, entry);
    return statSync(path).isDirectory()
      ? collectTsxFiles(path)
      : path.endsWith(".tsx")
        ? [path]
        : [];
  });
}

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

  it("confirma a cópia do link com toast de sucesso e apresenta fallback de erro", () => {
    const share = readFileSync(resolve(projectRoot, "client/src/components/SocialShareButtons.tsx"), "utf8");

    expect(share).toContain('toast.success("Link copiado com sucesso"');
    expect(share).toContain('toast.error("Não foi possível copiar o link"');
    expect(share).toContain('navigator.clipboard?.writeText');
  });

  it("classifica todas as imagens como lazy ou eager e prioriza a imagem LCP da homepage", () => {
    const files = collectTsxFiles(resolve(projectRoot, "client/src"));

    for (const file of files) {
      const source = readFileSync(file, "utf8");
      const imageTags = source.match(/<img[\s\S]*?\/>/g) ?? [];
      for (const imageTag of imageTags) {
        expect(imageTag).toMatch(/loading="(?:lazy|eager)"/);
      }
    }

    const hero = readFileSync(resolve(projectRoot, "client/src/components/HeroSection.tsx"), "utf8");
    expect(hero).toContain('fetchPriority="high"');
    expect(hero).toContain('loading="eager"');
  });

  it("exibe conteúdos relacionados abaixo do compartilhamento e rastreia a seleção no GA4", () => {
    const share = readFileSync(resolve(projectRoot, "client/src/components/SocialShareButtons.tsx"), "utf8");
    const related = readFileSync(resolve(projectRoot, "client/src/components/RelatedContentSection.tsx"), "utf8");
    const analytics = readFileSync(resolve(projectRoot, "client/src/lib/analytics.ts"), "utf8");

    expect(share).toContain("<RelatedContentSection");
    expect(related).toContain("Conteúdos relacionados");
    expect(related).toContain("trackRelatedContentClick");
    expect(analytics).toContain('trackEvent("select_content"');
  });

  it("mantém o protótipo em rotas isoladas e carregadas sob demanda", () => {
    const app = readFileSync(resolve(projectRoot, "client/src/App.tsx"), "utf8");

    expect(app).toContain('lazy(() => import("./pages/PrototypePatientJourney"))');
    expect(app).toContain('/prototipo-jornada-paciente/saude-do-homem');
    expect(app).toContain('/prototipo-jornada-paciente/saude-intima-performance');
    expect(app).toContain('/prototipo-jornada-paciente/engrossamento-peniano');
    expect(app).toContain('/prototipo-jornada-paciente/agendamento');
  });

  it("impede indexação do protótipo e restaura a configuração ao sair", () => {
    const meta = readFileSync(resolve(projectRoot, "client/src/components/prototype/PrototypeMeta.tsx"), "utf8");
    const server = readFileSync(resolve(projectRoot, "server/_core/index.ts"), "utf8");

    expect(meta).toContain('noindex, nofollow, noarchive, nosnippet');
    expect(meta).toContain("robots.remove()");
    expect(meta).toContain("previousRobots");
    expect(server).toContain('req.path.startsWith("/prototipo-jornada-paciente")');
    expect(server).toContain('res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet")');
  });

  it("rastreia o protótipo somente com identificadores fixos de interface", () => {
    const analytics = readFileSync(resolve(projectRoot, "client/src/lib/analytics.ts"), "utf8");
    const prototype = readFileSync(resolve(projectRoot, "client/src/pages/PrototypePatientJourney.tsx"), "utf8");

    expect(analytics).toContain("trackPrototypeEvent");
    expect(analytics).toContain('event_category: "prototype_validation"');
    expect(analytics).not.toContain("prototype_symptom");
    expect(prototype).toContain("Nenhum dado foi enviado");
    expect(prototype).not.toContain("wa.me/");
    expect(prototype).not.toContain("doctoralia.com.br");
  });

  it("documenta a pesquisa e referencia padrões clínicos, regulatórios e de acessibilidade", () => {
    const report = readFileSync(resolve(projectRoot, "PATIENT_JOURNEY_RESEARCH.md"), "utf8");

    expect(report).toContain("WCAG 2.2");
    expect(report).toContain("Resolução CFM nº 2.336/2023");
    expect(report).toContain("SMSNA");
    expect(report).toContain("Arquitetura de informação proposta");
    expect(report).toContain("Mapa de jornadas");
  });
});
