import { useState, useEffect, useRef } from "react";
import { Phone, Calendar, MessageCircle, ChevronDown, ChevronUp } from "lucide-react";
import { trackWhatsAppClick, trackDoctoraliaClick, trackPhoneClick } from "@/lib/analytics";
import { getWhatsAppUrl } from "@/lib/tracking";

interface MobileBottomBarProps {
  source?: string;
  whatsappMessage?: string;
}

export default function MobileBottomBar({ source = "homepage", whatsappMessage }: MobileBottomBarProps) {
  const [manualHide, setManualHide] = useState(false);
  const [scrollHidden, setScrollHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const whatsappUrl = getWhatsAppUrl({ page: source });
  const doctoraliaUrl = `https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas?utm_source=site&utm_medium=mobile-bar&utm_campaign=${source}`;
  const phoneNumber = "tel:+5511981124455";

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY.current;

        // Scroll down more than 10px → hide
        if (delta > 10 && currentScrollY > 80) {
          setScrollHidden(true);
        }
        // Scroll up more than 10px → show
        else if (delta < -10) {
          setScrollHidden(false);
        }

        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHidden = manualHide || scrollHidden;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ease-in-out ${
        isHidden ? "translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Toggle button - visible when manually hidden */}
      {manualHide && (
        <div className="flex justify-center">
          <button
            onClick={() => { setManualHide(false); setScrollHidden(false); }}
            className="relative -mb-px bg-white border border-gray-200 border-b-0 rounded-t-lg px-3 py-1 shadow-sm active:bg-gray-50 transition-colors -translate-y-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A88B6B] focus-visible:ring-offset-2"
            aria-label="Mostrar barra de contato"
          >
            <ChevronUp className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      )}

      <nav className="bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] px-2 py-2 safe-area-pb relative">
        {/* Minimize button */}
        {!manualHide && (
          <button
            onClick={() => setManualHide(true)}
            className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white border border-gray-200 border-b-0 rounded-t-lg px-3 py-0.5 shadow-sm active:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A88B6B] focus-visible:ring-offset-2"
            aria-label="Ocultar barra de contato"
          >
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>
        )}

        <div className="flex items-center justify-around gap-1 max-w-md mx-auto">
          {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick(`mobile_bar_${source}`)}
            className="mobile-contact-action mobile-contact-action--whatsapp flex flex-col items-center gap-0.5 flex-1 min-h-11 py-1.5 px-2 rounded-md active:bg-green-50 focus-visible:outline-none"
          >
            <div className="w-9 h-9 rounded-full bg-[#147A3F] flex items-center justify-center shadow-sm">
              <MessageCircle className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-[10px] font-medium text-gray-600">WhatsApp</span>
          </a>

          {/* Doctoralia - Botão principal (maior) */}
          <a
            href={doctoraliaUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackDoctoraliaClick(`mobile_bar_${source}`)}
            className="mobile-contact-action mobile-contact-action--schedule flex flex-col items-center gap-0.5 flex-1 min-h-11 py-1.5 px-2 rounded-md active:bg-[#EDE4D9] focus-visible:outline-none"
          >
            <div className="w-11 h-11 rounded-full bg-[#453830] flex items-center justify-center shadow-md -mt-3 border-2 border-white">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <span className="text-[10px] font-semibold text-[#453830]">Agendar</span>
          </a>

          {/* Telefone */}
          <a
            href={phoneNumber}
            onClick={() => trackPhoneClick(`mobile_bar_${source}`)}
            className="mobile-contact-action mobile-contact-action--phone flex flex-col items-center gap-0.5 flex-1 min-h-11 py-1.5 px-2 rounded-md active:bg-[#EDE4D9] focus-visible:outline-none"
          >
            <div className="w-9 h-9 rounded-full bg-[#6E7F90] flex items-center justify-center shadow-sm">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] font-medium text-gray-600">Ligar</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
