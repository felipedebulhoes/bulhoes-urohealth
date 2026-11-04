# Publicação automática do site (sem Cloud Shell)

Depois desta configuração, **todo merge na branch `main` publica o site sozinho**
em felipebulhoes.com, em cerca de 5 a 10 minutos. O arquivo que define o
processo é [`cloudbuild.deploy.yaml`](../cloudbuild.deploy.yaml).

O que acontece a cada merge:

1. O Cloud Build monta a imagem do site a partir do commit.
2. Cria uma revisão nova no Cloud Run `dr-felipe-site-production`. Identidade,
   variáveis e escala continuam as mesmas; só a imagem muda.
3. Testa a revisão nova (página inicial deve responder 200 e `/instagram`, 302).
   **Se o teste falhar, o processo para e o domínio continua na versão
   anterior** — o Firebase Hosting só troca de versão no passo seguinte.
4. Publica o Firebase Hosting live, que passa a servir a versão nova.

Nada disso altera DNS, domínios, permissões ou buckets.

## Configuração única (pelo navegador, ~15 minutos)

Faça com a conta dona do projeto `site-dr-felipe-bulhoes`, em
<https://console.cloud.google.com>.

### 1. Conta de serviço do deploy

1. **IAM e administrador → Contas de serviço → Criar conta de serviço**.
2. Nome: `cloud-build-deploy`. Clique em **Criar e continuar**.
3. Adicione estes papéis e conclua:
   - Desenvolvedor do Cloud Run (`roles/run.developer`)
   - Gravador do Artifact Registry (`roles/artifactregistry.writer`)
   - Administrador do Firebase Hosting (`roles/firebasehosting.admin`)
   - Gravador de registros (`roles/logging.logWriter`)
   - Consumidor do Service Usage (`roles/serviceusage.serviceUsageConsumer`)
4. Ainda em **Contas de serviço**, abra a conta que o Cloud Run usa hoje
   (aparece em **Cloud Run → dr-felipe-site-production → Segurança**). Na aba
   **Principais com acesso → Conceder acesso**, adicione
   `cloud-build-deploy@site-dr-felipe-bulhoes.iam.gserviceaccount.com` com o
   papel **Usuário da conta de serviço** (`roles/iam.serviceAccountUser`).
   Isso permite ao deploy criar revisões que rodam com a mesma identidade.

### 2. Conectar o GitHub

1. **Cloud Build → Repositórios (2ª geração) → Criar conexão do host**.
2. Provedor **GitHub**, região **southamerica-east1**. Autorize o app do Google
   Cloud no GitHub e selecione o repositório `felipedebulhoes/bulhoes-urohealth`.
3. Em **Vincular repositório**, escolha `bulhoes-urohealth`.

### 3. Criar o gatilho

1. **Cloud Build → Gatilhos → Criar gatilho** (região southamerica-east1).
2. Nome: `deploy-producao`.
3. Evento: **Enviar para uma branch**; branch: `^main$`.
4. Configuração: **Arquivo de configuração do Cloud Build**, local
   **Repositório**, caminho `cloudbuild.deploy.yaml`.
5. Conta de serviço: `cloud-build-deploy@site-dr-felipe-bulhoes.iam.gserviceaccount.com`.
6. Salve. Para testar na hora, clique em **Executar** ao lado do gatilho.

## Acompanhar e desfazer

- **Andamento:** Cloud Build → Histórico. Cada execução mostra os 5 passos;
  um passo vermelho indica onde parou e por quê.
- **Desfazer uma publicação:** Firebase console → Hosting → Histórico de
  lançamentos → na versão anterior, **Reverter**. O domínio volta à revisão
  anterior em segundos.

## Atenção

Qualquer commit que chegue à `main` será publicado, inclusive os feitos por
outras ferramentas (ex.: checkpoints do Manus, se estiverem configurados para
enviar à `main`). Faça alterações por pull request e só faça o merge do que
estiver pronto para ir ao ar.
