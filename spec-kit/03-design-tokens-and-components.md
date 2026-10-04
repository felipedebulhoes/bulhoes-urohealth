# Spec 03: Design Tokens & Componentes de UI

> **Status:** Aprovado  
> **Versão:** 1.0  
> **Identidade:** *Swiss Medical Design — Precision & Warmth*

---

## 1. Tokens de Cores Primárias e Superfícies

| Nome do Token | Valor Hex | Uso Principal |
|---|---|---|
| `--color-navy-dark` | `#1C3D5A` | Fundo principal da seção Hero, cabeçalhos escuros e seções de alto impacto. |
| `--color-night-blue` | `#0F2A3F` | Fundo do rodapé institucional e contrastes ultraprofundos. |
| `--color-copper` | `#B87333` | Cor metálica nobre da marca, bordas e base translúcida de badges (`rgba(184, 115, 51, 0.15)`). |
| `--color-copper-light` | `#D4884A` | Iluminação de botões no hover e acentos de destaque. |
| `--color-surface-light` | `#FEFEFE` | Fundo neutro limpo de seções clínicas e artigos de leitura. |
| `--color-surface-slate` | `#F8FAFB` | Fundo alternado de cartões de serviços e áreas secundárias. |

---

## 2. A Paleta Mineral dos 8 Tons Normativos

Utilizada para ícones de especialidades, marcadores de endereço e dados de contato:

```css
:root {
  --mineral-gold: #D9C58A;      /* Próstata / HPB, Telefones, Calendários */
  --mineral-amber: #E1B58A;     /* Cálculos Renais, Litotripsia, E-mails */
  --mineral-taupe: #C9B6A3;     /* Cirurgia Robótica, Divisores Neutros */
  --mineral-rose: #D8A5A5;      /* Andrologia, Saúde Masculina, Redes Sociais */
  --mineral-sage: #B7C0A1;      /* Urodinâmica, Teleconsulta, Horários */
  --mineral-lavender: #C7A9C8;  /* Vasectomia, Exames e Procedimentos */
  --mineral-slate: #AFC1D0;     /* Uro-oncologia, Pins de Localização (MapPin) */
  --mineral-bronze: #D5B18D;    /* ISTs, Meios de Pagamento (CreditCard) */
}
```

---

## 3. Tipografia Oficial

### 3.1. Fonte Display: `Callingstone`
- **Arquivo:** `/manus-storage/Callingstone_0c7058f7.ttf`
- **Definição CSS:**
  ```css
  @font-face {
    font-family: 'Callingstone';
    src: url('/manus-storage/Callingstone_0c7058f7.ttf') format('truetype');
    font-display: swap;
  }
  ```
- **Uso:** Títulos H1 e H2 de seções editoriais, nome do médico no Hero e marcas de luxo.

### 3.2. Fonte de Leitura e Interface: `Roboto`
- **Origem:** Google Fonts
- **Pesos:** 400 (Regular), 500 (Medium), 700 (Bold)
- **Uso:** Todo o corpo de texto, descrições médicas, listas, botões e formulários.

---

## 4. Especificação de Componentes de Ícones (Icon Badges)

Para assegurar legibilidade em qualquer resolução, os ícones em cards e no rodapé seguem o padrão construtivo em duas camadas:

```tsx
interface IconBadgeProps {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  mineralColor: string;
  size?: "sm" | "md" | "lg";
}

// Implementação Padrão:
// Container: w-7 h-7 rounded-md bg-[#B87333]/15 flex items-center justify-center shrink-0
// Ícone: w-3.5 h-3.5 com coloração direta via mineralColor
```

### Estados de Interação:
- **Hover no Card:** O container pai recebe classe `group`, e o badge reage com `group-hover:bg-[#B87333]/25 transition-colors duration-300`.
- **Acessibilidade:** Elementos interativos possuem atributo `aria-label` ou texto oculto para leitores de tela (`sr-only`).

---

## 5. Breakpoints Responsivos

- **Mobile Padrão:** `375px` a `639px` (1 coluna, padding lateral `px-4`).
- **Tablet / Sm:** `640px` a `767px` (2 colunas em listas de contato, padding `px-6`).
- **Desktop Médio:** `768px` a `1023px` (menu adaptado, grid de especialidades 2 a 3 colunas).
- **Desktop Amplo:** `1024px` a `1440px` (layout completo de 4 colunas no rodapé, max-w-7xl centralizado).
