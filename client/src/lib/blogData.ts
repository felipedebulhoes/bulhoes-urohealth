export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    credentials: string;
    avatar: string;
  };
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "importancia-saude-urologica-preventiva",
    title: "A Importância da Saúde Urológica Preventiva: Por Que Não Esperar os Sintomas",
    excerpt:
      "Com mais de 71 mil novos casos de câncer de próstata por ano no Brasil, a prevenção urológica nunca foi tão importante. Entenda quando procurar o urologista e quais exames são essenciais.",
    coverImage:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/blog-preventive-health-eERcqbP5UDxHnJ5CDuPzr6.webp",
    category: "Prevenção",
    date: "29 de Março de 2026",
    readTime: "8 min de leitura",
    author: {
      name: "Dr. Felipe de Bulhões",
      credentials: "CRM-SP 202291 | Urologista | TCBC",
      avatar:
        "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/instagram_profile_4b4b4c4b.jpg",
    },
    content: `
## Por que a prevenção urológica é fundamental?

A saúde do homem brasileiro enfrenta um cenário preocupante. Segundo pesquisa recente da Sociedade Brasileira de Urologia (SBU), **46% dos homens acima de 40 anos só procuram o médico quando já apresentam sintomas** — e esse número sobe para 58% entre os que dependem exclusivamente do SUS. Além disso, um estudo de 2022 revelou que **59% dos homens não visitam o urologista com regularidade**.

Essa resistência ao acompanhamento preventivo tem consequências graves. O câncer de próstata, por exemplo, é silencioso em suas fases iniciais e, quando diagnosticado tardiamente, apresenta prognóstico significativamente pior. A boa notícia é que, quando detectado precocemente, as taxas de cura ultrapassam 90%.

---

## Câncer de próstata: números que exigem atenção

O Instituto Nacional de Câncer (INCA) estima que o Brasil registre **mais de 71 mil novos casos de câncer de próstata por ano** no triênio 2023-2025, sendo o tumor mais frequente entre homens (excluindo o câncer de pele não melanoma). Em 2023, foram registrados **17.093 óbitos** pela doença no país — o equivalente a quase 48 mortes por dia.

Um dado particularmente alarmante é o crescimento entre homens mais jovens: os atendimentos por câncer de próstata em pacientes com **menos de 49 anos aumentaram 32% entre 2020 e 2024**, segundo o Ministério da Saúde. Isso reforça a importância do rastreamento precoce, especialmente para aqueles com fatores de risco.

### Quando iniciar o rastreamento?

De acordo com as diretrizes da **European Association of Urology (EAU)** e da **American Urological Association (AUA)**, atualizadas em 2025, recomenda-se:

- **A partir dos 50 anos** para homens sem fatores de risco
- **A partir dos 45 anos** para homens com fatores de risco (histórico familiar de câncer de próstata, homens negros)
- **A partir dos 40 anos** para homens com múltiplos fatores de risco ou histórico familiar forte

O rastreamento envolve a dosagem do **PSA (Antígeno Prostático Específico)** e o **exame digital retal (toque retal)**, que são complementares e, juntos, aumentam a sensibilidade da detecção.

---

## Além da próstata: outras condições urológicas que merecem atenção

### Cálculos renais (pedras nos rins)

Os cálculos renais afetam aproximadamente **10 a 12% da população brasileira**, com alta taxa de recorrência — quem já teve um episódio tem cerca de 50% de chance de desenvolver novos cálculos em 5 a 10 anos. No verão, a incidência aumenta em até 30% devido à desidratação.

A prevenção passa por hábitos simples: **ingestão adequada de líquidos** (pelo menos 2,5 litros de água por dia), redução do consumo excessivo de sal e proteína animal, e acompanhamento com estudo metabólico para pacientes com histórico de cálculos.

### Hiperplasia Prostática Benigna (HPB)

A HPB é uma condição extremamente comum que começa a se manifestar a partir dos 40-45 anos. Estima-se que **mais de 50% dos homens acima de 60 anos** apresentem algum grau de aumento prostático. Os sintomas incluem jato urinário fraco, necessidade de urinar com frequência (especialmente à noite) e sensação de esvaziamento incompleto da bexiga.

O diagnóstico precoce permite tratamentos menos invasivos e melhor qualidade de vida. Hoje, dispomos de opções que vão desde medicamentos até procedimentos minimamente invasivos, como a cirurgia robótica e a enucleação prostática a laser.

### Disfunção erétil e saúde sexual

A disfunção erétil pode ser um sinal precoce de doenças cardiovasculares, diabetes e outras condições sistêmicas. Não deve ser tratada como um tabu — é uma condição médica com tratamento eficaz e, muitas vezes, um marcador importante da saúde geral do homem.

---

## Check-up urológico: o que esperar da consulta

Uma consulta urológica preventiva completa geralmente inclui:

1. **Anamnese detalhada** — histórico pessoal e familiar, hábitos de vida, sintomas urinários e sexuais
2. **Exame físico** — incluindo o exame digital retal quando indicado
3. **Exames laboratoriais** — PSA, creatinina, urina tipo I, entre outros
4. **Exames de imagem** — ultrassonografia de rins e vias urinárias quando necessário
5. **Avaliação urodinâmica** — em casos de sintomas urinários complexos

---

## Sinais de alerta: quando procurar o urologista imediatamente

Alguns sintomas exigem avaliação urológica urgente:

- **Sangue na urina** (hematúria) — mesmo que em pequena quantidade ou episódio único
- **Dor lombar intensa** associada a náuseas — pode indicar cólica renal
- **Dificuldade progressiva para urinar** — jato fraco, gotejamento
- **Dor testicular** — especialmente em jovens, pode indicar torção testicular (emergência)
- **Alterações no PSA** — elevação ou velocidade de aumento acima do esperado

---

## A prevenção como investimento em qualidade de vida

Cuidar da saúde urológica não é apenas sobre evitar doenças — é sobre garantir qualidade de vida em todas as fases. O acompanhamento regular permite identificar alterações precocemente, quando o tratamento é mais simples, menos invasivo e com melhores resultados.

Como urologista formado pelo Instituto D'Or de Ensino e Pesquisa, com atuação em São Paulo e Campinas, meu compromisso é oferecer um atendimento humanizado, baseado nas melhores evidências científicas e nas diretrizes mais atualizadas das principais sociedades urológicas do mundo (EAU, AUA e SBU).

**Não espere os sintomas aparecerem. Agende sua consulta preventiva.**

---

### Referências

1. INCA — Estimativa 2023-2025: Incidência de Câncer no Brasil. Instituto Nacional de Câncer, Rio de Janeiro, 2022.
2. INCA — Estimativa 2026-2028: 781 mil novos casos de câncer por ano no Brasil. Fevereiro de 2026.
3. Ministério da Saúde — Sistema de Informações sobre Mortalidade (SIM), 2023.
4. Sociedade Brasileira de Urologia (SBU) — Pesquisa sobre saúde masculina, Novembro Azul 2025.
5. EAU Guidelines on Prostate Cancer — European Association of Urology, 2025.
6. AUA Guidelines — Early Detection of Prostate Cancer, atualizado em 2025/2026.
7. Agência Brasil — Câncer de próstata: atendimento aumenta 32% em homens com até 49 anos. Novembro de 2025.
`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
