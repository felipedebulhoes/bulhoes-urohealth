/*
 * Design: Clinical Precision — Swiss Medical Design
 * Contact: CTA section + social links + contact info
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Instagram, MessageCircle, ExternalLink } from "lucide-react";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contato" className="relative py-20 lg:py-28 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-[#0A2540]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A2540] via-[#0D2D4A] to-[#0A2540]" />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0D9488]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0D9488]/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#0D9488]" />
            <span className="text-[#5EEAD4] text-sm font-semibold uppercase tracking-[0.15em]">
              Agende sua Consulta
            </span>
            <div className="h-px w-10 bg-[#0D9488]" />
          </div>

          <h2 className="text-3xl lg:text-5xl text-white leading-tight mb-6">
            Cuide da sua saúde com quem entende
          </h2>

          <p className="text-white/60 font-sans text-base lg:text-lg mb-10 max-w-lg mx-auto">
            Agende sua consulta presencial na Av. Paulista ou por teleconsulta.
            Atendimento humanizado com excelência técnica.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/sao-paulo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-[#0D9488] hover:bg-[#0B7C72] text-white h-13 px-8 text-base font-semibold rounded-md shadow-lg shadow-teal-900/30">
                <CalendarCheck className="w-5 h-5 mr-2" />
                Agendar pela Doctoralia
              </Button>
            </a>
            <a
              href="https://wa.me/5511981120000"
              target="_blank"
              rel="noopener noreferrer"
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
              className="flex items-center gap-2 text-white/50 hover:text-[#5EEAD4] transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span className="text-sm font-sans">@drfelipebulhoes</span>
            </a>
            <a
              href="https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/sao-paulo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/50 hover:text-[#5EEAD4] transition-colors"
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
