import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { trackEvent, fireFormConversionEvents } from "@/lib/analytics";
import { getAttribution } from "@/lib/tracking";

const KOMMO_WHATSAPP_NUMBER = "5511981124455";

export interface PlaybookTopicOption {
  id: "performance-hormonal" | "estetica-intima" | "prostata-cirurgia" | "fertilidade-vasectomia";
  shortLabel: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  pdfUrl: string;
  highlights: string[];
}

export const PLAYBOOK_TOPICS: PlaybookTopicOption[] = [
  {
    id: "performance-hormonal",
    shortLabel: "Performance Hormonal & Check-up 35+",
    badge: "Andrologia & Longevidade",
    title: "Guia de Performance Hormonal, Testosterona & Check-up de Precisão",
    subtitle: "Vitalidade, Investigação Andrológica, Ereção e Saúde Metabólica",
    description:
      "Entenda os 5 eixos clínicos do check-up masculino de precisão, quando repor testosterona com segurança máxima e como tratar a causa raiz da queda de energia e libido.",
    pdfUrl: "/manus-storage/Guia_Performance_Hormonal_Checkup_Dr_Felipe_Bulhoes.pdf",
    highlights: [
      "Os 5 eixos clínicos que todo homem 35+ deve monitorar além do exame básico;",
      "Como diferenciar queda real de testosterona (DAEM) de estresse e privação de sono;",
      "Por que implantes não regulamentados comprometem a saúde cardiovascular e fértil;",
      "Autoavaliação andrológica prática (6 sinais de alerta para levar à consulta).",
    ],
  },
  {
    id: "estetica-intima",
    shortLabel: "Estética Íntima: Preenchimento & Botox",
    badge: "Estética Íntima & Confidencialidade",
    title: "Guia Médico de Estética Íntima: Preenchimento Peniano & Botox Íntimo",
    subtitle: "Ganho de Calibre com Ácido Hialurônico (Urofill™) e Conforto com Toxina Botulínica",
    description:
      "Informação médica transparente sobre espessamento peniano em plano fascial seguro, reversibilidade do Ácido Hialurônico e indicações do Botox Peniano e Escrotal.",
    pdfUrl: "/manus-storage/Guia_Estetica_Intima_Masculina_Dr_Felipe_Bulhoes.pdf",
    highlights: [
      "Anatomia de segurança: aplicação entre as fáscias sem atingir os corpos cavernosos;",
      "Comparativo técnico: Ácido Hialurônico (100% reversível) vs. riscos do PMMA;",
      "Botox Peniano e Escrotal (Scrotox): retração no frio/esporte e conforto térmico;",
      "Como funciona a anestesia local sem dor em consultório e recuperação em 10–14 dias.",
    ],
  },
  {
    id: "prostata-cirurgia",
    shortLabel: "Próstata, Urina & Cirurgia a Laser/Robótica",
    badge: "Próstata & Tecnologia Cirúrgica",
    title: "Guia de Saúde da Próstata, Urina & Cirurgia Minimamente Invasiva",
    subtitle: "Rastreio de Precisão (PI-RADS), Laser HoLEP, Rezum e Cirurgia Robótica",
    description:
      "Saiba diferenciar a Hiperplasia Prostática (HPB) do Câncer de Próstata e conheça as tecnologias sem corte abdominal que preservam a continência e a potência sexual.",
    pdfUrl: "/manus-storage/Guia_Saude_Prostata_Cirurgia_Dr_Felipe_Bulhoes.pdf",
    highlights: [
      "Diferença anatômica entre Próstata Aumentada (HPB) e Câncer de Próstata;",
      "Ressonância Multiparamétrica (PI-RADS) e Biópsia Transperineal por Fusão;",
      "Tecnologias minimamente invasivas: Vapor d'Água (Rezum), Laser HoLEP e Robótica;",
      "Autoavaliação de sintomas urinários (jato fraco, urgência e acordar à noite).",
    ],
  },
  {
    id: "fertilidade-vasectomia",
    shortLabel: "Fertilidade, Varicocele & Vasectomia",
    badge: "Microcirurgia & Planejamento",
    title: "Guia de Fertilidade, Varicocele com Microscópio & Vasectomia Sem Bisturi",
    subtitle: "Microcirurgia Reprodutiva de Alta Precisão e Contracepção Definitiva Segura",
    description:
      "O guia completo para as duas fases do planejamento familiar: restaurar o potencial fértil com microscópio óptico ou realizar a Vasectomia Sem Bisturi com rápida recuperação.",
    pdfUrl: "/manus-storage/Guia_Fertilidade_Microcirurgia_Vasectomia_Dr_Felipe_Bulhoes.pdf",
    highlights: [
      "Varicocelectomia Microcirúrgica Subinguinal com Microscópio Óptico (padrão-ouro EAU/AUA);",
      "Investigação da Fragmentação do DNA Espermático e preservação fértil na reposição hormonal;",
      "Vasectomia Sem Bisturi (No-Scalpel): procedimento em 30 min e recuperação em 48–72h;",
      "Regras atuais da Lei nº 14.443/2022 e protocolo seguro de espermograma pós-procedimento.",
    ],
  },
];

function formatWhatsAppPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function getLeadOriginIdentification(topic: PlaybookTopicOption): {
  sourceSlug: string;
  pageLabel: string;
  channelSummary: string;
  fullOriginDetails: string;
} {
  if (typeof window === "undefined") {
    return {
      sourceSlug: `guia-${topic.id}`,
      pageLabel: "Página Principal (Home — Central de Guias Clínicos)",
      channelSummary: "Tráfego Direto / Orgânico",
      fullOriginDetails: `Guia PDF: ${topic.shortLabel} | Home | Tráfego Direto`,
    };
  }

  const pathname = window.location.pathname || "/";
  const pageLabel =
    pathname === "/"
      ? "Página Principal (Home — Seção Guias Clínicos)"
      : `Página ${pathname} (Seção Guias Clínicos)`;

  const attr = getAttribution();
  const urlParams = new URLSearchParams(window.location.search);

  const utmSource = attr?.utm_source || urlParams.get("utm_source");
  const utmMedium = attr?.utm_medium || urlParams.get("utm_medium");
  const utmCampaign = attr?.utm_campaign || urlParams.get("utm_campaign");
  const hasGclid = Boolean(
    attr?.gclid ||
      attr?.gbraid ||
      attr?.wbraid ||
      urlParams.get("gclid") ||
      urlParams.get("gbraid") ||
      urlParams.get("wbraid")
  );

  const parts: string[] = [];
  if (hasGclid) parts.push("Google Ads (GCLID)");
  if (utmSource) parts.push(`Fonte: ${utmSource}`);
  if (utmMedium) parts.push(`Mídia: ${utmMedium}`);
  if (utmCampaign) parts.push(`Campanha: ${utmCampaign}`);

  if (parts.length === 0 && typeof document !== "undefined" && document.referrer) {
    try {
      const refHost = new URL(document.referrer).hostname.replace(/^www\./, "");
      if (refHost && !refHost.includes("felipebulhoes.com") && !refHost.includes("localhost")) {
        parts.push(`Referência: ${refHost}`);
      }
    } catch {
      // ignore invalid referrer URL
    }
  }

  const channelSummary = parts.length > 0 ? parts.join(" · ") : "Tráfego Orgânico / Direto";
  const sourceSlug = utmSource
    ? `guia-${topic.id}-${utmSource}`.slice(0, 64)
    : hasGclid
      ? `guia-${topic.id}-gads`.slice(0, 64)
      : `guia-${topic.id}`.slice(0, 64);

  const fullOriginDetails = `Tema: ${topic.shortLabel} | ${pageLabel} | Canal: ${channelSummary}`;

  return {
    sourceSlug,
    pageLabel,
    channelSummary,
    fullOriginDetails,
  };
}

