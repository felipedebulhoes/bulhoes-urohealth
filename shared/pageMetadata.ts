import { isIndexableSitePath, normalizeSitePath } from "./siteRoutes";

export const SITE_ORIGIN = "https://felipebulhoes.com";
export const SITE_NAME = "Dr. Felipe de Bulhões | Urologista";
const OG_IMAGE_HOME = `${SITE_ORIGIN}/manus-storage/og-banner-homepage-marrom-neutro_0212adec.png`;
const OG_IMAGE_VASECTOMIA = `${SITE_ORIGIN}/manus-storage/og-banner-vasectomia-marrom-neutro_a6c66d72.png`;
const OG_IMAGE_ANDROLOGIA = `${SITE_ORIGIN}/manus-storage/og-banner-andrologia-marrom-neutro_22695a0b.png`;
const OG_IMAGE_ESTETICA_INTIMA = `${SITE_ORIGIN}/manus-storage/og-banner-estetica-intima-marrom-neutro_2f27a7fa.png`;
export const DEFAULT_OG_IMAGE =
  OG_IMAGE_HOME;

export interface PageMetadata {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  type: "website" | "article";
  breadcrumb: string;
}

export interface SiteBreadcrumb {
  name: string;
  url: string;
}

export interface SocialPreviewData {
  pathname: string;
  canonicalUrl: string;
  metadata: PageMetadata;
}

const DEFAULT_METADATA: PageMetadata = {
  title: "Dr. Felipe de Bulhões | Urologista em São Paulo e Campinas",
  description:
    "Urologista em São Paulo e Campinas. Conteúdo educativo, atendimento particular e informações para agendamento de consulta.",
  image: DEFAULT_OG_IMAGE,
  imageAlt: "Dr. Felipe de Bulhões — Urologista em São Paulo e Campinas",
  type: "website",
  breadcrumb: "Início",
};

