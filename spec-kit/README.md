# Spec-Kit — Bulhões UroHealth Platform

> **Especificações Técnicas e Arquiteturais do Projeto**  
> O Spec-Kit é o repositório de especificações formais de produto, dados, design e infraestrutura para o ecossistema digital do Dr. Felipe de Bulhões Ojeda.

---

## 📚 Índice de Especificações

| Especificação | Arquivo | Descrição |
|---|---|---|
| **01. Arquitetura Clínica & Serviços** | [`01-clinical-architecture.md`](file:///c:/Users/drfel/OneDrive/%C3%81rea%20de%20Trabalho/04_Profissional/Site/spec-kit/01-clinical-architecture.md) | Catálogo de especialidades, tratamentos cirúrgicos, unidades hospitalares e credenciais médicas. |
| **02. Pipeline de Leads & Conversão** | [`02-lead-and-conversion-pipeline.md`](file:///c:/Users/drfel/OneDrive/%C3%81rea%20de%20Trabalho/04_Profissional/Site/spec-kit/02-lead-and-conversion-pipeline.md) | Contratos tRPC, esquemas Drizzle ORM, assistente de IA, mensageria e LGPD. |
| **03. Design Tokens & Componentes** | [`03-design-tokens-and-components.md`](file:///c:/Users/drfel/OneDrive/%C3%81rea%20de%20Trabalho/04_Profissional/Site/spec-kit/03-design-tokens-and-components.md) | Definição exata de tokens de cor, tipografia Callingstone/Roboto, icon badges e estados de interação. |
| **04. Proxy de Armazenamento & Assets** | [`04-storage-and-asset-proxy.md`](file:///c:/Users/drfel/OneDrive/%C3%81rea%20de%20Trabalho/04_Profissional/Site/spec-kit/04-storage-and-asset-proxy.md) | Arquitetura do storage híbrido, rotas `/manus-storage/*`, cache em disco local e fallback para CDN. |

---

## 🎯 Propósito do Spec-Kit

O Spec-Kit serve como a fonte única da verdade (*Single Source of Truth - SSOT*) do projeto, garantindo que:
1. Novos agentes de IA compreendam a estrutura de dados sem alucinações.
2. Alterações de design não degradem a identidade visual de luxo médico (*Swiss Medical Design*).
3. As diretrizes éticas do CFM (Resolução 2.336/2023) e LGPD sejam rigorosamente respeitadas.
4. Qualquer desenvolvedor consiga auditar ou expandir a plataforma de ponta a ponta.
