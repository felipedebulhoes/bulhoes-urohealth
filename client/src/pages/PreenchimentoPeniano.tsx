/**
 * Landing Page Exclusiva: Preenchimento Peniano com Ácido Hialurônico (/preenchimento-peniano)
 * Origem de tráfego principal: SEO orgânico e Link da Bio / Instagram
 * Foco de conversão primário: WhatsApp (com Doctoralia como alternativa direta)
 * Tom: Médico, elegante, discreto, baseado em evidências (EAU, SMSNA, AUA) e em conformidade ética com o CFM.
 */
import { useEffect, useState } from "react";
import { getIndexedDocumentMeta } from "@shared/pageMetadata";
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
  Plane,
  Video,
  Check,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaviconInjector } from "@/components/FaviconInjector";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import SocialShareButtons from "@/components/SocialShareButtons";
import MobileBottomBar from "@/components/MobileBottomBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CTAButtonWithAnimation } from "@/components/CTAButtonWithAnimation";
import InlineConsultCTA from "@/components/InlineConsultCTA";
import ProcedureSummary from "@/components/ProcedureSummary";
import SectionFold, { openFoldAndScroll } from "@/components/SectionFold";
import { FAQSchema, MedicalPageSchema } from "@/components/SchemaMarkup";
import {
  trackEducationalPageView,
  trackDoctoraliaClick,
  trackWhatsAppClick,
  trackCtaClick,
} from "@/lib/analytics";
import { getWhatsAppUrl } from "@/lib/tracking";

const CAMPAIGN_SLUG = "preenchimento-peniano";
const PAGE_TITLE = "Preenchimento Peniano com Ácido Hialurônico em SP e Campinas | Dr. Felipe de Bulhões";
const PAGE_DESCRIPTION =
  "Preenchimento peniano com ácido hialurônico realizado por urologista em São Paulo e Campinas. Procedimento ambulatorial sem cortes, reversível, seguro e com sigilo absoluto.";
const OG_IMAGE = "https://felipebulhoes.com/manus-storage/og-banner-estetica-intima-marrom-neutro_2f27a7fa.png";
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

