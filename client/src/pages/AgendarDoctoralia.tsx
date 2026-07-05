/**
 * Página intermediária: /agendar/doctoralia
 * Registra evento lead_doctoralia e redireciona para o perfil Doctoralia
 * Mostra contador visual de tempo antes do redirecionamento automático
 */
import { useEffect, useState, useRef } from "react";
import { trackDoctoraliaClick } from "@/lib/analytics";
import { Calendar } from "lucide-react";

const DOCTORALIA_URL = "https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas";
const REDIRECT_SECONDS = 3;

export default function AgendarDoctoralia() {
  const [countdown, setCountdown] = useState(REDIRECT_SECONDS);
  const [redirectFailed, setRedirectFailed] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Disparar evento de conversão
    trackDoctoraliaClick("redirect_page");

    // Atualizar meta tags
    document.title = "Agendando Consulta... | Dr. Felipe de Bulhões";

    // Countdown
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          // Redirecionar
          window.location.href = DOCTORALIA_URL;
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
    <div className="min-h-screen bg-gradient-to-b from-[#1C3D5A] to-[#0F3460] flex items-center justify-center px-4">
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
                    stroke="#B87333"
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
                Redirecionando para agendamento
              </h1>
              <p className="text-white/50 text-sm leading-relaxed mb-4">
                Você será direcionado ao Doctoralia em {countdown} segundo{countdown !== 1 ? "s" : ""}.
              </p>
              <a
                href={DOCTORALIA_URL}
                className="text-[#B87333] hover:text-[#D4956A] text-sm underline underline-offset-2 transition-colors"
              >
                Ir agora →
              </a>
            </>
          ) : (
            <>
              {/* Fallback: link manual */}
              <Calendar className="w-10 h-10 text-[#B87333] mx-auto mb-4" />
              <h1 className="text-xl text-white font-serif mb-2">
                Agendar Consulta
              </h1>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                Clique no botão abaixo para acessar o agendamento online pelo Doctoralia.
              </p>
              <a
                href={DOCTORALIA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#B87333] hover:bg-[#8B5A2B] text-white px-6 py-3 rounded-lg transition-colors"
              >
                <Calendar className="w-5 h-5" />
                Agendar pelo Doctoralia
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
