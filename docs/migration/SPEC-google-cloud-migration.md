# Especificação: Migração do site para Firebase Hosting e Cloud Run

## Objetivo
Hospedar o site público do Dr. Felipe de Bulhões na infraestrutura Google administrada por `contato@felipebulhoes.com`, preservando URLs canônicas, SEO server-side, Open Graph, redirecionamentos, formulários, dados administrativos e continuidade do site atual. A mudança pública de domínio só ocorrerá após validação em ambiente de teste e confirmação explícita para DNS.

## Arquitetura
Firebase Hosting será a camada de CDN, TLS e domínio próprio. Cloud Run hospedará o servidor Node/Express, incluindo injeção server-side de metadados, tRPC, redirecionamentos e o proxy de mídia `/manus-storage/`. Cloud SQL for MySQL substituirá o banco atual. Cloud Storage permanecerá privado e será lido pela identidade de serviço do Cloud Run; segredos irão ao Secret Manager.

## Estado atual e lacunas de portabilidade
- O servidor de produção é iniciado por `server/_core/index.ts`, que depende de OAuth, Forge APIs e storage internos da plataforma atual.
- Há recursos estáticos e Open Graph em `/manus-storage/` e um upload server-side dependente de `BUILT_IN_FORGE_API_*`.
- O banco usa MySQL/Drizzle e contém dados administrativos e de leads; alguns campos podem conter dados pessoais. Não migrar dados de pacientes sem revisão de minimização, retenção e base legal LGPD.
- A área administrativa atual usa OAuth da plataforma. Ela não pode permanecer dependente desse provedor depois da saída; a primeira versão externa será protegida por alternativa compatível (Identity Platform/Google IAP ou acesso administrativo removido temporariamente), a definir antes de liberar a rota.

## Escopo da primeira migração
1. Criar configuração de container Cloud Run e pipeline reproduzível de build.
2. Separar configuração de produção de dependências exclusivas da plataforma.
3. Inventariar e migrar mídias públicas ao Cloud Storage, preservando caminhos/URLs planejados para SEO.
4. Provisionar, após aprovação de faturamento, projeto Google Cloud, Firebase Hosting, Cloud Run, Secret Manager, Cloud Storage e Cloud SQL.
5. Publicar staging e validar rotas, 301, 404, robots, sitemap, canonicals, Open Graph, formulário, GA4/GTM e desempenho.
6. Conectar domínio pela configuração avançada do Firebase, depois de confirmação explícita para o DNS.

## Fora de escopo inicial
- Reescrever a interface ou mudar a identidade visual.
- Trocar conteúdo clínico, campanhas, tags de marketing ou domínio canônico.
- Expor dados de leads ou dados sensíveis em logs, buckets públicos ou repositório.
- Desativar a hospedagem atual antes da janela de estabilização pós-migração.

## Comandos
- Verificação: `pnpm check && pnpm test && pnpm build`
- Build de container: `gcloud builds submit --tag REGION-docker.pkg.dev/PROJECT_ID/site/site:COMMIT_SHA`
- Staging Cloud Run: `gcloud run deploy SERVICE --image IMAGE --region southamerica-east1 --no-allow-unauthenticated`
- Produção Cloud Run: `gcloud run deploy SERVICE --image IMAGE --region southamerica-east1 --no-invoker-iam-check` quando a política de compartilhamento por domínio bloquear `allUsers`
- Hosting: `firebase deploy --only hosting --project PROJECT_ID`

## Segurança e privacidade
- Sempre: segredos apenas em Secret Manager; bucket de mídia privado sem principal `allUsers`; identidade do Cloud Run com apenas `roles/storage.objectViewer`; princípio de menor privilégio no IAM; logs sem dados clínicos livres.
- Perguntar antes: associar faturamento, criar Cloud SQL, migrar tabelas/dados, liberar Cloud Run publicamente, trocar DNS e desligar a hospedagem atual.
- Nunca: versionar `.env`, credenciais, exportação de banco ou dados pessoais no Git; apontar domínio público para staging; expor `/admin` sem autenticação substituta.

## Critérios de sucesso
- A versão staging responde HTTPS e entrega o mesmo conteúdo público, metatags e códigos HTTP esperados.
- Recursos de mídia carregam via Cloud Storage/Firebase, sem depender de `/manus-storage/` da hospedagem anterior.
- Serviço Cloud Run escala para zero fora do tráfego e possui limite máximo de instâncias definido.
- Orçamento/alertas são configurados antes de tráfego de produção.
- O domínio principal mantém HTTPS, canonicals e redirecionamentos corretos após a migração.
- A hospedagem atual permanece como reversão até aprovação explícita para desligamento.

## Fontes oficiais
- Firebase e Google Cloud usam o mesmo projeto e faturamento: https://firebase.google.com/docs/projects/learn-more
- Firebase Hosting pode encaminhar conteúdo dinâmico para Cloud Run: https://firebase.google.com/docs/hosting/cloud-run
- Configuração de domínio com modo avançado sem downtime: https://firebase.google.com/docs/hosting/custom-domain
- Modelo de custos e franquia do Cloud Run: https://cloud.google.com/run/pricing
- Orçamentos e alertas do Google Cloud: https://cloud.google.com/billing/docs/how-to/budgets
