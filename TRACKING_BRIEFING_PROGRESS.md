# Briefing Tracking Google Ads - Progresso

## Status: EM ANDAMENTO

### Tarefas Concluídas
1. ✅ Rota /agendar/doctoralia — existente, dispara lead_doctoralia
2. ✅ Rota /agendar/whatsapp — CRIADA, dispara lead_whatsapp com gclid/UTMs
3. ⏳ Padronizar nomes de CTA com data-tracking-label
4. ⏳ Substituir 23 links wa.me hardcoded para usar getWhatsAppUrl
5. ⏳ Validar eventos GA4 com gclid/UTMs

### Próximos Passos
- Converter todos os links wa.me hardcoded em 23 arquivos
- Adicionar data-tracking-label em todos os CTAs
- Testar com URL de teste: `?gclid=TESTE123&utm_source=google&utm_medium=cpc&utm_campaign=teste_tracking`
- Validar no GA4 Debug View

### Arquivos com wa.me hardcoded (23 arquivos):
- Components (10): ScheduleBanner, SymptomChecker, VideosSection, ContactSection, FAQSection, Footer, LocationCardsSection, LocationSection, QuickContactForm, WhatsAppWidget
- Pages (13): Agendamento, BlogPost, CancerBexiga, CirurgiaRobotica, Consultorios, Contato, InfertilidadeMasculina, LocationPages, OrientacoesPosOperatorias, OrientacoesPreOperatorias, SobreDrFelipe, TratamentoCancerProstata, Varicocele

### Eventos GA4 Implementados
- lead_whatsapp (com gclid/utm_source/utm_medium/utm_campaign/time_on_page/interactions)
- lead_doctoralia (com gclid/utm_source/utm_medium/utm_campaign/time_on_page/interactions)
- lead_phone (com gclid/utm_source/utm_medium/utm_campaign/time_on_page/interactions)
- lead_maps (secundário)

### Métricas de Engajamento Anexadas
- time_on_page_seconds
- interactions_clicks
- interactions_scrolls
- max_scroll_depth_percent
