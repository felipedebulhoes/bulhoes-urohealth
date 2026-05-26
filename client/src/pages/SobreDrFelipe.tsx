/*
 * Design: Clinical Precision — Swiss Medical Design
 * Página: Sobre o Dr. Felipe de Bulhões — Provider Page otimizada para SEO
 */
import { motion } from "framer-motion";
import {
  GraduationCap,
  Award,
  MapPin,
  Phone,
  Star,
  Stethoscope,
  BookOpen,
  ChevronRight,
  Calendar,
  Video,
} from "lucide-react";
import { Link } from "wouter";
import { usePageMeta } from "@/hooks/usePageMeta";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

// CDN URLs corretas (mesmas usadas no restante do site)
const LOGO_URL = "/manus-storage/logo-landscape_be6628b3.svg";
const PORTRAIT_URL = "/manus-storage/felipe-portrait_0e0693e4_be070ac1.webp";
const UROONCO_URL = "/manus-storage/uroonco-solo_7227a008_5754f461.webp";
const JPU_URL = "/manus-storage/jpu-congress_61ecfbf9_f41d816f.webp";

export default function SobreDrFelipe() {
  usePageMeta({
    title: "Sobre o Dr. Felipe de Bulhões",
    description: "Conheça o Dr. Felipe de Bulhões — Urologista formado pelo Instituto D'Or de Ensino e Pesquisa. Cirurgião Geral (TCBC), especialista em cirurgia robótica e minimamente invasiva. Atende em São Paulo e Campinas.",
    canonical: "https://felipebulhoes.com/sobre",
  });

  return (
    <div className="min-h-screen bg-white dark:bg-card">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1C3D5A] via-[#0F3460] to-[#1C3D5A] text-white pt-28 pb-20">
        <div className="container max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Stethoscope className="w-5 h-5 text-[#B87333]" />
                <span className="text-[#B87333] text-sm font-medium tracking-wider uppercase">Urologista | CRM-SP 202.291 | RQE 146538 / RQE 114019</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-6 leading-tight">
                Dr. Felipe de Bulhões Ojeda
              </h1>
              <p className="text-lg text-white/80 leading-relaxed mb-6">
                Urologista formado pelo <strong className="text-white">Instituto D'Or de Ensino e Pesquisa (IDOR)</strong> em São Paulo e Cirurgião Geral com título de especialista pelo Colégio Brasileiro de Cirurgiões (TCBC). Atua em cirurgias minimamente invasivas, endourologia, uro-oncologia, andrologia e urodinâmica.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#agendamento"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("agendamento")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-[#B87333] hover:bg-[#0B8276] text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Agendar Consulta
                </a>
                <a
                  href="https://wa.me/5511981124455?text=Olá Dr. Felipe, gostaria de tirar dúvidas."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </motion.div>
            <motion.div
              className="lg:col-span-2 flex justify-center"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <div className="w-72 h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl">
                  <img loading="lazy"
                    src={PORTRAIT_URL}
                    alt="Dr. Felipe de Bulhões Ojeda - Urologista"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white dark:bg-card rounded-xl p-3 shadow-lg flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-[#1C3D5A] dark:text-foreground">5.0</span>
                  <span className="text-xs text-[#64748B]">Doctoralia</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Formação */}
      <section className="py-16 bg-white dark:bg-card">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-8">Formação Acadêmica</h2>
            <div className="space-y-6">
              {[
                { year: "2023–2026", title: "Urologia", inst: "Instituto D'Or de Ensino e Pesquisa (IDOR)", city: "São Paulo, SP", detail: "Formação em centro de referência com alto volume cirúrgico em cirurgia robótica, endourologia e uro-oncologia." },
                { year: "2021", title: "Pesquisa Clínica (PPCR)", inst: "Harvard T.H. Chan School of Public Health", city: "EUA (Online)", detail: "Curso de pesquisa clínica pela Harvard School of Public Health." },
                { year: "2019–2021", title: "Cirurgia Geral", inst: "Faculdade de Medicina do ABC (FMABC)", city: "Santo André, SP", detail: "Formação cirúrgica completa com título de especialista pelo Colégio Brasileiro de Cirurgiões (TCBC) — AMB/CBC." },
                { year: "2011–2017", title: "Graduação em Medicina", inst: "Universidade Federal Fluminense (UFF)", city: "Niterói, RJ", detail: "Graduação com participação ativa em ligas acadêmicas e iniciação científica." },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="text-right min-w-[100px] shrink-0">
                    <span className="text-sm font-bold text-[#B87333]">{item.year}</span>
                  </div>
                  <div className="w-px bg-[#B87333]/30 relative shrink-0">
                    <div className="absolute top-1 -left-1.5 w-3 h-3 bg-[#B87333] rounded-full" />
                  </div>
                  <div className="pb-6">
                    <h4 className="font-bold text-[#1C3D5A] dark:text-foreground mb-1">{item.title}</h4>
                    <p className="text-sm text-[#B87333] font-medium mb-1">{item.inst}</p>
                    <p className="text-xs text-[#64748B] mb-2">{item.city}</p>
                    <p className="text-sm text-[#334155] leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Títulos e Certificações */}
      <section className="py-16 bg-gray-50 dark:bg-card">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-8">Títulos e Certificações</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Award, title: "Título de Especialista em Cirurgia Geral (TCBC)", org: "Colégio Brasileiro de Cirurgiões — AMB/CBC", year: "2023" },
                { icon: GraduationCap, title: "Urologia — IDOR", org: "Instituto D'Or de Ensino e Pesquisa", year: "2023–2026" },
                { icon: GraduationCap, title: "Cirurgia Geral — FMABC", org: "Faculdade de Medicina do ABC", year: "2019–2021" },
                { icon: BookOpen, title: "Membro da SBU", org: "Sociedade Brasileira de Urologia", year: "" },
                { icon: BookOpen, title: "Membro da AUA", org: "American Urological Association", year: "" },
                { icon: BookOpen, title: "Membro da EAU", org: "European Association of Urology", year: "" },
                { icon: BookOpen, title: "Membro Titular do CBC", org: "Colégio Brasileiro de Cirurgiões", year: "2023" },
                { icon: Award, title: "ATLS — Advanced Trauma Life Support", org: "American College of Surgeons", year: "" },
              ].map((item, i) => (
                <div key={i} className="bg-white dark:bg-card rounded-xl p-5 border border-gray-100 shadow-sm flex gap-4 items-start">
                  <div className="w-10 h-10 bg-[#B87333]/10 rounded-lg flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-[#B87333]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1C3D5A] dark:text-foreground text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-[#64748B]">{item.org}</p>
                    {item.year && <p className="text-xs text-[#B87333] font-medium mt-1">{item.year}</p>}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Áreas de Atuação */}
      <section className="py-16 bg-white dark:bg-card">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-8">Áreas de Atuação</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Cirurgias Minimamente Invasivas",
                "Endourologia (Cálculos Renais)",
                "Uro-Oncologia",
                "Hiperplasia Prostática (HPB)",
                "Andrologia e Saúde Sexual",
                "Urodinâmica",
                "Cirurgia Robótica",
                "Disfunção Erétil",
                "Saúde do Homem",
              ].map((area, i) => (
                <div key={i} className="bg-gray-50 dark:bg-card rounded-lg p-4 border border-gray-100 flex items-center gap-3">
                  <ChevronRight className="w-4 h-4 text-[#B87333] shrink-0" />
                  <span className="text-sm font-medium text-[#1C3D5A] dark:text-foreground">{area}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Congressos */}
      <section className="py-16 bg-gray-50 dark:bg-card">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-8">Participação em Congressos</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100" style={{marginTop: '-5px', marginRight: '-5px', marginLeft: '6px', width: '367px', height: '409px'}}>
                <img loading="lazy" src={UROONCO_URL} alt="Dr. Felipe no UroOnco 2025" className="w-full h-48 object-cover" style={{paddingRight: '70px', marginTop: '2px', marginLeft: '39px', width: '379px', height: '333px'}} />
                <div className="p-4 bg-white dark:bg-card">
                  <h4 className="font-bold text-[#1C3D5A] dark:text-foreground mb-1">UroOnco 2025</h4>
                  <p className="text-sm text-[#64748B]">Congresso de Uro-Oncologia — São Paulo</p>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <img loading="lazy" src={JPU_URL} alt="Dr. Felipe no JPU 2025" className="w-full h-48 object-cover" />
                <div className="p-4 bg-white dark:bg-card">
                  <h4 className="font-bold text-[#1C3D5A] dark:text-foreground mb-1">JPU 2025</h4>
                  <p className="text-sm text-[#64748B]">Jornada Paulista de Urologia — SBU-SP</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Locais de Atendimento */}
      <section className="py-16 bg-white dark:bg-card">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-8">Locais de Atendimento</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { name: "Campinas Day Hospital", address: "Av. Benjamin Constant, 1991 — Cambuí, Campinas/SP", type: "Convênios e Particular", color: "bg-blue-50 border-blue-100" },
                { name: "Clinovi Paulista", address: "Av. Paulista, 1048, 18° andar — Bela Vista, São Paulo/SP", type: "Particular", color: "bg-amber-50 border-amber-100" },
                { name: "Clinovi Moema", address: "Av. Ibirapuera, 1835, 2° andar — Moema, São Paulo/SP", type: "Particular", color: "bg-amber-50 border-amber-100" },
              ].map((loc, i) => (
                <div key={i} className={`rounded-xl p-5 border ${loc.color}`}>
                  <MapPin className="w-5 h-5 text-[#B87333] mb-3" />
                  <h4 className="font-bold text-[#1C3D5A] dark:text-foreground mb-1 text-sm">{loc.name}</h4>
                  <p className="text-xs text-[#64748B] mb-2">{loc.address}</p>
                  <span className="text-xs bg-white dark:bg-card px-2 py-1 rounded border font-medium text-[#B87333]">{loc.type}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-indigo-50 border border-indigo-100 rounded-xl p-5 flex items-center gap-4">
              <Video className="w-8 h-8 text-indigo-500 shrink-0" />
              <div>
                <h4 className="font-bold text-[#1C3D5A] dark:text-foreground mb-1">Teleconsulta</h4>
                <p className="text-sm text-[#334155]">Atendimento online para todo o Brasil. Agende pelo Doctoralia ou WhatsApp.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1C3D5A]">
        <div className="container max-w-4xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <img loading="lazy" src={LOGO_URL} alt="Dr. Felipe de Bulhões" className="h-14 mx-auto mb-6 brightness-0 invert" />
            <h2 className="text-2xl lg:text-3xl text-white font-serif mb-4">Agende Sua Consulta</h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Cuide da sua saúde com um urologista especializado. Atendimento presencial em Campinas e São Paulo, ou teleconsulta para todo o Brasil.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                onClick={() => {
                  setTimeout(() => {
                    document.getElementById("agendamento")?.scrollIntoView({ behavior: "smooth" });
                  }, 500);
                }}
                className="bg-[#B87333] hover:bg-[#0B8276] text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Agendar pelo Doctoralia
              </Link>
              <a
                href="https://wa.me/5511981124455?text=Olá Dr. Felipe, gostaria de tirar dúvidas."
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/30 hover:bg-white/10 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                WhatsApp (11) 98112-4455 — apenas mensagens
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Back to home */}
      <div className="py-6 bg-gray-50 dark:bg-card text-center">
        <Link href="/" className="text-sm text-[#B87333] hover:underline font-medium">
          ← Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
}
