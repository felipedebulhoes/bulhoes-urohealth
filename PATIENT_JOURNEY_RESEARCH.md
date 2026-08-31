# Pesquisa de estrutura, acessibilidade e jornada do paciente

## Resumo executivo

O site atual possui ampla cobertura clínica, credenciais verificáveis, conteúdo baseado em evidências, múltiplos canais de contato e boa base técnica. O principal problema não é falta de informação, mas **excesso de opções sem uma hierarquia centrada na necessidade imediata do paciente**. A homepage apresenta formação, pesquisa, mídia, especialidades, conteúdo, sintomas, serviços, depoimentos, locais, formulários e diferentes camadas de CTA. Essa riqueza pode aumentar confiança em usuários persistentes, mas também exige que o visitante compreenda a taxonomia médica e escolha entre muitos caminhos antes de reconhecer “onde meu problema se encaixa”.

A recomendação central é substituir a lógica “lista de especialidades” por uma lógica de **jornadas por intenção**. A entrada deve oferecer quatro portas: **Saúde do Homem**, **Performance Masculina**, **Saúde Íntima e Estética Genital** e **Urologia Geral**. Engrossamento peniano com ácido hialurônico deve ganhar visibilidade dentro de um hub discreto de saúde íntima, sem transformar uma preocupação corporal em deficiência médica nem prometer resultado individual. Próstata, cálculos, oncologia, infertilidade, incontinência, vasectomia e cirurgia robótica permanecem claramente acessíveis no mesmo nível de navegação.

## Evidência que orienta a proposta

A arquitetura proposta combina acessibilidade técnica, health literacy, redução de carga cognitiva e decisão compartilhada. A WCAG 2.2 organiza acessibilidade nos princípios perceptível, operável, compreensível e robusto, acrescentando critérios importantes para foco, autenticação acessível e tamanho de alvos de toque.[1] O CDC recomenda linguagem que o público consiga entender na primeira leitura e usar para tomar uma ação.[2] O padrão de conteúdo do NHS reforça desenho baseado em necessidades reais, evidência clínica reconhecida e caminhos claros para conteúdo relacionado.[3]

| Achado | Implicação para o site |
|---|---|
| Arquitetura da informação altera satisfação, controle, relevância, confiança e aquisição de conhecimento em educação digital de pacientes.[4] | O agrupamento por necessidade deve ser testado como parte do cuidado, não apenas como alteração estética. |
| Clareza, credibilidade, acessibilidade, adaptação, apoio e recursos visuais aparecem entre os fatores associados ao engajamento em informação de saúde online.[5] | Cada página precisa oferecer resumo, orientação, limites e próximo passo antes do conteúdo aprofundado. |
| Usuários avaliam informação de saúde por relevância, familiaridade, acessibilidade, identificação da fonte, credibilidade, precisão, legibilidade e atualidade.[6] | Autoria, revisão, data e fontes devem ficar visíveis sem interromper a leitura. |
| Agendamento online pode melhorar acesso e satisfação, mas barreiras de processo e compreensão reduzem adoção.[7] | A página de agendamento deve explicar o que ocorrerá depois do clique e manter alternativas simples. |
| A Resolução CFM nº 2.336/2023 permite divulgação educativa e profissional, mas preserva limites contra promessa de resultado, sensacionalismo e indução inadequada.[8] | Páginas de performance e estética devem enfatizar avaliação, limites, alternativas e variabilidade individual. |
| Estratégias de saúde responsivas ao gênero podem reduzir barreiras de procura por cuidado entre homens.[9] | Discrição, linguagem sem julgamento e reconhecimento do constrangimento são componentes de acesso. |

## Diagnóstico da experiência atual

O `HeroSection` começa pelo nome, títulos e especialidades técnicas. A promessa de “cuidado integral” aparece somente no final do terceiro parágrafo, e o primeiro CTA leva diretamente ao agendamento. O visitante que ainda está comparando sintomas, risco e confiança precisa rolar até uma grade extensa de especialidades ou até o navegador de sintomas. A nova abertura deve começar pela pergunta do paciente e oferecer um caminho de exploração antes de pedir uma decisão de contato.

O menu `Header` contém uma lista plana com mais de vinte páginas educativas. No desktop, a lista ultrapassa o volume ideal para escolha rápida; no mobile, exige rolagem dentro de um acordeão. A página de conteúdo educativo repete essa estrutura em uma grade de 24 cartões, onde “Engrossamento Peniano” aparece por último. Essa arquitetura é completa, porém exige conhecimento prévio do nome da condição.

