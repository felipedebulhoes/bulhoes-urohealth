# Achados do Events Manager — 21/09/2026

A sessão autenticada confirmou que o conjunto de dados **Dr Felipe de Bulhões- Urologista Event Data** (`1730608694762791`) pertence a **Bulhoes Urohealth LTDA** (`610123093033392`) e está vinculado à conta **CA - DR. FELIPE BULHÕES [LUDUS]** (`981847398077573`).

## Restrição confirmada

A Meta aplicou categorias de **Estado de saúde e bem-estar**, **Dificuldades pessoais** e **Sexualidade ou identidade de gênero**. Para o domínio temporário `3000-ivprq17y5dylxo17sv59n-5da2dd77.us1.manus.computer`, os detalhes informam bloqueio de compartilhamento na Região Europeia e possível bloqueio de eventos padrão / Configuração básica em outras regiões.

O painel de Ações também identifica bloqueio de dados para vários domínios públicos e temporários, incluindo `felipebulhoes.com`, `felipebulhoes.com.br`, `drfelipebulhoesurologia.com.br`, `bulhoesurohealth.manus.space`, prévias Manus, domínios `a.run.app`, `manus.im` e `linktr.ee`.

## Pontos de correção identificados

1. Há eventos personalizados históricos que devem ser bloqueados por refletirem contexto clínico ou de agendamento: `Engrossamento peniano url`, `Clique Agendar consulta via doctoralia`, `Hipogonadismo e testo` e `Contato Via Whatsapp`.
2. A **Configuração básica** já está ativada, o que é adequado.
3. A **Correspondência automática de site** está ativada para e-mail, telefone, nome, gênero, localidade, data de nascimento, identificação externa e outros parâmetros. Ela deve ser desativada para esta fonte médica, pois a integração deve permanecer mínima e sem qualquer transmissão de dados de contato de pacientes à Meta.
4. As **Permissões de tráfego** ainda usam lista de bloqueio e o próprio painel recomenda criar uma lista de permissão. A allow list deverá conter apenas os quatro domínios públicos oficiais: `felipebulhoes.com`, `felipebulhoes.com.br`, `bulhoesurohealth.com` e `drfelipebulhoesurologia.com.br`. Ambientes Manus, `manus.im`, `a.run.app`, localhost, Linktree e domínios de terceiros devem ficar fora da lista.

As correções de código já publicadas impedem novos eventos do Pixel em prévias, localhost, rotas clínicas, protótipo e área administrativa. Também eliminaram `Lead` e `Schedule` do Meta Pixel e seus parâmetros associados a contextos de saúde.

## Contenção executada no Google Tag Manager

Foi localizado o contêiner **www.felipebulhoes.com** (`GTM-MPZWHZ2V`) na conta **Dr. Felipe de Bulhões**. A tag `FB_CONVERSIONS_API-1564657008567389-Web-Tag-Pixel_Template` estava configurada com Pixel ID variável, integração com a API de Conversões e um acionador de regex `.+` que aceitava **todos os eventos personalizados não técnicos** do dataLayer. Essa estrutura explicava os eventos clínicos e de agendamento recebidos no dataset.

A tag foi **pausada e publicada** como **versão 5 ativa**, em 21/09/2026 às 12:39, pelo usuário `contato@felipebulhoes.com`. Nome da versão: `Pausar tag Meta legada por conformidade de dados`. A versão mantém Google Ads, Google Tag e o Vinculador de conversões; somente a tag Meta legada foi pausada. Isso interrompe tanto os eventos customizados legados quanto o encaminhamento pela integração Meta-enabled Conversions API configurada no GTM.

## Próximas proteções no Events Manager

A sessão do Events Manager ainda indica que a correspondência automática do site permanece **ativada** para email, telefone, nome, gênero, cidade/estado/CEP, país, data de nascimento e ID externo. A configuração deve ser desativada. Também permanece recomendada a migração da lista de bloqueio para uma lista de permissões, limitada aos domínios públicos oficiais `felipebulhoes.com`, `felipebulhoes.com.br`, `bulhoesurohealth.com` e `drfelipebulhoesurologia.com.br`, incluindo suas variantes `www` quando aplicáveis.

## Controles de dados confirmados no Events Manager

Na página **Configurações** do dataset `1730608694762791`, a **correspondência automática de site** foi alterada para **Desativado**. A Meta confirmou que todos os campos de correspondência automática ficaram desligados: email, telefone, nome e sobrenome, gênero, cidade/estado/CEP, país, data de nascimento e identificação externa.

Também foi iniciado o procedimento de **lista de permissões de tráfego**. A Meta confirmou a inclusão de `felipebulhoes.com` **e todos os seus subdomínios** na lista de permissão; portanto, `www.felipebulhoes.com` já está abrangido e não deve ser cadastrado separadamente. O fluxo de interface alterna entre listas de permissão e bloqueio depois da primeira inclusão; uma tentativa de acrescentar `drfelipebulhoesurologia.com.br` pela área de bloqueio foi **cancelada antes de salvar**, de modo que esse domínio não foi bloqueado indevidamente.

`linktr.ee` será mantido como destino externo de bio, mas ficará fora das permissões do dataset: não é domínio do site e não precisa transmitir eventos ao Pixel.

## Status da permissão de tráfego

A Meta exibiu a confirmação de que `felipebulhoes.com` e seus subdomínios foram adicionados à lista de permissão no fluxo de gerenciamento. Contudo, após recarregar a página, o painel ainda apresentou a antiga seção **Lista de bloqueio** e não expôs de forma inequívoca uma tela consolidada da nova lista de permissões. Por prudência, a migração integral para allowlist deve ser tratada como **pendente de confirmação visual adicional**, e não como concluída.

Isso não reabre a exposição no site: o código publicado já restringe o carregamento do Pixel aos hosts oficiais e somente às rotas institucionais de baixo risco, e a tag Meta legada do GTM permanece pausada. `linktr.ee` foi mantido fora do dataset — pode continuar como destino de bio, porém não transmite eventos ao Pixel.

O rastreamento automático sem código ainda aparecia como **ativado** no Events Manager; ele deve ser desativado em revisão posterior, pois pode inferir eventos a partir do conteúdo e dos botões das páginas. Não foi alterado nesta etapa por dificuldade de acesso ao controle na interface.
