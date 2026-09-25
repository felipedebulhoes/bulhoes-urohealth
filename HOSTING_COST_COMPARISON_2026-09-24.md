# Comparação de custos — Manus versus Google Cloud

**Data:** 24 de setembro de 2026  
**Escopo:** site profissional do Dr. Felipe de Bulhões, incluindo frontend React, backend Express/tRPC, banco MySQL/Drizzle, arquivos públicos, formulários e área administrativa.

## Conclusão executiva

A decisão não deve ser tomada apenas pela frase “Google Cloud pode ser barato”. **Uma versão estática e simplificada pode ter custo recorrente muito baixo no Firebase Hosting, mas não preserva o site atual integralmente.** Já uma migração que mantenha backend, banco, formulários, histórico administrativo e armazenamento tem como principal custo fixo o banco gerenciado Cloud SQL.

Não é possível comparar o valor financeiro da Manus sem a fatura e o plano contratados pelo titular. A referência para qualquer questão de assinatura, cobrança ou reativação da Manus é o suporte em [help.manus.im](https://help.manus.im). A comparação abaixo, portanto, apresenta o perfil de custos técnicos do Google Cloud e a regra de decisão: comparar a fatura mensal real da Manus com o custo de infraestrutura Google equivalente e com o esforço de migração.

A inspeção no Google Cloud confirmou que a organização **bulhoesurohealth.com** existe, mas não há uma implantação antiga ativa no Firebase Hosting, Cloud Run ou Google Sites que possa ser simplesmente religada. O domínio `www.bulhoesurohealth.com` hoje aponta para a Manus. Assim, sair da Manus exigiria uma nova implantação, não uma reativação simples da versão anterior.

## Cenários comparáveis

| Cenário | O que preserva | Componentes principais | Perfil de custo | Indicação |
|---|---|---|---|---|
| **Manter Manus** | Todo o site atual, painel interno, banco, storage, OAuth e integrações já existentes | Hospedagem e serviços gerenciados atuais | Dependente do plano/fatura da Manus; não estimável sem acesso à cobrança | Melhor opção para voltar ao ar rapidamente e evitar trabalho técnico imediato |
| **Firebase Hosting estático** | Páginas públicas, SEO, imagens, blog estático e CTAs externos | Firebase Hosting + arquivos públicos | Pode permanecer dentro da franquia em baixo tráfego; 10 GB de armazenamento e 360 MB/dia de transferência sem custo no plano Blaze [1] | Mais barato, porém requer simplificar ou remover backend, banco e painel administrativo |
| **Google Cloud com equivalência funcional** | Site atual quase integralmente | Cloud Run + Cloud SQL MySQL + Cloud Storage + Firebase Auth/alternativa | O banco Cloud SQL é o custo fixo relevante; Cloud Run e Storage tendem a ser pequenos em baixo tráfego [2][3][4] | Melhor para independência de plataforma, mas não para uma redução de custo garantida |

## Custos técnicos do Google Cloud

Os exemplos abaixo usam as tarifas publicadas para `us-central1` apenas como referência reproduzível. Para pacientes no Brasil, seria natural avaliar `southamerica-east1` (São Paulo), cujo preço pode diferir. Antes de contratar, o valor deve ser recalculado no [Google Cloud Pricing Calculator](https://cloud.google.com/products/calculator) com a região e a configuração final.

| Componente | Exemplo de configuração | Referência de preço | Leitura prática |
|---|---|---:|---|
| Cloud Run, sem instância mínima | Serviço web com escala a zero | Até 2 milhões de requisições/mês e 180 mil vCPU-segundos/mês no nível sem custo; depois, cobrança por uso [2] | Em tráfego baixo, pode custar muito pouco; há cold start e não substitui o banco |
| Cloud Run, com instância mínima | 1 vCPU + 0,5 GiB em espera, 730 h/mês | Aproximadamente **US$ 9,72/mês** no exemplo calculado | Evita cold start, mas cria custo recorrente mesmo sem visitas |
| Cloud SQL MySQL | 1 vCPU + 4 GiB, 730 h/mês, sem alta disponibilidade | Aproximadamente **US$ 50,59/mês** antes de armazenamento, backups, rede e impostos | É o item que torna a equivalência funcional mais cara e previsível |
| Cloud Storage Standard | 10 GiB de imagens/PDFs, 730 h/mês | Aproximadamente **US$ 0,20/mês** no exemplo; operações e saída de dados são adicionais [3] | O armazenamento em si é barato; transferência de mídia pode crescer conforme o tráfego |
| Firebase Hosting estático | Site sem backend próprio | Até 10 GB armazenados e 360 MB/dia de transferência sem custo; depois US$ 0,026/GB e US$ 0,15/GB, respectivamente [1] | Ótimo para uma versão estática, mas não hospeda o Express/tRPC atual sozinho |

> Os valores são exemplos de infraestrutura, não uma cotação, não incluem impostos, suporte, domínio, custos de egress, backups, serviços de terceiros ou variações regionais.

## O que mudaria o custo de uma migração

O projeto atual não é somente um site estático. Para manter comportamento equivalente, seria necessário substituir dependências que hoje são gerenciadas pela Manus:

| Dependência atual | Alternativa Google | Efeito sobre custo e trabalho |
|---|---|---|
| `/manus-storage` e proxy de arquivos | Cloud Storage | Baixo custo mensal, mas exige copiar arquivos e atualizar URLs/código |
| MySQL/TiDB gerenciado | Cloud SQL MySQL | Principal custo fixo e etapa de migração mais sensível |
| OAuth Manus | Firebase Authentication ou outro provedor | Exige refatorar apenas as rotas administrativas |
| APIs/serviços internos Manus | APIs Google, Gemini, Resend ou remoção de funções não essenciais | Deve ser auditado função a função; não migrar IA por padrão reduz custo e risco |
| Publicação e domínio gerenciados | Firebase Hosting/Cloud Run + DNS | Exige configuração, validação HTTPS, SEO e redirecionamentos |

## Comparação de risco e manutenção

| Critério | Manter Manus | Migrar para Google Cloud |
|---|---|---|
| Retomar o site agora | Depende da reativação da conta/publicação | Não é imediato; exige migração e testes |
| Custo recorrente previsível | Depende do plano contratado | Cloud SQL cria base mensal; Cloud Run/Storage variam por uso |
| Autonomia sobre infraestrutura | Menor | Maior |
| Manutenção técnica | Menor, pois a plataforma é gerenciada | Maior: secrets, backups, alertas, atualizações e segurança passam a exigir governança própria |
| Risco de migração | Nenhum se não houver mudança | Moderado: banco, storage, autenticação e SEO precisam ser preservados |
| Melhor escolha por custo puro | Só é possível concluir ao confrontar a fatura real | Depende de aceitar simplificação ou absorver o custo do Cloud SQL |

## Recomendação por objetivo

### Se o objetivo é voltar ao ar rapidamente

Manter o projeto atual e concluir a reativação pela Manus é a opção mais rápida. Em paralelo, criar backups externos do código e dos arquivos reduz dependência futura sem migrar sob pressão.

### Se o objetivo é reduzir custo ao máximo

A opção tecnicamente mais barata é **reprojetar o site público como estático no Firebase Hosting**, mantendo apenas CTAs, conteúdos, SEO, formulários mínimos e analytics com privacidade. O painel interno, banco MySQL, coleta persistente e recursos administrativos precisariam ser reavaliados e possivelmente removidos ou reconstruídos em outra etapa.

### Se o objetivo é independência e equivalência funcional

Usar **Cloud Run + Cloud SQL + Cloud Storage**. É a arquitetura mais fiel ao projeto atual, mas provavelmente não será a opção de menor custo recorrente, porque o Cloud SQL cobra por instância mesmo quando o tráfego é baixo.

## Próximo passo recomendado

1. Solicitar à Manus a reativação definitiva da publicação atual, sem alterar DNS neste momento.
2. Criar um backup independente do repositório e dos arquivos públicos.
3. Escolher entre uma migração **econômica/simplificada** ou uma migração de **equivalência funcional**.
4. Só criar recursos faturáveis no Google Cloud após definir a arquitetura e configurar alertas de orçamento.

## Fontes

[1] [Firebase Pricing — Hosting](https://firebase.google.com/pricing)  
[2] [Cloud Run Pricing](https://cloud.google.com/run/pricing)  
[3] [Cloud Storage Pricing](https://cloud.google.com/storage/pricing)  
[4] [Cloud SQL Pricing](https://cloud.google.com/sql/pricing)  
[5] [Google Cloud Pricing Calculator](https://cloud.google.com/products/calculator)