| Elemento atual | Força | Fricção provável | Decisão para o protótipo |
|---|---|---|---|
| Hero médico-first | Autoridade imediata | Pouca identificação com necessidades sensíveis | Reescrever como cuidado confidencial e orientado à pessoa, mantendo credenciais em faixa compacta |
| Menu educativo plano | Cobertura completa | Sobrecarga e baixa previsibilidade | Agrupar em seis famílias com no máximo dois níveis |
| Grade de especialidades | Amplitude urológica | Todos os temas parecem ter o mesmo peso | Criar quatro portas de entrada e preservar catálogo completo depois |
| Symptom Checker | Ajuda na descoberta | Três etapas podem parecer triagem clínica | Transformar em navegador de necessidades sem diagnóstico e sem coleta de respostas |
| Muitos CTAs persistentes | Contato sempre disponível | Competição entre WhatsApp, Doctoralia, telefone, chat e banner | Um CTA principal por etapa; canais alternativos somente no contexto apropriado |
| Página de engrossamento longa | Conteúdo detalhado | Números e anatomia aparecem antes da decisão básica | Resumo decisório, limites e candidato antes dos detalhes técnicos |

## Mapa de jornadas

As jornadas foram desenhadas para permitir entrada por objetivo, sintoma, procedimento conhecido ou necessidade operacional. O navegador não fornecerá diagnóstico e não enviará respostas para analytics. Apenas o identificador do caminho escolhido poderá ser registrado.

| Jornada | Pergunta provável | Resposta inicial | Próxima ação |
|---|---|---|---|
| Saúde do homem | “Quero um check-up completo; por onde começo?” | Explicar prevenção, próstata, risco metabólico, sexualidade e envelhecimento saudável | Explorar trilha por faixa de vida ou agendar avaliação integral |
| Performance | “Minha energia, libido ou ereção mudaram” | Mostrar que sintomas podem ter causas hormonais, vasculares, metabólicas, psicológicas ou medicamentosas | Ler como funciona a avaliação ou agendar consulta individualizada |
| Saúde íntima e estética | “Tenho uma preocupação com aparência ou função e quero conversar com discrição” | Validar a busca por informação sem confirmar inadequação corporal | Comparar preocupações, opções, limites e avaliação confidencial |
| Engrossamento peniano | “O ácido hialurônico é seguro e indicado para mim?” | Apresentar caráter eletivo, reversibilidade, evidência limitada, variabilidade e necessidade de seleção | Revisar riscos/alternativas ou solicitar avaliação confidencial |
| Urologia geral | “Tenho dor, sangue na urina, dificuldade para urinar ou outro sintoma” | Direcionar para condição provável sem diagnosticar e destacar sinais de urgência | Conteúdo específico, emergência quando indicada ou agendamento |
| Cirurgia/segunda opinião | “Já tenho diagnóstico e quero conhecer tratamentos” | Organizar por condição e decisões terapêuticas | Consultar alternativas ou agendar segunda opinião |

## Arquitetura de informação proposta

O menu do protótipo terá seis destinos e um CTA. “Comece por aqui” funcionará como orientação inicial; os demais itens serão hubs. A estrutura reduz a lista visível sem excluir páginas existentes.

| Item principal | Conteúdo agrupado |
|---|---|
| Comece por aqui | Navegador por objetivo, sintomas, primeira consulta, sinais de alerta |
| Saúde do homem | Prevenção, próstata, metabolismo, testosterona, fertilidade e estilo de vida |
| Saúde íntima e performance | Ereção, libido, ejaculação, Peyronie, estética genital, engrossamento e procedimentos andrológicos |
| Condições e tratamentos | Próstata, cálculos, oncologia, infecções, incontinência, urodinâmica, cirurgia robótica, vasectomia |
| Conteúdos | Guias, blog, vídeos, orientações pré e pós-operatórias |
| Sobre e locais | Formação, pesquisa, consultórios, teleconsulta e contato |
| Agendar | Página única com explicação do processo e canais disponíveis |

## Nova ordem da homepage

A ordem proposta busca responder primeiro “você trata o que estou sentindo?”, depois “posso confiar?” e finalmente “como avanço?”. A autoridade permanece presente, mas distribuída no momento em que reduz incerteza.

