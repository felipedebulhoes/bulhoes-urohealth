/*
 * LocationCardsSection — Interactive cards with direct booking links
 * Design: Clinical Precision — Swiss Medical Design
 * Each card has location details + a direct CTA to book
 */
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  MapPin,
  Clock,
  Phone,
  CreditCard,
  ShieldCheck,
  Calendar,
  ExternalLink,
  ChevronRight,
  Navigation,
} from "lucide-react";

interface LocationData {
  name: string;
  shortName: string;
  type: "particular" | "convenio";
  typeLabel: string;
  image: string;
  address: string;
  neighborhood: string;
  phone: string;
  whatsapp?: string;
  hours: string;
  highlight: string;
  insurances?: string[];
  payment?: string[];
  bookingUrl: string;
  bookingLabel: string;
  mapUrl: string;
  slug: string;
}

const locations: LocationData[] = [
  {
    name: "Clinovi Paulista",
    shortName: "Paulista",
    type: "particular",
    typeLabel: "Particular",
    image: "/manus-storage/clinovi-paulista_42fff2fa_cecba450.webp",
    address: "Av. Paulista, 1048, 18° andar",
    neighborhood: "Bela Vista, São Paulo - SP",
    phone: "(11) 3382-1529",
    hours: "Seg a Sáb — consulte horários",
    highlight: "Vista panorâmica, 760m², 26 consultórios",
    payment: ["PIX", "Cartão de Crédito", "Cartão de Débito"],
    bookingUrl: "https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas",
    bookingLabel: "Agendar via Doctoralia",
    mapUrl: "https://maps.google.com/?q=Av.+Paulista+1048+Bela+Vista+São+Paulo",
    slug: "clinovi-paulista",
  },
  {
    name: "Clinovi Moema",
    shortName: "Moema",
    type: "particular",
    typeLabel: "Particular",
    image: "/manus-storage/clinovi-moema_b149b069_cd29f980.webp",
    address: "Av. Ibirapuera, 1835, 2° andar",
    neighborhood: "Moema, São Paulo - SP",
    phone: "(11) 3382-1529",
    hours: "Seg a Sáb — consulte horários",
    highlight: "1.040m², próximo ao Metrô Moema",
    payment: ["PIX", "Cartão de Crédito", "Cartão de Débito"],
    bookingUrl: "https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas",
    bookingLabel: "Agendar via Doctoralia",
    mapUrl: "https://maps.google.com/?q=Av.+Ibirapuera+1835+Moema+São+Paulo",
    slug: "clinovi-moema",
  },
  {
    name: "Clinovi Pinheiros",
    shortName: "Pinheiros",
    type: "particular",
    typeLabel: "Particular",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/clinovi-pinheiros_cec58be4.webp",
    address: "Av. Rebouças, 2636",
    neighborhood: "Pinheiros, São Paulo - SP",
    phone: "(11) 3382-1529",
    hours: "Seg a Sáb — consulte horários",
    highlight: "ComVem Rebouças, próximo à Faria Lima",
    payment: ["PIX", "Cartão de Crédito", "Cartão de Débito"],
    bookingUrl: "https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas",
    bookingLabel: "Agendar via Doctoralia",
    mapUrl: "https://maps.google.com/?q=Av.+Rebouças+2636+Pinheiros+São+Paulo",
    slug: "clinovi-pinheiros",
  },
  {
    name: "Clinovi SBC",
    shortName: "ABC",
    type: "particular",
    typeLabel: "Particular",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/clinovi-sbc_c192552c.webp",
    address: "Av. Pereira Barreto, 1479",
    neighborhood: "São Bernardo do Campo - SP",
    phone: "(11) 3382-1529",
    hours: "Seg a Sáb — consulte horários",
    highlight: "Edifício Helbor Trilogy, 1.000m²+",
    payment: ["PIX", "Cartão de Crédito", "Cartão de Débito"],
    bookingUrl: "https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas",
    bookingLabel: "Agendar via Doctoralia",
    mapUrl: "https://maps.google.com/?q=Av.+Pereira+Barreto+1479+São+Bernardo+do+Campo",
    slug: "clinovi-sbc",
  },
  {
    name: "CEMED São Luiz Campinas",
    shortName: "Rede D'Or",
    type: "convenio",
    typeLabel: "Convênios & Particular",
    image: "/manus-storage/sao-luiz-campinas-fachada_a326a12f.webp",
    address: "Av. Andrade Neves, 863, 4° andar",
    neighborhood: "Centro, Campinas - SP",
    phone: "(19) 3014-3000",
    hours: "Sextas, 13h às 17h",
    highlight: "Hospital Rede D'Or — Acreditação JCI",
    insurances: ["Bradesco", "SulAmérica", "Amil", "Porto Seguro", "Mediservice", "Allianz"],
    bookingUrl: "https://www.rededorsaoluiz.com.br/encontre-um-medico/perfil/felipe-de-bulhoes-ojeda",
    bookingLabel: "Agendar pela Rede D'Or",
    mapUrl: "https://maps.google.com/?q=Av.+Andrade+Neves+863+Centro+Campinas",
    slug: "cemed-sao-luiz-campinas",
  },
  {
    name: "Campinas Day Hospital",
    shortName: "Campinas",
    type: "convenio",
    typeLabel: "Convênios & Particular",
    image: "/manus-storage/campinas-day-hospital_47df2b14_d5a9cb24.webp",
    address: "Av. Benjamin Constant, 1991",
    neighborhood: "Cambuí, Campinas - SP",
    phone: "(19) 2127-2900",
    whatsapp: "(19) 99855-9890",
    hours: "Sextas, 8h às 12h",
    highlight: "Centro Urológico Avançado",
    insurances: ["Bradesco Saúde", "Sul América", "Allianz", "Cassi", "GAMA Saúde"],
    bookingUrl: "https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas",
    bookingLabel: "Agendar via Doctoralia",
    mapUrl: "https://maps.google.com/?q=Av.+Benjamin+Constant+1991+Cambuí+Campinas",
    slug: "campinas-day-hospital",
  },
];

