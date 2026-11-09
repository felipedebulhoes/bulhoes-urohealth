/**
 * Atlas Anatômico e Funcional Didático para as Landing Pages de Áreas de Atuação
 * Padrão Visual: Quiet Luxury / Espresso (#2E2520) & Paleta Mineral — Clinical Precision
 * Conformidade: Resolução CFM nº 2.336/2023 (Ilustrações esquemáticas educativas, sem fotos antes/depois)
 */
import React from "react";
import { ShieldCheck } from "lucide-react";

interface LegendItem {
  color: string;
  dashed?: boolean;
  label: string;
}

interface AtlasFigure {
  tag: string;
  viewLabel: string;
  title: string;
  description: React.ReactNode;
  svg: React.ReactNode;
  legends: [LegendItem, LegendItem, LegendItem, LegendItem];
}

interface AtlasDefinition {
  eyebrow: string;
  title: string;
  badgeText: string;
  figures: [AtlasFigure, AtlasFigure];
}

const ATLAS_BY_SLUG: Record<string, AtlasDefinition> = {
  /* -------------------------------------------------------------------------- */
  /* 1. SAÚDE DA PRÓSTATA E HPB                                                 */
  /* -------------------------------------------------------------------------- */
  "saude-da-prostata": {
    eyebrow: "Atlas Anatômico Didático · Ilustração Esquematizada",
    title: "Por que a próstata aumentada dificulta o fluxo urinário e como desobstruímos?",
    badgeText: "Esfíncter urinário e nervos da ereção preservados",
    figures: [
      {
        tag: "Figura 1 · Corte Anatômico Sagital",
        viewLabel: "Mecanismo da HPB",
        title: "Próstata Normal vs. Compressão da Uretra na HPB",
        description: (
          <>
            A próstata envolve a uretra logo abaixo da bexiga. Quando a{" "}
            <strong>zona de transição</strong> cresce (HPB), comprime o canal urinário e força o
            músculo da bexiga (detrusor) a trabalhar sob alta pressão.
          </>
        ),
        svg: (
          <svg
            viewBox="0 0 420 300"
            className="w-full h-auto"
            role="img"
            aria-label="Diagrama comparando próstata normal com canal uretral livre versus próstata aumentada (HPB) comprimindo a uretra."
          >
            {/* Divisória central */}
            <line x1="210" y1="24" x2="210" y2="276" stroke="#C9B6A3" strokeOpacity="0.3" strokeDasharray="4 4" />

            {/* LADO ESQUERDO: Próstata Normal */}
            <text x="105" y="24" textAnchor="middle" fill="#B7C0A1" fontSize="11" fontWeight="700">
              ANATOMIA NORMAL
            </text>
            {/* Bexiga */}
            <ellipse cx="105" cy="82" rx="54" ry="38" fill="#3B2E28" stroke="#AFC1D0" strokeWidth="2" />
            <text x="105" y="85" textAnchor="middle" fill="#E7E1DA" fontSize="10" fontWeight="600">
              Bexiga Livre
            </text>
            {/* Próstata Normal */}
            <path
              d="M 68 128 Q 62 162 82 190 L 128 190 Q 148 162 142 128 Z"
              fill="#332722"
              stroke="#B7C0A1"
              strokeWidth="2"
            />
            {/* Uretra Ampla */}
            <rect x="98" y="118" width="14" height="120" rx="5" fill="#2E2520" stroke="#AFC1D0" strokeWidth="1.5" />
            {/* Fluxo Urinário Forte */}
            <line x1="105" y1="130" x2="105" y2="225" stroke="#D9C58A" strokeWidth="2.5" strokeDasharray="5 3" />
            <text x="105" y="256" textAnchor="middle" fill="#B7C0A1" fontSize="9.5" fontWeight="600">
              Canal Amplo · Jato Forte
            </text>

            {/* LADO DIREITO: HPB Obstrutiva */}
            <text x="315" y="24" textAnchor="middle" fill="#E1B58A" fontSize="11" fontWeight="700">
              HPB OBSTRUTIVA
            </text>
            {/* Bexiga Espessada (Esforço Detrusor) */}
            <ellipse cx="315" cy="82" rx="56" ry="40" fill="#3B2E28" stroke="#D8A5A5" strokeWidth="4" />
            <text x="315" y="80" textAnchor="middle" fill="#D8A5A5" fontSize="9.5" fontWeight="700">
              Bexiga de Esforço
            </text>
            <text x="315" y="92" textAnchor="middle" fill="#E7E1DA" fontSize="8.5">
              (Urina Residual)
            </text>
            {/* Próstata Aumentada (Adenoma comprimindo o centro) */}
            <path
              d="M 252 124 Q 242 168 272 204 L 358 204 Q 388 168 378 124 Z"
              fill="#4A342B"
              stroke="#E1B58A"
              strokeWidth="2.2"
            />
            {/* Lobos hiperplásicos estreitando a uretra */}
            <ellipse cx="296" cy="162" rx="22" ry="26" fill="#D8A5A5" fillOpacity="0.3" stroke="#E1B58A" strokeWidth="1.5" />
            <ellipse cx="334" cy="162" rx="22" ry="26" fill="#D8A5A5" fillOpacity="0.3" stroke="#E1B58A" strokeWidth="1.5" />
            {/* Uretra Estreitada */}
            <path d="M 312 118 L 314 162 L 312 238 L 318 238 L 316 162 L 318 118 Z" fill="#D9C58A" />
            <text x="315" y="256" textAnchor="middle" fill="#E1B58A" fontSize="9.5" fontWeight="600">
              Canal Comprimido · Jato Fraco
            </text>
          </svg>
        ),
        legends: [
          { color: "#AFC1D0", label: "Bexiga e Canal Uretral" },
          { color: "#B7C0A1", label: "Próstata com Volume Normal" },
          { color: "#E1B58A", label: "Adenoma Prostático (HPB)" },
          { color: "#D8A5A5", label: "Sobrecarga da Parede Vesical" },
        ],
      },
      {
        tag: "Figura 2 · Desobstrução a Laser / Vapor",
        viewLabel: "Preservação Funcional",
        title: "Remoção Seletiva do Adenoma e Proteção dos Nervos",
        description: (
          <>
            As técnicas transuretrais modernas (HoLEP, GreenLight, Rezūm) atuam{" "}
            <strong>exclusivamente por dentro do canal</strong> na zona interna da próstata, sem
            tocar nos nervos externos da ereção nem no esfíncter da continência.
          </>
        ),
        svg: (
          <svg
            viewBox="0 0 420 300"
            className="w-full h-auto"
            role="img"
            aria-label="Diagrama mostrando a enucleação/vaporização da zona interna da próstata preservando a cápsula prostática, esfíncter e feixes neurovasculares."
          >
            {/* Cápsula Prostática Externa Preservada */}
            <ellipse cx="210" cy="148" rx="115" ry="88" fill="#3B2E28" stroke="#C9B6A3" strokeWidth="2.5" />

            {/* Feixes Neurovasculares Laterais (Fora da Cápsula - Intactos) */}
            <path d="M 82 95 Q 68 148 82 205" fill="none" stroke="#D9C58A" strokeWidth="3.5" strokeDasharray="6 3" />
            <path d="M 338 95 Q 352 148 338 205" fill="none" stroke="#D9C58A" strokeWidth="3.5" strokeDasharray="6 3" />

            {/* Loja Prostática Desobstruída (Canal Amplo) */}
            <ellipse cx="210" cy="148" rx="58" ry="48" fill="#2E2520" stroke="#B7C0A1" strokeWidth="2.5" />
            <text x="210" y="143" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">
              Canal Desobstruído
            </text>
            <text x="210" y="158" textAnchor="middle" fill="#B7C0A1" fontSize="9.5">
              (Fluxo Livre Restaurado)
            </text>

            {/* Esfíncter Urinário Externo (Abaixo do Verumontanum - Protegido) */}
            <rect x="165" y="242" width="90" height="20" rx="8" fill="#221A17" stroke="#AFC1D0" strokeWidth="2" />
            <text x="210" y="255" textAnchor="middle" fill="#AFC1D0" fontSize="9.5" fontWeight="700">
              Esfíncter Urinário Intacto
            </text>

            {/* Callouts */}
            <text x="22" y="76" fill="#D9C58A" fontSize="9.5" fontWeight="700">
              Nervos da Ereção
            </text>
            <text x="22" y="88" fill="#E7E1DA" fontSize="8.5">
              100% externos à cápsula
            </text>
            <line x1="75" y1="115" x2="55" y2="94" stroke="#D9C58A" strokeWidth="1.3" />

            <text x="398" y="76" textAnchor="end" fill="#C9B6A3" fontSize="9.5" fontWeight="700">
              Cápsula Prostática
            </text>
            <text x="398" y="88" textAnchor="end" fill="#E7E1DA" fontSize="8.5">
              Limite de segurança
            </text>
            <line x1="312" y1="110" x2="348" y2="92" stroke="#C9B6A3" strokeWidth="1.3" />
          </svg>
        ),
        legends: [
          { color: "#B7C0A1", label: "Canal Desobstruído (Laser/Vapor)" },
          { color: "#C9B6A3", label: "Cápsula Prostática Preservada" },
          { color: "#D9C58A", dashed: true, label: "Feixes da Ereção (Externos)" },
          { color: "#AFC1D0", label: "Esfíncter da Continência" },
        ],
      },
    ],
  },

  /* -------------------------------------------------------------------------- */
  /* 2. CÁLCULOS RENAIS E LITOTRIPSIA A LASER                                   */
  /* -------------------------------------------------------------------------- */
  "litotripsia-calculo-renal": {
    eyebrow: "Atlas Anatômico Didático · Ilustração Esquematizada",
    title: "Como o laser pulveriza o cálculo renal sem nenhum corte externo?",
    badgeText: "Acesso 100% endoscópico pelos canais naturais",
    figures: [
      {
        tag: "Figura 1 · Anatomia da Via Urinária",
        viewLabel: "Obstrução e Cólica",
        title: "Pontos Críticos de Impactação do Cálculo no Ureter",
        description: (
          <>
            A dor intensa da cólica renal não vem da pedra parada no rim, mas sim quando o cálculo{" "}
            <strong>migra para o ureter</strong> e bloqueia a descida da urina, causando dilatação
            renal (hidronefrose).
          </>
        ),
        svg: (
          <svg
            viewBox="0 0 420 300"
            className="w-full h-auto"
            role="img"
            aria-label="Diagrama do rim, pelve renal, ureter e bexiga mostrando os três estreitamentos anatômicos onde o cálculo costuma impactar."
          >
            {/* Rim Esquerdo Esquematizado */}
            <path
              d="M 145 42 C 95 42, 78 95, 92 140 C 102 175, 138 195, 168 182 C 185 174, 182 142, 168 122 C 182 102, 182 42, 145 42 Z"
              fill="#3B2E28"
              stroke="#C9B6A3"
              strokeWidth="2.5"
            />
            {/* Pelve Renal Dilatada (Hidronefrose) */}
            <path
              d="M 135 88 Q 168 112 195 128 L 195 152 Q 165 148 135 138 Z"
              fill="#2E2520"
              stroke="#AFC1D0"
              strokeWidth="2"
            />
            {/* Ureter descendo até a bexiga */}
            <path
              d="M 192 138 Q 210 195 225 252"
              fill="none"
              stroke="#C9B6A3"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M 192 138 Q 210 195 225 252"
              fill="none"
              stroke="#221A17"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Cálculo Impactado no Ureter */}
            <polygon
              points="206,182 216,177 220,188 211,196 202,190"
              fill="#D9C58A"
              stroke="#E1B58A"
              strokeWidth="2"
            />
            <circle cx="211" cy="187" r="18" fill="none" stroke="#D8A5A5" strokeWidth="1.8" strokeDasharray="3 3" />

            {/* Cálculo Calicial no Rim */}
            <polygon points="126,76 135,73 138,82 129,86" fill="#D9C58A" />

            {/* Bexiga na base */}
            <ellipse cx="255" cy="264" rx="52" ry="24" fill="#3B2E28" stroke="#AFC1D0" strokeWidth="2" />
            <text x="255" y="268" textAnchor="middle" fill="#E7E1DA" fontSize="10" fontWeight="600">
              Bexiga
            </text>

            {/* Rótulos Explicativos */}
            <line x1="152" y1="104" x2="275" y2="66" stroke="#AFC1D0" strokeWidth="1.3" />
            <text x="282" y="64" fill="#AFC1D0" fontSize="10" fontWeight="700">
              1. Hidronefrose (Represamento)
            </text>
            <text x="282" y="77" fill="#E7E1DA" fontSize="8.5">
              Aumento de pressão que gera a cólica
            </text>

            <line x1="228" y1="187" x2="280" y2="165" stroke="#D9C58A" strokeWidth="1.5" />
            <text x="286" y="162" fill="#D9C58A" fontSize="10" fontWeight="700">
              2. Cálculo Ureteral Obstrutivo
            </text>
            <text x="286" y="175" fill="#E7E1DA" fontSize="8.5">
              Bloqueia a passagem da urina
            </text>
          </svg>
        ),
        legends: [
          { color: "#D9C58A", label: "Cálculo Renal / Ureteral" },
          { color: "#AFC1D0", label: "Urina Represada (Hidronefrose)" },
          { color: "#D8A5A5", dashed: true, label: "Ponto de Inflamação e Espasmo" },
          { color: "#C9B6A3", label: "Parênquima Renal e Ureter" },
        ],
      },
      {
        tag: "Figura 2 · Ureterorrenoscopia Flexível",
        viewLabel: "Pulverização a Laser",
        title: "Fibra Laser Holmium (Dusting) e Cateter Duplo J",
        description: (
          <>
            O microendoscópio flexível navega pela via urinária natural até o cálculo. A{" "}
            <strong>fibra de Holmium Laser</strong> converte a pedra em pó submilimétrico (
            <em>dusting</em>) eliminado naturalmente na urina.
          </>
        ),
        svg: (
          <svg
            viewBox="0 0 420 300"
            className="w-full h-auto"
            role="img"
            aria-label="Diagrama mostrando a ponta do ureteroscópio flexível emitindo energia laser Holmium para pulverizar o cálculo em micropartículas."
          >
            {/* Canal Ureteral / Cálice Renal Ampliado */}
            <path d="M 65 75 L 355 52 L 355 248 L 65 225 Z" fill="#221A17" stroke="#C9B6A3" strokeWidth="2" />

            {/* Ureteroscópio Flexível entrando pela esquerda */}
            <rect x="40" y="132" width="145" height="34" rx="16" fill="#3B2E28" stroke="#AFC1D0" strokeWidth="2.2" />
            <text x="112" y="153" textAnchor="middle" fill="#AFC1D0" fontSize="9.5" fontWeight="700">
              Ureteroscópio Flexível
            </text>

            {/* Fibra Óptica de Laser Holmium */}
            <line x1="185" y1="149" x2="235" y2="149" stroke="#B7C0A1" strokeWidth="4" />

            {/* Feixe de Energia Laser */}
            <polygon points="235,147 282,122 282,176" fill="#D9C58A" fillOpacity="0.38" />
            <line x1="235" y1="149" x2="282" y2="149" stroke="#D9C58A" strokeWidth="2.5" strokeDasharray="4 2" />

            {/* Cálculo sendo Pulverizado em Pó (Dusting) */}
            <polygon
              points="282,118 324,110 338,148 318,184 282,175"
              fill="#4A3A30"
              stroke="#D9C58A"
              strokeWidth="2.2"
              strokeDasharray="5 3"
            />
            {[
              { cx: 274, cy: 112, r: 3.5 },
              { cx: 264, cy: 126, r: 2.5 },
              { cx: 272, cy: 185, r: 3 },
              { cx: 344, cy: 124, r: 3 },
              { cx: 348, cy: 166, r: 2.5 },
              { cx: 332, cy: 192, r: 3.5 },
            ].map((p, i) => (
              <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill="#E5D4A1" />
            ))}

            {/* Rótulos */}
            <text x="210" y="34" textAnchor="middle" fill="#D9C58A" fontSize="10.5" fontWeight="700">
              Pulverização Submilimétrica (&lt; 1 mm) Sem Cortes Externos
            </text>
            <text x="210" y="276" textAnchor="middle" fill="#B7C0A1" fontSize="9.5" fontWeight="600">
              Visão Digital HD Direta · Mínimo Trauma na Mucosa Ureteral
            </text>
          </svg>
        ),
        legends: [
          { color: "#AFC1D0", label: "Óptica Flexível Digital" },
          { color: "#B7C0A1", label: "Fibra Laser Holmium (200 µm)" },
          { color: "#D9C58A", label: "Feixe Laser e Micropartículas" },
          { color: "#C9B6A3", label: "Parede do Ureter / Cálice Renal" },
        ],
      },
    ],
  },

  /* -------------------------------------------------------------------------- */
  /* 3. CIRURGIA ROBÓTICA EM UROLOGIA                                           */
  /* -------------------------------------------------------------------------- */
  "cirurgia-robotica-urologia": {
    eyebrow: "Atlas Anatômico Didático · Ilustração Esquematizada",
    title: "Por que a visão 3D em 10x e as pinças robóticas aumentam a preservação funcional?",
    badgeText: "Precisão milimétrica para continência e potência sexual",
    figures: [
      {
        tag: "Figura 1 · Preservação Neurovascular Pélvica",
        viewLabel: "Magnificação 3D em 10x",
        title: "Dissecção Interfascial dos Nervos da Ereção e Esfíncter",
        description: (
          <>
            Na prostatectomia robótica, a câmera 3D HD amplia em até 10 vezes o plano milimétrico
            entre a próstata e o <strong>feixe neurovascular</strong>, permitindo preservar os
            microfilamentos responsáveis pela ereção e continência.
          </>
        ),
        svg: (
          <svg
            viewBox="0 0 420 300"
            className="w-full h-auto"
            role="img"
            aria-label="Diagrama do campo cirúrgico robótico ampliado em 10x mostrando a separação delicada entre a cápsula prostática e os feixes neurovasculares."
          >
            {/* Moldura Lente 3D 10x */}
            <circle cx="210" cy="150" r="118" fill="#1C2833" stroke="#AFC1D0" strokeWidth="2.5" />
            <circle cx="210" cy="150" r="112" fill="none" stroke="#D9C58A" strokeWidth="1" strokeDasharray="4 4" />

            {/* Próstata Central */}
            <ellipse cx="210" cy="148" rx="56" ry="52" fill="#3B2E28" stroke="#C9B6A3" strokeWidth="2.2" />
            <text x="210" y="146" textAnchor="middle" fill="#E7E1DA" fontSize="10.5" fontWeight="700">
              Próstata
            </text>
            <text x="210" y="160" textAnchor="middle" fill="#C9B6A3" fontSize="8.5">
              (Plano Capsular)
            </text>

            {/* Plano de Dissecção Robótica (Linha Verde Sálvia) */}
            <path d="M 142 104 Q 126 148 142 194" fill="none" stroke="#B7C0A1" strokeWidth="2.5" strokeDasharray="5 3" />
            <path d="M 278 104 Q 294 148 278 194" fill="none" stroke="#B7C0A1" strokeWidth="2.5" strokeDasharray="5 3" />

            {/* Feixes Neurovasculares Preservados */}
            <path d="M 126 98 Q 108 148 126 200" fill="none" stroke="#D9C58A" strokeWidth="4" />
            <path d="M 294 98 Q 312 148 294 200" fill="none" stroke="#D9C58A" strokeWidth="4" />

            {/* Esfíncter Uretral Apical */}
            <rect x="176" y="212" width="68" height="20" rx="7" fill="#2E2520" stroke="#AFC1D0" strokeWidth="2" />
            <text x="210" y="225" textAnchor="middle" fill="#AFC1D0" fontSize="8.5" fontWeight="700">
              Esfíncter Apical
            </text>

            {/* Rótulo Magnificação */}
            <rect x="145" y="10" width="130" height="22" rx="11" fill="#D9C58A" />
            <text x="210" y="24" textAnchor="middle" fill="#221A17" fontSize="9.5" fontWeight="700">
              VISÃO 3D HD · ZOOM 10X
            </text>
          </svg>
        ),
        legends: [
          { color: "#D9C58A", label: "Feixes Neurovasculares (Potência)" },
          { color: "#B7C0A1", dashed: true, label: "Plano Atraumático de Dissecção" },
          { color: "#AFC1D0", label: "Esfíncter Urinário (Continência)" },
          { color: "#C9B6A3", label: "Cápsula Prostática" },
        ],
      },
      {
        tag: "Figura 2 · Portais de 8 mm vs. Cirurgia Aberta",
        viewLabel: "Mínimo Trauma Tecidual",
        title: "Articulação EndoWrist (540°) e Filtragem de Tremor",
        description: (
          <>
            Em vez de uma grande incisão abdominal aberta de 15–20 cm, toda a cirurgia ocorre por{" "}
            <strong>4 a 5 microportais de 8 mm</strong>, com menor sangramento, mínima dor e
            retorno acelerado à rotina.
          </>
        ),
        svg: (
          <svg
            viewBox="0 0 420 300"
            className="w-full h-auto"
            role="img"
            aria-label="Diagrama comparando os microportais robóticos de 8 mm com a incisão abdominal aberta tradicional."
          >
            {/* Contorno Abdominal Esquematizado */}
            <rect x="95" y="32" width="230" height="236" rx="48" fill="#3B2E28" stroke="#C9B6A3" strokeWidth="2" />

            {/* Cicatriz Aberta Tradicional (Tracejada em Rosa para comparação) */}
            <line x1="210" y1="125" x2="210" y2="245" stroke="#D8A5A5" strokeWidth="3" strokeDasharray="6 4" />
            <text x="222" y="218" fill="#D8A5A5" fontSize="8.5" fontWeight="600">
              Incisão aberta clássica (15–18 cm)
            </text>

            {/* 5 Microportais Robóticos de 8 mm em Arco */}
            {[
              { cx: 132, cy: 138, label: "8 mm" },
              { cx: 168, cy: 112, label: "8 mm" },
              { cx: 210, cy: 102, label: "Câmera 3D" },
              { cx: 252, cy: 112, label: "8 mm" },
              { cx: 288, cy: 138, label: "8 mm" },
            ].map((p, idx) => (
              <g key={idx}>
                <circle cx={p.cx} cy={p.cy} r="7" fill="#D9C58A" stroke="#221A17" strokeWidth="2" />
                <text x={p.cx} y={p.cy - 12} textAnchor="middle" fill="#D9C58A" fontSize="8.5" fontWeight="700">
                  {p.label}
                </text>
              </g>
            ))}

            {/* Indicador de Rotação EndoWrist 540° */}
            <circle cx="152" cy="202" r="24" fill="#221A17" stroke="#B7C0A1" strokeWidth="1.8" />
            <text x="152" y="200" textAnchor="middle" fill="#B7C0A1" fontSize="9.5" fontWeight="700">
              540°
            </text>
            <text x="152" y="211" textAnchor="middle" fill="#E7E1DA" fontSize="7.5">
              EndoWrist
            </text>
          </svg>
        ),
        legends: [
          { color: "#D9C58A", label: "Portais Robóticos de 8 mm" },
          { color: "#B7C0A1", label: "Pinças com Rotação de 540°" },
          { color: "#D8A5A5", dashed: true, label: "Corte Aberto Evitado" },
          { color: "#C9B6A3", label: "Parede Abdominal Preservada" },
        ],
      },
    ],
  },

  /* -------------------------------------------------------------------------- */
  /* 4. ANDROLOGIA, SAÚDE DO HOMEM E VARICOCELECTOMIA COM MICROSCÓPIO           */
  /* -------------------------------------------------------------------------- */
  "andrologia-performance-masculina": {
    eyebrow: "Atlas Anatômico Didático · Ilustração Esquematizada",
    title: "Como funciona a Varicocelectomia com Microscópio e o Eixo da Testosterona?",
    badgeText: "Magnificação óptica de 20x e equilíbrio hormonal",
    figures: [
      {
        tag: "Figura 1 · Microcirurgia Subinguinal (Zoom 20x)",
        viewLabel: "Varicocelectomia com Microscópio",
        title: "Ligadura Seletiva das Veias e Preservação da Artéria Testicular",
        description: (
          <>
            Com o <strong>microscópio cirúrgico óptico</strong>, ampliamos o cordão espermático em
            até 20x para ligar apenas as veias varicosas que aquecem o testículo, mantendo{" "}
            <strong>100% intactos</strong> a artéria testicular, os vasos linfáticos e o ducto
            deferente.
          </>
        ),
        svg: (
          <svg
            viewBox="0 0 420 300"
            className="w-full h-auto"
            role="img"
            aria-label="Diagrama da visão ao microscópio cirúrgico (20x) durante a varicocelectomia subinguinal mostrando veias varicosas ligadas e artéria testicular e linfáticos preservados."
          >
            {/* Campo Circular do Microscópio Óptico 20x */}
            <circle cx="210" cy="152" r="114" fill="#221A17" stroke="#D9C58A" strokeWidth="2.5" />

            {/* Veias Espermáticas Dilatadas (Varicocele) com Microclipes de Titânio */}
            <path d="M 148 64 Q 162 152 148 240" fill="none" stroke="#7BA3C4" strokeWidth="10" />
            <path d="M 176 58 Q 186 152 176 246" fill="none" stroke="#7BA3C4" strokeWidth="8" />
            {/* Microclipes / Ligaduras nas veias varicosas */}
            <rect x="142" y="138" width="20" height="7" rx="2" fill="#D9C58A" />
            <rect x="142" y="158" width="20" height="7" rx="2" fill="#D9C58A" />
            <rect x="170" y="138" width="18" height="7" rx="2" fill="#D9C58A" />
            <rect x="170" y="158" width="18" height="7" rx="2" fill="#D9C58A" />

            {/* Artéria Testicular Pulsátil (Preservada Intacta) */}
            <path d="M 218 56 Q 210 152 218 248" fill="none" stroke="#D8A5A5" strokeWidth="5" />

            {/* Canais Linfáticos Transparentes (Preservados - Evita Hidrocele) */}
            <path d="M 248 64 Q 242 152 248 240" fill="none" stroke="#B7C0A1" strokeWidth="3.5" strokeDasharray="5 3" />

            {/* Ducto Deferente (Preservado) */}
            <path d="M 276 78 Q 268 152 276 226" fill="none" stroke="#E5D4A1" strokeWidth="6" />

            {/* Rótulos Externos */}
            <rect x="135" y="10" width="150" height="22" rx="11" fill="#D9C58A" />
            <text x="210" y="24" textAnchor="middle" fill="#221A17" fontSize="9.5" fontWeight="700">
              VISÃO DO MICROSCÓPIO · 20X
            </text>

            <text x="14" y="145" fill="#7BA3C4" fontSize="9.5" fontWeight="700">
              Veias Varicosas
            </text>
            <text x="14" y="157" fill="#D9C58A" fontSize="8.5">
              Ligadas com precisão
            </text>
            <line x1="92" y1="148" x2="142" y2="148" stroke="#D9C58A" strokeWidth="1.2" />

            <text x="406" y="124" textAnchor="end" fill="#D8A5A5" fontSize="9.5" fontWeight="700">
              Artéria Testicular
            </text>
            <text x="406" y="136" textAnchor="end" fill="#E7E1DA" fontSize="8.5">
              100% Preservada
            </text>
            <line x1="222" y1="128" x2="318" y2="128" stroke="#D8A5A5" strokeWidth="1.2" />

            <text x="406" y="182" textAnchor="end" fill="#B7C0A1" fontSize="9.5" fontWeight="700">
              Vasos Linfáticos
            </text>
            <text x="406" y="194" textAnchor="end" fill="#E7E1DA" fontSize="8.5">
              Evita hidrocele (&lt;1%)
            </text>
            <line x1="248" y1="184" x2="322" y2="184" stroke="#B7C0A1" strokeWidth="1.2" />
          </svg>
        ),
        legends: [
          { color: "#7BA3C4", label: "Veias Dilatadas (Ocluídas)" },
          { color: "#D8A5A5", label: "Artéria Testicular Preservada" },
          { color: "#B7C0A1", dashed: true, label: "Linfáticos Intactos (Sem Hidrocele)" },
          { color: "#E5D4A1", label: "Ducto Deferente Protegido" },
        ],
      },
      {
        tag: "Figura 2 · Biodisponibilidade Hormonal",
        viewLabel: "Testosterona Total vs. Livre",
        title: "Por que apenas a Testosterona Total não conta toda a história?",
        description: (
          <>
            Grande parte da testosterona no sangue fica presa à proteína <strong>SHBG</strong>{" "}
            (inativa). Avaliamos a <strong>fração Livre e Biodisponível</strong> — a única que
            realmente entra nas células para gerar energia, libido e massa muscular.
          </>
        ),
        svg: (
          <svg
            viewBox="0 0 420 300"
            className="w-full h-auto"
            role="img"
            aria-label="Diagrama das frações da testosterona no sangue: ligada ao SHBG (inativa) versus testosterona livre e ligada à albumina (biodisponível ativa)."
          >
            {/* Barra de Composição da Testosterona Sérica */}
            <text x="210" y="42" textAnchor="middle" fill="#E7E1DA" fontSize="11" fontWeight="700">
               DISTRIBUIÇÃO DA TESTOSTERONA NA CORRENTE SANGUÍNEA
            </text>

            {/* Bloco 1: Ligada ao SHBG (~60%) */}
            <rect x="36" y="68" width="196" height="64" rx="10" fill="#3B2E28" stroke="#C9B6A3" strokeWidth="2" />
            <text x="134" y="96" textAnchor="middle" fill="#C9B6A3" fontSize="11" fontWeight="700">
              Ligada ao SHBG (~60%)
            </text>
            <text x="134" y="114" textAnchor="middle" fill="#E7E1DA" fontSize="9">
              Biologicamente Inativa nos Tecidos
            </text>

            {/* Bloco 2: Ligada à Albumina (~38%) */}
            <rect x="240" y="68" width="102" height="64" rx="10" fill="#2A3E33" stroke="#B7C0A1" strokeWidth="2" />
            <text x="291" y="96" textAnchor="middle" fill="#B7C0A1" fontSize="10" fontWeight="700">
              Albumina (~38%)
            </text>
            <text x="291" y="114" textAnchor="middle" fill="#E7E1DA" fontSize="8.5">
              Biodisponível
            </text>

            {/* Bloco 3: Livre (2-3%) */}
            <rect x="350" y="68" width="38" height="64" rx="10" fill="#D9C58A" />
            <text x="369" y="96" textAnchor="middle" fill="#221A17" fontSize="9.5" fontWeight="800">
              2–3%
            </text>
            <text x="369" y="112" textAnchor="middle" fill="#221A17" fontSize="8" fontWeight="700">
              Livre
            </text>

            {/* Chave Agrupadora: Testosterona Biodisponível (Ativa nos Receptores) */}
            <path d="M 242 144 L 242 158 L 386 158 L 386 144" fill="none" stroke="#D9C58A" strokeWidth="2" />
            <line x1="314" y1="158" x2="314" y2="180" stroke="#D9C58A" strokeWidth="2" />

            {/* Card de Ação Celular */}
            <rect x="75" y="182" width="270" height="84" rx="12" fill="#221A17" stroke="#D9C58A" strokeWidth="2" />
            <text x="210" y="206" textAnchor="middle" fill="#D9C58A" fontSize="11" fontWeight="700">
              FRAÇÃO BIODISPONÍVEL ATIVA (RECEPTORES)
            </text>
            <text x="210" y="226" textAnchor="middle" fill="#E7E1DA" fontSize="9.5">
              • Libido, Ereções Matinais e Confiança Sexual
            </text>
            <text x="210" y="242" textAnchor="middle" fill="#E7E1DA" fontSize="9.5">
              • Energia Física, Foco Cognitivo e Síntese Muscular
            </text>
            <text x="210" y="256" textAnchor="middle" fill="#B7C0A1" fontSize="8.5">
              Controle simultâneo de Estradiol, LH, FSH, Hematócrito e PSA
            </text>
          </svg>
        ),
        legends: [
          { color: "#D9C58A", label: "Testosterona Livre (Ação Direta)" },
          { color: "#B7C0A1", label: "Fração Biodisponível (Albumina)" },
          { color: "#C9B6A3", label: "Retida pelo SHBG (Inativa)" },
          { color: "#AFC1D0", label: "Eixo Hipófise-Testículo (LH/FSH)" },
        ],
      },
    ],
  },

  /* -------------------------------------------------------------------------- */
  /* 5. AVALIAÇÃO URODINÂMICA E INCONTINÊNCIA URINÁRIA                          */
  /* -------------------------------------------------------------------------- */
  "avaliacao-urodinamica": {
    eyebrow: "Atlas Funcional Didático · Ilustração Esquematizada",
    title: "O que o Estudo Urodinâmico mede para acertar o seu tratamento?",
    badgeText: "Diferenciação precisa entre bexiga, esfíncter e próstata",
    figures: [
      {
        tag: "Figura 1 · Equilíbrio Pressórico Vesical",
        viewLabel: "Enchimento vs. Micção",
        title: "Coordenação entre Músculo Detrusor e Esfíncter",
        description: (
          <>
            Para armazenar urina sem perdas, a bexiga deve permanecer{" "}
            <strong>relaxada sob baixa pressão</strong> enquanto o esfíncter fica fechado. Na hora
            de urinar, o esfíncter relaxa e o detrusor contrai de forma livre.
          </>
        ),
        svg: (
          <svg
            viewBox="0 0 420 300"
            className="w-full h-auto"
            role="img"
            aria-label="Diagrama comparando a fase de armazenamento vesical (baixa pressão e esfíncter fechado) com a fase de esvaziamento (contração coordenada e esfíncter aberto)."
          >
            <line x1="210" y1="24" x2="210" y2="276" stroke="#C9B6A3" strokeOpacity="0.3" strokeDasharray="4 4" />

            {/* Fase 1: Armazenamento */}
            <text x="105" y="28" textAnchor="middle" fill="#AFC1D0" fontSize="10.5" fontWeight="700">
              1. FASE DE ENCHIMENTO
            </text>
            <ellipse cx="105" cy="112" rx="58" ry="48" fill="#3B2E28" stroke="#AFC1D0" strokeWidth="2.2" />
            <text x="105" y="108" textAnchor="middle" fill="#AFC1D0" fontSize="10" fontWeight="700">
              Detrusor Relaxado
            </text>
            <text x="105" y="122" textAnchor="middle" fill="#E7E1DA" fontSize="8.5">
              (Baixa Pressão Interna)
            </text>
            {/* Esfíncter Fechado */}
            <rect x="82" y="168" width="46" height="22" rx="6" fill="#D9C58A" />
            <text x="105" y="183" textAnchor="middle" fill="#221A17" fontSize="8.5" fontWeight="800">
              FECHADO
            </text>
            <text x="105" y="220" textAnchor="middle" fill="#B7C0A1" fontSize="9.5" fontWeight="600">
              Continência Segura (Sem Escape)
            </text>

            {/* Fase 2: Esvaziamento */}
            <text x="315" y="28" textAnchor="middle" fill="#D9C58A" fontSize="10.5" fontWeight="700">
              2. FASE DE MICÇÃO
            </text>
            <ellipse cx="315" cy="112" rx="50" ry="42" fill="#3B2E28" stroke="#D9C58A" strokeWidth="3" />
            <text x="315" y="108" textAnchor="middle" fill="#D9C58A" fontSize="10" fontWeight="700">
              Contração Eficaz
            </text>
            <text x="315" y="122" textAnchor="middle" fill="#E7E1DA" fontSize="8.5">
              (Comando Voluntário)
            </text>
            {/* Canal Aberto */}
            <rect x="303" y="154" width="24" height="72" rx="6" fill="#2E2520" stroke="#B7C0A1" strokeWidth="2" />
            <line x1="315" y1="162" x2="315" y2="245" stroke="#D9C58A" strokeWidth="3" strokeDasharray="5 3" />
            <text x="315" y="264" textAnchor="middle" fill="#D9C58A" fontSize="9.5" fontWeight="600">
              Esvaziamento Completo Sem Esforço
            </text>
          </svg>
        ),
        legends: [
          { color: "#AFC1D0", label: "Bexiga em Repouso (Armazenamento)" },
          { color: "#D9C58A", label: "Esfíncter / Contração Coordenada" },
          { color: "#B7C0A1", label: "Via de Saída Relaxada e Livre" },
          { color: "#C9B6A3", label: "Sensores de Pressão Milimétricos" },
        ],
      },
      {
        tag: "Figura 2 · Padrões Diagnósticos na Urodinâmica",
        viewLabel: "Curvas Pressão × Fluxo",
        title: "Como diferenciamos Hiperatividade, Esforço e Obstrução",
        description: (
          <>
            Sintomas parecidos podem ter causas opostas. O gráfico urodinâmico identifica com
            exatidão qual mecanismo está alterado antes de indicar medicação, laser ou sling.
          </>
        ),
        svg: (
          <svg
            viewBox="0 0 420 300"
            className="w-full h-auto"
            role="img"
            aria-label="Três faixas esquemáticas mostrando padrões urodinâmicos: contrações involuntárias na bexiga hiperativa, perda por esforço esfincteriano e alta pressão com baixo fluxo na obstrução."
          >
            {/* Padrão 1: Hiperatividade Detrusora */}
            <rect x="24" y="22" width="372" height="76" rx="10" fill="#221A17" stroke="#D8A5A5" strokeWidth="1.5" />
            <text x="40" y="44" fill="#D8A5A5" fontSize="10" fontWeight="700">
              A. BEXIGA HIPERATIVA (Urgência Miccional)
            </text>
            <text x="40" y="60" fill="#E7E1DA" fontSize="8.5">
              Picos de contração involuntária durante o enchimento
            </text>
            <path
              d="M 250 76 L 270 76 L 280 38 L 290 76 L 312 76 L 324 34 L 336 76 L 378 76"
              fill="none"
              stroke="#D8A5A5"
              strokeWidth="2.5"
            />

            {/* Padrão 2: Incontinência de Esforço */}
            <rect x="24" y="112" width="372" height="76" rx="10" fill="#221A17" stroke="#AFC1D0" strokeWidth="1.5" />
            <text x="40" y="134" fill="#AFC1D0" fontSize="10" fontWeight="700">
              B. INCONTINÊNCIA DE ESFORÇO (Tosse / Exercício)
            </text>
            <text x="40" y="150" fill="#E7E1DA" fontSize="8.5">
              Bexiga estável, mas falha na resistência do esfíncter (VLPP)
            </text>
            <path d="M 250 162 L 378 162" fill="none" stroke="#AFC1D0" strokeWidth="2.5" />
            <circle cx="314" cy="162" r="6" fill="#D9C58A" />

            {/* Padrão 3: Obstrução Infravesical (HPB) */}
            <rect x="24" y="202" width="372" height="76" rx="10" fill="#221A17" stroke="#D9C58A" strokeWidth="1.5" />
            <text x="40" y="224" fill="#D9C58A" fontSize="10" fontWeight="700">
              C. OBSTRUÇÃO PROSTÁTICA vs. BEXIGA FRACA
            </text>
            <text x="40" y="240" fill="#E7E1DA" fontSize="8.5">
              Alta pressão detrusora + baixo fluxo (confirma benefício cirúrgico)
            </text>
            <path d="M 250 262 Q 314 206 378 262" fill="none" stroke="#D9C58A" strokeWidth="2.5" />
            <path d="M 250 264 Q 314 254 378 264" fill="none" stroke="#B7C0A1" strokeWidth="2" strokeDasharray="4 3" />
          </svg>
        ),
        legends: [
          { color: "#D8A5A5", label: "Contração Involuntária (Urgência)" },
          { color: "#AFC1D0", label: "Perda por Esforço Esfincteriano" },
          { color: "#D9C58A", label: "Alta Pressão Vesical (Obstrução)" },
          { color: "#B7C0A1", dashed: true, label: "Curva de Fluxo Urinário (Urofluxo)" },
        ],
      },
    ],
  },

  /* -------------------------------------------------------------------------- */
  /* 6. VASECTOMIA SEM BISTURI E PROCEDIMENTOS AMBULATORIAIS                    */
  /* -------------------------------------------------------------------------- */
  "vasectomia-sem-bisturi": {
    eyebrow: "Atlas Anatômico Didático · Ilustração Esquematizada",
    title: "Como funciona a Vasectomia Sem Bisturi e por que a potência fica 100% intacta?",
    badgeText: "Técnica No-Scalpel sem pontos externos",
    figures: [
      {
        tag: "Figura 1 · Técnica Sem Bisturi (No-Scalpel)",
        viewLabel: "Micropunção Central Única",
        title: "Afastamento Atraumático das Fibras vs. Corte Tradicional",
        description: (
          <>
            Na técnica <em>No-Scalpel</em>, não usamos lâmina de bisturi. Uma pinça delicada afasta
            as fibras elásticas da pele por um <strong>único microponto central</strong> que se
            fecha sozinho sem necessidade de pontos.
          </>
        ),
        svg: (
          <svg
            viewBox="0 0 420 300"
            className="w-full h-auto"
            role="img"
            aria-label="Diagrama comparando a técnica de vasectomia sem bisturi por microponto central único sem pontos com a técnica convencional de duas incisões com sutura."
          >
            <line x1="210" y1="24" x2="210" y2="276" stroke="#C9B6A3" strokeOpacity="0.3" strokeDasharray="4 4" />

            {/* Esquerda: Sem Bisturi */}
            <text x="105" y="28" textAnchor="middle" fill="#B7C0A1" fontSize="10.5" fontWeight="700">
              TÉCNICA SEM BISTURI
            </text>
            <ellipse cx="105" cy="142" rx="68" ry="82" fill="#3B2E28" stroke="#B7C0A1" strokeWidth="2.2" />
            {/* Microponto único central */}
            <circle cx="105" cy="116" r="6" fill="#D9C58A" stroke="#221A17" strokeWidth="2" />
            <circle cx="105" cy="116" r="14" fill="none" stroke="#D9C58A" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="105" y="152" textAnchor="middle" fill="#D9C58A" fontSize="9.5" fontWeight="700">
              1 Micropunção (&lt; 4 mm)
            </text>
            <text x="105" y="168" textAnchor="middle" fill="#E7E1DA" fontSize="8.5">
              Sem lâmina · Sem pontos externos
            </text>
            <text x="105" y="248" textAnchor="middle" fill="#B7C0A1" fontSize="9.5" fontWeight="600">
              5x Menos Sangramento e Desconforto
            </text>

            {/* Direita: Convencional */}
            <text x="315" y="28" textAnchor="middle" fill="#D8A5A5" fontSize="10.5" fontWeight="700">
              TÉCNICA CONVENCIONAL
            </text>
            <ellipse cx="315" cy="142" rx="68" ry="82" fill="#3B2E28" stroke="#C9B6A3" strokeWidth="1.8" />
            {/* Dois cortes laterais com pontos */}
            <line x1="286" y1="102" x2="286" y2="136" stroke="#D8A5A5" strokeWidth="3" />
            <line x1="280" y1="110" x2="292" y2="110" stroke="#E7E1DA" strokeWidth="1.5" />
            <line x1="280" y1="126" x2="292" y2="126" stroke="#E7E1DA" strokeWidth="1.5" />

            <line x1="344" y1="102" x2="344" y2="136" stroke="#D8A5A5" strokeWidth="3" />
            <line x1="338" y1="110" x2="350" y2="110" stroke="#E7E1DA" strokeWidth="1.5" />
            <line x1="338" y1="126" x2="350" y2="126" stroke="#E7E1DA" strokeWidth="1.5" />
            <text x="315" y="168" textAnchor="middle" fill="#E7E1DA" fontSize="8.5">
              2 cortes com bisturi + pontos na pele
            </text>
            <text x="315" y="248" textAnchor="middle" fill="#C9B6A3" fontSize="9.5">
              Maior reação inflamatória local
            </text>
          </svg>
        ),
        legends: [
          { color: "#D9C58A", label: "Micropunção Central Sem Bisturi" },
          { color: "#B7C0A1", label: "Cicatrização Espontânea (Sem Pontos)" },
          { color: "#D8A5A5", label: "Incisões Clássicas com Bisturi" },
          { color: "#C9B6A3", label: "Anestesia Local Confortável" },
        ],
      },
      {
        tag: "Figura 2 · Tripla Barreira e Preservação Hormonal",
        viewLabel: "Eficácia > 99,85%",
        title: "Oclusão Apenas do Ducto Deferente (Testosterona Livre no Sangue)",
        description: (
          <>
            Interrompemos exclusivamente o microcanal que leva os espermatozoides. A{" "}
            <strong>testosterona continua indo direto para a corrente sanguínea</strong> e o
            líquido seminal da próstata mantém o volume ejaculado inalterado.
          </>
        ),
        svg: (
          <svg
            viewBox="0 0 420 300"
            className="w-full h-auto"
            role="img"
            aria-label="Diagrama da tripla barreira de oclusão do ducto deferente com interposição fascial e preservação da circulação sanguínea da testosterona."
          >
            {/* Ducto Deferente com Interposição de Fáscia */}
            <rect x="44" y="88" width="128" height="24" rx="10" fill="#3B2E28" stroke="#D9C58A" strokeWidth="2.2" />
            <rect x="248" y="88" width="128" height="24" rx="10" fill="#3B2E28" stroke="#D9C58A" strokeWidth="2.2" />
            {/* Barreira de Fáscia Interposta no centro */}
            <rect x="196" y="72" width="28" height="56" rx="8" fill="#B7C0A1" fillOpacity="0.3" stroke="#B7C0A1" strokeWidth="2" />
            <text x="210" y="56" textAnchor="middle" fill="#B7C0A1" fontSize="10" fontWeight="700">
              Tripla Barreira: Cauterização + Interposição Fascial (&gt;99,85%)
            </text>

            {/* Vasos Sanguíneos Testiculares (Testosterona) Intactos Abaixo */}
            <path d="M 44 196 L 376 196" fill="none" stroke="#D8A5A5" strokeWidth="8" strokeLinecap="round" />
            {[90, 150, 210, 270, 330].map((x, i) => (
              <circle key={i} cx={x} cy={196} r="3.5" fill="#D9C58A" />
            ))}
            <text x="210" y="176" textAnchor="middle" fill="#D8A5A5" fontSize="10.5" fontWeight="700">
              Corrente Sanguínea Testicular (100% Intacta)
            </text>
            <text x="210" y="222" textAnchor="middle" fill="#E7E1DA" fontSize="9.5">
              Testosterona, Libido, Ereção e Volume do Sêmen (95%+) permanecem idênticos
            </text>
          </svg>
        ),
        legends: [
          { color: "#D9C58A", label: "Ducto Deferente (Espermatozoides)" },
          { color: "#B7C0A1", label: "Interposição de Fáscia Protetora" },
          { color: "#D8A5A5", label: "Vasos da Testosterona (Intactos)" },
          { color: "#AFC1D0", label: "Nervos da Ereção (Não Tocados)" },
        ],
      },
    ],
  },

  /* -------------------------------------------------------------------------- */
  /* 7. URO-ONCOLOGIA (PRÓSTATA, RIM E BEXIGA)                                  */
  /* -------------------------------------------------------------------------- */
  "uro-oncologia": {
    eyebrow: "Atlas Oncológico Didático · Ilustração Esquematizada",
    title: "Como a medicina de precisão preserva órgãos e qualidade de vida na Uro-Oncologia?",
    badgeText: "Erradicação tumoral com preservação funcional",
    figures: [
      {
        tag: "Figura 1 · Biópsia por Fusão de Ressonância",
        viewLabel: "Diagnóstico PI-RADS",
        title: "Mira Milimétrica na Lesão Suspeita (Via Transperineal)",
        description: (
          <>
            Ao fundir a <strong>Ressonância Multiparamétrica (mpMRI)</strong> com o ultrassom em
            tempo real, direcionamos a coleta exatamente para o alvo suspeito, aumentando a precisão
            diagnóstica e evitando biópsias cegas.
          </>
        ),
        svg: (
          <svg
            viewBox="0 0 420 300"
            className="w-full h-auto"
            role="img"
            aria-label="Diagrama da biópsia de próstata por fusão de ressonância magnética mostrando o alvo PI-RADS identificado com mira de precisão."
          >
            {/* Contorno da Próstata em Fusão Digital */}
            <ellipse cx="210" cy="146" rx="112" ry="86" fill="#1C2833" stroke="#AFC1D0" strokeWidth="2.2" />
            {/* Grade de Coordenadas de Fusão */}
            <line x1="98" y1="146" x2="322" y2="146" stroke="#AFC1D0" strokeOpacity="0.25" strokeDasharray="4 4" />
            <line x1="210" y1="60" x2="210" y2="232" stroke="#AFC1D0" strokeOpacity="0.25" strokeDasharray="4 4" />

            {/* Lesão Alvo Identificada na Ressonância (PI-RADS) */}
            <circle cx="256" cy="118" r="22" fill="#D8A5A5" fillOpacity="0.35" stroke="#D9C58A" strokeWidth="2.5" />
            <circle cx="256" cy="118" r="32" fill="none" stroke="#D9C58A" strokeWidth="1.2" strokeDasharray="4 3" />
            <line x1="256" y1="78" x2="256" y2="158" stroke="#D9C58A" strokeWidth="1.5" />
            <line x1="216" y1="118" x2="296" y2="118" stroke="#D9C58A" strokeWidth="1.5" />

            {/* Vetor de Acesso Transperineal Guiado */}
            <line x1="256" y1="268" x2="256" y2="124" stroke="#B7C0A1" strokeWidth="2.8" strokeDasharray="6 3" />

            <text x="210" y="32" textAnchor="middle" fill="#D9C58A" fontSize="10.5" fontWeight="700">
              FUSÃO RESSONÂNCIA 3T + ULTRASSOM EM TEMPO REAL
            </text>
            <text x="210" y="284" textAnchor="middle" fill="#B7C0A1" fontSize="9.5" fontWeight="600">
              Via Transperineal Segura · Mínimo Risco de Infecção
            </text>
          </svg>
        ),
        legends: [
          { color: "#D9C58A", label: "Alvo PI-RADS Mapeado na Ressonância" },
          { color: "#B7C0A1", dashed: true, label: "Trajetória Guiada por Fusão" },
          { color: "#AFC1D0", label: "Anatomia Prostática Tridimensional" },
          { color: "#D8A5A5", label: "Zona Suspeita de Relevância Clínica" },
        ],
      },
      {
        tag: "Figura 2 · Nefrectomia Parcial Robótica",
        viewLabel: "Preservação de Néfrons",
        title: "Remoção Exclusiva do Tumor Preservando o Rim Sadio",
        description: (
          <>
            Sempre que a anatomia permite, realizamos a{" "}
            <strong>Nefrectomia Parcial Robótica</strong>: removemos apenas o nódulo tumoral com
            margem oncológica segura e preservamos 75% a 90% do rim funcionando.
          </>
        ),
        svg: (
          <svg
            viewBox="0 0 420 300"
            className="w-full h-auto"
            role="img"
            aria-label="Diagrama da nefrectomia parcial robótica mostrando a ressecção exclusiva do tumor renal com margem de segurança e preservação de 85% do rim sadio."
          >
            {/* Rim Sadio Preservado (85%) */}
            <path
              d="M 185 52 C 125 52, 102 108, 118 162 C 132 212, 178 242, 224 224 C 248 214, 244 172, 224 144 C 244 118, 238 52, 185 52 Z"
              fill="#3B2E28"
              stroke="#B7C0A1"
              strokeWidth="2.8"
            />
            <text x="168" y="152" textAnchor="middle" fill="#B7C0A1" fontSize="11" fontWeight="700">
              Rim Sadio
            </text>
            <text x="168" y="168" textAnchor="middle" fill="#E7E1DA" fontSize="9.5">
              80%–90% Preservado
            </text>

            {/* Linha de Ressecção Robótica com Margem Livre */}
            <path d="M 205 56 Q 238 92 225 128" fill="none" stroke="#D9C58A" strokeWidth="2.5" strokeDasharray="5 3" />

            {/* Nódulo Tumoral Destacado/Removido com Margem */}
            <circle cx="268" cy="84" r="32" fill="#4A342B" stroke="#D8A5A5" strokeWidth="2.2" />
            <circle cx="268" cy="84" r="20" fill="#D8A5A5" fillOpacity="0.4" />
            <text x="268" y="82" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="700">
              Tumor
            </text>
            <text x="268" y="94" textAnchor="middle" fill="#D9C58A" fontSize="8">
              Margem Livre
            </text>

            {/* Seta de Remoção Seletiva */}
            <line x1="232" y1="88" x2="212" y2="92" stroke="#D9C58A" strokeWidth="2" />

            <text x="210" y="272" textAnchor="middle" fill="#AFC1D0" fontSize="9.5" fontWeight="600">
              Proteção da Função Renal Global e Saúde Cardiovascular de Longo Prazo
            </text>
          </svg>
        ),
        legends: [
          { color: "#B7C0A1", label: "Parênquima Renal Preservado" },
          { color: "#D9C58A", dashed: true, label: "Plano de Ressecção Robótica" },
          { color: "#D8A5A5", label: "Nódulo Tumoral Removido" },
          { color: "#AFC1D0", label: "Sutura Renorráfica Precisa" },
        ],
      },
    ],
  },

  /* -------------------------------------------------------------------------- */
  /* 8. ESTÉTICA ÍNTIMA MASCULINA E BOTOX PENIANO                               */
  /* -------------------------------------------------------------------------- */
  "estetica-intima-masculina": {
    eyebrow: "Atlas Anatômico Didático · Ilustração Esquematizada",
    title: "Onde atuam o Preenchimento com Ácido Hialurônico e o Botox Peniano?",
    badgeText: "Corpos cavernosos, uretra e sensibilidade 100% preservados",
    figures: [
      {
        tag: "Figura 1 · Preenchimento Peniano (Corte Transversal)",
        viewLabel: "Plano Interfascial Seguro",
        title: "Ácido Hialurônico entre as Fáscias de Dartos e Buck",
        description: (
          <>
            O ácido hialurônico (em dourado) forma uma camada uniforme no espaço superficial,
            enquanto a <strong>Fáscia de Buck</strong> protege totalmente os corpos cavernosos (ereção),
            os nervos da sensibilidade e a uretra.
          </>
        ),
        svg: (
          <svg
            viewBox="0 0 420 300"
            className="w-full h-auto"
            role="img"
            aria-label="Corte transversal anatômico mostrando o ácido hialurônico entre a fáscia de Dartos e a fáscia de Buck, isolado dos corpos cavernosos e da uretra."
          >
            {/* Pele + Fáscia de Dartos */}
            <ellipse cx="210" cy="154" rx="122" ry="104" fill="#3E322B" stroke="#C9B6A3" strokeWidth="2.5" />

            {/* Manto Dorso-Lateral 270° de Ácido Hialurônico */}
            <path
              d="M 124 218 A 108 94 0 1 1 296 218 L 278 204 A 86 74 0 1 0 142 204 Z"
              fill="#D9C58A"
              fillOpacity="0.38"
              stroke="#D9C58A"
              strokeWidth="2"
            />

            {/* Fáscia de Buck (Barreira Protetora) */}
            <ellipse
              cx="210"
              cy="160"
              rx="86"
              ry="74"
              fill="#221A17"
              stroke="#AFC1D0"
              strokeWidth="2.5"
              strokeDasharray="5 3"
            />

            {/* Corpos Cavernosos */}
            <ellipse cx="172" cy="148" rx="36" ry="38" fill="#3B2E28" stroke="#C9B6A3" strokeWidth="2" />
            <ellipse cx="248" cy="148" rx="36" ry="38" fill="#3B2E28" stroke="#C9B6A3" strokeWidth="2" />
            <text x="172" y="151" textAnchor="middle" fill="#E7E1DA" fontSize="8.5" fontWeight="600">
              Cavernoso
            </text>
            <text x="248" y="151" textAnchor="middle" fill="#E7E1DA" fontSize="8.5" fontWeight="600">
              Cavernoso
            </text>

            {/* Uretra Ventral Livre */}
            <ellipse cx="210" cy="208" rx="28" ry="20" fill="#332722" stroke="#B7C0A1" strokeWidth="1.8" />
            <text x="210" y="211" textAnchor="middle" fill="#B7C0A1" fontSize="8.5" fontWeight="600">
              Uretra
            </text>

            {/* Rótulo Superior */}
            <rect x="105" y="10" width="210" height="22" rx="6" fill="#D9C58A" />
            <text x="210" y="24" textAnchor="middle" fill="#221A17" fontSize="9.5" fontWeight="700">
              Ácido Hialurônico (Plano Subdérmico Seguro)
            </text>
          </svg>
        ),
        legends: [
          { color: "#D9C58A", label: "Manto de Ácido Hialurônico" },
          { color: "#AFC1D0", dashed: true, label: "Fáscia de Buck (Isolamento)" },
          { color: "#C9B6A3", label: "Corpos Cavernosos (Ereção)" },
          { color: "#B7C0A1", label: "Uretra (Face Ventral Livre)" },
        ],
      },
      {
        tag: "Figura 2 · Mecanismo do Botox Peniano e Escrotal",
        viewLabel: "Relaxamento do Músculo Dartos",
        title: "Redução da Retração em Repouso (Flacidez) sem Afetar a Ereção",
        description: (
          <>
            O reflexo de retração peniana (frio, estresse, esporte) ocorre pela contração do músculo
            liso superficial (<em>dartos</em>). A{" "}
            <strong>Toxina Botulínica (Botox Peniano)</strong> relaxa essas fibras, mantendo maior
            projeção e conforto em repouso.
          </>
        ),
        svg: (
          <svg
            viewBox="0 0 420 300"
            className="w-full h-auto"
            role="img"
            aria-label="Diagrama comparando a retração peniana por hiperatividade do músculo dartos versus o relaxamento em repouso após aplicação de Botox Peniano."
          >
            <line x1="210" y1="24" x2="210" y2="276" stroke="#C9B6A3" strokeOpacity="0.3" strokeDasharray="4 4" />

            {/* Esquerda: Sem Botox (Hipertonia do Dartos / Retração) */}
            <text x="105" y="28" textAnchor="middle" fill="#D8A5A5" fontSize="10" fontWeight="700">
              HIPERTONIA DO DARTOS
            </text>
            <text x="105" y="42" textAnchor="middle" fill="#E7E1DA" fontSize="8.5">
              (Retração no frio / esporte)
            </text>
            {/* Haste retraída com ondas de contração muscular */}
            <rect x="76" y="70" width="58" height="92" rx="26" fill="#3B2E28" stroke="#D8A5A5" strokeWidth="2.2" />
            <path d="M 68 88 Q 60 116 68 144" fill="none" stroke="#D8A5A5" strokeWidth="2" strokeDasharray="3 3" />
            <path d="M 142 88 Q 150 116 142 144" fill="none" stroke="#D8A5A5" strokeWidth="2" strokeDasharray="3 3" />
            <text x="105" y="118" textAnchor="middle" fill="#D8A5A5" fontSize="9" fontWeight="700">
              Fibras Contraídas
            </text>
            <text x="105" y="246" textAnchor="middle" fill="#C9B6A3" fontSize="9">
              Encolhimento involuntário em flacidez
            </text>

            {/* Direita: Após Botox Peniano (Relaxamento Muscular Liso) */}
            <text x="315" y="28" textAnchor="middle" fill="#B7C0A1" fontSize="10" fontWeight="700">
              APÓS BOTOX PENIANO
            </text>
            <text x="315" y="42" textAnchor="middle" fill="#E7E1DA" fontSize="8.5">
              (Músculo Dartos Relaxado)
            </text>
            {/* Haste com maior projeção em repouso */}
            <rect x="282" y="70" width="66" height="142" rx="30" fill="#3B2E28" stroke="#D9C58A" strokeWidth="2.5" />
            {/* Micropontos de Toxina Botulínica */}
            {[95, 130, 165].map((y, idx) => (
              <g key={idx}>
                <circle cx="294" cy={y} r="4" fill="#B7C0A1" />
                <circle cx="336" cy={y} r="4" fill="#B7C0A1" />
              </g>
            ))}
            <text x="315" y="142" textAnchor="middle" fill="#D9C58A" fontSize="9.5" fontWeight="700">
              Maior Projeção
            </text>
            <text x="315" y="156" textAnchor="middle" fill="#E7E1DA" fontSize="8.5">
              em Repouso
            </text>
            <text x="315" y="246" textAnchor="middle" fill="#B7C0A1" fontSize="9" fontWeight="600">
              Relaxamento por ~6 meses · Ereção Intacta
            </text>
          </svg>
        ),
        legends: [
          { color: "#B7C0A1", label: "Pontos de Toxina Botulínica (Botox)" },
          { color: "#D9C58A", label: "Projeção Natural em Repouso" },
          { color: "#D8A5A5", dashed: true, label: "Reflexo de Retração Bloqueado" },
          { color: "#C9B6A3", label: "Sinergia com Ácido Hialurônico" },
        ],
      },
    ],
  },
};

