# Monitoramento de compartilhamentos sociais

## Rotina operacional

| Frequência | Plataforma | Verificação |
|---|---|---|
| Após alterar metatags ou banners | Facebook Sharing Debugger | Raspar novamente e conferir título, descrição, imagem e avisos |
| Após alterar metatags ou banners | LinkedIn Post Inspector | Confirmar a apresentação completa do link |
| Mensal | GA4 | Avaliar sessões, engajamento e conversões provenientes de social |
| Mensal | Meta Events Manager | Confirmar PageView, Lead e Schedule sem alertas críticos |
| Trimestral | WhatsApp, Facebook e LinkedIn | Compartilhar uma URL de teste no aplicativo real |

## Métricas

| Métrica | Fonte | Critério |
|---|---|---|
| Preview completo | Depuradores | Imagem 1200×630, título legível e descrição correta |
| Sessões sociais | GA4 | Evolução mensal por origem e mídia |
| Cliques nos CTAs | GA4 | `contact_whatsapp`, `contact_doctoralia`, `contact_phone` e `cta_click` |
| Leads | GA4 e Meta | `generate_lead`, `Lead` e `Schedule` |
| Taxa de conversão | GA4 | Leads divididos pelas sessões sociais |

## URLs prioritárias

| Página | URL |
|---|---|
| Página inicial | https://felipebulhoes.com |
| Vasectomia | https://felipebulhoes.com/vasectomia-sem-bisturi |
| Andrologia | https://felipebulhoes.com/andrologia-performance-masculina |
| Estética íntima | https://felipebulhoes.com/estetica-intima-masculina |
| Engrossamento peniano | https://felipebulhoes.com/educativo/engrossamento-peniano |

## Registro

| Data | URL | Plataforma | Resultado | Observação |
|---|---|---|---|---|
| 28/08/2026 | https://felipebulhoes.com | Facebook Sharing Debugger | Aprovado com alerta | Banner, título e descrição reconhecidos; host `www` retornou 503. [Ver evidência](/manus-storage/facebook-sharing-debugger-felipebulhoes-2026-08-28_bc330eb2.webp) |

## Primeira rotina executada

Em 28/08/2026, foi concluída a revisão inicial no Facebook Sharing Debugger e a simulação do crawler `facebookexternalhit/1.1`. O domínio principal respondeu HTTP 200 em três tentativas; o host `www` respondeu HTTP 503 em três tentativas. A próxima revisão mensal deverá ocorrer até 28/09/2026, após a regularização do subdomínio `www`.
