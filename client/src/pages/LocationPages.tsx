/*
 * Design: Clinical Precision — Swiss Medical Design
 * Location Pages individuais para SEO local
 */
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Clock,
  CheckCircle2,
  Calendar,
  Shield,
  Car,
  ChevronRight,
  Star,
  Video,
  Building2,
  CreditCard,
} from "lucide-react";
import { Link } from "wouter";
import { MedicalClinicSchema, BreadcrumbSchema } from "@/components/SchemaMarkup";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

const LOGO_URL = "https://cdn.manus.space/webdev/bulhoes-urohealth/logo_min8.webp";

interface LocationData {
  name: string;
  fullName: string;
  address: string;
  city: string;
  type: "convenio" | "particular";
  typeLabel: string;
  phone: string;
  whatsapp?: string;
  mapUrl: string;
  mapEmbed: string;
  hours: string[];
  services: string[];
  parking: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  insurances?: string[];
  payment?: string[];
  accentColor: string;
  bookingUrl?: string;
  bookingLabel?: string;
}

const locations: Record<string, LocationData> = {
  "campinas-day-hospital": {
    name: "Campinas Day Hospital",
    fullName: "Campinas Day Hospital",
    address: "Av. Benjamin Constant, 1991 — Cambuí",
    city: "Campinas, SP",
    type: "convenio",
    typeLabel: "Convênios e Particular",
    phone: "(19) 2127-2900",
    whatsapp: "(19) 99855-9890",
    mapUrl: "https://maps.google.com/?q=Campinas+Day+Hospital",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.5!2d-47.06!3d-22.89!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDUzJzI0LjAiUyA0N8KwMDMnMzYuMCJX!5e0!3m2!1spt-BR!2sbr!4v1",
    hours: ["Sexta-feira: 8h às 12h"],
    services: ["Consultas", "Cirurgias", "Urodinâmica", "Exames", "Procedimentos ambulatoriais"],
    parking: "Estacionamento próprio gratuito",
    description: "O Campinas Day Hospital é um centro cirúrgico moderno e completo, equipado com tecnologia de ponta para procedimentos urológicos. Localizado no Cambuí em Campinas, oferece atendimento por convênios e particular, com estrutura para cirurgias ambulatoriais e internação de curta permanência.",
    metaTitle: "Urologista em Campinas — Campinas Day Hospital | Dr. Felipe de Bulhões",
    metaDescription: "Urologista em Campinas no Campinas Day Hospital. Atendimento por convênios e particular. Cirurgias minimamente invasivas, urodinâmica e consultas.",
    insurances: ["Allianz", "Amil", "Assefaz", "Bradesco", "Cassi", "Gama", "Go Care", "Holambra", "Medservice", "Porto Seguro", "Skill/Omint", "SulAmérica", "Unimed"],
    accentColor: "#2563EB",
  },
  "clinovi-paulista": {
    name: "Clinovi Paulista",
    fullName: "Clinovi — Av. Paulista",
    address: "Av. Paulista",
    city: "São Paulo, SP",
    type: "particular",
    typeLabel: "Apenas Particular",
    phone: "(11) 3382-1529",
    mapUrl: "https://maps.google.com/?q=Clinovi+Paulista+São+Paulo",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0!2d-46.65!3d-23.56!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzM2LjAiUyA0NsKwMzknMDAuMCJX!5e0!3m2!1spt-BR!2sbr!4v1",
    hours: ["Segunda a Sábado", "Horários variáveis — consulte a agenda no Doctoralia"],
    services: ["Consultas", "Teleconsulta", "Procedimentos ambulatoriais", "Acompanhamento pós-operatório"],
    parking: "Estacionamentos conveniados na região",
    description: "A Clinovi Paulista está localizada na icônica Avenida Paulista, no coração de São Paulo. Oferece atendimento particular em ambiente moderno e acolhedor, com fácil acesso por metrô e transporte público. Ideal para consultas, acompanhamento e procedimentos ambulatoriais. Pagamento no local via PIX, cartão de crédito ou débito.",
    metaTitle: "Urologista na Av. Paulista — Clinovi | Dr. Felipe de Bulhões",
    metaDescription: "Urologista na Av. Paulista em São Paulo. Atendimento particular na Clinovi. Consultas, teleconsulta e procedimentos ambulatoriais.",
    payment: ["PIX", "Cartão de Crédito", "Cartão de Débito"],
    accentColor: "#0D9488",
  },
  "clinovi-moema": {
    name: "Clinovi Moema",
    fullName: "Clinovi — Moema",
    address: "Moema",
    city: "São Paulo, SP",
    type: "particular",
    typeLabel: "Apenas Particular",
    phone: "(11) 3382-1529",
    mapUrl: "https://maps.google.com/?q=Clinovi+Moema+São+Paulo",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.0!2d-46.66!3d-23.60!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDM2JzAwLjAiUyA0NsKwMzknMzYuMCJX!5e0!3m2!1spt-BR!2sbr!4v1",
    hours: ["Segunda a Sábado", "Horários variáveis — consulte a agenda no Doctoralia"],
    services: ["Consultas", "Teleconsulta", "Procedimentos ambulatoriais", "Acompanhamento pós-operatório"],
    parking: "Estacionamentos conveniados na região",
    description: "A Clinovi Moema está localizada em um dos bairros mais nobres de São Paulo, com fácil acesso pelo Aeroporto de Congonhas e estações de metrô. Oferece atendimento particular em ambiente sofisticado e confortável, ideal para pacientes que buscam privacidade e conveniência. Pagamento no local via PIX, cartão de crédito ou débito.",
    metaTitle: "Urologista em Moema — Clinovi | Dr. Felipe de Bulhões",
    metaDescription: "Urologista em Moema, São Paulo. Atendimento particular na Clinovi. Consultas, teleconsulta e procedimentos ambulatoriais.",
    payment: ["PIX", "Cartão de Crédito", "Cartão de Débito"],
    accentColor: "#7C3AED",
  },
  "clinovi-pinheiros": {
    name: "Clinovi Pinheiros",
    fullName: "Clinovi — Pinheiros",
    address: "Av. Rebouças, 2636",
    city: "São Paulo, SP",
    type: "particular",
    typeLabel: "Apenas Particular",
    phone: "(11) 3382-1529",
    mapUrl: "https://maps.google.com/?q=Av.+Rebou%C3%A7as+2636+Pinheiros+S%C3%A3o+Paulo",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0!2d-46.678!3d-23.562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzQzLjAiUyA0NsKwNDAnNDAuMCJX!5e0!3m2!1spt-BR!2sbr!4v1",
    hours: ["Segunda a Sábado", "Horários variáveis — consulte a agenda no Doctoralia"],
    services: ["Consultas", "Teleconsulta", "Procedimentos ambulatoriais", "Acompanhamento pós-operatório"],
    parking: "Estacionamento no próprio edifício ComVem Rebouças",
    description: "A Clinovi Pinheiros está localizada dentro do ComVem Rebouças, um espaço moderno e estratégico no bairro de Pinheiros, São Paulo. Oferece atendimento particular em infraestrutura de alto padrão, com fácil acesso por transporte público e estacionamento no local. Pagamento via PIX, cartão de crédito ou débito.",
    metaTitle: "Urologista em Pinheiros — Clinovi | Dr. Felipe de Bulhões",
    metaDescription: "Urologista em Pinheiros, São Paulo. Atendimento particular na Clinovi. Consultas, teleconsulta e procedimentos ambulatoriais na Av. Rebouças.",
    payment: ["PIX", "Cartão de Crédito", "Cartão de Débito"],
    accentColor: "#D97706",
  },  "clinovi-sbc": {
    name: "Clinovi SBC",
    fullName: "Clinovi — São Bernardo do Campo",
    address: "Av. Pereira Barreto, 1479",
    city: "São Bernardo do Campo, SP",
    type: "particular",
    typeLabel: "Apenas Particular",
    phone: "(11) 3382-1529",
    mapUrl: "https://maps.google.com/?q=Av.+Pereira+Barreto+1479+S%C3%A3o+Bernardo+do+Campo",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.0!2d-46.565!3d-23.696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQxJzQ1LjAiUyA0NsKwMzMnNTQuMCJX!5e0!3m2!1spt-BR!2sbr!4v1",
    hours: ["Segunda a Sábado", "Horários variáveis — consulte a agenda no Doctoralia"],
    services: ["Consultas", "Teleconsulta", "Procedimentos ambulatoriais", "Acompanhamento pós-operatório"],
    parking: "Estacionamento no Edifício Helbor Trilogy",
    description: "A Clinovi SBC está localizada no Edifício Helbor Trilogy, em São Bernardo do Campo, na divisa entre Santo André e São Caetano do Sul. Conta com mais de 1.000m² de infraestrutura completa e mais de 30 consultórios. Atendimento particular com pagamento via PIX, cartão de crédito ou débito.",
    metaTitle: "Urologista em São Bernardo do Campo — Clinovi SBC | Dr. Felipe de Bulhões",
    metaDescription: "Urologista em São Bernardo do Campo (ABC). Atendimento particular na Clinovi SBC. Consultas, teleconsulta e procedimentos ambulatoriais.",
    payment: ["PIX", "Cartão de Crédito", "Cartão de Débito"],
    accentColor: "#DC2626",
  },
  "cemed-sao-luiz-campinas": {
    name: "CEMED São Luiz Campinas",
    fullName: "Centro Médico São Luiz Campinas — Rede D'Or",
    address: "Av. Andrade Neves, 863, 4° andar — Centro",
    city: "Campinas, SP",
    type: "convenio",
    typeLabel: "Convênios e Particular",
    phone: "(19) 3014-3000",
    mapUrl: "https://maps.google.com/?q=Hospital+S%C3%A3o+Luiz+Campinas+Av+Andrade+Neves+863",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.3!2d-47.063!3d-22.902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8c8b4a2b4c5d7%3A0x1234567890abcdef!2sHospital+e+Maternidade+S%C3%A3o+Luiz+Campinas!5e0!3m2!1spt-BR!2sbr!4v1",
    hours: ["Sexta-feira: 13h às 17h"],
    services: ["Consultas", "Cirurgias", "Urodinâmica", "Exames", "Procedimentos ambulatoriais"],
    parking: "Estacionamento próprio do hospital",
    description: "O Centro Médico São Luiz Campinas (CEMED) faz parte do Hospital e Maternidade São Luiz Campinas, da Rede D'Or / Atlântica D'Or. Inaugurado em 2023, é um hospital geral de alta complexidade com acreditação internacional JCI. Localizado no Centro de Campinas, oferece atendimento por convênios e particular em infraestrutura hospitalar de alto padrão.",
    metaTitle: "Urologista em Campinas — CEMED São Luiz | Dr. Felipe de Bulhões",
    metaDescription: "Urologista em Campinas no Centro Médico São Luiz (Rede D'Or). Atendimento por convênios e particular. Consultas, cirurgias e exames urológicos.",
    insurances: ["Bradesco", "SulAmérica", "Amil", "Porto Seguro", "Mediservice", "Allianz", "Cassi"],
    accentColor: "#1D4ED8",
    bookingUrl: "https://www.rededorsaoluiz.com.br/paciente/marcar-consulta",
    bookingLabel: "Agendar pela Rede D'Or",
  },
};