const comparisonRows = [
  {
    criterion: "Biocompatibilidade e Absorção",
    ha: "Gel biocompatível, naturalmente presente no organismo e absorvido de forma gradual ao longo de 12 a 18 meses.",
    pmma: "Microesferas plásticas definitivas (acrílico) que provocam reação inflamatória crônica de corpo estranho.",
    haPositive: true,
  },
  {
    criterion: "Reversibilidade e Ajuste",
    ha: "Reversível com hialuronidase e ajustável: pode ser dissolvido seletivamente com a enzima hialuronidase caso necessário.",
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
    criterion: "Literatura Científica",
    ha: "Descrito em publicações científicas com menor taxa de complicações que outros preenchedores para ganho de circunferência.",
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

type DiscreetMessageMode = "discreta" | "direta" | "duvida";

const discreetMessageOptions: Record<
  DiscreetMessageMode,
  {
    label: string;
    badge: string;
    description: string;
    messageSp: string;
    messageCampinas: string;
  }
> = {
  discreta: {
    label: "100% Discreta (Código Reservado)",
    badge: "Mais escolhida",
    description:
      "Não menciona o nome do procedimento na conversa inicial. Ideal para total privacidade na tela do celular e na recepção.",
    messageSp:
      "Olá! Gostaria de agendar uma consulta urológica particular com o Dr. Felipe de Bulhões em São Paulo (Ref: Avaliação Reservada).",
    messageCampinas:
      "Olá! Gostaria de agendar uma consulta urológica particular com o Dr. Felipe de Bulhões em Campinas (Ref: Avaliação Reservada).",
  },
  direta: {
    label: "Direta sobre o Procedimento",
    badge: "Objetiva",
    description:
      "Informa diretamente que você deseja avaliação para Preenchimento Peniano com Ácido Hialurônico.",
    messageSp:
      "Olá! Vi a página sobre Preenchimento Peniano com Ácido Hialurônico e gostaria de agendar uma avaliação em São Paulo com o Dr. Felipe de Bulhões.",
    messageCampinas:
      "Olá! Vi a página sobre Preenchimento Peniano com Ácido Hialurônico e gostaria de agendar uma avaliação em Campinas com o Dr. Felipe de Bulhões.",
  },
  duvida: {
    label: "Tirar Dúvida de Agenda / Logística",
    badge: "Rápida",
    description:
      "Para quem deseja consultar disponibilidade de datas, horários executivos ou fluxo para pacientes de outra cidade.",
    messageSp:
      "Olá! Gostaria de verificar os próximos horários disponíveis para avaliação particular com o Dr. Felipe de Bulhões.",
    messageCampinas:
      "Olá! Gostaria de verificar os próximos horários disponíveis em Campinas para avaliação particular com o Dr. Felipe de Bulhões.",
  },
};

const mythsAndFacts = [
  {
    myth: "“O produto pode ficar embolado ou artificial ao toque.”",
    fact: "Quando aplicado com microcânula no plano correto (entre as fáscias de Dartos e Buck) e utilizando ácido hialurônico de reologia específica para a região genital, o gel se acomoda como um manto uniforme e elástico tanto em flacidez quanto em ereção.",
  },
  {
    myth: "“O preenchimento pode atrapalhar a ereção ou diminuir a sensibilidade.”",
    fact: "Os corpos cavernosos (responsáveis pela rigidez erétil) e o feixe vasculonervoso dorsal ficam protegidos abaixo da fáscia de Buck, em um compartimento mais profundo que não é invadido pela cânula.",
  },
  {
    myth: "“É preciso internação hospitalar ou afastamento do trabalho.”",
    fact: "Todo o protocolo é ambulatorial, sob anestesia local sem cortes, durando de 30 a 45 minutos. O paciente sai caminhando imediatamente e pode retomar atividades administrativas no mesmo dia ou no dia seguinte.",
  },
  {
    myth: "“Se eu não gostar de algum detalhe, não há como corrigir.”",
    fact: "Ao contrário do PMMA (que é definitivo e perigoso), o ácido hialurônico possui antídoto específico (a enzima hialuronidase), permitindo ajustes finos de simetria ou reversão completa com segurança.",
  },
];


export default function PreenchimentoPeniano() {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>("todos");
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-ganho");
  const [messageMode, setMessageMode] = useState<DiscreetMessageMode>("discreta");

  // Estados da Autoavaliação Interativa de Perfil
  const [quizGoal, setQuizGoal] = useState<string>("espessura");
  const [quizPriority, setQuizPriority] = useState<string>("reversivel");
  const [quizCity, setQuizCity] = useState<string>("sp");

  const activeMessageConfig = discreetMessageOptions[messageMode];

  const whatsappSpUrl = getWhatsAppUrl({
    page: CAMPAIGN_SLUG,
    customMessage: activeMessageConfig.messageSp,
  });

  const whatsappCampinasUrl = getWhatsAppUrl({
    phone: "5519998559890",
    page: CAMPAIGN_SLUG,
    campaign: "campinas",
    customMessage: activeMessageConfig.messageCampinas,
  });

  // URL contextualizada gerada pela Autoavaliação Interativa
  const quizGoalLabel: Record<string, string> = {
    espessura: "ganho de circunferência (espessura)",
    retracao: "reduzir retração no estado flácido e ganhar calibre",
    simetria: "melhorar proporção e simetria",
  };
  const quizCityLabel: Record<string, string> = {
    sp: "São Paulo (Av. Paulista ou Pinheiros)",
    campinas: "Campinas (Cambuí)",
    outra_cidade: "pré-avaliação por Teleconsulta (sou de outra cidade)",
  };

  const quizWhatsappUrl = getWhatsAppUrl({
    phone: quizCity === "campinas" ? "5519998559890" : "5511981124455",
    page: CAMPAIGN_SLUG,
    campaign: quizCity === "campinas" ? "campinas" : CAMPAIGN_SLUG,
    customMessage:
      messageMode === "discreta"
        ? `Olá! Gostaria de agendar uma avaliação urológica particular com o Dr. Felipe de Bulhões para ${quizCityLabel[quizCity]} (Ref: Avaliação Reservada).`
        : `Olá! Fiz a autoavaliação na página de Preenchimento Peniano (objetivo: ${quizGoalLabel[quizGoal]}) e gostaria de agendar consulta em ${quizCityLabel[quizCity]}.`,
  });

  const doctoraliaUrl = `https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas?utm_source=site&utm_medium=landing_page&utm_campaign=${CAMPAIGN_SLUG}`;

  useEffect(() => {
    document.title = getIndexedDocumentMeta(window.location.pathname)?.title ?? PAGE_TITLE;
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
    openFoldAndScroll(id, shouldReduceMotion ? "auto" : "smooth");
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
      />
      <FAQSchema
        questions={faqItems.map((item) => ({
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
                <Button className="schedule-cta schedule-cta--primary bg-[#C9B6A3] hover:bg-[#E7E1DA] text-[#2E2520] font-semibold text-xs sm:text-sm h-10 px-4">
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
                  ácido hialurônico biocompatível e reversível com hialuronidase. Realizado sem cortes, com
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
                      title: "Reversível com hialuronidase",
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

                {/* Seletor de Modo de Mensagem Discreta */}
                <div className="mb-4 rounded-xl border border-white/15 bg-[#2E2520]/60 p-3.5 max-w-xl">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C9B6A3] flex items-center gap-1.5">
                      <EyeOff className="w-3.5 h-3.5 text-[#C9B6A3]" />
                      Escolha como iniciar sua conversa no WhatsApp:
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#C9B6A3]/20 text-[#E7E1DA]">
                      {activeMessageConfig.badge}
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-2">
                    {(Object.keys(discreetMessageOptions) as DiscreetMessageMode[]).map((modeKey) => {
                      const opt = discreetMessageOptions[modeKey];
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
          <ProcedureSummary
            indicationsTitle="Candidatos Ideais"
            indications={[
                      "Homens adultos que desejam ganho estético de circunferência (espessura) peniana",
                      "Insatisfação com a retração acentuada do pênis no estado flácido (efeito 'shower')",
                      "Pacientes que buscam alternativa sem cortes, reversível e de rápida recuperação",
                      "Expectativas realistas alinhadas às evidências científicas e à própria anatomia",
                      "Disposição para seguir rigorosamente os cuidados pós-procedimento (10–14 dias)",
                    ]}
            limitsTitle="Limites e Contraindicações"
            limits={[
                      "Não aumenta o comprimento real em ereção (atua na circunferência e projeção flácida)",
                      "Não substitui o tratamento de disfunção erétil ou de curvatura peniana (Doença de Peyronie)",
                      "Contraindicado na presença de infecções genitais ou urinárias ativas",
                      "Contraindicado para pacientes com transtorno dismórfico corporal (BDD) ou expectativas irreais",
                      "Não é realizado em pacientes que já possuem PMMA ou silicone líquido injetado previamente na região",
                    ]}
            stepsTitle="Como é o atendimento"
            steps={stepByStep}
          />

          <InlineConsultCTA
            title="Quer saber se este caminho faz sentido para você?"
            note="Nota 5,0 · 35 avaliações na Doctoralia"
            href={whatsappSpUrl}
            onClick={() => handleWhatsAppConversion("inline_resumo")}
          />

          <SectionFold title={"Dr. Felipe de Bulhões Ojeda"} variant="peek">
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
                      Nota 5,0 · 35 avaliações na Doctoralia
                    </span>
                  </div>
                </div>

                
              </motion.div>
            </div>
          </section>
          </SectionFold>

          <div className="border-t border-[#2E2520]/12 mt-8 dark:border-border">

          <SectionFold title={"Como funciona o preenchimento peniano com ácido hialurônico?"}>
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
                <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#2E2520] dark:text-foreground font-serif mb-4">
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
                  className="bg-[#FCFAF7] dark:bg-card rounded-xl p-6 sm:p-8 border border-[#2E2520]/10 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="w-11 h-11 rounded-lg bg-[#4A3A30]/10 flex items-center justify-center mb-5">
                      <Layers className="w-5 h-5 text-[#4A3A30]" />
                    </div>
                    <h3 className="text-xl font-serif text-[#2E2520] dark:text-foreground mb-3">
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
                  <div className="mt-6 pt-4 border-t border-[#2E2520]/10 text-xs text-[#64748B]">
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
                  className="bg-[#FCFAF7] dark:bg-card rounded-xl p-6 sm:p-8 border border-[#2E2520]/10 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="w-11 h-11 rounded-lg bg-[#4A3A30]/10 flex items-center justify-center mb-5">
                      <Scale className="w-5 h-5 text-[#4A3A30]" />
                    </div>
                    <h3 className="text-xl font-serif text-[#2E2520] dark:text-foreground mb-3">
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
                  <div className="mt-6 pt-4 border-t border-[#2E2520]/10 text-xs text-[#64748B]">
                    Utilização exclusiva de géis de ácido hialurônico com reologia e viscoelasticidade
                    adequadas.
                  </div>
                </motion.div>
              </div>

              {/* Diagramas Anatômicos Didáticos (Corte Transversal + Pontos de Entrada e Vetores) */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={2.5}
                className="mb-12 rounded-2xl border border-[#2E2520]/12 bg-[#FCFAF7] dark:bg-card p-6 sm:p-8 shadow-sm"
              >
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-8 border-b border-[#2E2520]/10">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#4A3A30] block mb-1.5">
                      Atlas Anatômico Didático · Ilustração Esquematizada
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif text-[#2E2520] dark:text-foreground">
                      Onde exatamente o ácido hialurônico é depositado?
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-2 text-xs font-medium text-[#4A3A30] bg-[#4A3A30]/10 px-3 py-1.5 rounded-full self-start md:self-auto">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    Estruturas da ereção e sensibilidade 100% isoladas
                  </span>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-stretch">
                  {/* DIAGRAMA 1: Corte Transversal Anatômico */}
                  <div className="rounded-xl border border-[#2E2520]/10 bg-[#2E2520] text-white p-5 sm:p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9B6A3]">
                          Figura 1 · Corte Transversal da Haste
                        </span>
                        <span className="text-[11px] text-white/65">Visão em Camadas</span>
                      </div>
                      <h4 className="text-base sm:text-lg font-serif text-white mb-2">
                        Plano Interfascial Seguro (Entre Dartos e Buck)
                      </h4>
                      <p className="text-xs text-white/75 leading-relaxed mb-4">
                        O ácido hialurônico (em dourado) forma um manto uniforme na camada superficial,
                        enquanto a <strong>Fáscia de Buck</strong> atua como uma barreira protetora natural
                        sobre os nervos, vasos e corpos cavernosos.
                      </p>

                      {/* SVG Corte Transversal */}
                      <div className="relative mx-auto max-w-[360px] my-2">
                        <svg
                          viewBox="0 0 420 340"
                          className="w-full h-auto"
                          role="img"
                          aria-label="Diagrama anatômico em corte transversal mostrando o ácido hialurônico depositado entre a fáscia de Dartos e a fáscia de Buck, separado dos corpos cavernosos e da uretra."
                        >
                          <defs>
                            <radialGradient id="haGlow" cx="50%" cy="46%" r="48%">
                              <stop offset="65%" stopColor="#D9C58A" stopOpacity="0.28" />
                              <stop offset="92%" stopColor="#8D7B6B" stopOpacity="0.55" />
                              <stop offset="100%" stopColor="#D9C58A" stopOpacity="0.3" />
                            </radialGradient>
                            <linearGradient id="cavernosoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#3B2E28" />
                              <stop offset="100%" stopColor="#261D19" />
                            </linearGradient>
                          </defs>

                          {/* 1. Pele + Fáscia de Dartos (Camada Externa) */}
                          <ellipse
                            cx="210"
                            cy="170"
                            rx="132"
                            ry="118"
                            fill="#3E322B"
                            stroke="#C9B6A3"
                            strokeWidth="2.5"
                          />

                          {/* 2. Espaço Interfascial Preenchido com Ácido Hialurônico (Arco Dorso-Lateral 270°) */}
                          <path
                            d="M 118 242 A 118 105 0 1 1 302 242 L 284 226 A 95 84 0 1 0 136 226 Z"
                            fill="url(#haGlow)"
                            stroke="#D9C58A"
                            strokeWidth="2"
                          />

                          {/* Micropartículas / Gotículas ilustrativas do gel de AH no arco dorso-lateral */}
                          {[
                            { cx: 210, cy: 64 },
                            { cx: 172, cy: 70 },
                            { cx: 248, cy: 70 },
                            { cx: 138, cy: 88 },
                            { cx: 282, cy: 88 },
                            { cx: 112, cy: 118 },
                            { cx: 308, cy: 118 },
                            { cx: 100, cy: 156 },
                            { cx: 320, cy: 156 },
                            { cx: 105, cy: 196 },
                            { cx: 315, cy: 196 },
                            { cx: 122, cy: 226 },
                            { cx: 298, cy: 226 },
                          ].map((dot, idx) => (
                            <circle
                              key={idx}
                              cx={dot.cx}
                              cy={dot.cy}
                              r="4.5"
                              fill="#E5D4A1"
                              fillOpacity="0.85"
                            />
                          ))}

                          {/* 3. Fáscia de Buck (Barreira Fibrosa Protetora Interna) */}
                          <ellipse
                            cx="210"
                            cy="176"
                            rx="95"
                            ry="84"
                            fill="#221A17"
                            stroke="#AFC1D0"
                            strokeWidth="2.5"
                            strokeDasharray="5 3"
                          />

                          {/* 4. Feixe Vasculonervoso Dorsal (Protegido abaixo da Fáscia de Buck) */}
                          <circle cx="210" cy="103" r="5" fill="#7BA3C4" />
                          <circle cx="196" cy="105" r="3.5" fill="#D8A5A5" />
                          <circle cx="224" cy="105" r="3.5" fill="#D8A5A5" />
                          <circle cx="185" cy="108" r="2.8" fill="#E1B58A" />
                          <circle cx="235" cy="108" r="2.8" fill="#E1B58A" />

                          {/* 5. Dois Corpos Cavernosos (Ereção) */}
                          <ellipse
                            cx="168"
                            cy="162"
                            rx="41"
                            ry="44"
                            fill="url(#cavernosoGrad)"
                            stroke="#C9B6A3"
                            strokeWidth="2"
                          />
                          <ellipse
                            cx="252"
                            cy="162"
                            rx="41"
                            ry="44"
                            fill="url(#cavernosoGrad)"
                            stroke="#C9B6A3"
                            strokeWidth="2"
                          />
                          {/* Artérias profundas cavernosas */}
                          <circle cx="168" cy="162" r="4" fill="#D8A5A5" />
                          <circle cx="252" cy="162" r="4" fill="#D8A5A5" />

                          {/* Textos internos dos Corpos Cavernosos */}
                          <text
                            x="168"
                            y="157"
                            textAnchor="middle"
                            fill="#E7E1DA"
                            fontSize="9"
                            fontWeight="600"
                          >
                            Corpo
                          </text>
                          <text
                            x="168"
                            y="168"
                            textAnchor="middle"
                            fill="#E7E1DA"
                            fontSize="9"
                            fontWeight="600"
                          >
                            Cavernoso
                          </text>
                          <text
                            x="252"
                            y="157"
                            textAnchor="middle"
                            fill="#E7E1DA"
                            fontSize="9"
                            fontWeight="600"
                          >
                            Corpo
                          </text>
                          <text
                            x="252"
                            y="168"
                            textAnchor="middle"
                            fill="#E7E1DA"
                            fontSize="9"
                            fontWeight="600"
                          >
                            Cavernoso
                          </text>

                          {/* 6. Corpo Esponjoso e Uretra (Face Ventral - Livre de Produto) */}
                          <ellipse
                            cx="210"
                            cy="228"
                            rx="32"
                            ry="24"
                            fill="#332722"
                            stroke="#B7C0A1"
                            strokeWidth="1.8"
                          />
                          {/* Lúmen Uretral */}
                          <path
                            d="M 199 228 Q 210 223 221 228 Q 210 233 199 228 Z"
                            fill="#1A1412"
                            stroke="#B7C0A1"
                            strokeWidth="1.4"
                          />
                          <text
                            x="210"
                            y="244"
                            textAnchor="middle"
                            fill="#B7C0A1"
                            fontSize="8.5"
                            fontWeight="600"
                          >
                            Uretra
                          </text>

                          {/* Callouts / Rótulos Explicativos */}
                          {/* Rótulo Topo: Ácido Hialurônico */}
                          <line x1="210" y1="64" x2="210" y2="28" stroke="#D9C58A" strokeWidth="1.5" />
                          <circle cx="210" cy="64" r="3" fill="#D9C58A" />
                          <rect
                            x="110"
                            y="6"
                            width="200"
                            height="22"
                            rx="5"
                            fill="#D9C58A"
                          />
                          <text
                            x="210"
                            y="20"
                            textAnchor="middle"
                            fill="#221A17"
                            fontSize="10"
                            fontWeight="700"
                          >
                            Ácido Hialurônico (Plano Seguro)
                          </text>

                          {/* Rótulo Esquerda Superior: Pele + Fáscia de Dartos */}
                          <line x1="103" y1="100" x2="55" y2="54" stroke="#C9B6A3" strokeWidth="1.2" />
                          <text x="8" y="42" fill="#E7E1DA" fontSize="9.5" fontWeight="600">
                            Pele + Fáscia
                          </text>
                          <text x="8" y="53" fill="#C9B6A3" fontSize="9">
                            de Dartos
                          </text>

                          {/* Rótulo Direita Superior: Fáscia de Buck */}
                          <line x1="286" y1="126" x2="348" y2="54" stroke="#AFC1D0" strokeWidth="1.2" />
                          <text x="412" y="42" textAnchor="end" fill="#AFC1D0" fontSize="9.5" fontWeight="600">
                            Fáscia de Buck
                          </text>
                          <text x="412" y="53" textAnchor="end" fill="#E7E1DA" fontSize="8.5">
                            (Barreira Protetora)
                          </text>

                          {/* Rótulo Esquerda Inferior: Feixe Vasculonervoso */}
                          <line x1="196" y1="104" x2="62" y2="302" stroke="#D8A5A5" strokeWidth="1.2" strokeDasharray="3 2" />
                          <text x="8" y="314" fill="#D8A5A5" fontSize="9" fontWeight="600">
                            Feixe Vasculonervoso
                          </text>
                          <text x="8" y="325" fill="#E7E1DA" fontSize="8.5">
                            (Sensibilidade intacta)
                          </text>

                          {/* Rótulo Direita Inferior: Zona Ventral Livre */}
                          <line x1="238" y1="238" x2="342" y2="302" stroke="#B7C0A1" strokeWidth="1.2" />
                          <text x="412" y="314" textAnchor="end" fill="#B7C0A1" fontSize="9" fontWeight="600">
                            Face Ventral Livre
                          </text>
                          <text x="412" y="325" textAnchor="end" fill="#E7E1DA" fontSize="8.5">
                            (Uretra preservada)
                          </text>
                        </svg>
                      </div>
                    </div>

                    {/* Legenda rápida da Figura 1 */}
                    <div className="mt-4 pt-3.5 border-t border-white/10 grid grid-cols-2 gap-2.5 text-[11px]">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#D9C58A] shrink-0" />
                        <span className="text-white/85">Camada de Ácido Hialurônico</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-0.5 border-t-2 border-dashed border-[#AFC1D0] shrink-0" />
                        <span className="text-white/85">Fáscia de Buck (Proteção)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#3B2E28] border border-[#C9B6A3] shrink-0" />
                        <span className="text-white/85">Corpos Cavernosos (Ereção)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#332722] border border-[#B7C0A1] shrink-0" />
                        <span className="text-white/85">Uretra (Zona não injetada)</span>
                      </div>
                    </div>
                  </div>

                  {/* DIAGRAMA 2: Vista Longitudinal e Vetores de Aplicação com Microcânula */}
                  <div className="rounded-xl border border-[#2E2520]/10 bg-[#2E2520] text-white p-5 sm:p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9B6A3]">
                          Figura 2 · Vista Dorsal Esquematizada
                        </span>
                        <span className="text-[11px] text-white/65">Técnica com Microcânula</span>
                      </div>
                      <h4 className="text-base sm:text-lg font-serif text-white mb-2">
                        Pontos de Entrada (10h e 2h) e Distribuição Homogênea
                      </h4>
                      <p className="text-xs text-white/75 leading-relaxed mb-4">
                        Por apenas <strong>dois micropontos na base</strong> (posições 10h e 2h), a
                        microcânula de ponta romba deposita o gel em colunas retroinjetadas até o
                        sulco coronal, sem agulhas perfurantes na haste.
                      </p>

                      {/* SVG Vista Longitudinal / Vetores */}
                      <div className="relative mx-auto max-w-[360px] my-2">
                        <svg
                          viewBox="0 0 420 340"
                          className="w-full h-auto"
                          role="img"
                          aria-label="Diagrama esquemático longitudinal mostrando os dois pontos de entrada na base (10h e 2h) e as linhas vetoriais de distribuição uniforme do ácido hialurônico ao longo da haste até o sulco coronal."
                        >
                          <defs>
                            <linearGradient id="shaftFill" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#D9C58A" stopOpacity="0.35" />
                              <stop offset="22%" stopColor="#3B2E28" stopOpacity="0.95" />
                              <stop offset="78%" stopColor="#3B2E28" stopOpacity="0.95" />
                              <stop offset="100%" stopColor="#D9C58A" stopOpacity="0.35" />
                            </linearGradient>
                            <marker
                              id="arrowGold"
                              viewBox="0 0 10 10"
                              refX="6"
                              refY="5"
                              markerWidth="5"
                              markerHeight="5"
                              orient="auto-start-reverse"
                            >
                              <path d="M 0 1 L 10 5 L 0 9 z" fill="#D9C58A" />
                            </marker>
                          </defs>

                          {/* Base Pubiana (Referência Superior) */}
                          <path
                            d="M 85 38 Q 210 52 335 38"
                            fill="none"
                            stroke="#C9B6A3"
                            strokeWidth="2"
                            strokeDasharray="4 4"
                          />
                          <text
                            x="210"
                            y="26"
                            textAnchor="middle"
                            fill="#C9B6A3"
                            fontSize="9.5"
                            fontWeight="600"
                          >
                            Base Peniana (Bloqueio Anestésico Local)
                          </text>

                          {/* Contorno Externo Após Preenchimento (Ganho de Calibre Simétrico) */}
                          <path
                            d="M 134 45 L 134 228 Q 134 242 146 246 L 274 246 Q 286 242 286 228 L 286 45 Z"
                            fill="url(#shaftFill)"
                            stroke="#D9C58A"
                            strokeWidth="2.2"
                          />

                          {/* Contorno Interno Original da Haste (Tracejado Comparativo) */}
                          <line
                            x1="154"
                            y1="46"
                            x2="154"
                            y2="244"
                            stroke="#E7E1DA"
                            strokeWidth="1.3"
                            strokeDasharray="4 3"
                            strokeOpacity="0.6"
                          />
                          <line
                            x1="266"
                            y1="46"
                            x2="266"
                            y2="244"
                            stroke="#E7E1DA"
                            strokeWidth="1.3"
                            strokeDasharray="4 3"
                            strokeOpacity="0.6"
                          />

                          {/* Setas indicando ganho de circunferência lateral */}
                          <line
                            x1="152"
                            y1="145"
                            x2="136"
                            y2="145"
                            stroke="#D9C58A"
                            strokeWidth="1.6"
                            markerEnd="url(#arrowGold)"
                          />
                          <line
                            x1="268"
                            y1="145"
                            x2="284"
                            y2="145"
                            stroke="#D9C58A"
                            strokeWidth="1.6"
                            markerEnd="url(#arrowGold)"
                          />

                          {/* Vetores de Retroinjeção em Leque (Microcânula 22G) */}
                          {/* Vetores vindos do ponto 10h (Esquerda: 168, 58) */}
                          <line
                            x1="168"
                            y1="58"
                            x2="146"
                            y2="225"
                            stroke="#E5D4A1"
                            strokeWidth="1.8"
                            strokeDasharray="5 3"
                            markerEnd="url(#arrowGold)"
                          />
                          <line
                            x1="168"
                            y1="58"
                            x2="174"
                            y2="230"
                            stroke="#E5D4A1"
                            strokeWidth="1.8"
                            strokeDasharray="5 3"
                            markerEnd="url(#arrowGold)"
                          />
                          <line
                            x1="168"
                            y1="58"
                            x2="198"
                            y2="230"
                            stroke="#E5D4A1"
                            strokeWidth="1.6"
                            strokeDasharray="5 3"
                            markerEnd="url(#arrowGold)"
                          />

                          {/* Vetores vindos do ponto 2h (Direita: 252, 58) */}
                          <line
                            x1="252"
                            y1="58"
                            x2="274"
                            y2="225"
                            stroke="#E5D4A1"
                            strokeWidth="1.8"
                            strokeDasharray="5 3"
                            markerEnd="url(#arrowGold)"
                          />
                          <line
                            x1="252"
                            y1="58"
                            x2="246"
                            y2="230"
                            stroke="#E5D4A1"
                            strokeWidth="1.8"
                            strokeDasharray="5 3"
                            markerEnd="url(#arrowGold)"
                          />
                          <line
                            x1="252"
                            y1="58"
                            x2="222"
                            y2="230"
                            stroke="#E5D4A1"
                            strokeWidth="1.6"
                            strokeDasharray="5 3"
                            markerEnd="url(#arrowGold)"
                          />

                          {/* Pontos de Entrada da Microcânula (10h e 2h) */}
                          <circle
                            cx="168"
                            cy="58"
                            r="7"
                            fill="#D9C58A"
                            stroke="#221A17"
                            strokeWidth="2"
                          />
                          <circle
                            cx="252"
                            cy="58"
                            r="7"
                            fill="#D9C58A"
                            stroke="#221A17"
                            strokeWidth="2"
                          />

                          {/* Rótulos dos Pontos de Entrada */}
                          <line x1="161" y1="58" x2="108" y2="75" stroke="#D9C58A" strokeWidth="1.3" />
                          <text x="102" y="73" textAnchor="end" fill="#D9C58A" fontSize="9.5" fontWeight="700">
                            Ponto 10h
                          </text>
                          <text x="102" y="84" textAnchor="end" fill="#E7E1DA" fontSize="8.5">
                            Microcânula
                          </text>

                          <line x1="259" y1="58" x2="312" y2="75" stroke="#D9C58A" strokeWidth="1.3" />
                          <text x="318" y="73" fill="#D9C58A" fontSize="9.5" fontWeight="700">
                            Ponto 2h
                          </text>
                          <text x="318" y="84" fill="#E7E1DA" fontSize="8.5">
                            Microcânula
                          </text>

                          {/* Rótulo Ganho de Circunferência Lateral */}
                          <text x="122" y="142" textAnchor="end" fill="#D9C58A" fontSize="9" fontWeight="700">
                            + Calibre
                          </text>
                          <text x="122" y="153" textAnchor="end" fill="#E7E1DA" fontSize="8">
                            Uniforme
                          </text>

                          <text x="298" y="142" fill="#D9C58A" fontSize="9" fontWeight="700">
                            + Calibre
                          </text>
                          <text x="298" y="153" fill="#E7E1DA" fontSize="8">
                            Simétrico
                          </text>

                          {/* Sulco Coronal (Limite Distal da Aplicação) */}
                          <path
                            d="M 142 246 Q 210 256 278 246"
                            fill="none"
                            stroke="#AFC1D0"
                            strokeWidth="2.2"
                          />
                          <line x1="278" y1="246" x2="322" y2="236" stroke="#AFC1D0" strokeWidth="1.2" />
                          <text x="326" y="234" fill="#AFC1D0" fontSize="9" fontWeight="600">
                            Sulco Coronal
                          </text>
                          <text x="326" y="245" fill="#E7E1DA" fontSize="8">
                            (Limite distal)
                          </text>

                          {/* Glande Esquematizada (Preservada / Sem Aplicação Padrão) */}
                          <path
                            d="M 146 248 Q 144 308 210 318 Q 276 308 274 248 Q 210 258 146 248 Z"
                            fill="#2B211D"
                            stroke="#C9B6A3"
                            strokeWidth="1.6"
                            strokeOpacity="0.7"
                          />
                          <text
                            x="210"
                            y="288"
                            textAnchor="middle"
                            fill="#C9B6A3"
                            fontSize="9.5"
                            fontWeight="600"
                          >
                            Glande Preservada
                          </text>
                        </svg>
                      </div>
                    </div>

                    {/* Legenda rápida da Figura 2 */}
                    <div className="mt-4 pt-3.5 border-t border-white/10 grid grid-cols-2 gap-2.5 text-[11px]">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#D9C58A] shrink-0" />
                        <span className="text-white/85">2 Orifícios de Entrada (10h e 2h)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-0.5 border-t-2 border-dashed border-[#E5D4A1] shrink-0" />
                        <span className="text-white/85">Vetores de Retroinjeção Linear</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-0.5 border-t-2 border-[#AFC1D0] shrink-0" />
                        <span className="text-white/85">Transição Suave no Sulco Coronal</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#2B211D] border border-[#C9B6A3] shrink-0" />
                        <span className="text-white/85">Sem Cortes ou Pontos Cirúrgicos</span>
                      </div>
                    </div>
                  </div>
                </div>
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
                {[
                  {
                    metric: "+1,5 a 2,5 cm",
                    label: "Ganho de circunferência",
                    detail: "Médias em estudos publicados (Boiko 2023; Ahn 2021); varia conforme protocolo e elasticidade tecidual",
                  },
                  {
                    metric: "12 a 18 meses",
                    label: "Durabilidade média",
                    detail: "Volume mantido em acompanhamentos de 48 semanas a 18 meses (Park 2026; Kwak 2010); reabsorção gradual, com opção de manutenção",
                  },
                  {
                    metric: "Sem eventos graves",
                    label: "Segurança nos estudos",
                    detail: "Sem eventos adversos graves nos estudos com ácido hialurônico (Ahn 2021; Park 2026)",
                  },
                  {
                    metric: "Alto Índice",
                    label: "Satisfação clínica",
                    detail: "Melhora documentada na autoimagem genital (Male Genital Self-Image Scale)",
                  },
                ].map((stat, i) => (
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
          </SectionFold>

          <SectionFold title={"Por que utilizamos apenas Ácido Hialurônico (e nunca PMMA)?"}>
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
                <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#2E2520] dark:text-foreground font-serif mb-4">
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
                    <p className="text-sm font-semibold text-[#2E2520]">
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
          </SectionFold>

          <SectionFold title={"Como é realizada a jornada do paciente, passo a passo"}>
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
                <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#2E2520] dark:text-foreground font-serif mb-4">
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
          </SectionFold>

          <SectionFold title={"Para quem o procedimento é indicado — e o que ele não faz"}>
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
                <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#2E2520] dark:text-foreground font-serif mb-4">
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
                  className="bg-[#FCFAF7] dark:bg-card rounded-xl p-6 sm:p-7 border border-[#2E2520]/10"
                >
                  <div className="flex items-center gap-2.5 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                    <h3 className="text-xl font-serif text-[#2E2520] dark:text-foreground">
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
                  className="bg-[#FCFAF7] dark:bg-card rounded-xl p-6 sm:p-7 border border-[#2E2520]/10"
                >
                  <div className="flex items-center gap-2.5 mb-4">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                    <h3 className="text-xl font-serif text-[#2E2520] dark:text-foreground">
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
                className="bg-[#FCFAF7] dark:bg-card rounded-xl p-6 sm:p-8 border border-[#2E2520]/10"
              >
                <h3 className="text-xl font-serif text-[#2E2520] dark:text-foreground mb-5">
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
                    Esclarecimento Urológico
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-[#2E2520] dark:text-foreground">
                    Mitos vs. Realidade Científica
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {mythsAndFacts.map((item, idx) => (
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
          </SectionFold>

          <SectionFold title={"Descubra como funciona o planejamento para o seu perfil"}>
          {/* 4.5. AUTOAVALIAÇÃO INTERATIVA DE PERFIL + SIGILO 4 CAMADAS + PACIENTE DE FORA */}
          <section className="py-16 lg:py-24 bg-[#E7E1DA]/60 dark:bg-card/50 border-y border-[#2E2520]/10">
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
                      Descubra como funciona o planejamento para o seu perfil
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
                      1. Principal Objetivo
                    </p>
                    <p className="text-sm font-semibold text-[#2E2520] mb-3">
                      O que você mais deseja melhorar?
                    </p>
                    <div className="space-y-2">
                      {[
                        { id: "espessura", label: "Ganho de espessura (flácido e ereto)" },
                        { id: "retracao", label: "Reduzir retração no estado flácido" },
                        { id: "simetria", label: "Melhorar proporção e contorno" },
                      ].map((opt) => (
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
                      2. Critério de Segurança
                    </p>
                    <p className="text-sm font-semibold text-[#2E2520] mb-3">
                      O que é mais importante para você?
                    </p>
                    <div className="space-y-2">
                      {[
                        { id: "reversivel", label: "Material reversível com hialuronidase e sem cortes" },
                        { id: "naturalidade", label: "Toque e aparência totalmente naturais" },
                        { id: "recuperacao", label: "Retorno rápido sem afastamento" },
                      ].map((opt) => (
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
                        { id: "campinas", label: "Campinas (Cambuí)" },
                        { id: "outra_cidade", label: "Outra cidade / Estado (Fluxo Executivo)" },
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
                      Síntese para o seu perfil selecionado
                    </span>
                    <p className="text-base sm:text-lg font-serif text-white">
                      Indicação compatível para avaliação de{" "}
                      <span className="text-[#D9C58A]">{quizGoalLabel[quizGoal]}</span>
                    </p>
                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                      {quizCity === "outra_cidade"
                        ? "Como você reside fora de SP/Campinas, podemos realizar uma Teleconsulta urológica inicial para planejamento técnico e agendar o procedimento presencial em visita única de 45 minutos."
                        : `Na consulta presencial em ${quizCityLabel[quizCity]}, o Dr. Felipe avalia a elasticidade tecidual e define a quantidade exata de ácido hialurônico para um resultado natural, simétrico e reversível com hialuronidase.`}
                    </p>
                  </div>

                  <a
                    href={quizWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleWhatsAppConversion(`quiz_${quizGoal}_${quizCity}`)}
                    className="shrink-0 w-full lg:w-auto"
                  >
                    <Button className="w-full lg:w-auto bg-[#C9B6A3] hover:bg-[#E7E1DA] text-[#2E2520] font-semibold h-12 px-6 text-sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Solicitar Avaliação para este Perfil
                    </Button>
                  </a>
                </div>
              </motion.div>

              {/* Grid Duplo: Garantia de Sigilo em 4 Camadas + Fluxo Paciente de Fora */}
              <div className="grid lg:grid-cols-2 gap-8 items-stretch">
                {/* Card 1: Protocolo de Privacidade em 4 Camadas */}
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
                          Privacidade Médica Estruturada
                        </span>
                        <h3 className="text-xl font-serif text-[#2E2520] dark:text-foreground">
                          Garantia de Sigilo em 4 Camadas
                        </h3>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-[#334155] leading-relaxed mb-5">
                      Sabemos que a discrição é tão importante quanto a técnica urológica. Por isso,
                      estruturamos todo o fluxo para que você se sinta totalmente confortável:
                    </p>
                    <div className="space-y-3.5">
                      {[
                        {
                          step: "1",
                          title: "Agendamento Codificado",
                          desc: "Ao usar o modo 'Mensagem Discreta', nossa equipe identifica seu atendimento apenas como consulta urológica particular.",
                        },
                        {
                          step: "2",
                          title: "Recepção sem Exposição",
                          desc: "Na chegada à clínica (Paulista, Pinheiros ou Campinas), nenhuma pergunta sobre o motivo da consulta é feita na recepção.",
                        },
                        {
                          step: "3",
                          title: "Consultório Acusticamente Isolado",
                          desc: "Toda a conversa, avaliação física e procedimento acontecem exclusivamente em sala médica privada com o Dr. Felipe.",
                        },
                        {
                          step: "4",
                          title: "Prontuário Criptografado (CFM & LGPD)",
                          desc: "Seus dados clínicos são protegidos por sigilo médico legal absoluto, sem fotos de divulgação.",
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
                      Recebemos regularmente pacientes do interior de São Paulo e de outros estados.
                      Como o procedimento não exige internação, otimizamos sua vinda:
                    </p>
                    <div className="space-y-4">
                      <div className="rounded-xl bg-white dark:bg-card p-4 border border-[#2E2520]/8 flex items-start gap-3">
                        <Video className="w-5 h-5 text-[#4A3A30] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-[#2E2520]">
                            Etapa 1 · Teleconsulta Urológica Prévia (Opcional)
                          </p>
                          <p className="text-xs text-[#64748B] leading-relaxed mt-0.5">
                            Alinhamento inicial por videoconferência segura com o Dr. Felipe para
                            esclarecer dúvidas técnicas, avaliar histórico e planejar a data ideal.
                          </p>
                        </div>
                      </div>
                      <div className="rounded-xl bg-white dark:bg-card p-4 border border-[#2E2520]/8 flex items-start gap-3">
                        <Clock className="w-5 h-5 text-[#4A3A30] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-[#2E2520]">
                            Etapa 2 · Visita Presencial Única (Retorno no Mesmo Dia)
                          </p>
                          <p className="text-xs text-[#64748B] leading-relaxed mt-0.5">
                            Exame físico confirmatório e realização do procedimento em consultório
                            (30–45 min), com liberação imediata para viagem de retorno de carro ou
                            avião.
                          </p>
                        </div>
                      </div>
                      <div className="rounded-xl bg-white dark:bg-card p-4 border border-[#2E2520]/8 flex items-start gap-3">
                        <Stethoscope className="w-5 h-5 text-[#4A3A30] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-[#2E2520]">
                            Etapa 3 · Acompanhamento Pós-Procedimento Direto
                          </p>
                          <p className="text-xs text-[#64748B] leading-relaxed mt-0.5">
                            Canal direto de suporte com a equipe médica e revisão de 14 dias
                            presencial ou por telemedicina.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
          </SectionFold>

          </div>

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
                    • <strong>Boiko, et al.</strong>{" "}
                    <em>The Efficacy of Injection Penile Girth Enhancement as an Option for Small Penis Syndrome Management.</em>{" "}
                    Aesthetic Surgery Journal, 2023.{" "}
                    <a href="https://doi.org/10.1093/asj/sjad152" target="_blank" rel="noopener noreferrer" className="underline">DOI</a>
                  </li>
                  <li>
                    • <strong>Ahn, et al.</strong>{" "}
                    <em>Efficacy and Safety of Penile Girth Enhancement Using Hyaluronic Acid Filler and the Clinical Impact on Ejaculation.</em>{" "}
                    World Journal of Men&apos;s Health, 2021.{" "}
                    <a href="https://doi.org/10.5534/wjmh.210007" target="_blank" rel="noopener noreferrer" className="underline">DOI</a>
                  </li>
                  <li>
                    • <strong>Park, et al.</strong>{" "}
                    <em>Real Practice Confirmatory Study of Adjustable Initial Injection Volume and Necessity of Retouch and Reinjection in Penile Girth Enhancement with Hyaluronic Acid Gel.</em>{" "}
                    World Journal of Men&apos;s Health, 2026.{" "}
                    <a href="https://doi.org/10.5534/wjmh.250332" target="_blank" rel="noopener noreferrer" className="underline">DOI</a>
                  </li>
                  <li>
                    • <strong>Kwak, et al.</strong>{" "}
                    <em>The effects of penile girth enhancement using injectable hyaluronic acid gel, a filler.</em>{" "}
                    Journal of Sexual Medicine, 2010.{" "}
                    <a href="https://doi.org/10.1111/j.1743-6109.2010.01748.x" target="_blank" rel="noopener noreferrer" className="underline">DOI</a>
                  </li>
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

            <p className="text-white/75 text-sm sm:text-base max-w-2xl mx-auto mb-7 leading-relaxed">
              Escolha a unidade de sua preferência em <strong>São Paulo</strong> ou{" "}
              <strong>Campinas</strong>, ou inicie o atendimento diretamente pelo WhatsApp para
              verificar horários disponíveis.
            </p>

            {/* Seletor de Modo de Mensagem Discreta no Rodapé de Conversão */}
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
                {(Object.keys(discreetMessageOptions) as DiscreetMessageMode[]).map((modeKey) => {
                  const opt = discreetMessageOptions[modeKey];
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
          message={activeMessageConfig.messageSp}
          source={`campaign_${CAMPAIGN_SLUG}`}
        />
      </div>
    </>
  );
}
