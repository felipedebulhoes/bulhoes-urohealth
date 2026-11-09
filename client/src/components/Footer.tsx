/*
 * Design: Clinical Precision — Swiss Medical Design
 * Footer: Clean, minimal with essential info — active locations + teleconsulta
 */
import { Instagram, ExternalLink, MapPin, Phone, Mail, Monitor } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F2A3F] text-white/60 py-12 lg:py-16">
      <div className="container">
        {/* Logo ampliado */}
        <div className="mb-10">
          <img loading="lazy"
            src="/brand/logo-site-fundo-escuro.png"
            alt="Dr. Felipe de Bulhões - Urologista"
            className="h-16 lg:h-20 w-auto"
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

            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-md bg-[#B87333]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" style={{ color: "#AFC1D0" }} />
                </div>
                <span className="text-xs font-sans text-white/70 leading-relaxed">
                  Av. Benjamin Constant, 1991<br />
                  Cambuí, Campinas - SP
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-[#B87333]/15 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5" style={{ color: "#D9C58A" }} />
                </div>
                <span className="text-xs font-sans text-white/70">(19) 2127-2900</span>
              </div>
              <a
                href="https://wa.me/5519998559890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-white/70 hover:text-white transition-colors group"
              >
                <div className="w-7 h-7 rounded-md bg-[#25D366]/15 group-hover:bg-[#25D366]/25 flex items-center justify-center shrink-0 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                </div>
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
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-md bg-[#B87333]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" style={{ color: "#AFC1D0" }} />
                </div>
                <span className="text-xs font-sans text-white/70 leading-relaxed">
                  Av. Paulista, 1048, 18° andar<br />
                  Bela Vista, São Paulo - SP
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-[#B87333]/15 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5" style={{ color: "#D9C58A" }} />
                </div>
                <span className="text-xs font-sans text-white/70">(11) 3382-1529</span>
              </div>
            </div>
          </div>

          {/* Clinovi Pinheiros */}
          <div>
            <h4 className="text-sm font-semibold text-white font-sans mb-3">Clinovi Pinheiros</h4>
            <span className="inline-block text-[10px] uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded mb-3">
              Particular
            </span>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-md bg-[#B87333]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" style={{ color: "#AFC1D0" }} />
                </div>
                <span className="text-xs font-sans text-white/70 leading-relaxed">
                  Av. Rebouças, 2636<br />
                  Pinheiros, São Paulo - SP
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-[#B87333]/15 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5" style={{ color: "#D9C58A" }} />
                </div>
                <span className="text-xs font-sans text-white/70">(11) 3382-1529</span>
              </div>
            </div>
          </div>

          {/* CEMED - Rede D'Or - São Luiz Campinas */}
          <div>
            <h4 className="text-sm font-semibold text-white font-sans mb-3">São Luiz Campinas</h4>

            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-md bg-[#B87333]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" style={{ color: "#AFC1D0" }} />
                </div>
                <span className="text-xs font-sans text-white/70 leading-relaxed">
                  Av. Andrade Neves, 863<br />
                  Centro, Campinas - SP
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-[#B87333]/15 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5" style={{ color: "#D9C58A" }} />
                </div>
                <span className="text-xs font-sans text-white/70">(19) 3014-3000</span>
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
                className="flex items-center gap-2.5 text-white/70 hover:text-white transition-colors group"
              >
                <div className="w-7 h-7 rounded-md bg-[#B87333]/15 group-hover:bg-[#B87333]/25 flex items-center justify-center shrink-0 transition-colors">
                  <Instagram className="w-3.5 h-3.5" style={{ color: "#D8A5A5" }} />
                </div>
                <span className="text-xs font-sans">@drfelipebulhoes</span>
              </a>
              <a
                href="https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas?utm_source=site&utm_medium=footer&utm_campaign=footer"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-white/70 hover:text-white transition-colors group"
              >
                <div className="w-7 h-7 rounded-md bg-[#B87333]/15 group-hover:bg-[#B87333]/25 flex items-center justify-center shrink-0 transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" style={{ color: "#AFC1D0" }} />
                </div>
                <span className="text-xs font-sans">Doctoralia</span>
              </a>
              <div className="flex items-center gap-2.5 text-white/70">
                <div className="w-7 h-7 rounded-md bg-[#B87333]/15 flex items-center justify-center shrink-0">
                  <Monitor className="w-3.5 h-3.5" style={{ color: "#B7C0A1" }} />
                </div>
                <span className="text-xs font-sans">Teleconsulta disponível</span>
              </div>
              <a
                href="mailto:contato@felipebulhoes.com"
                className="flex items-center gap-2.5 text-white/70 hover:text-white transition-colors group"
              >
                <div className="w-7 h-7 rounded-md bg-[#B87333]/15 group-hover:bg-[#B87333]/25 flex items-center justify-center shrink-0 transition-colors">
                  <Mail className="w-3.5 h-3.5" style={{ color: "#E1B58A" }} />
                </div>
                <span className="text-xs font-sans break-all">contato@felipebulhoes.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Navegação de Procedimentos e Especialidades (SEO Internal Linking) */}
        <div className="pt-8 pb-8 border-t border-white/8">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-white/45 mb-3">
            Procedimentos e Áreas de Atuação em Destaque
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-sans text-white/65">
            <Link href="/preenchimento-peniano" className="hover:text-white transition-colors">
              Preenchimento Peniano com Ácido Hialurônico
            </Link>
            <Link href="/estetica-intima-masculina" className="hover:text-white transition-colors">
              Estética Íntima Masculina
            </Link>
            <Link href="/andrologia-performance-masculina" className="hover:text-white transition-colors">
              Andrologia e Saúde Hormonal
            </Link>
            <Link href="/vasectomia-sem-bisturi" className="hover:text-white transition-colors">
              Vasectomia Sem Bisturi
            </Link>
            <Link href="/saude-da-prostata" className="hover:text-white transition-colors">
              Saúde da Próstata e HPB
            </Link>
            <Link href="/cirurgia-robotica-urologia" className="hover:text-white transition-colors">
              Cirurgia Robótica em Urologia
            </Link>
            <Link href="/litotripsia-calculo-renal" className="hover:text-white transition-colors">
              Cálculos Renais e Litotripsia a Laser
            </Link>
            <Link href="/avaliacao-urodinamica" className="hover:text-white transition-colors">
              Exame de Urodinâmica e Incontinência
            </Link>
            <Link href="/uro-oncologia" className="hover:text-white transition-colors">
              Uro-Oncologia
            </Link>
            <Link href="/educativo/engrossamento-peniano" className="hover:text-white transition-colors">
              Guia Educativo: Engrossamento Peniano
            </Link>
            <Link href="/consultorios" className="hover:text-white transition-colors">
              Consultórios em São Paulo e Campinas
            </Link>
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
