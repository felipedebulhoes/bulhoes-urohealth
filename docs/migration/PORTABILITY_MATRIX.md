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
| `/manus-storage/<arquivo>` | `gs://<bucket-privado>/site-assets/<arquivo>` | Privada no bucket; pública somente pelo mesmo caminho do Cloud Run | Copiar com `Content-Type` e cache corretos; o Cloud Run lê via identidade de serviço e preserva a URL `/manus-storage/<arquivo>`. |
| Banners Open Graph | Mesmo bucket, prefixo `site-assets/` | Privada no bucket; acessível via URL absoluta do Cloud Run | Validar resposta 200, `1200×630`, URL absoluta e cache de Facebook/WhatsApp antes do corte. |
| Fontes, imagens, áudio e vídeo de interface | Mesmo bucket, prefixo `site-assets/` | Privada no bucket; entregue pelo Cloud Run | Preservar tipos MIME, cache e paths estáveis; evitar substituir arquivos por conteúdo diferente com o mesmo nome. |
| PDFs educativos | Mesmo bucket, prefixo `site-assets/` | Privada no bucket; disponível pelo Cloud Run quando o site já o expõe | Revisar conteúdo e `Content-Disposition`; não incluir relatórios internos ou dados pessoais. |
| Uploads futuros administrativos | Bucket privado separado ou prefixo privado | Privada | Usar conta de serviço do Cloud Run e URL assinada quando necessário; nunca permitir upload anônimo. |

## Exclusões deliberadas

- `client/public/__manus__`: scripts de depuração específicos do ambiente atual; não fazem parte do site publicado no Google Cloud.
- `node_modules`, `dist` e `.git`: dependências, build e histórico, não assets de produção.
- Segredos, credenciais, exportações de banco e dados de leads: não pertencem a um bucket de mídia e não serão incluídos no inventário.
- A política organizacional de compartilhamento restrito de domínio bloqueia `allUsers`; ela será preservada. Não tornar o bucket público é uma salvaguarda deliberada, não uma pendência.

## Controles de corte

Antes de alterar referências no código ou DNS, a versão staging deve comprovar:

1. Cada item do `manus-assets.manifest.json` possui objeto correspondente no bucket privado e retorno HTTP 200 pelo caminho `/manus-storage/` do Cloud Run.
2. A identidade do Cloud Run possui apenas `roles/storage.objectViewer` no bucket; não há principal `allUsers` na política.
3. Imagens, fontes, áudio, vídeo e PDFs respondem com `Content-Type` compatível.
4. O sitemap, canonicals e todas as metas Open Graph usam o domínio canônico planejado.
5. O site atual continua em operação e pode ser usado como reversão.

## Limite de escopo

O manifesto cataloga **somente referências públicas no código**. Ele não é uma autorização para copiar arquivos ou migrar dados. A criação do bucket, a cópia de arquivos e a publicação em staging dependem da configuração aprovada do projeto Google Cloud e de uma confirmação específica para habilitar faturamento.
