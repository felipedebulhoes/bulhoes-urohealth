# Auditoria GEO: felipebulhoes.com

**Data:** 9 de novembro de 2026
**Tipo de negócio:** serviço local de saúde (urologia, São Paulo e Campinas)
**Nota GEO: 44/100**

As notas são julgamento qualitativo com os pesos do método, não métricas medidas.

| Categoria | Peso | Nota | Pontos |
|---|---:|---:|---:|
| Citabilidade e visibilidade em IA | 25% | 39/100 | 9,8 |
| Autoridade de marca | 20% | 28/100 | 5,6 |
| Conteúdo e E-E-A-T | 20% | 64/100 | 12,8 |
| Fundamentos técnicos | 15% | 58/100 | 8,7 |
| Dados estruturados | 10% | 47/100 | 4,7 |
| Otimização por plataforma | 10% | 27/100 | 2,7 |
| **Total** | | | **44** |

## Conclusão

O conteúdo clínico é bom, mas quase nenhum robô de IA consegue lê-lo. O HTML entregue tem no corpo apenas "Preparando sua experiência"; o texto só aparece depois que o JavaScript roda. Isso vale para as URLs amostradas de todos os tipos.

Há um segundo problema, independente de SEO: textos e dados estruturados que precisam de revisão pela Resolução CFM 2.336/2023 e pelas regras do Google.

## Search Console (11/08 a 08/11/2026)

- 129 cliques, 17.567 impressões, CTR 0,73%, posição média 11,8.
- A posição média diária ficou perto de 10 em agosto e setembro e perto de 18 de 13/10 a 08/11. A causa não foi identificada; a mudança na média pode refletir também o tipo de consulta exibida.
- A home concentra 56 dos 129 cliques (posição 2,8). A consulta líder é o próprio nome ("felipe de bulhoes ojeda", 16 cliques).
- Páginas com muita impressão e pouco clique: /consultorios (3.437 impressões, 11 cliques), /local/campinas-day-hospital (1.943; 10), /educativo/litotripsia-laser (1.703; 9), /educativo/vasectomia (1.618; 5, posição 24,7).
- Das 10 URLs inspecionadas, 8 estão indexadas. **/blog/pedra-no-rim-o-que-fazer e /guia-glp1 são desconhecidas do Google**, embora respondam 200 e estejam no sitemap.
- /local/clinovi-moema e /local/clinovi-sbc ainda recebem impressões, embora esses consultórios não estejam na lista oficial.
- A propriedade de domínio `sc-domain:felipebulhoes.com` aparece como não verificada.

## Prioridade 1: conformidade (independe de ranking)

Conferido no código. A decisão clínica e jurídica é do Dr. Felipe de Bulhões.

**Respostas do Dr. Felipe de Bulhões (09/11/2026):** os números vêm de estudos; os superlativos sobre vasectomia ficam; as 35 avaliações e os pacientes verificados são reais; só a data das avaliações está errada. Os itens da tabela seguem listados como ponto de atenção, exceto "Paciente Verificado", que saiu.

| Onde | Texto ou dado | Problema |
|---|---|---|
| `client/src/pages/PreenchimentoPeniano.tsx:1414` | "+1,5 a 2,5 cm" | Resultado numérico em destaque, sem estudo citado no card |
| `PreenchimentoPeniano.tsx:1424` | "0% de DE" | Número absoluto em destaque |
| `PreenchimentoPeniano.tsx:523` | "100% Reversível" | Absoluto |
| `PreenchimentoPeniano.tsx:99` | "Reconhecido em publicações da AUA, EAU e SMSNA..." | Sugere aval das sociedades; posicionamento formal não localizado |
| `client/src/pages/VasectomiaSemBisturi.tsx:25` | "preservação absoluta" | Absoluto |
| `VasectomiaSemBisturi.tsx:39` | "O método contraceptivo mais seguro da medicina" | Superlativo |
| `VasectomiaSemBisturi.tsx:109-111` | "0% Alteração", "100% preservados" | Absoluto; a página não trata de falha nem de dor crônica (`Vasectomia.tsx` trata de falha) |
| `VasectomiaSemBisturi.tsx:182` | "Rápido, seguro e indolor" | Promessa sobre a experiência |
| `client/src/pages/DoencaPeyronie.tsx:263` | "Altíssima satisfação", "Solução definitiva" | Superlativo |
| `client/src/pages/SobreDrFelipe.tsx:44`, `client/src/components/HeroSection.tsx:68` | "especialista em cirurgia robótica" | Os RQEs registrados são Urologia e Cirurgia Geral; usar "atua em" |
| `client/src/components/TestimonialsSection.tsx:216` | `datePublished` 2026-03-01 em todas as avaliações | Os depoimentos exibem abril a julho: dado incorreto |
| `client/index.html:184,246`, `TestimonialsSection.tsx:202` | `aggregateRating` 5,0 / 35 | Nota do perfil médico na Doctoralia repetida como nota das clínicas; o Google não aceita agregar avaliações de outros sites |

