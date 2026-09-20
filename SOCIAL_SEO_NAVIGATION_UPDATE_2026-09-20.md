# Atualização de compartilhamento social, navegação e página 404

**Data:** 20 de setembro de 2026  
**Site:** `https://felipebulhoes.com`

## Objetivo

Foram implementadas três melhorias complementares: metadados sociais entregues dinamicamente pelo servidor, breadcrumbs visíveis com dados estruturados e uma página 404 orientada à recuperação do usuário. A implementação preserva a política prévia de canônicas, `noindex` em URLs inexistentes e o isolamento do protótipo de jornada do paciente.

## Metadados sociais dinâmicos

O servidor agora produz, antes da hidratação do React, uma única versão por rota de `title`, descrição, URL canônica, `robots`, Open Graph e Twitter Card. Isso permite que crawlers de WhatsApp, Facebook, LinkedIn e outras redes recebam um preview coerente mesmo sem executar JavaScript. Foram incluídos `og:title`, `og:description`, `og:type`, `og:url`, `og:image`, texto alternativo da imagem e `twitter:card=summary_large_image`.

As páginas institucionais, educativas, locais de atendimento, campanhas e artigos recebem títulos e descrições específicos. As campanhas de vasectomia sem bisturi, andrologia/performance masculina e estética íntima masculina preservam seus banners sociais próprios. Os artigos recebem `og:type=article` e usam a respectiva imagem de capa quando disponível. O HTML entregue para URL inexistente continua retornando HTTP 404, sem canônica nem preview social e com `noindex, nofollow, noarchive, nosnippet`.

## Breadcrumbs

Foi criado um componente único para breadcrumbs que combina navegação visível, links internos reais, foco por teclado, `aria-current="page"` e JSON-LD `BreadcrumbList`. A mesma regra de rotas gera os itens visuais e estruturados, evitando divergência entre a interface e os dados para mecanismos de busca.

A trilha foi aplicada às páginas prioritárias institucionais — Blog, Sobre, Consultórios, Contato, Agendamento e Política de Privacidade —, às páginas de locais, aos artigos, às 27 páginas educativas e às três landing pages. Exemplos: `Início › Vasectomia sem bisturi`; `Início › Blog › 10 sinais de que você deve procurar um urologista`; `Início › Consultórios › Clinovi Paulista`.

## Página 404 personalizada

A página de URL inexistente foi redesenhada como um ponto de recuperação. Ela oferece busca local apenas entre destinos úteis, atalhos para agendamento, conteúdo educativo, consultórios, contato e primeira consulta, além de retorno para a página inicial. A busca não envia termos ao servidor, não registra dados pessoais e pode ser usada por teclado. No teste manual, o termo `consultório` redirecionou corretamente para `/consultorios` ao pressionar Enter.

## Validação realizada

| Verificação | Resultado |
|---|---|
| TypeScript (`pnpm check`) | Aprovado |
| Testes automatizados (`pnpm test`) | **128 testes aprovados** em 10 arquivos |
| Build de produção (`pnpm build`) | Aprovado |
| HTML entregue para `/`, `/sobre`, campanha e artigo | Uma única tag para título, canônica, `og:title`, `og:image`, Twitter Card e robots |
| URL inexistente | HTTP 404, título apropriado, `noindex` e sem canônica/Open Graph |
| Banners sociais configurados | HTTP 200 para homepage, vasectomia, andrologia e estética íntima |
| Revisão visual | Desktop e mobile para 404 e breadcrumbs; evidência em `OG_BREADCRUMBS_VISUAL_QA.md` |

## Próxima ação externa recomendada

Após a publicação, use o [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) para as URLs prioritárias e a inspeção de URL do Google Search Console para solicitar novo rastreamento apenas quando houver alterações relevantes. O cache de preview das redes é controlado por cada plataforma; a nova marcação garante que o crawler receba os dados corretos quando realizar nova coleta.

## Referências técnicas

1. [Open Graph protocol — propriedades de título, descrição, URL e imagem](https://ogp.me/)
2. [Google Search Central — dados estruturados de breadcrumb](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb?hl=pt-br)
3. [Google Search Central — títulos de links nos resultados](https://developers.google.com/search/docs/appearance/title-link?hl=pt-br)
4. [Google Search Central — respostas HTTP 404 e indexação](https://developers.google.com/search/docs/crawling-indexing/http-network-errors?hl=pt-br)
