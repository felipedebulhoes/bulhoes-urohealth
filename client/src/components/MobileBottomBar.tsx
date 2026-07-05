import { useState } from "react";
import { Phone, Calendar, MessageCircle, ChevronDown, ChevronUp } from "lucide-react";
import { trackWhatsAppClick, trackDoctoraliaClick, trackPhoneClick } from "@/lib/analytics";
import { getWhatsAppUrl } from "@/lib/tracking";

interface MobileBottomBarProps {
  source?: string;
  whatsappMessage?: string;
}

export default function MobileBottomBar({ source = "homepage", whatsappMessage }: MobileBottomBarProps) {
  const [minimized, setMinimized] = useState(false);
  const whatsappUrl = getWhatsAppUrl({ page: source });
  const doctoraliaUrl = `https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas?utm_source=site&utm_medium=mobile-bar&utm_campaign=${source}`;
  const phoneNumber = "tel:+5511981124455";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Toggle button */}
      <div className="flex justify-center">
        <button
          onClick={() => setMinimized(!minimized)}
          className="relative -mb-px bg-white border border-gray-200 border-b-0 rounded-t-lg px-3 py-1 shadow-sm active:bg-gray-50 transition-colors"
          aria-label={minimized ? "Mostrar barra de contato" : "Ocultar barra de contato"}
        >
          {minimized ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>
      </div>

      {/* Bar content - animated */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          minimized ? "max-h-0" : "max-h-24"
        }`}
      >
        <nav className="bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] px-2 py-2 safe-area-pb">
          <div className="flex items-center justify-around gap-1 max-w-md mx-auto">
            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick(`mobile_bar_${source}`)}
              className="flex flex-col items-center gap-0.5 flex-1 py-1.5 px-2 rounded-lg active:bg-green-50 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center shadow-sm">
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
              className="flex flex-col items-center gap-0.5 flex-1 py-1.5 px-2 rounded-lg active:bg-amber-50 transition-colors"
            >
              <div className="w-11 h-11 rounded-full bg-[#B87333] flex items-center justify-center shadow-md -mt-3 border-2 border-white">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <span className="text-[10px] font-semibold text-[#B87333]">Agendar</span>
            </a>

            {/* Telefone */}
            <a
              href={phoneNumber}
              onClick={() => trackPhoneClick(`mobile_bar_${source}`)}
              className="flex flex-col items-center gap-0.5 flex-1 py-1.5 px-2 rounded-lg active:bg-blue-50 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-[#1C3D5A] flex items-center justify-center shadow-sm">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] font-medium text-gray-600">Ligar</span>
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