| Ordem | Seção | Objetivo |
|---:|---|---|
| 1 | Hero orientado ao paciente | Explicar cuidado confidencial em urologia e saúde do homem, locais e dois caminhos: explorar ou agendar |
| 2 | Como posso ajudar? | Quatro portas de entrada por necessidade |
| 3 | Saúde íntima e performance | Destaque respeitoso para performance, estética e engrossamento, com aviso de avaliação individual |
| 4 | Navegador rápido | Identificar intenção em um toque, sem questionário clínico e sem armazenamento |
| 5 | Confiança essencial | CRM/RQE, formação, sociedades, Doctoralia, experiência e abordagem baseada em evidências |
| 6 | Como funciona a consulta | Privacidade, primeira conversa, exames, decisão compartilhada e canais |
| 7 | Urologia completa | Catálogo organizado das demais condições e tratamentos |
| 8 | Conteúdo relacionado | Guias, vídeos e artigos conforme a jornada escolhida |
| 9 | Locais | Escolha operacional depois da compreensão clínica |
| 10 | FAQ e CTA final | Resolver objeções e apresentar uma ação principal |

## Conteúdo prioritário: saúde íntima, performance e engrossamento

A comunicação sobre performance deve evitar o atalho “sintoma = testosterona baixa”. Diretrizes da EAU, AUA e Endocrine Society exigem correlação clínica, avaliação laboratorial e atenção a fertilidade, contraindicações e monitorização.[14][15] Em disfunção erétil, fatores cardiometabólicos e decisão compartilhada devem aparecer antes de uma lista comercial de tratamentos.[16][17]

Para engrossamento peniano, revisões e posicionamentos relatam aumento de circunferência e satisfação com preenchedores absorvíveis, mas a literatura apresenta heterogeneidade de técnica, seleção e seguimento, e há complicações descritas.[10][11][12] O posicionamento da SMSNA enfatiza a necessidade de informação equilibrada e cautela.[10] O protótipo não transformará médias de estudos em promessa individual e incluirá avaliação de expectativas e possível preocupação dismórfica antes de descrever o procedimento.

| Página | Primeiro bloco | Informação que não pode faltar | CTA |
|---|---|---|---|
| Saúde do Homem | “Cuidar antes de adoecer” | Prevenção, sexualidade, metabolismo, próstata e plano individual | Agendar avaliação integral |
| Performance | “Mudanças de energia, libido ou ereção merecem investigação” | Causas múltiplas, exames quando indicados, fertilidade e risco cardiometabólico | Entender a avaliação |
| Saúde Íntima e Estética | “Uma conversa médica, discreta e sem julgamento” | Função versus estética, alternativas, expectativas e saúde mental | Agendar avaliação confidencial |
| Engrossamento com AH | “Procedimento eletivo, temporário e não indicado para todos” | Evidência disponível, incertezas, riscos, reversibilidade, contraindicações e alternativas | Avaliar se faz sentido para você |

## Benchmark

O benchmark combina portais institucionais, clínicas e profissionais. Portais institucionais são referências para educação e segurança; clínicas são úteis para comparar discrição, organização e fricção de contato. Nenhum benchmark será copiado visualmente.

