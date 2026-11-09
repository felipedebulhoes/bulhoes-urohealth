/**
 * Template de Alta Conversão para Landing Pages de Áreas de Atuação Urológica
 * Inspirado na arquitetura de conversão da LP de Preenchimento Peniano (/preenchimento-peniano)
 * Padrão Visual: Quiet Luxury / Espresso & Mineral Palette — Clinical Precision
 * Conformidade: Resolução CFM nº 2.336/2023 (Diretrizes EAU, AUA e SBU)
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Lock,
  Sparkles,
  Stethoscope,
  Award,
  MapPin,
  ChevronDown,
  Phone,
  Calendar,
  ArrowRight,
  FileCheck2,
  Star,
  GraduationCap,
  BookOpen,
  XCircle,
  MessageCircle,
  Layers,
  EyeOff,
  Plane,
  Video,
  Check,
  Quote,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaviconInjector } from "@/components/FaviconInjector";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import SocialShareButtons from "@/components/SocialShareButtons";
import MobileBottomBar from "@/components/MobileBottomBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CTAButtonWithAnimation } from "@/components/CTAButtonWithAnimation";
import { FAQSchema, MedicalPageSchema } from "@/components/SchemaMarkup";
import { AreaDidacticAtlas } from "@/components/AreaDidacticAtlas";
import {
  trackEducationalPageView,
  trackDoctoraliaClick,
  trackWhatsAppClick,
  trackCtaClick,
} from "@/lib/analytics";
import { getWhatsAppUrl } from "@/lib/tracking";

const PORTRAIT_URL = "/manus-storage/felipe-portrait_0e0693e4_be070ac1.webp";
const LOGO_URL = "/brand/logo-site-fundo-claro.png";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.48 },
  }),
};

export type FaqCategoryKey = "todos" | "indicacoes" | "procedimento" | "seguranca" | "recuperacao";

export interface AreaLandingFaqItem {
  id: string;
  category: Exclude<FaqCategoryKey, "todos">;
  question: string;
  answer: string;
}

export interface AreaComparisonRow {
  criterion: string;
  modernApproach: string;
  conventionalApproach: string;
}

export interface AreaStepItem {
  step: string;
  title: string;
  duration: string;
  description: string;
}

export interface AreaMythFact {
  myth: string;
  fact: string;
}

export interface AreaQuizOption {
  id: string;
  label: string;
  summaryText: string;
}

export interface AreaLandingPageConfig {
  campaignSlug: string;
  path: string;
  pageTitle: string;
  pageDescription: string;
  ogImage?: string;
  medicalCondition: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitleHtml: React.ReactNode;
  heroHighlights: Array<{
    icon?: LucideIcon;
    title: string;
    desc: string;
  }>;
  synthesisCard: {
    eyebrow: string;
    title: string;
    items: Array<{
      title: string;
      desc: string;
    }>;
  };
  howItWorks: {
    eyebrow: string;
    title: string;
    intro: string;
    cards: [
      {
        title: string;
        paragraphs: string[];
        footer: string;
      },
      {
        title: string;
        paragraphs: string[];
        footer: string;
      },
    ];
    metrics: Array<{
      metric: string;
      label: string;
      detail: string;
    }>;
  };
  comparison: {
    navLabel: string;
    eyebrow: string;
    title: string;
    intro: string;
    modernLabel: string;
    conventionalLabel: string;
    rows: AreaComparisonRow[];
    calloutTitle: string;
    calloutDescription: string;
  };
  stepByStep: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: AreaStepItem[];
  };
  indicationsAndLimits: {
    eyebrow: string;
    title: string;
    intro: string;
    indicationsTitle: string;
    indications: string[];
    limitsTitle: string;
    limits: string[];
    timelineTitle: string;
    timeline: Array<{
      period: string;
      title: string;
      desc: string;
    }>;
  };
  mythsAndFacts: AreaMythFact[];
  quiz: {
    title: string;
    question1Label: string;
    question1Prompt: string;
    question1Options: AreaQuizOption[];
    question2Label: string;
    question2Prompt: string;
    question2Options: Array<{ id: string; label: string }>;
  };
  specialistFocusParagraph: string;
  faqs: AreaLandingFaqItem[];
  references: {
    guideLinkHref: string;
    guideLinkLabel: string;
    items: string[];
  };
  relatedLinks?: Array<{
    href: string;
    label: string;
  }>;
}

type MessageModeKey = "direta" | "exames" | "discreta";

const defaultPatientReviews = [
  {
    author: "Paciente Verificado · São Paulo",
    source: "Doctoralia / Google",
    text: "Médico extremamente atencioso, técnico e claro nas explicações. Explicou todo o diagnóstico e as opções de tratamento com muita calma e segurança.",
  },
  {
    author: "Paciente Verificado · Campinas",
    source: "Doctoralia / Google",
    text: "Atendimento impecável do agendamento ao acompanhamento pós-procedimento. Pontual, ético e sempre acessível para esclarecer dúvidas.",
  },
  {
    author: "Paciente Verificado · São Paulo",
    source: "Doctoralia / Google",
    text: "Excelente profissional. Transmite confiança imediata pelo conhecimento atualizado e pelo cuidado humano em cada etapa da consulta.",
  },
];

export default function AreaLandingPageTemplate({ config }: { config: AreaLandingPageConfig }) {
  const [activeCategory, setActiveCategory] = useState<FaqCategoryKey>("todos");
  const [openFaqId, setOpenFaqId] = useState<string | null>(config.faqs[0]?.id ?? null);
  const [messageMode, setMessageMode] = useState<MessageModeKey>("direta");

  // Estados da Autoavaliação Interativa de Perfil (30 segundos)
  const [quizGoal, setQuizGoal] = useState<string>(config.quiz.question1Options[0]?.id ?? "opt1");
  const [quizPriority, setQuizPriority] = useState<string>(
    config.quiz.question2Options[0]?.id ?? "p1"
  );
  const [quizCity, setQuizCity] = useState<string>("sp");

  const messageOptions: Record<
    MessageModeKey,
    {
      label: string;
      badge: string;
      description: string;
      messageSp: string;
      messageCampinas: string;
    }
  > = {
    direta: {
      label: "Agendamento Direto na Especialidade",
      badge: "Mais escolhida",
      description: `Informa diretamente que você deseja agendar avaliação em ${config.heroTitle} com o Dr. Felipe de Bulhões.`,
      messageSp: `Olá! Vi a página sobre ${config.heroTitle} e gostaria de agendar uma consulta em São Paulo com o Dr. Felipe de Bulhões.`,
      messageCampinas: `Olá! Vi a página sobre ${config.heroTitle} e gostaria de agendar uma consulta em Campinas com o Dr. Felipe de Bulhões.`,
    },
    exames: {
      label: "Já Tenho Exames / 2ª Opinião",
      badge: "Prioritária",
      description:
        "Para quem já possui exames laboratoriais ou de imagem e busca definição diagnóstica ou planejamento cirúrgico.",
      messageSp: `Olá! Já possuo exames e gostaria de agendar uma avaliação sobre ${config.heroTitle} em São Paulo com o Dr. Felipe de Bulhões.`,
      messageCampinas: `Olá! Já possuo exames e gostaria de agendar uma avaliação sobre ${config.heroTitle} em Campinas com o Dr. Felipe de Bulhões.`,
    },
    discreta: {
      label: "100% Discreta (Código Reservado)",
      badge: "Sigilo Total",
      description:
        "Não menciona o motivo clínico na conversa inicial. Ideal para total privacidade na tela do celular e na recepção.",
      messageSp:
        "Olá! Gostaria de agendar uma consulta urológica particular com o Dr. Felipe de Bulhões em São Paulo (Ref: Avaliação Reservada).",
      messageCampinas:
        "Olá! Gostaria de agendar uma consulta urológica particular com o Dr. Felipe de Bulhões em Campinas (Ref: Avaliação Reservada).",
    },
  };

  const activeMessageConfig = messageOptions[messageMode];

  const whatsappSpUrl = getWhatsAppUrl({
    page: config.campaignSlug,
    customMessage: activeMessageConfig.messageSp,
  });

  const whatsappCampinasUrl = getWhatsAppUrl({
    phone: "5519998559890",
    page: config.campaignSlug,
    campaign: "campinas",
    customMessage: activeMessageConfig.messageCampinas,
  });

  const selectedGoalOption =
    config.quiz.question1Options.find((o) => o.id === quizGoal) ?? config.quiz.question1Options[0];

  const quizCityLabel: Record<string, string> = {
    sp: "São Paulo (Av. Paulista ou Pinheiros)",
    campinas: "Campinas (Cambuí / Rede D'Or)",
    outra_cidade: "pré-avaliação por Teleconsulta (sou de outra cidade)",
  };

  const quizWhatsappUrl = getWhatsAppUrl({
    phone: quizCity === "campinas" ? "5519998559890" : "5511981124455",
    page: config.campaignSlug,
    campaign: quizCity === "campinas" ? "campinas" : config.campaignSlug,
    customMessage:
      messageMode === "discreta"
        ? `Olá! Gostaria de agendar uma avaliação urológica particular com o Dr. Felipe de Bulhões para ${quizCityLabel[quizCity]} (Ref: Avaliação Reservada).`
        : `Olá! Fiz a autoavaliação na página de ${config.heroTitle} (${selectedGoalOption?.summaryText}) e gostaria de agendar consulta em ${quizCityLabel[quizCity]}.`,
  });

  const doctoraliaUrl = `https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas?utm_source=site&utm_medium=landing_page&utm_campaign=${config.campaignSlug}`;

  useEffect(() => {
    document.title = config.pageTitle;
    let metaTag = document.querySelector('meta[name="description"]');
    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.setAttribute("name", "description");
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute("content", config.pageDescription);

    trackEducationalPageView(config.heroTitle, window.location.pathname);
  }, [config.pageTitle, config.pageDescription, config.heroTitle]);

  const handleWhatsAppConversion = (locationLabel: string) => {
    trackWhatsAppClick(`lp_${config.campaignSlug}_${locationLabel}`);
    trackCtaClick("whatsapp", `lp_${config.campaignSlug}_${locationLabel}`);
  };

  const handleDoctoraliaConversion = (locationLabel: string) => {
    trackDoctoraliaClick(`lp_${config.campaignSlug}_${locationLabel}`);
    trackCtaClick("doctoralia", `lp_${config.campaignSlug}_${locationLabel}`);
  };

  const scrollToSection = (id: string) => {
    const shouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  const filteredFaqs =
    activeCategory === "todos"
      ? config.faqs
      : config.faqs.filter((item) => item.category === activeCategory);

  return (
    <>
      <FaviconInjector />
      <MedicalPageSchema
        title={config.pageTitle}
        description={config.pageDescription}
        path={config.path}
        medicalCondition={config.medicalCondition}
        lastReviewed="2026-11-03"
      />
      <FAQSchema
        questions={config.faqs.map((item) => ({
          question: item.question,
          answer: item.answer,
        }))}
      />

      <div className="brand-campaign-page min-h-screen bg-[#F7F5F2] text-[#2E2520] dark:bg-card dark:text-foreground">
        {/* ── HEADER FIXO DE CONVERSÃO ─────────────────────────────────────── */}
        <header className="brand-campaign-header sticky top-0 z-50 border-b border-[#2E2520]/10 bg-[#FCFAF7]/95 py-3.5 backdrop-blur-md">
          <div className="container flex items-center justify-between gap-4">
            <Link href="/" className="shrink-0">
              <img
                loading="eager"
                decoding="async"
                src={LOGO_URL}
                alt="Dr. Felipe de Bulhões - Urologista"
                className="h-9 lg:h-11 w-auto"
              />
            </Link>

            <nav
              aria-label="Navegação da página"
              className="hidden lg:flex items-center gap-3 xl:gap-5 text-[13px] xl:text-sm font-medium text-[#2E2520]/80 dark:text-foreground/80"
            >
              <button
                type="button"
                onClick={() => scrollToSection("como-funciona")}
                className="hover:text-[#2E2520] transition-colors"
              >
                Como Funciona
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("comparativo-tecnico")}
                className="hover:text-[#2E2520] transition-colors"
              >
                {config.comparison.navLabel}
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("passo-a-passo")}
                className="hover:text-[#2E2520] transition-colors"
              >
                Passo a Passo
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("autoavaliacao")}
                className="hover:text-[#2E2520] transition-colors"
              >
                Autoavaliação
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("especialista")}
                className="hover:text-[#2E2520] transition-colors"
              >
                Dr. Felipe
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("duvidas-frequentes")}
                className="hover:text-[#2E2520] transition-colors"
              >
                Dúvidas
              </button>
            </nav>

            <div className="flex items-center gap-2.5">
              <a
                href={whatsappSpUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleWhatsAppConversion("header_whatsapp")}
              >
                <Button className="schedule-cta schedule-cta--primary bg-[#C9B6A3] hover:bg-[#E7E1DA] text-[#2E2520] font-semibold text-xs sm:text-sm h-10 px-4">
                  <MessageCircle className="w-4 h-4 mr-1.5" />
                  <span>Agendar via WhatsApp</span>
                </Button>
              </a>
              <button
                type="button"
                onClick={() => scrollToSection("agendamento")}
                className="hidden sm:max-lg:inline-flex min-[1400px]:inline-flex"
              >
                <Button
                  variant="outline"
                  className="brand-campaign-outline border-[#4A3A30]/35 text-[#2E2520] hover:bg-[#4A3A30]/10 bg-transparent text-xs sm:text-sm h-10 px-3.5"
                >
                  <Calendar className="w-4 h-4 mr-1.5" />
                  Locais e Agenda
                </Button>
              </button>
            </div>
          </div>
        </header>

        {/* ── HERO SECTION DE ALTA CONVERSÃO ───────────────────────────────── */}
        <section className="brand-campaign-hero brand-espresso-hero brand-dark-surface relative overflow-hidden py-14 lg:py-24">
          <div className="container relative z-10">
            <PageBreadcrumbs className="mb-6" />

            <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Coluna Principal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="lg:col-span-7"
              >
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#C9B6A3]/35 bg-[#2E2520]/50 mb-5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C9B6A3]" />
                  <span className="text-xs font-medium tracking-wider uppercase text-[#E7E1DA]">
                    {config.heroBadge}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.12] mb-5 font-serif">
                  {config.heroTitle}
                </h1>

                <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-7 max-w-2xl">
                  {config.heroSubtitleHtml}
                </p>

                {/* Destaques rápidos */}
                <div className="grid sm:grid-cols-3 gap-3 mb-8">
                  {config.heroHighlights.map((item, idx) => {
                    const IconComp = item.icon || ShieldCheck;
                    return (
                      <div
                        key={idx}
                        className="brand-dark-surface-panel rounded-lg border border-white/15 bg-white/[0.06] p-3.5"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <IconComp className="w-4 h-4 text-[#C9B6A3] shrink-0" />
                          <span className="text-sm font-semibold text-white">{item.title}</span>
                        </div>
                        <p className="text-xs text-white/70 leading-snug">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Seletor Interativo de Mensagem para Redução de Atrito */}
                <div className="mb-4 rounded-xl border border-white/15 bg-[#2E2520]/60 p-3.5 max-w-xl">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C9B6A3] flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5 text-[#C9B6A3]" />
                      Personalize como iniciar seu atendimento no WhatsApp:
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#C9B6A3]/20 text-[#C9B6A3]">
                      {activeMessageConfig.badge}
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-2">
                    {(Object.keys(messageOptions) as MessageModeKey[]).map((modeKey) => {
                      const opt = messageOptions[modeKey];
                      const isSelected = messageMode === modeKey;
                      return (
                        <button
                          key={modeKey}
                          type="button"
                          onClick={() => setMessageMode(modeKey)}
                          className={`text-left rounded-lg px-2.5 py-2 text-xs transition-all border ${
                            isSelected
                              ? "bg-[#C9B6A3] text-[#2E2520] border-[#C9B6A3] font-semibold shadow-sm"
                              : "bg-white/[0.04] text-white/80 border-white/12 hover:bg-white/[0.08]"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className="truncate">{opt.label}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-[11px] text-white/70 leading-snug">
                    {activeMessageConfig.description}
                  </p>
                </div>

                {/* CTAs principais */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <CTAButtonWithAnimation
                    href={whatsappSpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleWhatsAppConversion("hero_primary")}
                    loadingText="Abrindo WhatsApp…"
                    icon={<MessageCircle className="w-5 h-5" />}
                    className="schedule-cta schedule-cta--primary h-12 px-7 text-base font-semibold justify-center"
                  >
                    Agendar Avaliação pelo WhatsApp
                  </CTAButtonWithAnimation>

                  <CTAButtonWithAnimation
                    href={doctoraliaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleDoctoraliaConversion("hero_secondary")}
                    loadingText="Abrindo agenda…"
                    icon={<Calendar className="w-5 h-5" />}
                    variant="outline"
                    className="schedule-cta schedule-cta--outline h-12 px-6 text-base justify-center"
                  >
                    Agenda Online (Doctoralia)
                  </CTAButtonWithAnimation>
                </div>

                {/* Credenciais rápidas */}
                <div className="mt-7 pt-6 border-t border-white/15 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-white/75">
                  <span className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#C9B6A3]" />
                    Dr. Felipe de Bulhões · CRM-SP 202.291 | RQE 146538
                  </span>
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-[#C9B6A3]" />
                    Urologista formado pelo Instituto D&apos;Or (IDOR)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#C9B6A3]" />
                    Av. Paulista · Pinheiros · Campinas
                  </span>
                </div>
              </motion.div>

              {/* Card Lateral de Síntese Clínica */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="lg:col-span-5"
              >
                <div className="brand-dark-surface-panel rounded-xl border border-white/20 bg-[#2E2520]/90 p-6 sm:p-7 shadow-2xl">
                  <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-white/15">
                    <div>
                      <span className="text-[11px] uppercase tracking-[0.16em] text-[#C9B6A3] font-semibold block">
                        {config.synthesisCard.eyebrow}
                      </span>
                      <h2 className="text-xl text-white font-serif mt-0.5">
                        {config.synthesisCard.title}
                      </h2>
                    </div>
                    <Stethoscope className="w-7 h-7 text-[#C9B6A3] shrink-0" />
                  </div>

                  <ul className="space-y-4 text-sm">
                    {config.synthesisCard.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#C9B6A3] mt-1 shrink-0" />
                        <div>
                          <strong className="text-white block">{item.title}</strong>
                          <span className="text-white/75 text-xs leading-relaxed">
                            {item.desc}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-5 border-t border-white/15 flex items-center justify-between gap-4">
                    <div className="text-xs text-white/70">
                      Deseja verificar disponibilidade?
                    </div>
                    <a
                      href={whatsappSpUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleWhatsAppConversion("hero_card")}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C9B6A3] hover:text-white transition-colors"
                    >
                      Falar com a equipe no WhatsApp
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CONTEÚDO PRINCIPAL ───────────────────────────────────────────── */}
        <main className="brand-campaign-content">
          {/* 1. COMO FUNCIONA E EVIDÊNCIAS CIENTÍFICAS */}
          <section id="como-funciona" className="py-16 lg:py-24 scroll-mt-20">
            <div className="container max-w-5xl">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={0}
                className="max-w-3xl mb-12"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#4A3A30] block mb-2">
                  {config.howItWorks.eyebrow}
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#2E2520] dark:text-foreground font-serif mb-4">
                  {config.howItWorks.title}
                </h2>
                <p className="text-[#334155] leading-relaxed">{config.howItWorks.intro}</p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8 items-stretch mb-12">
                {config.howItWorks.cards.map((card, idx) => (
                  <motion.div
                    key={idx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={idx + 1}
                    className="bg-[#FCFAF7] dark:bg-card rounded-xl p-6 sm:p-8 border border-[#2E2520]/10 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-11 h-11 rounded-lg bg-[#4A3A30]/10 flex items-center justify-center mb-5">
                        {idx === 0 ? (
                          <Layers className="w-5 h-5 text-[#4A3A30]" />
                        ) : (
                          <ShieldCheck className="w-5 h-5 text-[#4A3A30]" />
                        )}
                      </div>
                      <h3 className="text-xl font-serif text-[#2E2520] dark:text-foreground mb-3">
                        {card.title}
                      </h3>
                      {card.paragraphs.map((p, pIdx) => (
                        <p
                          key={pIdx}
                          className={`text-sm text-[#334155] leading-relaxed ${
                            pIdx < card.paragraphs.length - 1 ? "mb-4" : ""
                          }`}
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-[#2E2520]/10 text-xs text-[#64748B]">
                      {card.footer}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Atlas Anatômico e Funcional Didático (2 Figuras Esquematizadas por Área) */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={2.5}
              >
                <AreaDidacticAtlas campaignSlug={config.campaignSlug} />
              </motion.div>

              {/* Dados da Literatura Científica */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={3}
                className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {config.howItWorks.metrics.map((stat, i) => (
                  <div
                    key={i}
                    className="bg-[#FCFAF7] dark:bg-card rounded-xl p-5 border border-[#2E2520]/10"
                  >
                    <p className="text-2xl font-serif font-bold text-[#2E2520] dark:text-foreground">
                      {stat.metric}
                    </p>
                    <p className="text-sm font-semibold text-[#4A3A30] mt-1">{stat.label}</p>
                    <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">{stat.detail}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* 2. COMPARATIVO TÉCNICO */}
          <section id="comparativo-tecnico" className="py-16 lg:py-24 scroll-mt-20">
            <div className="container max-w-5xl">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={0}
                className="max-w-3xl mb-10"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#4A3A30] block mb-2">
                  {config.comparison.eyebrow}
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#2E2520] dark:text-foreground font-serif mb-4">
                  {config.comparison.title}
                </h2>
                <p className="text-[#334155] leading-relaxed">{config.comparison.intro}</p>
              </motion.div>

              <div className="space-y-4">
                {config.comparison.rows.map((row, index) => (
                  <motion.div
                    key={row.criterion}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={index * 0.4}
                    className="bg-[#FCFAF7] dark:bg-card rounded-xl border border-[#2E2520]/10 overflow-hidden shadow-sm"
                  >
                    <div className="bg-[#2E2520]/[0.04] px-6 py-3 border-b border-[#2E2520]/10">
                      <h3 className="text-sm font-semibold text-[#2E2520] dark:text-foreground not-italic font-sans">
                        {row.criterion}
                      </h3>
                    </div>
                    <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#2E2520]/10">
                      <div className="p-5 sm:p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                          <span className="text-xs font-bold uppercase tracking-wider text-[#2E2520]">
                            {config.comparison.modernLabel}
                          </span>
                        </div>
                        <p className="text-sm text-[#334155] leading-relaxed">
                          {row.modernApproach}
                        </p>
                      </div>
                      <div className="p-5 sm:p-6 bg-[#2E2520]/[0.015]">
                        <div className="flex items-center gap-2 mb-2">
                          <XCircle className="w-4 h-4 text-rose-700 shrink-0" />
                          <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                            {config.comparison.conventionalLabel}
                          </span>
                        </div>
                        <p className="text-sm text-[#64748B] leading-relaxed">
                          {row.conventionalApproach}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={3}
                className="mt-8 rounded-xl border border-[#4A3A30]/25 bg-[#FCFAF7] p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <ShieldCheck className="w-6 h-6 text-[#4A3A30] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-[#2E2520]">
                      {config.comparison.calloutTitle}
                    </p>
                    <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
                      {config.comparison.calloutDescription}
                    </p>
                  </div>
                </div>
                <a
                  href={whatsappSpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleWhatsAppConversion("comparison_cta")}
                  className="shrink-0"
                >
                  <Button className="btn-copper text-xs sm:text-sm h-10 px-5">
                    Conversar sobre meu caso
                  </Button>
                </a>
              </motion.div>
            </div>
          </section>

          {/* 3. PASSO A PASSO VISUAL DA JORNADA */}
          <section id="passo-a-passo" className="py-16 lg:py-24 scroll-mt-20">
            <div className="container max-w-5xl">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={0}
                className="max-w-3xl mb-12"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#4A3A30] block mb-2">
                  {config.stepByStep.eyebrow}
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#2E2520] dark:text-foreground font-serif mb-4">
                  {config.stepByStep.title}
                </h2>
                <p className="text-[#334155] leading-relaxed">{config.stepByStep.intro}</p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {config.stepByStep.steps.map((item, idx) => (
                  <motion.div
                    key={item.step}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={idx * 0.4}
                    className="bg-[#FCFAF7] dark:bg-card rounded-xl p-6 border border-[#2E2520]/10 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-[#2E2520] text-[#F7F5F2] text-xs font-bold tracking-wider">
                          {item.step}
                        </span>
                        <span className="text-xs font-medium text-[#4A3A30] bg-[#4A3A30]/10 px-2.5 py-1 rounded-full">
                          {item.duration}
                        </span>
                      </div>
                      <h3 className="text-lg font-serif text-[#2E2520] dark:text-foreground mb-2.5">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#334155] leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 4. INDICAÇÕES, LIMITES, LINHA DO TEMPO E MITOS VS REALIDADE */}
          <section className="py-16 lg:py-24">
            <div className="container max-w-5xl">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={0}
                className="max-w-3xl mb-12"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#4A3A30] block mb-2">
                  {config.indicationsAndLimits.eyebrow}
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#2E2520] dark:text-foreground font-serif mb-4">
                  {config.indicationsAndLimits.title}
                </h2>
                <p className="text-[#334155] leading-relaxed">
                  {config.indicationsAndLimits.intro}
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={1}
                  className="bg-[#FCFAF7] dark:bg-card rounded-xl p-6 sm:p-7 border border-[#2E2520]/10"
                >
                  <div className="flex items-center gap-2.5 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                    <h3 className="text-xl font-serif text-[#2E2520] dark:text-foreground">
                      {config.indicationsAndLimits.indicationsTitle}
                    </h3>
                  </div>
                  <ul className="space-y-3 text-sm text-[#334155]">
                    {config.indicationsAndLimits.indications.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#4A3A30] mt-0.5 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={2}
                  className="bg-[#FCFAF7] dark:bg-card rounded-xl p-6 sm:p-7 border border-[#2E2520]/10"
                >
                  <div className="flex items-center gap-2.5 mb-4">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                    <h3 className="text-xl font-serif text-[#2E2520] dark:text-foreground">
                      {config.indicationsAndLimits.limitsTitle}
                    </h3>
                  </div>
                  <ul className="space-y-3 text-sm text-[#334155]">
                    {config.indicationsAndLimits.limits.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Linha do tempo de cuidado e recuperação */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={3}
                className="bg-[#FCFAF7] dark:bg-card rounded-xl p-6 sm:p-8 border border-[#2E2520]/10"
              >
                <h3 className="text-xl font-serif text-[#2E2520] dark:text-foreground mb-5">
                  {config.indicationsAndLimits.timelineTitle}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {config.indicationsAndLimits.timeline.map((phase, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg bg-[#2E2520]/[0.03] p-4 border border-[#2E2520]/8"
                    >
                      <span className="text-xs font-bold uppercase tracking-wider text-[#4A3A30] block mb-1">
                        {phase.period}
                      </span>
                      <p className="font-semibold text-sm text-[#2E2520] dark:text-foreground mb-1.5">
                        {phase.title}
                      </p>
                      <p className="text-xs text-[#64748B] leading-relaxed">{phase.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quadro Visual: Mitos vs. Realidade Científica */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={3.5}
                className="mt-10 bg-[#FCFAF7] dark:bg-card rounded-xl p-6 sm:p-8 border border-[#2E2520]/10"
              >
                <div className="mb-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#4A3A30] block mb-1.5">
                    Esclarecimento Urológico Baseado em Evidências
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-[#2E2520] dark:text-foreground">
                    Mitos Comuns vs. Realidade Científica
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {config.mythsAndFacts.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-[#2E2520]/10 bg-white dark:bg-card p-5 flex flex-col justify-between"
                    >
                      <div className="mb-3 pb-3 border-b border-[#2E2520]/8">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-rose-700 mb-1">
                          <XCircle className="w-3.5 h-3.5" />
                          Mito Comum
                        </span>
                        <p className="text-sm font-semibold text-[#2E2520] dark:text-foreground">
                          {item.myth}
                        </p>
                      </div>
                      <div>
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-700 mb-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Realidade Urológica
                        </span>
                        <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                          {item.fact}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* 4.5. AUTOAVALIAÇÃO INTERATIVA DE PERFIL + SIGILO 4 CAMADAS + PACIENTE DE FORA */}
          <section
            id="autoavaliacao"
            className="py-16 lg:py-24 bg-[#E7E1DA]/60 dark:bg-card/50 border-y border-[#2E2520]/10 scroll-mt-20"
          >
            <div className="container max-w-5xl space-y-12">
              {/* Autoavaliação Interativa de Perfil (30 segundos) */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={0}
                className="rounded-2xl border border-[#2E2520]/15 bg-[#FCFAF7] dark:bg-card p-6 sm:p-8 shadow-sm"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#2E2520]/10">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#4A3A30] flex items-center gap-1.5 mb-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#4A3A30]" />
                      Planejamento Individualizado · 30 Segundos
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif text-[#2E2520] dark:text-foreground">
                      {config.quiz.title}
                    </h2>
                  </div>
                  <span className="text-xs text-[#64748B] bg-[#2E2520]/[0.05] px-3 py-1.5 rounded-full self-start md:self-auto">
                    100% anônimo · Nenhum dado fica salvo
                  </span>
                </div>

                <div className="grid lg:grid-cols-3 gap-6 mb-7">
                  {/* Pergunta 1 */}
                  <div className="rounded-xl border border-[#2E2520]/10 bg-white dark:bg-card p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#4A3A30] mb-1">
                      1. {config.quiz.question1Label}
                    </p>
                    <p className="text-sm font-semibold text-[#2E2520] mb-3">
                      {config.quiz.question1Prompt}
                    </p>
                    <div className="space-y-2">
                      {config.quiz.question1Options.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setQuizGoal(opt.id)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium border transition-all flex items-center justify-between gap-2 ${
                            quizGoal === opt.id
                              ? "bg-[#2E2520] text-white border-[#2E2520]"
                              : "bg-[#FCFAF7] text-[#334155] border-[#2E2520]/10 hover:border-[#4A3A30]/40"
                          }`}
                        >
                          <span>{opt.label}</span>
                          {quizGoal === opt.id && <Check className="w-3.5 h-3.5 shrink-0" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pergunta 2 */}
                  <div className="rounded-xl border border-[#2E2520]/10 bg-white dark:bg-card p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#4A3A30] mb-1">
                      2. {config.quiz.question2Label}
                    </p>
                    <p className="text-sm font-semibold text-[#2E2520] mb-3">
                      {config.quiz.question2Prompt}
                    </p>
                    <div className="space-y-2">
                      {config.quiz.question2Options.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setQuizPriority(opt.id)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium border transition-all flex items-center justify-between gap-2 ${
                            quizPriority === opt.id
                              ? "bg-[#2E2520] text-white border-[#2E2520]"
                              : "bg-[#FCFAF7] text-[#334155] border-[#2E2520]/10 hover:border-[#4A3A30]/40"
                          }`}
                        >
                          <span>{opt.label}</span>
                          {quizPriority === opt.id && <Check className="w-3.5 h-3.5 shrink-0" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pergunta 3 */}
                  <div className="rounded-xl border border-[#2E2520]/10 bg-white dark:bg-card p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#4A3A30] mb-1">
                      3. Local de Preferência
                    </p>
                    <p className="text-sm font-semibold text-[#2E2520] mb-3">
                      Onde seria melhor para você?
                    </p>
                    <div className="space-y-2">
                      {[
                        { id: "sp", label: "São Paulo (Av. Paulista ou Pinheiros)" },
                        { id: "campinas", label: "Campinas (Cambuí / Rede D'Or)" },
                        { id: "outra_cidade", label: "Outra cidade / Teleconsulta Executiva" },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setQuizCity(opt.id)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium border transition-all flex items-center justify-between gap-2 ${
                            quizCity === opt.id
                              ? "bg-[#2E2520] text-white border-[#2E2520]"
                              : "bg-[#FCFAF7] text-[#334155] border-[#2E2520]/10 hover:border-[#4A3A30]/40"
                          }`}
                        >
                          <span>{opt.label}</span>
                          {quizCity === opt.id && <Check className="w-3.5 h-3.5 shrink-0" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Resultado Dinâmico da Autoavaliação */}
                <div className="rounded-xl bg-[#2E2520] text-white p-5 sm:p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  <div className="space-y-1.5 max-w-2xl">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#D9C58A]">
                      <CheckCircle2 className="w-4 h-4" />
                      Síntese clínica para o seu perfil selecionado
                    </span>
                    <p className="text-base sm:text-lg font-serif text-white">
                      Planejamento direcionado para{" "}
                      <span className="text-[#D9C58A]">{selectedGoalOption?.summaryText}</span>
                    </p>
                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                      {quizCity === "outra_cidade"
                        ? "Para pacientes de fora de SP/Campinas, realizamos Teleconsulta urológica inicial para análise de exames e alinhamento terapêutico, otimizando sua vinda presencial apenas quando estritamente necessária."
                        : `No atendimento presencial em ${quizCityLabel[quizCity]}, o Dr. Felipe de Bulhões conduz uma avaliação detalhada e individualizada, alinhada às diretrizes internacionais (EAU e AUA).`}
                    </p>
                  </div>

                  <a
                    href={quizWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      handleWhatsAppConversion(`quiz_${quizGoal}_${quizPriority}_${quizCity}`)
                    }
                    className="shrink-0 w-full lg:w-auto"
                  >
                    <Button className="w-full lg:w-auto bg-[#C9B6A3] hover:bg-[#E7E1DA] text-[#2E2520] font-semibold h-12 px-6 text-sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Solicitar Avaliação para este Perfil
                    </Button>
                  </a>
                </div>
              </motion.div>

              {/* Grid Duplo: Padrão de Atendimento em 4 Camadas + Fluxo Paciente de Fora */}
              <div className="grid lg:grid-cols-2 gap-8 items-stretch">
                {/* Card 1: Padrão de Atendimento e Privacidade */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={1}
                  className="rounded-2xl border border-[#2E2520]/12 bg-[#FCFAF7] dark:bg-card p-6 sm:p-7 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-[#2E2520] flex items-center justify-center shrink-0">
                        <Lock className="w-4 h-4 text-[#D9C58A]" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#4A3A30] block">
                          Excelência e Discrição Médica
                        </span>
                        <h3 className="text-xl font-serif text-[#2E2520] dark:text-foreground">
                          Compromisso em 4 Pilares de Atendimento
                        </h3>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-[#334155] leading-relaxed mb-5">
                      O atendimento particular foi desenhado para oferecer tempo adequado de escuta,
                      precisão diagnóstica e total privacidade em todas as etapas:
                    </p>
                    <div className="space-y-3.5">
                      {[
                        {
                          step: "1",
                          title: "Consulta Sem Pressa e Escuta Ativa",
                          desc: "Tempo dedicado para compreender seu histórico completo, analisar exames anteriores e explicar a anatomia com clareza.",
                        },
                        {
                          step: "2",
                          title: "Privacidade da Recepção ao Consultório",
                          desc: "Fluxo discreto nas unidades da Av. Paulista, Pinheiros e Campinas, com opção de agendamento reservado pelo WhatsApp.",
                        },
                        {
                          step: "3",
                          title: "Decisão Compartilhada e Baseada em Evidências",
                          desc: "Indicações fundamentadas nas diretrizes da EAU, AUA e SBU — priorizando sempre o tratamento mais seguro e eficaz.",
                        },
                        {
                          step: "4",
                          title: "Canal Direto de Acompanhamento",
                          desc: "Suporte próximo da equipe médica para orientação de exames, preparo cirúrgico e recuperação pós-procedimento.",
                        },
                      ].map((layer) => (
                        <div key={layer.step} className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-[#4A3A30]/12 text-[#2E2520] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {layer.step}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-[#2E2520] dark:text-foreground">
                              {layer.title}
                            </p>
                            <p className="text-xs text-[#64748B] leading-relaxed">{layer.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Card 2: Protocolo Paciente de Outra Cidade / Agenda Executiva */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={2}
                  className="rounded-2xl border border-[#2E2520]/12 bg-[#FCFAF7] dark:bg-card p-6 sm:p-7 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-[#2E2520] flex items-center justify-center shrink-0">
                        <Plane className="w-4 h-4 text-[#AFC1D0]" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#4A3A30] block">
                          Logística Simplificada · Brasil e Exterior
                        </span>
                        <h3 className="text-xl font-serif text-[#2E2520] dark:text-foreground">
                          Vem de outra cidade ou tem agenda executiva?
                        </h3>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-[#334155] leading-relaxed mb-5">
                      Recebemos pacientes da capital, do interior paulista e de outros estados,
                      organizando o fluxo para evitar deslocamentos desnecessários:
                    </p>
                    <div className="space-y-4">
                      <div className="rounded-xl bg-white dark:bg-card p-4 border border-[#2E2520]/8 flex items-start gap-3">
                        <Video className="w-5 h-5 text-[#4A3A30] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-[#2E2520]">
                            Etapa 1 · Teleconsulta Urológica e Análise de Exames
                          </p>
                          <p className="text-xs text-[#64748B] leading-relaxed mt-0.5">
                            Avaliação por videoconferência segura para revisar exames de imagem e
                            laboratoriais, discutir opções terapêuticas e planejar os próximos passos.
                          </p>
                        </div>
                      </div>
                      <div className="rounded-xl bg-white dark:bg-card p-4 border border-[#2E2520]/8 flex items-start gap-3">
                        <Clock className="w-5 h-5 text-[#4A3A30] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-[#2E2520]">
                            Etapa 2 · Programação Otimizada em SP ou Campinas
                          </p>
                          <p className="text-xs text-[#64748B] leading-relaxed mt-0.5">
                            Exames complementares ou procedimentos ambulatoriais/cirúrgicos
                            coordenados com antecedência em centros de excelência (Rede D&apos;Or,
                            Campinas Day Hospital e Clinovi).
                          </p>
                        </div>
                      </div>
                      <div className="rounded-xl bg-white dark:bg-card p-4 border border-[#2E2520]/8 flex items-start gap-3">
                        <Stethoscope className="w-5 h-5 text-[#4A3A30] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-[#2E2520]">
                            Etapa 3 · Seguimento Contínuo Híbrido
                          </p>
                          <p className="text-xs text-[#64748B] leading-relaxed mt-0.5">
                            Revisões pós-tratamento realizadas presencialmente ou por telemedicina,
                            com suporte direto da equipe.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* 5. SOBRE O ESPECIALISTA: DR. FELIPE DE BULHÕES */}
          <section id="especialista" className="py-16 lg:py-24 scroll-mt-20">
            <div className="container max-w-5xl">
              <div className="grid lg:grid-cols-12 gap-10 items-center">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={0}
                  className="lg:col-span-5 flex justify-center"
                >
                  <div className="relative w-full max-w-sm">
                    <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-[#2E2520]/15 shadow-xl bg-[#2E2520]">
                      <img
                        loading="lazy"
                        src={PORTRAIT_URL}
                        alt="Dr. Felipe de Bulhões Ojeda — Urologista em São Paulo e Campinas"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="mt-4 bg-[#FCFAF7] dark:bg-card rounded-xl p-4 border border-[#2E2520]/10 shadow-sm flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 text-amber-500 fill-amber-500"
                            />
                          ))}
                          <span className="text-xs font-bold text-[#2E2520] ml-1.5">
                            5.0 no Doctoralia
                          </span>
                        </div>
                        <p className="text-xs text-[#64748B] mt-0.5">
                          CRM-SP 202.291 · RQE 146538 / RQE 114019
                        </p>
                      </div>
                      <Link
                        href="/sobre"
                        className="text-xs font-semibold text-[#4A3A30] hover:underline flex items-center gap-1"
                      >
                        Currículo
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={1}
                  className="lg:col-span-7"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#4A3A30] block mb-2">
                    Responsável Técnico
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#2E2520] dark:text-foreground font-serif mb-4">
                    Dr. Felipe de Bulhões Ojeda
                  </h2>
                  <p className="text-[#334155] leading-relaxed mb-4">
                    Médico Urologista formado pelo{" "}
                    <strong>Instituto D&apos;Or de Ensino e Pesquisa (IDOR)</strong> em São Paulo e
                    Cirurgião Geral Titular do Colégio Brasileiro de Cirurgiões (
                    <strong>TCBC</strong>). Possui formação em pesquisa clínica pela{" "}
                    <strong>Harvard T.H. Chan School of Public Health (PPCR)</strong>.
                  </p>
                  <p className="text-[#334155] leading-relaxed mb-6">
                    {config.specialistFocusParagraph}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3.5 mb-8">
                    {[
                      {
                        icon: GraduationCap,
                        title: "Urologia — Instituto D'Or (IDOR)",
                        desc: "Formação em centro de referência de alta complexidade em São Paulo",
                      },
                      {
                        icon: Award,
                        title: "Cirurgião Geral Titular (TCBC)",
                        desc: "RQE 146538 (Urologia) e RQE 114019 (Cirurgia Geral)",
                      },
                      {
                        icon: BookOpen,
                        title: "Membro SBU, EAU e AUA",
                        desc: "Condutas alinhadas aos protocolos urológicos europeus e americanos",
                      },
                      {
                        icon: Lock,
                        title: "Atendimento Particular e Individualizado",
                        desc: "Tempo dedicado para esclarecer cada detalhe com calma e precisão",
                      },
                    ].map((cred, i) => (
                      <div
                        key={i}
                        className="bg-[#FCFAF7] dark:bg-card rounded-lg p-4 border border-[#2E2520]/10 flex items-start gap-3"
                      >
                        <cred.icon className="w-5 h-5 text-[#4A3A30] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-[#2E2520] dark:text-foreground">
                            {cred.title}
                          </p>
                          <p className="text-xs text-[#64748B] mt-0.5">{cred.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Locais de atendimento resumidos */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="rounded-xl bg-[#FCFAF7] p-4 border border-[#2E2520]/10">
                      <div className="flex items-center gap-2 text-sm font-semibold text-[#2E2520] mb-1">
                        <MapPin className="w-4 h-4 text-[#4A3A30]" />
                        São Paulo (Capital)
                      </div>
                      <p className="text-xs text-[#64748B]">
                        Clinovi Paulista (Av. Paulista, 1048 — 18° andar) e Clinovi Pinheiros (Av. Rebouças, 2636)
                      </p>
                    </div>
                    <div className="rounded-xl bg-[#FCFAF7] p-4 border border-[#2E2520]/10">
                      <div className="flex items-center gap-2 text-sm font-semibold text-[#2E2520] mb-1">
                        <MapPin className="w-4 h-4 text-[#4A3A30]" />
                        Campinas (Interior de SP)
                      </div>
                      <p className="text-xs text-[#64748B]">
                        Campinas Day Hospital (Av. Benjamin Constant, 1991 — Cambuí) e CEMED Rede D&apos;Or São Luiz Campinas
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Prova Social Ética: Experiência de Atendimento Verificada */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={2}
                className="mt-14 pt-12 border-t border-[#2E2520]/10"
              >
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#4A3A30] block mb-1.5">
                      Experiência de Atendimento Verificada
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif text-[#2E2520] dark:text-foreground">
                      O que os pacientes destacam sobre o atendimento
                    </h3>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-[#FCFAF7] border border-[#2E2520]/10 px-3.5 py-2 rounded-full self-start sm:self-auto">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-[#2E2520]">
                      Nota 5.0 · Mais de 100 avaliações verificadas
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-5">
                  {defaultPatientReviews.map((review, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-[#2E2520]/10 bg-[#FCFAF7] dark:bg-card p-5 flex flex-col justify-between shadow-sm"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, sIdx) => (
                              <Star
                                key={sIdx}
                                className="w-3.5 h-3.5 text-amber-500 fill-amber-500"
                              />
                            ))}
                          </div>
                          <Quote className="w-4 h-4 text-[#4A3A30]/40" />
                        </div>
                        <p className="text-xs sm:text-sm text-[#334155] leading-relaxed italic mb-4">
                          &ldquo;{review.text}&rdquo;
                        </p>
                      </div>
                      <div className="pt-3 border-t border-[#2E2520]/8 flex items-center justify-between text-[11px] text-[#64748B]">
                        <span className="font-semibold text-[#2E2520]">{review.author}</span>
                        <span>{review.source}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* 6. FAQ INTERATIVO COM FILTROS + REFERÊNCIAS */}
          <section id="duvidas-frequentes" className="py-16 lg:py-24 scroll-mt-20">
            <div className="container max-w-4xl">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={0}
                className="mb-8"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#4A3A30] block mb-2">
                  Esclarecimento Completo
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#2E2520] dark:text-foreground font-serif mb-4">
                  Perguntas frequentes sobre {config.heroTitle}
                </h2>
                <p className="text-[#334155] leading-relaxed">
                  Selecione um tema abaixo ou clique nas perguntas para ler as respostas técnicas
                  elaboradas pelo Dr. Felipe de Bulhões.
                </p>
              </motion.div>

              {/* Filtros de Categoria do FAQ */}
              <div
                className="flex flex-wrap gap-2 mb-7"
                role="tablist"
                aria-label="Filtrar perguntas por tema"
              >
                {[
                  { id: "todos", label: "Todas as dúvidas" },
                  { id: "indicacoes", label: "Diagnóstico e Indicações" },
                  { id: "procedimento", label: "Como Funciona" },
                  { id: "seguranca", label: "Segurança e Resultados" },
                  { id: "recuperacao", label: "Preparo e Recuperação" },
                ].map((tab) => {
                  const isActive = activeCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveCategory(tab.id as FaqCategoryKey)}
                      className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-[#2E2520] text-[#F7F5F2]"
                          : "bg-[#FCFAF7] text-[#2E2520]/75 border border-[#2E2520]/12 hover:border-[#4A3A30]/40"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Lista de FAQs */}
              <div className="space-y-3">
                {filteredFaqs.map((item) => {
                  const isOpen = openFaqId === item.id;
                  return (
                    <div
                      key={item.id}
                      className="bg-[#FCFAF7] dark:bg-card rounded-xl border border-[#2E2520]/10 overflow-hidden shadow-sm"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqId(isOpen ? null : item.id)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-[#2E2520]/[0.02] transition-colors"
                      >
                        <span className="font-semibold text-[#2E2520] dark:text-foreground text-sm sm:text-base pr-4">
                          {item.question}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-[#4A3A30] shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="px-5 pb-5 pt-1 border-t border-[#2E2520]/6">
                              <p className="text-sm text-[#334155] leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Referências Científicas & Link Educativo */}
              <div className="mt-10 rounded-xl border border-[#2E2520]/10 bg-[#FCFAF7] p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-[#2E2520]/10">
                  <div className="flex items-center gap-2.5">
                    <FileCheck2 className="w-5 h-5 text-[#4A3A30]" />
                    <h3 className="text-base font-serif text-[#2E2520] dark:text-foreground">
                      Base Científica e Diretrizes Internacionais
                    </h3>
                  </div>
                  <Link
                    href={config.references.guideLinkHref}
                    className="text-xs font-semibold text-[#4A3A30] hover:underline inline-flex items-center gap-1"
                  >
                    {config.references.guideLinkLabel}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <ul className="space-y-2 text-xs text-[#64748B]">
                  {config.references.items.map((refItem, idx) => (
                    <li key={idx}>• {refItem}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </main>

        {/* ── COMPARTILHAMENTO DISCRETO ────────────────────────────────────── */}
        <section className="brand-campaign-share border-t border-[#2E2520]/10 bg-[#E7E1DA] py-8 dark:bg-card">
          <div className="container max-w-5xl flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <h2 className="text-lg font-serif text-[#2E2520] dark:text-foreground">
                Salve ou compartilhe esta página com segurança
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-[#64748B]">
                Informação urológica clara, ética e baseada em evidências científicas.
              </p>
            </div>
            <SocialShareButtons
              title={config.pageTitle}
              text={config.pageDescription}
              source={`campaign_${config.campaignSlug}`}
            />
          </div>
        </section>

        {/* ── SEÇÃO FINAL DE AGENDAMENTO (ALTA CONVERSÃO) ──────────────────── */}
        <section
          id="agendamento"
          className="brand-campaign-final-cta brand-dark-surface py-16 lg:py-24"
        >
          <div className="container max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#C9B6A3]/35 bg-white/5 text-xs uppercase tracking-wider text-[#E7E1DA] mb-4">
              <Lock className="w-3.5 h-3.5 text-[#C9B6A3]" />
              Atendimento Particular e Individualizado
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white font-serif mb-4">
              Agende sua avaliação com o Dr. Felipe de Bulhões
            </h2>

            <p className="text-white/75 text-sm sm:text-base max-w-2xl mx-auto mb-7 leading-relaxed">
              Escolha a unidade de sua preferência em <strong>São Paulo</strong> ou{" "}
              <strong>Campinas</strong>, ou inicie o atendimento diretamente pelo WhatsApp para
              verificar os próximos horários disponíveis.
            </p>

            {/* Seletor de Modo de Mensagem no Rodapé de Conversão */}
            <div className="max-w-2xl mx-auto mb-7 rounded-xl border border-white/15 bg-white/[0.04] p-4 text-left">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                <span className="text-xs font-semibold text-[#C9B6A3] flex items-center gap-1.5">
                  <EyeOff className="w-3.5 h-3.5 text-[#C9B6A3]" />
                  Preferência de mensagem inicial no WhatsApp:
                </span>
                <span className="text-[11px] text-white/65">
                  Altera automaticamente o texto enviado aos botões abaixo
                </span>
              </div>
              <div className="grid sm:grid-cols-3 gap-2">
                {(Object.keys(messageOptions) as MessageModeKey[]).map((modeKey) => {
                  const opt = messageOptions[modeKey];
                  const isSelected = messageMode === modeKey;
                  return (
                    <button
                      key={modeKey}
                      type="button"
                      onClick={() => setMessageMode(modeKey)}
                      className={`text-left rounded-lg px-3 py-2 text-xs transition-all border ${
                        isSelected
                          ? "bg-[#C9B6A3] text-[#2E2520] border-[#C9B6A3] font-semibold"
                          : "bg-white/[0.03] text-white/80 border-white/12 hover:bg-white/[0.08]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="truncate">{opt.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Botões de WhatsApp por Cidade + Doctoralia */}
            <div className="grid sm:grid-cols-3 gap-3.5 max-w-3xl mx-auto mb-8">
              <CTAButtonWithAnimation
                href={whatsappSpUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleWhatsAppConversion("footer_sp")}
                loadingText="Abrindo WhatsApp SP…"
                icon={<MessageCircle className="w-5 h-5" />}
                className="schedule-cta schedule-cta--primary h-13 px-5 text-sm font-semibold justify-center"
              >
                WhatsApp · São Paulo
              </CTAButtonWithAnimation>

              <CTAButtonWithAnimation
                href={whatsappCampinasUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleWhatsAppConversion("footer_campinas")}
                loadingText="Abrindo WhatsApp Campinas…"
                icon={<Phone className="w-5 h-5" />}
                className="schedule-cta schedule-cta--secondary h-13 px-5 text-sm font-semibold justify-center border border-[#C9B6A3]/40"
              >
                WhatsApp · Campinas
              </CTAButtonWithAnimation>

              <CTAButtonWithAnimation
                href={doctoraliaUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleDoctoraliaConversion("footer_doctoralia")}
                loadingText="Abrindo Doctoralia…"
                icon={<Calendar className="w-5 h-5" />}
                variant="outline"
                className="schedule-cta schedule-cta--outline h-13 px-5 text-sm font-semibold justify-center"
              >
                Agendar no Doctoralia
              </CTAButtonWithAnimation>
            </div>

            <div className="max-w-2xl mx-auto rounded-lg border border-white/15 bg-white/[0.04] p-4 text-xs text-white/70 leading-relaxed">
              <strong>Nota Ética (CFM nº 2.336/2023):</strong> Todo tratamento ou procedimento
              médico possui indicações, limitações e riscos que devem ser avaliados individualmente
              em consulta. Os resultados clínicos variam conforme as condições anatômicas e
              biológicas de cada paciente.
            </div>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────────────── */}
        <footer className="brand-campaign-footer brand-dark-surface py-8 border-t border-white/10">
          <div className="container text-center">
            <p className="text-white/60 text-sm">
              &copy; {new Date().getFullYear()} Dr. Felipe de Bulhões Ojeda — Médico Urologista |
              CRM-SP 202.291 · RQE 146538 / RQE 114019 · TCBC
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-4 text-xs text-white/50">
              <Link href="/" className="hover:text-white transition-colors">
                Página Inicial
              </Link>
              <Link href="/sobre" className="hover:text-white transition-colors">
                Sobre o Dr. Felipe
              </Link>
              <Link href="/consultorios" className="hover:text-white transition-colors">
                Consultórios (SP e Campinas)
              </Link>
              <Link href={config.references.guideLinkHref} className="hover:text-white transition-colors">
                {config.references.guideLinkLabel}
              </Link>
              {config.relatedLinks?.map((rel) => (
                <Link key={rel.href} href={rel.href} className="hover:text-white transition-colors">
                  {rel.label}
                </Link>
              ))}
              <Link href="/privacidade" className="hover:text-white transition-colors">
                Política de Privacidade
              </Link>
            </div>
          </div>
        </footer>

        <MobileBottomBar source={config.campaignSlug} />
        <WhatsAppButton
          message={activeMessageConfig.messageSp}
          source={`campaign_${config.campaignSlug}`}
        />
      </div>
    </>
  );
}
