import { trackDoctoraliaClick, trackPhoneClick } from "@/lib/analytics";
/*
 * Design: Clinical Precision — Swiss Medical Design
 * Página real /consultorios — Listagem completa dos locais de atendimento
 * Criada para resolver Soft 404 no Google Search Console
 */
import { Link } from "wouter";
import { usePageMeta } from "@/hooks/usePageMeta";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
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
import MobileBottomBar from "@/components/MobileBottomBar";
import InteractiveMap from "@/components/InteractiveMap";
import { getWhatsAppUrl } from "@/lib/tracking";

const LOGO_URL = "/brand/logo-site-fundo-escuro.png";
const CAMPINAS_IMG = "/manus-storage/campinas-day-hospital_47df2b14_d5a9cb24.webp";
const CLINOVI_PAULISTA_IMG = "/manus-storage/clinovi-paulista_42fff2fa_cecba450.webp";
const CLINOVI_PINHEIROS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/clinovi-pinheiros_cec58be4.webp";
const CEMED_IMG = "/manus-storage/sao-luiz-campinas-fachada_a326a12f.webp";
const BADGE_CLASS = "text-[#6B5A4C] bg-[#C9B6A3]/25";

const locations = [
  {
    name: "Campinas Day Hospital",
    slug: "campinas-day-hospital",
    type: "Particular",
    typeColor: BADGE_CLASS,
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
    typeColor: BADGE_CLASS,
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
    name: "Clinovi Pinheiros",
    slug: "clinovi-pinheiros",
    type: "Particular",
    typeColor: BADGE_CLASS,
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
    name: "CEMED - Rede D'Or - São Luiz Campinas",
    slug: "cemed-sao-luiz-campinas",
    type: "Hospital Rede D'Or",
    typeColor: BADGE_CLASS,
    image: CEMED_IMG,
    address: "Av. Andrade Neves, 863, 4° andar",
    neighborhood: "Centro, Campinas - SP",
    cep: "",
    phone: "(19) 3014-3000",
    whatsapp: null,
    hours: "Sextas, 13h às 17h",
    highlight: "Hospital e Maternidade São Luiz Campinas",
    description: "Centro médico do Hospital e Maternidade São Luiz Campinas, da Rede D'Or. Hospital geral de alta complexidade no Centro de Campinas, com estacionamento próprio.",
    insurances: null,
    payment: null,
  },
];

export default function Consultorios() {
  usePageMeta({
    title: "Consultórios e Locais de Atendimento",
    description: "Conheça os locais de atendimento do Dr. Felipe de Bulhões em Campinas e São Paulo, além das opções de teleconsulta.",
    canonical: "https://felipebulhoes.com/consultorios",
  });

  return (
    <>
    <div className="min-h-screen bg-white dark:bg-card">
      {/* Header */}
      <header className="bg-[#1C3D5A] py-4 sticky top-0 z-50">
        <div className="container flex items-center justify-between">
          <Link href="/">
            <img loading="lazy" src={LOGO_URL} alt="Dr. Felipe de Bulhões - Urologista" className="h-12 lg:h-14 w-auto" />
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="outline" className="text-white border-white/20 hover:bg-white/10 bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <a href="https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas?utm_source=site&utm_medium=page&utm_campaign=consultorios" target="_blank" rel="noopener noreferrer" className="max-sm:hidden" onClick={() => trackDoctoraliaClick("consultorios")}>
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
          <PageBreadcrumbs className="mb-7" />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-[#B87333]" />
              <span className="text-[#B87333] text-sm font-semibold uppercase tracking-[0.15em]">Onde Atendo</span>
            </div>
            <h1 className="text-3xl lg:text-5xl text-white leading-tight mb-4">
              Consultórios e Locais de Atendimento
            </h1>
            <p className="text-white/75 text-lg leading-relaxed">
              Atendimento presencial em quatro locais ativos — dois em Campinas e dois em São Paulo — além de teleconsulta por vídeo para todo o Brasil. Escolha o local mais conveniente para você.
            </p>
            <div className="mt-7 flex items-center gap-3 border-t border-white/12 pt-5">
              <img
                src="/manus-storage/instagram_profile_bc867e99_9d4bb2af.webp"
                alt=""
                width={44}
                height={44}
                loading="eager"
                className="h-11 w-11 shrink-0 rounded-full border border-[#C9B6A3]/50 object-cover"
                onError={(event) => { event.currentTarget.style.display = "none"; }}
              />
              <p className="text-sm leading-relaxed text-white/75">
                <span className="font-semibold text-white">Dr. Felipe de Bulhões</span> · Urologista
                <br />
                <span className="text-white/60">
                  CRM-SP 202291 · RQE 146538 ·{" "}
                  <Link href="/sobre" className="underline decoration-[#C9B6A3]/60 underline-offset-4 hover:text-white">
                    Sobre o médico
                  </Link>
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Location Cards */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
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

                    <a
                      href={`tel:+55${loc.phone.replace(/[^0-9]/g, "")}`}
                      onClick={() => trackPhoneClick("consultorios")}
                      className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
                    >
                      <Phone className="w-4 h-4 text-[#B87333] shrink-0" />
                      <span className="text-sm text-[#1C3D5A] dark:text-foreground/70 font-sans underline decoration-[#C9B6A3] underline-offset-4">{loc.phone}</span>
                    </a>

                    {loc.whatsapp && (
                      <a href={`https://wa.me/55${loc.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
                        <Phone className="w-4 h-4 text-[#128C4B] shrink-0" />
                        <span className="text-sm text-[#0F7A40] font-sans">WhatsApp: {loc.whatsapp}</span>
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
            <Link href="/agendamento" className="shrink-0 bg-[#B87333] hover:bg-[#8B5A2B] text-white rounded-lg px-6 py-3 text-sm font-semibold transition-colors flex items-center gap-2">
              <Video className="w-4 h-4" />
              Agendar Teleconsulta
            </Link>
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
          <p className="text-white/65 text-sm mb-6 max-w-lg mx-auto">
            Escolha o consultório mais conveniente e agende presencialmente ou por teleconsulta.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/agendamento">
              <Button className="bg-[#B87333] hover:bg-[#8B5A2B] text-white px-6 h-11">
                <Calendar className="w-4 h-4 mr-2" />
                Agendar Consulta
              </Button>
            </Link>
            <a href={getWhatsAppUrl({ page: "consultorios" })} target="_blank" rel="noopener noreferrer">
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
          <p className="text-white/70 text-sm mb-3">
            Dr. Felipe de Bulhões Ojeda — CRM-SP 202291 · RQE 146538 (Urologia) · RQE 114019 (Cirurgia Geral).
          </p>
          <p className="text-white/55 text-sm">&copy; {new Date().getFullYear()} Dr. Felipe de Bulhões — Urologista</p>
          <p className="text-white/55 text-xs mt-2 pb-16 md:pb-0">Este conteúdo é informativo e não substitui a consulta médica.</p>
        </div>
      </footer>

      <MobileBottomBar source="consultorios" />
      <WhatsAppButton message="Olá! Vi os consultórios do Dr. Felipe de Bulhões e gostaria de agendar uma consulta." source="consultorios" />
    </div>
    </>
  );
}
