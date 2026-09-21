# Restrição de compartilhamento de dados da Meta — plano de correção

**Data:** 21/09/2026  
**Conjunto de dados / Pixel:** `1730608694762791`  
**Evento indicado no aviso:** `1564657008567389`  
**Domínio temporário citado pela Meta:** `3000-ivprq17y5dylxo17sv59n-5da2dd77.us1.manus.computer`

## Conclusão

O aviso não indica bloqueio da conta publicitária. Ele indica que uma fonte de dados foi enquadrada em uma categoria com restrições adicionais de compartilhamento, situação compatível com um site de urologia. A Meta pode aplicar **Core Setup**, restringindo parâmetros personalizados e a parte da URL após o domínio, ou pode restringir certos eventos e, em cenários mais severos, todos os eventos. [1] [2]

A classificação de saúde é plausível para o site profissional e **não deve ser contestada apenas para recuperar rastreamento**. A contestação só é apropriada se o Events Manager estiver classificando incorretamente uma fonte que não pertence a saúde. A prioridade é manter a integração minimalista e impedir o envio de dados que revelem, sugiram ou se baseiem em interesse médico, sexual ou reprodutivo. A Meta proíbe expressamente a transmissão de informação de saúde e determina que nomes e critérios de eventos, conversões e audiências não reflitam nem impliquem dados sensíveis. [3] [4]

## Correção técnica concluída no site

O Meta Pixel foi restrito aos domínios públicos autorizados e apenas às rotas institucionais de baixo risco: página inicial, Sobre, Contato, Agendamento, Consultórios e Privacidade. Ele **não é inicializado** em `localhost`, prévias `*.manus.computer`, rotas educativas, campanhas clínicas, protótipos ou áreas administrativas. O fallback sem JavaScript também foi removido, pois ignorava a política de domínio e rota.

Os eventos `Lead` e `Schedule` foram removidos do Meta Pixel. Anteriormente, eles podiam receber `content_name` associado a procedimentos e contextos médicos, como vasectomia, estética íntima, andrologia ou agendamento. Esse padrão era incompatível com a orientação da Meta para não usar parâmetros, URLs, nomes de conversão ou eventos que revelem ou impliquem informação de saúde. O GA4 e o Google Ads permanecem responsáveis pelas métricas de contato, sem enviar esses dados ao Meta.

A validação confirmou que a prévia não contém fallback de pixel e contém a guarda de hosts e rotas. A alteração passou em TypeScript, build de produção e 142 testes automatizados.

## Ação necessária no Events Manager

Após entrar no Events Manager, abra **Data Sources** e selecione o conjunto de dados `1730608694762791`. Em **Settings**, abra **Manage data source categories**. Confira se a fonte temporária citada no e-mail aparece como afetada e registre o nível da restrição. Uma fonte de site médico pode continuar classificada como Health and wellness; isso é esperado. Caso a categoria tenha sido atribuída pela Meta e esteja objetivamente errada para uma fonte específica, use **View details → Request review**. [1] [5]

Na mesma aba **Settings**, abra **Traffic permissions** e crie uma **allow list**. Inclua somente os domínios públicos que realmente devem enviar PageView ao Pixel: `felipebulhoes.com`, `felipebulhoes.com.br`, `bulhoesurohealth.com` e `drfelipebulhoesurologia.com.br`. Não inclua endereços `manus.computer`, localhost, ambientes de teste ou domínios de terceiros. A allow list evita que eventos de prévias e outros domínios não autorizados entrem no conjunto de dados. [6]

Em **Diagnostics**, reveja parâmetros bloqueados, URLs recentes e eventos personalizados. Remova, pause ou recrie qualquer conversão personalizada, audiência ou evento cujo nome, regra ou URL contenha termos de doença, procedimento, saúde sexual, fertilidade, próstata, vasectomia, estética íntima, andrologia ou tratamento. Também mantenha desativados o Automatic Advanced Matching e qualquer Conversions API que transmita nome, e-mail, telefone, texto de formulário, identificadores de serviço ou páginas clínicas para esse conjunto de dados. A Meta recomenda examinar as páginas, formulários, parâmetros e UTMs que chegam ao Pixel, porque essas fontes podem conter informação proibida. [4]

> **Texto sugerido para uma solicitação de revisão, apenas se a classificação da fonte temporária estiver incorreta:**
>
> “Solicito revisão da categorização da fonte temporária `3000-ivprq17y5dylxo17sv59n-5da2dd77.us1.manus.computer`. Trata-se exclusivamente de ambiente de desenvolvimento, sem atendimento, portal de pacientes ou coleta de dados clínicos. O Meta Pixel foi removido desse ambiente e agora é bloqueado tecnicamente em prévias e localhost. As fontes públicas de saúde permanecem com rastreamento mínimo e sem eventos, parâmetros ou URLs que indiquem condição, procedimento ou interesse de saúde.”

## O que esperar depois da revisão

A Meta pode manter Core Setup para o domínio público de saúde. Isso não é necessariamente um problema: o Core Setup justamente reduz parâmetros personalizados e caminhos de URL, mas não substitui a obrigação de não enviar dados sensíveis. [2] Se a fonte temporária for retirada ou a revisão for aceita, a notificação pode levar alguns dias para refletir a mudança. O histórico anterior não é recuperado, mas a allow list e a correção do código impedem novos eventos de prévias.

## Referências

[1]: https://www.facebook.com/business/help/1402913027039332 "About data source categories in Meta Events Manager"
[2]: https://www.facebook.com/business/help/511197658391698 "Understand data sharing restrictions based on data source categories"
[3]: https://www.facebook.com/legal/technology_terms "Meta Business Tools Terms"
[4]: https://www.facebook.com/business/help/361948878201809 "About prohibited information"
[5]: https://www.facebook.com/business/help/467621355878794 "How to manage data source categories in Meta Events Manager"
[6]: https://www.facebook.com/business/help/278125336598935 "Manage Meta Pixel traffic permissions in Events Manager"
