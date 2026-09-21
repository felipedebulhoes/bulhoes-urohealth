# QA visual — ferramenta interna de prévia social

**Data:** 20/09/2026

## Desktop (1280×720)

A rota administrativa `/admin/social-preview` foi capturada em sessão autenticada. O painel abre sem splash screen, banner de cookies ou interface pública de analytics. O cabeçalho identifica a ferramenta como interna e não indexável; a área superior explica corretamente que a prévia usa o catálogo entregue pelo servidor, sem consulta externa ou publicação.

O campo de URL, os atalhos de páginas prioritárias, o estado selecionado de Vasectomia e os cards de Facebook/LinkedIn foram exibidos com boa hierarquia, contraste e proporção de imagem. O layout em duas colunas mantém a área de controle e os previews simultaneamente visíveis no primeiro viewport desktop.

## Proteção de acesso

Em navegador isolado sem sessão autenticada, a abertura de `/admin/social-preview` redirecionou para o fluxo OAuth de login do aplicativo. Assim, a ferramenta não fica utilizável sem autenticação. A captura do ambiente WebDev autenticado confirmou o painel completo; a sessão isolada confirmou a barreira de acesso.

## Mobile (390×844)

No viewport mobile, o cabeçalho mantém o indicador de acesso interno, a hero permanece legível e o formulário de URL ocupa a largura disponível sem rolagem horizontal. Os atalhos de páginas quebram em duas linhas de forma previsível e o cartão de metadados inicia logo após os controles. A hierarquia permanece clara para uso em tela pequena.
