import { useState, type ComponentType, type ReactNode } from "react";
import { Link } from "wouter";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  Clock3,
  HeartPulse,
  Hospital,
  LockKeyhole,
  MapPin,
  MessageCircle,
  Microscope,
  Phone,
  Search,
  Scale,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Syringe,
  UserRoundCheck,
} from "lucide-react";
import PrototypeLayout, { PROTOTYPE_BASE } from "@/components/prototype/PrototypeLayout";
import PrototypeMeta from "@/components/prototype/PrototypeMeta";
import PrototypeEmailContactForm from "@/components/prototype/PrototypeEmailContactForm";
import PrototypeBackToTop from "@/components/prototype/PrototypeBackToTop";
import PrototypeFaqHelpfulButton, { type PopularFaqQuestionId } from "@/components/prototype/PrototypeFaqHelpfulButton";
import { ScrollReveal } from "@/components/ScrollReveal";
import { trackPrototypeEvent } from "@/lib/analytics";

type IconType = ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;

const portrait = "/manus-storage/felipe-portrait_0e0693e4_be070ac1.webp";

type MensHealthCategory = "all" | "prevention" | "sexual" | "urological" | "reproductive";

const mensHealthCategories: Array<{ id: MensHealthCategory; label: string }> = [
  { id: "all", label: "Todos" },
  { id: "prevention", label: "Prevenção" },
  { id: "sexual", label: "Sexual e hormonal" },
  { id: "urological", label: "Urológica" },
  { id: "reproductive", label: "Reprodutiva" },
];

const mensHealthContent: Array<{
  id: string;
  category: Exclude<MensHealthCategory, "all">;
  categoryLabel: string;
  title: string;
  description: string;
  href: string;
  Icon: IconType;
}> = [
  { id: "prostate-screening", category: "prevention", categoryLabel: "Prevenção", title: "Próstata e rastreamento", description: "Entenda como idade, histórico familiar e preferências orientam uma decisão individualizada.", href: "/educativo/cancer-de-prostata", Icon: ShieldCheck },
  { id: "healthy-aging", category: "prevention", categoryLabel: "Prevenção", title: "Saúde integral ao longo da vida", description: "Organize fatores cardiovasculares, metabólicos, hábitos e prevenção em uma mesma avaliação.", href: `${PROTOTYPE_BASE}/agendamento`, Icon: HeartPulse },
  { id: "erectile-health", category: "sexual", categoryLabel: "Sexual e hormonal", title: "Disfunção erétil", description: "Conheça causas possíveis, sinais associados e etapas de uma investigação responsável.", href: "/educativo/disfuncao-eretil", Icon: Activity },
  { id: "male-performance", category: "sexual", categoryLabel: "Sexual e hormonal", title: "Performance masculina", description: "Diferencie energia, libido, função sexual e saúde hormonal sem promessas simplificadoras.", href: "/andrologia-performance-masculina", Icon: Sparkles },
  { id: "urinary-symptoms", category: "urological", categoryLabel: "Urológica", title: "Sintomas urinários e próstata aumentada", description: "Veja como sintomas e impacto na rotina orientam investigação e opções de cuidado.", href: "/educativo/tratamentos-hpb", Icon: Stethoscope },
  { id: "varicocele", category: "urological", categoryLabel: "Urológica", title: "Varicocele", description: "Saiba quando desconforto, alterações testiculares ou fertilidade merecem avaliação.", href: "/educativo/varicocele", Icon: Microscope },
  { id: "male-fertility", category: "reproductive", categoryLabel: "Reprodutiva", title: "Fertilidade masculina", description: "Entenda a avaliação do casal, exames iniciais e fatores masculinos modificáveis.", href: "/educativo/infertilidade-masculina", Icon: UserRoundCheck },
  { id: "vasectomy", category: "reproductive", categoryLabel: "Reprodutiva", title: "Vasectomia", description: "Conheça critérios legais, técnica, recuperação, eficácia e necessidade de espermograma.", href: "/educativo/vasectomia", Icon: BadgeCheck },
];

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#A9652D]">
      <span className="h-px w-8 bg-[#B87333]" aria-hidden="true" />
      {children}
    </p>
  );
}

