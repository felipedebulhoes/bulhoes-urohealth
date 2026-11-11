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
    title: "Andrologia em São Paulo e Campinas | Dr. Felipe de Bulhões",
    description:
      "Procura andrologista em São Paulo? Urologista com atendimento em andrologia na Paulista, Pinheiros e Campinas: testosterona, fertilidade e disfunção erétil.",
    image: OG_IMAGE_ANDROLOGIA,
    imageAlt: "Andrologia e saúde masculina — Dr. Felipe de Bulhões",
    type: "website",
    breadcrumb: "Andrologia e performance masculina",
  },
  "/estetica-intima-masculina": {
    title: "Estética Íntima Masculina em SP | Dr. Felipe de Bulhões",
    description:
      "Estética íntima masculina com preenchimento peniano com ácido hialurônico e toxina botulínica (botox peniano e escrotal), em São Paulo e Campinas.",
    image: OG_IMAGE_ESTETICA_INTIMA,
    imageAlt: "Estética íntima masculina e botox peniano — Dr. Felipe de Bulhões",
    type: "website",
    breadcrumb: "Estética íntima masculina",
  },
  "/preenchimento-peniano": {
    title: "Preenchimento Peniano em São Paulo | Dr. Felipe de Bulhões",
    description:
      "Preenchimento peniano com ácido hialurônico realizado por urologista em São Paulo e Campinas. Procedimento ambulatorial sem cortes, reversível e com sigilo.",
    image: OG_IMAGE_ESTETICA_INTIMA,
    imageAlt: "Preenchimento peniano com ácido hialurônico — Dr. Felipe de Bulhões",
    type: "website",
    breadcrumb: "Preenchimento peniano",
  },
  "/saude-da-prostata": {
    title: "Saúde da Próstata e HPB em SP e Campinas | Dr. Felipe de Bulhões",
    description:
      "Avaliação da próstata em São Paulo e Campinas: check-up prostático, rastreio e tratamentos minimamente invasivos para próstata aumentada (HPB).",
    image: DEFAULT_OG_IMAGE,
    imageAlt: "Saúde da Próstata e tratamento de HPB — Dr. Felipe de Bulhões",
    type: "website",
    breadcrumb: "Saúde da próstata",
  },
  "/litotripsia-calculo-renal": {
    title: "Cirurgia de Pedra no Rim em São Paulo | Dr. Felipe de Bulhões",
    description:
      "Tratamento de cálculos renais (pedra nos rins) e ureterais em São Paulo e Campinas: litotripsia a laser flexível sem cortes, cólica renal e prevenção.",
    image: DEFAULT_OG_IMAGE,
    imageAlt: "Cálculo renal e litotripsia a laser — Dr. Felipe de Bulhões",
    type: "website",
    breadcrumb: "Cálculos renais e litotripsia a laser",
  },
  "/cirurgia-robotica-urologia": {
    title: "Cirurgia Robótica em Urologia em SP e Campinas | Dr. Felipe de Bulhões",
    description:
      "Cirurgia robótica e videolaparoscópica em urologia em São Paulo e Campinas: prostatectomia robótica, nefrectomia parcial e reconstruções com visão 3D.",
    image: DEFAULT_OG_IMAGE,
    imageAlt: "Cirurgia robótica em urologia — Dr. Felipe de Bulhões",
    type: "website",
    breadcrumb: "Cirurgia robótica em urologia",
  },
  "/avaliacao-urodinamica": {
    title: "Urodinâmica e Incontinência em SP e Campinas | Dr. Felipe de Bulhões",
    description:
      "Estudo urodinâmico e tratamento de incontinência urinária, bexiga hiperativa e obstrução prostática em São Paulo e Campinas, com conforto e privacidade.",
    image: DEFAULT_OG_IMAGE,
    imageAlt: "Exame de urodinâmica e incontinência urinária — Dr. Felipe de Bulhões",
    type: "website",
    breadcrumb: "Exame de urodinâmica",
  },
  "/uro-oncologia": {
    title: "Uro-Oncologia em SP e Campinas | Dr. Felipe de Bulhões",
    description:
      "Diagnóstico e tratamento cirúrgico de tumores urológicos (próstata, rim, bexiga e testículo) em São Paulo e Campinas, com cirurgia robótica quando indicada.",
    image: DEFAULT_OG_IMAGE,
    imageAlt: "Uro-oncologia em São Paulo e Campinas — Dr. Felipe de Bulhões",
    type: "website",
    breadcrumb: "Uro-oncologia",
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
  "/educativo/protese-peniana": "Prótese peniana",
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

/**
 * Título e descrição escritos para a busca, usados nas páginas com muitas
 * impressões e poucos cliques. Sem promessa de resultado (CFM 2.336/2023).
 */
const SEARCH_SNIPPETS: Record<string, Pick<PageMetadata, "title" | "description">> = {
  "/educativo/tratamentos-hpb": {
    title: "Tratamentos para próstata aumentada (HPB): opções",
    description:
      "Remédios e cirurgias para a próstata aumentada (HPB), com base nas diretrizes EAU e AUA. Guia do urologista Dr. Felipe de Bulhões.",
  },
  "/educativo/cirurgias-minimamente-invasivas": {
    title: "Cirurgias urológicas minimamente invasivas: diferenças",
    description:
      "Endourologia, laparoscopia e robótica: como funcionam e quando cada técnica é usada. Guia do urologista Dr. Felipe de Bulhões.",
  },
  "/educativo/orientacoes-pos-operatorias": {
    title: "Pós-operatório urológico: cuidados e sinais de alerta",
    description:
      "O que é esperado depois das cirurgias urológicas e quando procurar atendimento médico. Guia do urologista Dr. Felipe de Bulhões.",
  },
  "/educativo/orientacoes-pre-operatorias": {
    title: "Preparo para cirurgia urológica: jejum, remédios e exames",
    description:
      "Jejum, medicamentos, anticoagulantes, exames e checklist antes da cirurgia urológica. Guia do urologista Dr. Felipe de Bulhões.",
  },
  "/educativo/calculos-renais": {
    title: "Cálculos renais: prevenção, tratamentos e duplo J",
    description:
      "Como prevenir pedra nos rins, quais são os tratamentos minimamente invasivos e o que saber sobre o cateter duplo J. Guia do urologista Dr. Felipe de Bulhões.",
  },
  "/educativo/hipogonadismo": {
    title: "Hipogonadismo: testosterona baixa, diagnóstico e reposição",
    description:
      "O que é o hipogonadismo, como é diagnosticado e quando a reposição de testosterona é indicada. Guia do urologista Dr. Felipe de Bulhões.",
  },
  "/educativo/sindrome-metabolica": {
    title: "Síndrome metabólica e testosterona no homem",
    description:
      "A relação entre síndrome metabólica, peso, testosterona e exercício físico na saúde masculina. Guia do urologista Dr. Felipe de Bulhões.",
  },
  "/educativo/procedimentos-andrologicos": {
    title: "Postectomia, vasectomia e varicocele: como são feitas",
    description:
      "Os procedimentos urológicos mais frequentes: como são realizados, recuperação e sinais de alerta. Guia do urologista Dr. Felipe de Bulhões.",
  },
  "/educativo/disfuncao-eretil": {
    title: "Disfunção erétil: causas, diagnóstico e tratamentos",
    description:
      "Causas da disfunção erétil, como é feito o diagnóstico e as opções de tratamento discutidas com o médico. Guia do urologista Dr. Felipe de Bulhões.",
  },
  "/educativo/exame-prostata": {
    title: "Exame de próstata: como é, preparo e quando fazer",
    description:
      "Como funcionam o toque retal e o PSA, preparo, quando fazer, mitos e verdades. Guia do urologista Dr. Felipe de Bulhões.",
  },
  "/educativo/urodinamica": {
    title: "Urodinâmica: o que é, como é feita e quando fazer",
    description:
      "O que é o exame de urodinâmica, como funciona, indicações, preparo e resultados. Guia do urologista Dr. Felipe de Bulhões.",
  },
  "/educativo/infeccao-urinaria": {
    title: "Infecção urinária no homem: causas, sintomas e tratamento",
    description:
      "Causas e sintomas da infecção urinária masculina, tratamento e quando procurar o urologista. Guia do urologista Dr. Felipe de Bulhões.",
  },
  "/educativo/cancer-prostata": {
    title: "Câncer de próstata: PSA, biópsia, Gleason e tratamento",
    description:
      "Câncer de próstata: diagnóstico, PSA, biópsia, Gleason, estadiamento e tratamento. Guia do urologista Dr. Felipe de Bulhões.",
  },
  "/educativo/biopsia-prostata": {
    title: "Biópsia de próstata: como é feita, preparo e complicações",
    description:
      "Indicações da biópsia de próstata, preparo, técnicas transperineal e transretal e complicações. Guia do urologista Dr. Felipe de Bulhões.",
  },
  "/educativo/cirurgia-robotica": {
    title: "Cirurgia robótica em urologia: como é e recuperação",
    description:
      "Prostatectomia, nefrectomia parcial e cistectomia robóticas: como são feitas e como é a recuperação. Guia do urologista Dr. Felipe de Bulhões.",
  },
  "/educativo/cancer-bexiga": {
    title: "Câncer de bexiga: sintomas, diagnóstico e tratamento",
    description:
      "Sangue na urina, cistoscopia, RTU, BCG intravesical, cistectomia e imunoterapia no câncer de bexiga. Guia do urologista Dr. Felipe de Bulhões.",
  },
  "/educativo/tratamento-cancer-prostata": {
    title: "Tratamento do câncer de próstata: opções por risco",
    description:
      "Vigilância ativa, cirurgia robótica, radioterapia e hormonioterapia conforme o grupo de risco. Guia do urologista Dr. Felipe de Bulhões.",
  },
  "/educativo/incontinencia-urinaria": {
    title: "Incontinência urinária masculina: causas e tratamentos",
    description:
      "Incontinência após prostatectomia: exercícios de Kegel, sling masculino e esfíncter artificial. Guia do urologista Dr. Felipe de Bulhões.",
  },
  "/educativo/infertilidade-masculina": {
    title: "Infertilidade masculina: causas, exames e tratamentos",
    description:
      "Espermograma, varicocele, azoospermia, terapia hormonal, micro-TESE e reprodução assistida. Guia do urologista Dr. Felipe de Bulhões.",
  },
  "/educativo/doenca-peyronie": {
    title: "Doença de Peyronie: curvatura peniana e tratamentos",
    description:
      "Curvatura peniana adquirida: fases da doença, tratamento clínico, plicatura, enxerto e prótese. Guia do urologista Dr. Felipe de Bulhões.",
  },
  "/educativo/protese-peniana": {
    title: "Prótese peniana inflável e maleável: indicação e cirurgia",
    description:
      "Quando a prótese peniana é indicada, diferenças entre inflável e maleável, cirurgia, recuperação e riscos. Guia do urologista Dr. Felipe de Bulhões.",
  },
  "/educativo/varicocele": {
    title: "Varicocele: sintomas, diagnóstico e tratamento cirúrgico",
    description:
      "O que é a varicocele, sintomas, classificação, diagnóstico e tratamento cirúrgico. Guia do urologista Dr. Felipe de Bulhões.",
  },
  "/educativo/hiperplasia-prostatica": {
    title: "Próstata aumentada (HPB): sintomas e tratamento",
    description:
      "O que é a hiperplasia prostática benigna, sintomas, diagnóstico, medicamentos e cirurgias. Guia do urologista Dr. Felipe de Bulhões.",
  },
  "/local/clinovi-paulista": {
    title: "Urologista na Av. Paulista: Clinovi Paulista | Particular",
    description:
      "Dr. Felipe de Bulhões atende na Clinovi Paulista: Av. Paulista, 1048, 18° andar, Bela Vista, São Paulo. Atendimento particular e teleconsulta.",
  },
  "/local/clinovi-pinheiros": {
    title: "Urologista em Pinheiros: Clinovi, Av. Rebouças | Particular",
    description:
      "Dr. Felipe de Bulhões atende na Clinovi Pinheiros: Av. Rebouças, 2636, São Paulo. Atendimento particular e teleconsulta.",
  },
  "/local/cemed-sao-luiz-campinas": {
    title: "Urologista em Campinas: CEMED Rede D'Or São Luiz",
    description:
      "Dr. Felipe de Bulhões atende no CEMED Rede D'Or São Luiz: Av. Andrade Neves, 863, Centro, Campinas. Consultas, cirurgias e exames urológicos.",
  },
  "/educativo/litotripsia-laser": {
    title: "Litotripsia a laser: como é feita, preparo e recuperação",
    description:
      "Como é feita a litotripsia a laser para pedra nos rins e no ureter: indicações, preparo, recuperação e complicações. Guia do urologista Dr. Felipe de Bulhões.",
  },
  "/educativo/vasectomia": {
    title: "Vasectomia: como é feita, recuperação, riscos e cuidados",
    description:
      "Vasectomia: como é feita, preparo, recuperação, riscos e espermograma de controle. Guia baseado em diretrizes, do urologista Dr. Felipe de Bulhões.",
  },
  "/educativo/engrossamento-peniano": {
    title: "Engrossamento peniano com ácido hialurônico: guia e riscos",
    description:
      "Como é feito o engrossamento peniano com ácido hialurônico: técnica, duração, riscos e evidências. Conteúdo educativo do urologista Dr. Felipe de Bulhões.",
  },
  "/local/campinas-day-hospital": {
    title: "Urologista no Campinas Day Hospital, Cambuí | Particular",
    description:
      "Dr. Felipe de Bulhões atende no Campinas Day Hospital: Av. Benjamin Constant, 1991, Cambuí, Campinas. Atendimento particular, às sextas, das 18h às 20h.",
  },
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
  "ejaculacao-precoce-causas-e-tratamentos": "Ejaculação precoce: causas e tratamentos",
  "cancer-de-rim-sintomas-diagnostico-tratamento": "Câncer de rim: sintomas, diagnóstico e tratamento",
  "cancer-de-testiculo-sinais-e-autoexame": "Câncer de testículo: sinais de alerta e tratamento",
  "fimose-em-adultos-e-criancas-tratamento": "Fimose em crianças e adultos: quando tratar",
  "prostatite-aguda-cronica-dor-pelvica": "Prostatite aguda, crônica e dor pélvica",
  "estenose-de-uretra-sintomas-tratamento": "Estenose de uretra: sintomas e tratamento",
  "bexiga-hiperativa-urgencia-urinaria-tratamento": "Bexiga hiperativa: urgência urinária tem tratamento",
  "ists-e-hpv-no-homem-prevencao-e-tratamento": "ISTs e HPV no homem: prevenção e tratamento",
  "preenchimento-peniano-4-perguntas-antes-de-fazer": "Preenchimento peniano: 4 perguntas antes de decidir",
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
  "ejaculacao-precoce-causas-e-tratamentos":
    `${SITE_ORIGIN}/manus-storage/og-banner-blog-ejaculacao-precoce-causas-e-tratamentos-marrom-neutro.jpg`,
  "cancer-de-rim-sintomas-diagnostico-tratamento":
    `${SITE_ORIGIN}/manus-storage/og-banner-blog-cancer-de-rim-sintomas-diagnostico-tratamento-marrom-neutro.jpg`,
  "cancer-de-testiculo-sinais-e-autoexame":
    `${SITE_ORIGIN}/manus-storage/og-banner-blog-cancer-de-testiculo-sinais-e-autoexame-marrom-neutro.jpg`,
  "fimose-em-adultos-e-criancas-tratamento":
    `${SITE_ORIGIN}/manus-storage/og-banner-blog-fimose-em-adultos-e-criancas-tratamento-marrom-neutro.jpg`,
  "prostatite-aguda-cronica-dor-pelvica":
    `${SITE_ORIGIN}/manus-storage/og-banner-blog-prostatite-aguda-cronica-dor-pelvica-marrom-neutro.jpg`,
  "estenose-de-uretra-sintomas-tratamento":
    `${SITE_ORIGIN}/manus-storage/og-banner-blog-estenose-de-uretra-sintomas-tratamento-marrom-neutro.jpg`,
  "bexiga-hiperativa-urgencia-urinaria-tratamento":
    `${SITE_ORIGIN}/manus-storage/og-banner-blog-bexiga-hiperativa-urgencia-urinaria-tratamento-marrom-neutro.jpg`,
  "ists-e-hpv-no-homem-prevencao-e-tratamento":
    `${SITE_ORIGIN}/manus-storage/og-banner-blog-ists-e-hpv-no-homem-prevencao-e-tratamento-marrom-neutro.jpg`,
  "preenchimento-peniano-4-perguntas-antes-de-fazer":
    `${SITE_ORIGIN}/manus-storage/og-banner-blog-preenchimento-peniano-4-perguntas-antes-de-fazer-marrom-neutro.jpg`,
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
    description: `${title}. Artigo educativo de urologia do Dr. Felipe de Bulhões (CRM-SP 202291), em linguagem clara e responsável.`,
    image,
    imageAlt: `${title} — Blog de Urologia`,
    type: "article",
    breadcrumb: title,
  };
}

/** Título e descrição de busca da rota, quando ela tiver texto próprio. */
export function getSearchSnippet(input: string) {
  return SEARCH_SNIPPETS[normalizeSitePath(input)];
}

/** Returns a deterministic metadata set for the URL delivered to crawlers and browsers. */
export function getPageMetadata(input: string): PageMetadata {
  const pathname = normalizeSitePath(input);
  const exact = ROUTE_METADATA[pathname];
  if (exact) return exact;

  const educationalLabel = EDUCATIONAL_LABELS[pathname];
  if (educationalLabel) {
    return { ...genericEducationalMetadata(educationalLabel), ...SEARCH_SNIPPETS[pathname] };
  }

  const locationLabel = LOCATION_LABELS[pathname];
  if (locationLabel) {
    return { ...genericLocationMetadata(locationLabel), ...SEARCH_SNIPPETS[pathname] };
  }

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
