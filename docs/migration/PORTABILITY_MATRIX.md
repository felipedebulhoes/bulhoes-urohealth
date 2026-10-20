# Inventário de portabilidade de mídia

Este documento organiza a substituição segura dos recursos públicos hoje servidos pelo caminho `/manus-storage/`. Ele não move arquivos nem altera URLs públicas; isso só ocorrerá na etapa de staging, após a aprovação de faturamento.

## Fonte de verdade gerada

Execute o inventário com:

```bash
node scripts/google-cloud/inventory-manus-assets.mjs
```

O comando produz [`manus-assets.manifest.json`](./manus-assets.manifest.json), ordenado de forma determinística. Cada item identifica o arquivo, seu tipo, os arquivos-fonte que o usam e o objeto planejado no Cloud Storage.

## Mapeamento planejado

| Origem atual | Destino planejado | Visibilidade | Regra de migração |
|---|---|---|---|
| `/manus-storage/<arquivo>` | `gs://<bucket-publico>/public/<arquivo>` | Pública, somente leitura | Copiar com `Content-Type` correto e cache versionado; manter o nome durante a transição. |
| Banners Open Graph | Mesmo bucket, prefixo `public/` | Pública | Validar resposta 200, `1200×630`, URL absoluta e cache de Facebook/WhatsApp antes do corte. |
| Fontes, imagens, áudio e vídeo de interface | Mesmo bucket, prefixo `public/` | Pública | Preservar CORS para carregamento do site e evitar substituir arquivos por conteúdo diferente com o mesmo nome. |
| PDFs educativos | Mesmo bucket, prefixo `public/` | Pública quando a página já os expõe | Revisar conteúdo e cabeçalho `Content-Disposition`; não incluir relatórios internos ou dados pessoais. |
| Uploads futuros administrativos | Bucket privado separado ou prefixo privado | Privada | Usar conta de serviço do Cloud Run e URL assinada quando necessário; nunca permitir upload anônimo. |

## Exclusões deliberadas

- `client/public/__manus__`: scripts de depuração específicos do ambiente atual; não fazem parte do site publicado no Google Cloud.
- `node_modules`, `dist` e `.git`: dependências, build e histórico, não assets de produção.
- Segredos, credenciais, exportações de banco e dados de leads: não pertencem a um bucket de mídia e não serão incluídos no inventário.

## Controles de corte

Antes de alterar referências no código ou DNS, a versão staging deve comprovar:

1. Cada item do `manus-assets.manifest.json` possui objeto correspondente no bucket e retorno HTTP 200.
2. Imagens, fontes, áudio, vídeo e PDFs respondem com `Content-Type` compatível.
3. O sitemap, canonicals e todas as metas Open Graph usam o domínio canônico planejado.
4. O site atual continua em operação e pode ser usado como reversão.

## Limite de escopo

O manifesto cataloga **somente referências públicas no código**. Ele não é uma autorização para copiar arquivos ou migrar dados. A criação do bucket, a cópia de arquivos e a publicação em staging dependem da configuração aprovada do projeto Google Cloud e de uma confirmação específica para habilitar faturamento.
