/*
 * Design: Clinical Precision — Swiss Medical Design
 * Footer: Clean, minimal with essential info
 */
import { Instagram, ExternalLink, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#071A2E] text-white/60 py-12 lg:py-16">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-md bg-[#0D9488] flex items-center justify-center">
                <span className="text-white font-serif text-base leading-none">B</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white tracking-tight leading-tight">
                  Dr. Felipe de Bulhões
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#5EEAD4]">
                  Urologia & Cirurgia
                </span>
              </div>
            </div>
            <p className="text-sm text-white/40 font-sans leading-relaxed max-w-xs">
              Urologista e Cirurgião Geral. CRM-SP 202291. Membro Titular do Colégio
              Brasileiro de Cirurgiões (TCBC).
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white font-sans mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#0D9488] mt-0.5 shrink-0" />
                <span className="text-sm font-sans">
                  Av. Paulista, 1048, 18° andar<br />
                  Bela Vista, São Paulo - SP
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0D9488] shrink-0" />
                <span className="text-sm font-sans">(11) 98112-0000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0D9488] shrink-0" />
                <span className="text-sm font-sans">contato@bulhoesurohealth.com</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white font-sans mb-4">Links</h4>
            <div className="space-y-3">
              <a
                href="https://www.instagram.com/drfelipebulhoes/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#5EEAD4] transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span className="text-sm font-sans">Instagram</span>
              </a>
              <a
                href="https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/sao-paulo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#5EEAD4] transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm font-sans">Doctoralia</span>
              </a>
              <a
                href="#inicio"
                className="flex items-center gap-2 hover:text-[#5EEAD4] transition-colors"
              >
                <span className="text-sm font-sans">Voltar ao topo</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30 font-sans">
              &copy; {currentYear} Dr. Felipe de Bulhões Ojeda. Todos os direitos reservados.
            </p>
            <p className="text-xs text-white/30 font-sans">
              CRM-SP 202291 | RQE 108833 | TCBC
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
