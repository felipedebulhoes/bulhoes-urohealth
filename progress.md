# progress.md — Bulhões UroHealth

> **Status Operacional, Marcos Concluídos e Próximos Passos**  
> Última atualização: 04/10/2026 — 18:05 (Horário de Brasília)

---

## 1. Status Geral do Projeto

| Indicador | Status | Detalhes |
|---|---|---|
| **Servidor de Desenvolvimento** | 🟢 Ativo | `http://localhost:3000/` (HTTP 200 OK) |
| **Site em Produção** | 🟢 Ativo | `https://felipebulhoes.com/` |
| **Compilação TypeScript** | 🟢 0 erros | `npm run check` (`tsc --noEmit`) passando limpo |
| **Assets de Mídia Locais** | 🟢 100% Sincronizados | Logo oficial, foto de retrato e mídias em `client/public/manus-storage/` |
| **Proxy de Armazenamento** | 🟢 Híbrido Ativo | Servindo do disco local com fallback automático para o CDN de produção |
| **Banco de Dados & Schema** | 🟢 Sincronizado | Drizzle ORM + MySQL com tabelas de arquivos e leads |
| **Rastreamento & Conversões** | 🟢 Ativo | GA4 (`G-PJHFGVQPS6`), GTM, Doctoralia e WhatsApp UTMs |

---

## 2. Linha do Tempo e Marcos Concluídos

### Marco 1: Arquitetura Full-Stack e Banco de Dados
- Migração completa para tRPC 11 com Express e React Query.
- Estruturação do banco relacional com Drizzle ORM (tabelas `files`, `leads`, `users`).
- Painel administrativo para gestão de leads gerados pela plataforma.

### Marco 2: Biblioteca Educativa Baseada em Evidências (24+ Páginas)
- Produção de páginas completas com referências das diretrizes **EAU**, **AUA** e **SBU**:
  - *Hiperplasia Prostática Benigna (HPB)* e técnicas cirúrgicas (RTU, HoLEP, ThuLEP, Rezum, TPLA, iTIND, PAE).
  - *Cálculos Renais & Litotripsia a Laser* com bainha de aspiração (FANS-UAS/ClearPetra).
  - *Cirurgia Robótica Urológica* (RARP, nefrectomia parcial).
  - *Câncer de Bexiga*, *Biópsia de Próstata*, *Incontinência Urinária*.
  - *Andrologia & Saúde do Homem*, *Doença de Peyronie*, *Varicocele*, *Infertilidade Masculina*.

### Marco 3: Otimização SEO Local & GEO (Campinas e São Paulo)
- Artigos e landing pages de conversão focadas em termos de alta intenção: "urologista Campinas", "urologista São Paulo", "cirurgia robótica Campinas", "vasectomia Campinas".
- Metadados canônicos, Open Graph 1200x630 personalizados por página e JSON-LD estruturado (MedicalBusiness, Physician).
- Mais de 25 páginas indexadas no Google Search Console com monitoramento contínuo.

### Marco 4: Funil de Conversão e Assistente Virtual Urológico
- Widget de IA inteligente (`AIChatWidget.tsx`) com detecção de intenção de agendamento por palavras-chave.
- Coleta de leads qualificados integrada a notificações por e-mail via **Resend API**.
- Rastreamento analítico de eventos de conversão no GA4 (`generate_lead`, `contact_whatsapp`, `contact_doctoralia`, `cta_click`).

### Marco 5: Padronização Visual e Paleta Mineral Harmoniosa (Recentemente Concluído)
- **Áreas de Atuação & Seção Educativa:** aplicação do padrão de 8 cores minerais (`#D9C58A`, `#E1B58A`, `#C9B6A3`, `#D8A5A5`, `#B7C0A1`, `#C7A9C8`, `#AFC1D0`, `#D5B18D`).
- **Rodapé (`Footer.tsx`):** substituição de ícones planos e escuros por badges translúcidos em bronze suave (`w-7 h-7 rounded-md bg-[#B87333]/15`) e cores pastéis dedicadas por tipo de informação.
- **Banner Flutuante (`ScheduleBanner.tsx`):** ícone de calendário padronizado com badge bronze translúcido e dourado champanhe (`#D9C58A`).
- **Seção de Contato e Consultórios:** padronização de ícones de endereço, telefone, horários e formas de pagamento.

