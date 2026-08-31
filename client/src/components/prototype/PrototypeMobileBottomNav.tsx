import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { HelpCircle, Loader2, Mail, MessageCircle } from "lucide-react";
import { useLocation } from "wouter";
import { trackPrototypeEvent, trackWhatsAppClick } from "@/lib/analytics";
import { getWhatsAppUrl } from "@/lib/tracking";

const GIRTH_PATH = "/prototipo-jornada-paciente/engrossamento-peniano";

export default function PrototypeMobileBottomNav() {
  const [location] = useLocation();
  const [openingWhatsApp, setOpeningWhatsApp] = useState(false);
  const whatsappUrl = useMemo(
    () =>
      getWhatsAppUrl({
        page: "prototipo-jornada-paciente",
        campaign: "prototype_mobile_bottom_nav",
        customMessage:
          "Olá! Gostaria de agendar uma avaliação confidencial com o Dr. Felipe de Bulhões. Prefiro explicar os detalhes durante o atendimento.",
      }),
    [],
  );

  useEffect(() => {
    if (!openingWhatsApp) return;
    const timer = window.setTimeout(() => setOpeningWhatsApp(false), 1600);
    return () => window.clearTimeout(timer);
  }, [openingWhatsApp]);

  const scrollToSection = (event: MouseEvent<HTMLAnchorElement>, id: string, item: string) => {
    trackPrototypeEvent("prototype_section_view", "prototype_mobile_bottom_nav", item);
    if (location !== GIRTH_PATH) return;

    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", `${GIRTH_PATH}#${id}`);
  };

  const destination = (id: string) => (location === GIRTH_PATH ? `#${id}` : `${GIRTH_PATH}#${id}`);
  const itemClass =
    "flex min-h-16 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-[11px] font-semibold leading-none text-[#17364F] transition hover:bg-[#17364F]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87333] focus-visible:ring-inset active:scale-[0.97] dark:text-foreground motion-reduce:transform-none";

  return (
    <nav
      aria-label="Atalhos de contato do protótipo"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[#17364F]/10 bg-white/95 px-3 pt-2 shadow-[0_-10px_30px_rgba(17,47,71,0.12)] backdrop-blur md:hidden dark:bg-card/95"
    >
      <div className="mx-auto grid max-w-md grid-cols-3 gap-1 pb-[max(env(safe-area-inset-bottom),0.5rem)]">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            setOpeningWhatsApp(true);
            trackPrototypeEvent("cta_whatsapp", "prototype_mobile_bottom_nav", "confidential_schedule");
            trackWhatsAppClick("prototype_patient_journey_mobile_bottom_nav");
          }}
          aria-label={openingWhatsApp ? "Abrindo WhatsApp" : "Agendar avaliação confidencial pelo WhatsApp"}
          aria-busy={openingWhatsApp}
          className={`${itemClass} bg-[#128C7E]/10 text-[#0F766E]`}
        >
          {openingWhatsApp ? <Loader2 className="h-5 w-5 animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <MessageCircle className="h-5 w-5" aria-hidden="true" />}
          <span>{openingWhatsApp ? "Abrindo…" : "WhatsApp"}</span>
        </a>
        <a
          href={destination("faq-engrossamento")}
          onClick={(event) => scrollToSection(event, "faq-engrossamento", "faq")}
          className={itemClass}
        >
          <HelpCircle className="h-5 w-5 text-[#B87333]" aria-hidden="true" />
          <span>FAQ</span>
        </a>
        <a
          href={destination("contato-email")}
          onClick={(event) => scrollToSection(event, "contato-email", "email_contact")}
          className={itemClass}
        >
          <Mail className="h-5 w-5 text-[#B87333]" aria-hidden="true" />
          <span>E-mail</span>
        </a>
      </div>
    </nav>
  );
}
