/*
 * Design: Clinical Precision — Swiss Medical Design
 * Component: Schedule Banner — Banner discreto de agendamento que aparece após scroll
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X } from "lucide-react";
import { trackWhatsAppClick, trackCtaClick } from "@/lib/analytics";

export default function ScheduleBanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 35 && !dismissed) {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  const handleDismiss = () => {
    setDismissed(true);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-40"
        >
          <div className="bg-white rounded-xl shadow-2xl border border-[#0A2540]/8 p-4 relative">
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-[#0A2540]/5 transition-colors"
            >
              <X className="w-4 h-4 text-[#0A2540]/30" />
            </button>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#0D9488]/10 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-[#0D9488]" />
              </div>
              <div className="flex-1 pr-4">
                <p className="text-sm font-semibold text-[#0A2540] mb-0.5">
                  Agende sua consulta online
                </p>
                <p className="text-xs text-[#0A2540]/40 mb-3">
                  Atendimento presencial e teleconsulta. Resposta em até 2h.
                </p>
                <div className="flex gap-2">
                  <a
                    href="#agendamento"
                    onClick={(e) => {
                      e.preventDefault();
                      trackCtaClick("agendar_agora", "schedule_banner");
                      document.getElementById("agendamento")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex-1 text-center bg-[#0D9488] hover:bg-[#0B7C72] text-white text-xs font-semibold py-2 px-3 rounded-lg transition-colors"
                  >
                    Agendar Agora
                  </a>
                  <a
                    href="https://wa.me/5511981124455?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick("schedule_banner")}
                    className="flex-1 text-center bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-semibold py-2 px-3 rounded-lg transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
