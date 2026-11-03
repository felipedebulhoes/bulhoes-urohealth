import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { trackEvent, fireFormConversionEvents } from "@/lib/analytics";
import { getAttribution } from "@/lib/tracking";

const KOMMO_WHATSAPP_NUMBER = "5511981124455";
const DEFAULT_PLAYBOOK_URL =
  "/manus-storage/Playbook-Saude-Integral-DrFelipeBulhoes_57b5fc71.pdf";

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

function getLeadOriginIdentification(): {
  sourceSlug: string;
  pageLabel: string;
  channelSummary: string;
  fullOriginDetails: string;
} {
  if (typeof window === "undefined") {
    return {
      sourceSlug: "homepage-guia-saude-integral",
      pageLabel: "Página Principal (Home — Guia de Saúde Integral)",
      channelSummary: "Tráfego Direto / Orgânico",
      fullOriginDetails: "Guia de Saúde Integral | Home | Tráfego Direto",
    };
  }

  const pathname = window.location.pathname || "/";
  const pageLabel =
    pathname === "/"
      ? "Página Principal (Home — Seção Guia de Saúde Integral)"
      : `Página ${pathname} (Seção Guia de Saúde Integral)`;

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
    ? `playbook-${utmSource}`.slice(0, 64)
    : hasGclid
      ? "playbook-google-ads"
      : "homepage-guia-saude-integral";

  const fullOriginDetails = `${pageLabel} | Canal: ${channelSummary}`;

  return {
    sourceSlug,
    pageLabel,
    channelSummary,
    fullOriginDetails,
  };
}

export default function PlaybookSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(DEFAULT_PLAYBOOK_URL);
  const [whatsappRedirectUrl, setWhatsappRedirectUrl] = useState<string>("");

  const mutation = trpc.playbook.requestDownload.useMutation({
    onSuccess: (data) => {
      if (data.downloadUrl) {
        setDownloadUrl(data.downloadUrl);
      }
    },
  });

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

    const origin = getLeadOriginIdentification();

    // Monta a mensagem estruturada para avaliação da SDR / Secretária via Kommo (+55 11 98112-4455)
    const kommoMessage = [
      "Olá! Acabei de preencher meus dados no site para receber o *Guia de Saúde Integral — Dr. Felipe de Bulhões*.",
      "",
      "📋 *Identificação do Lead (Kommo / SDR):*",
      `• *Origem do Lead:* Guia de Saúde Integral (Material Educativo)`,
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
      material: "guia-saude-integral",
      source: origin.sourceSlug,
      channel: origin.channelSummary,
    });
    fireFormConversionEvents().catch(() => {});

    // Salva o lead no banco de dados e notifica a equipe
    mutation.mutate({
      name: cleanName,
      email: cleanEmail,
      phone,
      source: origin.sourceSlug,
      originDetails: origin.fullOriginDetails,
    });
  };

  return (
    <section
      id="playbook"
      className="mobile-form-section brand-playbook-section brand-dark-surface relative py-20 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4A3A30] via-[#2E2520] to-[#241B17]" />
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left side - Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <svg className="w-4 h-4 text-[#D9C58A]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm text-white/90 font-medium">
                Material Gratuito e Exclusivo
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Guia de Saúde Integral
            </h2>
            <p className="text-lg text-[#E1C79F] font-medium mb-4">Estilo de Vida & Urologia</p>
            <p className="text-white/80 text-base md:text-lg mb-6 max-w-lg mx-auto lg:mx-0">
              Descubra como pequenas mudanças no dia a dia podem transformar sua saúde urológica e
              seu bem-estar geral. Um guia prático com orientações baseadas em evidências
              científicas.
            </p>

            {/* Benefits list */}
            <ul className="space-y-3 text-white/80 text-sm md:text-base mb-8 max-w-lg mx-auto lg:mx-0">
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-[#D9C58A] mt-0.5 flex-shrink-0"
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
                <span>Nutrição e saúde urológica — alimentos que protegem</span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-[#D9C58A] mt-0.5 flex-shrink-0"
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
                <span>Exercícios para equilíbrio metabólico e hormonal</span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-[#D9C58A] mt-0.5 flex-shrink-0"
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
                <span>Orientações para homens e mulheres</span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-[#D9C58A] mt-0.5 flex-shrink-0"
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
                <span>Baseado em evidências científicas atualizadas</span>
              </li>
            </ul>
          </div>

          {/* Right side - Form */}
          <div className="w-full max-w-md">
            {!submitted ? (
              <div className="mobile-compact-form bg-white rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#4A3A30] to-[#2E2520] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-white"
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
                  <h3 className="text-xl font-bold text-gray-900">Baixe Gratuitamente</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Preencha seus dados para liberar o PDF e receber atendimento personalizado
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mobile-compact-form space-y-4">
                  <div>
                    <label
                      htmlFor="playbook-name"
                      className="block text-sm font-medium text-gray-700 mb-1"
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
                      className="w-full px-4 py-3 border border-[#C9B6A3] rounded-lg focus:ring-2 focus:ring-[#4A3A30]/20 focus:border-[#4A3A30] transition-colors text-gray-900 placeholder:text-gray-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="playbook-phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
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
                      className="w-full px-4 py-3 border border-[#C9B6A3] rounded-lg focus:ring-2 focus:ring-[#4A3A30]/20 focus:border-[#4A3A30] transition-colors text-gray-900 placeholder:text-gray-400"
                    />
                    {phoneError && <p className="text-xs text-red-600 mt-1">{phoneError}</p>}
                  </div>

                  <div>
                    <label
                      htmlFor="playbook-email"
                      className="block text-sm font-medium text-gray-700 mb-1"
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
                      className="w-full px-4 py-3 border border-[#C9B6A3] rounded-lg focus:ring-2 focus:ring-[#4A3A30]/20 focus:border-[#4A3A30] transition-colors text-gray-900 placeholder:text-gray-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full py-3.5 px-6 bg-gradient-to-r from-[#C9B6A3] to-[#A39484] hover:from-[#E1C79F] hover:to-[#C9B6A3] text-[#2E2520] font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
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
                        Processando...
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
                        Quero Meu Guia Gratuito
                      </span>
                    )}
                  </button>
                </form>

                {mutation.isError && (
                  <p className="text-sm text-red-600 mt-3 text-center">
                    Erro ao processar. Tente novamente.
                  </p>
                )}

                <p className="text-xs text-gray-500 text-center mt-4">
                  Seus dados são confidenciais e atendidos pela nossa equipe via WhatsApp oficial.
                </p>
              </div>
            ) : (
              <div className="mobile-compact-form bg-white rounded-2xl shadow-2xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
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
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Pronto! Seu Guia foi Liberado
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  Sua solicitação foi encaminhada para nossa equipe no WhatsApp e você já pode
                  baixar o PDF completo abaixo:
                </p>

                <div className="flex flex-col gap-3">
                  {downloadUrl && (
                    <a
                      href={downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-[#4A3A30] to-[#2E2520] text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
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
                      Baixar Guia (PDF)
                    </a>
                  )}

                  {whatsappRedirectUrl && (
                    <a
                      href={whatsappRedirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-[#147A3F] hover:bg-[#116637] text-white font-semibold rounded-lg transition-all duration-200 shadow-md"
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
