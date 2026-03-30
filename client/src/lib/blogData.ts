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

const defaultAuthor = {
  name: "Dr. Felipe de Bulhões",
  credentials: "CRM-SP 202291 | Urologista | TCBC",
  avatar:
    "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/instagram_profile_bc867e99.jpg",
};

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
    author: defaultAuthor,
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
  {
    id: "2",
    slug: "urologista-medico-do-homem-desde-jovem",
    title: "O Urologista é o Médico do Homem: Por Que Não Esperar os 40 Anos Para Sua Primeira Consulta",
    excerpt:
      "Assim como a mulher tem o ginecologista desde a adolescência, o homem deveria ter o urologista como seu médico de referência desde cedo. Entenda por que essa mudança cultural é urgente.",
    coverImage:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    category: "Saúde Masculina",
    date: "29 de Março de 2026",
    readTime: "10 min de leitura",
    author: defaultAuthor,
    content: `
## O gap da saúde masculina: um problema cultural

Existe uma assimetria preocupante na saúde brasileira. Enquanto as mulheres são orientadas desde a adolescência a procurar o ginecologista — para acompanhamento menstrual, orientação contraceptiva, prevenção de doenças e check-ups regulares — os homens crescem sem um médico de referência equivalente. O resultado é alarmante: segundo dados do IBGE e do Ministério da Saúde, **os homens brasileiros vivem em média 7 anos menos que as mulheres** e são responsáveis por 60% das mortes prematuras (antes dos 70 anos).

A Sociedade Brasileira de Urologia (SBU) e a Política Nacional de Atenção Integral à Saúde do Homem (PNAISH) reconhecem que essa diferença não é biológica — é comportamental e cultural. **O homem não foi educado a cuidar preventivamente da sua saúde.**

---

## O paralelo com a ginecologia: uma lição a aprender

Quando uma menina entra na puberdade, a família naturalmente a encaminha ao ginecologista. Esse profissional a acompanhará por toda a vida, cuidando de:

- Desenvolvimento puberal e ciclo menstrual
- Orientação contraceptiva e saúde sexual
- Prevenção de ISTs e câncer de colo uterino
- Gestação e menopausa
- Rastreamento de câncer de mama

**E o menino? Quem cuida dele quando sai do pediatra?**

Na maioria dos casos, ninguém. O adolescente masculino fica em um "limbo médico" — sem acompanhamento regular até que algum problema grave o force a procurar ajuda, muitas vezes décadas depois. Essa lacuna tem consequências sérias.

---

## O urologista em cada fase da vida masculina

### Adolescência (12-18 anos)
O urologista pode e deve ser consultado já na adolescência para:

- **Avaliação do desenvolvimento puberal** — identificar atrasos ou alterações hormonais
- **Varicocele** — presente em até 15% dos adolescentes, pode comprometer a fertilidade futura se não tratada
- **Fimose** — avaliação da necessidade de postectomia
- **Criptorquidia** — testículos que não desceram adequadamente
- **Orientação sobre HPV** — vacinação e prevenção de verrugas genitais e câncer
- **Torção testicular** — educação sobre sinais de alerta (emergência urológica)
- **Orientação sexual** — dúvidas sobre desenvolvimento, ejaculação e saúde sexual

> **Referência:** A EAU Paediatric Urology Guidelines (2025) recomenda acompanhamento urológico para varicocele em adolescentes com alteração do volume testicular, e a SBU orienta avaliação urológica na puberdade para rastreamento de condições congênitas.

### Adulto jovem (18-35 anos)
Fase frequentemente negligenciada, mas com demandas urológicas importantes:

- **Infecções sexualmente transmissíveis (ISTs)** — HPV, clamídia, gonorreia, herpes
- **Infertilidade masculina** — responsável por 40-50% dos casos de infertilidade do casal
- **Dor testicular crônica** — investigação de epididimite, varicocele, cistos
- **Cálculos renais** — pico de incidência entre 20-40 anos
- **Infecções urinárias** — embora menos comuns em homens, quando ocorrem exigem investigação
- **Saúde sexual** — ejaculação precoce, curvatura peniana (doença de Peyronie)
- **Planejamento familiar** — vasectomia como método contraceptivo definitivo

> **Referência:** Segundo a AUA Male Infertility Guidelines (2024), todo homem em casal com dificuldade para conceber deve ser avaliado por urologista, pois o fator masculino está presente em metade dos casos.

### Meia-idade (35-55 anos)
Período em que muitas condições começam a se manifestar:

- **Hiperplasia Prostática Benigna (HPB)** — sintomas urinários progressivos
- **Disfunção erétil** — pode ser o primeiro sinal de doença cardiovascular
- **Hipogonadismo (queda de testosterona)** — fadiga, perda de libido, ganho de peso
- **Síndrome metabólica** — relação direta com saúde urológica e andrológica
- **Rastreamento de câncer de próstata** — início conforme fatores de risco
- **Cálculos renais recorrentes** — estudo metabólico e prevenção

> **Referência:** A EAU Guidelines on Male Hypogonadism (2025) destaca que a deficiência de testosterona afeta 2-6% dos homens entre 40-79 anos e está associada a aumento do risco cardiovascular, diabetes tipo 2 e osteoporose.

### Maturidade (55+ anos)
Fase que exige acompanhamento mais frequente:

- **Câncer de próstata** — rastreamento ativo e vigilância
- **HPB avançada** — opções cirúrgicas modernas (HoLEP, ThuLEP, Rezum)
- **Incontinência urinária** — avaliação e tratamento
- **Disfunção erétil** — novas opções terapêuticas
- **Bexiga hiperativa** — tratamento medicamentoso e procedimentos
- **Câncer de bexiga e rim** — rastreamento em grupos de risco

---

## Os números que comprovam a urgência

| Dado | Fonte |
|------|-------|
| Homens vivem em média 7 anos menos que mulheres no Brasil | IBGE, 2023 |
| 60% das mortes prematuras são de homens | Ministério da Saúde / PNAISH |
| 59% dos homens não visitam o urologista regularmente | SBU, 2025 |
| 46% só procuram o médico quando têm sintomas | SBU, Novembro Azul 2025 |
| Câncer de próstata em jovens (<49 anos) cresceu 32% | Ministério da Saúde, 2024 |
| 40-50% da infertilidade do casal tem fator masculino | AUA Guidelines, 2024 |

---

## A mudança começa agora

Precisamos mudar a cultura da saúde masculina no Brasil. Assim como nenhuma mulher espera ter um problema ginecológico para procurar seu ginecologista, **nenhum homem deveria esperar os 40 anos — ou pior, esperar sintomas — para conhecer seu urologista**.

O urologista é o médico do homem. Não apenas o "médico da próstata", mas o especialista que acompanha a saúde masculina em todas as suas dimensões: urinária, sexual, reprodutiva e hormonal.

### O que fazer agora?

1. **Se você tem entre 12-18 anos** (ou é pai de um adolescente): agende uma primeira avaliação urológica. É simples, rápido e pode prevenir problemas futuros.
2. **Se você tem entre 18-35 anos**: não espere sintomas. Faça um check-up urológico, especialmente se tem vida sexual ativa ou planeja ter filhos.
3. **Se você tem 35+ anos**: estabeleça um acompanhamento regular. A prevenção é o melhor investimento em qualidade de vida.
4. **Se você tem 50+ anos**: o rastreamento de câncer de próstata é fundamental. Não deixe o preconceito atrapalhar sua saúde.

**O melhor momento para começar a cuidar da sua saúde foi ontem. O segundo melhor é hoje.**

---

### Referências

1. IBGE — Tábua de Mortalidade 2023. Expectativa de vida por sexo no Brasil.
2. Ministério da Saúde — Política Nacional de Atenção Integral à Saúde do Homem (PNAISH), 2009/2024.
3. Sociedade Brasileira de Urologia (SBU) — Campanha Novembro Azul 2025: Pesquisa sobre hábitos de saúde masculina.
4. EAU Guidelines on Paediatric Urology — European Association of Urology, 2025.
5. EAU Guidelines on Male Hypogonadism — European Association of Urology, 2025.
6. AUA Guidelines on Male Infertility — American Urological Association, 2024.
7. Agência Brasil — Câncer de próstata: atendimento aumenta 32% em homens com até 49 anos. Novembro de 2025.
8. Campbell-Walsh-Wein Urology, 13th Edition — Chapter 1: Evaluation of the Urologic Patient.
`,
  },
  {
    id: "3",
    slug: "pedra-no-rim-o-que-fazer",
    title: "Pedra no Rim: O Que Fazer Quando a Cólica Renal Aparece",
    excerpt:
      "Dor intensa nas costas, náuseas e sangue na urina? Pode ser cólica renal. Saiba como agir, quando procurar o pronto-socorro e quais tratamentos modernos existem.",
    coverImage:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80",
    category: "Cálculos Renais",
    date: "29 de Março de 2026",
    readTime: "7 min de leitura",
    author: defaultAuthor,
    content: `
## O que são cálculos renais?

Os cálculos renais — popularmente conhecidos como "pedras nos rins" — são formações sólidas compostas por cristais minerais que se acumulam nos rins ou nas vias urinárias. Afetam aproximadamente **10-12% da população mundial**, com prevalência crescente nas últimas décadas devido a mudanças nos hábitos alimentares e estilo de vida sedentário.

No Brasil, estima-se que **1 em cada 10 pessoas** desenvolverá cálculos renais ao longo da vida, com maior incidência em homens (proporção de 2:1) e pico entre 20 e 50 anos de idade.

---

## Sintomas: como reconhecer a cólica renal

A cólica renal é considerada uma das dores mais intensas da medicina. Os sintomas clássicos incluem:

- **Dor lombar intensa** — geralmente unilateral, em cólica (vai e volta), que pode irradiar para a virilha, testículo ou lábios vaginais
- **Náuseas e vômitos** — reflexo da dor intensa
- **Sangue na urina** (hematúria) — presente em 80-90% dos casos
- **Urgência e frequência urinária** — quando o cálculo está próximo à bexiga
- **Febre** — sinal de alerta que pode indicar infecção associada (emergência!)

### Quando ir ao pronto-socorro?

Procure atendimento de emergência se apresentar:
- Dor insuportável que não melhora com analgésicos
- **Febre acima de 38°C** associada à dor lombar (pode indicar pielonefrite obstrutiva — emergência urológica)
- Impossibilidade de urinar
- Vômitos persistentes com desidratação

---

## Diagnóstico

O diagnóstico é feito por:

1. **Tomografia computadorizada sem contraste** — padrão-ouro, identifica 98% dos cálculos, determina tamanho, localização e presença de obstrução
2. **Ultrassonografia** — alternativa sem radiação, ideal para gestantes e acompanhamento
3. **Exames de sangue e urina** — avaliam função renal e presença de infecção

---

## Tratamentos modernos

### Tratamento conservador (cálculos pequenos)
Para cálculos menores que 6-7mm, sem complicações:
- Hidratação abundante
- Analgesia (anti-inflamatórios, dipirona, opioides se necessário)
- Terapia médica expulsiva (tansulosina) — facilita a eliminação espontânea
- Taxa de eliminação espontânea: 70-80% para cálculos < 5mm

### Litotripsia Extracorpórea por Ondas de Choque (LECO)
- Ondas de choque fragmentam o cálculo de fora para dentro
- Procedimento ambulatorial, sem incisões
- Indicação: cálculos renais de 5-20mm
- Limitações: menos eficaz para cálculos duros (oxalato de cálcio monohidratado) ou em pacientes obesos

### Ureterorrenolitotripsia Flexível a Laser (URSS)
- Endoscópio flexível introduzido pela uretra até o rim
- Laser Holmium ou Thulium fragmenta o cálculo em pó ("dusting") ou fragmentos
- **Sem cortes, sem cicatrizes**
- Indicação: cálculos de até 20mm em qualquer localização
- Alta hospitalar em 24 horas na maioria dos casos

### Nefrolitotripsia Percutânea (PCNL)
- Acesso direto ao rim por uma pequena incisão nas costas (1cm)
- Indicação: cálculos grandes (> 20mm) ou coraliformes
- Versões modernas: mini-PCNL e micro-PCNL com instrumentos menores

---

## O cateter duplo J: por que é necessário?

Após muitos procedimentos endoscópicos, é colocado um cateter duplo J (stent ureteral) — um tubo fino e flexível que mantém o ureter aberto, garantindo a drenagem da urina do rim para a bexiga.

**Por que é colocado?**
- Prevenir obstrução por edema (inchaço) pós-operatório
- Facilitar a passagem de fragmentos residuais
- Garantir drenagem em caso de lesão ureteral

**Sintomas comuns com o duplo J:**
- Desconforto na região lombar ao urinar
- Urgência e frequência urinária aumentadas
- Sangue na urina (especialmente após esforço físico)

**Importante:** O duplo J é **temporário** — geralmente retirado em 1-4 semanas por cistoscopia ambulatorial (procedimento rápido de 2-3 minutos).

---

## Prevenção: como evitar novos cálculos

A taxa de recorrência é de **50% em 5-10 anos** sem medidas preventivas. A prevenção é fundamental:

1. **Hidratação** — mínimo de 2,5 litros de água por dia (objetivo: urina clara)
2. **Redução do sódio** — máximo 2g/dia (evitar alimentos ultraprocessados)
3. **Proteína animal moderada** — não exceder 0,8-1g/kg/dia
4. **Cálcio na dieta** — NÃO restringir cálcio alimentar (paradoxalmente, dietas pobres em cálcio aumentam o risco)
5. **Citrato** — suco de limão/laranja natural aumenta o citrato urinário (protetor)
6. **Estudo metabólico** — exames de urina de 24h para identificar fatores de risco específicos

> **Referência:** EAU Guidelines on Urolithiasis (2025) recomendam estudo metabólico para todos os pacientes com cálculos recorrentes ou de alto risco.

---

### Referências

1. EAU Guidelines on Urolithiasis — European Association of Urology, 2025.
2. AUA/Endourological Society Guideline on Surgical Management of Stones, 2024.
3. Campbell-Walsh-Wein Urology, 13th Edition — Chapters 52-55: Urinary Lithiasis.
4. Türk C, et al. EAU Guidelines on Interventional Treatment for Urolithiasis. Eur Urol. 2025.
`,
  },
  {
    id: "4",
    slug: "quando-procurar-urologista",
    title: "10 Sinais de Que Você Deve Procurar um Urologista",
    excerpt:
      "Muitos homens adiam a consulta urológica por vergonha ou desconhecimento. Conheça os 10 sinais mais importantes que indicam a necessidade de avaliação especializada.",
    coverImage:
      "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&q=80",
    category: "Prevenção",
    date: "29 de Março de 2026",
    readTime: "6 min de leitura",
    author: defaultAuthor,
    content: `
## Não ignore estes sinais

A maioria das doenças urológicas tem tratamento eficaz quando diagnosticadas precocemente. O problema é que muitos homens ignoram sinais importantes ou adiam a consulta por vergonha, medo ou desinformação. Conheça os 10 sinais que indicam que você deve procurar um urologista:

---

### 1. Sangue na urina (hematúria)

Mesmo que seja apenas uma vez e em pequena quantidade, **sangue na urina nunca é normal** e sempre exige investigação. Pode ser sinal de cálculos renais, infecção urinária, ou — em casos mais graves — câncer de bexiga ou rim. A hematúria microscópica (detectada apenas em exame de urina) também merece atenção.

> **Referência:** A AUA Microhematuria Guideline (2024) recomenda investigação completa para qualquer episódio de hematúria macroscópica em adultos.

### 2. Dificuldade para urinar

Jato urinário fraco, hesitação para iniciar a micção, gotejamento no final, sensação de esvaziamento incompleto — todos são sintomas de possível obstrução prostática (HPB) ou estenose uretral. Não é "normal da idade" e tem tratamento.

### 3. Acordar várias vezes à noite para urinar (noctúria)

Levantar mais de uma vez por noite para urinar (noctúria) afeta significativamente a qualidade do sono e pode indicar HPB, bexiga hiperativa, diabetes ou insuficiência cardíaca. Merece avaliação urológica.

### 4. Dor ou nódulo nos testículos

Qualquer dor persistente, inchaço ou nódulo testicular deve ser avaliado com urgência. O câncer de testículo é o tumor sólido mais comum em homens jovens (15-35 anos) e tem **taxa de cura superior a 95% quando detectado precocemente**. Torção testicular é uma emergência que exige cirurgia em até 6 horas.

### 5. Disfunção erétil

A dificuldade de obter ou manter uma ereção não é apenas um problema sexual — pode ser o **primeiro sinal de doença cardiovascular**, antecedendo um infarto em 3-5 anos. Também pode indicar diabetes, hipogonadismo ou problemas neurológicos. Tem tratamento eficaz em mais de 80% dos casos.

> **Referência:** A EAU Guidelines on Sexual and Reproductive Health (2025) destaca que a disfunção erétil é um fator de risco cardiovascular independente.

### 6. Dor lombar intensa e súbita

Dor lombar em cólica, unilateral, que irradia para a virilha, associada a náuseas — é o quadro clássico de cólica renal. Se acompanhada de febre, é uma emergência urológica.

### 7. Infecções urinárias de repetição

Embora menos comuns em homens, infecções urinárias recorrentes podem indicar problemas anatômicos, cálculos, HPB ou outras condições que precisam de investigação.

### 8. Alterações na ejaculação

Ejaculação dolorosa, sangue no esperma (hemospermia), diminuição do volume ejaculado ou ejaculação precoce persistente são motivos para avaliação urológica.

### 9. Infertilidade

Se o casal está tentando engravidar há mais de 12 meses sem sucesso, o homem deve ser avaliado. O fator masculino está presente em **40-50% dos casos de infertilidade**. O espermograma é o primeiro exame a ser solicitado.

### 10. Idade acima de 40 anos sem acompanhamento

Mesmo sem sintomas, todo homem acima de 40 anos (ou 35 com fatores de risco) deve fazer check-up urológico anual. A prevenção é a melhor medicina.

---

## Não espere. Cuide-se.

A consulta urológica é simples, rápida e pode salvar sua vida. Quebre o tabu, agende sua consulta e invista na sua saúde.

---

### Referências

1. EAU Guidelines on Non-neurogenic Male LUTS — European Association of Urology, 2025.
2. AUA Guideline on Microhematuria — American Urological Association, 2024.
3. EAU Guidelines on Sexual and Reproductive Health — European Association of Urology, 2025.
4. EAU Guidelines on Testicular Cancer — European Association of Urology, 2025.
5. Campbell-Walsh-Wein Urology, 13th Edition — Chapter 1: Evaluation of the Urologic Patient.
`,
  },
  {
    id: "5",
    slug: "cirurgia-robotica-urologica",
    title: "Cirurgia Robótica Urológica: O Que Você Precisa Saber Sobre a Tecnologia Que Está Transformando a Urologia",
    excerpt:
      "A cirurgia robótica urológica oferece mais precisão, menos dor e recuperação mais rápida. Entenda como funciona, quais procedimentos podem ser realizados e por que essa tecnologia já é realidade no Brasil.",
    coverImage:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/blog-robotic-surgery-cover-E6WUHbvNsLa775YuR9Rt6F.webp",
    category: "Cirurgia Robótica",
    date: "29 de Março de 2026",
    readTime: "12 min de leitura",
    author: defaultAuthor,
    content: `
## O que é a cirurgia robótica urológica?

A **cirurgia robótica urológica** é uma modalidade de cirurgia minimamente invasiva na qual o cirurgião opera por meio de um console equipado com visão tridimensional ampliada e braços robóticos articulados. Diferente do que muitos imaginam, o robô não opera sozinho — ele é uma extensão das mãos do cirurgião, que mantém o controle total de cada movimento.

Desde a aprovação do sistema Da Vinci pela FDA em 2000, a plataforma robótica revolucionou a urologia ao oferecer precisão milimétrica, filtragem de tremores e amplitude de movimento superior à da mão humana, com 7 graus de liberdade. Hoje, a urologia é a especialidade que mais utiliza cirurgia robótica no mundo, respondendo por mais da metade dos procedimentos realizados com essa tecnologia.

---

## Como funciona na prática?

O sistema robótico é composto por três elementos principais:

**1. Console do cirurgião** — onde o urologista se posiciona sentado, com visão 3D ampliada em até 10 vezes e controles que traduzem seus movimentos para os instrumentos dentro do paciente.

**2. Carrinho do paciente** — os braços robóticos que seguram a câmera e os instrumentos cirúrgicos, inseridos por incisões de apenas 8 a 12 milímetros.

**3. Torre de visão** — monitores de alta definição que permitem a toda a equipe cirúrgica acompanhar o procedimento em tempo real.

O cirurgião realiza movimentos naturais com as mãos, e o sistema os reproduz com escala reduzida e sem tremores, permitindo dissecções extremamente delicadas em espaços anatômicos complexos.

---

## Quais procedimentos urológicos podem ser realizados com robótica?

A cirurgia robótica urológica tem aplicação em uma ampla gama de procedimentos, tanto oncológicos quanto benignos:

**Procedimentos oncológicos:**
- **Prostatectomia radical** — tratamento cirúrgico do câncer de próstata (procedimento robótico mais realizado no mundo)
- **Nefrectomia parcial** — remoção de tumores renais com preservação do rim
- **Cistectomia radical** — remoção da bexiga por câncer, com reconstrução urinária
- **Adrenalectomia** — remoção de tumores da glândula adrenal
- **Linfadenectomia retroperitoneal** — remoção de linfonodos em tumores testiculares

**Procedimentos benignos:**
- **Pieloplastia** — correção de obstrução da junção ureteropélvica (JUP)
- **Reimplante ureteral** — correção de refluxo vesicoureteral ou estenoses
- **Sacrocolpopexia** — correção de prolapso de órgãos pélvicos
- **Cirurgias reconstrutivas** — reconstrução de vias urinárias

---

## Vantagens em relação à cirurgia aberta convencional

As evidências científicas acumuladas nas últimas duas décadas demonstram vantagens consistentes da abordagem robótica sobre a cirurgia aberta convencional. Uma meta-análise publicada em 2025 pelo Korean Society of Endourology Research (KSER), comparando prostatectomia robótica, laparoscópica e aberta, demonstrou superioridade da via robótica em desfechos funcionais. Outra meta-análise de Tian et al. (2025), publicada na revista Medicine, confirmou que a prostatectomia robótica apresenta menor taxa de recorrência bioquímica do que a laparoscópica.

As principais vantagens incluem:

**Menor sangramento** — a visão ampliada e a precisão dos instrumentos permitem hemostasia mais eficiente, com menor necessidade de transfusão sanguínea.

**Incisões menores** — enquanto a cirurgia aberta requer incisões de 10 a 15 centímetros, a robótica utiliza 4 a 6 portais de 8 a 12 milímetros.

**Menos dor pós-operatória** — consequência direta das incisões menores e do menor trauma tecidual.

**Internação mais curta** — em média 1 a 2 dias, contra 3 a 5 dias na cirurgia aberta.

**Recuperação mais rápida** — retorno a atividades leves em 7 a 10 dias e a atividades físicas em 4 a 6 semanas.

**Melhor preservação funcional** — especialmente na prostatectomia radical, a visão ampliada permite preservação mais precisa dos feixes neurovasculares, resultando em melhores taxas de continência urinária e função erétil.

---

## A cirurgia robótica no Brasil: uma realidade em expansão

O Brasil tem acompanhado a tendência mundial de adoção da cirurgia robótica. Segundo dados recentes, o país conta com mais de 100 sistemas robóticos instalados e aproximadamente 2.500 cirurgiões treinados na plataforma Da Vinci. O crescimento nos últimos anos foi expressivo — a Associação Médica Brasileira (AMB) registrou um aumento de 417% no número de procedimentos robóticos realizados no país.

Um marco importante ocorreu em outubro de 2025, quando a **prostatectomia robótica foi oficialmente incorporada ao Sistema Único de Saúde (SUS)**, ampliando o acesso a essa tecnologia para a população brasileira. Além disso, a partir de abril de 2026, a prostatectomia robótica tornou-se obrigatória na cobertura dos planos de saúde.

A chegada de novos fabricantes ao mercado — como o Versius (CMR Surgical), Hugo (Medtronic) e Hinotori (Medicaroid) — tem contribuído para a redução de custos, com estimativas de queda de 30% a 50% no valor dos procedimentos para o paciente.

---

## O robô opera sozinho?

Essa é uma das dúvidas mais frequentes. A resposta é clara: **não**. O robô cirúrgico é um instrumento sofisticado que amplifica as habilidades do cirurgião, mas não tem autonomia para tomar decisões ou realizar movimentos independentes. Cada gesto é comandado pelo urologista em tempo real.

Por isso, a experiência e o treinamento do cirurgião continuam sendo os fatores mais determinantes para o sucesso do procedimento. A tecnologia robótica potencializa a habilidade do profissional, mas não a substitui.

---

## É segura?

A cirurgia robótica urológica é considerada segura e eficaz pelas principais sociedades urológicas do mundo. Os EAU Guidelines (European Association of Urology) recomendam a abordagem robótica como opção de tratamento para diversas condições urológicas, e a AUA (American Urological Association) reconhece seus benefícios em termos de desfechos funcionais e oncológicos.

Como qualquer procedimento cirúrgico, existem riscos inerentes — sangramento, infecção, lesão de estruturas adjacentes. No entanto, as taxas de complicações são comparáveis ou inferiores às da cirurgia aberta na maioria das séries publicadas.

---

## Quando a cirurgia robótica é indicada?

A indicação da cirurgia robótica depende de diversos fatores, incluindo o tipo de doença, a anatomia do paciente, as condições clínicas e a experiência do cirurgião. De forma geral, a abordagem robótica é especialmente vantajosa em:

- Cirurgias que exigem dissecção precisa em espaços confinados (como a pelve)
- Procedimentos que demandam preservação de estruturas delicadas (nervos, vasos)
- Pacientes obesos, nos quais o acesso cirúrgico convencional é mais difícil
- Reconstruções complexas que exigem suturas intracorpóreas refinadas

A decisão sobre a melhor abordagem deve ser individualizada e discutida entre o paciente e seu urologista.

---

## O futuro da cirurgia robótica urológica

O campo da cirurgia robótica continua em rápida evolução. As tendências mais promissoras incluem a integração de inteligência artificial para navegação intraoperatória, realidade aumentada sobreposta ao campo cirúrgico, plataformas de porta única (single-port) que reduzem ainda mais o número de incisões, e a possibilidade de telecirurgia — na qual o cirurgião opera à distância.

Estudos recentes demonstram que a integração de IA já é capaz de reduzir o tempo operatório em até 25% e as complicações intraoperatórias em até 30%, sinalizando um futuro ainda mais promissor para essa tecnologia.

---

## Considerações finais

A cirurgia robótica urológica representa uma evolução significativa no tratamento de doenças urológicas, combinando precisão tecnológica com a experiência do cirurgião para oferecer melhores resultados aos pacientes. Com a expansão do acesso no Brasil — tanto no SUS quanto nos planos de saúde — essa tecnologia está cada vez mais disponível.

Se você tem indicação cirúrgica urológica, converse com seu urologista sobre a possibilidade da abordagem robótica. A decisão deve ser baseada em evidências, experiência do cirurgião e nas características individuais de cada caso.

**Tem dúvidas sobre cirurgia robótica urológica? Agende uma consulta para uma avaliação personalizada.**

---

### Referências

1. EAU Guidelines on Prostate Cancer — European Association of Urology, 2025.
2. EAU Guidelines on Renal Cell Carcinoma — European Association of Urology, 2025.
3. Kim DK, et al. Comparison of Robot-Assisted, Laparoscopic, and Open Radical Prostatectomy Outcomes: A Systematic Review and Network Meta-Analysis from KSER. Medicina. 2025;61(1):61.
4. Tian Z, et al. Meta-analysis of radical prostatectomy outcomes. Medicine. 2025;104(32).
5. McGill S, et al. Comparing Robot-Assisted Surgery Outcomes in Urology. J Urol Open Plus. 2025.
6. Katsimperis S, et al. Beyond Da Vinci: Comparative Review of Next-Generation Robotic Surgical Platforms in Urology. J Clin Med. 2025.
7. Wah JNK, et al. The rise of robotics and AI-assisted surgery in modern healthcare. PMC. 2025.
8. Orsini A, et al. Outpatient robotic urological surgery: an evidence-based analysis. Eur Urol Focus. 2024.
9. SBU-SP — Os avanços da cirurgia robótica e tecnológica na urologia moderna. Outubro de 2025.
10. Campbell-Walsh-Wein Urology, 13th Edition — Chapters on Minimally Invasive and Robotic Surgery.
`,
  },
  {
    id: "4",
    slug: "urologista-campinas-quando-procurar",
    title: "Urologista em Campinas: Quando Procurar e Como Escolher o Melhor Especialista",
    excerpt:
      "Saiba quando procurar um urologista em Campinas, quais condições são tratadas, como funciona a primeira consulta e por que o acompanhamento regular é essencial para a saúde masculina.",
    coverImage:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/blog-urologista-campinas-cover_ba932b43.jpg",
    category: "Saúde Masculina",
    date: "30 de Março de 2026",
    readTime: "9 min de leitura",
    author: defaultAuthor,
    content: `
## Por que procurar um urologista em Campinas?

Campinas é a terceira maior cidade do estado de São Paulo, com uma população estimada de **1,2 milhão de habitantes** e uma região metropolitana que ultrapassa 3 milhões de pessoas. Apesar de contar com uma rede de saúde robusta, muitos homens da região ainda negligenciam o acompanhamento urológico preventivo. Segundo dados da **Sociedade Brasileira de Urologia (SBU)**, quase **metade dos homens acima de 40 anos só procura o médico quando já apresenta sintomas** — um comportamento que pode retardar diagnósticos importantes.

O urologista é o médico especialista no sistema urinário (rins, ureteres, bexiga e uretra) de homens e mulheres, e também no sistema reprodutor masculino (próstata, testículos, pênis). Para o homem, o urologista funciona como um médico de referência ao longo de toda a vida — assim como o ginecologista é para a mulher.

---

## Quando procurar um urologista?

A consulta urológica é indicada em diversas situações, não apenas quando há sintomas. Veja os principais motivos para agendar uma avaliação:

### Rastreamento e prevenção

- **A partir dos 50 anos** (ou 45 anos com fatores de risco): rastreamento de câncer de próstata com PSA e toque retal, conforme recomendação da **EAU Guidelines 2025** e da **SBU**
- **Histórico familiar** de câncer de próstata, renal ou de bexiga
- **Homens negros**: maior incidência de câncer de próstata (1,7x maior segundo o INCA)
- **Portadores de mutações BRCA2**: rastreamento a partir dos 40 anos (EAU 2025)

### Sintomas urinários

- Jato urinário fraco ou interrompido
- Necessidade de urinar com frequência, especialmente à noite (noctúria)
- Urgência urinária ou incontinência
- Dor ou ardência ao urinar
- Sangue na urina (hematúria) — **sempre requer investigação urgente**
- Dificuldade para iniciar a micção

### Dor e desconforto

- Dor lombar intensa (possível cólica renal)
- Dor testicular — especialmente em jovens, pode indicar torção testicular (emergência)
- Dor pélvica crônica
- Dor durante a relação sexual

### Saúde sexual e reprodutiva

- Disfunção erétil
- Ejaculação precoce
- Infertilidade masculina
- Curvatura peniana (Doença de Peyronie)
- Orientação sobre vasectomia

---

## Quais condições o urologista trata?

O campo de atuação do urologista é amplo e abrange diversas condições:

### Próstata
- **Hiperplasia Prostática Benigna (HPB)**: aumento benigno da próstata que afeta mais de 50% dos homens acima de 60 anos, causando sintomas urinários obstrutivos
- **Câncer de próstata**: o tumor mais frequente entre homens no Brasil, com mais de 71 mil novos casos/ano (INCA 2023-2025)
- **Prostatite**: inflamação da próstata, que pode ser aguda ou crônica

### Rins e vias urinárias
- **Cálculos renais (pedras nos rins)**: afetam 10-12% da população brasileira
- **Infecções urinárias**: mais comuns em mulheres, mas também relevantes em homens
- **Tumores renais e de bexiga**
- **Cistos renais**

### Saúde sexual masculina
- **Disfunção erétil**: pode ser um marcador precoce de doenças cardiovasculares
- **Hipogonadismo**: deficiência de testosterona
- **Infertilidade masculina**: responsável por 40-50% dos casos de infertilidade do casal
- **Varicocele**: presente em até 15% dos adolescentes

---

## Como é a primeira consulta com o urologista?

A consulta urológica é mais simples do que muitos imaginam. Veja o que esperar:

1. **Anamnese detalhada**: o médico fará perguntas sobre seu histórico de saúde, sintomas, medicamentos em uso, hábitos de vida e histórico familiar
2. **Exame físico**: inclui avaliação abdominal, genital e, quando indicado, o exame digital retal (toque retal) — que dura apenas 10-15 segundos
3. **Solicitação de exames**: conforme a necessidade, podem ser solicitados PSA, ultrassonografia, exames de urina, entre outros
4. **Orientação e plano de tratamento**: discussão dos achados e definição de conduta

> **Dica importante:** Leve seus exames anteriores (sangue, imagem, laudos) para a consulta. Isso permite uma avaliação mais completa e evita repetições desnecessárias.

---

## Atendimento urológico em Campinas: Campinas Day Hospital

O **Campinas Day Hospital** é um centro cirúrgico moderno localizado no **Jardim Chapadão**, em Campinas, equipado com tecnologia de ponta para consultas, exames e procedimentos urológicos. O atendimento é realizado por convênios e particular.

**Endereço:** R. Angela Signori Grigol, 299 — Jardim Chapadão, Campinas/SP — CEP 13070-585

**Horário:** Sexta-feira, 8h às 12h

**Convênios aceitos:** Allianz, Amil, Assefaz, Bradesco, Cassi, Gama, Go Care, Holambra, Medservice, Porto Seguro, Skill/Omint, SulAmérica, Unimed

**Serviços disponíveis:**
- Consultas urológicas
- Urodinâmica
- Biópsia de próstata
- Cirurgias minimamente invasivas
- Procedimentos ambulatoriais

O Campinas Day Hospital oferece estacionamento próprio gratuito e estrutura completa para procedimentos ambulatoriais e cirurgias de curta permanência.

---

## Como escolher um bom urologista?

Alguns critérios importantes para escolher seu urologista:

- **Formação e titulação**: verifique se o médico possui título de especialista em urologia (TiSBU) e registro no CRM
- **Atualização científica**: profissionais que seguem as diretrizes internacionais (EAU, AUA, SBU) oferecem tratamentos baseados nas melhores evidências
- **Experiência**: especialmente para procedimentos cirúrgicos, a experiência do cirurgião impacta diretamente nos resultados
- **Humanização**: um bom urologista escuta, explica e respeita as preocupações do paciente
- **Avaliações de pacientes**: plataformas como Doctoralia e Google permitem verificar a experiência de outros pacientes

---

## Sobre o Dr. Felipe de Bulhões

O **Dr. Felipe de Bulhões** é urologista formado pelo **Instituto D'Or de Ensino e Pesquisa** em São Paulo, com atuação em São Paulo e Campinas. Cirurgião geral com título de TCBC (Titular do Colégio Brasileiro de Cirurgiões), atua com foco em:

- Urodinâmica e distúrbios miccionais
- Cirurgias minimamente invasivas
- Saúde prostática e rastreamento de câncer
- Cálculos renais
- Saúde sexual masculina

Seu atendimento é baseado nas diretrizes mais atualizadas das principais sociedades urológicas do mundo (EAU, AUA e SBU), com compromisso com a medicina baseada em evidências e o atendimento humanizado.

**CRM-SP 202291 | RQE 109018**

---

## Agende sua consulta

Se você mora em Campinas ou região e precisa de acompanhamento urológico, não espere os sintomas aparecerem. A prevenção é sempre o melhor caminho.

**Agende pelo Doctoralia** ou entre em contato pelo WhatsApp: **(11) 98112-4455**.

---

### Referências

1. EAU Guidelines on Prostate Cancer — European Association of Urology, 2025.
2. AUA/ASTRO/SUO Guideline on Clinically Localized Prostate Cancer, 2024.
3. Sociedade Brasileira de Urologia (SBU) — Pesquisa sobre saúde masculina, Novembro Azul 2025.
4. INCA — Estimativa 2023-2025: Incidência de Câncer no Brasil. Instituto Nacional de Câncer.
5. Campbell-Walsh-Wein Urology, 13th Edition. Elsevier, 2024.
6. IBGE — Tábua de Mortalidade 2023.
`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
