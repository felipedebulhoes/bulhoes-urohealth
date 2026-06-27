/*
 * Design: Clinical Precision — Swiss Medical Design
 * Página real /contato — Informações de contato completas
 * Criada para resolver Soft 404 no Google Search Console
 */
import { useState } from "react";
import { Link } from "wouter";
import { usePageMeta } from "@/hooks/usePageMeta";
import { motion } from "framer-motion";
import {
  Phone,
  MapPin,
  Send,
  CheckCircle,
  User,
  FileText,
  ArrowLeft,
  Instagram,
  ExternalLink,
  Monitor,
  MessageCircle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsAppButton from "@/components/WhatsAppButton";
import { trackWhatsAppClick, trackPhoneClick } from "@/lib/analytics";

const LOGO_URL = "/manus-storage/logo-landscape_be6628b3.svg";

const contactChannels = [
  {
    title: "Clinovi (São Paulo)",
    phone: "(11) 3382-1529",
    phoneLink: "tel:+551133821529",
    description: "Unidades Paulista e Moema — agendamento e informações",
    icon: Phone,
  },
  {
    title: "Campinas Day Hospital",
    phone: "(19) 2127-2900",
    phoneLink: "tel:+551921272900",
    description: "Agendamento de consultas e cirurgias em Campinas",
    icon: Phone,
  },
  {
    title: "WhatsApp Campinas",
    phone: "(19) 99855-9890",
    phoneLink: "https://wa.me/5519998559890",
    description: "WhatsApp do Campinas Day Hospital",
    icon: MessageCircle,
  },
  {
    title: "WhatsApp Geral",
    phone: "(11) 98112-4455",
    phoneLink: "https://wa.me/5511981124455",
    description: "Apenas mensagens — resposta em até 2 horas",
    icon: MessageCircle,
  },
];

const offices = [
  {
    name: "Campinas Day Hospital",
    address: "Av. Benjamin Constant, 1991 — Cambuí, Campinas - SP",
    type: "Particular",
    link: "/local/campinas-day-hospital",
  },
  {
    name: "Clinovi Paulista",
    address: "Av. Paulista, 1048, 18° andar — Bela Vista, São Paulo - SP",
    type: "Particular",
    link: "/local/clinovi-paulista",
  },
  {
    name: "Clinovi Moema",
    address: "Av. Ibirapuera, 1835, 2° andar — Moema, São Paulo - SP",
    type: "Particular",
    link: "/local/clinovi-moema",
  },
];

export default function Contato() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", subject: "" });

  usePageMeta({
    title: "Contato",
    description: "Entre em contato com o Dr. Felipe de Bulhões, urologista em São Paulo e Campinas. Telefone, WhatsApp, formulário de contato e endereços dos consultórios. Agendamento online.",
    canonical: "https://felipebulhoes.com/contato",
  });

  const subjects = [
    "Consulta particular",
    "Teleconsulta",
    "Cirurgia / Procedimento",
    "Segunda opinião médica",
    "Exame urodinâmico",
    "Outro assunto",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Olá, meu nome é ${formData.name}. Gostaria de informações sobre: ${formData.subject}. Meu telefone: ${formData.phone}`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/5511981124455?text=${encoded}`, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
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
            <a href="https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas" target="_blank" rel="noopener noreferrer" className="hidden sm:block">
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
              <span className="text-[#B87333] text-sm font-semibold uppercase tracking-[0.15em]">Fale Conosco</span>
            </div>
            <h1 className="text-3xl lg:text-5xl text-white leading-tight mb-4">
              Entre em Contato
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">
              Agende sua consulta, tire dúvidas ou solicite informações. Atendimento presencial em São Paulo e Campinas, ou por teleconsulta para todo o Brasil.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Channels */}
      <section className="py-16 lg:py-20">
        <div className="container max-w-5xl">
          <h2 className="text-2xl font-bold text-[#1C3D5A] dark:text-foreground mb-8">Canais de Atendimento</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {contactChannels.map((channel, i) => (
              <motion.a
                key={channel.title}
                href={channel.phoneLink}
                target={channel.phoneLink.startsWith("https") ? "_blank" : undefined}
                rel={channel.phoneLink.startsWith("https") ? "noopener noreferrer" : undefined}
                onClick={() => {
                  if (channel.phoneLink.startsWith("https://wa.me")) {
                    trackWhatsAppClick("contato_page");
                  } else if (channel.phoneLink.startsWith("tel:")) {
                    trackPhoneClick("contato_page");
                  }
                }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-[#F8FAFB] rounded-xl p-5 border border-[#1C3D5A]/6 hover:shadow-md hover:border-[#B87333]/30 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#B87333]/10 flex items-center justify-center shrink-0">
                    <channel.icon className="w-5 h-5 text-[#B87333]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1C3D5A] dark:text-foreground text-sm mb-0.5">{channel.title}</h3>
                    <p className="text-[#B87333] font-bold text-lg group-hover:underline">{channel.phone}</p>
                    <p className="text-xs text-[#64748B] mt-1">{channel.description}</p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Offices */}
          <h2 className="text-2xl font-bold text-[#1C3D5A] dark:text-foreground mb-6">Locais de Atendimento</h2>
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {offices.map((office, i) => (
              <motion.div
                key={office.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              >
                <Link href={office.link} className="bg-[#F8FAFB] rounded-xl p-5 border border-[#1C3D5A]/6 hover:shadow-md transition-all block h-full">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-[#B87333]" />
                    <h3 className="font-semibold text-[#1C3D5A] dark:text-foreground text-sm">{office.name}</h3>
                  </div>
                  <p className="text-xs text-[#64748B] mb-2">{office.address}</p>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#B87333]">{office.type}</span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Teleconsulta */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-gradient-to-r from-[#1C3D5A] to-[#0D3B5C] rounded-xl p-6 flex flex-col sm:flex-row items-center gap-5 mb-12"
          >
            <div className="w-12 h-12 rounded-xl bg-[#B87333]/20 flex items-center justify-center shrink-0">
              <Monitor className="w-6 h-6 text-[#D4884A]" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-base font-semibold text-white mb-1">Teleconsulta</h3>
              <p className="text-sm text-white/60">Atendimento online por vídeo para todo o Brasil. Mesmo valor da consulta presencial.</p>
            </div>
            <Link href="/agendamento">
              <Button className="bg-[#B87333] hover:bg-[#8B5A2B] text-white shrink-0">Agendar Online</Button>
            </Link>
          </motion.div>

          {/* Contact Form + Info */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left — Info */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
              <h2 className="text-2xl font-bold text-[#1C3D5A] dark:text-foreground mb-4">Informações Importantes</h2>
              <div className="space-y-4 text-sm text-[#334155] leading-relaxed">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#B87333] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1C3D5A] dark:text-foreground">Horário de atendimento</p>
                    <p>Campinas Day Hospital: Sextas, 8h às 12h</p>
                    <p>Clinovi (Paulista e Moema): Segunda a Sábado — consulte horários no Doctoralia</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-[#B87333] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1C3D5A] dark:text-foreground">WhatsApp</p>
                    <p>O WhatsApp (11) 98112-4455 é apenas para mensagens. Resposta em até 2 horas durante o horário comercial.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#B87333] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1C3D5A] dark:text-foreground">Agendamento por telefone</p>
                    <p>Para agendamento imediato, ligue diretamente para a unidade desejada.</p>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="mt-8 pt-6 border-t border-[#1C3D5A]/6">
                <h3 className="font-semibold text-[#1C3D5A] dark:text-foreground text-sm mb-3">Redes Sociais</h3>
                <div className="flex items-center gap-4">
                  <a href="https://www.instagram.com/drfelipebulhoes/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#64748B] hover:text-[#B87333] transition-colors">
                    <Instagram className="w-5 h-5" />
                    <span className="text-sm">@drfelipebulhoes</span>
                  </a>
                  <a href="https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#64748B] hover:text-[#B87333] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm">Doctoralia</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.7 }}>
              <div className="bg-gradient-to-br from-[#1C3D5A] to-[#0F3460] rounded-2xl p-6 lg:p-8">
                <h3 className="text-lg font-semibold text-white mb-1">Solicite um Contato</h3>
                <p className="text-white/40 text-sm mb-6">Preencha o formulário e enviaremos sua mensagem pelo WhatsApp.</p>

                {submitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-[#B87333] mx-auto mb-4" />
                    <h4 className="text-xl text-white font-semibold mb-2">Mensagem Enviada!</h4>
                    <p className="text-white/50 text-sm">Você será redirecionado para o WhatsApp.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-white/70 text-xs font-medium mb-1.5 block">Nome completo</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Seu nome"
                          className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#B87333]/50 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-white/70 text-xs font-medium mb-1.5 block">Telefone / WhatsApp</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(11) 99999-9999"
                          className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#B87333]/50 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-white/70 text-xs font-medium mb-1.5 block">Assunto</label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <select
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-white appearance-none focus:outline-none focus:border-[#B87333]/50 transition-colors"
                        >
                          <option value="" className="bg-[#1C3D5A]">Selecione o assunto</option>
                          {subjects.map((s) => (
                            <option key={s} value={s} className="bg-[#1C3D5A]">{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-[#B87333] hover:bg-[#8B5A2B] text-white h-12 text-sm font-semibold rounded-lg mt-2">
                      <Send className="w-4 h-4 mr-2" />
                      Enviar pelo WhatsApp
                    </Button>
                    <p className="text-white/25 text-[11px] text-center">
                      Ao enviar, você será redirecionado para o WhatsApp com sua mensagem pré-preenchida.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#1C3D5A] to-[#0F3460]">
        <div className="container text-center">
          <h2 className="text-2xl lg:text-3xl text-white mb-3 font-serif">Prefere agendar online?</h2>
          <p className="text-white/50 text-sm mb-6 max-w-lg mx-auto">
            Use o calendário do Doctoralia para escolher o melhor dia e horário. Confirmação imediata.
          </p>
          <Link href="/agendamento">
            <Button className="bg-[#B87333] hover:bg-[#8B5A2B] text-white px-6 h-11">
              Agendar pelo Doctoralia
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F2A3F] py-8">
        <div className="container text-center">
          <p className="text-white/30 text-sm">&copy; {new Date().getFullYear()} Dr. Felipe de Bulhões — Urologista | CRM-SP 202291</p>
          <p className="text-white/20 text-xs mt-2">Este conteúdo é informativo e não substitui a consulta médica.</p>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}