| Referência | Contribuição para o protótipo | Cuidado na interpretação |
|---|---|---|
| [Rede D'Or — Andrologia](https://www.rededorsaoluiz.com.br/especialidades/urologia/andrologia) | Definição institucional simples da subespecialidade | Conteúdo de rede hospitalar não representa jornada de consultório individual |
| [Andrologia Moinhos](https://andrologiamoinhos.com.br/) | Posicionamento integrado de saúde e performance | Verificar claims e densidade comercial |
| [Dr. Diego Moura](https://www.drdiegomoura.com.br/) | Descoberta de performance e teleconsulta | Evitar linguagem de “otimização” sem contexto clínico |
| [Dr. Heder Murari](https://drhederurologia.com/estetica-intima-masculina/) | Estrutura de estética íntima masculina | Não reproduzir promessas, urgência artificial ou exposição corporal |
| [Dr. Felipe Rocha](https://www.feliperochaurologista.com.br/) | Integração de urologia geral, andrologia e estética | Validar equilíbrio entre autoridade e orientação do paciente |
| [Urology Care Foundation](https://www.urologyhealth.org/educational-resources) | Educação baseada em condições, sintomas, diagnóstico e tratamento | Adaptar linguagem e contexto regulatório ao Brasil |
| [Cleveland Clinic — Men’s Health](https://my.clevelandclinic.org/departments/urology-kidney/depts/mens-health) | Hub institucional amplo de saúde masculina | Escala institucional não deve gerar complexidade excessiva |
| [Mayo Clinic — Men’s Health](https://www.mayoclinic.org/departments-centers/mens-health/overview/ovc-20568062) | Organização por fases de vida e condições | Não replicar volume de serviços indisponíveis localmente |
| [Ohio State — Men’s Sexual Health](https://wexnermedical.osu.edu/urology/mens-sexual-health) | Confidencialidade e acesso direto ao cuidado sexual | Ajustar canais e terminologia ao público brasileiro |

## Materiais audiovisuais selecionados

Os materiais abaixo foram selecionados para formular perguntas de usabilidade e tom. Eles não sustentam números clínicos nem substituem as fontes científicas. As recomendações derivadas foram trianguladas com WCAG, CDC, NHS e estudos revisados por pares.

| Material | Uso no projeto |
|---|---|
| [NHS Digital Service Manual — show and tell](https://www.youtube.com/watch?v=ZNrewVbVQbo) | Consistência de padrões e acessibilidade |
| [NHS Digital Service Manual — accessibility guidance](https://www.youtube.com/watch?v=Bzs_qJtuxE4) | Critérios de navegação e linguagem |
| [Cleveland Clinic — Men’s Health Talk](https://www.youtube.com/watch?v=JM681HOiO7s) | Sequência de educação em saúde masculina |
| [Health Literacy Training Video Series](https://www.youtube.com/playlist?list=PLStrIz0VJnt7nT-NUF4m1HxWmgf_K_pBe) | Comunicação clara e confirmação de entendimento |
| [DC Health Literacy](https://www.youtube.com/playlist?list=PLtfv0wL3AxyIKtcPTZAvOWXCkg8iO_toE) | Acesso linguístico e letramento em saúde |
| [Health IQ Webinar Series](https://www.youtube.com/playlist?list=PLDFaLMW5hoLJxWdv3-OasYYWX5sfRVxWt) | Escrita de materiais compreensíveis |
| [Urology Care Foundation — Sexual Health](https://www.youtube.com/playlist?list=PLYtqmEiTtKCPoz1e_07XN62ogQF0v3YQt) | Tom educativo em sexualidade e reprodução |
| [Urology Care Podcast](https://www.youtube.com/playlist?list=PLYtqmEiTtKCMZ9lCmZNyVmT9z6ScyZ5xH) | Perguntas recorrentes e explicação por condição |

## Regras editoriais do protótipo

Cada página começará com uma resposta curta, seguida por “quando procurar avaliação”, “como funciona”, “riscos e limites”, “alternativas”, “evidência” e FAQ. Termos médicos serão explicados na primeira ocorrência. Parágrafos terão uma ideia principal e não usarão justificativa de texto. Tabelas complexas serão evitadas no mobile ou transformadas em cartões.

| Usar | Evitar |
|---|---|
| “Avaliação confidencial e individualizada” | “Transforme sua performance” |
| “Pode ser uma opção para alguns pacientes” | “Resultado garantido” |
| “Os estudos mostram médias; seu resultado pode variar” | Usar média de circunferência como promessa |
| “A testosterona só é considerada após sintomas e exames” | “Otimize seus hormônios” |
| “Se você se sente desconfortável, a consulta pode esclarecer possibilidades e limites” | Induzir inadequação corporal |
| “Este navegador orienta conteúdo; não faz diagnóstico” | Resultado automatizado que pareça diagnóstico |

## Acessibilidade e privacidade

O protótipo será construído para WCAG 2.2 AA, com foco visível, navegação por teclado, alvos de toque adequados, rótulos explícitos, estrutura de títulos, contraste e redução de movimento. Em saúde íntima, privacidade inclui também **privacidade percebida**: títulos neutros no histórico, ausência de mensagens constrangedoras em CTAs e orientação para não enviar sintomas ou documentos por formulário aberto.

| Critério | Aceitação |
|---|---|
| Teclado | Todos os controles alcançáveis, ordem lógica e sem armadilhas |
| Zoom | Fluxo utilizável a 200% sem perda de ação ou conteúdo |
| Movimento | Animações não essenciais desligadas com `prefers-reduced-motion` |
| Formulários | Labels persistentes, erros em texto, consentimento e instrução LGPD |
| Analytics | Registrar apenas rota, componente e ação; nunca sintoma, diagnóstico ou texto livre |
| Mobile | Nenhuma sobreposição entre barra fixa, chat, consentimento e CTA |

## Métricas para validação posterior

O protótipo registrará somente eventos anônimos de navegação. A análise deve priorizar clareza e conclusão de tarefa, não apenas volume de cliques.

| Evento | Pergunta respondida |
|---|---|
| `journey_entry_selected` | Qual porta de entrada é mais compreensível? |
| `topic_hub_open` | Quais hubs sustentam exploração? |
| `prototype_section_view` | Onde há abandono antes da informação essencial? |
| `faq_open` | Quais dúvidas não estão resolvidas no corpo? |
| `cta_schedule` | Em que etapa o paciente decide agendar? |
| `cta_whatsapp` | Quando o usuário prefere conversa direta? |

## Backlog recomendado após aprovação do protótipo

| Prioridade | Implementação pública futura | Motivo |
|---|---|---|
| P0 | Nova navegação, quatro portas de entrada e homepage reordenada | Maior impacto em descoberta e carga cognitiva |
| P0 | Hubs Saúde do Homem e Saúde Íntima/Performance | Sustenta o destaque pedido sem retirar urologia geral |
| P0 | Template progressivo para engrossamento | Reduz risco ético e melhora compreensão |
| P1 | Simplificar camadas persistentes de CTA | Reduz competição visual no mobile |
| P1 | Reescrever páginas prioritárias conforme guia editorial | Aumenta legibilidade e decisão informada |
| P1 | Revisar claims e datas de todas as páginas clínicas | Preserva confiança e atualidade |
| P2 | Personalização por jornada sem dados de saúde | Aumenta relevância com menor risco de privacidade |
| P2 | Testes moderados com pacientes representativos | Valida hipóteses antes de migração ampla |

## Referências

[1]: [W3C. Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)
[2]: [CDC. Plain Language Materials & Resources](https://www.cdc.gov/health-literacy/php/develop-materials/plain-language.html)
[3]: [NHS. Standard for creating health content](https://service-manual.nhs.uk/content/standard-for-creating-health-content)
[4]: [Bol et al. Effects of Information Architecture on Web-Based Patient Education](https://pmc.ncbi.nlm.nih.gov/articles/PMC7970227/)
[5]: [Oktay et al. Factors Affecting Engagement in Web-Based Health Care Content](https://pmc.ncbi.nlm.nih.gov/articles/PMC8498891/)
[6]: [Sun et al. Consumer Evaluation of Online Health Information Quality](https://www.jmir.org/2019/5/e12522/)
[7]: [JMIR. Investigating Patient Use and Experience of Online Appointment Booking](https://www.jmir.org/2024/1/e51931/)
[8]: [CFM. Resolução nº 2.336/2023 e publicidade médica](https://portal.cfm.org.br/noticias/cfm-atualiza-resolucao-da-publicidade-medica/)
[9]: [Seidler et al. Approaches to Engaging Men During Primary Healthcare Encounters](https://pmc.ncbi.nlm.nih.gov/articles/PMC11010769/)
[10]: [SMSNA. Position on Cosmetic Penile Enhancement Procedures](https://www.smsna.org/patients/news/the-smsnas-position-on-cosmetic-penile-enhancement-procedures)
[11]: [Kusumaputra et al. Efficacy and complications of HA and PLA fillers](https://pmc.ncbi.nlm.nih.gov/articles/PMC10473315/)
[12]: [Quan et al. Complications and management of penile augmentation with HA](https://pmc.ncbi.nlm.nih.gov/articles/PMC8269832/)
[13]: [AUA News. The evolving landscape of penile girth enhancement](https://www.auanews.net/issues/articles/2024/august-extra-2024/office-and-surgical-technologies-the-evolving-landscape-of-penile-girth-enhancement)
[14]: [EAU Guidelines. Male Hypogonadism](https://uroweb.org/guidelines/sexual-and-reproductive-health/chapter/male-hypogonadism)
[15]: [Endocrine Society. Testosterone Therapy for Hypogonadism](https://www.endocrine.org/clinical-practice-guidelines/testosterone-therapy)
[16]: [AUA Guideline. Erectile Dysfunction](https://www.auanet.org/guidelines-and-quality/guidelines/erectile-dysfunction-(ed)-guideline)
[17]: [EAU Guidelines. Management of Erectile Dysfunction](https://uroweb.org/guidelines/sexual-and-reproductivehealth/chapter/management-of-erectile-dysfunction)
[18]: [SBU. Pesquisa sobre saúde masculina](https://portaldaurologia.org.br/novidades/noticias/pesquisa-realizada-pela-sbu-sobre-saude-masculina-segue-repercutindo-na-imprensa)
