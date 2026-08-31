import { ArrowUpRight, BookOpen, CalendarCheck, MapPin, Stethoscope } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { trackRelatedContentClick } from "@/lib/analytics";

type RelatedItem = {
  title: string;
  description: string;
  href: string;
  label: string;
  icon: typeof BookOpen;
};

const content: Record<string, RelatedItem> = {
  hpb: {
    title: "Próstata aumentada (HPB)",
    description: "Sintomas, diagnóstico e opções de tratamento.",
    href: "/educativo/hiperplasia-prostatica",
    label: "Saúde da próstata",
    icon: Stethoscope,
  },
  robotic: {
    title: "Cirurgia robótica em urologia",
    description: "Indicações, benefícios e recuperação baseada em evidências.",
    href: "/educativo/cirurgia-robotica",
    label: "Tecnologia cirúrgica",
    icon: Stethoscope,
  },
  vasectomy: {
    title: "Vasectomia: guia completo",
    description: "Como funciona, segurança e cuidados após o procedimento.",
    href: "/educativo/vasectomia",
    label: "Planejamento familiar",
    icon: BookOpen,
  },
  stones: {
    title: "Cálculos renais",
    description: "Sinais de alerta, prevenção e tratamentos disponíveis.",
    href: "/educativo/calculos-renais",
    label: "Urologia geral",
    icon: BookOpen,
  },
  sexualHealth: {
    title: "Disfunção erétil",
    description: "Causas, investigação e possibilidades de tratamento.",
    href: "/educativo/disfuncao-eretil",
    label: "Saúde sexual",
    icon: BookOpen,
  },
  fertility: {
    title: "Infertilidade masculina",
    description: "Avaliação do casal e tratamentos baseados em evidências.",
    href: "/educativo/infertilidade-masculina",
    label: "Fertilidade",
    icon: BookOpen,
  },
  peyronie: {
    title: "Doença de Peyronie",
    description: "Entenda a curvatura adquirida e quando procurar avaliação.",
    href: "/educativo/doenca-peyronie",
    label: "Andrologia",
    icon: BookOpen,
  },
  firstVisit: {
    title: "Como funciona a primeira consulta",
    description: "Saiba o que levar e como se preparar para a avaliação.",
    href: "/primeira-consulta",
    label: "Sua consulta",
    icon: CalendarCheck,
  },
  offices: {
    title: "Locais de atendimento",
    description: "Encontre a unidade mais conveniente em São Paulo ou Campinas.",
    href: "/consultorios",
    label: "Consultórios",
    icon: MapPin,
  },
  blog: {
    title: "Blog de urologia",
    description: "Informação médica confiável para cuidar melhor da sua saúde.",
    href: "/blog",
    label: "Conteúdo educativo",
    icon: BookOpen,
  },
};

const groups: Array<{ match: RegExp; keys: Array<keyof typeof content> }> = [
  { match: /(vasectomia|planejamento)/, keys: ["vasectomy", "firstVisit", "offices"] },
  { match: /(engrossamento|estetica|andrologia|disfuncao|peyronie|hipogonadismo)/, keys: ["sexualHealth", "peyronie", "firstVisit"] },
  { match: /(infertilidade|varicocele|fertilidade)/, keys: ["fertility", "sexualHealth", "firstVisit"] },
  { match: /(prostata|hpb|biopsia)/, keys: ["hpb", "robotic", "firstVisit"] },
  { match: /(calculo|litotripsia|renal)/, keys: ["stones", "robotic", "firstVisit"] },
  { match: /(robotica|cirurgia)/, keys: ["robotic", "hpb", "offices"] },
  { match: /(contato|sobre)/, keys: ["firstVisit", "offices", "blog"] },
  { match: /(blog)/, keys: ["hpb", "stones", "sexualHealth"] },
];

function getRelatedItems(source: string, currentPath: string): RelatedItem[] {
  const normalized = `${source} ${currentPath}`.toLowerCase();
  const selected = groups.find(group => group.match.test(normalized))?.keys ?? ["hpb", "robotic", "stones"];
  const unique = selected
    .map(key => content[key])
    .filter(item => item.href !== currentPath);

  if (unique.length < 3) {
    [content.blog, content.firstVisit, content.offices].forEach(item => {
      if (unique.length < 3 && item.href !== currentPath && !unique.some(existing => existing.href === item.href)) {
        unique.push(item);
      }
    });
  }

  return unique.slice(0, 3);
}

interface RelatedContentSectionProps {
  source: string;
  currentPath?: string;
  dark?: boolean;
}

export default function RelatedContentSection({ source, currentPath, dark = false }: RelatedContentSectionProps) {
  const path = currentPath || (typeof window !== "undefined" ? window.location.pathname : "/");
  const items = getRelatedItems(source, path);

  return (
    <section className="mt-8 border-t border-current/10 pt-7" aria-labelledby={`related-${source}`}>
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className={cn("text-xs font-semibold uppercase tracking-[0.16em]", dark ? "text-[#D49A6A]" : "text-[#B87333]")}>Continue explorando</p>
          <h3 id={`related-${source}`} className={cn("mt-1 text-xl font-serif", dark ? "text-white" : "text-[#1C3D5A] dark:text-foreground")}>Conteúdos relacionados</h3>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {items.map(item => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => trackRelatedContentClick(source, item.href)}
              className={cn(
                "group rounded-xl border p-4 text-left motion-safe:transition-[transform,box-shadow,border-color,background-color] motion-safe:duration-200 motion-safe:ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87333] focus-visible:ring-offset-2",
                dark
                  ? "border-white/10 bg-white/[0.04] hover:border-[#D49A6A]/45 hover:bg-white/[0.07]"
                  : "border-[#1C3D5A]/10 bg-white hover:border-[#B87333]/35 hover:shadow-lg"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <span className={cn("inline-flex h-9 w-9 items-center justify-center rounded-lg", dark ? "bg-white/10 text-[#D49A6A]" : "bg-[#B87333]/10 text-[#B87333]")}> 
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <ArrowUpRight className={cn("h-4 w-4 motion-safe:transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5", dark ? "text-white/35" : "text-[#1C3D5A]/35")} aria-hidden="true" />
              </div>
              <p className={cn("mt-3 text-[11px] font-semibold uppercase tracking-[0.12em]", dark ? "text-white/45" : "text-[#1C3D5A]/45")}>{item.label}</p>
              <h4 className={cn("mt-1 text-sm font-semibold leading-snug", dark ? "text-white" : "text-[#1C3D5A] dark:text-foreground")}>{item.title}</h4>
              <p className={cn("mt-2 text-xs leading-relaxed", dark ? "text-white/55" : "text-[#1C3D5A]/60 dark:text-foreground/60")}>{item.description}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
