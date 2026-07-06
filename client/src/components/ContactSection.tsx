/*
 * Design: Clinical Precision — Swiss Medical Design
 * Contact: CTA section + social links + teleconsulta + 3 locais
 */
import { motion, useInView } from "framer-motion";
import { getWhatsAppUrl } from "@/lib/tracking";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Instagram, MessageCircle, ExternalLink, Monitor, MapPin } from "lucide-react";
import { trackWhatsAppClick, trackDoctoraliaClick, trackCtaClick } from "@/lib/analytics";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contato" className="relative py-20 lg:py-28 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-[#1C3D5A]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#1C3D5A] via-[#0D2D4A] to-[#1C3D5A]" />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B87333]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B87333]/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#B87333]" />
            <span className="text-[#D4884A] text-sm font-semibold uppercase tracking-[0.15em]">
              Agende sua Consulta
            </span>
            <div className="h-px w-10 bg-[#B87333]" />
          </div>

          <h2 className="text-3xl lg:text-5xl text-white leading-tight mb-6">
            Cuide da sua saúde com quem entende
          </h2>

          <p className="text-white/60 font-sans text-base lg:text-lg mb-4 max-w-lg mx-auto">
            Atendimento presencial em São Paulo e Campinas, ou por teleconsulta.
            Humanizado, com excelência técnica.
          </p>
          <p className="text-white/40 font-sans text-sm mb-6 max-w-lg mx-auto">
            Agende por telefone: Clinovi (11) 3382-1529 | Campinas (19) 2127-2900 | WhatsApp Campinas: (19) 99855-9890<br />
            WhatsApp (11) 98112-4455 — apenas mensagens
          </p>

          {/* Locais resumidos */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <div className="flex items-center gap-2 text-white/40">
              <MapPin className="w-3.5 h-3.5 text-[#D4884A]" />
              <span className="text-xs font-sans">Campinas Day Hospital</span>
            </div>
            <div className="w-px h-3 bg-white/15" />
            <div className="flex items-center gap-2 text-white/40">
              <MapPin className="w-3.5 h-3.5 text-[#D4884A]" />
              <span className="text-xs font-sans">Clinovi Paulista</span>
            </div>
            <div className="w-px h-3 bg-white/15" />
            <div className="flex items-center gap-2 text-white/40">
              <MapPin className="w-3.5 h-3.5 text-[#D4884A]" />
              <span className="text-xs font-sans">Clinovi Moema</span>
            </div>
            <div className="w-px h-3 bg-white/15" />
            <div className="flex items-center gap-2 text-white/40">
              <MapPin className="w-3.5 h-3.5 text-[#D4884A]" />
              <span className="text-xs font-sans">Clinovi Pinheiros</span>
            </div>
            <div className="w-px h-3 bg-white/15" />
            <div className="flex items-center gap-2 text-white/40">
              <MapPin className="w-3.5 h-3.5 text-[#D4884A]" />
              <span className="text-xs font-sans">Clinovi SBC</span>
            </div>
            <div className="w-px h-3 bg-white/15" />
            <div className="flex items-center gap-2 text-white/40">
              <MapPin className="w-3.5 h-3.5 text-[#D4884A]" />
              <span className="text-xs font-sans">CEMED - Rede D'Or</span>
            </div>
            <div className="w-px h-3 bg-white/15" />
            <div className="flex items-center gap-2 text-white/40">
              <Monitor className="w-3.5 h-3.5 text-[#D4884A]" />
              <span className="text-xs font-sans">Teleconsulta</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="#agendamento"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("agendamento")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Button className="bg-[#B87333] hover:bg-[#8B5A2B] text-white h-13 px-8 text-base font-semibold rounded-md shadow-lg shadow-amber-900/30">
                <CalendarCheck className="w-5 h-5 mr-2" />
                Agendar Consulta
              </Button>
            </a>
            <a
              href={getWhatsAppUrl({ page: "contato" })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("contact_section")}
            >
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 h-13 px-8 text-base font-medium rounded-md"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </Button>
            </a>
          </div>

          {/* Social links */}
          <div className="flex items-center justify-center gap-6">
            <a
              href="https://www.instagram.com/drfelipebulhoes/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/50 hover:text-[#D4884A] transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span className="text-sm font-sans">@drfelipebulhoes</span>
            </a>
            <a
              href="https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas?utm_source=site&utm_medium=homepage&utm_campaign=contact-section"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/50 hover:text-[#D4884A] transition-colors"
              onClick={() => trackDoctoraliaClick("contact_section")}
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm font-sans">Doctoralia</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
