# Superpower: Design System Enforcer

> **Especialidade:** Aplicação de Identidade Visual, *Swiss Medical Design*, Paleta Mineral de 8 Cores e Acessibilidade  
> **Escopo:** Componentes React (`client/src/components/*`), páginas (`client/src/pages/*`) e folhas de estilo (`client/src/index.css`).

---

## 1. Princípios do *Swiss Medical Design*

O design do Bulhões UroHealth comunica excelência técnica, higiene visual e acolhimento sofisticado através de:
- **Espaçamento generoso e ordenado:** Grid rigoroso, margens consistentes (`py-16`, `py-24`, `gap-6` a `gap-8`).
- **Contrastes de alta legibilidade:** Atendimento aos critérios WCAG AA/AAA para leitura sem esforço.
- **Microinterações discretas:** Transições suaves (`transition-colors duration-300`, `hover:scale-[1.02]`), sem animações espalhafatosas ou intrusivas.
- **Hierarquia visual limpa:** Títulos com personalidade clássica e corpo de texto com máxima clareza tipográfica.

---

## 2. Tipografia Normativa

| Aplicação | Fonte | Classe / Estilo CSS | Observações |
|---|---|---|---|
| **Títulos Nobres (H1, H2)** | `Callingstone` | `font-display tracking-wide` | Fonte serifada oficial localizada em `/manus-storage/Callingstone_0c7058f7.ttf`. Utilizada no Hero, títulos de seções principais e cabeçalhos de destaque. |
| **Subtítulos e Rótulos** | `Roboto` / `Inter` | `font-sans font-medium uppercase tracking-wider text-xs` | Rótulos de categoria ou especialidade com toque moderno. |
| **Texto de Apoio e Parágrafos** | `Roboto` | `font-sans text-muted-foreground leading-relaxed text-base` | Clareza máxima de leitura médica. |

---

## 3. Paleta Cromática e Regras de Superfície

### 3.1. Superfícies
- **Fundo Principal Escuro (Hero / Seções de Destaque):** `#1C3D5A`
- **Fundo do Rodapé:** `#0F2A3F`
- **Superfície dos Cards em Fundo Escuro:** `bg-[#1C3D5A]/80` ou `bg-white/[0.04]` com borda `border-white/10`
- **Superfície Clara Neutra:** `#FEFEFE` ou `#F8FAFB`
- **Cards em Fundo Claro:** `bg-white shadow-sm border border-slate-100 hover:border-slate-200`

### 3.2. Acentos Metálicos da Marca (Copper / Terracotta)
- **Cobre Primário:** `#B87333`
- **Cobre Iluminado / Hover:** `#D4884A`
- **Fundo Translúcido de Badges:** `bg-[#B87333]/15` (ou `bg-[#B87333]/25` no hover)

---

## 4. A Paleta Mineral dos 8 Tons (Ícones e Especialidades)

Qualquer ícone de especialidade, serviço ou elemento de contato **DEVE pertencer a um dos 8 tons minerais**:

```typescript
export const MINERAL_PALETTE = {
  gold: "#D9C58A",       // 1. Dourado Champanhe: Próstata, Telefones, Calendários, Destaques Nobres
  amber: "#E1B58A",      // 2. Âmbar Pêssego: Cálculos Renais, Litotripsia, E-mails de Contato
  taupe: "#C9B6A3",      // 3. Taupe Mineral: Cirurgia Robótica, Divisores, Estruturas
  rose: "#D8A5A5",       // 4. Coral Rosa Suave: Saúde Masculina, Andrologia, Redes Sociais
  sage: "#B7C0A1",       // 5. Verde Sálvia: Urodinâmica, Telemedicina, Horários de Funcionamento
  lavender: "#C7A9C8",   // 6. Lavanda Suave: Vasectomia, Procedimentos de Consultório
  slate: "#AFC1D0",      // 7. Azul Mineral: Uro-oncologia, Pin de Localização (MapPin), Doctoralia
  bronze: "#D5B18D",     // 8. Bronze Mineral: ISTs, Métodos de Pagamento (CreditCard)
} as const;
```

---

## 5. Padrão Obrigatório de Containers de Ícones (Icon Badges)

### ❌ Erro Comum:
```tsx
<!-- NUNCA FAÇA ISSO: ícone solto em marrom escuro, invisível em fundo escuro -->
<Phone className="w-5 h-5 text-[#B87333]" />
```

### ✅ Padrão Correto em Fundo Escuro (`#1C3D5A` ou `#0F2A3F`):
```tsx
<div className="w-7 h-7 rounded-md bg-[#B87333]/15 flex items-center justify-center shrink-0 group-hover:bg-[#B87333]/25 transition-colors">
  <Phone className="w-3.5 h-3.5" style={{ color: "#D9C58A" }} />
</div>
```

### ✅ Padrão Correto em Fundo Claro (`#FEFEFE` ou `#F8FAFB`):
```tsx
<div className="w-10 h-10 rounded-lg bg-[#B87333]/10 flex items-center justify-center shrink-0 group-hover:bg-[#B87333]/20 transition-colors">
  <Activity className="w-5 h-5 text-[#B87333]" />
</div>
```

---

## 6. Procedimento de Verificação Visual e Código

1. **Grep de cores legadas:** Procurar se há uso de cores duras descalibradas:
   `grep_search` por `text-red-500`, `text-blue-500`, `text-yellow-400`.
2. **Inspecionar renderização responsiva:** Testar em telas mobile (375px), tablet (768px) e desktop (1280px+).
3. **Checagem de contraste:** Verificar se textos sobre `#1C3D5A` e `#0F2A3F` usam classes de alto contraste como `text-white` ou `text-white/80`.
