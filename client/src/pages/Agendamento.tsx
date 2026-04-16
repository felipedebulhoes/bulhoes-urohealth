/*
 * Design: Clinical Precision — Swiss Medical Design
 * Página real /agendamento — Widget Doctoralia integrado
 * Criada para resolver Soft 404 no Google Search Console
 */
import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Phone,
  ArrowLeft,
  CalendarCheck,
  Shield,
  Clock,
  Star,
  MapPin,
  Monitor,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsAppButton from "@/components/WhatsAppButton";
import { trackDoctoraliaClick, trackWhatsAppClick } from "@/lib/analytics";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/logo_min8_d351a844.webp";
const DOCTORALIA_PROFILE = "felipe-de-bulhoes-ojeda-2";
const WIDGET_SCRIPT_ID = "zl-widget-s";
const WIDGET_SCRIPT_SRC = "//platform.docplanner.com/js/widget.js";

function loadDoctoraliaScript() {
  if (document.getElementById(WIDGET_SCRIPT_ID)) {
    const existing = document.getElementById(WIDGET_SCRIPT_ID);
    existing?.remove();
  }
  const script = document.createElement("script");
  script.id = WIDGET_SCRIPT_ID;
  script.src = WIDGET_SCRIPT_SRC;
  script.async = true;
  document.body.appendChild(script);
}

