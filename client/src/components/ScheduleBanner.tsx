/*
 * Design: Clinical Precision — Swiss Medical Design
 * Component: Schedule Banner — Banner discreto de agendamento que aparece após scroll
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Calendar, X } from "lucide-react";
import { trackWhatsAppClick, trackCtaClick } from "@/lib/analytics";
import { getWhatsAppUrl } from "@/lib/tracking";

export default function ScheduleBanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const shouldReduceMotion = useReducedMotion();

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
          initial={shouldReduceMotion ? false : { y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { y: 12, opacity: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
          className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-40"
        >
          <div className="bg-white dark:bg-card rounded-xl shadow-2xl border border-[#1C3D5A]/8 p-4 relative">
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-[#453830]/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A88B6B] focus-visible:ring-offset-2"
              aria-label="Fechar lembrete de agendamento"
            >
              <X className="w-4 h-4 text-[#1C3D5A] dark:text-foreground/30" />
            </button>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-md bg-[#B87333]/15 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" style={{ color: "#D9C58A" }} />
              </div>
              <div className="flex-1 pr-4">
                <p className="text-sm font-semibold text-[#1C3D5A] dark:text-foreground mb-0.5">
                  Agende sua consulta online
                </p>
                <p className="text-xs text-[#1C3D5A] dark:text-foreground/40 mb-3">
                  Agende pelo Doctoralia ou ligue: Clinovi (11) 3382-1529 | Campinas Day Hospital (19) 2127-2900 | São Luiz Campinas (19) 3014-3000.
                </p>
                <div className="flex gap-2">
                  <a
                    href="#agendamento"
                    onClick={(e) => {
                      e.preventDefault();
                      trackCtaClick("agendar_agora", "schedule_banner");
                      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
                      document.getElementById("agendamento")?.scrollIntoView({ behavior });
                    }}
                    className="schedule-banner-cta schedule-banner-cta--primary flex-1 text-center text-xs font-semibold py-2 px-3 rounded-md focus-visible:outline-none"
                  >
                    Agendar Agora
                  </a>
                  <a
                    href={getWhatsAppUrl({ page: "agendamento" })}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick("schedule_banner")}
                    className="schedule-banner-cta schedule-banner-cta--whatsapp flex-1 text-center text-white text-xs font-semibold py-2 px-3 rounded-md focus-visible:outline-none"
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
