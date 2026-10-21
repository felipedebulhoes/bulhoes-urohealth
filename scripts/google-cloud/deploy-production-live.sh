#!/usr/bin/env bash
# Publica somente o canal live do Firebase Hosting.
# Não recria o Cloud Run, não configura domínios e não altera DNS.
set -euo pipefail

PROJECT_ID="${PROJECT_ID:-site-dr-felipe-bulhoes}"
REGION="${REGION:-southamerica-east1}"
SERVICE_NAME="${SERVICE_NAME:-dr-felipe-site-production}"
ASSET_BUCKET="${GCS_ASSET_BUCKET:-site-dr-felipe-bulhoes-public-2026}"
SERVICE_ACCOUNT_EMAIL="${SERVICE_ACCOUNT_EMAIL:?Defina SERVICE_ACCOUNT_EMAIL com a identidade esperada do Cloud Run.}"

fail() {
  printf 'Erro: %s\n' "$*" >&2
  exit 64
}

if [[ "${FIREBASE_HOSTING_LIVE_APPROVED:-NO}" != "YES" ]]; then
  fail "A publicação live exige FIREBASE_HOSTING_LIVE_APPROVED=YES."
fi

if [[ "${APPLY:-NO}" != "YES" ]]; then
  cat <<EOF
Modo de simulação — nenhuma alteração será feita.

Projeto:     $PROJECT_ID
Região:      $REGION
Serviço:     $SERVICE_NAME
Assets:      $ASSET_BUCKET (privado)

Este script publica somente o Firebase Hosting live após validar o serviço existente.
Não recria o Cloud Run, não configura domínios e não altera DNS.
Para publicar o Hosting live autorizado, execute novamente com APPLY=YES.
EOF
  exit 0
fi

command -v firebase >/dev/null 2>&1 || fail "Instale a Firebase CLI antes de publicar o Hosting."

service_json="$(gcloud run services describe "$SERVICE_NAME" \
  --project "$PROJECT_ID" \
  --region "$REGION" \
  --format=json)"

node - "$service_json" "$SERVICE_ACCOUNT_EMAIL" "$ASSET_BUCKET" <<'NODE'
const [serviceJson, expectedServiceAccount, expectedBucket] = process.argv.slice(2);
const service = JSON.parse(serviceJson);
const annotations = service.metadata?.annotations ?? {};
const template = service.spec?.template?.spec ?? {};
const environment = template.containers?.[0]?.env ?? [];
const bucket = environment.find(entry => entry.name === "GCS_ASSET_BUCKET")?.value;
const errors = [];

if (annotations["run.googleapis.com/invoker-iam-disabled"] !== "true") {
  errors.push("a checagem de Invoker IAM não está desabilitada para o serviço de produção");
}
if (template.serviceAccountName !== expectedServiceAccount) {
  errors.push("a service account do Cloud Run não corresponde à identidade esperada");
}
if (bucket !== expectedBucket) {
  errors.push("GCS_ASSET_BUCKET não corresponde ao bucket privado esperado");
}
if (!service.status?.latestReadyRevisionName) {
  errors.push("o serviço não possui uma revisão pronta");
}

if (errors.length > 0) {
  console.error(`Erro: pré-validação do Cloud Run falhou: ${errors.join("; ")}.`);
  process.exit(64);
}

console.log(`Revisão pronta: ${service.status.latestReadyRevisionName}`);
console.log(`URL do serviço: ${service.status.url}`);
NODE

firebase deploy --only hosting --project "$PROJECT_ID"

printf '\nHosting live publicado. Valide a URL padrão do Firebase antes de mudar o domínio ou DNS.\n'
