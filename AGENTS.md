# AGENTS.md — Dr. Felipe de Bulhões (Bulhões UroHealth)

> **Manual de Operações e Diretrizes para Agentes de IA**  
> Este documento é o guia definitivo de contexto, arquitetura, design system, conformidade médica e padrões técnicos para qualquer agente que atue neste repositório.

---

## 1. Visão Geral do Projeto & Identidade Clínica

O **Bulhões UroHealth** é a plataforma digital oficial e aplicativo web do **Dr. Felipe de Bulhões Ojeda**, médico especialista em Urologia e Cirurgia Geral.

### Dados Profissionais Obrigatórios
- **Nome:** Dr. Felipe de Bulhões Ojeda
- **CRM:** CRM-SP 202291
- **RQE:** RQE 146538 (Urologia) | RQE 114019 (Cirurgia Geral)
- **Titulação:** Membro Titular do Colégio Brasileiro de Cirurgiões (TCBC)
- **Sociedades:** Sociedade Brasileira de Urologia (SBU), American Urological Association (AUA), European Association of Urology (EAU)
- **Formação:** Instituto D'Or de Ensino e Pesquisa (São Paulo)

### Locais Oficiais de Atendimento
1. **Campinas Day Hospital** (Particular)  
   Av. Benjamin Constant, 1991 — Cambuí, Campinas - SP | Tel: (19) 2127-2900 | WhatsApp: (19) 99855-9890
2. **Clinovi Paulista** (Particular)  
   Av. Paulista, 1048, 18° andar — Bela Vista, São Paulo - SP | Tel: (11) 3382-1529
3. **Clinovi Pinheiros** (Particular)  
   Av. Rebouças, 2636 — Pinheiros, São Paulo - SP | Tel: (11) 3382-1529
4. **CEMED - Rede D'Or - Hospital e Maternidade São Luiz Campinas**  
   Av. Andrade Neves, 863 — Centro, Campinas - SP | Tel: (19) 3014-3000
5. **Teleconsulta** (Atendimento nacional e internacional por videoconferência segura)

---

## 2. Stack Tecnológica & Arquitetura

O projeto é um aplicativo full-stack moderno, de alta performance e acessível:

```
├── client/                     # Frontend (React 19 + Vite 7 + TailwindCSS 4)
│   ├── public/                 # Assets estáticos servidos pelo Vite
│   │   ├── manus-storage/      # Cache local de imagens, fontes e mídias oficiais
│   │   ├── robots.txt          # SEO Crawling rules
│   │   └── sitemap.xml         # Sitemap com todas as páginas e artigos
│   ├── src/
│   │   ├── components/         # Componentes modulares de UI (Header, Footer, Hero, etc.)
│   │   ├── pages/              # Páginas de especialidades, guias educativos e admin
│   │   ├── lib/                # Clientes tRPC, utilitários, tracking e analytics
│   │   ├── index.css           # Design tokens, tipografia (@font-face) e Tailwind
│   │   └── App.tsx             # Roteador Wouter e provedores React Query / tRPC
├── server/                     # Backend (Node.js + Express 4 + tRPC 11)
│   ├── _core/
│   │   ├── index.ts            # Entrypoint do servidor Express
│   │   ├── storageProxy.ts     # Proxy de armazenamento com cache local e fallback para produção
│   │   ├── env.ts              # Validação de variáveis de ambiente
│   │   └── vite.ts             # Middleware Vite para modo desenvolvimento
│   ├── routers/                # Roteadores tRPC (IA, Leads, Arquivos, Blog)
│   └── db.ts                   # Conexão Drizzle ORM com MySQL
├── drizzle/                    # Migrações e esquemas relacionais de banco de dados
├── shared/                     # Tipos compartilhados entre cliente e servidor
└── package.json                # Gerenciador de dependências e scripts
```

### Tecnologias-Chave
- **Frontend:** React 19, TypeScript 5.9, Vite 7, TailwindCSS 4, Radix UI, Framer Motion, Wouter, Lucide React.
- **Backend:** Node.js, Express 4, tRPC 11, Drizzle ORM, MySQL (mysql2).
- **Integrações:** Resend (disparo de e-mails para novos leads), Google Analytics 4 (gtag.js), Google Tag Manager, Umami Analytics, Doctoralia, WhatsApp com parâmetros UTM.
- **Testes & Tipagem:** Vitest (`npm test`), TypeScript `tsc --noEmit` (`npm run check`).

---

## 3. Design System: *Clinical Precision — Swiss Medical Design*

A identidade visual do projeto segue o padrão internacional de precisão cirúrgica e acolhimento humano.

