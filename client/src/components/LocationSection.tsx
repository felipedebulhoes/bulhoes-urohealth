/*
 * Design: Clinical Precision — Swiss Medical Design
 * Location: 3 clinics + teleconsulta + interactive Google Map with all markers
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, Phone, CreditCard, Monitor, Building2, ShieldCheck, Wallet } from "lucide-react";
import InteractiveMap from "@/components/InteractiveMap";

const CAMPINAS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/campinas-day-hospital_47df2b14.jpg";
const CLINOVI_PAULISTA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/clinovi-paulista_42fff2fa.jpg";
const CLINOVI_MOEMA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/clinovi-moema_b149b069.jpg";
const CLINOVI_PINHEIROS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/clinovi-pinheiros_cec58be4.webp";
const CLINOVI_SBC_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/clinovi-sbc_c192552c.webp";
const SAO_LUIZ_CAMPINAS_IMG = "/manus-storage/sao-luiz-campinas_d1e11d89.webp";

const locations = [
  {
    name: "Campinas Day Hospital",
    type: "Convênios & Particular",
    typeColor: "text-[#5EEAD4] bg-[#5EEAD4]/10",
    image: CAMPINAS_IMG,
    address: "Av. Benjamin Constant, 1991",
    neighborhood: "Cambuí, Campinas - SP",
    cep: "CEP 13025-005",
    phone: "(19) 2127-2900",
    whatsapp: "(19) 99855-9890",
    hours: "Sextas, 8h às 12h",
    highlight: "Centro Urológico Avançado",
    insurances: ["Bradesco Saúde", "Sul América", "Allianz", "Cassi", "GAMA Saúde", "e outros"],
  },
  {
    name: "Clinovi Paulista",
    type: "Apenas Particular",
    typeColor: "text-amber-400 bg-amber-400/10",
    image: CLINOVI_PAULISTA_IMG,
    address: "Av. Paulista, 1048, 18° andar",
    neighborhood: "Bela Vista, São Paulo - SP",
    cep: "CEP 01310-100",
    phone: "(11) 3382-1529",
    hours: "Seg a Sáb — consulte horários no Doctoralia",
    highlight: "Cobertura de alto padrão",
    insurances: null,
    payment: ["PIX", "Cartão de Crédito", "Cartão de Débito"],
  },
  {
    name: "Clinovi Moema",
    type: "Apenas Particular",
    typeColor: "text-amber-400 bg-amber-400/10",
    image: CLINOVI_MOEMA_IMG,
    address: "Av. Ibirapuera, 1835, 2° andar",
    neighborhood: "Moema, São Paulo - SP",
    cep: "",
    phone: "(11) 3382-1529",
    hours: "Seg a Sáb — consulte horários no Doctoralia",
    highlight: "Próximo ao metrô Moema",
    insurances: null,
    payment: ["PIX", "Cartão de Crédito", "Cartão de Débito"],
  },
  {
    name: "Clinovi Pinheiros",
    type: "Apenas Particular",
    typeColor: "text-amber-400 bg-amber-400/10",
    image: CLINOVI_PINHEIROS_IMG,
    address: "Av. Rebouças, 2636",
    neighborhood: "Pinheiros, São Paulo - SP",
    cep: "",
    phone: "(11) 3382-1529",
    hours: "Seg a Sáb — consulte horários no Doctoralia",
    highlight: "Espaço moderno no ComVem Rebouças",
    insurances: null,
    payment: ["PIX", "Cartão de Crédito", "Cartão de Débito"],
  },
  {
    name: "Clinovi SBC",
    type: "Apenas Particular",
    typeColor: "text-amber-400 bg-amber-400/10",
    image: CLINOVI_SBC_IMG,
    address: "Av. Pereira Barreto, 1479",
    neighborhood: "São Bernardo do Campo - SP",
    cep: "",
    phone: "(11) 3382-1529",
    hours: "Seg a Sáb — consulte horários no Doctoralia",
    highlight: "Edifício Helbor Trilogy",
    insurances: null,
    payment: ["PIX", "Cartão de Crédito", "Cartão de Débito"],
  },
  {
    name: "CEMED São Luiz Campinas",
    type: "Convênios & Particular",
    typeColor: "text-[#5EEAD4] bg-[#5EEAD4]/10",
    image: SAO_LUIZ_CAMPINAS_IMG,
    address: "Av. Andrade Neves, 863, 4° andar",
    neighborhood: "Centro, Campinas - SP",
    cep: "",
    phone: "(19) 3014-3000",
    hours: "Sextas, 13h às 17h",
    highlight: "Hospital Rede D'Or — Acreditação JCI",
    insurances: ["Bradesco", "SulAmérica", "Amil", "Porto Seguro", "Mediservice", "e outros"],
  },
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
          <p className="text-[#0A2540]/50 font-sans mt-3 max-w-2xl text-base">
            Atendimento presencial em 6 locais — Campinas, São Paulo e ABC — além de teleconsulta por vídeo.
          </p>
        </motion.div>

        {/* Location cards */}
        <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8">
          {locations.map((loc, i) => (
            <motion.div
              key={loc.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="bg-[#F8FAFB] rounded-xl overflow-hidden border border-[#0A2540]/6 hover:shadow-lg transition-shadow"
            >
              {/* Photo */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <h3 className="text-white font-semibold text-base font-sans">{loc.name}</h3>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <span className={`inline-block text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full mb-4 ${loc.typeColor}`}>
                  {loc.type}
                </span>

                <div className="space-y-3">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#0D9488] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm text-[#0A2540] font-sans font-medium">{loc.address}</p>
                      <p className="text-xs text-[#0A2540]/50 font-sans">{loc.neighborhood}</p>
                    </div>
                  </div>

                  {loc.phone && (
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#0D9488] shrink-0" />
                      <span className="text-sm text-[#0A2540]/70 font-sans">{loc.phone}</span>
                    </div>
                  )}

                  {loc.whatsapp && (
                    <a href={`https://wa.me/55${loc.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
                      <Phone className="w-4 h-4 text-[#25D366] shrink-0" />
                      <span className="text-sm text-[#25D366] font-sans">WhatsApp: {loc.whatsapp}</span>
                    </a>
                  )}

                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#0D9488] shrink-0" />
                    <span className="text-xs text-[#0A2540]/50 font-sans">{loc.hours}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-4 h-4 text-[#0D9488] shrink-0" />
                    <span className="text-xs text-[#0D9488] font-semibold font-sans">{loc.highlight}</span>
                  </div>
                </div>

                {/* Payment methods (Clinovi) */}
                {loc.payment && (
                  <div className="mt-4 pt-4 border-t border-[#0A2540]/6">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="w-3.5 h-3.5 text-[#0D9488]" />
                      <span className="text-[10px] uppercase tracking-wider text-[#0A2540]/40 font-semibold">Formas de pagamento</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {loc.payment.map((method: string) => (
                        <span
                          key={method}
                          className="text-[10px] font-medium text-[#0A2540]/50 bg-white rounded px-2 py-1 border border-[#0A2540]/6 font-sans"
                        >
                          {method}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Insurances */}
                {loc.insurances && (
                  <div className="mt-4 pt-4 border-t border-[#0A2540]/6">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#0D9488]" />
                      <span className="text-[10px] uppercase tracking-wider text-[#0A2540]/40 font-semibold">Convênios aceitos</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {loc.insurances.map((ins) => (
                        <span
                          key={ins}
                          className="text-[10px] font-medium text-[#0A2540]/50 bg-white rounded px-2 py-1 border border-[#0A2540]/6 font-sans"
                        >
                          {ins}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Teleconsulta card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-r from-[#0A2540] to-[#0D3B5C] rounded-xl p-6 lg:p-8 flex flex-col md:flex-row items-center gap-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-[#0D9488]/20 flex items-center justify-center shrink-0">
            <Monitor className="w-8 h-8 text-[#5EEAD4]" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-lg font-semibold text-white font-sans mb-1">Teleconsulta</h3>
            <p className="text-sm text-white/60 font-sans leading-relaxed">
              Atendimento online por vídeo para acompanhamento, segunda opinião e orientações.
              Ideal para pacientes de outras cidades ou que preferem a comodidade do atendimento remoto.
            </p>
          </div>
          <div className="text-center md:text-right shrink-0">
            <p className="text-2xl font-bold text-[#5EEAD4] font-sans">R$ 800</p>
            <p className="text-xs text-white/40 font-sans mt-1">A partir de</p>
          </div>
          <a
            href="#agendamento"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("agendamento")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="shrink-0"
          >
            <button className="bg-[#0D9488] hover:bg-[#0B7C72] text-white rounded-lg px-6 py-3 text-sm font-semibold transition-colors">
              Agendar Teleconsulta
            </button>
          </a>
        </motion.div>

        {/* Interactive Google Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-[#0D9488]" />
            <span className="text-[#0D9488] text-xs font-semibold uppercase tracking-[0.15em]">
              Mapa Interativo
            </span>
          </div>
          <InteractiveMap />
        </motion.div>
      </div>
    </section>
  );
}
