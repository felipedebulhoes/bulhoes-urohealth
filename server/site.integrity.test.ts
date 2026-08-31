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

  it("oferece WhatsApp confidencial no protótipo com atribuição e rastreamento centralizados", () => {
    const layout = readFileSync(resolve(projectRoot, "client/src/components/prototype/PrototypeLayout.tsx"), "utf8");
    const whatsapp = readFileSync(resolve(projectRoot, "client/src/components/prototype/PrototypeWhatsAppButton.tsx"), "utf8");

    expect(layout).toContain("<PrototypeWhatsAppButton />");
    expect(whatsapp).toContain("getWhatsAppUrl");
    expect(whatsapp).toContain("trackWhatsAppClick");
    expect(whatsapp).toContain("Prefiro explicar os detalhes durante o atendimento");
    expect(whatsapp).toContain('rel="noopener noreferrer"');
  });

  it("inclui FAQ expansível rastreado na página de engrossamento do protótipo", () => {
    const prototype = readFileSync(resolve(projectRoot, "client/src/pages/PrototypePatientJourney.tsx"), "utf8");

    expect(prototype).toContain("Perguntas frequentes sobre o preenchimento com ácido hialurônico");
    expect(prototype).toContain('id: "faq_increase"');
    expect(prototype).toContain('id: "faq_risks"');
    expect(prototype).toContain('id: "faq_candidate"');
    expect(prototype).toContain('trackPrototypeEvent("faq_open"');
  });

  it("anima as seções de Saúde do Homem e respeita movimento reduzido", () => {
    const prototype = readFileSync(resolve(projectRoot, "client/src/pages/PrototypePatientJourney.tsx"), "utf8");
    const reveal = readFileSync(resolve(projectRoot, "client/src/components/ScrollReveal.tsx"), "utf8");
    const app = readFileSync(resolve(projectRoot, "client/src/App.tsx"), "utf8");

    expect(prototype.match(/<ScrollReveal threshold=\{0\.08\}>/g)?.length).toBeGreaterThanOrEqual(3);
    expect(reveal).toContain('matchMedia("(prefers-reduced-motion: reduce)")');
    expect(app).toContain("!isPrototypeRoute && <SplashScreen />");
  });

  it("oferece contato por e-mail sem campo clínico livre e com consentimento explícito", () => {
    const form = readFileSync(resolve(projectRoot, "client/src/components/prototype/PrototypeEmailContactForm.tsx"), "utf8");
    const router = readFileSync(resolve(projectRoot, "server/routers/aiChat.ts"), "utf8");
    const prototype = readFileSync(resolve(projectRoot, "client/src/pages/PrototypePatientJourney.tsx"), "utf8");

    expect(prototype).toContain("<PrototypeEmailContactForm />");
    expect(form).toContain("submitEmailContact.useMutation");
    expect(form).toContain("Política de Privacidade");
    expect(form).not.toContain("textarea");
    expect(router).toContain("submitEmailContact: publicProcedure");
    expect(router).toContain("prototype-email-contact");
    expect(router).toContain("rateLimit({ windowMs: 60 * 60 * 1000, max: 4 })");
  });

  it("indica visualmente o hover do FAQ e oferece Voltar ao topo acessível", () => {
    const prototype = readFileSync(resolve(projectRoot, "client/src/pages/PrototypePatientJourney.tsx"), "utf8");
    const backToTop = readFileSync(resolve(projectRoot, "client/src/components/prototype/PrototypeBackToTop.tsx"), "utf8");

    expect(prototype).toContain("hover:border-[#B87333]/45");
    expect(prototype).toContain("group-hover:text-[#9D602A]");
    expect(prototype).toContain("<PrototypeBackToTop />");
    expect(backToTop).toContain("window.scrollY > 520");
    expect(backToTop).toContain('aria-label="Voltar ao topo da página"');
    expect(backToTop).toContain('matchMedia("(prefers-reduced-motion: reduce)")');
  });

  it("confirma o contato por e-mail com toast único e mensagem de próximo passo", () => {
    const form = readFileSync(resolve(projectRoot, "client/src/components/prototype/PrototypeEmailContactForm.tsx"), "utf8");

    expect(form).toContain('toast.success("Solicitação enviada com sucesso"');
    expect(form).toContain('id: "prototype-email-contact-success"');
    expect(form).toContain('description: "A equipe responderá pelo e-mail informado."');
    expect(form).toContain("duration: 5000");
  });

  it("permite pesquisar no FAQ sem registrar o termo digitado no analytics", () => {
    const prototype = readFileSync(resolve(projectRoot, "client/src/pages/PrototypePatientJourney.tsx"), "utf8");
    const analytics = readFileSync(resolve(projectRoot, "client/src/lib/analytics.ts"), "utf8");

    expect(prototype).toContain('id="girth-faq-search"');
    expect(prototype).toContain('type="search"');
    expect(prototype).toContain("filteredFaqItems.length");
    expect(prototype).toContain("Nenhuma pergunta encontrada");
    expect(prototype).toContain('trackPrototypeEvent("faq_search", "girth_faq_search", filteredFaqItems.length ? "results_found" : "no_results")');
    expect(analytics).toContain('| "faq_search"');
    expect(prototype).not.toContain('trackPrototypeEvent("faq_search", "girth_faq_search", faqSearch)');
  });

  it("filtra conteúdos do hub por categoria com estado acessível e eventos seguros", () => {
    const prototype = readFileSync(resolve(projectRoot, "client/src/pages/PrototypePatientJourney.tsx"), "utf8");
    const analytics = readFileSync(resolve(projectRoot, "client/src/lib/analytics.ts"), "utf8");

    expect(prototype).toContain('aria-label="Filtrar conteúdos de Saúde do Homem"');
    expect(prototype).toContain("aria-pressed={active}");
    expect(prototype).toContain("filteredContent.length");
    expect(prototype).toContain('trackPrototypeEvent("mens_health_filter", "mens_health_content", category.id)');
    expect(analytics).toContain('| "mens_health_filter"');
  });

  it("libera o guia PDF somente no estado de sucesso do contato por e-mail", () => {
    const form = readFileSync(resolve(projectRoot, "client/src/components/prototype/PrototypeEmailContactForm.tsx"), "utf8");
    const analytics = readFileSync(resolve(projectRoot, "client/src/lib/analytics.ts"), "utf8");

    expect(form).toContain('const MEN_S_HEALTH_GUIDE_URL = "/manus-storage/main_2775651b.pdf"');
    expect(form).toContain("if (submitted)");
    expect(form).toContain("Baixar guia em PDF");
    expect(form).toContain('download="guia-pratico-saude-masculina-dr-felipe-bulhoes.pdf"');
    expect(form).toContain('trackPrototypeEvent("guide_download", "email_contact_success", "mens_health_pdf")');
    expect(analytics).toContain('| "guide_download"');
  });

  it("destaca dúvidas populares antes da busca sem duplicar as respostas clínicas", () => {
    const prototype = readFileSync(resolve(projectRoot, "client/src/pages/PrototypePatientJourney.tsx"), "utf8");

    expect(prototype).toContain("Dúvidas mais populares");
    expect(prototype).toContain('["faq_duration", "faq_risks", "faq_candidate"]');
    expect(prototype).toContain('trackPrototypeEvent("faq_open", "girth_popular_faq", item.id)');
    expect(prototype).toContain("setFaqSearch(item.title)");
  });

  it("permite limpar filtros e evidencia visualmente a categoria selecionada", () => {
    const prototype = readFileSync(resolve(projectRoot, "client/src/pages/PrototypePatientJourney.tsx"), "utf8");

    expect(prototype).toContain("Limpar filtros");
    expect(prototype).toContain('disabled={activeCategory === "all"}');
    expect(prototype).toContain('setActiveCategory("all")');
    expect(prototype).toContain('trackPrototypeEvent("mens_health_filter", "mens_health_content", "clear_filters")');
    expect(prototype).toContain('ring-2 ring-[#B87333]/35 ring-offset-2');
  });

  it("mostra uma prévia otimizada da capa junto ao download pós-contato", () => {
    const form = readFileSync(resolve(projectRoot, "client/src/components/prototype/PrototypeEmailContactForm.tsx"), "utf8");

    expect(form).toContain('const MEN_S_HEALTH_GUIDE_COVER = "/manus-storage/guide-saude-masculina-capa_b385e7c7.jpg"');
    expect(form).toContain('alt="Capa do Guia prático de saúde masculina"');
    expect(form).toContain('width="104"');
    expect(form).toContain('height="147"');
    expect(form).toContain('loading="lazy"');
  });

  it("registra apenas votos úteis reais e bloqueia repetição no mesmo navegador", () => {
    const component = readFileSync(resolve(projectRoot, "client/src/components/prototype/PrototypeFaqHelpfulButton.tsx"), "utf8");
    const router = readFileSync(resolve(projectRoot, "server/routers/prototypeFeedback.ts"), "utf8");
    const schema = readFileSync(resolve(projectRoot, "drizzle/schema.ts"), "utf8");

    expect(schema).toContain('mysqlTable("faq_helpful_counts"');
    expect(schema).toContain('questionId: varchar("questionId", { length: 64 }).notNull().unique()');
    expect(router).toContain('z.enum(["faq_duration", "faq_risks", "faq_candidate"])');
    expect(router).toContain("incrementFaqHelpfulCount(input.questionId)");
    expect(component).toContain("window.localStorage.setItem(storageKey, \"1\")");
    expect(component).toContain("window.localStorage.getItem(storageKey) === \"1\"");
    expect(component).toContain("disabled={voted || helpfulMutation.isPending}");
    expect(component).toContain('trackPrototypeEvent("faq_helpful", "girth_popular_faq", questionId)');
    expect(component).not.toContain("email");
    expect(component).not.toContain("symptom");
  });

  it("anima a lista filtrada e respeita a preferência de movimento reduzido", () => {
    const prototype = readFileSync(resolve(projectRoot, "client/src/pages/PrototypePatientJourney.tsx"), "utf8");

    expect(prototype).toContain('AnimatePresence mode="popLayout"');
    expect(prototype).toContain("const shouldReduceMotion = useReducedMotion()");
    expect(prototype).toContain("layout={!shouldReduceMotion}");
    expect(prototype).toContain("duration: shouldReduceMotion ? 0 : 0.22");
  });

  it("resume o valor do guia em três tópicos objetivos no estado pós-envio", () => {
    const form = readFileSync(resolve(projectRoot, "client/src/components/prototype/PrototypeEmailContactForm.tsx"), "utf8");

    expect(form).toContain('aria-label="Principais conteúdos do guia"');
    expect(form).toContain("Checklist de cuidados por fase da vida");
    expect(form).toContain("Sinais de alerta e quando buscar avaliação");
    expect(form).toContain("Saúde sexual, urinária e reprodutiva");
  });

  it("oferece recuperação rápida quando a lista filtrada não possui resultados", () => {
    const prototype = readFileSync(resolve(projectRoot, "client/src/pages/PrototypePatientJourney.tsx"), "utf8");

    expect(prototype).toContain("Nenhum resultado encontrado");
    expect(prototype).toContain("Limpar filtros e mostrar todos");
    expect(prototype).toContain('trackPrototypeEvent("mens_health_filter", "mens_health_content", "empty_state_clear")');
    expect(prototype).toContain('key="empty-filter-state"');
  });

  it("agradece o voto útil com celebração discreta e movimento reduzido respeitado", () => {
    const component = readFileSync(resolve(projectRoot, "client/src/components/prototype/PrototypeFaqHelpfulButton.tsx"), "utf8");

    expect(component).toContain("const shouldReduceMotion = useReducedMotion()");
    expect(component).toContain("if (!shouldReduceMotion)");
    expect(component).toContain("setCelebrating(true)");
    expect(component).toContain("Obrigado por compartilhar sua opinião");
    expect(component).toContain("Seu voto ajuda a priorizar dúvidas relevantes");
    expect(component).toContain("prototype-faq-helpful-${questionId}");
  });

  it("mantém o HMR na porta pública HTTPS da prévia", () => {
    const viteServer = readFileSync(resolve(projectRoot, "server/_core/vite.ts"), "utf8");

    expect(viteServer).toContain("hmr: { server, clientPort: 443 }");
    expect(viteServer).toContain("middlewareMode: true");
  });

  it("oferece navegação inferior mobile para WhatsApp, FAQ e contato", () => {
    const navigation = readFileSync(resolve(projectRoot, "client/src/components/prototype/PrototypeMobileBottomNav.tsx"), "utf8");
    const layout = readFileSync(resolve(projectRoot, "client/src/components/prototype/PrototypeLayout.tsx"), "utf8");
    const prototype = readFileSync(resolve(projectRoot, "client/src/pages/PrototypePatientJourney.tsx"), "utf8");
    const emailForm = readFileSync(resolve(projectRoot, "client/src/components/prototype/PrototypeEmailContactForm.tsx"), "utf8");
    const floatingWhatsApp = readFileSync(resolve(projectRoot, "client/src/components/prototype/PrototypeWhatsAppButton.tsx"), "utf8");

    expect(navigation).toContain('aria-label="Atalhos de contato do protótipo"');
    expect(navigation).toContain('destination("faq-engrossamento")');
    expect(navigation).toContain('destination("contato-email")');
    expect(navigation).toContain('pb-[max(env(safe-area-inset-bottom),0.5rem)]');
    expect(navigation).toContain('trackWhatsAppClick("prototype_patient_journey_mobile_bottom_nav")');
    expect(layout).toContain("<PrototypeMobileBottomNav />");
    expect(prototype).toContain('id="faq-engrossamento"');
    expect(emailForm.match(/id="contato-email"/g)).toHaveLength(2);
    expect(floatingWhatsApp).toContain("md:flex");
  });
});
