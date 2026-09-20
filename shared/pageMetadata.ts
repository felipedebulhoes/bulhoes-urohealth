import { isIndexableSitePath, normalizeSitePath } from "./siteRoutes";

export const SITE_ORIGIN = "https://felipebulhoes.com";
export const SITE_NAME = "Dr. Felipe de Bulhões | Urologista";
export const DEFAULT_OG_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/og-banner-homepage-Z3VUGp2G25ZCRLdiqZhFBW.png";

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
      "Conheça os locais de atendimento do Dr. Felipe de Bulhões em São Paulo, Campinas e ABC Paulista, além das opções de teleconsulta.",
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
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/og-banner-vasectomia-T3FhkNuSM9V9Q2UvMZ2pMm.png",
    imageAlt: "Vasectomia sem bisturi — Dr. Felipe de Bulhões",
    type: "website",
    breadcrumb: "Vasectomia sem bisturi",
  },
  "/andrologia-performance-masculina": {
    title: "Andrologia e Performance Masculina | Dr. Felipe de Bulhões",
    description:
      "Avaliação individualizada de saúde hormonal, sexual e reprodutiva masculina, com abordagem baseada em evidências.",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/og-banner-andrologia-5MNza8WeePLcioXt5hqUNr.png",
    imageAlt: "Andrologia e saúde masculina — Dr. Felipe de Bulhões",
    type: "website",
    breadcrumb: "Andrologia e performance masculina",
  },
  "/estetica-intima-masculina": {
    title: "Estética Íntima Masculina | Dr. Felipe de Bulhões",
    description:
      "Informações sobre estética íntima masculina, com avaliação discreta, segurança e expectativas realistas.",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/og-banner-estetica-intima-9jXDPQ5y9xybYDDczDfBQY.png",
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
  "/local/clinovi-moema": "Clinovi Moema",
  "/local/clinovi-pinheiros": "Clinovi Pinheiros",
  "/local/clinovi-sbc": "Clinovi São Bernardo do Campo",
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
  "urologista-sao-paulo-paulista-moema": "Urologista em São Paulo",
  "urologista-pinheiros-zona-oeste-sp": "Urologista em Pinheiros",
  "urologista-abc-sao-bernardo-santo-andre": "Urologista no ABC Paulista",
};

const BLOG_IMAGES: Record<string, string> = {
  "importancia-saude-urologica-preventiva":
    "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/blog-preventive-health-eERcqbP5UDxHnJ5CDuPzr6.webp",
  "urologista-medico-do-homem-desde-jovem":
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=85",
  "pedra-no-rim-o-que-fazer":
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=85",
  "quando-procurar-urologista":
    "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=1200&q=85",
  "cirurgia-robotica-urologica":
    "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/blog-robotic-surgery-cover-E6WUHbvNsLa775YuR9Rt6F.webp",
  "urologista-campinas-quando-procurar":
    `${SITE_ORIGIN}/manus-storage/blog-urologista-campinas-cover_ba932b43_ec3a9955.webp`,
  "vasectomia-campinas-guia-completo":
    `${SITE_ORIGIN}/manus-storage/vasectomia-blog-cover_a51a156f_1918def0.webp`,
  "cirurgia-robotica-urologia-campinas":
    `${SITE_ORIGIN}/manus-storage/cirurgia-robotica-blog_7b6f2d98_4694f840.webp`,
  "incontinencia-urinaria-pos-prostatectomia":
    "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/blog-incontinencia-pos-prostatectomia-KjcAV6cZhjVNVnCoLtrhUq.webp",
  "psa-rastreamento-cancer-prostata-2026":
    "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/blog-psa-rastreamento-prostata-agLu4YHQhYamRq3TyanvEp.webp",
  "hiperplasia-prostatica-benigna-tratamentos-modernos":
    "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/blog-hpb-tratamento-moderno-mQ7cu73ouQGoVjsg6ysiRu.webp",
  "urologista-sao-paulo-paulista-moema":
    "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/blog-urologista-sao-paulo-7LHFJjdMynXArAzkHbTUti.webp",
  "urologista-pinheiros-zona-oeste-sp":
    "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/clinovi-pinheiros_cec58be4.webp",
  "urologista-abc-sao-bernardo-santo-andre":
    "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/clinovi-sbc_c192552c.webp",
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
