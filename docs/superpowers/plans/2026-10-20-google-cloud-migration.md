# Migração Google Cloud do Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrar o site para Firebase Hosting, Cloud Run, Cloud Storage e Cloud SQL sem interrupção pública e sem expor dados pessoais.

**Architecture:** O Firebase Hosting será o endpoint CDN/TLS e encaminhará conteúdo dinâmico ao Cloud Run. O Cloud Run executará uma entrada Node portátil; Cloud Storage substituirá a mídia atualmente servida por `/manus-storage/` e Cloud SQL assumirá a persistência MySQL. A implantação será realizada primeiro em staging e somente passará ao domínio após confirmação de faturamento e DNS.

**Tech Stack:** React 19, Vite 7, TypeScript, Express 4, tRPC 11, Drizzle/MySQL, Firebase Hosting, Cloud Run, Cloud Build, Artifact Registry, Cloud Storage, Cloud SQL e Secret Manager.

**Spec:** `docs/migration/SPEC-google-cloud-migration.md`

## Global Constraints
- Preservar `https://felipebulhoes.com` como origem canônica e todos os redirecionamentos existentes.
- Não migrar dados pessoais/administrativos nem criar Cloud SQL sem nova confirmação explícita.
- Não associar cobrança, alterar DNS, criar recursos pagos ou desligar a hospedagem atual sem nova confirmação explícita.
- Não versionar segredos, exportações de banco ou credenciais de serviços.
- Usar `southamerica-east1` quando o recurso suportar a região e configurar teto de instâncias no Cloud Run.

## Review Focus
- Rotas crawleadas: `200`, `301`, `404`, canonical, sitemap e robots devem manter o comportamento atual.
- Mídia: todo recurso de `/manus-storage/` deve ter destino declarado antes da troca de origem.
- Admin: rota administrativa não pode ficar exposta após retirar o OAuth atual.
- Dados pessoais: tabelas de leads e logs não podem ser copiadas sem revisão de privacidade.
- Reversão: DNS e hospedagem antiga devem permanecer utilizáveis até a aceitação pós-migração.

---

### Task 1: Matriz de portabilidade e inventário de mídia

**Files:**
- Create: `docs/migration/PORTABILITY_MATRIX.md`
- Create: `scripts/google-cloud/inventory-manus-assets.mjs`
- Test: `server/site.integrity.test.ts`

**Interfaces:**
- Produces: JSON com cada caminho `/manus-storage/`, consumidor, tipo e destino Cloud Storage.
- Consumes: código fonte, `shared/pageMetadata.ts` e diretórios de assets externos.

- [ ] **Step 1:** Escrever teste que exige manifesto para URLs estáticas de mídia pública.
- [ ] **Step 2:** Executar o teste e confirmar falha antes do script.
- [ ] **Step 3:** Implementar o inventário, excluindo assets de debug e dados privados.
- [ ] **Step 4:** Executar o teste, `pnpm check` e `pnpm test`.
- [ ] **Step 5:** Commit: `docs: inventaria dependências para migração Google Cloud`.

### Task 2: Runtime portável e container

**Files:**
- Create: `Dockerfile`
- Create: `cloudbuild.yaml`
- Create: `server/production.ts`
- Modify: `package.json`
- Modify: `.dockerignore`
- Test: `server/production.test.ts`

**Interfaces:**
- Produces: `pnpm start:portable` que escuta `PORT` e inicia o servidor de produção sem Forge, OAuth interno ou proxy de mídia.
- Consumes: build em `dist/`, configuração por variáveis e handlers SEO portáveis.

- [ ] **Step 1:** Escrever testes para a inicialização sem variáveis internas da plataforma e para respostas SEO.
- [ ] **Step 2:** Executar testes e confirmar falha antes da entrada portátil.
- [ ] **Step 3:** Implementar servidor portátil e Dockerfile multi-stage com usuário não-root.
- [ ] **Step 4:** Construir imagem localmente e testar `GET /`, uma rota 301 e uma 404.
- [ ] **Step 5:** Executar `pnpm check && pnpm test && pnpm build`.
- [ ] **Step 6:** Commit: `feat: prepara runtime portável para Cloud Run`.

### Task 3: Armazenamento Google e caminhos de mídia

