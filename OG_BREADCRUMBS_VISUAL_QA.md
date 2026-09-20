# QA visual — previews, breadcrumbs e página 404

**Data:** 20/09/2026

A primeira captura desktop das rotas `/rota-inexistente`, `/vasectomia-sem-bisturi` e `/blog/quando-procurar-urologista` foi tecnicamente concluída, mas a tela de abertura global (`SplashScreen`) ainda estava ativa em todas as três imagens. Assim, a captura confirma que o servidor e o preview estão respondendo, porém não é suficiente para revisar os novos elementos em tela. A inspeção visual deve ser repetida após dispensar a tela de abertura no mesmo contexto de navegador ou após aguardar sua finalização.

A validação HTTP independente confirmou os metadados entregues antes do JavaScript: `200` com Open Graph e Twitter por rota para páginas públicas, imagem específica da landing de vasectomia, tipo `article` para o artigo do blog e `404` com `noindex` para URL inexistente.

## Página 404 — desktop

Após aguardar a conclusão da tela de abertura, a página 404 foi revisada em navegador isolado. O layout apresenta hierarquia clara entre o código de erro, o título, a explicação, a busca e os atalhos úteis. O campo `type="search"`, o botão de busca, o status `aria-live` e cinco destinos de recuperação estão presentes e visíveis. O banner de cookies cobre parte inferior dos cards no estado inicial, comportamento esperado do componente de consentimento; os controles de busca e os principais atalhos continuam identificáveis.

## Breadcrumbs — desktop

A landing page `/vasectomia-sem-bisturi` apresenta a trilha `Início › Vasectomia sem bisturi` acima do conteúdo principal, com contraste adequado sobre o gradiente, sem competir com o título. O artigo `/blog/quando-procurar-urologista` apresenta a trilha de três níveis `Início › Blog › 10 sinais de que você deve procurar um urologista`; o item atual é corretamente não clicável e foi truncado apenas se necessário. A revisão confirmou links anteriores reais, semântica de breadcrumb e boa hierarquia visual em ambas as páginas.

## Página 404 e breadcrumb — mobile (390×844)

A captura mobile confirma que a hero da página 404 preserva hierarquia e margem lateral apropriadas. O painel de cookies, ainda sem consentimento neste perfil novo de navegador, cobre a área da busca e dos cards; é uma sobreposição legítima do fluxo LGPD e não quebra a página. No artigo, a trilha `Início › Blog › Artigo` permanece em uma linha, e o último item é truncado de forma segura, preservando os dois links anteriores e sem extravasamento horizontal. A navegação superior e o título também permanecem proporcionais em 390 px.

## Busca da página 404 — teste funcional

No navegador isolado, foi digitado `consultório` no campo de busca e pressionado Enter. O fluxo redirecionou corretamente para `/consultorios`, confirmando a recuperação por teclado sem envio de dados, chamadas externas ou coleta de termos de busca. Esse comportamento utiliza apenas o conjunto local de atalhos da página 404.
