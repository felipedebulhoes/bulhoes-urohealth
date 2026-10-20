#!/usr/bin/env bash
# Atualiza o Cloud Run de staging. Por padrão, o serviço continua privado.
# A publicação em Firebase Hosting exige duas variáveis de confirmação explícita.
set -euo pipefail

PROJECT_ID="${PROJECT_ID:-site-dr-felipe-bulhoes}"
REGION="${REGION:-southamerica-east1}"
SERVICE_NAME="${SERVICE_NAME:-dr-felipe-site-staging}"
ASSET_BUCKET="${GCS_ASSET_BUCKET:-site-dr-felipe-bulhoes-public-2026}"
SERVICE_ACCOUNT_EMAIL="${SERVICE_ACCOUNT_EMAIL:?Defina SERVICE_ACCOUNT_EMAIL com a identidade mínima do Cloud Run.}"
IMAGE="${IMAGE:?Defina IMAGE com a imagem imutável do Artifact Registry a implantar.}"
MAX_INSTANCES="${MAX_INSTANCES:-20}"
MIN_INSTANCES="${MIN_INSTANCES:-0}"
CONCURRENCY="${CONCURRENCY:-80}"
TIMEOUT_SECONDS="${TIMEOUT_SECONDS:-60}"

fail() {
  printf 'Erro: %s\n' "$*" >&2
  exit 64
}

if [[ ! "$MAX_INSTANCES" =~ ^[1-9][0-9]*$ ]]; then
  fail "MAX_INSTANCES deve ser um inteiro positivo."
fi
if [[ ! "$MIN_INSTANCES" =~ ^[0-9]+$ ]] || (( MIN_INSTANCES > MAX_INSTANCES )); then
  fail "MIN_INSTANCES deve ser um inteiro entre 0 e MAX_INSTANCES."
fi
if [[ ! "$CONCURRENCY" =~ ^[1-9][0-9]*$ ]] || [[ ! "$TIMEOUT_SECONDS" =~ ^[1-9][0-9]*$ ]]; then
  fail "CONCURRENCY e TIMEOUT_SECONDS devem ser inteiros positivos."
fi

expose_via_hosting="${EXPOSE_STAGING_VIA_HOSTING:-NO}"
if [[ "$expose_via_hosting" != "YES" && "$expose_via_hosting" != "NO" ]]; then
  fail "EXPOSE_STAGING_VIA_HOSTING aceita somente YES ou NO."
fi

if [[ "$expose_via_hosting" == "YES" && "${FIREBASE_HOSTING_PUBLIC_APPROVED:-NO}" != "YES" ]]; then
  fail "A exposição exige FIREBASE_HOSTING_PUBLIC_APPROVED=YES além de EXPOSE_STAGING_VIA_HOSTING=YES."
fi

if [[ "${APPLY:-NO}" != "YES" ]]; then
  cat <<EOF
Modo de simulação — nenhuma alteração será feita.

Projeto:     $PROJECT_ID
Região:      $REGION
Serviço:     $SERVICE_NAME
Imagem:      $IMAGE
Identidade:  $SERVICE_ACCOUNT_EMAIL
Assets:      $ASSET_BUCKET (privado)
Escala:      $MIN_INSTANCES–$MAX_INSTANCES instâncias; concorrência $CONCURRENCY; timeout ${TIMEOUT_SECONDS}s
Hosting:     $expose_via_hosting

Para atualizar apenas o staging privado, execute novamente com APPLY=YES.
A exposição pública pelo Firebase Hosting exige, adicionalmente:
  EXPOSE_STAGING_VIA_HOSTING=YES FIREBASE_HOSTING_PUBLIC_APPROVED=YES
EOF
  exit 0
fi

gcloud run deploy "$SERVICE_NAME" \
  --project "$PROJECT_ID" \
  --region "$REGION" \
  --image "$IMAGE" \
  --service-account "$SERVICE_ACCOUNT_EMAIL" \
  --set-env-vars "GCS_ASSET_BUCKET=$ASSET_BUCKET" \
  --min-instances "$MIN_INSTANCES" \
  --max-instances "$MAX_INSTANCES" \
  --concurrency "$CONCURRENCY" \
  --timeout "$TIMEOUT_SECONDS" \
  --cpu 1 \
  --memory 512Mi \
  --no-allow-unauthenticated

if [[ "$expose_via_hosting" == "YES" ]]; then
  # A reescrita do Firebase Hosting exige invocação não autenticada no Cloud Run.
  gcloud run services add-iam-policy-binding "$SERVICE_NAME" \
    --project "$PROJECT_ID" \
    --region "$REGION" \
    --member="allUsers" \
    --role="roles/run.invoker"

  command -v firebase >/dev/null 2>&1 || fail "Instale a Firebase CLI antes de publicar o Hosting."
  firebase deploy --only hosting --project "$PROJECT_ID"
fi

service_url="$(gcloud run services describe "$SERVICE_NAME" \
  --project "$PROJECT_ID" \
  --region "$REGION" \
  --format='value(status.url)')"
printf 'Serviço atualizado: %s\n' "$service_url"
printf 'Configuração efetiva:\n'
gcloud run services describe "$SERVICE_NAME" \
  --project "$PROJECT_ID" \
  --region "$REGION" \
  --format='yaml(metadata.name,status.url,spec.template.spec.serviceAccountName,spec.template.spec.containerConcurrency,spec.template.spec.timeoutSeconds,spec.template.metadata.annotations)'

if [[ "$expose_via_hosting" == "NO" ]]; then
  printf '\nO staging permanece privado. Firebase Hosting não foi publicado.\n'
else
  printf '\nFirebase Hosting publicado; valide o subdomínio Firebase antes de configurar DNS.\n'
fi
