#!/usr/bin/env bash
# Copia somente os assets listados no manifesto do site para um bucket privado.
# Por padrão, opera em modo de simulação. Use APPLY=YES para efetivar a cópia.
set -euo pipefail

PROJECT_ID="${PROJECT_ID:-site-dr-felipe-bulhoes}"
ASSET_BUCKET="${GCS_ASSET_BUCKET:-site-dr-felipe-bulhoes-public-2026}"
SOURCE_ORIGIN="${LEGACY_ASSET_ORIGIN:-https://felipebulhoes.com}"
MANIFEST_PATH="${MANIFEST_PATH:-docs/migration/manus-assets.manifest.json}"
CACHE_CONTROL="${ASSET_CACHE_CONTROL:-public, max-age=31536000, immutable}"

fail() {
  printf 'Erro: %s\n' "$*" >&2
  exit 64
}

[[ -f "$MANIFEST_PATH" ]] || fail "Manifesto não encontrado: $MANIFEST_PATH"
command -v node >/dev/null 2>&1 || fail "Node.js é necessário para ler o manifesto."
manifest_absolute_path="$(node -e 'console.log(require("node:path").resolve(process.argv[1]))' "$MANIFEST_PATH")"

if [[ "${APPLY:-NO}" != "YES" ]]; then
  count="$(node -e 'console.log(require(process.argv[1]).assets.length)' "$manifest_absolute_path")"
  cat <<EOF
Modo de simulação — nenhum arquivo será baixado ou enviado.

Projeto:     $PROJECT_ID
Origem:      $SOURCE_ORIGIN/manus-storage/
Bucket:      gs://$ASSET_BUCKET/site-assets/ (privado)
Manifesto:   $MANIFEST_PATH
Assets:      $count

Para efetivar a cópia auditável, execute novamente com APPLY=YES.
EOF
  exit 0
fi

command -v curl >/dev/null 2>&1 || fail "curl é necessário para obter os assets legados."
command -v gsutil >/dev/null 2>&1 || fail "gsutil é necessário para copiar ao Cloud Storage."

source_origin="${SOURCE_ORIGIN%/}"
temp_dir="$(mktemp -d)"
trap 'rm -rf "$temp_dir"' EXIT

content_type_for() {
  case "$1" in
    *.svg) printf 'image/svg+xml' ;;
    *.webp) printf 'image/webp' ;;
    *.jpg|*.jpeg) printf 'image/jpeg' ;;
    *.png) printf 'image/png' ;;
    *.mp3) printf 'audio/mpeg' ;;
    *.mp4) printf 'video/mp4' ;;
    *.pdf) printf 'application/pdf' ;;
    *.ttf) printf 'font/ttf' ;;
    *) printf 'application/octet-stream' ;;
  esac
}

copied=0
skipped=0
failed=0

while IFS=$'\t' read -r key object_path; do
  [[ -n "$key" && -n "$object_path" ]] || continue
  source_url="$source_origin/manus-storage/$key"
  destination="gs://$ASSET_BUCKET/$object_path"
  local_file="$temp_dir/$key"
  content_type="$(content_type_for "$key")"

  printf 'Verificando %s\n' "$key"
  if ! curl -fL --retry 2 --connect-timeout 20 --max-time 180 "$source_url" --output "$local_file"; then
    printf 'Falha ao obter %s\n' "$key" >&2
    failed=$((failed + 1))
    continue
  fi

  local_bytes="$(wc -c < "$local_file" | tr -d '[:space:]')"
  remote_bytes="$(gsutil du "$destination" 2>/dev/null | awk 'NR == 1 { print $1 }' || true)"
  if [[ "$remote_bytes" == "$local_bytes" ]]; then
    printf 'Já conferido: %s (%s bytes)\n' "$key" "$local_bytes"
    skipped=$((skipped + 1))
    continue
  fi

  gsutil \
    -h "Content-Type:$content_type" \
    -h "Cache-Control:$CACHE_CONTROL" \
    cp "$local_file" "$destination"

  verified_bytes="$(gsutil du "$destination" | awk 'NR == 1 { print $1 }')"
  if [[ "$verified_bytes" != "$local_bytes" ]]; then
    printf 'Tamanho divergente após envio: %s (origem=%s, destino=%s)\n' "$key" "$local_bytes" "$verified_bytes" >&2
    failed=$((failed + 1))
    continue
  fi

  printf 'Copiado e verificado: %s (%s bytes)\n' "$key" "$local_bytes"
  copied=$((copied + 1))
done < <(node -e 'for (const asset of require(process.argv[1]).assets) console.log(`${asset.key}\t${asset.plannedCloudStorageObject}`)' "$manifest_absolute_path")

printf '\nResumo: %s copiados, %s já conferidos, %s falhos.\n' "$copied" "$skipped" "$failed"
if (( failed > 0 )); then
  exit 1
fi

printf 'Cópia concluída. O bucket segue privado; a mídia será entregue somente pelo Cloud Run autenticado.\n'