**Files:**
- Create: `server/cloudStorage.ts`
- Modify: `server/storage.ts`
- Modify: componentes e metadados afetados pelo inventário
- Create: `scripts/google-cloud/migrate-public-assets.mjs`
- Test: `server/storage.test.ts`

**Interfaces:**
- Produces: adaptador de mídia selecionado por `STORAGE_BACKEND=google|manus`, com URLs públicas versionadas.
- Consumes: `GCS_BUCKET`, `GOOGLE_APPLICATION_CREDENTIALS` em desenvolvimento ou credencial de runtime no Cloud Run.

- [ ] **Step 1:** Escrever testes unitários para URL pública, tipo MIME e falha sem configuração.
- [ ] **Step 2:** Implementar adaptador e compatibilidade controlada durante staging.
- [ ] **Step 3:** Executar inventário e validar que não restam referências sem destino.
- [ ] **Step 4:** Executar toda a suíte e build.
- [ ] **Step 5:** Commit: `feat: adiciona adaptador de mídia para Cloud Storage`.

### Task 4: Configuração Firebase/Cloud Run e staging

**Files:**
- Create: `firebase.json`
- Create: `.firebaserc.example`
- Create: `scripts/google-cloud/deploy-staging.sh`
- Create: `docs/migration/STAGING_RUNBOOK.md`
- Test: `server/site.integrity.test.ts`

**Interfaces:**
- Produces: deploy staging reproduzível por `PROJECT_ID`, `REGION` e imagem de commit.
- Consumes: projeto criado manualmente, faturamento aprovado, APIs habilitadas e segredos configurados.

- [ ] **Step 1:** Criar configuração Hosting com reescrita para Cloud Run e cache seguro.
- [ ] **Step 2:** Configurar teto de instâncias, conta de serviço mínima e Secret Manager.
- [ ] **Step 3:** Publicar somente staging e rodar uma matriz HTTP/SEO/asset/analytics.
- [ ] **Step 4:** Registrar evidências e rollback no runbook.
- [ ] **Step 5:** Commit: `chore: adiciona fluxo de staging Google Cloud`.

### Task 5: Banco, autenticação administrativa e produção

**Files:**
- Create: `docs/migration/DATA_AND_ADMIN_DECISION.md`
- Modify: módulo de autenticação conforme decisão aprovada
- Modify: configuração de banco conforme decisão aprovada
- Test: testes de autenticação e banco aplicáveis

**Interfaces:**
- Produces: decisão documentada de migração de dados e substituição segura de OAuth administrativo.
- Consumes: confirmação de faturamento e escolha de mecanismo de autenticação administrativa.

- [ ] **Step 1:** Revisar tabelas e classificar dados: público, operacional ou pessoal.
- [ ] **Step 2:** Apresentar escopo de dados e mecanismo de admin para aprovação explícita.
- [ ] **Step 3:** Provisionar Cloud SQL e Secret Manager somente após aprovação.
- [ ] **Step 4:** Migrar esquema/dados aprovados, validar rollback e negar admin não autenticado.
- [ ] **Step 5:** Executar testes, build e revisão de segurança.
- [ ] **Step 6:** Commit: `feat: migra persistência e acesso administrativo para Google Cloud`.

### Task 6: Corte de domínio e estabilização

**Files:**
- Create: `docs/migration/CUTOVER_CHECKLIST.md`
- Test: scripts de smoke test

**Interfaces:**
- Produces: checklist de DNS, validação de domínio e rollback.
- Consumes: staging aprovado e confirmação explícita de DNS.

- [ ] **Step 1:** Configurar domínio no modo avançado do Firebase e concluir TXT/SSL sem mover tráfego.
- [ ] **Step 2:** Solicitar confirmação com os registros DNS exatos e janela de corte.
- [ ] **Step 3:** Atualizar A/AAAA/CNAME após confirmação, mantendo a versão anterior disponível.
- [ ] **Step 4:** Validar HTTP, HTTPS, SEO, Open Graph, formulários, pixels permitidos e analytics no domínio.
- [ ] **Step 5:** Manter observação e plano de rollback antes de qualquer desligamento.
- [ ] **Step 6:** Commit: `docs: registra corte controlado para Firebase Hosting`.
