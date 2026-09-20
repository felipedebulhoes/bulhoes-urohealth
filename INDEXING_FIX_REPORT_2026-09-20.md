# Correção dos problemas de indexação — felipebulhoes.com

**Data:** 20 de setembro de 2026  
**Autor:** Manus AI

## Resultado executivo

O relatório do Google Search Console enviado em 20/09/2026 mostra **33 páginas indexadas e 2 não indexadas** na última data disponível, 17/09/2026. As duas exclusões são classificadas como **1 erro soft 404** e **1 página com redirecionamento**. Não há problemas não críticos registrados no arquivo.

A auditoria confirmou que o sitemap contém **53 URLs canônicas**. No ambiente atualizado, todas as 53 respondem com HTTP `200`. A principal fragilidade residual era o comportamento padrão da aplicação React: qualquer URL inexistente também recebia `200 OK`, apesar de exibir uma página de erro. Esse padrão é exatamente o que pode levar o Google a classificar uma URL como soft 404. O Google recomenda que páginas realmente inexistentes retornem HTTP `404`, e informa que conteúdos recebidos com status `4xx` não são considerados para indexação.[1] [2]

A correção foi implementada e validada. URLs inexistentes e slugs de blog inválidos agora retornam **HTTP 404**, `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`, meta robots equivalente e **nenhuma tag canônica**. Páginas públicas válidas continuam respondendo `200`, com uma única canônica limpa e sem parâmetros de campanha. Rotas internas, administrativas, de protótipo e de redirecionamento intermediário continuam acessíveis, porém agora são explicitamente `noindex`.

## O que foi encontrado no relatório

| Classificação do Search Console | Quantidade | Interpretação |
|---|---:|---|
| Erro soft 404 | 1 | Uma URL apresentava aparência de página ausente sem devolver o status HTTP 404 correto. |
| Página com redirecionamento | 1 | Uma URL não canônica encaminhava para outro endereço e, por definição, não seria indexada. |
| Páginas indexadas | 33 | Contagem registrada em 17/09/2026. |
| Páginas não indexadas | 2 | Contagem registrada em 17/09/2026. |
| Problemas não críticos | 0 | Nenhum item nessa categoria no arquivo exportado. |

O arquivo agregado não contém a lista de URLs de exemplo. Por isso, a correção foi feita em duas camadas: as URLs históricas já identificadas foram verificadas em produção e a causa estrutural que permitia novos soft 404 foi eliminada para qualquer rota desconhecida.

## Correções aplicadas

### Respostas 404 reais

O servidor passou a reconhecer explicitamente as rotas válidas do site. Qualquer caminho desconhecido, inclusive um slug de blog inexistente, recebe HTTP `404` em vez de `200`. A rota visual `/404` também passou a retornar o status correto.

A página de erro foi traduzida para português e continua oferecendo um caminho claro de volta à página inicial. O arquivo `robots.txt` deixou de bloquear `/404`, pois o Google precisa conseguir rastrear uma URL para confirmar o status HTTP. A documentação do Search Console esclarece que bloquear pelo `robots.txt` não é o mecanismo apropriado para impedir indexação; nesse cenário, o rastreador pode conhecer a URL sem conseguir ler sua diretiva.[1]

### Metadados coerentes com a finalidade da rota

Páginas públicas válidas recebem `index, follow`, uma única tag canônica e um único `og:url`, sempre apontando para `https://felipebulhoes.com` e sem parâmetros de consulta. Páginas administrativas, páginas internas, rotas utilitárias, o protótipo e páginas inexistentes recebem `noindex` tanto no HTML quanto no cabeçalho HTTP.

O protótipo `/prototipo-jornada-paciente` continua isolado e não indexável, conforme decisão anterior.

### Redirecionamentos e links internos

As duas URLs históricas já identificadas em uma correção anterior continuam corretas em produção:

- `/$` redireciona permanentemente para `/`;
- `/blog?q={search_term_string}` redireciona para `/blog`.

O Google considera um redirecionamento permanente do lado do servidor um sinal forte de que o destino deve ser tratado como canônico.[3] A classificação “Página com redirecionamento” no Search Console é, portanto, esperada para uma URL antiga que tenha sido movida; o objetivo é garantir que ela não esteja no sitemap e que não receba novos links internos.[1]

Os dois CTAs internos que ainda apontavam para `/agendar/doctoralia` passaram a abrir diretamente a Doctoralia com UTMs e eventos de tracking preservados. A rota intermediária foi mantida apenas para compatibilidade com acessos antigos, mas agora é explicitamente `noindex`.

### Sitemap e barras finais

As **53 URLs listadas no sitemap** respondem `200` no ambiente atualizado e são reconhecidas como indexáveis. Nenhuma URL redirecionada ou inexistente está no sitemap. Isso segue a recomendação do Google de incluir no sitemap os URLs canônicos que se deseja apresentar nos resultados de pesquisa.[4]

Também foi adicionada normalização por redirecionamento `301` para barras finais em rotas válidas, por exemplo `/sobre/` para `/sobre`, evitando duas versões rastreáveis da mesma página.

## Validação técnica

| Verificação | Resultado |
|---|---:|
| URLs do sitemap testadas | 53 |
| URLs do sitemap com HTTP 200 | 53 |
| Falhas no sitemap | 0 |
| Testes Vitest | 122 aprovados |
| Arquivos de teste | 10 aprovados |
| TypeScript | Sem erros |
| Build de produção | Concluído com sucesso |
| URL inexistente | HTTP 404 + noindex |
| Slug de blog inexistente | HTTP 404 + noindex |
| Rotas internas/protótipo | HTTP 200 + noindex |
| Página pública com UTM | HTTP 200 + canônica sem parâmetros |
| Rota válida com barra final | HTTP 301 para a versão limpa |

## Próximo passo no Search Console

Depois que a nova versão estiver publicada, é necessário abrir o problema **Erro soft 404** no Google Search Console e usar **Validar correção** ou **Testar o URL publicado**. Para a URL classificada como **Página com redirecionamento**, deve-se confirmar que o destino final é a página correta; não é necessário tentar indexar a URL de origem. O histórico do relatório pode continuar mostrando as duas exclusões até que o Google rastreie novamente os endereços.[1]

## Referências

[1]: https://support.google.com/webmasters/answer/7440203?hl=pt-BR "Relatório de indexação de páginas — Ajuda do Search Console"
[2]: https://developers.google.com/search/docs/crawling-indexing/http-network-errors?hl=pt-br "Como os códigos de status HTTP afetam os rastreadores do Google"
[3]: https://developers.google.com/search/docs/crawling-indexing/301-redirects?hl=pt-br "Redirecionamentos e Pesquisa Google"
[4]: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=pt-br "Criar e enviar um sitemap"
