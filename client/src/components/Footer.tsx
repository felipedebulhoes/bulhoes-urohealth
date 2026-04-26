/*
 * Design: Clinical Precision — Swiss Medical Design
 * Footer: Clean, minimal with essential info — 5 locations + teleconsulta
 */
import { Instagram, ExternalLink, MapPin, Phone, Mail, Monitor } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#071A2E] text-white/60 py-12 lg:py-16">
      <div className="container">
        {/* Logo ampliado */}
        <div className="mb-10">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/logo_min8_d351a844.webp"
            alt="Dr. Felipe de Bulhões - Urologista"
            className="h-16 lg:h-20 w-auto brightness-0 invert"
          />
          <p className="text-sm text-white/40 font-sans leading-relaxed max-w-md mt-4">
            Urologista e Cirurgião Geral. CRM-SP 202291. Membro Titular do Colégio
            Brasileiro de Cirurgiões (TCBC).
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {/* Campinas Day Hospital */}
          <div>
            <h4 className="text-sm font-semibold text-white font-sans mb-3">Campinas Day Hospital</h4>
            <span className="inline-block text-[10px] uppercase tracking-wider text-[#5EEAD4] bg-[#5EEAD4]/10 px-2 py-0.5 rounded mb-3">
              Convênios
            </span>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#0D9488] mt-0.5 shrink-0" />
                <span className="text-xs font-sans">
                  Av. Benjamin Constant, 1991<br />
                  Cambuí, Campinas - SP
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
                <span className="text-xs font-sans">(19) 2127-2900</span>
              </div>
              <a href="https://wa.me/5519998559890" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-[#25D366] transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                <span className="text-xs font-sans">WhatsApp: (19) 99855-9890</span>
              </a>
            </div>
          </div>

          {/* Clinovi Paulista */}
          <div>
            <h4 className="text-sm font-semibold text-white font-sans mb-3">Clinovi Paulista</h4>
            <span className="inline-block text-[10px] uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded mb-3">
              Particular
            </span>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#0D9488] mt-0.5 shrink-0" />
                <span className="text-xs font-sans">
                  Av. Paulista, 1048, 18° andar<br />
                  Bela Vista, São Paulo - SP
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
                <span className="text-xs font-sans">(11) 3382-1529</span>
              </div>
            </div>
          </div>

          {/* Clinovi Moema */}
          <div>
            <h4 className="text-sm font-semibold text-white font-sans mb-3">Clinovi Moema</h4>
            <span className="inline-block text-[10px] uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded mb-3">
              Particular
            </span>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#0D9488] mt-0.5 shrink-0" />
                <span className="text-xs font-sans">
                  Av. Ibirapuera, 1835, 2° andar<br />
                  Moema, São Paulo - SP
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
                <span className="text-xs font-sans">(11) 3382-1529</span>
              </div>
            </div>
          </div>

          {/* Clinovi Pinheiros */}
          <div>
            <h4 className="text-sm font-semibold text-white font-sans mb-3">Clinovi Pinheiros</h4>
            <span className="inline-block text-[10px] uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded mb-3">
              Particular
            </span>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#0D9488] mt-0.5 shrink-0" />
                <span className="text-xs font-sans">
                  Av. Rebouças, 2636<br />
                  Pinheiros, São Paulo - SP
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
                <span className="text-xs font-sans">(11) 3382-1529</span>
              </div>
            </div>
          </div>

          {/* Clinovi SBC */}
          <div>
            <h4 className="text-sm font-semibold text-white font-sans mb-3">Clinovi SBC</h4>
            <span className="inline-block text-[10px] uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded mb-3">
              Particular
            </span>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#0D9488] mt-0.5 shrink-0" />
                <span className="text-xs font-sans">
                  Av. Pereira Barreto, 1479<br />
                  São Bernardo do Campo - SP
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
                <span className="text-xs font-sans">(11) 3382-1529</span>
              </div>
            </div>
          </div>

          {/* CEMED - Rede D'Or - São Luiz Campinas */}
          <div>
            <h4 className="text-sm font-semibold text-white font-sans mb-3">São Luiz Campinas</h4>
            <span className="inline-block text-[10px] uppercase tracking-wider text-[#5EEAD4] bg-[#5EEAD4]/10 px-2 py-0.5 rounded mb-3">
              Convênios & Particular
            </span>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#0D9488] mt-0.5 shrink-0" />
                <span className="text-xs font-sans">
                  Av. Andrade Neves, 863<br />
                  Centro, Campinas - SP
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
                <span className="text-xs font-sans">(19) 3014-3000</span>
              </div>
            </div>
          </div>

          {/* Links & Teleconsulta */}
          <div>
            <h4 className="text-sm font-semibold text-white font-sans mb-3">Links</h4>
            <div className="space-y-3">
              <a
                href="https://www.instagram.com/drfelipebulhoes/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#5EEAD4] transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span className="text-xs font-sans">@drfelipebulhoes</span>
              </a>
              <a
                href="https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#5EEAD4] transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-xs font-sans">Doctoralia</span>
              </a>
              <div className="flex items-center gap-2 text-white/50">
                <Monitor className="w-4 h-4 text-[#0D9488]" />
                <span className="text-xs font-sans">Teleconsulta disponível</span>
              </div>
              <div className="flex items-center gap-2 text-white/50">
                <Mail className="w-4 h-4 text-[#0D9488]" />
                <span className="text-xs font-sans">drfelipebulhoes@bulhoesurohealth.com</span>
              </div>
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
              CRM-SP 202291 | RQE 146538 / RQE 114019 | TCBC
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