const ROUTE_METADATA: Record<string, PageMetadata> = {
  "/": DEFAULT_METADATA,
  "/blog": {
    title: "Blog de Urologia | Dr. Felipe de Bulhões",
    description:
      "Artigos sobre urologia, saúde do homem, prevenção e tratamentos, escritos em linguagem clara e baseados em evidências.",
    image: DEFAULT_OG_IMAGE,
    imageAlt: "Blog de Urologia do Dr. Felipe de Bulhões",
    type: "website",
    breadcrumb: "Blog",
  },
  "/sobre": {
    title: "Sobre o Dr. Felipe de Bulhões | Urologista",
    description:
      "Conheça a formação, as áreas de atuação e os locais de atendimento do Dr. Felipe de Bulhões, urologista em São Paulo e Campinas.",
    image: DEFAULT_OG_IMAGE,
    imageAlt: "Dr. Felipe de Bulhões, urologista",
    type: "website",
    breadcrumb: "Sobre o Dr. Felipe",
  },
  "/consultorios": {
    title: "Consultórios e Locais de Atendimento | Dr. Felipe de Bulhões",
    description:
      "Conheça os locais de atendimento do Dr. Felipe de Bulhões em São Paulo e Campinas, além das opções de teleconsulta.",
    image: DEFAULT_OG_IMAGE,
    imageAlt: "Locais de atendimento do Dr. Felipe de Bulhões",
    type: "website",
    breadcrumb: "Consultórios",
  },
  "/contato": {
    title: "Contato | Dr. Felipe de Bulhões — Urologista",
    description:
      "Canais de contato, telefones, WhatsApp e endereços para informações administrativas e agendamento de consulta urológica.",
    image: DEFAULT_OG_IMAGE,
    imageAlt: "Canais de contato do Dr. Felipe de Bulhões",
    type: "website",
    breadcrumb: "Contato",
  },
  "/agendamento": {
    title: "Agendar Consulta | Dr. Felipe de Bulhões — Urologista",
    description:
      "Agende uma consulta urológica com o Dr. Felipe de Bulhões em São Paulo, Campinas ou por teleconsulta.",
    image: DEFAULT_OG_IMAGE,
    imageAlt: "Agendamento de consulta com o Dr. Felipe de Bulhões",
    type: "website",
    breadcrumb: "Agendamento",
  },
  "/primeira-consulta": {
    title: "Primeira Consulta Urológica | Dr. Felipe de Bulhões",
    description:
      "Guia para a primeira consulta urológica: como se preparar, o que levar e o que esperar do atendimento.",
    image: DEFAULT_OG_IMAGE,
    imageAlt: "Guia para a primeira consulta urológica",
    type: "website",
    breadcrumb: "Primeira consulta",
  },
  "/guia-glp1": {
    title: "Guia das Canetas GLP-1 | Dr. Felipe de Bulhões",
    description:
      "Entenda, de forma educativa, a relação entre medicamentos GLP-1, peso, saúde metabólica, testosterona e fertilidade masculina.",
    image: DEFAULT_OG_IMAGE,
    imageAlt: "Guia educativo sobre canetas GLP-1 e saúde masculina",
    type: "website",
    breadcrumb: "Guia GLP-1",
  },
  "/privacidade": {
    title: "Política de Privacidade | Dr. Felipe de Bulhões",
    description:
      "Política de Privacidade e Proteção de Dados do site do Dr. Felipe de Bulhões, em conformidade com a LGPD.",
    image: DEFAULT_OG_IMAGE,
    imageAlt: "Política de Privacidade do site do Dr. Felipe de Bulhões",
    type: "website",
    breadcrumb: "Política de Privacidade",
  },
  "/vasectomia-sem-bisturi": {
    title: "Vasectomia Sem Bisturi em SP e Campinas | Dr. Felipe de Bulhões",
    description:
      "Informações sobre vasectomia sem bisturi, avaliação individual e recuperação, com atendimento em São Paulo e Campinas.",
    image: OG_IMAGE_VASECTOMIA,
    imageAlt: "Vasectomia sem bisturi — Dr. Felipe de Bulhões",
    type: "website",
    breadcrumb: "Vasectomia sem bisturi",
  },
  "/andrologia-performance-masculina": {
    title: "Andrologia e Performance Masculina | Dr. Felipe de Bulhões",
    description:
      "Avaliação individualizada de saúde hormonal, sexual e reprodutiva masculina, com abordagem baseada em evidências.",
    image: OG_IMAGE_ANDROLOGIA,
    imageAlt: "Andrologia e saúde masculina — Dr. Felipe de Bulhões",
    type: "website",
    breadcrumb: "Andrologia e performance masculina",
  },
  "/estetica-intima-masculina": {
    title: "Estética Íntima Masculina | Dr. Felipe de Bulhões",
    description:
      "Informações sobre estética íntima masculina, com avaliação discreta, segurança e expectativas realistas.",
    image: OG_IMAGE_ESTETICA_INTIMA,
    imageAlt: "Estética íntima masculina — Dr. Felipe de Bulhões",
    type: "website",
    breadcrumb: "Estética íntima masculina",
  },
};

const EDUCATIONAL_LABELS: Record<string, string> = {
  "/educativo/tratamentos-hpb": "Tratamentos para HPB",
  "/educativo/cirurgias-minimamente-invasivas": "Cirurgias minimamente invasivas",
  "/educativo/orientacoes-pos-operatorias": "Orientações pós-operatórias",
  "/educativo/orientacoes-pre-operatorias": "Orientações pré-operatórias",
  "/educativo/calculos-renais": "Cálculos renais",
  "/educativo/hipogonadismo": "Hipogonadismo e testosterona",
  "/educativo/sindrome-metabolica": "Síndrome metabólica",
  "/educativo/procedimentos-andrologicos": "Procedimentos urológicos",
  "/educativo/disfuncao-eretil": "Disfunção erétil",
  "/educativo/exame-prostata": "Exame de próstata",
  "/educativo/urodinamica": "Urodinâmica",
  "/educativo/infeccao-urinaria": "Infecção urinária no homem",
  "/educativo/cancer-prostata": "Câncer de próstata",
  "/educativo/biopsia-prostata": "Biópsia de próstata",
  "/educativo/vasectomia": "Vasectomia",
  "/educativo/litotripsia-laser": "Litotripsia a laser",
  "/educativo/cirurgia-robotica": "Cirurgia robótica",
  "/educativo/cancer-bexiga": "Câncer de bexiga",
  "/educativo/tratamento-cancer-prostata": "Tratamento do câncer de próstata",
  "/educativo/incontinencia-urinaria": "Incontinência urinária",
  "/educativo/infertilidade-masculina": "Infertilidade masculina",
  "/educativo/doenca-peyronie": "Doença de Peyronie",
  "/educativo/varicocele": "Varicocele",
  "/educativo/hiperplasia-prostatica": "Próstata aumentada (HPB)",
  "/educativo/engrossamento-peniano": "Engrossamento peniano com ácido hialurônico",
};

