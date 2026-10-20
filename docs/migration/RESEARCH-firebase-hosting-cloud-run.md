# Pesquisa: Firebase Hosting com Cloud Run

## Decisão validada

A configuração de Firebase Hosting pode reescrever todas as rotas para um serviço Cloud Run em `southamerica-east1`. Para receber requisições do Hosting, o serviço Cloud Run precisa aceitar invocações não autenticadas. Por esse motivo, o staging atual, que permanece privado, não é publicado pelo Firebase Hosting sem uma aprovação adicional explícita.

A configuração usa `pinTag: true` para alinhar uma versão de Hosting à revisão específica do Cloud Run no momento do deploy. A documentação alerta que esse recurso cria tags de revisão e tem limites por serviço/região; ele deve ser usado em implantações controladas e acompanhado no rollback.

## Fonte oficial

- Firebase — *Serve dynamic content and host microservices with Cloud Run*: <https://firebase.google.com/docs/hosting/cloud-run> (consultado em 2026-10-20; atualizado pela fonte em 2026-10-13 UTC).
  - Lista `southamerica-east1` entre as regiões compatíveis com reescritas do Firebase Hosting para Cloud Run.
  - Instrui permitir invocações não autenticadas no Cloud Run antes de configurar a reescrita.
  - Documenta o comportamento de `pinTag` e o limite de 60 segundos para requisições via Hosting.

## Aplicação ao projeto

- Projeto: `site-dr-felipe-bulhoes`.
- Serviço de staging existente: `dr-felipe-site-staging` em `southamerica-east1`.
- Staging atual: privado, com 0–20 instâncias e identidade `cloud-run-site-assets`.
- Sem domínio próprio, DNS ou serviço de produção nesta etapa.
