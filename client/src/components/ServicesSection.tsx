/*
 * Design: Clinical Precision — Swiss Medical Design
 * Services: Clean list with pricing, CTA to Doctoralia
 * Uses real Instagram photo from Universo Masculino lecture
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Monitor, MapPin, CreditCard } from "lucide-react";

// Real photo — Dr. Felipe at UroOnco 2025 congress (solo, professional)
const LECTURE_IMG = "/manus-storage/uroonco-solo_7227a008_5754f461.webp";

const services = [
  { name: "Primeira Consulta Urologia", price: "R$ 800", highlight: true },
  { name: "Teleconsulta em Urologia", price: "R$ 800", highlight: false },
  { name: "Consulta Cirurgia Geral", price: "R$ 800", highlight: false },
  { name: "Check-up Masculino + Bioimpedância", price: "Sob consulta", highlight: true },
  { name: "Vasectomia", price: "Sob consulta", highlight: false },
  { name: "Postectomia (Circuncisão)", price: "Sob consulta", highlight: false },
  { name: "Cistoscopia", price: "Sob consulta", highlight: false },
  { name: "Urodinâmica", price: "Sob consulta", highlight: false },
];

const features = [
  { icon: Monitor, text: "Teleconsulta disponível" },
  { icon: MapPin, text: "São Paulo & Campinas" },
  { icon: CreditCard, text: "12 convênios aceitos" },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="servicos" className="py-20 lg:py-28 bg-white" ref={ref}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image + features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-lg overflow-hidden shadow-2xl shadow-[#1C3D5A]/10 mb-8">
              <img loading="lazy"
                src={LECTURE_IMG}
                alt="Dr. Felipe no Congresso UroOnco 2025"
                className="w-full h-auto object-cover aspect-[4/3]" style={{width: '739px', height: '685px'}}
              />
            </div>

            <div className="flex flex-wrap gap-4">
              {features.map((feat) => (
                <div
                  key={feat.text}
                  className="flex items-center gap-2 bg-[#1C3D5A]/5 rounded-md px-4 py-2.5"
                >
                  <feat.icon className="w-4 h-4 text-[#B87333]" />
                  <span className="text-sm font-medium text-[#1C3D5A]/70 font-sans">
                    {feat.text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Services list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-[#B87333]" />
              <span className="text-[#B87333] text-sm font-semibold uppercase tracking-[0.15em]">
                Serviços & Valores
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl text-[#1C3D5A] leading-tight mb-3">
              Consultas e Procedimentos
            </h2>
            <p className="text-[#1C3D5A]/60 font-sans mb-8 text-base">
              Atendimento presencial em São Paulo e Campinas, além de teleconsulta. Mais de 30 procedimentos disponíveis.
            </p>

            {/* Services list */}
            <div className="space-y-0 mb-8">
              {services.map((service, i) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, x: 10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                  className={`flex items-center justify-between py-3.5 border-b border-[#1C3D5A]/8 ${
                    service.highlight ? "bg-[#B87333]/3 -mx-3 px-3 rounded-md" : ""
                  }`}
                >
                  <span className="text-sm font-medium text-[#1C3D5A] font-sans">
                    {service.name}
                  </span>
                  <span className="text-sm font-semibold text-[#B87333] font-sans whitespace-nowrap ml-4">
                    {service.price}
                  </span>
                </motion.div>
              ))}
            </div>

            <p className="text-xs text-[#1C3D5A]/40 font-sans mb-6">
              + 30 serviços adicionais disponíveis. Valores podem variar conforme convênio e procedimento.
            </p>

            <a
              href="https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-[#B87333] hover:bg-[#8B5A2B] text-white h-11 px-6 text-sm font-semibold rounded-md">
                Ver Todos os Serviços
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
