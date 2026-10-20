#!/usr/bin/env bash
# Cria uma versão candidata pública em um canal temporário do Firebase Hosting.
# Não publica o canal live, não troca DNS e não altera domínios personalizados.
set -euo pipefail

PROJECT_ID="${PROJECT_ID:-site-dr-felipe-bulhoes}"
REGION="${REGION:-southamerica-east1}"
SERVICE_NAME="${SERVICE_NAME:-dr-felipe-site-production}"
ASSET_BUCKET="${GCS_ASSET_BUCKET:-site-dr-felipe-bulhoes-public-2026}"
SERVICE_ACCOUNT_EMAIL="${SERVICE_ACCOUNT_EMAIL:?Defina SERVICE_ACCOUNT_EMAIL com a identidade mínima do Cloud Run.}"
IMAGE="${IMAGE:?Defina IMAGE com a imagem imutável do Artifact Registry a implantar.}"
PREVIEW_CHANNEL="${PREVIEW_CHANNEL:-production-candidate}"
MAX_INSTANCES="${MAX_INSTANCES:-20}"
MIN_INSTANCES="${MIN_INSTANCES:-0}"
CONCURRENCY="${CONCURRENCY:-80}"
TIMEOUT_SECONDS="${TIMEOUT_SECONDS:-60}"

fail() {
  printf 'Erro: %s\n' "$*" >&2
  exit 64
}

if [[ ! "$PREVIEW_CHANNEL" =~ ^[a-z0-9-]{1,63}$ ]] || [[ "$PREVIEW_CHANNEL" == "live" ]]; then
  fail "PREVIEW_CHANNEL deve ter 1–63 caracteres minúsculos, números ou hífens e não pode ser live."
fi
if [[ ! "$MAX_INSTANCES" =~ ^[1-9][0-9]*$ ]]; then
  fail "MAX_INSTANCES deve ser um inteiro positivo."
fi
if [[ ! "$MIN_INSTANCES" =~ ^[0-9]+$ ]] || (( MIN_INSTANCES > MAX_INSTANCES )); then
  fail "MIN_INSTANCES deve ser um inteiro entre 0 e MAX_INSTANCES."
fi
if [[ ! "$CONCURRENCY" =~ ^[1-9][0-9]*$ ]] || [[ ! "$TIMEOUT_SECONDS" =~ ^[1-9][0-9]*$ ]]; then
  fail "CONCURRENCY e TIMEOUT_SECONDS devem ser inteiros positivos."
fi
if [[ "${FIREBASE_PREVIEW_PUBLIC_APPROVED:-NO}" != "YES" ]]; then
  fail "A criação do preview público exige FIREBASE_PREVIEW_PUBLIC_APPROVED=YES."
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
Canal:       $PREVIEW_CHANNEL (temporário)
Escala:      $MIN_INSTANCES–$MAX_INSTANCES instâncias; concorrência $CONCURRENCY; timeout ${TIMEOUT_SECONDS}s

Este script não publica o canal live, não altera DNS e não configura domínios.
Para criar somente o preview autorizado, execute novamente com APPLY=YES.
EOF
  exit 0
fi

command -v firebase >/dev/null 2>&1 || fail "Instale a Firebase CLI antes de publicar o preview."

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

# A reescrita do Firebase Hosting exige este único acesso público no serviço;
# o bucket permanece privado e não recebe principal allUsers.
gcloud run services add-iam-policy-binding "$SERVICE_NAME" \
  --project "$PROJECT_ID" \
  --region "$REGION" \
  --member="allUsers" \
  --role="roles/run.invoker"

firebase --config firebase.production-preview.json hosting:channel:deploy "$PREVIEW_CHANNEL" \
  --project "$PROJECT_ID" \
  --expires 7d

printf '\nPreview temporário criado. Valide a URL informada pela Firebase CLI antes de qualquer publicação live ou alteração DNS.\n'
printf 'Nenhum domínio personalizado ou registro DNS foi alterado.\n'