export default function PlaybookSection() {
  const [selectedTopicId, setSelectedTopicId] =
    useState<PlaybookTopicOption["id"]>("performance-hormonal");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(PLAYBOOK_TOPICS[0].pdfUrl);
  const [whatsappRedirectUrl, setWhatsappRedirectUrl] = useState<string>("");

  const activeTopic =
    PLAYBOOK_TOPICS.find((t) => t.id === selectedTopicId) || PLAYBOOK_TOPICS[0];

  const mutation = trpc.playbook.requestDownload.useMutation({
    onSuccess: (data) => {
      if (data.downloadUrl) {
        setDownloadUrl(data.downloadUrl);
      }
    },
  });

  const handleSelectTopic = (topicId: PlaybookTopicOption["id"]) => {
    setSelectedTopicId(topicId);
    const found = PLAYBOOK_TOPICS.find((t) => t.id === topicId);
    if (found) {
      setDownloadUrl(found.pdfUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const phoneDigits = phone.replace(/\D/g, "");

    if (!cleanName || !cleanEmail) return;
    if (phoneDigits.length < 10) {
      setPhoneError("Informe seu WhatsApp com DDD (ex: 11 99999-9999).");
      return;
    }
    setPhoneError("");

    const origin = getLeadOriginIdentification(activeTopic);
    setDownloadUrl(activeTopic.pdfUrl);

    // Monta a mensagem estruturada para avaliação da SDR / Secretária via Kommo (+55 11 98112-4455)
    const kommoMessage = [
      `Olá! Acabei de solicitar no site o PDF: *${activeTopic.title}* — Dr. Felipe de Bulhões.`,
      "",
      "📋 *Identificação do Lead (Kommo / SDR / Secretária):*",
      `• *Tema de Interesse Escolhido:* ${activeTopic.shortLabel}`,
      `• *Origem do Lead:* Central de Guias Clínicos PDF`,
      `• *Página:* ${origin.pageLabel}`,
      `• *Canal de Tráfego:* ${origin.channelSummary}`,
      `• *Nome:* ${cleanName}`,
      `• *WhatsApp do Paciente:* ${phone}`,
      `• *E-mail:* ${cleanEmail}`,
    ].join("\n");

    const waUrl = `https://wa.me/${KOMMO_WHATSAPP_NUMBER}?text=${encodeURIComponent(kommoMessage)}`;
    setWhatsappRedirectUrl(waUrl);
    setSubmitted(true);

    // Abre o WhatsApp (+5511981124455) conectado ao Kommo para registro imediato do lead com a SDR/Secretária
    window.open(waUrl, "_blank", "noopener,noreferrer");

    // Dispara eventos analíticos e de conversão
    trackEvent("playbook_download", {
      material: activeTopic.id,
      source: origin.sourceSlug,
      channel: origin.channelSummary,
    });
    fireFormConversionEvents().catch(() => {});

    // Salva o lead no banco de dados e notifica a equipe com o tema escolhido
    mutation.mutate({
      name: cleanName,
      email: cleanEmail,
      phone,
      topicId: activeTopic.id,
      topicTitle: activeTopic.shortLabel,
      source: origin.sourceSlug,
      originDetails: origin.fullOriginDetails,
    });
  };

  return (
    <section
      id="playbook"
      className="mobile-form-section brand-playbook-section brand-dark-surface relative py-20 overflow-hidden"
    >
      {/* Background gradient — Official Warm Quiet Luxury (#2E2520 / #4A3A30) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4A3A30] via-[#2E2520] to-[#241B17]" />
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-14">
          {/* Left side — Dynamic Topic Preview & Interactive Cards */}
          <div className="flex-1 text-left w-full">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-[#C9B6A3]/35 mb-5">
              <svg className="w-4 h-4 text-[#C9B6A3]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs sm:text-sm text-[#F7F5F2] font-medium tracking-wide">
                Guias Médicos Exclusivos em PDF · Escolha o Seu Tema
              </span>
            </div>

            {/* Topic Selector Pills on Left */}
            <p className="text-xs uppercase tracking-[0.16em] text-[#C9B6A3] font-semibold mb-3">
              1. Clique no tema de seu maior interesse para visualizar o conteúdo do PDF:
            </p>
            <div className="grid sm:grid-cols-2 gap-2.5 mb-7">
              {PLAYBOOK_TOPICS.map((topic, idx) => {
                const isSelected = topic.id === selectedTopicId;
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => handleSelectTopic(topic.id)}
                    className={`text-left p-3.5 rounded-xl border transition-all duration-200 ${
                      isSelected
                        ? "bg-[#C9B6A3]/20 border-[#C9B6A3] shadow-lg"
                        : "bg-white/[0.04] border-white/15 hover:bg-white/[0.08] hover:border-[#C9B6A3]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[11px] uppercase tracking-wider text-[#C9B6A3] font-semibold">
                        Guia 0{idx + 1} · {topic.badge}
                      </span>
                      <span
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? "border-[#C9B6A3] bg-[#C9B6A3]" : "border-white/40"
                        }`}
                      >
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#2E2520]" />}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-[#F7F5F2] leading-snug">
                      {topic.shortLabel}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Active PDF Preview Card */}
            <div className="rounded-2xl bg-white/[0.05] border border-[#C9B6A3]/30 p-6 sm:p-7 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider bg-[#C9B6A3]/20 text-[#C9B6A3] border border-[#C9B6A3]/35">
                  PDF Selecionado
                </span>
                <span className="text-xs text-[#E7E1DA]/75">4 páginas · Leitura prática e sigilosa</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-[#F7F5F2] mb-2 leading-tight font-serif">
                {activeTopic.title}
              </h2>
              <p className="text-sm sm:text-base text-[#C9B6A3] font-medium mb-3">
                {activeTopic.subtitle}
              </p>
              <p className="text-[#E7E1DA]/85 text-sm sm:text-base mb-5 leading-relaxed">
                {activeTopic.description}
              </p>

              <p className="text-xs uppercase tracking-[0.14em] text-[#C9B6A3] font-semibold mb-3">
                O que você vai receber neste PDF:
              </p>
              <ul className="space-y-2.5 text-[#F7F5F2]/90 text-sm">
                {activeTopic.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <svg
                      className="w-4 h-4 text-[#C9B6A3] mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right side — Lead Capture Form with Topic Selector */}
          <div className="w-full max-w-md lg:sticky lg:top-28 mx-auto lg:mx-0">
            {!submitted ? (
              <div className="mobile-compact-form bg-[#F7F5F2] rounded-2xl shadow-2xl p-6 sm:p-8 border border-[#C9B6A3]/40">
                <div className="text-center mb-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#2E2520] to-[#4A3A30] rounded-xl flex items-center justify-center mx-auto mb-3 border border-[#C9B6A3]/40">
                    <svg
                      className="w-7 h-7 text-[#C9B6A3]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#2E2520]">Receba o Guia em PDF</h3>
                  <p className="text-xs sm:text-sm text-[#4A3A30] mt-1">
                    Escolha o tema abaixo e informe seus dados para liberar o download imediato
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mobile-compact-form space-y-3.5">
                  <div>
                    <label
                      htmlFor="playbook-topic"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#4A3A30] mb-1"
                    >
                      Tema do Guia PDF de maior interesse *
                    </label>
                    <select
                      id="playbook-topic"
                      value={selectedTopicId}
                      onChange={(e) =>
                        handleSelectTopic(e.target.value as PlaybookTopicOption["id"])
                      }
                      className="w-full px-3.5 py-2.5 bg-white border border-[#C9B6A3] rounded-lg focus:ring-2 focus:ring-[#4A3A30]/20 focus:border-[#4A3A30] transition-colors text-[#2E2520] font-medium text-sm"
                    >
                      {PLAYBOOK_TOPICS.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.shortLabel}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="playbook-name"
                      className="block text-sm font-medium text-[#2E2520] mb-1"
                    >
                      Seu nome *
                    </label>
                    <input
                      id="playbook-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Digite seu nome completo"
                      required
                      className="w-full px-4 py-2.5 bg-white border border-[#C9B6A3] rounded-lg focus:ring-2 focus:ring-[#4A3A30]/20 focus:border-[#4A3A30] transition-colors text-[#2E2520] placeholder:text-[#8D7B6B]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="playbook-phone"
                      className="block text-sm font-medium text-[#2E2520] mb-1"
                    >
                      Seu WhatsApp (com DDD) *
                    </label>
                    <input
                      id="playbook-phone"
                      type="tel"
                      inputMode="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(formatWhatsAppPhone(e.target.value));
                        if (phoneError) setPhoneError("");
                      }}
                      placeholder="(11) 99999-9999"
                      required
                      className="w-full px-4 py-2.5 bg-white border border-[#C9B6A3] rounded-lg focus:ring-2 focus:ring-[#4A3A30]/20 focus:border-[#4A3A30] transition-colors text-[#2E2520] placeholder:text-[#8D7B6B]"
                    />
                    {phoneError && <p className="text-xs text-red-600 mt-1">{phoneError}</p>}
                  </div>

                  <div>
                    <label
                      htmlFor="playbook-email"
                      className="block text-sm font-medium text-[#2E2520] mb-1"
                    >
                      Seu melhor e-mail *
                    </label>
                    <input
                      id="playbook-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      required
                      className="w-full px-4 py-2.5 bg-white border border-[#C9B6A3] rounded-lg focus:ring-2 focus:ring-[#4A3A30]/20 focus:border-[#4A3A30] transition-colors text-[#2E2520] placeholder:text-[#8D7B6B]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full py-3.5 px-6 bg-[#C9B6A3] hover:bg-[#b8a38e] text-[#2E2520] font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {mutation.isPending ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Liberando PDF...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        Baixar PDF: {activeTopic.shortLabel.split(":")[0]}
                      </span>
                    )}
                  </button>
                </form>

                {mutation.isError && (
                  <p className="text-sm text-red-600 mt-3 text-center">
                    Erro ao processar. Tente novamente.
                  </p>
                )}

                <p className="text-xs text-[#8D7B6B] text-center mt-4">
                  Sigilo médico absoluto · Atendimento personalizado via WhatsApp oficial.
                </p>
              </div>
            ) : (
              <div className="mobile-compact-form bg-[#F7F5F2] rounded-2xl shadow-2xl p-8 text-center border border-[#C9B6A3]/40">
                <div className="w-16 h-16 bg-[#2E2520] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#C9B6A3]">
                  <svg
                    className="w-8 h-8 text-[#C9B6A3]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="inline-block px-3 py-1 rounded-full bg-[#E7E1DA] text-[#4A3A30] text-xs font-semibold mb-2">
                  {activeTopic.shortLabel}
                </span>
                <h3 className="text-xl font-bold text-[#2E2520] mb-2">
                  Pronto! Seu Guia PDF foi Liberado
                </h3>
                <p className="text-sm text-[#4A3A30] mb-6">
                  Sua solicitação foi identificada para nossa equipe no WhatsApp e você já pode
                  abrir o PDF completo do tema escolhido abaixo:
                </p>

                <div className="flex flex-col gap-3">
                  {downloadUrl && (
                    <a
                      href={downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r from-[#2E2520] to-[#4A3A30] text-[#F7F5F2] font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <svg
                        className="w-5 h-5 text-[#C9B6A3]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Abrir PDF: {activeTopic.shortLabel}
                    </a>
                  )}

                  {whatsappRedirectUrl && (
                    <a
                      href={whatsappRedirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-[#C9B6A3] hover:bg-[#b8a38e] text-[#2E2520] font-bold rounded-lg transition-all duration-200 shadow-md"
                    >
                      Falar com a Equipe no WhatsApp
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