### Marco 6: Resolução de Assets e Fallback Offline (`storageProxy.ts`)
- Identificação da falha de carregamento de logos e fotos no ambiente local devido à ausência das chaves de nuvem da Forge API.
- Reestruturação do [`server/_core/storageProxy.ts`](file:///c:/Users/drfel/OneDrive/%C3%81rea%20de%20Trabalho/04_Profissional/Site/server/_core/storageProxy.ts) com suporte a leitura em disco prioritária (`client/public/manus-storage/`) e download/cache automático com streaming do CDN oficial.
- Download completo do logo oficial em alta resolução (`logo-landscape-dr-felipe_cc84d4a3.svg`), foto de retrato do Dr. Felipe (`felipe-portrait_0e0693e4_be070ac1.webp`), fotos de fachada das clínicas e fonte proprietária `Callingstone`.

### Marco 7: Criação da Governança de Agentes, Runbooks e Especificações (Concluído)
- Criação do manual unificado de agentes ([`AGENTS.md`](file:///c:/Users/drfel/OneDrive/%C3%81rea%20de%20Trabalho/04_Profissional/Site/AGENTS.md)) com diretrizes clínicas, CFM 2.336/2023, paleta de 8 cores minerais e testes.
- Criação do rastreador dinâmico de projeto ([`progress.md`](file:///c:/Users/drfel/OneDrive/%C3%81rea%20de%20Trabalho/04_Profissional/Site/progress.md)) com linha do tempo, status e changelog.
- Criação dos Runbooks Operacionais ([`superpowers/`](file:///c:/Users/drfel/OneDrive/%C3%81rea%20de%20Trabalho/04_Profissional/Site/superpowers/)):
  - *Medical Content Reviewer*: auditoria ética e científica (CFM, EAU, AUA, SBU).
  - *Design System Enforcer*: aplicação do Swiss Medical Design e icon badges.
  - *Storage & Asset Manager*: gestão do proxy híbrido e mídias locais.
  - *Conversion & Lead Auditor*: auditoria de funis WhatsApp, Doctoralia, tRPC e Resend.
- Criação do Especificações de Sistema ([`spec-kit/`](file:///c:/Users/drfel/OneDrive/%C3%81rea%20de%20Trabalho/04_Profissional/Site/spec-kit/)):
  - *Spec 01*: Arquitetura clínica, credenciais e catálogo cirúrgico.
  - *Spec 02*: Pipeline de leads, tRPC router, schema Drizzle e LGPD.
  - *Spec 03*: Tokens de design, Callingstone/Roboto e icon badges.
  - *Spec 04*: Proxy de armazenamento, headers de cache e fallbacks.

---

## 3. Registro Recente de Modificações (Changelog)

| Arquivo Modificado | Tipo de Alteração | Descrição |
|---|---|---|
| [`AGENTS.md`](file:///c:/Users/drfel/OneDrive/%C3%81rea%20de%20Trabalho/04_Profissional/Site/AGENTS.md) | Governança | Manual de diretrizes clínicas, stack, design system e validação técnica. |
| [`progress.md`](file:///c:/Users/drfel/OneDrive/%C3%81rea%20de%20Trabalho/04_Profissional/Site/progress.md) | Governança | Dashboard de status, marcos concluídos, changelog e backlog ativo. |
| [`superpowers/`](file:///c:/Users/drfel/OneDrive/%C3%81rea%20de%20Trabalho/04_Profissional/Site/superpowers/) | Runbooks | 4 playbooks operacionais especializados para agentes de IA. |
| [`spec-kit/`](file:///c:/Users/drfel/OneDrive/%C3%81rea%20de%20Trabalho/04_Profissional/Site/spec-kit/) | Especificações | 4 especificações formais de dados, design, clínica e storage. |
| [`client/src/components/Footer.tsx`](file:///c:/Users/drfel/OneDrive/%C3%81rea%20de%20Trabalho/04_Profissional/Site/client/src/components/Footer.tsx) | Design System | Badges `w-7 h-7 bg-[#B87333]/15` e cores minerais `#AFC1D0`, `#D9C58A`, `#D8A5A5`, `#B7C0A1`, `#E1B58A` aplicados em endereços, telefones e links. |
| [`client/src/components/ScheduleBanner.tsx`](file:///c:/Users/drfel/OneDrive/%C3%81rea%20de%20Trabalho/04_Profissional/Site/client/src/components/ScheduleBanner.tsx) | Design System | Badge de calendário padronizado com `#D9C58A`. |
| [`client/src/components/ContactSection.tsx`](file:///c:/Users/drfel/OneDrive/%C3%81rea%20de%20Trabalho/04_Profissional/Site/client/src/components/ContactSection.tsx) | Design System | Pílulas de localização e ícones sociais padronizados. |
| [`client/src/components/LocationCardsSection.tsx`](file:///c:/Users/drfel/OneDrive/%C3%81rea%20de%20Trabalho/04_Profissional/Site/client/src/components/LocationCardsSection.tsx) | Design System | Badges em `MapPin`, `Clock`, `Phone` e `CreditCard`. |
| [`client/src/components/AIChatWidget.tsx`](file:///c:/Users/drfel/OneDrive/%C3%81rea%20de%20Trabalho/04_Profissional/Site/client/src/components/AIChatWidget.tsx) | Design System | Ícone do bot e campos do formulário atualizados com a paleta mineral. |
| [`server/_core/storageProxy.ts`](file:///c:/Users/drfel/OneDrive/%C3%81rea%20de%20Trabalho/04_Profissional/Site/server/_core/storageProxy.ts) | Arquitetura | Implementação de proxy híbrido com resolução em disco local, cache automático e fallback para `felipebulhoes.com`. |
| [`client/public/manus-storage/`](file:///c:/Users/drfel/OneDrive/%C3%81rea%20de%20Trabalho/04_Profissional/Site/client/public/manus-storage/) | Assets | Baixados 22 assets essenciais (logo, fotos do médico, clínicas e fonte Callingstone). |
| [`.env`](file:///c:/Users/drfel/OneDrive/%C3%81rea%20de%20Trabalho/04_Profissional/Site/.env) | Configuração | Criação de arquivo local com variáveis padrão para evitar erros no Vite e testes. |

---

## 4. Backlog de Próximas Atividades

- [ ] **Acompanhamento do Domínio `drfelipebulhoes.com.br`:** Monitorar processos de liberação do Registro.br (datas previstas: 14/10/2026 e 11/11/2026).
- [ ] **Auditoria de Performance Web (LCP/INP):** Verificar métricas de Core Web Vitals no PageSpeed Insights para mobile e desktop.
- [ ] **Expansão de Artigos no Blog:** Publicar novos tópicos sobre reposição de testosterona (TRH) e cirurgia robótica em Campinas.
- [ ] **Sincronização de Avaliações:** Avaliar integração de widgets de opiniões do Google Business e Doctoralia.
- [ ] **Automação de WhatsApp:** Refinar mensagens pré-preenchidas de acordo com o botão de agendamento de origem.
