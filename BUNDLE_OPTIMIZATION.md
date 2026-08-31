# Otimização dos bundles JavaScript

## Linha de base

| Métrica | Antes |
|---|---:|
| JavaScript total gerado | 15,18 MiB |
| Arquivos JavaScript | 416 |
| Bundle de entrada | 1.391.048 bytes |
| Chunk do renderizador Markdown | 911.357 bytes |

O roteamento já utilizava `React.lazy`, mas a homepage importava estaticamente todas as seções. A dependência `streamdown` também gerava centenas de chunks de linguagens, Mermaid e realce de sintaxe, embora o conteúdo público use apenas Markdown editorial simples.

## Estratégia

1. Substituir o renderizador Markdown pesado por um componente leve para conteúdo editorial e respostas do chat.
2. Adiar seções da homepage que estão abaixo da dobra com `IntersectionObserver` e imports dinâmicos.
3. Manter os componentes críticos do topo da página no bundle inicial para não prejudicar LCP nem navegação.
4. Comparar o build após a implementação usando a mesma metodologia.

## Resultado final

| Métrica | Antes | Depois | Redução |
|---|---:|---:|---:|
| JavaScript total gerado | 15,18 MiB | 3,41 MiB | 77,5% |
| Arquivos JavaScript | 416 | 77 | 81,5% |
| Bundle de entrada | 1.391.048 bytes | 252.252 bytes | 81,9% |
| Maior chunk | 1.391.048 bytes | 403.410 bytes | 71,0% |

O build final não contém chunks acima de 500 kB. React, camada de dados, animações e componentes de interface foram separados em arquivos estáveis e cacheáveis. Seções abaixo da dobra são requisitadas apenas quando se aproximam da viewport, enquanto o topo da homepage permanece disponível imediatamente.

## Validação

As 9 suítes Vitest foram aprovadas, totalizando 72 testes. O TypeScript concluiu sem erros e o build de produção terminou com código de saída zero. A interface foi revisada em desktop e mobile nas páginas inicial, Blog, Sobre, Contato, Agendamento, landing page de vasectomia e página educativa de engrossamento peniano.