function LocationCard({ loc, index, isInView }: { loc: LocationData; index: number; isInView: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white dark:bg-card rounded-2xl overflow-hidden border border-[#1C3D5A]/8 hover:border-[#B87333]/40 shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Image with overlay */}
      <div className="relative h-44 overflow-hidden">
        <img
          loading="lazy"
          src={loc.image}
          alt={`Consultório ${loc.name}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Type badge */}
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold px-2.5 py-1.5 rounded-full backdrop-blur-sm ${
            loc.type === "convenio"
              ? "bg-[#D4884A]/90 text-white"
              : "bg-white/90 text-[#1C3D5A]"
          }`}>
            {loc.type === "convenio" ? (
              <ShieldCheck className="w-3 h-3" />
            ) : (
              <CreditCard className="w-3 h-3" />
            )}
            {loc.typeLabel}
          </span>
        </div>

        {/* Name overlay */}
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="text-white font-semibold text-lg font-sans leading-tight drop-shadow-md">
            {loc.name}
          </h3>
          <p className="text-white/70 text-xs mt-0.5">{loc.highlight}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Address & details */}
        <div className="space-y-2.5 mb-4">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[#B87333] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm text-[#1C3D5A] dark:text-foreground font-medium font-sans">{loc.address}</p>
              <p className="text-xs text-[#1C3D5A]/60 dark:text-foreground/50 font-sans">{loc.neighborhood}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-[#B87333] shrink-0" />
            <span className="text-xs text-[#1C3D5A]/70 dark:text-foreground/60 font-sans">{loc.hours}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-[#B87333] shrink-0" />
            <a href={`tel:${loc.phone.replace(/[^0-9]/g, '')}`} className="text-sm text-[#1C3D5A]/70 dark:text-foreground/60 font-sans hover:text-[#B87333] transition-colors">
              {loc.phone}
            </a>
          </div>
        </div>

        {/* Insurances or Payment */}
        {loc.insurances && (
          <div className="mb-4 pb-4 border-b border-[#1C3D5A]/6">
            <div className="flex items-center gap-1.5 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B87333]" />
              <span className="text-[10px] uppercase tracking-wider text-[#1C3D5A]/50 dark:text-foreground/40 font-semibold">Convênios</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {loc.insurances.map((ins) => (
                <span key={ins} className="text-[10px] font-medium text-[#1C3D5A]/70 dark:text-foreground/50 bg-[#F0F4F8] dark:bg-card rounded px-2 py-0.5 font-sans">
                  {ins}
                </span>
              ))}
            </div>
          </div>
        )}

        {loc.payment && (
          <div className="mb-4 pb-4 border-b border-[#1C3D5A]/6">
            <div className="flex items-center gap-1.5 mb-2">
              <CreditCard className="w-3.5 h-3.5 text-[#B87333]" />
              <span className="text-[10px] uppercase tracking-wider text-[#1C3D5A]/50 dark:text-foreground/40 font-semibold">Pagamento</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {loc.payment.map((method) => (
                <span key={method} className="text-[10px] font-medium text-[#1C3D5A]/70 dark:text-foreground/50 bg-[#F0F4F8] dark:bg-card rounded px-2 py-0.5 font-sans">
                  {method}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col gap-2">
          <a
            href={loc.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#B87333] hover:bg-[#8B5A2B] text-white rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Calendar className="w-4 h-4" />
            {loc.bookingLabel}
            <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-60" />
          </a>
          
          <div className="flex gap-2">
            <a
              href={loc.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 flex-1 bg-[#F0F4F8] dark:bg-muted hover:bg-[#E8EDF2] text-[#1C3D5A] dark:text-foreground rounded-lg px-3 py-2 text-xs font-medium transition-colors"
            >
              <Navigation className="w-3.5 h-3.5" />
              Como chegar
            </a>
            <a
              href={`/local/${loc.slug}`}
              className="flex items-center justify-center gap-1.5 flex-1 bg-[#F0F4F8] dark:bg-muted hover:bg-[#E8EDF2] text-[#1C3D5A] dark:text-foreground rounded-lg px-3 py-2 text-xs font-medium transition-colors"
            >
              Mais detalhes
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 rounded-2xl ring-1 ring-[#B87333]/30" />
      </div>
    </motion.div>
  );
}

export default function LocationCardsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="locais-atendimento" className="py-20 lg:py-28 bg-[#F8FAFB] dark:bg-background" ref={ref}>
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#B87333]" />
            <span className="text-[#B87333] text-sm font-semibold uppercase tracking-[0.15em]">
              Agende sua Consulta
            </span>
            <div className="h-px w-10 bg-[#B87333]" />
          </div>
          <h2 className="text-3xl lg:text-4xl text-[#1C3D5A] dark:text-foreground leading-tight font-semibold">
            Locais de Atendimento
          </h2>
          <p className="text-[#1C3D5A]/60 dark:text-foreground/50 font-sans mt-3 max-w-2xl mx-auto text-base">
            Atendimento presencial em <strong className="text-[#1C3D5A] dark:text-foreground">6 locais</strong> — São Paulo, ABC Paulista e Campinas. 
            Escolha o mais conveniente e agende diretamente.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((loc, i) => (
            <LocationCard key={loc.slug} loc={loc} index={i} isInView={isInView} />
          ))}
        </div>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-[#1C3D5A]/50 dark:text-foreground/40 font-sans mb-3">
            Dúvidas sobre qual unidade escolher?
          </p>
          <a
            href="https://wa.me/5511981124455?text=Olá! Gostaria de agendar uma consulta com o Dr. Felipe de Bulhões."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white rounded-full px-6 py-3 text-sm font-semibold transition-colors shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Fale conosco pelo WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
