# QA visual — ferramenta interna de prévia social

**Data:** 20/09/2026

## Desktop (1280×720)

A rota administrativa `/admin/social-preview` foi capturada em sessão autenticada. O painel abre sem splash screen, banner de cookies ou interface pública de analytics. O cabeçalho identifica a ferramenta como interna e não indexável; a área superior explica corretamente que a prévia usa o catálogo entregue pelo servidor, sem consulta externa ou publicação.

O campo de URL, os atalhos de páginas prioritárias, o estado selecionado de Vasectomia e os cards de Facebook/LinkedIn foram exibidos com boa hierarquia, contraste e proporção de imagem. O layout em duas colunas mantém a área de controle e os previews simultaneamente visíveis no primeiro viewport desktop.

## Proteção de acesso

Em navegador isolado sem sessão autenticada, a abertura de `/admin/social-preview` redirecionou para o fluxo OAuth de login do aplicativo. Assim, a ferramenta não fica utilizável sem autenticação. A captura do ambiente WebDev autenticado confirmou o painel completo; a sessão isolada confirmou a barreira de acesso.

## Mobile (390×844)

No viewport mobile, o cabeçalho mantém o indicador de acesso interno, a hero permanece legível e o formulário de URL ocupa a largura disponível sem rolagem horizontal. Os atalhos de páginas quebram em duas linhas de forma previsível e o cartão de metadados inicia logo após os controles. A hierarquia permanece clara para uso em tela pequena.

## Expansão do painel — desktop

A revisão full-page confirmou a integração do botão **Facebook Sharing Debugger**, da seção de auditoria e do histórico técnico. O histórico registrou a primeira versão da página de vasectomia e exibiu título, descrição, imagem e tipo Open Graph. O layout desktop preservou boa hierarquia. A auditoria alcançou o arquivo e registrou seu tamanho, mas não leu suas dimensões porque a imagem retornou um formato ainda não reconhecido pelo parser; esse comportamento foi identificado durante o QA e será corrigido antes da entrega.

## Auditoria de imagem corrigida

Após acrescentar suporte ao cabeçalho WebP VP8, a auditoria leu corretamente o banner de vasectomia entregue pelo CDN: **2560 × 1440 px**, **689,7 KB**, formato **WebP**. O arquivo está dentro do limite operacional de 8 MB. O painel o sinaliza como **Revisar / Fora do padrão**, pois ele não corresponde ao padrão operacional declarado de 1200 × 630 px; trata-se de um aviso técnico útil, e não de bloqueio de publicação.

## Mobile (390×844) — expansão

A auditoria, o histórico e os cards de rede social foram exibidos em uma única coluna, sem sobreposição ou rolagem horizontal. Os estados de aviso permanecem legíveis, os controles de atualizar e abrir o depurador têm área de toque adequada e o histórico mostra a imagem e os campos técnicos de forma sequencial.

## Criador de imagens Open Graph — desktop

O painel de criação foi inserido abaixo da auditoria de imagem, com dois fluxos visivelmente separados: **Corte automático da imagem atual** e **Imagem padrão para novo artigo**. Ambos mantêm o padrão visual do painel, mostram estado de carregamento previsto, descrevem o recorte de bordas e deixam explícito que a URL gerada precisa de revisão antes de atualizar os metadados públicos.

## Validação de integração dos arquivos gerados

A integração criou e hospedou dois arquivos reais, ambos com **1200 × 630 px**: um crop JPEG de 128 KB do banner de vasectomia e um template PNG de 96 KB para o título “Como se preparar para a primeira consulta urológica”. A revisão visual confirmou que o crop preserva a mensagem e a marca em formato Open Graph, enquanto o template exibe tipografia legível, texto fiel ao título e identidade azul-marinho/dourada consistente.

## Criador de imagens Open Graph — mobile (390×844)

No viewport mobile, os dois fluxos de criação permanecem sequenciais e legíveis; o botão de corte e o campo de título com o botão de gerar banner mantêm alvos de toque adequados. Nenhum conteúdo apresentou rolagem horizontal ou sobreposição com os cards de auditoria, histórico e prévia social.
