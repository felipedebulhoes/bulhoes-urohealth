# Guia de validação — jornada digital do paciente

## Acesso

O protótipo está disponível em `/prototipo-jornada-paciente`. As cinco rotas usam metatag e cabeçalho HTTP `X-Robots-Tag` com `noindex, nofollow, noarchive, nosnippet`. Elas não foram adicionadas ao menu público, ao sitemap ou aos conteúdos relacionados.

O botão flutuante de WhatsApp é o único elemento que abre um canal real. A mensagem inicial informa apenas a intenção de agendar uma avaliação confidencial e orienta que detalhes sejam explicados durante o atendimento. Os cartões da página de agendamento continuam sendo simulações.

## O que deve ser avaliado

O objetivo não é escolher cores ou detalhes decorativos. A revisão deve verificar se um paciente encontra seu caminho, entende a proposta clínica, percebe privacidade e consegue identificar o próximo passo sem ser pressionado.

| Aspecto | Pergunta de validação |
|---|---|
| Clareza inicial | Em cinco segundos, fica claro quem atende, em quais temas e em quais cidades? |
| Descoberta | O usuário encontra uma entrada mesmo sem conhecer o nome médico da condição? |
| Discrição | A linguagem permite explorar saúde sexual e estética sem constrangimento? |
| Equilíbrio | Saúde íntima ganha destaque sem esconder próstata, cálculos, oncologia e cirurgias? |
| Confiança | Credenciais, método e limites aparecem antes do convite ao agendamento? |
| Decisão | A página de engrossamento explica incerteza, riscos, alternativas e opção de não tratar? |
| Conversão | Existe uma ação principal clara, sem competição excessiva entre canais? |

## Comparação antes e depois

| Dimensão | Estrutura pública atual | Hipótese do protótipo |
|---|---|---|
| Entrada | Nome, títulos, áreas técnicas e CTA direto | Necessidades do paciente, confidencialidade e escolha entre explorar ou agendar |
| Navegação | Lista extensa de condições e procedimentos | Seis destinos principais e hubs por intenção |
| Saúde íntima | Temas distribuídos entre especialidades e páginas educativas | Hub único com função, hormônios, estética, circunferência, curvatura e fertilidade |
| Engrossamento | Página longa, majoritariamente explicativa | Resumo decisório e divulgação progressiva: evidência, incerteza, riscos e alternativas |
| Saúde do homem | Conteúdo fragmentado entre próstata, metabolismo e andrologia | Hub por fase de vida e quatro dimensões de saúde |
| Agendamento | Acesso por múltiplos CTAs e canais | Página única que explica canal, privacidade e próximo passo |
| Dúvidas sobre engrossamento | Respostas distribuídas na página | FAQ expansível sobre resultado, duração, recuperação, riscos, reversibilidade e seleção |
| Fluidez | Seções estáticas | Transições de entrada no hub de Saúde do Homem, desativadas quando o usuário prefere movimento reduzido |
| Analytics | Eventos de conteúdo e conversão | Eventos adicionais de validação com identificadores fixos e sem dados clínicos |

## Cenários de teste

Cada participante deve realizar as tarefas sem orientação. O moderador registra conclusão, tempo aproximado, hesitações e linguagem espontânea, mas não coleta diagnóstico ou relato clínico.

| Cenário | Tarefa | Critério de sucesso |
|---|---|---|
| Prevenção | “Você quer cuidar da saúde antes de ter sintomas.” | Encontrar Saúde do Homem e compreender as quatro dimensões |
| Performance | “Você percebeu mudança de energia ou função sexual.” | Chegar à seção Performance sem concluir que o site prescreve testosterona |
| Estética íntima | “Você quer informação sobre aparência genital com discrição.” | Encontrar Saúde Íntima e perceber linguagem não julgadora |
| Engrossamento | “Você ouviu falar em ácido hialurônico e quer saber se é seguro.” | Identificar caráter eletivo, temporário, riscos e necessidade de avaliação |
| Urologia geral | “Você procura cuidado para próstata ou cálculo renal.” | Confirmar que esses temas continuam visíveis na homepage |
| Agendamento | “Você decidiu conversar com o médico.” | Encontrar o fluxo e explicar o que acontece depois do clique; usar o WhatsApp somente se desejar contato real |
| Preferência por e-mail | “Você prefere não usar WhatsApp.” | Encontrar o formulário abaixo do FAQ, entender quais dados serão usados e concluir sem relatar informações clínicas |
| Navegação longa | “Você terminou de explorar Saúde do Homem.” | Usar o botão Voltar ao topo depois de rolar a página |
| Dúvida específica | “Você quer saber sobre recuperação ou duração.” | Pesquisar um termo no FAQ e identificar rapidamente as respostas correspondentes |
| Interesse por tema | “Você quer ver apenas fertilidade ou saúde sexual.” | Usar os filtros do hub de Saúde do Homem e abrir um conteúdo da categoria selecionada |

## Perguntas após o teste

| Pergunta | Escala |
|---|---|
| Foi fácil encontrar o tema que você procurava? | 1 a 5 |
| A linguagem pareceu clara e respeitosa? | 1 a 5 |
| Você sentiu confiança para continuar explorando? | 1 a 5 |
| O site pareceu discreto para assuntos íntimos? | 1 a 5 |
| O próximo passo ficou claro? | 1 a 5 |
| Algum texto pareceu prometer resultado ou pressionar você? | Resposta aberta |
| Que informação faltou antes de considerar uma consulta? | Resposta aberta |

## Critérios de aprovação

| Critério | Meta inicial |
|---|---:|
| Conclusão das tarefas de descoberta | ≥ 80% |
| Participantes que identificam o CTA principal | ≥ 90% |
| Clareza média da linguagem | ≥ 4/5 |
| Percepção média de discrição | ≥ 4/5 |
| Participantes que encontram urologia geral | ≥ 80% |
| Relatos de promessa de resultado | 0 |
| Erros críticos de teclado, zoom ou mobile | 0 |

## Eventos disponíveis

| Evento | Finalidade |
|---|---|
| `prototype_page_view` | Identificar qual rota foi avaliada |
| `journey_entry_selected` | Comparar compreensão das portas de entrada |
| `topic_hub_open` | Avaliar descoberta pela navegação |
| `faq_open` | Localizar dúvidas que exigem aprofundamento |
| `cta_schedule` | Identificar momento de intenção de agendamento |
| `cta_whatsapp` | Identificar preferência por conversa direta |
| `email_contact_submit` | Registrar somente o sucesso do pedido de retorno por e-mail, sem nome ou endereço eletrônico no analytics |
| `faq_search` | Registrar somente se houve resultado, nunca o termo digitado |
| `mens_health_filter` | Identificar a categoria selecionada por meio de identificadores fixos |

Os eventos registram apenas IDs fixos de componente e item, além da rota. Sintomas, diagnósticos, respostas e textos livres não são enviados.

## Próxima decisão

Se o protótipo atingir os critérios de aprovação, a implementação pública deve ocorrer em etapas: primeiro navegação, homepage e hubs; depois reescrita das páginas prioritárias; por fim simplificação dos CTAs persistentes e personalização editorial. Se o teste revelar confusão, apenas o protótipo deve ser ajustado, preservando o site público atual.
