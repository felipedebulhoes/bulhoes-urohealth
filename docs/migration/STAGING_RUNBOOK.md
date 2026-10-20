# Runbook de staging — Firebase Hosting e Cloud Run

## Propósito e limites

Este runbook atualiza o serviço privado `dr-felipe-site-staging` no projeto `site-dr-felipe-bulhoes`, em `southamerica-east1`. A identidade de serviço já configurada é `cloud-run-site-assets`; ela deve manter apenas a leitura de objetos no bucket privado `site-dr-felipe-bulhoes-public-2026`.

O staging **não autentica usuários**: a área `/admin` e as APIs retornam respostas indisponíveis por desenho. Nenhum domínio próprio, DNS ou hospedagem atual é alterado por este procedimento.

> O Firebase Hosting só consegue reescrever para Cloud Run se o serviço aceitar invocações não autenticadas. Logo, a exposição do staging pelo subdomínio Firebase é uma mudança de superfície pública e exige autorização explícita antes da execução.

## Pré-requisitos

1. O Cloud Build entregou uma imagem imutável no Artifact Registry.
2. A conta `cloud-run-site-assets` tem somente `roles/storage.objectViewer` no bucket privado; não existe `allUsers` na política do bucket.
3. A Firebase CLI está instalada e autenticada no projeto correto (`firebase --version` e `firebase projects:list`).
4. A cópia de mídia para `gs://site-dr-felipe-bulhoes-public-2026/site-assets/` foi concluída e auditada contra `docs/migration/manus-assets.manifest.json`.
5. O comando é executado a partir da raiz do repositório e usa uma imagem por digest ou por tag imutável.

## Copiar e auditar os assets privados

O script lê exclusivamente o manifesto versionado, baixa cada recurso do host legado e compara o tamanho local ao objeto enviado. Ele é reexecutável: objetos com o mesmo tamanho são preservados, e o bucket não recebe acesso público.

```bash
# Simulação: lista a origem, o destino e a quantidade de assets, sem transferir arquivos.
./scripts/google-cloud/copy-manus-assets.sh

# Cópia efetiva e verificação por tamanho de cada objeto.
APPLY=YES ./scripts/google-cloud/copy-manus-assets.sh
```

Registre somente o resumo final (copiados, já conferidos e falhos). Não registre URLs assinadas, tokens ou cabeçalhos de autenticação.

## Atualizar somente o staging privado

```bash
export PROJECT_ID=site-dr-felipe-bulhoes
export REGION=southamerica-east1
export SERVICE_ACCOUNT_EMAIL=cloud-run-site-assets@site-dr-felipe-bulhoes.iam.gserviceaccount.com
export GCS_ASSET_BUCKET=site-dr-felipe-bulhoes-public-2026
export IMAGE=southamerica-east1-docker.pkg.dev/site-dr-felipe-bulhoes/felipe-site/site:TAG_IMUTAVEL

# Revise o plano. Nada é alterado nesta etapa.
./scripts/google-cloud/deploy-staging.sh

# Só então atualize o serviço, ainda privado.
APPLY=YES ./scripts/google-cloud/deploy-staging.sh
```

O script aplica mínimo de 0 e máximo de 20 instâncias, concorrência de 80 e timeout de 60 segundos. Ele preserva o serviço privado no fluxo normal.

## Validação do staging privado

Com uma conta que tenha `roles/run.invoker`, obtenha um token e confira os pontos críticos sem registrar dados pessoais:

```bash
SERVICE_URL="$(gcloud run services describe dr-felipe-site-staging \
  --project site-dr-felipe-bulhoes --region southamerica-east1 --format='value(status.url)')"
TOKEN="$(gcloud auth print-identity-token)"

curl -fsSI -H "Authorization: Bearer $TOKEN" "$SERVICE_URL/"
curl -fsSI -H "Authorization: Bearer $TOKEN" "$SERVICE_URL/robots.txt"
curl -fsSI -H "Authorization: Bearer $TOKEN" "$SERVICE_URL/sitemap.xml"
curl -fsSI -H "Authorization: Bearer $TOKEN" "$SERVICE_URL/local/clinovi-moema"
curl -fsSI -H "Authorization: Bearer $TOKEN" "$SERVICE_URL/manus-storage/logo-landscape-dr-felipe_cc84d4a3.svg"
```

Confirme: HTML 200; `robots.txt` e `sitemap.xml` disponíveis; rota histórica com 301 para `/consultorios`; mídia com 200 e `Content-Type` adequado; tags canonical e Open Graph no HTML. Confirme também que `/admin/social-preview` é 404 com `X-Robots-Tag` de noindex e que `/api/trpc/auth.me` é 503.

## Exposição via Firebase Hosting — somente após nova aprovação

O arquivo `firebase.json` encaminha todas as rotas do site Firebase `site-dr-felipe-bulhoes` para `dr-felipe-site-staging` e fixa a revisão (`pinTag`). Não publique essa configuração enquanto o staging deve permanecer privado.

Após uma nova aprovação explícita para tornar a URL de staging acessível publicamente, execute:

```bash
APPLY=YES \
EXPOSE_STAGING_VIA_HOSTING=YES \
FIREBASE_HOSTING_PUBLIC_APPROVED=YES \
./scripts/google-cloud/deploy-staging.sh
```

Essa etapa adiciona `allUsers` exclusivamente como `roles/run.invoker` ao **serviço** Cloud Run e executa `firebase deploy --only hosting`. Ela não altera DNS nem o domínio canônico. Valide primeiro apenas os subdomínios Firebase (`site-dr-felipe-bulhoes.web.app` e `site-dr-felipe-bulhoes.firebaseapp.com`).

## Rollback

- **Antes do Hosting:** reimplante a imagem anterior pelo mesmo script, informando a tag/digest anterior; o staging permanece privado.
- **Depois do Hosting:** execute `firebase hosting:channel:deploy` apenas para um preview se precisar investigar. Para reverter o site ativo, reimplante a configuração/revisão previamente aprovada e valide a versão fixada.
- **Em caso de exposição indevida:** remova imediatamente `allUsers` com `gcloud run services remove-iam-policy-binding ... --member=allUsers --role=roles/run.invoker`, confirme acesso HTTP 403 sem token e não toque no DNS.

## Evidências a registrar

Registre a imagem/digest, nome da revisão, URL de staging, data/hora, saída dos checks HTTP, configuração de escala, identidade de serviço e o resultado do inventário de assets. Não registre tokens, cabeçalhos de autorização, dados de formulários ou conteúdo clínico.

## Fontes oficiais

- [Firebase Hosting com Cloud Run](https://firebase.google.com/docs/hosting/cloud-run)
- [Configuração de Hosting](https://firebase.google.com/docs/hosting/full-config)
- [Identidade de serviço do Cloud Run](https://cloud.google.com/run/docs/configuring/services/service-identity)
- [IAM para objetos do Cloud Storage](https://cloud.google.com/storage/docs/access-control/iam-roles)