const LOCATION_LABELS: Record<string, string> = {
  "/local/campinas-day-hospital": "Campinas Day Hospital",
  "/local/clinovi-paulista": "Clinovi Paulista",
  "/local/clinovi-pinheiros": "Clinovi Pinheiros",
  "/local/cemed-sao-luiz-campinas": "CEMED Rede D'Or São Luiz Campinas",
};

const BLOG_TITLES: Record<string, string> = {
  "importancia-saude-urologica-preventiva": "A importância da saúde urológica preventiva",
  "urologista-medico-do-homem-desde-jovem": "O urologista é o médico do homem",
  "pedra-no-rim-o-que-fazer": "Pedra no rim: o que fazer",
  "quando-procurar-urologista": "10 sinais de que você deve procurar um urologista",
  "cirurgia-robotica-urologica": "Cirurgia robótica urológica: o que você precisa saber",
  "urologista-campinas-quando-procurar": "Urologista em Campinas: quando procurar",
  "vasectomia-campinas-guia-completo": "Vasectomia em Campinas: guia completo",
  "cirurgia-robotica-urologia-campinas": "Cirurgia robótica em urologia em Campinas",
  "incontinencia-urinaria-pos-prostatectomia": "Incontinência urinária pós-prostatectomia",
  "psa-rastreamento-cancer-prostata-2026": "PSA e rastreamento do câncer de próstata",
  "hiperplasia-prostatica-benigna-tratamentos-modernos": "HPB: tratamentos modernos",
  "urologista-pinheiros-zona-oeste-sp": "Urologista em Pinheiros",
};

const BLOG_IMAGES: Record<string, string> = {
  "importancia-saude-urologica-preventiva":
    `${SITE_ORIGIN}/manus-storage/og-banner-blog-importancia-saude-urologica-preventiva-marrom-neutro_feefe8de.png`,
  "urologista-medico-do-homem-desde-jovem":
    `${SITE_ORIGIN}/manus-storage/og-banner-blog-urologista-medico-do-homem-desde-jovem-marrom-neutro_84182cb0.png`,
  "pedra-no-rim-o-que-fazer":
    `${SITE_ORIGIN}/manus-storage/og-banner-blog-pedra-no-rim-o-que-fazer-marrom-neutro_dde4e1b4.png`,
  "quando-procurar-urologista":
    `${SITE_ORIGIN}/manus-storage/og-banner-blog-quando-procurar-urologista-marrom-neutro_79078219.png`,
  "cirurgia-robotica-urologica":
    `${SITE_ORIGIN}/manus-storage/og-banner-blog-cirurgia-robotica-urologica-marrom-neutro_48c2742e.png`,
  "urologista-campinas-quando-procurar":
    `${SITE_ORIGIN}/manus-storage/og-banner-blog-urologista-campinas-quando-procurar-marrom-neutro_40197d20.png`,
  "vasectomia-campinas-guia-completo":
    `${SITE_ORIGIN}/manus-storage/og-banner-blog-vasectomia-campinas-guia-completo-marrom-neutro_9beca3d7.png`,
  "cirurgia-robotica-urologia-campinas":
    `${SITE_ORIGIN}/manus-storage/og-banner-blog-cirurgia-robotica-urologia-campinas-marrom-neutro_3fb671ac.png`,
  "incontinencia-urinaria-pos-prostatectomia":
    `${SITE_ORIGIN}/manus-storage/og-banner-blog-incontinencia-urinaria-pos-prostatectomia-marrom-neutro_390dc58f.png`,
  "psa-rastreamento-cancer-prostata-2026":
    `${SITE_ORIGIN}/manus-storage/og-banner-blog-psa-rastreamento-cancer-prostata-2026-marrom-neutro_48bbf9f6.png`,
  "hiperplasia-prostatica-benigna-tratamentos-modernos":
    `${SITE_ORIGIN}/manus-storage/og-banner-blog-hiperplasia-prostatica-benigna-tratamentos-modernos-marrom-neutro_8a3fc8ef.png`,
  "urologista-pinheiros-zona-oeste-sp":
    `${SITE_ORIGIN}/manus-storage/og-banner-blog-urologista-pinheiros-zona-oeste-sp-marrom-neutro_97d3fdbf.png`,
};

