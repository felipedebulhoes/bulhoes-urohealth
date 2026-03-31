/*
 * Design: Clinical Precision — Swiss Medical Design
 * DoctoraliaWidget: Embeds the Doctoralia booking calendar widget directly on the page
 * Uses the official Docplanner widget script with big_with_calendar type
 */
import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CalendarCheck, Shield, Clock, Star } from "lucide-react";
import { trackDoctoraliaClick } from "@/lib/analytics";

const DOCTORALIA_PROFILE = "felipe-de-bulhoes-ojeda-2";
const WIDGET_SCRIPT_ID = "zl-widget-s";
const WIDGET_SCRIPT_SRC = "//platform.docplanner.com/js/widget.js";

function loadDoctoraliaScript() {
  if (document.getElementById(WIDGET_SCRIPT_ID)) {
    // Script already loaded — force re-initialization by removing and re-adding
    const existing = document.getElementById(WIDGET_SCRIPT_ID);
    existing?.remove();
  }
  const script = document.createElement("script");
  script.id = WIDGET_SCRIPT_ID;
  script.src = WIDGET_SCRIPT_SRC;
  script.async = true;
  document.body.appendChild(script);
}

export default function DoctoraliaWidget() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (isInView && !hasLoaded.current) {
      hasLoaded.current = true;
      // Small delay to ensure the anchor element is in the DOM
      const timer = setTimeout(() => {
        loadDoctoraliaScript();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      const script = document.getElementById(WIDGET_SCRIPT_ID);
      if (script) script.remove();
    };
  }, []);

  return (
    <section
      id="agendamento"
      ref={sectionRef}
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F0FDFA] via-white to-[#F0FDFA]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #0A2540 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#0D9488]" />
            <span className="text-[#0D9488] text-sm font-semibold uppercase tracking-[0.15em]">
              Agendamento Online
            </span>
            <div className="h-px w-10 bg-[#0D9488]" />
          </div>

          <h2 className="text-3xl lg:text-4xl text-[#0A2540] leading-tight mb-4 font-serif">
            Agende sua consulta agora
          </h2>

          <p className="text-[#0A2540]/50 font-sans text-base lg:text-lg max-w-lg mx-auto">
            Escolha o melhor dia e horário diretamente pelo calendário.
            Confirmação imediata pela Doctoralia.
          </p>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-4 lg:gap-6 mb-10"
        >
          <div className="flex items-center gap-2 text-sm text-[#0A2540]/60">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-medium">Nota 5.0 no Doctoralia</span>
          </div>
          <div className="w-px h-4 bg-[#0A2540]/10 hidden sm:block" />
          <div className="flex items-center gap-2 text-sm text-[#0A2540]/60">
            <Shield className="w-4 h-4 text-[#0D9488]" />
            <span className="font-medium">Confirmação imediata</span>
          </div>
          <div className="w-px h-4 bg-[#0A2540]/10 hidden sm:block" />
          <div className="flex items-center gap-2 text-sm text-[#0A2540]/60">
            <Clock className="w-4 h-4 text-[#0D9488]" />
            <span className="font-medium">Presencial ou teleconsulta</span>
          </div>
        </motion.div>

        {/* Widget container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl shadow-[#0A2540]/5 border border-[#0A2540]/5 p-4 sm:p-6 lg:p-8">
            {/* Doctoralia widget anchor */}
            <a
              id="zl-url"
              className="zl-url"
              href="https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas"
              rel="nofollow"
              onClick={() => trackDoctoraliaClick("doctoralia_widget")}
              data-zlw-doctor={DOCTORALIA_PROFILE}
              data-zlw-type="big_with_calendar"
              data-zlw-opinion="false"
              data-zlw-hide-branding="true"
              data-zlw-saas-only="true"
              data-zlw-a11y-title="Widget de marcação de consultas médicas"
              style={{ display: "block", textAlign: "center" }}
            >
              {/* Fallback while widget loads */}
              <div className="py-12 flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0D9488]/10 flex items-center justify-center">
                  <CalendarCheck className="w-6 h-6 text-[#0D9488]" />
                </div>
                <p className="text-[#0A2540]/60 text-sm">
                  Carregando calendário de agendamento...
                </p>
              </div>
            </a>
          </div>

          {/* Bottom note */}
          <p className="text-center text-[#0A2540]/30 text-xs mt-6">
            Agendamento seguro via Doctoralia · CRM-SP 202291 · RQE 146538 / RQE 114019
          </p>
        </motion.div>
      </div>
    </section>
  );
}