function LocationPage({ slug }: { slug: string }) {
  const loc = locations[slug];

  if (!loc) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Localização não encontrada.</p>
      </div>
    );
  }

  // SEO meta tags
  if (typeof document !== "undefined") {
    document.title = loc.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", loc.metaDescription);
  }

  return (
    <div className="min-h-screen bg-white">
      <MedicalClinicSchema
        name={loc.fullName}
        description={loc.description}
        address={loc.address}
        city={loc.city}
        phone={loc.phone}
        slug={slug}
        type={loc.type}
        insurances={loc.insurances}
        services={loc.services}
        hours={loc.hours}
        paymentMethods={loc.payment}
      />
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Consultórios", url: "/consultorios" },
          { name: loc.fullName, url: `/local/${slug}` },
        ]}
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0A2540] via-[#0F3460] to-[#0A2540] text-white pt-28 pb-16">
        <div className="container max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/" className="text-white/60 hover:text-white text-sm flex items-center gap-1 mb-6 transition-colors">
              <ChevronRight className="w-4 h-4 rotate-180" /> Voltar ao início
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-6 h-6" style={{ color: loc.accentColor }} />
              <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: loc.accentColor + "20", color: loc.accentColor }}>
                {loc.typeLabel}
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold mb-4">{loc.fullName}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/70">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {loc.address} — {loc.city}
              </span>
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> {loc.phone}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Coluna principal */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
                <h2 className="text-xl font-bold text-[#0A2540] mb-4">Sobre o Local</h2>
                <p className="text-[#334155] leading-relaxed">{loc.description}</p>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
                <h2 className="text-xl font-bold text-[#0A2540] mb-4">Serviços Disponíveis</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {loc.services.map((s, i) => (
                    <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
                      <span className="text-sm text-[#334155]">{s}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {loc.insurances && (
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}>
                  <h2 className="text-xl font-bold text-[#0A2540] mb-4">Convênios Aceitos</h2>
                  <div className="flex flex-wrap gap-2">
                    {loc.insurances.map((ins, i) => (
                      <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-100">
                        {ins}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Mapa */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3}>
                <h2 className="text-xl font-bold text-[#0A2540] mb-4">Como Chegar</h2>
                <div className="rounded-xl overflow-hidden border border-gray-200 h-64">
                  <iframe
                    src={loc.mapEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Mapa ${loc.name}`}
                  />
                </div>
                <a
                  href={loc.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#0D9488] hover:underline mt-3"
                >
                  <MapPin className="w-4 h-4" /> Abrir no Google Maps
                </a>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 sticky top-24">
                <h3 className="font-bold text-[#0A2540] mb-4">Informações</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#0D9488] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-[#0A2540] mb-1">Horários</p>
                      {loc.hours.map((h, i) => (
                        <p key={i} className="text-xs text-[#64748B]">{h}</p>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Car className="w-5 h-5 text-[#0D9488] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-[#0A2540] mb-1">Estacionamento</p>
                      <p className="text-xs text-[#64748B]">{loc.parking}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-[#0D9488] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-[#0A2540] mb-1">Atendimento</p>
                      <p className="text-xs text-[#64748B]">{loc.typeLabel}</p>
                    </div>
                  </div>

                  {loc.payment && (
                    <div className="flex items-start gap-3">
                      <CreditCard className="w-5 h-5 text-[#0D9488] mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-[#0A2540] mb-1">Formas de Pagamento</p>
                        <p className="text-xs text-[#64748B]">{loc.payment.join(", ")}</p>
                      </div>
                    </div>
                  )}
                </div>

                <a
                  href={loc.bookingUrl || "https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#0D9488] hover:bg-[#0B8276] text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 mb-3"
                >
                  <Calendar className="w-4 h-4" />
                  {loc.bookingLabel || "Agendar Consulta"}
                </a>
                <a
                  href={loc.whatsapp ? `https://wa.me/55${loc.whatsapp.replace(/[^0-9]/g, '')}?text=Olá%2C%20gostaria%20de%20agendar%20uma%20consulta%20no%20${encodeURIComponent(loc.name)}.` : "https://wa.me/5511981124455?text=Olá%2C%20gostaria%20de%20tirar%20dúvidas%20sobre%20um%20tratamento."}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/5 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  WhatsApp {loc.whatsapp ? loc.whatsapp : "(11) 98112-4455"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outros locais */}
      <section className="py-12 bg-gray-50">
        <div className="container max-w-4xl">
          <h3 className="text-lg font-bold text-[#0A2540] mb-4">Outros Locais de Atendimento</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {Object.entries(locations)
              .filter(([key]) => key !== slug)
              .map(([key, other]) => (
                <Link key={key} href={`/local/${key}`} className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow block">
                  <h4 className="font-bold text-[#0A2540] text-sm mb-1">{other.name}</h4>
                  <p className="text-xs text-[#64748B] mb-2">{other.city}</p>
                  <span className="text-xs font-medium" style={{ color: other.accentColor }}>{other.typeLabel}</span>
                </Link>
              ))}
            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
              <Video className="w-5 h-5 text-indigo-500 mb-2" />
              <h4 className="font-bold text-[#0A2540] text-sm mb-1">Teleconsulta</h4>
              <p className="text-xs text-[#64748B]">Atendimento online para todo o Brasil</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function CampinasDayHospital() {
  return <LocationPage slug="campinas-day-hospital" />;
}

export function ClinoviPaulista() {
  return <LocationPage slug="clinovi-paulista" />;
}

export function ClinoviMoema() {
  return <LocationPage slug="clinovi-moema" />;
}

export function ClinoviPinheiros() {
  return <LocationPage slug="clinovi-pinheiros" />;
}

export function ClinoviSBC() {
  return <LocationPage slug="clinovi-sbc" />;
}

export function CemedSaoLuizCampinas() {
  return <LocationPage slug="cemed-sao-luiz-campinas" />;
}