function genericEducationalMetadata(label: string): PageMetadata {
  return {
    title: `${label} | Dr. Felipe de Bulhões — Urologista`,
    description: `Informações educativas sobre ${label.toLocaleLowerCase("pt-BR")}, com linguagem clara, segurança e referências para orientar a conversa com o urologista.`,
    image: DEFAULT_OG_IMAGE,
    imageAlt: `${label} — conteúdo educativo de urologia`,
    type: "website",
    breadcrumb: label,
  };
}

function genericLocationMetadata(label: string): PageMetadata {
  return {
    title: `Urologista em ${label} | Dr. Felipe de Bulhões`,
    description: `Informações sobre atendimento urológico particular em ${label}, com opções de agendamento e localização.`,
    image: DEFAULT_OG_IMAGE,
    imageAlt: `Atendimento urológico em ${label}`,
    type: "website",
    breadcrumb: label,
  };
}

function genericBlogMetadata(title: string, image = DEFAULT_OG_IMAGE): PageMetadata {
  return {
    title: `${title} | Blog do Dr. Felipe de Bulhões`,
    description: `Leia sobre ${title.toLocaleLowerCase("pt-BR")}. Conteúdo educativo de urologia para pacientes, em linguagem clara e responsável.`,
    image,
    imageAlt: `${title} — Blog de Urologia`,
    type: "article",
    breadcrumb: title,
  };
}

/** Returns a deterministic metadata set for the URL delivered to crawlers and browsers. */
export function getPageMetadata(input: string): PageMetadata {
  const pathname = normalizeSitePath(input);
  const exact = ROUTE_METADATA[pathname];
  if (exact) return exact;

  const educationalLabel = EDUCATIONAL_LABELS[pathname];
  if (educationalLabel) return genericEducationalMetadata(educationalLabel);

  const locationLabel = LOCATION_LABELS[pathname];
  if (locationLabel) return genericLocationMetadata(locationLabel);

  if (pathname.startsWith("/blog/")) {
    const slug = pathname.slice("/blog/".length);
    const title = BLOG_TITLES[slug];
    if (title) return genericBlogMetadata(title, BLOG_IMAGES[slug]);
  }

  return DEFAULT_METADATA;
}

/**
 * Returns only the public, indexable metadata that is emitted in the server
 * response. Internal tools use this to preview social cards without loading a
 * remote crawler or accidentally offering previews for noindex routes.
 */
export function getSocialPreviewData(input: string): SocialPreviewData | null {
  const pathname = normalizeSitePath(input);
  if (!isIndexableSitePath(pathname)) return null;

  return {
    pathname,
    canonicalUrl: `${SITE_ORIGIN}${pathname}`,
    metadata: getPageMetadata(pathname),
  };
}

/** Returns visual and JSON-LD breadcrumb items only for indexable public pages. */
export function getBreadcrumbItems(input: string): SiteBreadcrumb[] {
  const pathname = normalizeSitePath(input);
  if (pathname === "/" || !isIndexableSitePath(pathname)) return [];

  const current = getPageMetadata(pathname);
  const home: SiteBreadcrumb = { name: "Início", url: "/" };

  if (pathname === "/blog") return [home, { name: current.breadcrumb, url: pathname }];
  if (pathname.startsWith("/blog/")) {
    return [home, { name: "Blog", url: "/blog" }, { name: current.breadcrumb, url: pathname }];
  }
  if (pathname.startsWith("/local/")) {
    return [
      home,
      { name: "Consultórios", url: "/consultorios" },
      { name: current.breadcrumb, url: pathname },
    ];
  }

  return [home, { name: current.breadcrumb, url: pathname }];
}
