/**
 * Artigos dos temas apontados como lacuna na auditoria de SEO, em linguagem simples.
 * Base: diretrizes EAU 2026 (uroweb.org), diretrizes AUA publicadas no Journal of
 * Urology e documentos oficiais citados em cada texto.
 * Sem promessa de resultado (CFM 2.336/2023).
 */
import type { BlogPost } from "@/lib/blogData";

const author = {
  name: "Dr. Felipe de Bulhões",
  credentials: "CRM-SP 202291 | Urologista | TCBC",
  avatar: "/manus-storage/instagram_profile_bc867e99_9d4bb2af.webp",
};

const DATE = "10 de Novembro de 2026";
const cover = (slug: string) => `/manus-storage/blog-capa-${slug}.jpg`;

export const temaPosts: BlogPost[] = [
  {
    id: "17",
    slug: "ejaculacao-precoce-causas-e-tratamentos",
    title: "Ejaculação Precoce: O Que É, Por Que Acontece e Como Tratar",
    excerpt:
      "Ejaculação precoce é comum, não tem a ver com idade e tem tratamento. Entenda os tipos, como é a consulta e quais caminhos existem, explicado de forma simples.",
    coverImage: cover("ejaculacao-precoce-causas-e-tratamentos"),
    category: "Saúde Sexual",
    date: DATE,
    readTime: "6 min de leitura",
    author,
    content: `
Ejaculação precoce é quando o homem ejacula **mais rápido do que gostaria**, quase sempre logo no começo da relação, **sem conseguir controlar** — e isso incomoda ele ou o casal.

É uma das queixas sexuais mais comuns entre os homens. Diferente da dificuldade de ereção, ela **não aumenta com a idade**: pode aparecer em jovens e em homens mais velhos. Muitos nunca procuram ajuda por vergonha, mas é uma condição médica e **tem tratamento**.

---

## Existem tipos diferentes

| Tipo | O que significa |
|---|---|
| **Desde sempre** | Acontece desde as primeiras relações |
| **Que apareceu depois** | O homem tinha controle e, em algum momento, perdeu |
| **De vez em quando** | Acontece em algumas situações, não sempre. Costuma ser normal |
| **Só na percepção** | O homem acha que é rápido, mas o tempo está dentro do normal |

Quando a ejaculação precoce **aparece depois** de anos de controle, muitas vezes existe algo por trás: **dificuldade de ereção, inflamação na próstata, alterações da tireoide ou ansiedade**.

---

## Como é a consulta?

O diagnóstico é feito **na conversa e no exame físico**. Na maioria das vezes, **não precisa de exames de sangue**.

O urologista vai perguntar:

- Desde quando isso acontece
- Se acontece em todas as relações ou só em algumas
- Quanto você sente que consegue controlar
- Como isso afeta você e a parceria

Também é importante saber se há **dificuldade de ereção**. Às vezes, o medo de perder a ereção faz o homem "acelerar" sem perceber.

---

## Quais são os tratamentos?

O tratamento é escolhido **junto com você**, em etapas.

1. **Tratar o que estiver por trás**: se houver dificuldade de ereção ou inflamação na próstata, isso vem primeiro.
2. **Remédio usado só antes da relação**: existe um comprimido feito especialmente para isso.
3. **Spray anestésico** passado no pênis antes da relação, que diminui a sensibilidade.
4. **Remédios de uso diário**: alguns medicamentos da família dos antidepressivos também ajudam a retardar a ejaculação. São usados em doses e formas próprias para essa finalidade.
5. **Remédios para ereção**, quando ajudam no caso.
6. **Acompanhamento psicológico e exercícios de controle**, que funcionam melhor junto com o tratamento médico, principalmente quando o problema apareceu depois.

Procedimentos cirúrgicos para "diminuir a sensibilidade" **não são recomendados** pelas diretrizes atuais.

---

## Cuidados importantes

- **Não tome remédio por conta própria.** Alguns podem causar enjoo, tontura, sono ou diminuir a libido.
- O **spray** pode deixar a parceria com a região dormente. Por isso, use preservativo ou lave antes da relação.
- Remédios de uso diário **não devem ser interrompidos de repente** e podem não ser indicados para quem está tentando ter filhos.

Cada caso é diferente. O urologista vai explicar o que faz mais sentido para você.

---

## Quando procurar o urologista?

- Quando a ejaculação rápida acontece **na maior parte das relações**
- Quando você sente que **não tem controle**
- Quando isso está **afetando sua vida sexual ou o relacionamento**
- Quando o problema **apareceu de repente**, depois de anos sem dificuldade

A consulta é sigilosa e sem julgamentos. **Ejaculação precoce não é falha pessoal: é uma condição médica que tem tratamento.**

---

### Referências

1. EAU Guidelines on Sexual and Reproductive Health — Disorders of Ejaculation. European Association of Urology, 2026.
2. Shindel AW, Althof SE, Carrier S, et al. Disorders of Ejaculation: An AUA/SMSNA Guideline. J Urol. 2022;207(3):504-512. doi:10.1097/JU.0000000000002392
3. Salonia A, Bettocchi C, Boeri L, et al. European Association of Urology Guidelines on Sexual and Reproductive Health — 2021 Update: Male Sexual Dysfunction. Eur Urol. 2021;80(3):333-357. doi:10.1016/j.eururo.2021.06.007
`,
  },
  {
    id: "18",
    slug: "cancer-de-rim-sintomas-diagnostico-tratamento",
    title: "Câncer de Rim: Sintomas, Diagnóstico e Tratamento",
    excerpt:
      "Hoje, a maioria dos tumores de rim é descoberta por acaso, em exames feitos por outro motivo. Veja quem tem mais risco, como é o diagnóstico e quando dá para preservar o rim.",
    coverImage: cover("cancer-de-rim-sintomas-diagnostico-tratamento"),
    category: "Uro-oncologia",
    date: DATE,
    readTime: "7 min de leitura",
    author,
    content: `
O câncer de rim é um tumor que nasce no próprio rim. Ele é cerca de **duas vezes mais comum em homens** do que em mulheres e aparece com mais frequência a partir da meia-idade.

Uma mudança importante dos últimos anos: segundo a European Association of Urology (EAU), **cerca de 6 em cada 10 casos são descobertos por acaso**, em um ultrassom ou uma tomografia pedidos por outro motivo. Isso é bom, porque muitas vezes o tumor é encontrado ainda pequeno.

---

## Quais são os sintomas?

No começo, o câncer de rim **quase nunca dá sintomas**. Por isso, alguns sinais merecem atenção:

- **Sangue na urina**, mesmo que tenha acontecido uma única vez
- **Dor nas costas, de um lado só**, que não passa e não tem explicação
- **Um caroço** que dá para sentir na barriga
- **Veias dilatadas no saco escrotal** que aparecem na vida adulta e não diminuem quando você deita
- **Perda de peso, febre ou cansaço** sem motivo

Esses sinais também podem ter outras causas, mas devem ser avaliados.

---

## Quem tem mais risco?

| Fator | Por que importa |
|---|---|
| **Cigarro** | Cerca de metade das pessoas com câncer de rim fuma ou já fumou |
| **Excesso de peso** | O risco aumenta com a obesidade |
| **Pressão alta** | Está ligada a maior risco |
| **Doença renal em diálise** | O risco é bem maior ao longo da vida |
| **Família** | Pai, mãe ou irmão com câncer de rim dobra o risco |

Uma pequena parte dos casos é **hereditária**. Quem tem o tumor antes dos 46 anos, nos dois rins ou com casos na família pode precisar de **avaliação genética**.

---

## Como é feito o diagnóstico?

- **Tomografia com contraste**: é o principal exame. Mostra o tumor e se ele se espalhou.
- **Ressonância magnética ou ultrassom com contraste**: usados quando a tomografia não basta ou quando o contraste comum não pode ser usado.
- **Biópsia**: em alguns casos, retirar um pedacinho do tumor com uma agulha ajuda a decidir o tratamento.

Vale saber: **nem todo nódulo no rim é câncer**. Muitos cistos são simples e só precisam de acompanhamento.

---

## Como é o tratamento?

O tratamento depende do tamanho do tumor, da idade, da saúde do rim e de outras doenças. A decisão é tomada **junto com você**.

### Tumores pequenos
Sempre que possível, a cirurgia retira **só o tumor e preserva o resto do rim** (nefrectomia parcial). Isso protege a função dos rins no futuro.

### Tumores maiores
Quando não dá para preservar, retira-se o rim inteiro. Hoje isso costuma ser feito por **videolaparoscopia ou cirurgia robótica**, com cortes pequenos e recuperação mais rápida do que a cirurgia aberta.

### Acompanhar em vez de operar
Para **tumores muito pequenos** (menores de 4 cm), principalmente em pessoas mais velhas ou com outras doenças, pode ser possível **acompanhar com exames periódicos**, tratando só se o tumor crescer.

### Outras opções
- **Destruir o tumor com calor ou frio** (ablação), por agulha, em quem não pode operar
- **Tratamento complementar** depois da cirurgia, para casos com mais chance de voltar

**Parar de fumar** ajuda em todas as fases.

---

## Quando procurar o urologista?

Procure avaliação se tiver **sangue na urina**, **dor nas costas que não passa** ou se algum exame mostrou **nódulo ou cisto no rim**. A maioria desses achados não é grave, mas só a avaliação especializada diz se é preciso acompanhar, investigar ou tratar.

---

### Referências

1. EAU Guidelines on Renal Cell Carcinoma. European Association of Urology, 2026.
2. Campbell SC, Clark PE, Chang SS, et al. Renal Mass and Localized Renal Cancer: Evaluation, Management, and Follow-Up: AUA Guideline: Part I. J Urol. 2021;206(2):199-208. doi:10.1097/JU.0000000000001911
3. Campbell SC, Uzzo RG, Karam JA, et al. Renal Mass and Localized Renal Cancer: Evaluation, Management, and Follow-up: AUA Guideline: Part II. J Urol. 2021;206(2):209-218. doi:10.1097/JU.0000000000001912
`,
  },
  {
    id: "19",
    slug: "cancer-de-testiculo-sinais-e-autoexame",
    title: "Câncer de Testículo: Sinais de Alerta, Diagnóstico e Tratamento",
    excerpt:
      "O câncer de testículo é mais comum em homens jovens e, quando tratado da forma certa, tem chance de cura muito alta. Saiba o que observar e o que fazer.",
    coverImage: cover("cancer-de-testiculo-sinais-e-autoexame"),
    category: "Uro-oncologia",
    date: DATE,
    readTime: "6 min de leitura",
    author,
    content: `
O câncer de testículo não é comum na população em geral, mas é um dos tumores **mais frequentes em homens jovens**, principalmente entre os 20 e os 40 anos.

A notícia mais importante: com diagnóstico e tratamento corretos, **mais de 95% dos homens ficam bem a longo prazo**, segundo a European Association of Urology (EAU). Por isso, perceber cedo faz diferença.

---

## Quais são os sinais de alerta?

- **Um caroço no testículo**, que geralmente **não dói**
- **Um testículo que ficou maior ou mais duro**
- **Sensação de peso** no saco escrotal
- Às vezes, dor no saco, na barriga ou nas costas
- Mais raramente, **aumento das mamas**

Como o caroço quase nunca dói, muitos homens deixam para depois. **Qualquer mudança no testículo deve ser avaliada logo por um urologista.** Na maioria das vezes não é câncer, mas só o exame permite saber.

---

## Quem tem mais risco?

| Situação | O que fazer |
|---|---|
| **Testículo que não desceu na infância** (mesmo que já operado) | Conversar com o urologista sobre acompanhamento |
| **Pai ou irmão que teve câncer de testículo** | Ficar atento a qualquer mudança |
| **Já teve câncer no outro testículo** | Fazer acompanhamento regular |
| **Problemas de fertilidade** | Avaliação completa com urologista |

---

## Conheça o seu corpo

Não existe um exame de rotina para toda a população. Mesmo assim, **conhecer como são seus testículos** — tamanho, formato, consistência — ajuda a notar mudanças cedo. O banho é um bom momento para isso.

---

## Como é feito o diagnóstico?

1. **Exame físico** pelo urologista
2. **Ultrassom do saco escrotal**: rápido, sem dor e sem radiação
3. **Exames de sangue** que ajudam a identificar o tipo do tumor
4. **Cirurgia para retirar o testículo afetado**, feita por um corte na virilha. Ela confirma o diagnóstico e já é o primeiro tratamento
5. **Tomografia** para ver se o tumor se espalhou

---

## E a fertilidade?

O câncer de testículo e o tratamento podem diminuir a produção de espermatozoides. Por isso, **antes de começar o tratamento, todo homem deve ser orientado sobre congelar o sêmen**. É simples e é a forma mais segura de preservar a chance de ter filhos.

Com um testículo só, a maioria dos homens **continua produzindo hormônio e espermatozoides** normalmente. Se quiser, é possível colocar uma **prótese** no lugar do testículo retirado.

---

## E depois da cirurgia?

Dependendo do tipo e da fase do tumor, o próximo passo pode ser:

- **Acompanhar com exames**, sem outro tratamento
- **Quimioterapia** ou **radioterapia**
- Em alguns casos, outra cirurgia

O acompanhamento dura alguns anos e inclui exames de sangue e de imagem.

---

## Quando procurar o urologista?

**Assim que perceber** um caroço, inchaço, endurecimento ou sensação de peso no testículo. Não espere passar.

---

### Referências

1. EAU Guidelines on Testicular Cancer. European Association of Urology, 2026.
2. Stephenson A, Bass EB, Bixler BR, et al. Diagnosis and Treatment of Early-Stage Testicular Cancer: AUA Guideline Amendment 2023. J Urol. 2024;211(1):20-25. doi:10.1097/JU.0000000000003694
3. Stephenson A, Eggener SE, Bass EB, et al. Diagnosis and Treatment of Early Stage Testicular Cancer: AUA Guideline. J Urol. 2019;202(2):272-281. doi:10.1097/JU.0000000000000318
`,
  },
  {
    id: "20",
    slug: "fimose-em-adultos-e-criancas-tratamento",
    title: "Fimose em Crianças e Adultos: Quando É Normal e Quando Tratar",
    excerpt:
      "Nem toda fimose precisa de cirurgia. Entenda quando ela é normal na criança, quando a pomada resolve e quando a cirurgia é indicada, em linguagem simples.",
    coverImage: cover("fimose-em-adultos-e-criancas-tratamento"),
    category: "Andrologia",
    date: DATE,
    readTime: "6 min de leitura",
    author,
    content: `
Fimose é quando **a pele que cobre a cabeça do pênis** (o prepúcio) **não consegue ser puxada para trás**, ou só vai com dificuldade.

É uma das dúvidas mais comuns no consultório, de pais e de homens adultos. O mais importante para saber: **nem toda fimose é doença**, e muitas não precisam de cirurgia.

---

## Na criança, quase sempre é normal

Quase todo menino nasce com a pele grudada na cabeça do pênis. Isso é **normal** e vai se soltando sozinho com o crescimento. Segundo a European Association of Urology (EAU):

| Idade | Quantos meninos já conseguem puxar a pele |
|---|---|
| **Ao nascer** | Cerca de 4 em cada 100 |
| **Com 1 ano** | Cerca de metade |
| **Com 3 anos** | Cerca de 9 em cada 10 |
| **Na adolescência** | A fimose continua em cerca de 1 em cada 100 |

**Não force a pele para trás.** Forçar pode machucar e criar cicatrizes, e aí sim a fimose vira um problema.

A pele "encher como um balão" na hora de fazer xixi, **sozinha, não é motivo para cirurgia**.

---

## Quando a fimose precisa de tratamento?

- **Inflamações ou infecções que voltam** na cabeça do pênis
- **Infecção urinária** em crianças com outros problemas no sistema urinário
- **Dificuldade para fazer xixi** ou jato muito fino
- **Dor ou dificuldade nas relações sexuais**, em jovens e adultos
- Pele **esbranquiçada, endurecida ou com rachaduras**
- Fimose que **não melhora com a pomada**

---

## A pomada resolve na maioria das vezes

O primeiro tratamento é uma **pomada de corticoide**, passada na pele **duas vezes por dia, por 4 a 8 semanas**, puxando a pele com cuidado. Segundo a EAU, **funciona em mais de 8 de cada 10 casos**.

Depois, é importante **continuar a higiene** puxando a pele com delicadeza, para a fimose não voltar.

---

## Quando a cirurgia é indicada?

A **cirurgia de fimose** (postectomia ou circuncisão) é indicada quando:

- A pomada **não resolveu**
- As **inflamações voltam** com frequência
- Existe **líquen escleroso**, uma doença da pele que endurece o prepúcio
- O paciente ou a família **preferem**, depois de bem orientados

Em meninos com outras alterações no pênis, a cirurgia deve ser planejada por um especialista, porque a pele pode ser necessária para outras correções.

---

## No adulto, fique atento

No adulto, a fimose que **aparece ou piora com o tempo** precisa de avaliação. Duas causas comuns:

- **Líquen escleroso**: deixa a pele esbranquiçada, dura e com rachaduras
- **Diabetes descontrolado**: facilita inflamações e infecções

A dificuldade de higiene por muitos anos também está ligada a maior risco de **câncer de pênis**. Mais um motivo para não adiar.

---

## Parafimose: procure atendimento na hora

Parafimose é quando a pele **é puxada para trás e não volta**, apertando a cabeça do pênis, que incha e dói. **É uma urgência.** Procure um pronto atendimento imediatamente.

---

## Quando procurar o urologista?

Se houver **inflamações que voltam, dor, dificuldade para fazer xixi, sangramento, manchas brancas na pele** ou **dificuldade nas relações**. Em crianças, a consulta evita tanto cirurgias desnecessárias quanto o atraso quando o tratamento é realmente preciso.

---

### Referências

1. EAU Guidelines on Paediatric Urology — Phimosis and Other Abnormalities of the Penile Skin. European Association of Urology, 2026.
2. EAU Guidelines on Penile Cancer. European Association of Urology, 2026.
3. King Chien Joe L, et al. Current methods of circumcision: choosing the right technique for the right patient. Curr Opin Urol. 2026;36(6):623-629. doi:10.1097/MOU.0000000000001435
`,
  },
  {
    id: "21",
    slug: "prostatite-aguda-cronica-dor-pelvica",
    title: "Prostatite: Inflamação da Próstata e Dor Pélvica Crônica",
    excerpt:
      "Prostatite não é uma doença só. Entenda a diferença entre a infecção aguda, a infecção que volta e a dor pélvica crônica, e por que o tratamento costuma combinar várias abordagens.",
    coverImage: cover("prostatite-aguda-cronica-dor-pelvica"),
    category: "Próstata",
    date: DATE,
    readTime: "7 min de leitura",
    author,
    content: `
Prostatite é o nome dado a problemas que causam **inflamação ou dor ligada à próstata** — a glândula que fica logo abaixo da bexiga, no homem.

Ela pode acontecer em **qualquer idade adulta**, inclusive em jovens. Saber qual é o tipo é o primeiro passo para tratar do jeito certo.

---

## Os tipos de prostatite

| Tipo | Como é |
|---|---|
| **Infecção aguda** | Começa de repente, com febre e dor ao urinar |
| **Infecção que volta** | Infecções que se repetem, com bactéria encontrada nos exames |
| **Dor pélvica crônica** | Dor por mais de 3 meses, **sem infecção** |
| **Sem sintomas** | Inflamação vista só em exames |

O tipo **mais comum é a dor pélvica crônica**. Por isso, a European Association of Urology (EAU) prefere chamá-la de **síndrome da dor prostática**, já que muitas vezes não há infecção.

---

## Infecção aguda da próstata

### Sintomas
- **Febre e calafrios**
- **Dor** entre o saco e o ânus, no pé da barriga ou ao urinar
- **Vontade de urinar toda hora** e dificuldade para esvaziar a bexiga
- Às vezes, **não conseguir urinar**

### O que fazer
Procure atendimento **no mesmo dia**. O diagnóstico é feito com **exame de urina, cultura de urina e exames de sangue**. O tratamento é com **antibiótico por 2 a 4 semanas**, às vezes começando pela veia.

---

## Infecção que volta

Os sintomas duram **3 meses ou mais**: dor entre o saco e o ânus, no pênis, nos testículos ou na virilha, junto com incômodo para urinar. As infecções podem ir e voltar.

- O diagnóstico usa **exames de urina colhidos antes e depois de uma massagem da próstata** feita pelo médico
- O tratamento é com **antibiótico por 4 a 6 semanas**, escolhido de acordo com a bactéria
- O exame de **PSA não serve** para diagnosticar prostatite

---

## Dor pélvica crônica

É a forma mais comum e, às vezes, a mais difícil para o paciente, porque **antibiótico sozinho não resolve**. A dor é real e pode envolver os **músculos da pelve**, os **nervos**, a **bexiga** e também o **estresse e a ansiedade**.

Por isso, o tratamento costuma **combinar várias abordagens**, de acordo com os sintomas de cada pessoa:

| Abordagem | Como ajuda |
|---|---|
| **Remédios que relaxam a próstata e a bexiga** | Melhoram a dor e o jato de urina, principalmente no início |
| **Antibiótico** | Só em casos selecionados, de forma planejada |
| **Anti-inflamatórios** | Aliviam a dor, com cuidado no uso prolongado |
| **Fisioterapia pélvica** | Relaxa e reeduca os músculos da pelve |
| **Acupuntura** | Pode melhorar a dor e a qualidade de vida |
| **Apoio psicológico** | Ajuda a lidar com a dor e o estresse que ela causa |

O objetivo é **diminuir a dor e melhorar o dia a dia**, com retornos para ajustar o tratamento.

---

## Quando procurar atendimento?

- **Febre com dor ou dificuldade para urinar**: procure atendimento no mesmo dia
- **Dor na pelve, entre o saco e o ânus ou nos testículos por semanas**: agende consulta com urologista
- **Infecções urinárias que se repetem**: no homem, sempre merecem investigação

---

### Referências

1. EAU Guidelines on Urological Infections — Bacterial Prostatitis. European Association of Urology, 2026.
2. EAU Guidelines on Chronic Pelvic Pain — Primary Prostate Pain Syndrome. European Association of Urology, 2026.
`,
  },
  {
    id: "22",
    slug: "estenose-de-uretra-sintomas-tratamento",
    title: "Estenose de Uretra: Quando o Canal da Urina Fica Estreito",
    excerpt:
      "Jato de urina fraco nem sempre é próstata. Entenda o que é o estreitamento da uretra, por que ele acontece e quando a cirurgia de reconstrução é o melhor caminho.",
    coverImage: cover("estenose-de-uretra-sintomas-tratamento"),
    category: "Tratamentos",
    date: DATE,
    readTime: "6 min de leitura",
    author,
    content: `
A **uretra** é o canal que leva a urina da bexiga para fora do corpo. **Estenose de uretra** é quando esse canal **fica estreito** por causa de uma cicatriz na parede dele.

Pode acontecer em homens de qualquer idade. Como os sintomas parecem com os da próstata aumentada, muitas vezes o diagnóstico demora.

---

## Por que a uretra fica estreita?

- **Procedimentos anteriores**: uso de sonda, exames com câmera, cirurgias da próstata ou radioterapia
- **Pancadas** na região entre o saco e o ânus (como cair "de cavalinho" em uma barra) ou fraturas da bacia
- **Infecções**, como as transmitidas pelo sexo
- **Líquen escleroso**, uma doença da pele dos genitais
- Em parte dos casos, **não se descobre a causa**

---

## Sintomas

- **Jato de urina fraco**, fino ou que espirra para os lados
- **Sensação de que a bexiga não esvaziou**
- **Gotejar** depois de urinar
- **Vontade de urinar toda hora**
- **Ardência e infecções urinárias**
- Em casos avançados, **não conseguir urinar** — isso é urgência

---

## Como é feito o diagnóstico?

| Exame | Para que serve |
|---|---|
| **Fluxo urinário** | Você urina em um aparelho que mede a força do jato |
| **Ultrassom após urinar** | Mostra quanto de urina sobrou na bexiga |
| **Raio-X com contraste da uretra** | Mostra onde está o estreitamento e o tamanho dele |
| **Exame com câmera fina** | Permite ver o estreitamento por dentro |

Saber **onde fica e qual o tamanho** do estreitamento é essencial para escolher o tratamento.

---

## Como é o tratamento?

### Dilatação ou corte por dentro
São procedimentos mais simples, feitos pelo próprio canal. Funcionam melhor em **estreitamentos curtos** que **nunca foram tratados**. O problema é que **o estreitamento costuma voltar**, muitas vezes no primeiro ano.

Por isso, a European Association of Urology (EAU) orienta a **não repetir esses procedimentos mais de duas vezes** quando a cirurgia de reconstrução é possível. Repetir demais pode deixar o estreitamento mais longo e difícil de corrigir.

### Uretroplastia: a reconstrução
A **uretroplastia** é a cirurgia que **reconstrói a uretra**. Dependendo do caso, o trecho estreito é retirado e as pontas são unidas, ou a uretra é ampliada com um **enxerto tirado da parte de dentro da bochecha**. Nos estudos analisados pela EAU, a maior parte dos pacientes fica com o canal aberto depois da cirurgia.

### Outras opções
- **Balão com remédio**, para alguns estreitamentos curtos que voltaram, em quem não pode fazer a cirurgia
- **Dilatação feita pelo próprio paciente** em casa, quando a cirurgia não é uma opção

---

## Quando procurar o urologista?

Se o **jato de urina enfraqueceu**, se você **precisa fazer força para urinar** ou tem **infecções que se repetem** — principalmente se já usou sonda, fez cirurgia urológica ou sofreu pancada na região. **Se não conseguir urinar, procure um pronto atendimento.**

---

### Referências

1. EAU Guidelines on Urethral Strictures. European Association of Urology, 2026.
`,
  },
  {
    id: "23",
    slug: "bexiga-hiperativa-urgencia-urinaria-tratamento",
    title: "Bexiga Hiperativa: Vontade Urgente de Urinar Tem Tratamento",
    excerpt:
      "Vontade forte e repentina de urinar, idas frequentes ao banheiro e acordar à noite para fazer xixi podem ser bexiga hiperativa. Veja como tratar, passo a passo.",
    coverImage: cover("bexiga-hiperativa-urgencia-urinaria-tratamento"),
    category: "Tratamentos",
    date: DATE,
    readTime: "6 min de leitura",
    author,
    content: `
Bexiga hiperativa é quando dá uma **vontade forte e repentina de urinar, difícil de segurar**. Normalmente vem junto com **ir ao banheiro muitas vezes** durante o dia e **acordar à noite para fazer xixi**. Às vezes, a pessoa perde urina antes de chegar ao banheiro.

Acontece em **homens e mulheres** e fica mais comum com a idade. Muita gente acha que é "normal da idade" e não procura ajuda, mas **tem tratamento**, e ele é feito em etapas.

---

## Como é a avaliação?

- **Conversa** sobre os sintomas e sobre os **remédios que você usa**, porque alguns pioram a bexiga
- **Exame físico**
- **Exame de urina**, para descartar infecção ou sangue
- **Diário da bexiga**: por pelo menos 3 dias, você anota a que horas urinou, quanto urinou e quanto bebeu
- **Ultrassom** para ver se a bexiga esvazia bem, quando necessário

No homem, também é importante avaliar a **próstata**, porque o aumento dela pode causar ou piorar esses sintomas.

---

## O tratamento, passo a passo

Segundo as diretrizes da AUA/SUFU e da European Association of Urology (EAU), começa-se pelo mais simples.

### 1. Mudanças no dia a dia
- **Diminuir café, chá preto, refrigerante de cola e energético**
- **Organizar a quantidade de líquido** ao longo do dia, sem deixar de se hidratar
- **Perder peso**, se houver excesso
- **Parar de fumar**
- **Treinar a bexiga**: aumentar aos poucos o tempo entre as idas ao banheiro
- **Fisioterapia pélvica**, para fortalecer e controlar os músculos da pelve

### 2. Remédios
- Existem **dois grupos principais de remédios** que acalmam a bexiga
- Um deles pode dar **boca seca e intestino preso** e deve ser usado com **cuidado em idosos**, principalmente com problemas de memória
- O outro age de forma diferente e costuma ter menos desses efeitos

### 3. Quando os remédios não bastam
- **Estímulo elétrico leve** em um nervo perto do tornozelo, em sessões semanais
- **Aplicação de toxina botulínica na bexiga**, que tem efeito temporário e pode exigir o uso de sonda por algum tempo em parte dos pacientes
- **Marcapasso da bexiga** (neuromodulação sacral), um pequeno aparelho implantado que regula os nervos da bexiga

---

## No homem, a próstata também conta

No homem, a urgência para urinar muitas vezes aparece junto com o **aumento da próstata**. O tratamento pode envolver remédio para a próstata, para a bexiga ou os dois, conforme a avaliação.

---

## Quando procurar o urologista?

- Quando a vontade urgente de urinar **atrapalha sua rotina**
- Quando você **acorda mais de uma vez por noite** para urinar
- Quando há **perda de urina**

Procure **antes** se tiver **sangue na urina, dor, febre ou dificuldade para esvaziar a bexiga**.

---

### Referências

1. Cameron AP, Chung DE, Dielubanza EJ, et al. The AUA/SUFU Guideline on the Diagnosis and Treatment of Idiopathic Overactive Bladder. J Urol. 2024;212(1):11-20. doi:10.1097/JU.0000000000003985
2. EAU Guidelines on Non-neurogenic Female LUTS — Disease Management. European Association of Urology, 2026.
3. EAU Guidelines on Management of Non-neurogenic Male LUTS. European Association of Urology, 2026.
`,
  },
  {
    id: "24",
    slug: "ists-e-hpv-no-homem-prevencao-e-tratamento",
    title: "ISTs e HPV no Homem: Sintomas, Prevenção e Tratamento",
    excerpt:
      "Muitas infecções sexualmente transmissíveis no homem não dão sintomas. Saiba quando desconfiar, como é o diagnóstico, o que fazer com verrugas genitais e quem pode tomar a vacina do HPV pelo SUS.",
    coverImage: cover("ists-e-hpv-no-homem-prevencao-e-tratamento"),
    category: "Saúde Sexual",
    date: DATE,
    readTime: "7 min de leitura",
    author,
    content: `
ISTs são as **infecções sexualmente transmissíveis**, que passam de uma pessoa para outra pelo sexo. Elas são comuns e, no homem, **muitas vezes não dão nenhum sintoma** — por isso passam adiante sem a pessoa saber.

O urologista é um dos médicos que cuidam dessas infecções, com **diagnóstico sigiloso**, tratamento e orientação para a parceria.

---

## Uretrite: a infecção no canal da urina

Uretrite é a **inflamação da uretra**, o canal por onde sai a urina. Na maioria das vezes é causada por ISTs como **gonorreia** e **clamídia**.

### Sinais de alerta
- **Secreção** saindo pelo pênis (clara, amarelada ou esverdeada)
- **Ardência ou dor para urinar**
- **Coceira** na ponta do pênis
- Às vezes, **dor nos testículos**

### Como é o diagnóstico
Geralmente com um **exame de urina específico**, de preferência com a primeira urina da manhã, que identifica qual microrganismo está causando a infecção. Isso ajuda a escolher o antibiótico certo.

### Como é o tratamento
Com **antibiótico escolhido pelo médico**. **Não tome antibiótico por conta própria**: o tratamento errado ou incompleto deixa as bactérias mais resistentes, e a gonorreia já é um grande desafio nesse ponto.

Pontos importantes:
- **A parceria também precisa ser avaliada e tratada**, com sigilo
- **Evite relações** por pelo menos 7 dias depois de terminar o tratamento
- **Faça os testes de HIV, sífilis e hepatites** no mesmo momento
- **Volte ao médico** se os sintomas continuarem

---

## HPV no homem

O **HPV** é a IST mais comum. Na maioria das vezes, **o próprio corpo elimina o vírus** sem a pessoa perceber. Mas alguns tipos causam **verrugas genitais**, e outros estão ligados a alguns **tipos de câncer**, como de pênis, ânus e garganta.

### Verrugas genitais
São **pequenas elevações na pele**, da cor da pele ou mais escuras, no pênis, no saco escrotal, na virilha ou em volta do ânus. Podem ser tratadas com **pomadas, aplicação de produtos no consultório, congelamento ou retirada**, de acordo com o tamanho e o lugar.

O tratamento tira as verrugas, mas **elas podem voltar**, porque o vírus pode continuar no corpo. Por isso, o acompanhamento é importante.

### A vacina protege
Estudos mostraram que a vacina **protege os homens** contra as verrugas e as lesões causadas pelos tipos de HPV que ela cobre. No **SUS**:

- **Meninos e meninas de 9 a 14 anos** tomam a vacina em **dose única**
- Algumas pessoas têm direito em idade maior, como **pessoas que vivem com HIV** e **transplantados**
- Em 2025, houve uma ampliação temporária para jovens de 15 a 19 anos que não tinham se vacinado. **Confira no posto de saúde as regras atuais**

Fora dessas situações, a vacina pode ser conversada com o médico e aplicada na rede particular.

---

## Como se proteger

- **Use preservativo** em todas as relações
- **Faça testes regularmente** para HIV, sífilis e hepatites, se tiver relações sem preservativo ou mais de uma parceria
- **PrEP e PEP**: remédios que previnem o HIV antes ou logo depois de uma exposição de risco, disponíveis no SUS
- **Vacine-se** contra HPV e hepatite B
- **Trate a parceria** sempre que houver diagnóstico

---

## Quando procurar o urologista?

Se aparecer **secreção, ardência para urinar, feridas, verrugas ou dor nos testículos**, ou se você teve uma **relação de risco**. A consulta é sigilosa e sem julgamentos. Tratar cedo protege você e quem está com você.

---

### Referências

1. EAU Guidelines on Urological Infections — Urethritis. European Association of Urology, 2026.
2. Workowski KA, Bachmann LH, Chan PA, et al. Sexually Transmitted Infections Treatment Guidelines, 2021. MMWR Recomm Rep. 2021;70(4):1-187. doi:10.15585/mmwr.rr7004a1
3. Giuliano AR, Palefsky JM, Goldstone S, et al. Efficacy of quadrivalent HPV vaccine against HPV infection and disease in males. N Engl J Med. 2011;364(5):401-411. doi:10.1056/NEJMoa0909537
4. Goldstone SE, Giuliano AR, Palefsky JM, et al. Efficacy, immunogenicity, and safety of a quadrivalent HPV vaccine in men: long-term extension of a randomised, placebo-controlled, phase 3 trial. Lancet Infect Dis. 2022;22(3):413-425. doi:10.1016/S1473-3099(21)00327-3
5. Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis (PCDT-IST). Brasília, 2022.
6. Ministério da Saúde. Nota técnica sobre a vacinação contra HPV em dose única. 2024.
`,
  },
];
