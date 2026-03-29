/*
 * Design: Clinical Precision — Swiss Medical Design
 * Location: Map + address cards, insurance info
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, Phone, CreditCard, Monitor, Building2 } from "lucide-react";

const insurances = [
  "Bradesco Saúde",
  "Sul América Saúde",
  "Allianz",
  "Cassi",
  "GAMA Saúde",
  "e outros 7 convênios",
];

export default function LocationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="consultorios" className="py-20 lg:py-28 bg-white" ref={ref}>
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#0D9488]" />
            <span className="text-[#0D9488] text-sm font-semibold uppercase tracking-[0.15em]">
              Onde Atendo
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl text-[#0A2540] leading-tight max-w-xl">
            Consultórios e Atendimento
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: Address cards */}
          <div className="lg:col-span-2 space-y-5">
            {/* Main office */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#0A2540] rounded-lg p-6 text-white"
            >
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-5 h-5 text-[#5EEAD4]" />
                <h3 className="text-lg font-semibold font-sans">Clinovi - Av. Paulista</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#5EEAD4] mt-0.5 shrink-0" />
                  <p className="text-sm text-white/80 font-sans">
                    Avenida Paulista, 1048, 18° andar<br />
                    Bela Vista, São Paulo - SP<br />
                    CEP 01310-100
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#5EEAD4] shrink-0" />
                  <p className="text-sm text-white/80 font-sans">(11) 98112-0000</p>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#5EEAD4] shrink-0" />
                  <p className="text-sm text-white/80 font-sans">Seg a Sex, horários disponíveis online</p>
                </div>
              </div>
            </motion.div>

            {/* Teleconsulta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#F8FAFB] rounded-lg p-6 border border-[#0A2540]/8"
            >
              <div className="flex items-center gap-2 mb-3">
                <Monitor className="w-5 h-5 text-[#0D9488]" />
                <h3 className="text-base font-semibold text-[#0A2540] font-sans">Teleconsulta</h3>
              </div>
              <p className="text-sm text-[#0A2540]/60 font-sans mb-3">
                Atendimento online por vídeo. Ideal para acompanhamento, segunda opinião e orientações.
              </p>
              <p className="text-sm font-semibold text-[#0D9488] font-sans">
                A partir de R$ 650
              </p>
            </motion.div>

            {/* Insurance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#F8FAFB] rounded-lg p-6 border border-[#0A2540]/8"
            >
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="w-5 h-5 text-[#0D9488]" />
                <h3 className="text-base font-semibold text-[#0A2540] font-sans">Convênios Aceitos</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {insurances.map((ins) => (
                  <span
                    key={ins}
                    className="text-xs font-medium text-[#0A2540]/60 bg-white rounded-md px-3 py-1.5 border border-[#0A2540]/8 font-sans"
                  >
                    {ins}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Clinic image + map embed */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 space-y-5"
          >
            <div className="rounded-lg overflow-hidden shadow-lg border border-[#0A2540]/8 h-[400px] lg:h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0976!2d-46.6558!3d-23.5645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c0776a!2sAv.%20Paulista%2C%201048%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001310-100!5e0!3m2!1spt-BR!2sbr!4v1711000000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização do consultório na Av. Paulista"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
