# Auditoria funcional do site — 28/08/2026

## Resumo

O domínio principal e as rotas essenciais foram testados em produção e na prévia. A auditoria encontrou três falhas técnicas corrigíveis no código e uma falha de domínio externo: HTML inválido no fallback do Meta Pixel, calendário Doctoralia incorporado sujeito a erro 403, mapa sem fallback quando o proxy não responde e `www.felipebulhoes.com` respondendo HTTP 503.

## Correções aplicadas

O fallback `<noscript>` do Meta Pixel foi movido para `<body>`. O calendário incorporado foi substituído por um CTA rastreado para `/agendar/doctoralia`, mantendo WhatsApp e telefone como alternativas. O Google Maps agora carrega de forma assíncrona, compartilha uma única requisição e exibe uma mensagem útil quando o proxy está indisponível. As referências ao logotipo antigo foram substituídas por um ativo permanente.

## Validação externa

O Facebook Sharing Debugger autenticado reconheceu o novo banner, o título e a descrição da homepage. O alerta 503 foi reproduzido somente em `https://www.felipebulhoes.com`; o domínio principal `https://felipebulhoes.com` respondeu HTTP 200 em três requisições com o user agent do crawler do Facebook.

**Evidência da validação:** [/manus-storage/facebook-sharing-debugger-felipebulhoes-2026-08-28_bc330eb2.webp](/manus-storage/facebook-sharing-debugger-felipebulhoes-2026-08-28_bc330eb2.webp). A captura registra a URL testada, a prévia do link, as propriedades Open Graph reconhecidas e o aviso HTTP apresentado pelo depurador em 28/08/2026.

## Resultado esperado após publicação

As páginas continuam acessíveis mesmo quando serviços externos falham. Em 29/08/2026, `https://www.felipebulhoes.com` foi vinculado e passou a responder HTTP 301 para `https://felipebulhoes.com/`. O destino retornou HTTP 200 tanto para um navegador comum quanto para o user agent `facebookexternalhit/1.1`, eliminando a causa reproduzível do alerta 503.
