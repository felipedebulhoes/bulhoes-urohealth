import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  CircleHelp,
  Home,
  MapPin,
  MessageCircle,
  Search,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";

const usefulLinks = [
  {
    title: "Agendar consulta",
    description: "Escolha o melhor horário para atendimento presencial ou teleconsulta.",
    href: "/agendamento",
    icon: CalendarCheck,
  },
  {
    title: "Conteúdos educativos",
    description: "Informações sobre prevenção, exames e tratamentos urológicos.",
    href: "/blog",
    icon: BookOpen,
  },
  {
    title: "Consultórios",
    description: "Encontre as opções de atendimento em São Paulo, Campinas e ABC.",
    href: "/consultorios",
    icon: MapPin,
  },
  {
    title: "Falar com a equipe",
    description: "Confira telefones, WhatsApp e outros canais administrativos.",
    href: "/contato",
    icon: MessageCircle,
  },
  {
    title: "Primeira consulta",
    description: "Veja como se preparar para uma consulta urológica.",
    href: "/primeira-consulta",
    icon: CircleHelp,
  },
];

export default function NotFound() {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.title = "Página não encontrada | Dr. Felipe de Bulhões";
  }, []);

  const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
  const matchingLinks = useMemo(() => {
    if (!normalizedQuery) return usefulLinks;
    return usefulLinks.filter(link =>
      `${link.title} ${link.description}`.toLocaleLowerCase("pt-BR").includes(normalizedQuery)
    );
  }, [normalizedQuery]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (matchingLinks[0]) setLocation(matchingLinks[0].href);
  };

  return (
    <main className="min-h-screen bg-[#F6F8FA] px-4 py-10 text-[#1C3D5A] dark:bg-[#0B1F31] dark:text-foreground sm:py-16">
      <div className="mx-auto w-full max-w-5xl">
        <div className="overflow-hidden rounded-3xl border border-[#1C3D5A]/10 bg-white shadow-xl shadow-[#1C3D5A]/8 dark:border-white/10 dark:bg-card">
          <section className="relative overflow-hidden bg-gradient-to-br from-[#1C3D5A] via-[#0F3460] to-[#09243D] px-6 py-10 text-white sm:px-10 sm:py-14">
            <div className="absolute -right-16 -top-16 size-56 rounded-full border border-[#D4884A]/25" aria-hidden="true" />
            <div className="absolute -bottom-24 left-1/3 size-64 rounded-full border border-white/10" aria-hidden="true" />
            <div className="relative max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#D4884A]">Erro 404</p>
              <h1 className="font-serif text-3xl leading-tight sm:text-5xl">Esta página não está disponível</h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                O endereço pode ter sido alterado ou digitado de forma diferente. Use a busca abaixo ou escolha um caminho útil para continuar.
              </p>
            </div>
          </section>

          <section className="px-6 py-8 sm:px-10 sm:py-10">
            <form onSubmit={handleSearch} role="search" className="mx-auto max-w-2xl" aria-label="Buscar uma página do site">
              <label htmlFor="not-found-search" className="mb-2 block text-sm font-semibold text-[#1C3D5A] dark:text-foreground">
                O que você procura?
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#1C3D5A]/45 dark:text-foreground/45" aria-hidden="true" />
                  <input
                    id="not-found-search"
                    type="search"
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                    placeholder="Ex.: agendamento, consultório ou conteúdo"
                    className="h-12 w-full rounded-xl border border-[#1C3D5A]/15 bg-white pl-12 pr-11 text-sm outline-none transition-colors placeholder:text-[#1C3D5A]/45 focus:border-[#B87333] focus:ring-2 focus:ring-[#B87333]/20 dark:border-white/15 dark:bg-[#102B40] dark:text-foreground dark:placeholder:text-foreground/45"
                    aria-describedby="not-found-search-status"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="absolute right-3 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-[#1C3D5A]/55 transition-colors hover:bg-[#1C3D5A]/5 hover:text-[#1C3D5A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87333] dark:text-foreground/55 dark:hover:bg-white/10 dark:hover:text-foreground"
                      aria-label="Limpar busca"
                    >
                      <X className="size-4" />
                    </button>
                  )}
                </div>
                <Button type="submit" disabled={matchingLinks.length === 0} className="h-12 bg-[#B87333] px-6 text-white hover:bg-[#9D602A] disabled:opacity-50">
                  Buscar
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
              <p id="not-found-search-status" className="mt-3 text-sm text-[#1C3D5A]/60 dark:text-foreground/60" aria-live="polite">
                {normalizedQuery
                  ? matchingLinks.length
                    ? `${matchingLinks.length} opção${matchingLinks.length === 1 ? "" : "ões"} encontrada${matchingLinks.length === 1 ? "" : "s"}. Pressione Buscar para abrir a primeira opção.`
                    : "Nenhuma página correspondente foi encontrada. Tente outro termo ou escolha uma opção abaixo."
                  : "Busque por agendamento, consultório, contato, primeira consulta ou conteúdo."}
              </p>
            </form>

            <div className="mt-9 border-t border-[#1C3D5A]/10 pt-8 dark:border-white/10">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-[#1C3D5A] dark:text-foreground">Caminhos úteis</h2>
                  <p className="mt-1 text-sm text-[#1C3D5A]/60 dark:text-foreground/60">Escolha uma opção para voltar à navegação do site.</p>
                </div>
                <Link href="/">
                  <Button variant="outline" className="border-[#1C3D5A]/20 bg-transparent text-[#1C3D5A] hover:bg-[#1C3D5A]/5 dark:border-white/20 dark:text-foreground dark:hover:bg-white/10">
                    <Home className="mr-2 size-4" />
                    Ir para o início
                  </Button>
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {matchingLinks.map(link => {
                  const Icon = link.icon;
                  return (
                    <Link key={link.href} href={link.href} className="group rounded-2xl border border-[#1C3D5A]/10 bg-[#F9FAFB] p-4 transition-all hover:-translate-y-0.5 hover:border-[#B87333]/45 hover:bg-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87333] dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
                      <div className="flex items-start gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#B87333]/10 text-[#B87333]">
                          <Icon className="size-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-[#1C3D5A] group-hover:text-[#9D602A] dark:text-foreground dark:group-hover:text-[#D4884A]">{link.title}</p>
                          <p className="mt-1 text-sm leading-relaxed text-[#1C3D5A]/60 dark:text-foreground/60">{link.description}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