**Ação:** corrigir as datas das avaliações; retirar `aggregateRating` e `review` do JSON-LD (as avaliações são reais, mas a regra do Google trata da origem delas) e mantê-las visíveis na página; citar o estudo junto de cada número; trocar "especialista em cirurgia robótica" por "atua em".

### Fontes pesquisadas no PubMed (09/11/2026)

| Afirmação no site | O que os estudos mostram | Situação |
|---|---|---|
| +1,5 a 2,5 cm | Média 1,7 cm no corpo e 1,5 cm na glande, n=132 ([Boiko 2023](https://doi.org/10.1093/asj/sjad152)); 2,27 cm com AH em 24 semanas, ensaio randomizado ([Ahn 2021](https://doi.org/10.5534/wjmh.210007)) | Sustentada; citada na página |
| 12 a 18 meses | Mantido até 48 semanas ([Park 2026](https://doi.org/10.5534/wjmh.250332)) e 18 meses ([Kwak 2010](https://doi.org/10.1111/j.1743-6109.2010.01748.x)) | Sustentada; citada na página |
| 0% de DE | Os resumos relatam ausência de evento adverso grave, não taxa zero de DE; complicações podem ser subnotificadas ([Baird 2021](https://doi.org/10.1016/j.esxm.2021.100445)) | Reescrita: "Sem eventos adversos graves nos estudos" |
| 100% Reversível | Hialuronidase reverte AH residual em série de 4 casos ([Moon 2025](https://doi.org/10.1038/s41443-025-01182-8)) | Reescrita: "Reversível com hialuronidase" |
| Reconhecido por AUA, EAU e SMSNA | Revisões relatam ausência de diretriz definida ([Salloum 2021](https://doi.org/10.1097/DSS.0000000000002816); [Schifano 2023](https://doi.org/10.3390/gels9020118)) | Reescrita: "Descrito em publicações científicas" |
| Vasectomia: 0% de alteração na testosterona e ereção | Função sexual preservada; hormônios podem cair por pouco tempo e normalizar; um estudo achou diferença na testosterona total, sem aumento de hipogonadismo tardio ([Yang 2021](https://doi.org/10.5534/wjmh.200073)) | Reescrita: "Sem alteração na função sexual", com a ressalva da testosterona |
| Riscos de vasectomia na página de serviço | Dor crônica em 1 a 15%; afeta a qualidade de vida em 1 a 2% (Yang 2021) | Ausente na página |

## Prioridade 2: fazer o conteúdo existir para robôs

1. **Pré-renderizar as 59 URLs do sitemap** (1 a 2 dias). Script pós-build com navegador headless, percorrendo `shared/siteRoutes.ts` e salvando o conteúdo por rota; o catch-all de `server/production.ts` serve esse HTML, e os 301 continuam rodando antes. Levar junto H1, links internos e o JSON-LD específico de cada página (hoje MedicalWebPage, FAQ e Breadcrumb só existem após JS).
2. **Publicar `llms.txt`** (1 h). Proposta no anexo.
3. **Inspecionar e solicitar indexação** de /blog/pedra-no-rim-o-que-fazer e /guia-glp1, e varrer as demais URLs do sitemap.
4. **Bing Webmaster e IndexNow** (1 a 2 h). Não há sinal de nenhum dos dois, mas uma validação por DNS não seria visível nesta auditoria.
5. **Tela de abertura** (`SplashScreen.tsx`): pode cobrir a página por até 3,1 s na primeira visita. Mostrar o conteúdo primeiro ou remover, e medir.

## Prioridade 3: identidade e dados coerentes

1. **Endereços (confirmado pelo Dr. Felipe de Bulhões).** Trocar Av. Ibirapuera (`client/index.html:137`) por Clinovi Paulista e Clinovi Pinheiros; retirar Av. Pereira Barreto (`TestimonialsSection.tsx:195`) e incluir CEMED. Não atua mais em Moema nem em São Bernardo: retirar da Doctoralia e do Perfil da Empresa no Google. Hospital Japonês: atende, mas não divulga; a Doctoralia o exibe publicamente. Campinas Day: divulgar só como particular; o JSON-LD hoje diz "convênios e particular".
2. **`sameAs`.** Os dois domínios em `client/index.html:147-148` dão 404. Remover ou corrigir os redirecionamentos e incluir YouTube e LinkedIn após confirmar a titularidade.
3. **Médico como entidade única**, com `@id`, `identifier` do CRM e RQEs, ligado a autor e revisor de cada página. Corrigir `medicalSpecialty` para `Urologic`.
4. **Datas reais.** `dateModified` copia a publicação (`SchemaMarkup.tsx:65`), `lastReviewed` tem padrão fixo 2026-04-01 (`:189`) e as 59 datas do sitemap são iguais.
5. **Números divergentes:** "1500+ Pacientes" em `DoctoraliaBadge.tsx:32`, 5000 pacientes em `StatsCounter.tsx`, e a contagem de locais.

## Prioridade 4: conteúdo e autoridade

1. Autor, RQEs e "Revisado em" visíveis no `EducationalLayout` e nas páginas de serviço.
2. Abrir cada guia com resposta direta de 40 a 60 palavras e sinais de alarme.
3. Referências com link (DOI, PubMed, diretriz); muitas hoje são genéricas.
4. Definir uma URL principal por tema. Cirurgia robótica tem 4 URLs; vasectomia, cálculo e HPB também se sobrepõem.
5. Criar páginas para os temas sem cobertura: ejaculação precoce (ele tem publicação), câncer de rim e testículo, fimose, prostatite, estenose de uretra, bexiga hiperativa, ISTs/HPV.
6. Dar conteúdo próprio e FAQ às páginas /local/, onde há mais impressões e menos cliques, e criar uma página "urologista em Campinas".
7. Autoridade externa: YouTube educativo, SBU, imprensa local e publicações indexadas. Sem Wikipedia forçada e sem presença encenada.

## Ajustes técnicos menores

- Incluir CSP (primeiro em report-only), X-Frame-Options e Permissions-Policy; remover X-Powered-By.
- Reescrever descrições-molde ("Leia sobre psa") e encurtar títulos longos (/uro-oncologia, 78 caracteres).
- Remover `maximum-scale=1` (`client/index.html:8`), que bloqueia zoom.
- Dar `fetchpriority` e dimensões à imagem do hero.

**O que já está certo:** robots.txt aberto e sem bloqueio a robôs de IA, 301 corretos, 404 real, metadados por rota, HTTPS, layout móvel sem rolagem lateral, passagens clínicas de boa qualidade.

## Limites desta auditoria

- **Core Web Vitals não medidos:** PageSpeed retornou erro de cota.
- **Respostas reais das IAs não testadas:** a ausência nas buscas amostradas veio de um único buscador, com região EUA.
- **Não verificados:** Perfil da Empresa no Google, Knowledge Panel, LinkedIn, atividade do YouTube, presença na SBU.
- **Resolução CFM:** os pontos acima são sinais para revisão, não parecer jurídico.
- A amostra de conteúdo cobriu parte das páginas; o restante foi avaliado por busca textual.

## Anexo: llms.txt proposto

```
# Dr. Felipe de Bulhões — Urologista
> Conteúdo educativo em urologia. CRM-SP 202291; RQE 146538 (Urologia), 114019 (Cirurgia Geral). São Paulo, Campinas e teleconsulta. Não substitui consulta médica.

## Médico e atendimento
- [Sobre](https://felipebulhoes.com/sobre): formação e áreas
- [Consultórios](https://felipebulhoes.com/consultorios): endereços

## Guias educativos
- [Câncer de próstata](https://felipebulhoes.com/educativo/cancer-prostata): diagnóstico e tratamento
- [Vasectomia](https://felipebulhoes.com/educativo/vasectomia): procedimento e recuperação
- [Cálculos renais](https://felipebulhoes.com/educativo/calculos-renais): sintomas e tratamento
- [Hiperplasia prostática](https://felipebulhoes.com/educativo/hiperplasia-prostatica): opções

## Blog
- [PSA e rastreamento](https://felipebulhoes.com/blog/psa-rastreamento-cancer-prostata-2026): diretrizes AUA/SUO 2026

## Optional
- [Blog](https://felipebulhoes.com/blog)
```
