import { ArrowUpRight, BookOpen, CalendarCheck, MapPin, Stethoscope } from "lucide-react";
import { Link, useLocation } from "wouter";
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
  hpbTreatments: {
    title: "Tratamentos para HPB",
    description: "RTU, HoLEP, ThuLEP, Rezum e técnicas minimamente invasivas.",
    href: "/educativo/tratamentos-hpb",
    label: "Saúde da próstata",
    icon: Stethoscope,
  },
  prostateExam: {
    title: "Exame de próstata",
    description: "Como funciona o check-up, PSA e quando iniciar.",
    href: "/educativo/exame-prostata",
    label: "Prevenção",
    icon: BookOpen,
  },
  prostateBiopsy: {
    title: "Biópsia de próstata",
    description: "Indicações, preparo, como é feita e cuidados pós-exame.",
    href: "/educativo/biopsia-prostata",
    label: "Diagnóstico",
    icon: Stethoscope,
  },
  prostateCancerTreatment: {
    title: "Tratamento do câncer de próstata",
    description: "Vigilância ativa, cirurgia robótica (RARP) e radioterapia.",
    href: "/educativo/tratamento-cancer-prostata",
    label: "Uro-oncologia",
    icon: Stethoscope,
  },
  robotic: {
    title: "Cirurgia robótica em urologia",
    description: "Indicações, benefícios e recuperação baseada em evidências.",
    href: "/educativo/cirurgia-robotica",
    label: "Tecnologia cirúrgica",
    icon: Stethoscope,
  },
  minimallyInvasive: {
    title: "Cirurgias minimamente invasivas",
    description: "Laparoscopia, robótica e endoscopia com recuperação acelerada.",
    href: "/educativo/cirurgias-minimamente-invasivas",
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
  laserLithotripsy: {
    title: "Litotripsia a laser",
    description: "Como funciona o tratamento endoscópico a laser sem cortes.",
    href: "/educativo/litotripsia-laser",
    label: "Endourologia",
    icon: Stethoscope,
  },
  urodynamics: {
    title: "Exame de urodinâmica",
    description: "O que é o exame funcional da bexiga e quando é indicado.",
    href: "/educativo/urodinamica",
    label: "Urologia funcional",
    icon: BookOpen,
  },
  uti: {
    title: "Infecção urinária no homem",
    description: "Causas, investigação urológica e tratamento adequado.",
    href: "/educativo/infeccao-urinaria",
    label: "Urologia geral",
    icon: BookOpen,
  },
  metabolic: {
    title: "Síndrome metabólica",
    description: "Controle do peso, metabolismo e envelhecimento saudável.",
    href: "/educativo/sindrome-metabolica",
    label: "Saúde do homem",
    icon: BookOpen,
  },
  andrologicalProcedures: {
    title: "Procedimentos urológicos",
    description: "Postectomia (fimose), microcirurgia de varicocele e HPV.",
    href: "/educativo/procedimentos-andrologicos",
    label: "Procedimentos",
    icon: Stethoscope,
  },
  preOp: {
    title: "Orientações pré-operatórias",
    description: "Jejum, medicamentos, exames e checklist para a cirurgia.",
    href: "/educativo/orientacoes-pre-operatorias",
    label: "Preparo cirúrgico",
    icon: BookOpen,
  },
  postOp: {
    title: "Orientações pós-operatórias",
    description: "Cuidados em casa, recuperação e sinais de alerta.",
    href: "/educativo/orientacoes-pos-operatorias",
    label: "Recuperação",
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
  { match: /(orientacoes-pre|orientacoes-pos)/, keys: ["postOp", "preOp", "firstVisit"] },
  { match: /(exame-prostata|biopsia)/, keys: ["prostateBiopsy", "prostateExam", "hpb"] },
  { match: /(cancer-prostata|tratamento-cancer-prostata)/, keys: ["prostateCancerTreatment", "robotic", "prostateBiopsy"] },
  { match: /(hiperplasia|tratamentos-hpb|hpb)/, keys: ["hpbTreatments", "hpb", "urodynamics"] },
  { match: /(incontinencia|urodinamica|infeccao-urinaria)/, keys: ["urodynamics", "uti", "hpb"] },
  { match: /(hipogonadismo|sindrome-metabolica)/, keys: ["metabolic", "sexualHealth", "firstVisit"] },
  { match: /(engrossamento|procedimentos-andrologicos)/, keys: ["andrologicalProcedures", "peyronie", "firstVisit"] },
  { match: /(vasectomia|planejamento)/, keys: ["vasectomy", "fertility", "firstVisit"] },
  { match: /(estetica|andrologia|disfuncao|peyronie)/, keys: ["sexualHealth", "peyronie", "firstVisit"] },
  { match: /(infertilidade|varicocele|fertilidade)/, keys: ["fertility", "sexualHealth", "firstVisit"] },
  { match: /(prostata)/, keys: ["hpb", "hpbTreatments", "robotic"] },
  { match: /(calculo|litotripsia|renal)/, keys: ["laserLithotripsy", "stones", "minimallyInvasive"] },
  { match: /(robotica|cirurgia)/, keys: ["minimallyInvasive", "robotic", "preOp"] },
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
  const [location] = useLocation();
  const path = currentPath || location;
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
