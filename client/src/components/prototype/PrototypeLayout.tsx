import { useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { CalendarCheck, ChevronRight, Menu, ShieldCheck, X } from "lucide-react";
import { trackPrototypeEvent } from "@/lib/analytics";

const BASE = "/prototipo-jornada-paciente";

const links = [
  { label: "Comece por aqui", href: BASE },
  { label: "Saúde do homem", href: `${BASE}/saude-do-homem` },
  { label: "Saúde íntima e performance", href: `${BASE}/saude-intima-performance` },
  { label: "Engrossamento com AH", href: `${BASE}/engrossamento-peniano` },
];

interface PrototypeLayoutProps {
  children: ReactNode;
  breadcrumb?: string;
}

export default function PrototypeLayout({ children, breadcrumb }: PrototypeLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-[#F7F8F8] text-[#17364F] dark:bg-background dark:text-foreground">
      <a
        href="#conteudo-prototipo"
        className="sr-only z-[100] rounded-md bg-white px-4 py-3 font-semibold text-[#17364F] focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Pular para o conteúdo
      </a>

      <div className="border-b border-[#B87333]/25 bg-[#112F47] px-4 py-2 text-center text-xs font-medium tracking-wide text-white">
        Protótipo para validação — não indexado e sem envio de dados clínicos
      </div>

      <header className="sticky top-0 z-40 border-b border-[#17364F]/10 bg-white/95 backdrop-blur dark:bg-card/95">
        <div className="container flex min-h-20 items-center justify-between gap-4">
          <Link
            href={BASE}
            aria-label="Dr. Felipe de Bulhões — início do protótipo"
            className="flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87333] focus-visible:ring-offset-4"
          >
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#B87333] font-serif text-sm font-semibold tracking-wide text-[#9D602A]" aria-hidden="true">
              FB
            </span>
            <span className="hidden sm:block">
              <span className="block font-serif text-base leading-none text-[#17364F] dark:text-foreground">Dr. Felipe de Bulhões</span>
              <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.12em] text-[#17364F]/55 dark:text-foreground/55">Urologia e saúde do homem</span>
            </span>
          </Link>

          <nav aria-label="Navegação do protótipo" className="hidden items-center gap-1 lg:flex">
            {links.map((link) => {
              const active = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => trackPrototypeEvent("topic_hub_open", "prototype_header", link.href)}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87333] ${
                    active ? "bg-[#17364F] text-white" : "text-[#17364F]/75 hover:bg-[#17364F]/5 hover:text-[#17364F] dark:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Link
              href={`${BASE}/agendamento`}
              onClick={() => trackPrototypeEvent("cta_schedule", "prototype_header")}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#B87333] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#9D602A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87333] focus-visible:ring-offset-2 active:scale-[0.98]"
            >
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              Agendar
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-[#17364F]/15 text-[#17364F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87333] lg:hidden dark:text-foreground"
            aria-expanded={mobileOpen}
            aria-controls="prototype-mobile-menu"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <nav id="prototype-mobile-menu" aria-label="Navegação móvel do protótipo" className="border-t border-[#17364F]/10 bg-white px-4 py-4 lg:hidden dark:bg-card">
            <div className="container grid gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setMobileOpen(false);
                    trackPrototypeEvent("topic_hub_open", "prototype_mobile_header", link.href);
                  }}
                  className="flex min-h-11 items-center justify-between rounded-lg px-3 py-2 font-medium text-[#17364F] hover:bg-[#17364F]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87333] dark:text-foreground"
                >
                  {link.label}
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              ))}
              <Link
                href={`${BASE}/agendamento`}
                onClick={() => {
                  setMobileOpen(false);
                  trackPrototypeEvent("cta_schedule", "prototype_mobile_header");
                }}
                className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#B87333] px-4 font-semibold text-white"
              >
                <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                Agendar avaliação
              </Link>
            </div>
          </nav>
        )}
      </header>

      {breadcrumb && (
        <div className="container py-4 text-sm text-[#17364F]/60 dark:text-foreground/60">
          <Link href={BASE} className="underline-offset-4 hover:underline">Protótipo</Link>
          <span aria-hidden="true"> / </span>
          <span>{breadcrumb}</span>
        </div>
      )}

      <main id="conteudo-prototipo">{children}</main>

      <footer className="border-t border-white/10 bg-[#112F47] py-10 text-white">
        <div className="container grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="font-serif text-xl">Cuidado urológico com clareza e discrição</p>
            <p className="mt-2 max-w-xl text-sm text-white/65">Este ambiente demonstra uma possível nova jornada. Nenhuma solicitação de consulta é enviada a partir do protótipo.</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/70">
            <ShieldCheck className="h-5 w-5 text-[#D99A61]" aria-hidden="true" />
            Privacidade desde o primeiro contato
          </div>
        </div>
      </footer>
    </div>
  );
}

export { BASE as PROTOTYPE_BASE };
