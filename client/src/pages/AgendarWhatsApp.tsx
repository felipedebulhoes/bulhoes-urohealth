/**
 * Página intermediária: /agendar/whatsapp
 * Registra evento lead_whatsapp com gclid/UTMs e redireciona para WhatsApp
 * Mostra contador visual de tempo antes do redirecionamento automático
 */
import { useEffect, useState, useRef } from "react";
import { trackWhatsAppClick } from "@/lib/analytics";
import { getAttribution } from "@/lib/tracking";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "5511981124455";
const REDIRECT_SECONDS = 3;

export default function AgendarWhatsApp() {
  const [countdown, setCountdown] = useState(REDIRECT_SECONDS);
  const [redirectFailed, setRedirectFailed] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Disparar evento de conversão com rastreamento
    trackWhatsAppClick("redirect_page");

    // Construir URL do WhatsApp com mensagem personalizada
    const attribution = getAttribution();
    let message = "Olá! Gostaria de agendar uma consulta com o Dr. Felipe Bulhões.";
    
    // Adicionar origem do tráfego se disponível
    const trafficParts: string[] = [];
    if (attribution?.utm_source) trafficParts.push(attribution.utm_source);
    if (attribution?.utm_medium) trafficParts.push(attribution.utm_medium);
    if (attribution?.utm_campaign) trafficParts.push(attribution.utm_campaign);
    if (!trafficParts.length && (attribution?.gclid || attribution?.gbraid || attribution?.wbraid)) {
      trafficParts.push("google", "cpc");
    }
    if (trafficParts.length > 0) {
      message += `\n[via: ${trafficParts.join("/")}]`;
    }

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    setWhatsappUrl(url);

    // Atualizar meta tags
    document.title = "Abrindo WhatsApp... | Dr. Felipe de Bulhões";

    // Countdown
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          // Redirecionar
          window.open(url, "_blank");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Fallback: se o redirect não funcionar em 6s, mostrar link manual
    const fallback = setTimeout(() => {
      setRedirectFailed(true);
    }, (REDIRECT_SECONDS + 3) * 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      clearTimeout(fallback);
    };
  }, []);

  // Progresso circular
  const progress = ((REDIRECT_SECONDS - countdown) / REDIRECT_SECONDS) * 100;
  const circumference = 2 * Math.PI * 40; // raio 40
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#25D366] to-[#128C7E] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Logo */}
        <img
          src="/manus-storage/logo-landscape_be6628b3.svg"
          alt="Dr. Felipe de Bulhões"
          className="h-14 w-auto mx-auto mb-8 brightness-0 invert"
        />

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          {!redirectFailed ? (
            <>
              {/* Contador circular */}
              <div className="relative w-24 h-24 mx-auto mb-6">
                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
                  {/* Background circle */}
                  <circle
                    cx="48" cy="48" r="40"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="4"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="48" cy="48" r="40"
                    fill="none"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-1000 ease-linear"
                  />
                </svg>
                {/* Número central */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">{countdown}</span>
                </div>
              </div>

              <h1 className="text-xl text-white font-serif mb-2">
                Abrindo WhatsApp
              </h1>
              <p className="text-white/80 text-sm leading-relaxed mb-4">
                Você será direcionado ao WhatsApp em {countdown} segundo{countdown !== 1 ? "s" : ""}.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/80 text-sm underline underline-offset-2 transition-colors"
              >
                Abrir agora →
              </a>
            </>
          ) : (
            <>
              {/* Fallback: link manual */}
              <MessageCircle className="w-10 h-10 text-white mx-auto mb-4" />
              <h1 className="text-xl text-white font-serif mb-2">
                Contato via WhatsApp
              </h1>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                Clique no botão abaixo para abrir uma conversa com o Dr. Felipe Bulhões no WhatsApp.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-[#25D366] px-6 py-3 rounded-lg transition-colors font-semibold"
              >
                <MessageCircle className="w-5 h-5" />
                Abrir WhatsApp
              </a>
            </>
          )}
        </div>

        {/* Footer info */}
        <p className="text-white/20 text-xs mt-6">
          Dr. Felipe de Bulhões — CRM-SP 202.291
        </p>
      </div>
    </div>
  );
}