### 3.1. Tipografia da Marca
- **Fonte Display / Títulos de Destaque:** `Callingstone` (`/manus-storage/Callingstone_0c7058f7.ttf`) — serifa de luxo, elegante e sofisticada.
- **Fonte de Conteúdo e Interface:** `Roboto` (Google Fonts) — clareza máxima, leitura sem esforço e legibilidade clínica.

### 3.2. Paleta de Cores e Superfícies
- **Fundo Escuro Primário (Hero / Seções Especiais):** `#1C3D5A` (Navy ardósia profundo).
- **Fundo do Rodapé:** `#0F2A3F` (Azul noturno médico).
- **Fundo Claro Neutro:** `#FEFEFE` / `#F8FAFB`.
- **Destaque Metálico da Marca (Copper / Terracotta):** `#B87333` e `#D4884A`.

### 3.3. Paleta Mineral Harmoniosa (Ícones e Destaques)
Todos os ícones informativos e educativos do site **devem seguir rigorosamente** a paleta mineral de 8 tons:
1. **Dourado / Champanhe:** `#D9C58A` (Próstata, Telefones, Destaques)
2. **Âmbar / Pêssego:** `#E1B58A` (Cálculos Renais, E-mails, Estatísticas)
3. **Taupe / Bege Mineral:** `#C9B6A3` (Cirurgia Robótica, Divisores)
4. **Coral / Rosa Suave:** `#D8A5A5` (Saúde do Homem, Instagram, Andrologia)
5. **Verde Sálvia / Oliva:** `#B7C0A1` (Urodinâmica, Teleconsulta, Horários)
6. **Lavanda / Lilás:** `#C7A9C8` (Vasectomia, Procedimentos)
7. **Azul Celeste / Mineral:** `#AFC1D0` (Uro-oncologia, Localização / MapPin, Doctoralia)
8. **Bronze Suave:** `#D5B18D` (ISTs, Pagamentos / Cartão)

### 3.4. Padrão de Container dos Ícones (Icon Badges)
Nunca use ícones sem container ou em marrom escuro chapado (`text-[#B87333]`) sobre fundos escuros. Sempre aplique:
```tsx
<div className="w-7 h-7 rounded-md bg-[#B87333]/15 flex items-center justify-center shrink-0">
  <Icon className="w-3.5 h-3.5" style={{ color: "#AFC1D0" }} />
</div>
```
Em cards com hover, adicione: `group-hover:bg-[#B87333]/25 transition-colors`.

---

## 4. Gestão de Assets e Mídia (`/manus-storage/*`)

1. **Rotas de Mídia:** Todas as imagens públicas, fotos e fontes usam caminhos com o prefixo `/manus-storage/[nome-do-arquivo].[ext]`.
2. **Resolução Local:** O arquivo [`server/_core/storageProxy.ts`](file:///c:/Users/drfel/OneDrive/%C3%81rea%20de%20Trabalho/04_Profissional/Site/server/_core/storageProxy.ts) resolve os assets da seguinte maneira:
   - Primeiro verifica se o arquivo existe em `client/public/manus-storage/`. Se existir, entrega direto via `res.sendFile()`.
   - Se não existir localmente e estiver fora da nuvem (desenvolvimento local), faz o proxy automático a partir de `https://felipebulhoes.com/manus-storage/` e salva o cache no disco local.
3. **Adição de Novas Imagens:** Sempre coloque o arquivo em `client/public/manus-storage/` para garantir carregamento instantâneo offline.

---

## 5. Diretrizes Médicas e Regulatórias (CFM)

Qualquer alteração em páginas educativas, artigos de blog ou textos de campanha **deve cumprir rigorosamente** a **Resolução CFM nº 2.336/2023**:
- **Sobriedade e Ética:** Não usar promessas de resultados garantidos, fotos de antes/depois de pacientes ou sensacionalismo.
- **Evidências Científicas:** Afirmações clínicas devem ser respaldadas pelas diretrizes internacionais atualizadas:
  - **EAU:** European Association of Urology Guidelines.
  - **AUA:** American Urological Association Guidelines.
  - **SBU:** Sociedade Brasileira de Urologia.
- **Identificação Obrigatória:** Preservar sempre a assinatura clínica com CRM-SP 202291 e RQEs.

---

## 6. Comandos e Validação para Agentes

Ao realizar alterações de código, execute sempre a sequência de validação:

```bash
# 1. Verificar tipagem TypeScript (deve retornar 0 erros)
npm run check

# 2. Executar suíte de testes unitários e de integridade
npm test

# 3. Rodar o servidor de desenvolvimento
npm run dev
```

> **Aviso Importante:** Nunca modifique regras de rotas existentes sem preservar os redirecionamentos 301 (especialmente URLs legadas de clínicas e artigos indexados no Google).