function PrototypeLink({
  href,
  children,
  source,
  item,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  source: string;
  item: string;
  secondary?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={() => trackPrototypeEvent("journey_entry_selected", source, item)}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87333] focus-visible:ring-offset-2 active:scale-[0.98] ${
        secondary
          ? "border border-[#17364F]/15 bg-white text-[#17364F] hover:border-[#B87333]/50 hover:text-[#9D602A] dark:bg-card dark:text-foreground"
          : "bg-[#B87333] text-white shadow-lg shadow-[#B87333]/15 hover:bg-[#9D602A]"
      }`}
    >
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

function JourneyCard({
  icon: Icon,
  title,
  description,
  href,
  item,
  eyebrow,
}: {
  icon: IconType;
  title: string;
  description: string;
  href: string;
  item: string;
  eyebrow: string;
}) {
  return (
    <Link
      href={href}
      onClick={() => trackPrototypeEvent("journey_entry_selected", "needs_grid", item)}
      className="group flex h-full min-h-56 flex-col rounded-2xl border border-[#17364F]/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#B87333]/45 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87333] focus-visible:ring-offset-4 dark:bg-card"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#17364F] text-white">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <ArrowRight className="h-5 w-5 text-[#B87333] transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </div>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#A9652D]">{eyebrow}</p>
      <h3 className="mt-2 font-serif text-2xl text-[#17364F] dark:text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#17364F]/75 dark:text-foreground/75">{description}</p>
    </Link>
  );
}

function TrustStrip() {
  const items = [
    { value: "CRM-SP 202291", label: "Registro profissional" },
    { value: "RQE 146538 · 114019", label: "Urologia e Cirurgia Geral" },
    { value: "5,0 · 30 opiniões", label: "Avaliações verificadas" },
    { value: "SBU · AUA · EAU", label: "Sociedades médicas" },
  ];

  return (
    <section aria-label="Credenciais essenciais" className="border-y border-[#17364F]/10 bg-white dark:bg-card">
      <div className="container grid gap-px sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.value} className="px-5 py-5 sm:border-r sm:border-[#17364F]/10 last:border-0">
            <p className="font-semibold text-[#17364F] dark:text-foreground">{item.value}</p>
            <p className="mt-1 text-xs text-[#17364F]/70 dark:text-foreground/70">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ConfidentialityNote() {
  return (
    <div className="flex gap-3 rounded-2xl border border-[#B87333]/25 bg-[#FFF9F4] p-5 dark:bg-[#B87333]/10">
      <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-[#A9652D]" aria-hidden="true" />
      <div>
        <h3 className="font-semibold text-[#17364F] dark:text-foreground">Privacidade desde o primeiro contato</h3>
        <p className="mt-1 text-sm leading-6 text-[#17364F]/75 dark:text-foreground/75">
          Você não precisa relatar detalhes íntimos em formulários abertos. A consulta oferece um espaço confidencial para compreender sua necessidade, expectativas, possibilidades e limites.
        </p>
      </div>
    </div>
  );
}

function Disclosure({ title, children, id }: { title: string; children: ReactNode; id: string }) {
  return (
    <details
      className="group rounded-2xl border border-[#17364F]/10 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#B87333]/45 hover:bg-[#FFF9F4] hover:shadow-md focus-within:border-[#B87333]/55 focus-within:ring-2 focus-within:ring-[#B87333]/15 open:border-[#B87333]/45 open:bg-[#FFF9F4] dark:bg-card dark:hover:bg-[#B87333]/10 motion-reduce:transform-none"
      onToggle={(event) => {
        if (event.currentTarget.open) trackPrototypeEvent("faq_open", "progressive_disclosure", id);
      }}
    >
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-lg font-semibold text-[#17364F] transition-colors group-hover:text-[#9D602A] focus-visible:outline-none dark:text-foreground">
        {title}
        <ChevronDown className="h-5 w-5 shrink-0 text-[#B87333] transition-transform group-hover:translate-y-0.5 group-open:rotate-180 motion-reduce:transform-none" aria-hidden="true" />
      </summary>
      <div className="mt-4 border-t border-[#17364F]/8 pt-4 text-sm leading-7 text-[#17364F]/70 dark:text-foreground/70">{children}</div>
    </details>
  );
}

export function PrototypePatientJourneyHome() {
  return (
    <PrototypeLayout>
      <PrototypeMeta title="Jornada orientada ao paciente" pageId="prototype_home" />

      <section className="relative overflow-hidden bg-[#112F47] text-white">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "34px 34px" }} />
        <div className="container relative grid min-h-[640px] items-center gap-10 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:py-20">
          <div>
            <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#E3A66F]">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Urologia e saúde do homem em São Paulo e Campinas
            </p>
            <h1 className="max-w-3xl font-serif text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
              Sua saúde merece uma conversa clara — inclusive sobre assuntos íntimos.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/72 sm:text-lg">
              Informação confiável, avaliação individualizada e atendimento sem julgamentos para prevenção, saúde sexual, performance, estética genital e urologia completa.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#como-posso-ajudar"
                onClick={() => trackPrototypeEvent("journey_entry_selected", "prototype_hero", "explore_needs")}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#B87333] px-5 py-3 font-semibold text-white shadow-lg shadow-black/10 transition hover:bg-[#D08A50] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#112F47]"
              >
                Encontrar meu caminho
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#como-funciona"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/25 px-5 py-3 font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Como funciona a consulta
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/65">
              <span className="flex items-center gap-2"><LockKeyhole className="h-4 w-4 text-[#E3A66F]" aria-hidden="true" /> Atendimento confidencial</span>
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#E3A66F]" aria-hidden="true" /> Presencial e teleconsulta</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md self-end">
            <div className="absolute -inset-5 rounded-[2rem] border border-[#B87333]/30" aria-hidden="true" />
            <img
              src={portrait}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              alt="Dr. Felipe de Bulhões, urologista"
              className="relative w-full rounded-[1.5rem] object-cover shadow-2xl shadow-black/25"
            />
            <div className="absolute -bottom-5 left-4 right-4 rounded-xl bg-white p-4 text-[#17364F] shadow-xl sm:left-8 sm:right-auto sm:max-w-xs">
              <p className="font-semibold">Dr. Felipe de Bulhões</p>
              <p className="mt-1 text-xs text-[#17364F]/75">Urologista e Cirurgião Geral · Instituto D'Or</p>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      <section id="como-posso-ajudar" className="scroll-mt-28 py-20 lg:py-28">
        <div className="container">
          <div className="max-w-2xl">
            <SectionLabel>Comece pela sua necessidade</SectionLabel>
            <h2 className="font-serif text-3xl leading-tight text-[#17364F] sm:text-4xl dark:text-foreground">Como posso ajudar você hoje?</h2>
            <p className="mt-4 leading-7 text-[#17364F]/65 dark:text-foreground/65">Você não precisa saber o nome médico do problema. Escolha o caminho que mais se aproxima do que procura.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <JourneyCard icon={HeartPulse} eyebrow="Prevenção e longevidade" title="Saúde do homem" description="Check-up, próstata, metabolismo, hormônios e cuidado ao longo da vida." href={`${PROTOTYPE_BASE}/saude-do-homem`} item="mens_health" />
            <JourneyCard icon={Activity} eyebrow="Função e qualidade de vida" title="Performance masculina" description="Energia, libido, ereção, composição corporal e investigação responsável." href={`${PROTOTYPE_BASE}/saude-intima-performance#performance`} item="performance" />
            <JourneyCard icon={Sparkles} eyebrow="Conversa discreta" title="Saúde íntima e estética" description="Aparência, circunferência, curvatura, desconforto e expectativas realistas." href={`${PROTOTYPE_BASE}/saude-intima-performance`} item="intimate_aesthetics" />
            <JourneyCard icon={Stethoscope} eyebrow="Sintomas e tratamentos" title="Urologia completa" description="Próstata, cálculos, oncologia, incontinência, fertilidade e cirurgias." href="#urologia-completa" item="general_urology" />
          </div>
        </div>
      </section>

      <section className="bg-[#EAF0F3] py-20 lg:py-28 dark:bg-card">
        <div className="container grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionLabel>Saúde íntima e performance</SectionLabel>
            <h2 className="font-serif text-3xl leading-tight text-[#17364F] sm:text-4xl dark:text-foreground">Informação médica sem constrangimento, pressão ou promessa.</h2>
            <p className="mt-5 leading-7 text-[#17364F]/65 dark:text-foreground/65">Questões de sexualidade, hormônios e aparência podem afetar bem-estar e relacionamentos. Uma avaliação responsável considera saúde geral, função, expectativas, alternativas e limites.</p>
            <div className="mt-7">
              <PrototypeLink href={`${PROTOTYPE_BASE}/saude-intima-performance`} source="featured_hub" item="intimate_performance">Explorar saúde íntima e performance</PrototypeLink>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Performance sexual", "Libido, ereção, ejaculação e fatores cardiometabólicos."],
              ["Saúde hormonal", "Sintomas, exames, fertilidade e quando tratamento pode ser considerado."],
              ["Estética genital", "Objetivos, anatomia, alternativas e expectativas realistas."],
              ["Engrossamento com AH", "Procedimento eletivo, temporário, reversível e não indicado para todos."],
            ].map(([title, description]) => (
              <article key={title} className="rounded-2xl border border-[#17364F]/8 bg-white p-5 dark:bg-background">
                <h3 className="font-semibold text-[#17364F] dark:text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#17364F]/60 dark:text-foreground/60">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="scroll-mt-28 bg-white py-20 lg:py-28 dark:bg-background">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>Uma consulta sem surpresas</SectionLabel>
            <h2 className="font-serif text-3xl text-[#17364F] sm:text-4xl dark:text-foreground">Como funciona a avaliação</h2>
            <p className="mt-4 leading-7 text-[#17364F]/65 dark:text-foreground/65">O objetivo inicial é compreender sua saúde e ajudar você a tomar uma decisão informada — não indicar um procedimento antecipadamente.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { n: "01", title: "Escuta e contexto", text: "Uma conversa confidencial sobre sintomas, objetivos, histórico, medicamentos e preocupações." },
              { n: "02", title: "Avaliação individual", text: "Exame e investigação somente quando indicados, considerando saúde global e fertilidade." },
              { n: "03", title: "Decisão compartilhada", text: "Possibilidades, benefícios, riscos, limites e alternativa de não tratar são discutidos com clareza." },
            ].map((step) => (
              <article key={step.n} className="rounded-2xl border border-[#17364F]/10 bg-[#F7F8F8] p-6 dark:bg-card">
                <span className="text-sm font-bold text-[#B87333]">{step.n}</span>
                <h3 className="mt-5 font-serif text-2xl text-[#17364F] dark:text-foreground">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#17364F]/65 dark:text-foreground/65">{step.text}</p>
              </article>
            ))}
          </div>
          <div className="mx-auto mt-8 max-w-3xl"><ConfidentialityNote /></div>
        </div>
      </section>

      <section id="urologia-completa" className="scroll-mt-28 bg-[#112F47] py-20 text-white lg:py-28">
        <div className="container">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#E3A66F]">Urologia completa</p>
            <h2 className="font-serif text-3xl sm:text-4xl">O restante do cuidado continua fácil de encontrar.</h2>
            <p className="mt-4 leading-7 text-white/65">O destaque em saúde do homem e saúde íntima não reduz a cobertura das demais condições urológicas.</p>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [ShieldCheck, "Próstata", "HPB, rastreamento, câncer e tratamentos"],
              [Microscope, "Uro-oncologia", "Próstata, rim, bexiga e testículo"],
              [Hospital, "Cirurgias", "Robótica, laparoscopia e endourologia"],
              [Stethoscope, "Sintomas urinários", "Cálculos, infecções e incontinência"],
            ].map(([Icon, title, text]) => {
              const ItemIcon = Icon as IconType;
              return (
                <article key={title as string} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                  <ItemIcon className="h-5 w-5 text-[#E3A66F]" aria-hidden="true" />
                  <h3 className="mt-4 font-semibold">{title as string}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/55">{text as string}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 text-center dark:bg-background">
        <div className="container max-w-3xl">
          <CalendarCheck className="mx-auto h-9 w-9 text-[#B87333]" aria-hidden="true" />
          <h2 className="mt-5 font-serif text-3xl text-[#17364F] dark:text-foreground">Pronto para conversar com tranquilidade?</h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-[#17364F]/65 dark:text-foreground/65">Veja como seria a jornada de agendamento do protótipo, sem enviar dados ou abrir serviços externos.</p>
          <div className="mt-7"><PrototypeLink href={`${PROTOTYPE_BASE}/agendamento`} source="prototype_home_final" item="schedule">Ver agendamento confidencial</PrototypeLink></div>
        </div>
      </section>
    </PrototypeLayout>
  );
}

export function PrototypeMensHealth() {
  const [activeCategory, setActiveCategory] = useState<MensHealthCategory>("all");
  const shouldReduceMotion = useReducedMotion();
  const stages = [
    { range: "18–39", title: "Construir uma base de saúde", topics: "Sexualidade, fertilidade, vacinação, sono, metabolismo e hábitos." },
    { range: "40–59", title: "Prevenir e investigar mudanças", topics: "Pressão, peso, risco cardiovascular, libido, ereção e próstata conforme risco." },
    { range: "60+", title: "Preservar função e autonomia", topics: "Sintomas urinários, ossos, massa muscular, sexualidade, continência e câncer." },
  ];
  const filteredContent = activeCategory === "all"
    ? mensHealthContent
    : mensHealthContent.filter((item) => item.category === activeCategory);

  return (
    <PrototypeLayout breadcrumb="Saúde do homem">
      <PrototypeMeta title="Saúde do homem" pageId="prototype_mens_health" />
      <section className="bg-[#112F47] py-16 text-white lg:py-24">
        <div className="container max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E3A66F]">Prevenção e cuidado integral</p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">Saúde do homem é mais do que próstata ou testosterona.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">É compreender riscos, hábitos, função sexual, fertilidade, metabolismo e envelhecimento para escolher o cuidado adequado em cada fase da vida.</p>
        </div>
      </section>

      <section className="border-b border-[#17364F]/10 bg-[#F7FAFB] py-16 dark:bg-card" aria-labelledby="mens-health-content-title">
        <div className="container">
          <SectionLabel>Explore por objetivo</SectionLabel>
          <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <h2 id="mens-health-content-title" className="font-serif text-3xl text-[#17364F] sm:text-4xl dark:text-foreground">Encontre conteúdos pela área de cuidado</h2>
              <p className="mt-4 max-w-2xl leading-7 text-[#17364F]/70 dark:text-foreground/70">Use os filtros para reduzir a lista sem precisar informar sintomas ou dados pessoais.</p>
            </div>
            <div className="lg:justify-self-end">
              <div className="flex flex-wrap gap-2 lg:justify-end" role="group" aria-label="Filtrar conteúdos de Saúde do Homem">
                {mensHealthCategories.map((category) => {
                  const active = activeCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => {
                        setActiveCategory(category.id);
                        trackPrototypeEvent("mens_health_filter", "mens_health_content", category.id);
                      }}
                      className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87333] focus-visible:ring-offset-2 active:scale-[0.98] motion-reduce:transform-none ${active ? "border-[#17364F] bg-[#17364F] text-white shadow-md ring-2 ring-[#B87333]/35 ring-offset-2" : "border-[#17364F]/15 bg-white text-[#17364F] hover:border-[#B87333]/50 hover:text-[#9D602A] dark:bg-background dark:text-foreground"}`}
                    >
                      {active && <CheckCircle2 className="h-4 w-4" aria-hidden="true" />}
                      {category.label}
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                disabled={activeCategory === "all"}
                onClick={() => {
                  setActiveCategory("all");
                  trackPrototypeEvent("mens_health_filter", "mens_health_content", "clear_filters");
                }}
                className="mt-3 min-h-11 rounded-lg px-3 py-2 text-sm font-semibold text-[#9D602A] underline decoration-[#B87333]/35 underline-offset-4 transition hover:decoration-[#B87333] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87333] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:text-[#17364F]/40 disabled:no-underline dark:disabled:text-foreground/40 lg:ml-auto lg:block"
              >
                Limpar filtros
              </button>
            </div>
          </div>

          <p className="mt-8 text-sm font-medium text-[#17364F]/65 dark:text-foreground/65" aria-live="polite">
            {filteredContent.length} {filteredContent.length === 1 ? "conteúdo encontrado" : "conteúdos encontrados"}
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredContent.length === 0 ? (
                <motion.div
                  key="empty-filter-state"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.22 }}
                  className="col-span-full rounded-2xl border border-dashed border-[#17364F]/20 bg-white px-6 py-10 text-center dark:bg-background"
                  role="status"
                >
                  <BookOpen className="mx-auto h-7 w-7 text-[#B87333]" aria-hidden="true" />
                  <h3 className="mt-4 font-serif text-2xl text-[#17364F] dark:text-foreground">Nenhum resultado encontrado</h3>
                  <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[#17364F]/65 dark:text-foreground/65">Não há conteúdos nesta combinação. Limpe o filtro para voltar a explorar todos os temas.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory("all");
                      trackPrototypeEvent("mens_health_filter", "mens_health_content", "empty_state_clear");
                    }}
                    className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#17364F] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0F293D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87333] focus-visible:ring-offset-4"
                  >
                    Limpar filtros e mostrar todos
                  </button>
                </motion.div>
              ) : filteredContent.map(({ id, categoryLabel, title, description, href, Icon }, index) => (
                <motion.div
                  key={id}
                  layout={!shouldReduceMotion}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.22, delay: shouldReduceMotion ? 0 : index * 0.025 }}
                  className="h-full"
                >
                  <Link
                    href={href}
                    onClick={() => trackPrototypeEvent("journey_entry_selected", "mens_health_filtered_content", id)}
                    className="group flex h-full min-h-64 flex-col rounded-2xl border border-[#17364F]/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#B87333]/45 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87333] focus-visible:ring-offset-4 dark:bg-background motion-reduce:transform-none"
                  >
                    <Icon className="h-6 w-6 text-[#B87333]" aria-hidden="true" />
                    <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-[#9D602A]">{categoryLabel}</p>
                    <h3 className="mt-2 text-lg font-semibold text-[#17364F] dark:text-foreground">{title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-6 text-[#17364F]/65 dark:text-foreground/65">{description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#17364F] group-hover:text-[#9D602A] dark:text-foreground">Ler conteúdo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true" /></span>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="py-20">
        <ScrollReveal threshold={0.08}>
          <div className="container">
            <SectionLabel>Cuidado ao longo da vida</SectionLabel>
            <h2 className="max-w-2xl font-serif text-3xl text-[#17364F] sm:text-4xl dark:text-foreground">Por onde começar em cada fase?</h2>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {stages.map((stage) => (
                <article key={stage.range} className="rounded-2xl border border-[#17364F]/10 bg-white p-6 dark:bg-card">
                  <span className="inline-flex rounded-full bg-[#17364F] px-3 py-1 text-sm font-bold text-white">{stage.range} anos</span>
                  <h3 className="mt-5 font-serif text-2xl text-[#17364F] dark:text-foreground">{stage.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#17364F]/65 dark:text-foreground/65">{stage.topics}</p>
                </article>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="bg-[#EAF0F3] py-20 dark:bg-card">
        <ScrollReveal threshold={0.08}>
          <div className="container grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <SectionLabel>Quatro dimensões</SectionLabel>
            <h2 className="font-serif text-3xl text-[#17364F] sm:text-4xl dark:text-foreground">Uma avaliação que conecta sintomas e saúde global</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                [HeartPulse, "Cardiometabólica", "Pressão, glicemia, colesterol, peso, sono e atividade física."],
                [Activity, "Sexual e hormonal", "Libido, ereção, energia, composição corporal e sintomas associados."],
                [ShieldCheck, "Urológica", "Próstata, urina, rins, testículos e prevenção conforme risco."],
                [UserRoundCheck, "Reprodutiva", "Fertilidade, planejamento familiar e impacto dos tratamentos."],
              ].map(([Icon, title, text]) => {
                const ItemIcon = Icon as IconType;
                return (
                  <article key={title as string} className="rounded-2xl bg-white p-5 dark:bg-background">
                    <ItemIcon className="h-5 w-5 text-[#B87333]" aria-hidden="true" />
                    <h3 className="mt-3 font-semibold text-[#17364F] dark:text-foreground">{title as string}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#17364F]/60 dark:text-foreground/60">{text as string}</p>
                  </article>
                );
              })}
            </div>
          </div>
          <div className="rounded-3xl bg-[#17364F] p-7 text-white lg:self-start">
            <CircleAlert className="h-7 w-7 text-[#E3A66F]" aria-hidden="true" />
            <h3 className="mt-5 font-serif text-2xl">Testosterona não é sinônimo de performance</h3>
            <p className="mt-4 text-sm leading-7 text-white/70">Sintomas como cansaço, libido reduzida ou perda de força têm várias causas. Terapia hormonal só deve ser considerada quando sintomas, exames repetidos, objetivos reprodutivos e segurança foram avaliados.</p>
            <Link href={`${PROTOTYPE_BASE}/saude-intima-performance#performance`} className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#17364F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E3A66F]">
              Entender performance masculina <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="bg-white py-20 dark:bg-background">
        <ScrollReveal threshold={0.08}>
          <div className="container max-w-3xl">
            <ConfidentialityNote />
            <div className="mt-8 text-center"><PrototypeLink href={`${PROTOTYPE_BASE}/agendamento`} source="mens_health_final" item="schedule">Ver como agendar uma avaliação integral</PrototypeLink></div>
          </div>
        </ScrollReveal>
      </section>
      <PrototypeBackToTop />
    </PrototypeLayout>
  );
}

export function PrototypeIntimateHealth() {
  return (
    <PrototypeLayout breadcrumb="Saúde íntima e performance">
      <PrototypeMeta title="Saúde íntima e performance" pageId="prototype_intimate_health" />
      <section className="bg-[#112F47] py-16 text-white lg:py-24">
        <div className="container grid items-center gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E3A66F]">Conversa médica sem julgamentos</p>
            <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">Saúde íntima, função sexual e estética com clareza e discrição.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">O primeiro passo é compreender o que incomoda, o impacto na sua vida e se existe uma condição de saúde, uma expectativa estética ou ambos.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
            <LockKeyhole className="h-7 w-7 text-[#E3A66F]" aria-hidden="true" />
            <p className="mt-4 font-semibold">Você controla quanto quer contar.</p>
            <p className="mt-2 text-sm leading-6 text-white/65">No site, escolha apenas um tema. Detalhes pessoais ficam para uma conversa médica confidencial.</p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <SectionLabel>Escolha um ponto de partida</SectionLabel>
          <h2 className="font-serif text-3xl text-[#17364F] sm:text-4xl dark:text-foreground">O que você deseja compreender melhor?</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              [Activity, "Ereção, libido ou ejaculação", "Avaliação de função sexual e fatores associados.", "#performance"],
              [HeartPulse, "Energia e hormônios", "Sintomas, exames e quando a testosterona pode ou não ser considerada.", "#performance"],
              [Sparkles, "Aparência e bem-estar íntimo", "Expectativas, anatomia, opções e limites de procedimentos eletivos.", "#estetica"],
              [Syringe, "Circunferência peniana", "O que se sabe sobre preenchimento com ácido hialurônico.", `${PROTOTYPE_BASE}/engrossamento-peniano`],
              [Scale, "Curvatura ou dor", "Diferença entre variação anatômica, Peyronie e necessidade de avaliação.", "#outras-queixas"],
              [UserRoundCheck, "Fertilidade", "Planejamento reprodutivo, espermograma e impacto de hormônios.", "#outras-queixas"],
            ].map(([Icon, title, text, href]) => {
              const ItemIcon = Icon as IconType;
              return (
                <a
                  key={title as string}
                  href={href as string}
                  onClick={() => trackPrototypeEvent("journey_entry_selected", "intimate_need_grid", title as string)}
                  className="rounded-2xl border border-[#17364F]/10 bg-white p-5 transition hover:border-[#B87333]/45 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87333] dark:bg-card"
                >
                  <ItemIcon className="h-6 w-6 text-[#B87333]" aria-hidden="true" />
                  <h3 className="mt-4 font-semibold text-[#17364F] dark:text-foreground">{title as string}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#17364F]/60 dark:text-foreground/60">{text as string}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section id="performance" className="scroll-mt-28 bg-[#EAF0F3] py-20 dark:bg-card">
        <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionLabel>Performance masculina</SectionLabel>
            <h2 className="font-serif text-3xl text-[#17364F] sm:text-4xl dark:text-foreground">Desempenho sexual é um sinal de saúde, não uma medida de valor pessoal.</h2>
            <p className="mt-5 leading-7 text-[#17364F]/65 dark:text-foreground/65">Mudanças de libido, ereção ou energia podem envolver vasos sanguíneos, metabolismo, sono, emoções, medicamentos, relacionamento e hormônios. A investigação começa pelo conjunto, não por uma receita pronta.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["O que avaliamos", "Sintomas, início, contexto, saúde cardiovascular, medicamentos, sono e objetivos."],
              ["Exames", "Solicitados conforme hipótese clínica; não existe um painel obrigatório para todos."],
              ["Tratamento", "Hábitos, controle de doenças, terapia sexual, medicamentos e opções especializadas."],
              ["Fertilidade", "Testosterona externa pode reduzir a produção de espermatozoides e exige planejamento."],
            ].map(([title, text]) => (
              <article key={title} className="rounded-2xl bg-white p-5 dark:bg-background">
                <CheckCircle2 className="h-5 w-5 text-[#B87333]" aria-hidden="true" />
                <h3 className="mt-3 font-semibold text-[#17364F] dark:text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#17364F]/60 dark:text-foreground/60">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="estetica" className="scroll-mt-28 bg-white py-20 dark:bg-background">
        <div className="container max-w-4xl">
          <SectionLabel>Estética genital masculina</SectionLabel>
          <h2 className="font-serif text-3xl text-[#17364F] sm:text-4xl dark:text-foreground">Antes de falar em procedimento, é preciso entender a expectativa.</h2>
          <p className="mt-5 max-w-3xl leading-7 text-[#17364F]/65 dark:text-foreground/65">Uma consulta responsável diferencia variação anatômica normal, preocupação estética, alteração funcional e sofrimento desproporcional com a imagem corporal. Também apresenta a alternativa de não realizar procedimento.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              ["Objetivo", "O que você espera mudar e por quê?"],
              ["Proporção e função", "A anatomia é avaliada sem padrões irreais."],
              ["Limites", "Resultados variam e toda intervenção tem riscos."],
            ].map(([title, text]) => (
              <article key={title} className="rounded-2xl border border-[#17364F]/10 p-5">
                <h3 className="font-semibold text-[#17364F] dark:text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#17364F]/60 dark:text-foreground/60">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PrototypeLink href={`${PROTOTYPE_BASE}/engrossamento-peniano`} source="intimate_aesthetics" item="girth_page">Conhecer o preenchimento com AH</PrototypeLink>
            <PrototypeLink href={`${PROTOTYPE_BASE}/agendamento`} source="intimate_aesthetics" item="schedule" secondary>Ver avaliação confidencial</PrototypeLink>
          </div>
        </div>
      </section>

      <section id="outras-queixas" className="scroll-mt-28 bg-[#112F47] py-20 text-white">
        <div className="container grid gap-6 md:grid-cols-3">
          {[
            ["Curvatura e dor", "Avaliar tempo de evolução, estabilidade, função e possível doença de Peyronie."],
            ["Fertilidade", "Investigar o casal, histórico, espermograma e fatores tratáveis sem atrasar o cuidado."],
            ["Infecções e pele", "Diferenciar ISTs, inflamações, fimose e outras condições que precisam de exame."],
          ].map(([title, text]) => (
            <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.05] p-6">
              <h3 className="font-serif text-2xl">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/60">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </PrototypeLayout>
  );
}

export function PrototypeGirthEnhancement() {
  const [faqSearch, setFaqSearch] = useState("");
  const faqItems = [
    { id: "faq_increase", title: "Quanto a circunferência pode aumentar?", answer: "Estudos observacionais descrevem aumento médio mensurável em grupos selecionados, mas o resultado varia conforme anatomia, produto, volume, técnica e tempo de acompanhamento. Uma média publicada não deve ser interpretada como promessa individual." },
    { id: "faq_length", title: "O procedimento aumenta o comprimento?", answer: "O objetivo do preenchimento é aumentar a circunferência, não o comprimento do pênis. Eventuais mudanças de aparência não equivalem a alongamento anatômico." },
    { id: "faq_duration", title: "O resultado é definitivo?", answer: "Não. O ácido hialurônico é absorvível e o efeito tende a diminuir com o tempo. A duração varia e manutenções podem ser consideradas somente após nova avaliação." },
    { id: "faq_recovery", title: "Como costuma ser a recuperação?", answer: "Edema, sensibilidade e pequenos hematomas podem ocorrer nos primeiros dias. O retorno a exercícios, atividade sexual e manipulação local deve seguir a orientação individual do profissional responsável." },
    { id: "faq_risks", title: "Quais complicações precisam ser conhecidas?", answer: "Irregularidade, assimetria, nódulos, migração, infecção, alteração de sensibilidade, resultado insatisfatório e necessidade de dissolução ou correção são possíveis. Dor intensa, febre, mudança de cor ou piora rápida exigem avaliação imediata." },
    { id: "faq_reversible", title: "É possível dissolver o produto?", answer: "Em algumas situações, preenchedores de ácido hialurônico podem ser tratados com hialuronidase. Isso não transforma o procedimento em isento de risco e a correção pode exigir mais de uma abordagem." },
    { id: "faq_candidate", title: "Quem pode não ser um bom candidato?", answer: "Infecção ativa, alterações locais não esclarecidas, contraindicações clínicas, expectativas incompatíveis ou sofrimento desproporcional com a imagem corporal podem indicar adiamento, investigação adicional ou a opção de não realizar o procedimento." },
  ];
  const popularFaqItems = ["faq_duration", "faq_risks", "faq_candidate"]
    .map((id) => faqItems.find((item) => item.id === id))
    .filter((item): item is (typeof faqItems)[number] => Boolean(item));
  const normalizedFaqSearch = faqSearch.trim().toLocaleLowerCase("pt-BR");
  const filteredFaqItems = normalizedFaqSearch
    ? faqItems.filter((item) => `${item.title} ${item.answer}`.toLocaleLowerCase("pt-BR").includes(normalizedFaqSearch))
    : faqItems;

  return (
    <PrototypeLayout breadcrumb="Engrossamento peniano com ácido hialurônico">
      <PrototypeMeta title="Engrossamento peniano — protótipo educativo" pageId="prototype_girth" />
      <section className="bg-[#112F47] py-16 text-white lg:py-24">
        <div className="container grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E3A66F]">Informação antes da decisão</p>
            <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">Engrossamento peniano com ácido hialurônico</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">Um procedimento eletivo, temporário e reversível que pode aumentar a circunferência, mas não é indicado para todos e não oferece resultado individual garantido.</p>
          </div>
          <div className="rounded-3xl bg-white p-6 text-[#17364F]">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#A9652D]">Resposta rápida</p>
            <ul className="mt-4 space-y-3 text-sm leading-6">
              <li className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#B87333]" aria-hidden="true" /> Utiliza preenchedor absorvível aplicado em plano anatômico específico.</li>
              <li className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#B87333]" aria-hidden="true" /> O efeito diminui com o tempo e pode exigir manutenção.</li>
              <li className="flex gap-2"><CircleAlert className="mt-1 h-4 w-4 shrink-0 text-[#B87333]" aria-hidden="true" /> Irregularidade, nódulos, edema, infecção e insatisfação são possíveis.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container grid gap-10 lg:grid-cols-[1fr_0.75fr]">
          <div>
            <SectionLabel>Antes de considerar</SectionLabel>
            <h2 className="font-serif text-3xl text-[#17364F] sm:text-4xl dark:text-foreground">A pergunta não é apenas “quanto aumenta?”, mas “isso faz sentido para mim?”.</h2>
            <p className="mt-5 leading-7 text-[#17364F]/65 dark:text-foreground/65">A avaliação considera anatomia, função, motivação, expectativas, saúde física, percepção corporal e compreensão de alternativas. A decisão pode ser não realizar o procedimento.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ["Pode fazer sentido", "Para adultos informados, com expectativa realista e sem contraindicação identificada."],
                ["Exige cautela", "Quando há sofrimento intenso com aparência, pressão de terceiros ou expectativa de transformar autoestima e relacionamentos."],
              ].map(([title, text]) => (
                <article key={title} className="rounded-2xl border border-[#17364F]/10 bg-white p-5 dark:bg-card">
                  <h3 className="font-semibold text-[#17364F] dark:text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#17364F]/60 dark:text-foreground/60">{text}</p>
                </article>
              ))}
            </div>
          </div>
          <ConfidentialityNote />
        </div>
      </section>

      <section className="bg-[#EAF0F3] py-20 dark:bg-card">
        <div className="container max-w-4xl">
          <SectionLabel>Informação progressiva</SectionLabel>
          <h2 className="font-serif text-3xl text-[#17364F] sm:text-4xl dark:text-foreground">Aprofunde somente o que precisa para decidir</h2>
          <div className="mt-8 grid gap-4">
            <Disclosure id="what_we_know" title="O que os estudos sugerem">
              Estudos com preenchedores absorvíveis descrevem aumento de circunferência e satisfação em grupos selecionados. Entretanto, técnicas, volumes, produtos, medidas e tempo de seguimento variam. Médias publicadas não preveem o resultado de uma pessoa.
            </Disclosure>
            <Disclosure id="what_we_dont_know" title="O que ainda não sabemos com segurança">
              Faltam comparações independentes de longo prazo, padronização universal da técnica e dados robustos sobre repetição por muitos anos. Termos como “seguro” devem ser interpretados como risco conhecido e manejável, não ausência de complicações.
            </Disclosure>
            <Disclosure id="risks" title="Riscos e sinais de alerta">
              Edema, hematoma, dor, irregularidade, assimetria, nódulos, migração, infecção, alterações de sensibilidade, resultado insatisfatório e necessidade de dissolução ou correção podem ocorrer. Dor intensa, mudança de cor, febre ou piora rápida exigem avaliação imediata.
            </Disclosure>
            <Disclosure id="alternatives" title="Alternativas e a opção de não tratar">
              A consulta pode esclarecer medidas, variações normais, impacto funcional, saúde sexual e percepção corporal. Observação, aconselhamento, tratamento de condições associadas ou apoio psicológico podem ser alternativas apropriadas. Procedimentos permanentes ou materiais não aprovados exigem cautela especial.
            </Disclosure>
            <Disclosure id="consultation" title="Como funciona a avaliação">
              O médico revisa saúde geral, medicamentos, cirurgias, função sexual, expectativas e anatomia. Quando há dúvida sobre motivação ou sofrimento corporal desproporcional, a avaliação pode incluir apoio de saúde mental antes de qualquer intervenção.
            </Disclosure>
          </div>
        </div>
      </section>

      <section id="faq-engrossamento" className="scroll-mt-28 bg-white py-20 dark:bg-background" aria-labelledby="girth-faq-title">
        <div className="container max-w-4xl">
          <SectionLabel>Dúvidas frequentes</SectionLabel>
          <h2 id="girth-faq-title" className="font-serif text-3xl text-[#17364F] sm:text-4xl dark:text-foreground">Perguntas frequentes sobre o preenchimento com ácido hialurônico</h2>
          <p className="mt-4 max-w-3xl leading-7 text-[#17364F]/70 dark:text-foreground/70">As respostas resumem o que pode ser explicado antes da consulta. A indicação e o risco individual dependem de avaliação médica presencial.</p>
          <div className="mt-7 rounded-2xl border border-[#B87333]/25 bg-[#FFF9F4] p-5 dark:bg-[#B87333]/10" aria-labelledby="popular-faq-title">
            <h3 id="popular-faq-title" className="font-semibold text-[#17364F] dark:text-foreground">Dúvidas mais populares</h3>
            <p className="mt-1 text-sm leading-6 text-[#17364F]/65 dark:text-foreground/65">Selecione uma pergunta para localizá-la rapidamente no FAQ.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {popularFaqItems.map((item) => (
                <article key={item.id} className="rounded-xl border border-[#17364F]/10 bg-white p-4 text-sm text-[#17364F] shadow-sm transition hover:-translate-y-0.5 hover:border-[#B87333]/50 hover:shadow-md dark:bg-background dark:text-foreground motion-reduce:transform-none">
                  <button
                    type="button"
                    onClick={() => {
                      setFaqSearch(item.title);
                      trackPrototypeEvent("faq_open", "girth_popular_faq", item.id);
                      window.requestAnimationFrame(() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "center" }));
                    }}
                    className="w-full min-h-12 text-left font-semibold leading-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87333] focus-visible:ring-offset-4"
                  >
                    {item.title}
                  </button>
                  <PrototypeFaqHelpfulButton questionId={item.id as PopularFaqQuestionId} questionTitle={item.title} />
                </article>
              ))}
            </div>
          </div>
          <label className="mt-7 block" htmlFor="girth-faq-search">
            <span className="text-sm font-semibold text-[#17364F] dark:text-foreground">Pesquisar uma dúvida</span>
            <span className="relative mt-2 block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#17364F]/50" aria-hidden="true" />
              <input
                id="girth-faq-search"
                type="search"
                value={faqSearch}
                onChange={(event) => setFaqSearch(event.target.value)}
                onBlur={() => {
                  if (normalizedFaqSearch) trackPrototypeEvent("faq_search", "girth_faq_search", filteredFaqItems.length ? "results_found" : "no_results");
                }}
                placeholder="Ex.: duração, recuperação, riscos"
                autoComplete="off"
                className="min-h-12 w-full rounded-xl border border-[#17364F]/15 bg-[#F7FAFB] py-3 pl-12 pr-4 text-[#17364F] outline-none transition placeholder:text-[#17364F]/45 focus:border-[#B87333] focus:ring-2 focus:ring-[#B87333]/20 dark:bg-card dark:text-foreground"
              />
            </span>
          </label>
          <p className="mt-3 text-sm text-[#17364F]/65 dark:text-foreground/65" role="status" aria-live="polite">
            {filteredFaqItems.length} {filteredFaqItems.length === 1 ? "pergunta encontrada" : "perguntas encontradas"}
          </p>
          <div className="mt-8 grid gap-4">
            {filteredFaqItems.map((item) => <Disclosure key={item.id} id={item.id} title={item.title}>{item.answer}</Disclosure>)}
            {filteredFaqItems.length === 0 && (
              <div className="rounded-2xl border border-dashed border-[#17364F]/20 bg-[#F7FAFB] p-7 text-center dark:bg-card" role="status">
                <Search className="mx-auto h-6 w-6 text-[#B87333]" aria-hidden="true" />
                <h3 className="mt-4 font-semibold text-[#17364F] dark:text-foreground">Nenhuma pergunta encontrada</h3>
                <p className="mt-2 text-sm leading-6 text-[#17364F]/65 dark:text-foreground/65">Tente um termo mais geral ou limpe a pesquisa para ver todas as perguntas.</p>
                <button type="button" onClick={() => setFaqSearch("")} className="mt-4 min-h-11 rounded-lg border border-[#17364F]/15 bg-white px-4 py-2 text-sm font-semibold text-[#17364F] hover:border-[#B87333]/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87333] dark:bg-background dark:text-foreground">Limpar pesquisa</button>
              </div>
            )}
          </div>
          <p className="mt-6 text-xs leading-5 text-[#17364F]/65 dark:text-foreground/65">Base clínica resumida: revisão sistemática e meta-análise de preenchedores injetáveis (Sexual Medicine Reviews, 2025) e posição da Sexual Medicine Society of North America sobre procedimentos cosméticos penianos (2024).</p>
          <PrototypeEmailContactForm />
        </div>
      </section>

      <section className="bg-white py-20 dark:bg-background">
        <div className="container max-w-4xl">
          <div className="rounded-3xl border border-[#B87333]/30 bg-[#FFF9F4] p-7 text-center dark:bg-[#B87333]/10 sm:p-10">
            <ShieldCheck className="mx-auto h-9 w-9 text-[#B87333]" aria-hidden="true" />
            <h2 className="mt-5 font-serif text-3xl text-[#17364F] dark:text-foreground">Uma avaliação não obriga você a realizar o procedimento.</h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#17364F]/65 dark:text-foreground/65">O objetivo é verificar indicação, segurança, expectativas e alternativas para que sua decisão seja informada e voluntária.</p>
            <div className="mt-7"><PrototypeLink href={`${PROTOTYPE_BASE}/agendamento`} source="girth_final" item="confidential_assessment">Ver avaliação confidencial</PrototypeLink></div>
          </div>
        </div>
      </section>
    </PrototypeLayout>
  );
}

export function PrototypeScheduling() {
  const [selected, setSelected] = useState<string | null>(null);

  const channels = [
    { id: "doctoralia", icon: CalendarCheck, title: "Agendamento online", text: "Escolha data e horário disponíveis em uma plataforma externa." },
    { id: "whatsapp", icon: MessageCircle, title: "WhatsApp", text: "Converse com a equipe sem enviar detalhes clínicos pelo formulário." },
    { id: "phone", icon: Phone, title: "Telefone do consultório", text: "Use o telefone da unidade para dúvidas operacionais e horários." },
  ];

  return (
    <PrototypeLayout breadcrumb="Agendamento confidencial">
      <PrototypeMeta title="Agendamento confidencial" pageId="prototype_schedule" />
      <section className="bg-[#112F47] py-16 text-white lg:py-24">
        <div className="container max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E3A66F]">Próximo passo claro</p>
          <h1 className="mt-4 font-serif text-4xl sm:text-5xl">Escolha como prefere iniciar o contato.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/70">Os cartões abaixo simulam a escolha de canal sem enviar dados. O botão flutuante de WhatsApp é o único contato real e abre uma mensagem inicial sem detalhes clínicos.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-5xl">
          <div className="grid gap-5 md:grid-cols-3">
            {channels.map((channel) => (
              <button
                key={channel.id}
                type="button"
                onClick={() => {
                  setSelected(channel.id);
                  trackPrototypeEvent(channel.id === "whatsapp" ? "cta_whatsapp" : "cta_schedule", "prototype_schedule", channel.id);
                }}
                className={`min-h-64 rounded-2xl border p-6 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87333] focus-visible:ring-offset-4 ${
                  selected === channel.id ? "border-[#B87333] bg-[#FFF9F4] shadow-xl dark:bg-[#B87333]/10" : "border-[#17364F]/10 bg-white hover:border-[#B87333]/45 hover:shadow-lg dark:bg-card"
                }`}
                aria-pressed={selected === channel.id}
              >
                <channel.icon className="h-7 w-7 text-[#B87333]" aria-hidden="true" />
                <h2 className="mt-5 font-serif text-2xl text-[#17364F] dark:text-foreground">{channel.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[#17364F]/60 dark:text-foreground/60">{channel.text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#9D602A]">
                  Simular escolha <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
            ))}
          </div>

          <div aria-live="polite" className="mt-8 min-h-24">
            {selected && (
              <div className="flex gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-950">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                <div>
                  <h2 className="font-semibold">Escolha demonstrada com sucesso</h2>
                  <p className="mt-1 text-sm leading-6">Nenhum dado foi enviado. Na implementação pública, você seria encaminhado ao canal escolhido com rastreamento anônimo da origem do CTA.</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
            <ConfidentialityNote />
            <div className="rounded-2xl border border-[#17364F]/10 bg-white p-5 dark:bg-card">
              <Clock3 className="h-5 w-5 text-[#B87333]" aria-hidden="true" />
              <h2 className="mt-3 font-semibold text-[#17364F] dark:text-foreground">O que acontece depois</h2>
              <p className="mt-2 text-sm leading-6 text-[#17364F]/60 dark:text-foreground/60">A equipe confirma unidade, modalidade e disponibilidade. Informações clínicas detalhadas ficam para a consulta.</p>
            </div>
          </div>
        </div>
      </section>
    </PrototypeLayout>
  );
}

export default PrototypePatientJourneyHome;