export function AreaDidacticAtlas({ campaignSlug }: { campaignSlug: string }) {
  const atlas = ATLAS_BY_SLUG[campaignSlug];
  if (!atlas) return null;

  return (
    <div className="mb-12 rounded-2xl border border-[#2E2520]/12 bg-[#FCFAF7] dark:bg-card p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-8 border-b border-[#2E2520]/10">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#4A3A30] block mb-1.5">
            {atlas.eyebrow}
          </span>
          <h3 className="text-xl sm:text-2xl font-serif text-[#2E2520] dark:text-foreground">
            {atlas.title}
          </h3>
        </div>
        <span className="inline-flex items-center gap-2 text-xs font-medium text-[#4A3A30] bg-[#4A3A30]/10 px-3 py-1.5 rounded-full self-start md:self-auto">
          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
          {atlas.badgeText}
        </span>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-stretch">
        {atlas.figures.map((fig, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-[#2E2520]/10 bg-[#2E2520] text-white p-5 sm:p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9B6A3]">
                  {fig.tag}
                </span>
                <span className="text-[11px] text-white/65">{fig.viewLabel}</span>
              </div>
              <h4 className="text-base sm:text-lg font-serif text-white mb-2">{fig.title}</h4>
              <p className="text-xs text-white/75 leading-relaxed mb-4">{fig.description}</p>

              <div className="relative mx-auto max-w-[380px] my-2">{fig.svg}</div>
            </div>

            <div className="mt-4 pt-3.5 border-t border-white/10 grid grid-cols-2 gap-2.5 text-[11px]">
              {fig.legends.map((leg, lIdx) => (
                <div key={lIdx} className="flex items-center gap-2">
                  {leg.dashed ? (
                    <span
                      className="w-3 h-0.5 border-t-2 border-dashed shrink-0"
                      style={{ borderColor: leg.color }}
                    />
                  ) : (
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: leg.color }}
                    />
                  )}
                  <span className="text-white/85">{leg.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
