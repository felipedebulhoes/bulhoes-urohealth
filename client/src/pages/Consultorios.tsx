import { trackDoctoraliaClick } from "@/lib/analytics";
/*
 * Design: Clinical Precision — Swiss Medical Design
 * Página real /consultorios — Listagem completa dos locais de atendimento
 * Criada para resolver Soft 404 no Google Search Console
 */
import { Link } from "wouter";
import { usePageMeta } from "@/hooks/usePageMeta";
import { BreadcrumbSchema } from "@/components/SchemaMarkup";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Clock,
  Building2,
  ShieldCheck,
  CreditCard,
  Monitor,
  ArrowLeft,
  Calendar,
  ChevronRight,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsAppButton from "@/components/WhatsAppButton";
import InteractiveMap from "@/components/InteractiveMap";

const LOGO_URL = "/manus-storage/logo-landscape_be6628b3.svg";
const CAMPINAS_IMG = "/manus-storage/campinas-day-hospital_47df2b14_d5a9cb24.webp";
const CLINOVI_PAULISTA_IMG = "/manus-storage/clinovi-paulista_42fff2fa_cecba450.webp";
const CLINOVI_MOEMA_IMG = "/manus-storage/clinovi-moema_b149b069_cd29f980.webp";
const CLINOVI_PINHEIROS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/clinovi-pinheiros_cec58be4.webp";
const CLINOVI_SBC_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/clinovi-sbc_c192552c.webp";

const locations = [
  {
    name: "Campinas Day Hospital",
    slug: "campinas-day-hospital",
    type: "Particular",
    typeColor: "text-[#D4884A] bg-[#D4884A]/10",
    image: CAMPINAS_IMG,
    address: "Av. Benjamin Constant, 1991",
    neighborhood: "Cambuí, Campinas - SP",
    cep: "CEP 13025-005",
    phone: "(19) 2127-2900",
    whatsapp: "(19) 99855-9890",
    hours: "Sextas, 8h às 12h",
    highlight: "Centro Urológico Avançado",
    description: "Centro cirúrgico moderno e completo, equipado com tecnologia de ponta para procedimentos urológicos. Estrutura para cirurgias ambulatoriais e internação de curta permanência.",
    insurances: null,
    payment: null,
  },
  {
    name: "Clinovi Paulista",
    slug: "clinovi-paulista",
    type: "Particular",
    typeColor: "text-amber-400 bg-amber-400/10",
    image: CLINOVI_PAULISTA_IMG,
    address: "Av. Paulista, 1048, 18° andar",
    neighborhood: "Bela Vista, São Paulo - SP",
    cep: "CEP 01310-100",
    phone: "(11) 3382-1529",
    whatsapp: null,
    hours: "Seg a Sáb — consulte horários no Doctoralia",
    highlight: "Cobertura de alto padrão",
    description: "Localizada na icônica Avenida Paulista, no coração de São Paulo. Ambiente moderno e acolhedor, com fácil acesso por metrô e transporte público.",
    insurances: null,
    payment: ["PIX", "Cartão de Crédito", "Cartão de Débito"],
  },
  {
    name: "Clinovi Moema",
    slug: "clinovi-moema",
    type: "Particular",
    typeColor: "text-amber-400 bg-amber-400/10",
    image: CLINOVI_MOEMA_IMG,
    address: "Av. Ibirapuera, 1835, 2° andar",
    neighborhood: "Moema, São Paulo - SP",
    cep: "",
    phone: "(11) 3382-1529",
    whatsapp: null,
    hours: "Seg a Sáb — consulte horários no Doctoralia",
    highlight: "Próximo ao metrô Moema",
    description: "Localizada em um dos bairros mais nobres de São Paulo, com fácil acesso pelo Aeroporto de Congonhas e estações de metrô. Ambiente sofisticado e confortável.",
    insurances: null,
    payment: ["PIX", "Cartão de Crédito", "Cartão de Débito"],
  },
  {
    name: "Clinovi Pinheiros",
    slug: "clinovi-pinheiros",
    type: "Particular",
    typeColor: "text-amber-400 bg-amber-400/10",
    image: CLINOVI_PINHEIROS_IMG,
    address: "Av. Rebouças, 2636",
    neighborhood: "Pinheiros, São Paulo - SP",
    cep: "",
    phone: "(11) 3382-1529",
    whatsapp: null,
    hours: "Seg a Sáb — consulte horários no Doctoralia",
    highlight: "Espaço moderno no ComVem Rebouças",
    description: "Localizada dentro do ComVem Rebouças, um espaço moderno e estratégico no bairro de Pinheiros. Infraestrutura de alto padrão com fácil acesso por transporte público.",
    insurances: null,
    payment: ["PIX", "Cartão de Crédito", "Cartão de Débito"],
  },
  {
    name: "Clinovi SBC",
    slug: "clinovi-sbc",
    type: "Particular",
    typeColor: "text-amber-400 bg-amber-400/10",
    image: CLINOVI_SBC_IMG,
    address: "Av. Pereira Barreto, 1479",
    neighborhood: "São Bernardo do Campo - SP",
    cep: "",
    phone: "(11) 3382-1529",
    whatsapp: null,
    hours: "Seg a Sáb — consulte horários no Doctoralia",
    highlight: "Edifício Helbor Trilogy",
    description: "Localizada no Edifício Helbor Trilogy, em São Bernardo do Campo. Mais de 1.000m² de infraestrutura completa na divisão entre Santo André e São Caetano do Sul.",
    insurances: null,
    payment: ["PIX", "Cartão de Crédito", "Cartão de Débito"],
  },
];

