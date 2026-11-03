/**
 * Landing Page Exclusiva: Preenchimento Peniano com Ácido Hialurônico (/preenchimento-peniano)
 * Origem de tráfego principal: SEO orgânico e Link da Bio / Instagram
 * Foco de conversão primário: WhatsApp (com Doctoralia como alternativa direta)
 * Tom: Médico, elegante, discreto, baseado em evidências (EAU, SMSNA, AUA) e em conformidade ética com o CFM.
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
  Scale,
  RefreshCw,
  FileCheck2,
  Star,
  GraduationCap,
  BookOpen,
  XCircle,
  MessageCircle,
  Layers,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaviconInjector } from "@/components/FaviconInjector";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import SocialShareButtons from "@/components/SocialShareButtons";
import MobileBottomBar from "@/components/MobileBottomBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CTAButtonWithAnimation } from "@/components/CTAButtonWithAnimation";
import { FAQSchema, MedicalPageSchema } from "@/components/SchemaMarkup";
import {
  trackEducationalPageView,
  trackDoctoraliaClick,
  trackWhatsAppClick,
  trackCtaClick,
} from "@/lib/analytics";
import { getWhatsAppUrl, getWhatsAppCampinasUrl } from "@/lib/tracking";

const CAMPAIGN_SLUG = "preenchimento-peniano";
const PAGE_TITLE = "Preenchimento Peniano com Ácido Hialurônico em SP e Campinas | Dr. Felipe de Bulhões";
const PAGE_DESCRIPTION =
  "Preenchimento peniano com ácido hialurônico realizado por urologista em São Paulo e Campinas. Procedimento ambulatorial sem cortes, reversível, seguro e com sigilo absoluto.";
const OG_IMAGE = "https://felipebulhoes.com/manus-storage/og-banner-estetica-intima-marrom-neutro_2f27a7fa.png";
const PORTRAIT_URL = "/manus-storage/felipe-portrait_0e0693e4_be070ac1.webp";
const LOGO_URL = "/manus-storage/logo-landscape-dr-felipe_cc84d4a3.svg";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.48 },
  }),
};

const comparisonRows = [
  {
    criterion: "Biocompatibilidade e Absorção",
    ha: "Gel biocompatível, naturalmente presente no organismo e absorvido de forma gradual ao longo de 12 a 18 meses.",
    pmma: "Microesferas plásticas definitivas (acrílico) que provocam reação inflamatória crônica de corpo estranho.",
    haPositive: true,
  },
  {
    criterion: "Reversibilidade e Ajuste",
    ha: "100% reversível e ajustável: pode ser dissolvido seletivamente com a enzima hialuronidase caso necessário.",
    pmma: "Irreversível por via enzimática. A remoção exige cirurgia complexa com risco de perda tecidual e sequelas.",
    haPositive: true,
  },
  {
    criterion: "Aspecto e Toque (Flácido e Ereto)",
    ha: "Textura macia, elástica e uniforme quando aplicado no plano anatômico correto (entre as fáscias de Dartos e Buck).",
    pmma: "Alto índice de endurecimento, fibrose, nódulos palpáveis e deformidades visíveis no médio e longo prazo.",
    haPositive: true,
  },
  {
    criterion: "Preservação da Ereção e Sensibilidade",
    ha: "Não invade os corpos cavernosos nem o feixe vasculonervoso dorsal. Ereção e sensibilidade preservadas.",
    pmma: "Reações granulomatosas severas podem comprimir estruturas adjacentes e causar dor crônica na ereção.",
    haPositive: true,
  },
  {
    criterion: "Posicionamento das Sociedades Médicas",
    ha: "Reconhecido em publicações da AUA, EAU e SMSNA como a opção de melhor perfil de segurança para ganho de circunferência.",
    pmma: "Contraindicado para fins estéticos volumétricos genitais devido à alta taxa de complicações tardias graves.",
    haPositive: true,
  },
];

const stepByStep = [
  {
    step: "01",
    title: "Consulta e Avaliação Urológica Sigilosa",
    duration: "Pré-procedimento",
    description:
      "Conversa individual e confidencial com o Dr. Felipe de Bulhões. Inclui exame físico anatômico, avaliação da elasticidade da pele, alinhamento de expectativas realistas e exclusão de contraindicações.",
  },
  {
    step: "02",
    title: "Preparo e Anestesia Local em Consultório",
    duration: "10–15 minutos",
    description:
      "Realizado em ambiente ambulatorial estéril, sem necessidade de internação hospitalar ou cortes. O bloqueio anestésico local na base torna o procedimento praticamente indolor.",
  },
  {
    step: "03",
    title: "Aplicação com Microcânula Atraumática",
    duration: "20–30 minutos",
    description:
      "Por apenas dois micropontos de entrada na base (posições 10h e 2h), o ácido hialurônico reticulado de alta densidade é depositado com cânula romba entre a fáscia de Dartos e a fáscia de Buck.",
  },
  {
    step: "04",
    title: "Moldagem Anatômica de Precisão",
    duration: "Imediato",
    description:
      "Após a deposição em leque, o urologista realiza a escultura manual do preenchedor para garantir distribuição homogênea, transição suave junto à glande e simetria circunferencial.",
  },
  {
    step: "05",
    title: "Alta Imediata e Curativo Compressivo Leve",
    duration: "Mesmo dia",
    description:
      "O paciente sai caminhando normalmente após o procedimento, com bandagem elástica discreta para estabilizar o gel nos primeiros dias e minimizar o inchaço transitório.",
  },
  {
    step: "06",
    title: "Revisão Médica e Acompanhamento",
    duration: "14 e 30 dias",
    description:
      "Retorno programado para avaliar a acomodação tecidual, orientar eventuais massagens de modelagem e planejar, se desejado pelo paciente, sessões complementares progressivas.",
  },
];

type FaqCategory = "todos" | "resultados" | "procedimento" | "seguranca" | "recuperacao";

const faqItems: Array<{
  id: string;
  category: Exclude<FaqCategory, "todos">;
  question: string;
  answer: string;
}> = [
  {
    id: "faq-ganho",
    category: "resultados",
    question: "Qual é o ganho real de circunferência (espessura) com o ácido hialurônico?",
    answer:
      "O ganho depende da anatomia inicial, da elasticidade da pele e do volume de ácido hialurônico indicado na avaliação médica. Estudos clínicos publicados (como séries avaliadas na AUANews e PRS Global Open) demonstram ganho mensurável e consistente por sessão, podendo alcançar de 1,5 cm a 2,5 cm de circunferência de forma segura e proporcional, muitas vezes construído de maneira gradual para priorizar a simetria e a naturalidade.",
  },
  {
    id: "faq-comprimento",
    category: "resultados",
    question: "O preenchimento aumenta apenas a espessura ou também o comprimento?",
    answer:
      "O objetivo primário e comprovado é o ganho de circunferência (calibre/espessura) tanto no estado flácido quanto em ereção. No estado flácido, o peso e o volume do gel frequentemente reduzem a retração natural do pênis (efeito 'shower'), proporcionando a percepção visual de maior projeção em repouso. Contudo, o procedimento não altera o comprimento real dos corpos cavernosos durante a ereção.",
  },
  {
    id: "faq-duracao",
    category: "resultados",
    question: "Quanto tempo dura o resultado? O produto some de uma vez?",
    answer:
      "A durabilidade média varia de 12 a 18 meses, podendo se estender conforme o metabolismo individual e a reticulação do gel utilizado. O ácido hialurônico não desaparece repentinamente: a reabsorção é lenta e gradual, e parte do efeito volumétrico é mantida pelo estímulo local de colágeno. Sessões de manutenção (retoque) costumam exigir volumes menores que a aplicação inicial.",
  },
  {
    id: "faq-dor",
    category: "procedimento",
    question: "O procedimento dói? Precisa de internação ou centro cirúrgico?",
    answer:
      "Não requer internação nem cortes. É realizado no próprio consultório médico sob anestesia local (creme anestésico prévio seguido de bloqueio anestésico local na base). Após o bloqueio, o paciente sente apenas a manipulação tátil, sem dor aguda. Todo o processo leva cerca de 30 a 45 minutos.",
  },
  {
    id: "faq-erecao",
    category: "seguranca",
    question: "O preenchimento pode prejudicar a ereção, a ejaculação ou a sensibilidade?",
    answer:
      "Não. O preenchimento é depositado em um plano superficial específico — entre a fáscia de Dartos e a fáscia de Buck — totalmente separado dos corpos cavernosos (responsáveis pela ereção), da uretra (ejaculação/urina) e do feixe vasculonervoso dorsal (responsável pela sensibilidade). Em grandes séries clínicas, não houve registro de disfunção erétil ou perda de sensibilidade.",
  },
  {
    id: "faq-toque",
    category: "resultados",
    question: "Fica artificial ao toque ou visível que foi feito um procedimento?",
    answer:
      "Quando aplicado na camada anatômica correta com microcânula e produtos de reologia adequada para a região íntima, o gel se integra de maneira uniforme sob a pele, mantendo textura natural tanto em flacidez quanto em ereção. Evitar hipercorreções exageradas em uma única sessão é um dos segredos para preservar a naturalidade.",
  },
  {
    id: "faq-reversivel",
    category: "seguranca",
    question: "E se eu quiser reverter ou corrigir alguma pequena assimetria?",
    answer:
      "Essa é uma das maiores vantagens do ácido hialurônico sobre materiais permanentes: caso haja qualquer irregularidade focal ou desejo de reversão, existe um antídoto específico — a enzima hialuronidase — capaz de dissolver o gel com segurança no próprio consultório.",
  },
  {
    id: "faq-recuperacao",
    category: "recuperacao",
    question: "Quanto tempo depois posso voltar a trabalhar, treinar e ter relações?",
    answer:
      "Atividades cotidianas e trabalho de escritório podem ser retomados no mesmo dia ou no dia seguinte. Exercícios físicos moderados são liberados após 3 a 5 dias, e atividades intensas após 7 dias. Para relações sexuais, recomenda-se aguardar de 10 a 14 dias para garantir a completa estabilização do gel no plano anatômico.",
  },
  {
    id: "faq-valores",
    category: "procedimento",
    question: "Qual o valor do preenchimento peniano e quantos mL são necessários?",
    answer:
      "A quantidade de seringas (mL) e o planejamento dependem diretamente das medidas anatômicas, da presença ou não de postectomia (circuncisão) prévia e do objetivo estético de cada paciente. Em conformidade com as normas do Conselho Federal de Medicina (CFM), valores de procedimentos médicos são informados após avaliação individualizada em consulta.",
  },
];

export default function PreenchimentoPeniano() {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>("todos");
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-ganho");

  const whatsappSpUrl = getWhatsAppUrl({
    page: CAMPAIGN_SLUG,
    customMessage:
      "Olá! Vi a página sobre Preenchimento Peniano com Ácido Hialurônico e gostaria de agendar uma avaliação com o Dr. Felipe de Bulhões.",
  });

  const whatsappCampinasUrl = getWhatsAppCampinasUrl(CAMPAIGN_SLUG);

  const doctoraliaUrl = `https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas?utm_source=site&utm_medium=landing_page&utm_campaign=${CAMPAIGN_SLUG}`;

  useEffect(() => {
    document.title = PAGE_TITLE;
    trackEducationalPageView("Preenchimento Peniano com Ácido Hialurônico", window.location.pathname);
  }, []);

  const handleWhatsAppConversion = (locationLabel: string) => {
    trackWhatsAppClick(`lp_${CAMPAIGN_SLUG}_${locationLabel}`);
    trackCtaClick("whatsapp", `lp_${CAMPAIGN_SLUG}_${locationLabel}`);
  };

  const handleDoctoraliaConversion = (locationLabel: string) => {
    trackDoctoraliaClick(`lp_${CAMPAIGN_SLUG}_${locationLabel}`);
    trackCtaClick("doctoralia", `lp_${CAMPAIGN_SLUG}_${locationLabel}`);
  };

  const scrollToSection = (id: string) => {
    const shouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  const filteredFaqs =
    activeCategory === "todos"
      ? faqItems
      : faqItems.filter((item) => item.category === activeCategory);

  return (
    <>
      <FaviconInjector />
      <MedicalPageSchema
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        path="/preenchimento-peniano"
        medicalCondition="Estética Genital Masculina e Engrossamento Peniano com Ácido Hialurônico"
        lastReviewed="2026-11-02"
      />
      <FAQSchema
        questions={faqItems.map((item) => ({
          question: item.question,
          answer: item.answer,
        }))}
      />

      <div className="brand-campaign-page min-h-screen bg-[#F7F3ED] text-[#2B2420] dark:bg-card dark:text-foreground">
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
              className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#2E2520]/80 dark:text-foreground/80"
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
                onClick={() => scrollToSection("comparativo-ah-pmma")}
                className="hover:text-[#2E2520] transition-colors"
              >
                AH vs. PMMA
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
                <Button className="schedule-cta schedule-cta--primary bg-[#D7C5B0] hover:bg-[#E6D9C9] text-[#2B2420] font-semibold text-xs sm:text-sm h-10 px-4">
                  <MessageCircle className="w-4 h-4 mr-1.5" />
                  <span>Agendar via WhatsApp</span>
                </Button>
              </a>
              <button
                type="button"
                onClick={() => scrollToSection("agendamento")}
                className="hidden sm:inline-flex"
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

        {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
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
                  <Lock className="w-3.5 h-3.5 text-[#C9B6A3]" />
                  <span className="text-xs font-medium tracking-wider uppercase text-[#E7E1DA]">
                    Estética Íntima Masculina · Sigilo Médico Absoluto
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.12] mb-5 font-serif">
                  Preenchimento Peniano com Ácido Hialurônico
                </h1>

                <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-7 max-w-2xl">
                  Procedimento médico ambulatorial para ganho de{" "}
                  <strong className="text-white font-semibold">circunferência peniana</strong> com
                  ácido hialurônico biocompatível e 100% reversível. Realizado sem cortes, com
                  anestesia local e precisão anatômica urológica em{" "}
                  <strong className="text-white font-semibold">São Paulo</strong> e{" "}
                  <strong className="text-white font-semibold">Campinas</strong>.
                </p>

                {/* Destaques rápidos */}
                <div className="grid sm:grid-cols-3 gap-3 mb-8">
                  {[
                    {
                      icon: Clock,
                      title: "30 a 45 min",
                      desc: "Em consultório, sem internação e sem cortes",
                    },
                    {
                      icon: RefreshCw,
                      title: "100% Reversível",
                      desc: "Gel absorvível (12–18 meses) e ajustável",
                    },
                    {
                      icon: ShieldCheck,
                      title: "Função Preservada",
                      desc: "Sem impacto na ereção ou sensibilidade",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="brand-dark-surface-panel rounded-lg border border-white/15 bg-white/[0.06] p-3.5"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <item.icon className="w-4 h-4 text-[#C9B6A3] shrink-0" />
                        <span className="text-sm font-semibold text-white">{item.title}</span>
                      </div>
                      <p className="text-xs text-white/70 leading-snug">{item.desc}</p>
                    </div>
                  ))}
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
                        Síntese Técnica Urológica
                      </span>
                      <h2 className="text-xl text-white font-serif mt-0.5">
                        O que esperar com realismo
                      </h2>
                    </div>
                    <Stethoscope className="w-7 h-7 text-[#C9B6A3] shrink-0" />
                  </div>

                  <ul className="space-y-4 text-sm">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#C9B6A3] mt-1 shrink-0" />
                      <div>
                        <strong className="text-white block">Plano Anatômico Seguro</strong>
                        <span className="text-white/75 text-xs leading-relaxed">
                          Aplicação entre as fáscias de Dartos e Buck com microcânula romba, longe
                          dos corpos cavernosos e nervos da sensibilidade.
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#C9B6A3] mt-1 shrink-0" />
                      <div>
                        <strong className="text-white block">
                          Ganho Real no Calibre (Flácido e Ereto)
                        </strong>
                        <span className="text-white/75 text-xs leading-relaxed">
                          Aumento imediato de circunferência e menor retração no estado flácido,
                          respeitando a proporção e elasticidade individual.
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#C9B6A3] mt-1 shrink-0" />
                      <div>
                        <strong className="text-white block">Sem PMMA ou Substâncias Definitivas</strong>
                        <span className="text-white/75 text-xs leading-relaxed">
                          Utilizamos exclusivamente ácido hialurônico de alta reticulação com
                          registro na ANVISA — biocompatível e reversível.
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <EyeOff className="w-4 h-4 text-[#C9B6A3] mt-1 shrink-0" />
                      <div>
                        <strong className="text-white block">Atendimento Discreto do Início ao Fim</strong>
                        <span className="text-white/75 text-xs leading-relaxed">
                          Agendamento direto sem necessidade de expor detalhes íntimos na recepção;
                          toda a conversa ocorre em consultório médico fechado.
                        </span>
                      </div>
                    </li>
                  </ul>

                  <div className="mt-6 pt-5 border-t border-white/15 flex items-center justify-between gap-4">
                    <div className="text-xs text-white/70">
                      Dúvida rápida antes de agendar?
                    </div>
                    <a
                      href={whatsappSpUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleWhatsAppConversion("hero_card")}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D7C5B0] hover:text-white transition-colors"
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
                  Anatomia e Precisão Urológica
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#2B2420] dark:text-foreground font-serif mb-4">
                  Como funciona o preenchimento peniano com ácido hialurônico?
                </h2>
                <p className="text-[#334155] leading-relaxed">
                  Diferente de cirurgias invasivas de enxerto de gordura ou matrizes dérmicas — que
                  apresentam risco elevado de reabsorção assimétrica, fibrose e retração —, o
                  preenchimento com <strong>ácido hialurônico (AH)</strong> é uma técnica
                  minimamente invasiva realizada em consultório que preserva a arquitetura natural
                  do órgão.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8 items-stretch mb-12">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={1}
                  className="bg-[#FCFAF7] dark:bg-card rounded-xl p-6 sm:p-8 border border-[#2B2420]/10 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="w-11 h-11 rounded-lg bg-[#4A3A30]/10 flex items-center justify-center mb-5">
                      <Layers className="w-5 h-5 text-[#4A3A30]" />
                    </div>
                    <h3 className="text-xl font-serif text-[#2B2420] dark:text-foreground mb-3">
                      Aplicação no Plano Anatômico Correto
                    </h3>
                    <p className="text-sm text-[#334155] leading-relaxed mb-4">
                      O pênis possui camadas bem definidas de revestimento. O preenchedor é
                      depositado exclusivamente no espaço virtual entre a{" "}
                      <strong>fáscia de Dartos</strong> (superficial) e a{" "}
                      <strong>fáscia de Buck</strong> (profunda).
                    </p>
                    <p className="text-sm text-[#334155] leading-relaxed">
                      Como a fáscia de Buck protege os corpos cavernosos, a uretra e o feixe
                      vasculonervoso dorsal, <strong>não há interferência no mecanismo de ereção</strong>,
                      na micção ou na sensibilidade erógena.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#2B2420]/10 text-xs text-[#64748B]">
                    Técnica com microcânula atraumática (22G) por apenas dois pontos na base (10h e
                    2h).
                  </div>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={2}
                  className="bg-[#FCFAF7] dark:bg-card rounded-xl p-6 sm:p-8 border border-[#2B2420]/10 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="w-11 h-11 rounded-lg bg-[#4A3A30]/10 flex items-center justify-center mb-5">
                      <Scale className="w-5 h-5 text-[#4A3A30]" />
                    </div>
                    <h3 className="text-xl font-serif text-[#2B2420] dark:text-foreground mb-3">
                      Construção Progressiva e Naturalidade
                    </h3>
                    <p className="text-sm text-[#334155] leading-relaxed mb-4">
                      Na estética íntima urológica, mais importante do que injetar grandes volumes de
                      uma só vez é respeitar a capacidade de acomodação dos tecidos para evitar
                      degraus, nódulos ou acúmulo distal.
                    </p>
                    <p className="text-sm text-[#334155] leading-relaxed">
                      O protocolo prioriza uma distribuição uniforme ao longo da haste peniana,
                      permitindo avaliação precisa em 14–30 dias e, quando desejado, sessões
                      complementares para atingir o calibre almejado com total simetria.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#2B2420]/10 text-xs text-[#64748B]">
                    Utilização exclusiva de géis de ácido hialurônico com reologia e viscoelasticidade
                    adequadas.
                  </div>
                </motion.div>
              </div>

              {/* Dados da Literatura Científica */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={3}
                className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {[
                  {
                    metric: "+1,5 a 2,5 cm",
                    label: "Ganho de circunferência",
                    detail: "Construído em protocolo individualizado conforme elasticidade tecidual",
                  },
                  {
                    metric: "12 a 18 meses",
                    label: "Durabilidade média",
                    detail: "Reabsorção gradual com estímulo local de colágeno e opção de manutenção",
                  },
                  {
                    metric: "0% de DE",
                    label: "Função erétil intacta",
                    detail: "Nenhum caso de disfunção erétil relatado nas séries clínicas com AH",
                  },
                  {
                    metric: "Alto Índice",
                    label: "Satisfação clínica",
                    detail: "Melhora documentada na autoimagem genital (Male Genital Self-Image Scale)",
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-[#FCFAF7] dark:bg-card rounded-xl p-5 border border-[#2B2420]/10"
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

          {/* 2. COMPARATIVO TÉCNICO: ÁCIDO HIALURÔNICO VS PMMA */}
          <section id="comparativo-ah-pmma" className="py-16 lg:py-24 scroll-mt-20">
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
                  Segurança em Primeiro Lugar
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#2B2420] dark:text-foreground font-serif mb-4">
                  Por que utilizamos apenas Ácido Hialurônico (e nunca PMMA)?
                </h2>
                <p className="text-[#334155] leading-relaxed">
                  Uma das dúvidas mais importantes na consulta urológica diz respeito à escolha do
                  material. Substâncias permanentes como o{" "}
                  <strong>PMMA (polimetilmetacrilato)</strong> oferecem risco inaceitável de
                  complicações tardias irreversíveis na região genital. Compare as diferenças:
                </p>
              </motion.div>

              <div className="space-y-4">
                {comparisonRows.map((row, index) => (
                  <motion.div
                    key={row.criterion}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={index * 0.5}
                    className="bg-[#FCFAF7] dark:bg-card rounded-xl border border-[#2B2420]/10 overflow-hidden shadow-sm"
                  >
                    <div className="bg-[#2E2520]/[0.04] px-6 py-3 border-b border-[#2B2420]/10">
                      <h3 className="text-sm font-semibold text-[#2B2420] dark:text-foreground not-italic font-sans">
                        {row.criterion}
                      </h3>
                    </div>
                    <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#2B2420]/10">
                      <div className="p-5 sm:p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                          <span className="text-xs font-bold uppercase tracking-wider text-[#2E2520]">
                            Ácido Hialurônico (Padrão-Ouro)
                          </span>
                        </div>
                        <p className="text-sm text-[#334155] leading-relaxed">{row.ha}</p>
                      </div>
                      <div className="p-5 sm:p-6 bg-[#2E2520]/[0.015]">
                        <div className="flex items-center gap-2 mb-2">
                          <XCircle className="w-4 h-4 text-rose-700 shrink-0" />
                          <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                            PMMA / Preenchedores Permanentes
                          </span>
                        </div>
                        <p className="text-sm text-[#64748B] leading-relaxed">{row.pmma}</p>
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
                    <p className="text-sm font-semibold text-[#2B2420]">
                      Segurança da reversibilidade com Hialuronidase
                    </p>
                    <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
                      O ácido hialurônico é o único volumizador que conta com uma enzima específica
                      para ajuste fino ou dissolução completa caso necessário.
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
                    Tirar dúvidas com o Urologista
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
                  Protocolo Clínico Padronizado
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#2B2420] dark:text-foreground font-serif mb-4">
                  Como é realizada a jornada do paciente, passo a passo
                </h2>
                <p className="text-[#334155] leading-relaxed">
                  Da avaliação inicial ao retorno de acompanhamento, cada etapa segue rigoroso
                  padrão de antissepsia, conforto anestésico e controle anatômico.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stepByStep.map((item, idx) => (
                  <motion.div
                    key={item.step}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={idx * 0.5}
                    className="bg-[#FCFAF7] dark:bg-card rounded-xl p-6 border border-[#2B2420]/10 shadow-sm flex flex-col justify-between"
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
                      <h3 className="text-lg font-serif text-[#2B2420] dark:text-foreground mb-2.5">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#334155] leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 4. INDICAÇÕES, LIMITAÇÕES E RECUPERAÇÃO */}
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
                  Transparência e Critério Médico
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#2B2420] dark:text-foreground font-serif mb-4">
                  Para quem o procedimento é indicado — e o que ele não faz
                </h2>
                <p className="text-[#334155] leading-relaxed">
                  Uma avaliação ética começa diferenciando o que pode ser alcançado com segurança do
                  que seria promessa irreal. Nem todo paciente tem indicação para o procedimento.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={1}
                  className="bg-[#FCFAF7] dark:bg-card rounded-xl p-6 sm:p-7 border border-[#2B2420]/10"
                >
                  <div className="flex items-center gap-2.5 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                    <h3 className="text-xl font-serif text-[#2B2420] dark:text-foreground">
                      Candidatos Ideais
                    </h3>
                  </div>
                  <ul className="space-y-3 text-sm text-[#334155]">
                    {[
                      "Homens adultos que desejam ganho estético de circunferência (espessura) peniana",
                      "Insatisfação com a retração acentuada do pênis no estado flácido (efeito 'shower')",
                      "Pacientes que buscam alternativa sem cortes, reversível e de rápida recuperação",
                      "Expectativas realistas alinhadas às evidências científicas e à própria anatomia",
                      "Disposição para seguir rigorosamente os cuidados pós-procedimento (10–14 dias)",
                    ].map((point, i) => (
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
                  className="bg-[#FCFAF7] dark:bg-card rounded-xl p-6 sm:p-7 border border-[#2B2420]/10"
                >
                  <div className="flex items-center gap-2.5 mb-4">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                    <h3 className="text-xl font-serif text-[#2B2420] dark:text-foreground">
                      Limites e Contraindicações
                    </h3>
                  </div>
                  <ul className="space-y-3 text-sm text-[#334155]">
                    {[
                      "Não aumenta o comprimento real em ereção (atua na circunferência e projeção flácida)",
                      "Não substitui o tratamento de disfunção erétil ou de curvatura peniana (Doença de Peyronie)",
                      "Contraindicado na presença de infecções genitais ou urinárias ativas",
                      "Contraindicado para pacientes com transtorno dismórfico corporal (BDD) ou expectativas irreais",
                      "Não é realizado em pacientes que já possuem PMMA ou silicone líquido injetado previamente na região",
                    ].map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Linha do tempo de recuperação */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={3}
                className="bg-[#FCFAF7] dark:bg-card rounded-xl p-6 sm:p-8 border border-[#2B2420]/10"
              >
                <h3 className="text-xl font-serif text-[#2B2420] dark:text-foreground mb-5">
                  Linha do Tempo de Recuperação Pós-Procedimento
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {[
                    {
                      period: "Primeiras 48h",
                      title: "Retorno à rotina leve",
                      desc: "Retorno imediato ao trabalho administrativo. Manter curativo compressivo leve conforme orientação.",
                    },
                    {
                      period: "Dias 3 a 7",
                      title: "Regressão do edema",
                      desc: "O inchaço inicial regride progressivamente. Atividades físicas leves a moderadas podem ser retomadas.",
                    },
                    {
                      period: "Dias 10 a 14",
                      title: "Estabilização tecidual",
                      desc: "Revisão médica de 2 semanas. Liberação gradual para atividade sexual após avaliação da acomodação do gel.",
                    },
                    {
                      period: "Dia 30",
                      title: "Resultado consolidado",
                      desc: "Integração completa do ácido hialurônico no plano fascial e avaliação de eventual sessão complementar.",
                    },
                  ].map((phase, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg bg-[#2E2520]/[0.03] p-4 border border-[#2B2420]/8"
                    >
                      <span className="text-xs font-bold uppercase tracking-wider text-[#4A3A30] block mb-1">
                        {phase.period}
                      </span>
                      <p className="font-semibold text-sm text-[#2B2420] dark:text-foreground mb-1.5">
                        {phase.title}
                      </p>
                      <p className="text-xs text-[#64748B] leading-relaxed">{phase.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
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
                    <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-[#2B2420]/15 shadow-xl bg-[#2E2520]">
                      <img
                        loading="lazy"
                        src={PORTRAIT_URL}
                        alt="Dr. Felipe de Bulhões Ojeda — Urologista em São Paulo e Campinas"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="mt-4 bg-[#FCFAF7] dark:bg-card rounded-xl p-4 border border-[#2B2420]/10 shadow-sm flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 text-amber-500 fill-amber-500"
                            />
                          ))}
                          <span className="text-xs font-bold text-[#2B2420] ml-1.5">
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
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#2B2420] dark:text-foreground font-serif mb-4">
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
                    Na área de andrologia e estética íntima masculina, alia o domínio cirúrgico da
                    anatomia peniana a protocolos baseados nas diretrizes internacionais da{" "}
                    <strong>European Association of Urology (EAU)</strong>,{" "}
                    <strong>American Urological Association (AUA)</strong> e{" "}
                    <strong>Sociedade Brasileira de Urologia (SBU)</strong>, oferecendo um ambiente
                    de escuta acolhedor, sem julgamentos e com foco na segurança do paciente.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3.5 mb-8">
                    {[
                      {
                        icon: GraduationCap,
                        title: "Urologia — Instituto D'Or (IDOR)",
                        desc: "Residência médica em centro de referência em São Paulo",
                      },
                      {
                        icon: Award,
                        title: "Cirurgião Geral Titular (TCBC)",
                        desc: "Domínio profundo da anatomia cirúrgica e fascial",
                      },
                      {
                        icon: BookOpen,
                        title: "Membro SBU, EAU e AUA",
                        desc: "Atualização contínua em medicina sexual e andrologia",
                      },
                      {
                        icon: Lock,
                        title: "Atendimento Particular e Sigiloso",
                        desc: "Tempo dedicado para esclarecer cada detalhe com calma",
                      },
                    ].map((cred, i) => (
                      <div
                        key={i}
                        className="bg-[#FCFAF7] dark:bg-card rounded-lg p-4 border border-[#2B2420]/10 flex items-start gap-3"
                      >
                        <cred.icon className="w-5 h-5 text-[#4A3A30] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-[#2B2420] dark:text-foreground">
                            {cred.title}
                          </p>
                          <p className="text-xs text-[#64748B] mt-0.5">{cred.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Locais de atendimento resumidos */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="rounded-xl bg-[#FCFAF7] p-4 border border-[#2B2420]/10">
                      <div className="flex items-center gap-2 text-sm font-semibold text-[#2B2420] mb-1">
                        <MapPin className="w-4 h-4 text-[#4A3A30]" />
                        São Paulo (Capital)
                      </div>
                      <p className="text-xs text-[#64748B]">
                        Clinovi Paulista (Av. Paulista, 1048 — 18° andar) e Clinovi Pinheiros (Av. Rebouças, 2636)
                      </p>
                    </div>
                    <div className="rounded-xl bg-[#FCFAF7] p-4 border border-[#2B2420]/10">
                      <div className="flex items-center gap-2 text-sm font-semibold text-[#2B2420] mb-1">
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
                <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#2B2420] dark:text-foreground font-serif mb-4">
                  Perguntas frequentes sobre o Preenchimento Peniano
                </h2>
                <p className="text-[#334155] leading-relaxed">
                  Selecione um tema abaixo ou clique nas perguntas para ler as respostas técnicas
                  elaboradas pelo Dr. Felipe de Bulhões.
                </p>
              </motion.div>

              {/* Filtros de Categoria do FAQ */}
              <div className="flex flex-wrap gap-2 mb-7" role="tablist" aria-label="Filtrar perguntas por tema">
                {[
                  { id: "todos", label: "Todas as dúvidas" },
                  { id: "resultados", label: "Resultados e Durabilidade" },
                  { id: "procedimento", label: "Procedimento e Avaliação" },
                  { id: "seguranca", label: "Segurança e Função Sexual" },
                  { id: "recuperacao", label: "Recuperação" },
                ].map((tab) => {
                  const isActive = activeCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveCategory(tab.id as FaqCategory)}
                      className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-[#2E2520] text-[#F7F5F2]"
                          : "bg-[#FCFAF7] text-[#2B2420]/75 border border-[#2B2420]/12 hover:border-[#4A3A30]/40"
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
                      className="bg-[#FCFAF7] dark:bg-card rounded-xl border border-[#2B2420]/10 overflow-hidden shadow-sm"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqId(isOpen ? null : item.id)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-[#2E2520]/[0.02] transition-colors"
                      >
                        <span className="font-semibold text-[#2B2420] dark:text-foreground text-sm sm:text-base pr-4">
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
                            <div className="px-5 pb-5 pt-1 border-t border-[#2B2420]/6">
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
              <div className="mt-10 rounded-xl border border-[#2B2420]/10 bg-[#FCFAF7] p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-[#2B2420]/10">
                  <div className="flex items-center gap-2.5">
                    <FileCheck2 className="w-5 h-5 text-[#4A3A30]" />
                    <h3 className="text-base font-serif text-[#2B2420] dark:text-foreground">
                      Base Científica e Literatura de Referência
                    </h3>
                  </div>
                  <Link
                    href="/educativo/engrossamento-peniano"
                    className="text-xs font-semibold text-[#4A3A30] hover:underline inline-flex items-center gap-1"
                  >
                    Ler revisão técnica completa
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <ul className="space-y-2 text-xs text-[#64748B]">
                  <li>
                    • <strong>Pearlman AM, et al.</strong>{" "}
                    <em>The Evolving Landscape of Penile Girth Enhancement.</em> AUANews (American
                    Urological Association), 2024.
                  </li>
                  <li>
                    • <strong>Moon KY, et al.</strong>{" "}
                    <em>Penile Volume Augmentation With Hyaluronic Acid Fillers: Ultrasound Observation.</em>{" "}
                    Plastic and Reconstructive Surgery Global Open, 2025;13(12):e7317.
                  </li>
                  <li>
                    • <strong>Diretrizes EAU &amp; SMSNA:</strong> Recomendações de segurança e
                    avaliação em procedimentos estéticos e reconstrutivos penianos.
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </main>

        {/* ── COMPARTILHAMENTO DISCRETO ────────────────────────────────────── */}
        <section className="brand-campaign-share border-t border-[#2B2420]/10 bg-[#EEE7DE] py-8 dark:bg-card">
          <div className="container max-w-5xl flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <h2 className="text-lg font-serif text-[#2B2420] dark:text-foreground">
                Salve ou compartilhe esta página com discrição
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-[#64748B]">
                Informação médica clara, sem sensacionalismo e baseada em evidências.
              </p>
            </div>
            <SocialShareButtons
              title={PAGE_TITLE}
              text={PAGE_DESCRIPTION}
              source={`campaign_${CAMPAIGN_SLUG}`}
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
              Agende sua avaliação confidencial com o Dr. Felipe de Bulhões
            </h2>

            <p className="text-white/75 text-sm sm:text-base max-w-2xl mx-auto mb-9 leading-relaxed">
              Escolha a unidade de sua preferência em <strong>São Paulo</strong> ou{" "}
              <strong>Campinas</strong>, ou inicie o atendimento diretamente pelo WhatsApp para
              verificar horários disponíveis.
            </p>

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
              <strong>Nota Ética (CFM):</strong> Todo procedimento médico possui indicações,
              limitações e riscos que devem ser avaliados presencialmente. Os resultados variam de
              acordo com as características anatômicas e biológicas de cada paciente.
            </div>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────────────── */}
        <footer className="brand-campaign-footer brand-dark-surface py-8 border-t border-white/10">
          <div className="container text-center">
            <p className="text-white/60 text-sm">
              &copy; {new Date().getFullYear()} Dr. Felipe de Bulhões Ojeda — Médico Urologista |
              CRM-SP 202.291 · RQE 146538 / RQE 114019
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
              <Link href="/estetica-intima-masculina" className="hover:text-white transition-colors">
                Estética Íntima Masculina
              </Link>
              <Link href="/educativo/engrossamento-peniano" className="hover:text-white transition-colors">
                Guia Educativo
              </Link>
              <Link href="/privacidade" className="hover:text-white transition-colors">
                Política de Privacidade
              </Link>
            </div>
          </div>
        </footer>

        <MobileBottomBar source={CAMPAIGN_SLUG} />
        <WhatsAppButton
          message="Olá! Vi a página sobre Preenchimento Peniano com Ácido Hialurônico e gostaria de agendar uma avaliação com o Dr. Felipe de Bulhões."
          source={`campaign_${CAMPAIGN_SLUG}`}
        />
      </div>
    </>
  );
}
