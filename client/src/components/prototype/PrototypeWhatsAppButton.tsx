import { useEffect, useMemo, useState } from "react";
import { Loader2, LockKeyhole, MessageCircle } from "lucide-react";
import { trackPrototypeEvent, trackWhatsAppClick } from "@/lib/analytics";
import { getWhatsAppUrl } from "@/lib/tracking";

export default function PrototypeWhatsAppButton() {
  const [opening, setOpening] = useState(false);
  const whatsappUrl = useMemo(
    () =>
      getWhatsAppUrl({
        page: "prototipo-jornada-paciente",
        campaign: "prototype_validation",
        customMessage:
          "Olá! Gostaria de agendar uma avaliação confidencial com o Dr. Felipe de Bulhões. Prefiro explicar os detalhes durante o atendimento.",
      }),
    [],
  );

  useEffect(() => {
    if (!opening) return;
    const timer = window.setTimeout(() => setOpening(false), 1600);
    return () => window.clearTimeout(timer);
  }, [opening]);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        setOpening(true);
        trackPrototypeEvent("cta_whatsapp", "prototype_floating_button", "confidential_schedule");
        trackWhatsAppClick("prototype_patient_journey_floating");
      }}
      aria-label={opening ? "Abrindo WhatsApp" : "Agendar avaliação confidencial pelo WhatsApp"}
      aria-busy={opening}
      className="group fixed bottom-7 right-7 z-50 hidden min-h-14 items-center gap-3 rounded-full bg-[#128C7E] px-4 py-3 font-semibold text-white shadow-2xl shadow-black/20 transition hover:-translate-y-1 hover:bg-[#0F766E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#128C7E] focus-visible:ring-offset-4 active:scale-[0.98] motion-reduce:transform-none md:flex"
    >
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15" aria-hidden="true">
        {opening ? <Loader2 className="h-5 w-5 animate-spin motion-reduce:animate-none" /> : <MessageCircle className="h-5 w-5" />}
      </span>
      <span className="pr-1 text-left leading-tight">
        <span className="block text-sm">{opening ? "Abrindo WhatsApp" : "Agendar pelo WhatsApp"}</span>
        <span className="mt-0.5 flex items-center gap-1 text-[11px] font-medium text-white/85">
          <LockKeyhole className="h-3 w-3" aria-hidden="true" /> Contato confidencial
        </span>
      </span>
    </a>
  );
}