export default function Consultorios() {
  usePageMeta({
    title: "Consultórios e Locais de Atendimento",
    description: "Conheça os consultórios do Dr. Felipe de Bulhões: Campinas Day Hospital, São Luiz Campinas, Clinovi Paulista, Moema, Pinheiros e SBC. Atendimento presencial e teleconsulta.",
    canonical: "https://felipebulhoes.com/consultorios",
  });

  return (
    <>
    <BreadcrumbSchema items={[
      { name: "Início", url: "/" },
      { name: "Consultórios", url: "/consultorios" },
    ]} />
    <div className="min-h-screen bg-white dark:bg-card">
      {/* Header */}
      <header className="bg-[#1C3D5A] py-4 sticky top-0 z-50">
        <div className="container flex items-center justify-between">
          <Link href="/">
            <img loading="lazy" src={LOGO_URL} alt="Dr. Felipe de Bulhões - Urologista" className="h-12 lg:h-14 w-auto brightness-0 invert" />
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="outline" className="text-white border-white/20 hover:bg-white/10 bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <a href="https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas?utm_source=site&utm_medium=page&utm_campaign=consultorios" target="_blank" rel="noopener noreferrer" className="hidden sm:block" onClick={() => trackDoctoraliaClick("consultorios")}>
              <Button className="bg-[#B87333] hover:bg-[#8B5A2B] text-white">
                <Phone className="w-4 h-4 mr-2" />
                Agendar Consulta
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#1C3D5A] to-[#0F3460] py-16 lg:py-24">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-[#B87333]" />
              <span className="text-[#B87333] text-sm font-semibold uppercase tracking-[0.15em]">Onde Atendo</span>
            </div>
            <h1 className="text-3xl lg:text-5xl text-white leading-tight mb-4">
              Consultórios e Locais de Atendimento
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">
              Atendimento presencial em 5 locais — Campinas, São Paulo e ABC Paulista — além de teleconsulta por vídeo para todo o Brasil. Escolha o consultório mais conveniente para você.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Location Cards */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {locations.map((loc, i) => (
              <motion.div
                key={loc.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="bg-[#F8FAFB] rounded-xl overflow-hidden border border-[#1C3D5A]/6 hover:shadow-lg transition-shadow"
              >
                {/* Photo */}
                <div className="relative h-52 overflow-hidden">
                  <img loading="lazy" src={loc.image} alt={loc.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <h2 className="text-white font-semibold text-lg font-sans">{loc.name}</h2>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <span className={`inline-block text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full mb-4 ${loc.typeColor}`}>
                    {loc.type}
                  </span>

                  <p className="text-sm text-[#334155] leading-relaxed mb-4">{loc.description}</p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#B87333] mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm text-[#1C3D5A] dark:text-foreground font-sans font-medium">{loc.address}</p>
                        <p className="text-xs text-[#1C3D5A] dark:text-foreground/50 font-sans">{loc.neighborhood}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#B87333] shrink-0" />
                      <span className="text-sm text-[#1C3D5A] dark:text-foreground/70 font-sans">{loc.phone}</span>
                    </div>

                    {loc.whatsapp && (
                      <a href={`https://wa.me/55${loc.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
                        <Phone className="w-4 h-4 text-[#25D366] shrink-0" />
                        <span className="text-sm text-[#25D366] font-sans">WhatsApp: {loc.whatsapp}</span>
                      </a>
                    )}

                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-[#B87333] shrink-0" />
                      <span className="text-xs text-[#1C3D5A] dark:text-foreground/50 font-sans">{loc.hours}</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Building2 className="w-4 h-4 text-[#B87333] shrink-0" />
                      <span className="text-xs text-[#B87333] font-semibold font-sans">{loc.highlight}</span>
                    </div>
                  </div>

                  {/* Payment methods */}
                  {loc.payment && (
                    <div className="mt-4 pt-4 border-t border-[#1C3D5A]/6">
                      <div className="flex items-center gap-2 mb-2">
                        <CreditCard className="w-3.5 h-3.5 text-[#B87333]" />
                        <span className="text-[10px] uppercase tracking-wider text-[#1C3D5A] dark:text-foreground/40 font-semibold">Formas de pagamento</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {loc.payment.map((method) => (
                          <span key={method} className="text-[10px] font-medium text-[#1C3D5A] dark:text-foreground/50 bg-white dark:bg-card rounded px-2 py-1 border border-[#1C3D5A]/6 font-sans">{method}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Link to detail page */}
                  <Link href={`/local/${loc.slug}`} className="mt-4 inline-flex items-center gap-1 text-sm text-[#B87333] hover:underline font-medium">
                    Ver detalhes <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Teleconsulta card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gradient-to-r from-[#1C3D5A] to-[#0D3B5C] rounded-xl p-6 lg:p-8 flex flex-col md:flex-row items-center gap-6 mb-12"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#B87333]/20 flex items-center justify-center shrink-0">
              <Monitor className="w-8 h-8 text-[#D4884A]" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg font-semibold text-white font-sans mb-1">Teleconsulta</h3>
              <p className="text-sm text-white/60 font-sans leading-relaxed">
                Atendimento online por vídeo para acompanhamento, segunda opinião e orientações.
                Ideal para pacientes de outras cidades ou que preferem a comodidade do atendimento remoto.
                Mesmo valor da consulta presencial.
              </p>
            </div>
            <a href="/agendamento" className="shrink-0">
              <button className="bg-[#B87333] hover:bg-[#8B5A2B] text-white rounded-lg px-6 py-3 text-sm font-semibold transition-colors flex items-center gap-2">
                <Video className="w-4 h-4" />
                Agendar Teleconsulta
              </button>
            </a>
          </motion.div>

          {/* Interactive Map */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-[#B87333]" />
              <span className="text-[#B87333] text-xs font-semibold uppercase tracking-[0.15em]">Mapa Interativo</span>
            </div>
            <InteractiveMap />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#1C3D5A] to-[#0F3460]">
        <div className="container text-center">
          <h2 className="text-2xl lg:text-3xl text-white mb-3 font-serif">Agende sua consulta</h2>
          <p className="text-white/50 text-sm mb-6 max-w-lg mx-auto">
            Escolha o consultório mais conveniente e agende presencialmente ou por teleconsulta.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/agendamento">
              <Button className="bg-[#B87333] hover:bg-[#8B5A2B] text-white px-6 h-11">
                <Calendar className="w-4 h-4 mr-2" />
                Agendar Consulta
              </Button>
            </Link>
            <a href="https://wa.me/5511981124455?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta." target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="text-white border-white/20 hover:bg-white/10 bg-transparent px-6 h-11">
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F2A3F] py-8">
        <div className="container text-center">
          <p className="text-white/30 text-sm">&copy; {new Date().getFullYear()} Dr. Felipe de Bulhões — Urologista | CRM-SP 202291</p>
          <p className="text-white/20 text-xs mt-2">Este conteúdo é informativo e não substitui a consulta médica.</p>
        </div>
      </footer>

      <WhatsAppButton message="Olá! Vi os consultórios do Dr. Felipe de Bulhões e gostaria de agendar uma consulta." source="consultorios" />
    </div>
    </>
  );
}
