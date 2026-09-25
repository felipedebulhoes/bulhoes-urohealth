export const BLOG_SLUGS = [
  "importancia-saude-urologica-preventiva",
  "urologista-medico-do-homem-desde-jovem",
  "pedra-no-rim-o-que-fazer",
  "quando-procurar-urologista",
  "cirurgia-robotica-urologica",
  "urologista-campinas-quando-procurar",
  "vasectomia-campinas-guia-completo",
  "cirurgia-robotica-urologia-campinas",
  "incontinencia-urinaria-pos-prostatectomia",
  "psa-rastreamento-cancer-prostata-2026",
  "hiperplasia-prostatica-benigna-tratamentos-modernos",
  "urologista-pinheiros-zona-oeste-sp",
] as const;

export const PUBLIC_STATIC_PATHS = [
  "/",
  "/blog",
  "/educativo/tratamentos-hpb",
  "/educativo/cirurgias-minimamente-invasivas",
  "/educativo/orientacoes-pos-operatorias",
  "/educativo/orientacoes-pre-operatorias",
  "/educativo/calculos-renais",
  "/educativo/hipogonadismo",
  "/educativo/sindrome-metabolica",
  "/educativo/procedimentos-andrologicos",
  "/educativo/disfuncao-eretil",
  "/educativo/exame-prostata",
  "/educativo/urodinamica",
  "/educativo/infeccao-urinaria",
  "/educativo/cancer-prostata",
  "/educativo/biopsia-prostata",
  "/educativo/vasectomia",
  "/educativo/litotripsia-laser",
  "/educativo/cirurgia-robotica",
  "/educativo/cancer-bexiga",
  "/educativo/tratamento-cancer-prostata",
  "/educativo/incontinencia-urinaria",
  "/educativo/infertilidade-masculina",
  "/educativo/doenca-peyronie",
  "/educativo/varicocele",
  "/educativo/hiperplasia-prostatica",
  "/educativo/engrossamento-peniano",
  "/consultorios",
  "/contato",
  "/agendamento",
  "/sobre",
  "/local/campinas-day-hospital",
  "/local/clinovi-paulista",
  "/local/clinovi-pinheiros",
  "/local/cemed-sao-luiz-campinas",
  "/primeira-consulta",
  "/guia-glp1",
  "/vasectomia-sem-bisturi",
  "/andrologia-performance-masculina",
  "/estetica-intima-masculina",
  "/privacidade",
] as const;

export const NOINDEX_STATIC_PATHS = [
  "/404",
  "/admin/files",
  "/admin/leads",
  "/admin/keywords",
  "/admin/social-preview",
  "/guia-google-business",
  "/instagram-carousel",
  "/agendar/doctoralia",
  "/agendar/whatsapp",
] as const;

const publicStaticPaths = new Set<string>(PUBLIC_STATIC_PATHS);
const noindexStaticPaths = new Set<string>(NOINDEX_STATIC_PATHS);
const blogPaths = new Set<string>(BLOG_SLUGS.map(slug => `/blog/${slug}`));

export function normalizeSitePath(input: string): string {
  const pathname = new URL(input || "/", "https://request.invalid").pathname;
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "");
}

export function isPrototypePath(input: string): boolean {
  const pathname = normalizeSitePath(input);
  return pathname === "/prototipo-jornada-paciente" || pathname.startsWith("/prototipo-jornada-paciente/");
}

export function isKnownSitePath(input: string): boolean {
  const pathname = normalizeSitePath(input);
  return publicStaticPaths.has(pathname) || noindexStaticPaths.has(pathname) || blogPaths.has(pathname) || isPrototypePath(pathname);
}

export function isIndexableSitePath(input: string): boolean {
  const pathname = normalizeSitePath(input);
  return publicStaticPaths.has(pathname) || blogPaths.has(pathname);
}
