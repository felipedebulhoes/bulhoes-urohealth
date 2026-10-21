# Plano de lançamento em produção — Site Dr. Felipe de Bulhões

**Estado de referência:** 20 de outubro de 2026. Este plano parte do staging privado validado em Cloud Run: revisão `dr-felipe-site-staging-00002-x2h`, imagem do commit `98606eaf`, 43 assets no bucket privado e bloqueio intencional de `/admin` e `/api`.

O domínio canônico já definido no código é `https://felipebulhoes.com`. Nenhuma ação deve ser realizada sobre `drfelipebulhoes.com.br`, pois não há autorização para esse domínio.

## Decisão de arquitetura para produção

O caminho mais simples, compatível com a arquitetura já criada e de menor custo operacional é:

```text
Visitante
  → Firebase Hosting: CDN, TLS e domínio canônico
  → Cloud Run de produção: HTML, SEO server-side, redirects e /manus-storage/*
  → Cloud Storage privado: assets lidos pela service account do Cloud Run
```

A produção deve usar um serviço separado, por exemplo `dr-felipe-site-production`, e não reutilizar o serviço de staging. Isso permite validar uma imagem imutável, preservar a revisão de staging como referência e fazer rollback sem misturar ambientes.

Há uma consequência importante: o Firebase Hosting exige que o serviço Cloud Run usado em uma reescrita aceite invocações não autenticadas. Como este projeto usa compartilhamento restrito por domínio, a produção desabilita a checagem de Invoker IAM no **serviço Cloud Run de produção**, em vez de tentar conceder `roles/run.invoker` a `allUsers`. Esse é o método recomendado pelo Cloud Run nessa situação. Isso não torna o bucket público, não altera a service account e não libera `/admin` nem `/api`, que já são bloqueados pelo runtime portátil. A URL direta do Cloud Run também ficará acessível publicamente; para escondê-la de modo rígido seria necessário trocar para uma arquitetura com balanceador de carga, mais complexa e potencialmente mais cara. [Acesso público sem autenticação no Cloud Run](https://cloud.google.com/run/docs/authenticating/public)

## Bloqueador de compliance antes de expor a produção

O formulário de contato atual chama `fireFormConversionEvents()`, que envia email e telefone como `user_data` para Conversões Otimizadas do Google Ads. Em um site médico, esse envio é associado à solicitação de atendimento e, portanto, à categoria sensível de saúde. A política do Google Ads proíbe usar conversões relacionadas a informações de saúde ou serviços médicos em Conversões Otimizadas, mesmo que os identificadores sejam submetidos com hash. Consentimento do usuário não remove essa proibição de categoria. [Política de dados do cliente do Google Ads](https://support.google.com/google-ads/answer/7475709?hl=en)

Antes do lançamento público, removeremos o envio de email e telefone para `user_data` e manteremos apenas eventos sem dados pessoais, como clique em WhatsApp, telefone e Doctoralia. Também será necessário auditar e implementar um banner de consentimento com Consent Mode: o padrão de consentimento deve ser aplicado antes de qualquer `config` ou `event`, e a escolha deve ser persistida e atualizada quando o visitante a alterar. [Guia oficial do Consent Mode](https://developers.google.com/tag-platform/security/guides/consent)

Esse ajuste é uma mudança de código e de mensuração, mas não publica o site nem altera DNS. Deve ser feito, testado e aprovado antes de abrir qualquer URL pública de produção.

## Sequência segura para produção

### 1. Preparação privada

1. Criar um alerta de orçamento limitado ao projeto `site-dr-felipe-bulhoes`, com avisos para o responsável em 50%, 80%, 90% e 100% do teto mensal escolhido. Um orçamento de alerta não interrompe gastos automaticamente; ele apenas notifica. [Orçamentos e alertas do Google Cloud](https://cloud.google.com/billing/docs/how-to/budgets)
2. Corrigir a implementação de Conversões Otimizadas e implementar Consent Mode, conforme o bloqueador de compliance.
3. Executar no repositório: `pnpm check`, `pnpm test`, `pnpm build:portable` e `git diff --check`.
4. Gerar uma imagem nova, identificada por commit SHA ou digest, no Artifact Registry.
5. Implantar essa imagem em um novo serviço Cloud Run de produção com a service account `cloud-run-site-assets@site-dr-felipe-bulhoes.iam.gserviceaccount.com`, `GCS_ASSET_BUCKET=site-dr-felipe-bulhoes-public-2026`, mínimo de zero instâncias, máximo de 20, concorrência 80 e timeout de 60 segundos.
6. Confirmar que o bucket segue sem `allUsers` e que a service account mantém somente `roles/storage.objectViewer` no bucket.

Nessa etapa o serviço de produção deve permanecer privado para revisão final autenticada. A área administrativa e a API continuam indisponíveis por desenho até que exista uma substituição segura para a autenticação atual e uma estratégia aprovada para CRM/dados.

### 2. Preview público controlado pelo Firebase

Após autorização explícita para tornar a versão candidata acessível publicamente:

1. Usar `firebase.production-preview.json`, que reescreve apenas o canal temporário para `dr-felipe-site-production`, com `region: southamerica-east1` e `pinTag: true`. O `firebase.json` do canal live não é alterado nesta fase.
2. Desabilitar a checagem de Invoker IAM somente no serviço de produção, pois o Firebase precisa invocá-lo para servir o canal temporário. O bucket de assets continua privado; nenhum binding `allUsers` é usado.
3. Publicar primeiro o canal `production-candidate`, válido por sete dias, pelo script guardado abaixo. A Firebase CLI devolve uma URL temporária `web.app`; ela deve ser validada antes do canal live.

```bash
git pull --ff-only user_github main
export PROJECT_ID=site-dr-felipe-bulhoes
export REGION=southamerica-east1
export SERVICE_ACCOUNT_EMAIL=cloud-run-site-assets@site-dr-felipe-bulhoes.iam.gserviceaccount.com
export GCS_ASSET_BUCKET=site-dr-felipe-bulhoes-public-2026
export IMAGE=southamerica-east1-docker.pkg.dev/site-dr-felipe-bulhoes/felipe-site/site:COMMIT_SHA

APPLY=YES FIREBASE_PREVIEW_PUBLIC_APPROVED=YES \
  ./scripts/google-cloud/deploy-production-preview.sh
```

O script não aceita o canal `live`, não executa publicação live do Firebase Hosting e não altera DNS ou domínios personalizados. Ele solicita explicitamente a imagem imutável a implantar, mantém o serviço de staging intacto e imprime a URL temporária ao final.

4. Verificar que o `pinTag` fixa a versão de Hosting à revisão Cloud Run correspondente. O mecanismo também permite rollback coordenado, mas mantém limites de tags que devem ser monitorados em ciclos de release. [Configuração de Hosting](https://firebase.google.com/docs/hosting/full-config)

A região `southamerica-east1` é compatível com rewrites do Firebase Hosting para Cloud Run. O Hosting impõe timeout de 60 segundos às requisições encaminhadas, que é compatível com o site público atual. [Firebase Hosting com Cloud Run](https://firebase.google.com/docs/hosting/cloud-run)

### 3. Publicação nas URLs padrão do Firebase

Com o preview aprovado, publicar o canal live do Firebase Hosting. Isso libera somente as URLs padrão, como `site-dr-felipe-bulhoes.web.app` e `site-dr-felipe-bulhoes.firebaseapp.com`. Ainda não há mudança de DNS nem de tráfego do domínio atual.

Manter a hospedagem atual funcionando como rollback enquanto a versão Firebase é observada. Não desligar a hospedagem atual nesta fase.

Usar `scripts/google-cloud/deploy-production-live.sh` com `APPLY=YES FIREBASE_HOSTING_LIVE_APPROVED=YES`. Antes de publicar, ele verifica a revisão pronta do serviço `dr-felipe-site-production`, a identidade `cloud-run-site-assets`, o bucket privado esperado e a anotação `run.googleapis.com/invoker-iam-disabled: true`. O script não faz deploy de container, não configura domínios e não altera registros DNS.

## Domínio personalizado e DNS

A configuração recomendada preserva o canônico atual:

- `felipebulhoes.com` como domínio principal e canônico;
- `www.felipebulhoes.com` redirecionando permanentemente para o domínio principal;
- nenhum uso de `drfelipebulhoes.com.br` sem nova autorização específica.

No Firebase Console, em **Hosting → site `site-dr-felipe-bulhoes` → Add custom domain**, adicionar primeiro `felipebulhoes.com` e escolher **Advanced Setup**. Esse modo prepara a titularidade e o certificado SSL antes de deslocar tráfego, preservando a hospedagem atual durante a preparação. [Domínio personalizado no Firebase Hosting](https://firebase.google.com/docs/hosting/custom-domain)

O wizard exibirá valores exclusivos para os seguintes registros. Eles devem ser copiados literalmente da tela do Firebase, sem substituir valores por exemplos genéricos:

1. Registro TXT de titularidade do domínio;
2. Desafio ACME por TXT ou HTTP para emissão do certificado;
3. Registros CAA somente se o Firebase detectar que os CAA atuais bloqueiam a emissão;
4. Depois de o status ficar **Connected**, os registros A/AAAA indicados pelo Firebase para direcionar tráfego ao Hosting.

A configuração avançada permite que o site anterior continue atendendo enquanto a validação e o SSL são preparados. Somente a adição final dos A/AAAA desloca tráfego para o Firebase. O Firebase informa que a propagação e o certificado podem levar até 24 horas, embora muitas vezes terminem antes. [Domínio personalizado no Firebase Hosting](https://firebase.google.com/docs/hosting/custom-domain)

Para `www`, repetir o assistente e configurar o redirecionamento para `felipebulhoes.com`. Na janela de corte, remover apenas registros A, AAAA ou CNAME conflitantes que apontem para o host antigo e que o wizard indicar como incompatíveis. Nunca remover MX, SPF, DKIM, DMARC ou outros registros de email.

## Matriz de testes finais

### Antes do DNS: preview Firebase e serviço de produção

Validar como visitante sem autenticação e em janela anônima:

- `/`, `/consultorios`, `/vasectomia-sem-bisturi`, `/andrologia-performance-masculina`, `/estetica-intima-masculina`, uma página educativa e uma página do blog: `200` e conteúdo correto;
- `/local/clinovi-moema` e `/educativo/cancer-de-prostata`: `301` com destino correto;
- `/admin/verificacao`: `404` e `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`;
- `/api` e `/api/trpc/auth.me`: `503`;
- `/robots.txt` e `/sitemap.xml`: `200`, sem bloquear as páginas públicas desejadas;
- `/manus-storage/main_2775651b.pdf` e pelo menos uma imagem Open Graph: `200`, tipo MIME correto e sem cabeçalho `Location` para o host legado;
- HTML server-side: uma única canonical para `https://felipebulhoes.com/...`, `og:url`, `og:image`, título, descrição e dados estruturados coerentes;
- botões de WhatsApp, Doctoralia, telefone, mapa e formulário: links corretos. Usar contato fictício e não inserir informações de saúde nos testes;
- mobile real ou emulação: navegação, menu inferior, CTA flutuante, formulário, contraste e foco por teclado;
- Lighthouse mobile: Performance, Accessibility, Best Practices e SEO como linha de base comparável ao site atual;
- Tag Assistant e GA4 DebugView: apenas page views e eventos sem dados pessoais após a correção de compliance. Confirmar explicitamente a ausência de `user_data` no formulário e a ausência de evento de lead para Meta.

Também confirmar no Cloud Console:

- política IAM do bucket sem `allUsers`;
- `roles/storage.objectViewer` somente para a service account do Cloud Run;
- checagem de Invoker IAM desabilitada somente no serviço **de produção**, se o Firebase Hosting estiver ativo; nenhuma política `allUsers` no bucket;
- orçamento, alertas e limite máximo de instâncias ativos;
- logs sem nome, telefone, email, mensagem ou informação clínica do visitante.

### Depois do DNS: domínio final

Quando `felipebulhoes.com` e `www.felipebulhoes.com` estiverem **Connected**, repetir os testes funcionais no domínio final. Conferir ainda:

- certificado TLS válido e hostname correto;
- redirecionamento de `www` para o canônico em uma etapa;
- canonical, Open Graph, sitemap e `robots.txt` apontando apenas para `https://felipebulhoes.com`;
- carregamento de assets, PDF, vídeo e banners sem dependência do host legado;
- eventos de analytics sem dados pessoais ou atributos de saúde;
- inspeção de uma URL importante no Google Search Console após a estabilidade do domínio;
- compartilhamento de uma página no debugger de redes sociais para forçar atualização de cache Open Graph.

## Rollback e janela de estabilização

Conservar a hospedagem atual até a versão no Firebase e o domínio final operarem de forma estável por uma janela de observação aprovada. Se houver falha antes da mudança de DNS, basta não publicar o canal live ou reverter a revisão/versão do Firebase. Se houver falha após o corte de DNS, restaurar os registros anteriores documentados e investigar sem tocar no bucket ou na área administrativa.

Cloud Run permite reverter a revisão anterior com roteamento de tráfego. O rollback deve apontar para uma revisão previamente testada, porque a alteração de tráfego não executa novos health checks. [Rollbacks e migração de tráfego no Cloud Run](https://docs.cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration)

## Aprovações necessárias

As seguintes ações exigem autorização explícita e separada antes da execução:

1. Alterar o código de mensuração para remover Conversões Otimizadas relacionadas a contato médico e implantar Consent Mode;
2. Criar/expor o serviço Cloud Run de produção e publicar um preview Firebase público;
3. Publicar o canal live do Firebase Hosting;
4. Adicionar a configuração do domínio no Firebase e inserir registros DNS de preparação;
5. Alterar registros A/AAAA/CNAME para o corte de tráfego do domínio;
6. Desligar a hospedagem atual após a estabilização.

Nenhuma dessas etapas foi executada por este documento.
