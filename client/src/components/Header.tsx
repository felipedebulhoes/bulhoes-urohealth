/*
 * Design: Dr. Felipe de Bulhões — Identidade Visual
 * Header: Fixed top nav, Azul do Nilo (#1C3D5A) + Cobre (#B87333) accent
 * Tipografia: Callingstone (títulos) + Roboto (corpo)
 */
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { trackCtaClick } from "@/lib/analytics";

const mainNavLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "/sobre" },
  { label: "Especialidades", href: "#especialidades" },
  { label: "Convênios", href: "#convenios" },
  { label: "Consultórios", href: "/consultorios" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/contato" },
];

const quickLinks = [
  { label: "Primeira Consulta", href: "/primeira-consulta" },
  { label: "Vídeos", href: "#videos" },
];

const educationalLinks = [
  { label: "Próstata Aumentada (HPB)", href: "/educativo/hiperplasia-prostatica" },
  { label: "Tratamentos para HPB", href: "/educativo/tratamentos-hpb" },
  { label: "Cirurgias Minimamente Invasivas", href: "/educativo/cirurgias-minimamente-invasivas" },
  { label: "Cálculos Renais", href: "/educativo/calculos-renais" },
  { label: "Câncer de Próstata", href: "/educativo/cancer-prostata" },
  { label: "Exame de Próstata", href: "/educativo/exame-prostata" },
  { label: "Disfunção Erétil", href: "/educativo/disfuncao-eretil" },
  { label: "Hipogonadismo e Testosterona", href: "/educativo/hipogonadismo" },
  { label: "Síndrome Metabólica", href: "/educativo/sindrome-metabolica" },
  { label: "Infecção Urinária no Homem", href: "/educativo/infeccao-urinaria" },
  { label: "Urodinâmica", href: "/educativo/urodinamica" },
  { label: "Procedimentos Urológicos", href: "/educativo/procedimentos-andrologicos" },
  { label: "Biópsia de Próstata", href: "/educativo/biopsia-prostata" },
  { label: "Vasectomia", href: "/educativo/vasectomia" },
  { label: "Litotripsia a Laser", href: "/educativo/litotripsia-laser" },
  { label: "Cirurgia Robótica", href: "/educativo/cirurgia-robotica" },
  { label: "Câncer de Bexiga", href: "/educativo/cancer-bexiga" },
  { label: "Tratamento do Câncer de Próstata", href: "/educativo/tratamento-cancer-prostata" },
  { label: "Incontinência Urinária", href: "/educativo/incontinencia-urinaria" },
  { label: "Infertilidade Masculina", href: "/educativo/infertilidade-masculina" },
  { label: "Doença de Peyronie", href: "/educativo/doenca-peyronie" },
  { label: "Orientações Pré-Operatórias", href: "/educativo/orientacoes-pre-operatorias" },
  { label: "Orientações Pós-Operatórias", href: "/educativo/orientacoes-pos-operatorias" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [eduOpen, setEduOpen] = useState(false);
  const [mobileEduOpen, setMobileEduOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setEduOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isHomePage = window.location.pathname === "/";

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      if (!isHomePage) {
        window.location.href = "/" + href;
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#C4C4C4]/30"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-20 lg:h-24">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <img
            src="/manus-storage/logo-landscape_be6628b3.svg"
            alt="Dr. Felipe de Bulhões - Urologista"
            className={`h-12 lg:h-14 w-auto transition-all duration-300 ${scrolled ? '' : 'brightness-0 invert'}`}
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {mainNavLinks.slice(0, 3).map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`px-2.5 py-2 text-[13px] font-medium transition-colors rounded-md ${
                scrolled
                  ? "text-[#1C3D5A]/70 hover:text-[#1C3D5A] hover:bg-[#1C3D5A]/5"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.label}
            </a>
          ))}

          {/* Educativo Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setEduOpen(!eduOpen)}
              onMouseEnter={() => setEduOpen(true)}
              className={`flex items-center gap-1 px-2.5 py-2 text-[13px] font-medium transition-colors rounded-md ${
                scrolled
                  ? "text-[#1C3D5A]/70 hover:text-[#1C3D5A] hover:bg-[#1C3D5A]/5"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              Educativo
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${eduOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {eduOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  onMouseLeave={() => setEduOpen(false)}
                  className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-[#1C3D5A]/8 overflow-hidden py-2"
                >
                  {educationalLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setEduOpen(false)}
                    >
                      <div className="px-4 py-2.5 text-sm text-[#1C3D5A]/70 hover:bg-[#B87333]/5 hover:text-[#B87333] transition-colors cursor-pointer">
                        {link.label}
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {quickLinks.map((link) => (
            link.href.startsWith("/") ? (
              <Link key={link.href} href={link.href}>
                <span className={`px-2.5 py-2 text-[13px] font-medium transition-colors rounded-md cursor-pointer ${
                  scrolled
                    ? "text-[#B87333] hover:text-[#8B5A2B] hover:bg-[#B87333]/5"
                    : "text-[#D4884A] hover:text-white hover:bg-white/10"
                }`}>
                  {link.label}
                </span>
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`px-2.5 py-2 text-[13px] font-medium transition-colors rounded-md ${
                  scrolled
                    ? "text-[#1C3D5A]/70 hover:text-[#1C3D5A] hover:bg-[#1C3D5A]/5"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </a>
            )
          ))}

          {mainNavLinks.slice(3).map((link) => (
            <a
              key={link.href}
              href={link.href.startsWith("/") ? link.href : link.href}
              onClick={() => handleNavClick(link.href)}
              className={`px-2.5 py-2 text-[13px] font-medium transition-colors rounded-md ${
                scrolled
                  ? "text-[#1C3D5A]/70 hover:text-[#1C3D5A] hover:bg-[#1C3D5A]/5"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/agendamento"
            onClick={() => trackCtaClick("agendar_consulta", "header_desktop")}
          >
            <Button
              className="bg-[#B87333] hover:bg-[#D4884A] text-white rounded-md px-5 h-10 text-sm font-semibold shadow-md"
            >
              <Phone className="w-4 h-4 mr-2" />
              Agendar Consulta
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 rounded-md transition-colors ${
            scrolled ? "text-[#1C3D5A]" : "text-white"
          }`}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-[#C4C4C4]/30 overflow-hidden"
          >
            <nav className="container py-4 flex flex-col gap-1 max-h-[70vh] overflow-y-auto">
              {mainNavLinks.slice(0, 3).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-3 text-[#1C3D5A] font-medium text-sm rounded-md hover:bg-[#1C3D5A]/5 transition-colors"
                >
                  {link.label}
                </a>
              ))}

              {/* Mobile Educativo accordion */}
              <button
                onClick={() => setMobileEduOpen(!mobileEduOpen)}
                className="flex items-center justify-between px-4 py-3 text-[#1C3D5A] font-medium text-sm rounded-md hover:bg-[#1C3D5A]/5 transition-colors"
              >
                Conteúdo Educativo
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileEduOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {mobileEduOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    {educationalLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => { setMobileOpen(false); setMobileEduOpen(false); }}
                      >
                        <div className="px-8 py-2.5 text-[#1C3D5A]/60 text-sm hover:text-[#B87333] transition-colors cursor-pointer">
                          {link.label}
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <Link href="/primeira-consulta" onClick={() => setMobileOpen(false)}>
                <div className="px-4 py-3 text-[#B87333] font-semibold text-sm rounded-md hover:bg-[#B87333]/5 transition-colors cursor-pointer">
                  Primeira Consulta
                </div>
              </Link>

              {mainNavLinks.slice(3).map((link) => (
                <a
                  key={link.href}
                  href={link.href.startsWith("/") ? link.href : link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-3 text-[#1C3D5A] font-medium text-sm rounded-md hover:bg-[#1C3D5A]/5 transition-colors"
                >
                  {link.label}
                </a>
              ))}

              <Link
                href="/agendamento"
                onClick={() => {
                  trackCtaClick("agendar_consulta", "header_mobile");
                  setMobileOpen(false);
                }}
                className="mt-2"
              >
                <Button className="w-full bg-[#B87333] hover:bg-[#D4884A] text-white">
                  <Phone className="w-4 h-4 mr-2" />
                  Agendar Consulta
                </Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
