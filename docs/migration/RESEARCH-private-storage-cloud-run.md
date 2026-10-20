# Pesquisa: Cloud Storage privado via Cloud Run

A implementação de mídia não usa um bucket público. Ela preserva a política organizacional de compartilhamento restrito de domínio e entrega os objetos pelo caminho público do Cloud Run.

- A documentação do Cloud Storage informa que a leitura de objetos requer `roles/storage.objectViewer` e que as bibliotecas cliente usam Application Default Credentials: <https://docs.cloud.google.com/storage/docs/downloading-objects>
- A documentação do Cloud Run descreve a identidade de serviço como a conta autenticada usada pelo container para acessar APIs do Google Cloud: <https://docs.cloud.google.com/run/docs/configuring/services/service-identity>
- A documentação do Cloud Run confirma que a identidade de serviço precisa de `roles/storage.objectViewer` para leitura no Cloud Storage: <https://docs.cloud.google.com/run/docs/configuring/services/cloud-storage-volume-mounts>

Decisão de arquitetura: objetos em `gs://site-dr-felipe-bulhoes-public-2026/site-assets/<arquivo>` permanecem privados. O runtime recebe `GCS_ASSET_BUCKET=site-dr-felipe-bulhoes-public-2026` e usa sua própria identidade para responder em `/manus-storage/<arquivo>`, mantendo os URLs existentes e sem conceder `allUsers` ao bucket.