export default function Agendamento() {
  const hasLoaded = useRef(false);

  useEffect(() => {
    document.title = "Agendar Consulta | Dr. Felipe de Bulhões - Urologista em São Paulo e Campinas";
    let metaTag = document.querySelector('meta[name="description"]');
    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.setAttribute("name", "description");
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute("content", "Agende sua consulta com o Dr. Felipe de Bulhões, urologista em São Paulo e Campinas. Agendamento online pelo Doctoralia com confirmação imediata. Presencial ou teleconsulta.");
    return () => {
      document.title = "Dr. Felipe de Bulhões | Urologista em São Paulo e Campinas";
    };
  }, []);

  useEffect(() => {
    if (!hasLoaded.current) {
      hasLoaded.current = true;
      const timer = setTimeout(() => {
        loadDoctoraliaScript();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    return () => {
      const script = document.getElementById(WIDGET_SCRIPT_ID);
      if (script) script.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#0A2540] py-4 sticky top-0 z-50">
        <div className="container flex items-center justify-between">
          <Link href="/">
            <img src={LOGO_URL} alt="Dr. Felipe de Bulhões - Urologista" className="h-12 lg:h-14 w-auto brightness-0 invert" />
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="outline" className="text-white border-white/20 hover:bg-white/10 bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <Link href="/contato" className="hidden sm:block">
              <Button variant="outline" className="text-white border-white/20 hover:bg-white/10 bg-transparent">
                <Phone className="w-4 h-4 mr-2" />
                Contato
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0A2540] to-[#0F3460] py-16 lg:py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-10 bg-[#0D9488]" />
              <span className="text-[#0D9488] text-sm font-semibold uppercase tracking-[0.15em]">Agendamento Online</span>
              <div className="h-px w-10 bg-[#0D9488]" />
            </div>
            <h1 className="text-3xl lg:text-5xl text-white leading-tight mb-4">
              Agende sua Consulta
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">
              Escolha o melhor dia e horário diretamente pelo calendário. Confirmação imediata pela Doctoralia. Atendimento presencial em São Paulo e Campinas, ou por teleconsulta.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust indicators */}
      <section className="py-8 bg-[#F0FDFA]">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-8">
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
            <div className="w-px h-4 bg-[#0A2540]/10 hidden sm:block" />
            <div className="flex items-center gap-2 text-sm text-[#0A2540]/60">
              <CalendarCheck className="w-4 h-4 text-[#0D9488]" />
              <span className="font-medium">Sem burocracia</span>
            </div>
          </div>
        </div>
      </section>

      {/* Doctoralia Widget */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl shadow-[#0A2540]/5 border border-[#0A2540]/5 p-4 sm:p-6 lg:p-8">
              <a
                id="zl-url"
                className="zl-url"
                href="https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas"
                rel="nofollow"
                onClick={() => trackDoctoraliaClick("agendamento_page")}
                data-zlw-doctor={DOCTORALIA_PROFILE}
                data-zlw-type="big_with_calendar"
                data-zlw-opinion="false"
                data-zlw-hide-branding="true"
                data-zlw-saas-only="true"
                data-zlw-a11y-title="Widget de marcação de consultas médicas"
                style={{ display: "block", textAlign: "center" }}
              >
                <div className="py-12 flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#0D9488]/10 flex items-center justify-center">
                    <CalendarCheck className="w-6 h-6 text-[#0D9488]" />
                  </div>
                  <p className="text-[#0A2540]/60 text-sm">Carregando calendário de agendamento...</p>
                </div>
              </a>
            </div>
            <p className="text-center text-[#0A2540]/30 text-xs mt-6">
              Agendamento seguro via Doctoralia · CRM-SP 202291 · RQE 146538 / RQE 114019
            </p>
          </motion.div>
        </div>
      </section>

      {/* Alternative contact */}
      <section className="py-12 bg-[#F8FAFB]">
        <div className="container max-w-4xl">
          <h2 className="text-xl font-bold text-[#0A2540] mb-6 text-center">Outras formas de agendar</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <a
              href="tel:+551133821529"
              className="bg-white rounded-xl p-5 border border-[#0A2540]/6 hover:shadow-md transition-all text-center"
            >
              <Phone className="w-6 h-6 text-[#0D9488] mx-auto mb-2" />
              <h3 className="font-semibold text-[#0A2540] text-sm mb-1">Clinovi (SP)</h3>
              <p className="text-[#0D9488] font-bold">(11) 3382-1529</p>
              <p className="text-xs text-[#64748B] mt-1">Paulista, Moema, Pinheiros e SBC</p>
            </a>
            <a
              href="tel:+551921272900"
              className="bg-white rounded-xl p-5 border border-[#0A2540]/6 hover:shadow-md transition-all text-center"
            >
              <Phone className="w-6 h-6 text-[#0D9488] mx-auto mb-2" />
              <h3 className="font-semibold text-[#0A2540] text-sm mb-1">Campinas</h3>
              <p className="text-[#0D9488] font-bold">(19) 2127-2900</p>
              <p className="text-xs text-[#64748B] mt-1">Campinas Day Hospital</p>
            </a>
            <a
              href="https://wa.me/5511981124455?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("agendamento_page")}
              className="bg-white rounded-xl p-5 border border-[#0A2540]/6 hover:shadow-md transition-all text-center"
            >
              <MessageCircle className="w-6 h-6 text-[#25D366] mx-auto mb-2" />
              <h3 className="font-semibold text-[#0A2540] text-sm mb-1">WhatsApp</h3>
              <p className="text-[#25D366] font-bold">(11) 98112-4455</p>
              <p className="text-xs text-[#64748B] mt-1">Apenas mensagens</p>
            </a>
          </div>
        </div>
      </section>

      {/* Locations summary */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <h2 className="text-xl font-bold text-[#0A2540] mb-6 text-center">Locais de Atendimento</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link href="/local/campinas-day-hospital" className="bg-[#F8FAFB] rounded-xl p-5 border border-[#0A2540]/6 hover:shadow-md transition-all block">
              <MapPin className="w-5 h-5 text-[#0D9488] mb-2" />
              <h3 className="font-bold text-[#0A2540] text-sm mb-1">Campinas Day Hospital</h3>
              <p className="text-xs text-[#64748B]">Cambuí, Campinas - SP</p>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#5EEAD4]">Convênios & Particular</span>
            </Link>
            <Link href="/local/clinovi-paulista" className="bg-[#F8FAFB] rounded-xl p-5 border border-[#0A2540]/6 hover:shadow-md transition-all block">
              <MapPin className="w-5 h-5 text-[#0D9488] mb-2" />
              <h3 className="font-bold text-[#0A2540] text-sm mb-1">Clinovi Paulista</h3>
              <p className="text-xs text-[#64748B]">Bela Vista, São Paulo - SP</p>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-400">Apenas Particular</span>
            </Link>
            <Link href="/local/clinovi-moema" className="bg-[#F8FAFB] rounded-xl p-5 border border-[#0A2540]/6 hover:shadow-md transition-all block">
              <MapPin className="w-5 h-5 text-[#0D9488] mb-2" />
              <h3 className="font-bold text-[#0A2540] text-sm mb-1">Clinovi Moema</h3>
              <p className="text-xs text-[#64748B]">Moema, São Paulo - SP</p>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-400">Apenas Particular</span>
            </Link>
            <Link href="/local/clinovi-pinheiros" className="bg-[#F8FAFB] rounded-xl p-5 border border-[#0A2540]/6 hover:shadow-md transition-all block">
              <MapPin className="w-5 h-5 text-[#0D9488] mb-2" />
              <h3 className="font-bold text-[#0A2540] text-sm mb-1">Clinovi Pinheiros</h3>
              <p className="text-xs text-[#64748B]">Pinheiros, São Paulo - SP</p>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-400">Apenas Particular</span>
            </Link>
            <Link href="/local/clinovi-sbc" className="bg-[#F8FAFB] rounded-xl p-5 border border-[#0A2540]/6 hover:shadow-md transition-all block">
              <MapPin className="w-5 h-5 text-[#0D9488] mb-2" />
              <h3 className="font-bold text-[#0A2540] text-sm mb-1">Clinovi SBC</h3>
              <p className="text-xs text-[#64748B]">São Bernardo do Campo - SP</p>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-400">Apenas Particular</span>
            </Link>
          </div>
          <div className="mt-4 bg-gradient-to-r from-[#0A2540] to-[#0D3B5C] rounded-xl p-5 flex items-center gap-4">
            <Monitor className="w-6 h-6 text-[#5EEAD4] shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-white">Teleconsulta</h3>
              <p className="text-xs text-white/60">Atendimento online por vídeo para todo o Brasil</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#071A2E] py-8">
        <div className="container text-center">
          <p className="text-white/30 text-sm">&copy; {new Date().getFullYear()} Dr. Felipe de Bulhões — Urologista | CRM-SP 202291</p>
          <p className="text-white/20 text-xs mt-2">Este conteúdo é informativo e não substitui a consulta médica.</p>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}
