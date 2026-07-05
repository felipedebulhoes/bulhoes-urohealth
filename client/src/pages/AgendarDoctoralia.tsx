/**
 * Página intermediária: /agendar/doctoralia
 * Registra evento lead_doctoralia e redireciona para o perfil Doctoralia
 * Mostra mensagem de carregamento durante o redirecionamento
 */
import { useEffect, useState } from "react";
import { trackDoctoraliaClick } from "@/lib/analytics";
import { Loader2, Calendar } from "lucide-react";

const DOCTORALIA_URL = "https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas";

export default function AgendarDoctoralia() {
  const [redirecting, setRedirecting] = useState(true);

  useEffect(() => {
    // Disparar evento de conversão
    trackDoctoraliaClick("redirect_page");

    // Atualizar meta tags
    document.title = "Agendando Consulta... | Dr. Felipe de Bulhões";

    // Redirecionar após breve delay para garantir que o evento seja enviado
    const timer = setTimeout(() => {
      window.location.href = DOCTORALIA_URL;
    }, 1500);

    // Fallback: se o redirect não funcionar em 5s, mostrar link manual
    const fallback = setTimeout(() => {
      setRedirecting(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1C3D5A] to-[#0F3460] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Logo */}
        <img
          src="/manus-storage/logo-landscape_be6628b3.svg"
          alt="Dr. Felipe de Bulhões"
          className="h-14 w-auto mx-auto mb-8 brightness-0 invert"
        />

        {redirecting ? (
          <>
            {/* Loading state */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <Loader2 className="w-10 h-10 text-[#B87333] animate-spin mx-auto mb-4" />
              <h1 className="text-xl text-white font-serif mb-2">
                Redirecionando para agendamento
              </h1>
              <p className="text-white/50 text-sm leading-relaxed">
                Você está sendo direcionado para o Doctoralia, onde poderá escolher o melhor horário para sua consulta.
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Fallback: link manual */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
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
            </div>
          </>
        )}

        {/* Footer info */}
        <p className="text-white/20 text-xs mt-6">
          Dr. Felipe de Bulhões — CRM-SP 202.291
        </p>
      </div>
    </div>
  );
}
