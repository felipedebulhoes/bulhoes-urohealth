/*
 * Design: Clinical Precision — Swiss Medical Design
 * Header: Fixed top nav with transparency, clean typography, teal accent CTA
 */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Especialidades", href: "#especialidades" },
  { label: "Vídeos", href: "#videos" },
  { label: "Serviços", href: "#servicos" },
  { label: "Convênios", href: "#convenios" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Consultórios", href: "#consultorios" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "#contato" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-20 lg:h-24">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-2 group">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/logo_min8_d351a844.webp"
            alt="Dr. Felipe de Bulhões - Urologista"
            className={`h-16 lg:h-20 w-auto transition-all duration-300 ${scrolled ? '' : 'brightness-0 invert'}`}
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-white/10 ${
                scrolled
                  ? "text-[#0A2540]/70 hover:text-[#0A2540] hover:bg-[#0A2540]/5"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              className="bg-[#0D9488] hover:bg-[#0B7C72] text-white rounded-md px-5 h-10 text-sm font-semibold shadow-md"
            >
              <Phone className="w-4 h-4 mr-2" />
              Agendar Consulta
            </Button>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 rounded-md transition-colors ${
            scrolled ? "text-[#0A2540]" : "text-white"
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
            className="lg:hidden bg-white border-b border-border overflow-hidden"
          >
            <nav className="container py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-[#0A2540] font-medium text-sm rounded-md hover:bg-[#0A2540]/5 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/sao-paulo"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2"
              >
                <Button className="w-full bg-[#0D9488] hover:bg-[#0B7C72] text-white">
                  <Phone className="w-4 h-4 mr-2" />
                  Agendar Consulta
                </Button>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
