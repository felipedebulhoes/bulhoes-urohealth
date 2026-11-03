import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";

const ROOT = process.cwd();
const STORAGE_DIR = path.join(ROOT, "client", "public", "manus-storage");

const callingstoneB64 = fs
  .readFileSync(path.join(STORAGE_DIR, "Callingstone_0c7058f7.ttf"))
  .toString("base64");

const isotipoSvg = fs
  .readFileSync(path.join(STORAGE_DIR, "isotipo-fb_b21c0959.svg"), "utf8")
  .replace(/<\?xml.*?\?>/g, "")
  .trim();

const landscapeLogoSvg = fs
  .readFileSync(path.join(STORAGE_DIR, "logo-landscape-dr-felipe_cc84d4a3.svg"), "utf8")
  .replace(/<\?xml.*?\?>/g, "")
  .trim();

const WHATSAPP_LINK_BASE = "https://wa.me/5511981124455?text=";

function buildHtml(guide) {
  const waUrl =
    WHATSAPP_LINK_BASE +
    encodeURIComponent(
      `Olá! Baixei o material "${guide.title}" no site do Dr. Felipe de Bulhões e gostaria de agendar uma avaliação.`
    );

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<title>${guide.title} — Dr. Felipe de Bulhões</title>
<style>
  @font-face {
    font-family: 'Callingstone';
    src: url(data:font/ttf;base64,${callingstoneB64}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap');

  @page {
    size: A4 portrait;
    margin: 0;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  body {
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: #2E2520;
    background: #F7F5F2;
    font-size: 9.8pt;
    line-height: 1.5;
  }

  .page {
    width: 210mm;
    height: 297mm;
    position: relative;
    page-break-after: always;
    overflow: hidden;
    background: #F7F5F2;
  }
  .page:last-child {
    page-break-after: auto;
  }

  /* COVER PAGE — Official Warm Quiet Luxury Palette (#2E2520, #4A3A30, #C9B6A3, #F7F5F2) */
  .cover {
    background: linear-gradient(155deg, #2E2520 0%, #3A2E27 48%, #221B17 100%);
    color: #F7F5F2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 22mm 20mm 18mm 20mm;
  }

  .cover-watermark {
    position: absolute;
    right: -25mm;
    bottom: -15mm;
    width: 155mm;
    height: 155mm;
    opacity: 0.055;
    pointer-events: none;
  }
  .cover-watermark svg {
    width: 100%;
    height: 100%;
  }

  .cover-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(201, 182, 163, 0.35);
    padding-bottom: 6mm;
  }

  .cover-logo {
    height: 15mm;
    display: flex;
    align-items: center;
  }
  .cover-logo svg {
    height: 14mm;
    width: auto;
  }

  .cover-badge {
    font-size: 7.8pt;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: #C9B6A3;
    border: 1px solid rgba(201, 182, 163, 0.45);
    background: rgba(74, 58, 48, 0.65);
    padding: 2mm 4mm;
    border-radius: 4px;
    font-weight: 600;
  }

  .cover-center {
    margin-top: auto;
    margin-bottom: auto;
    padding: 8mm 0;
    max-width: 162mm;
  }

  .cover-eyebrow {
    font-size: 8.8pt;
    text-transform: uppercase;
    letter-spacing: 0.22em;
    color: #C9B6A3;
    font-weight: 600;
    margin-bottom: 4mm;
    display: flex;
    align-items: center;
    gap: 3mm;
  }
  .cover-eyebrow::before {
    content: "";
    display: inline-block;
    width: 10mm;
    height: 1.5px;
    background: linear-gradient(135deg, #8D7B6B 0%, #C9B6A3 50%, #E7E1DA 100%);
  }

  .cover-title {
    font-family: 'Callingstone', 'Cinzel', Georgia, serif;
    font-size: 30pt;
    line-height: 1.16;
    color: #F7F5F2;
    font-weight: normal;
    margin-bottom: 5mm;
  }

  .cover-subtitle {
    font-size: 11.2pt;
    line-height: 1.55;
    color: #E7E1DA;
    font-weight: 300;
    margin-bottom: 8mm;
  }

  .cover-highlights {
    background: rgba(74, 58, 48, 0.55);
    border: 1px solid rgba(201, 182, 163, 0.25);
    border-left: 3.5px solid #C9B6A3;
    border-radius: 0 8px 8px 0;
    padding: 5mm 6mm;
    margin-top: 4mm;
  }
  .cover-highlights-title {
    font-size: 8.2pt;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: #C9B6A3;
    font-weight: 700;
    margin-bottom: 2.5mm;
  }
  .cover-highlights ul {
    list-style: none;
  }
  .cover-highlights li {
    font-size: 9.4pt;
    color: #F7F5F2;
    margin-bottom: 1.8mm;
    padding-left: 4.5mm;
    position: relative;
  }
  .cover-highlights li::before {
    content: "•";
    color: #C9B6A3;
    position: absolute;
    left: 0;
    font-weight: bold;
  }

  .cover-footer {
    border-top: 1px solid rgba(201, 182, 163, 0.28);
    padding-top: 5mm;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .cover-doctor-name {
    font-family: 'Callingstone', 'Cinzel', Georgia, serif;
    font-size: 15.5pt;
    color: #C9B6A3;
    margin-bottom: 1mm;
  }
  .cover-doctor-creds {
    font-size: 8.2pt;
    color: #E7E1DA;
    line-height: 1.45;
  }
  .cover-affiliations {
    text-align: right;
    font-size: 7.8pt;
    color: #C9B6A3;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    line-height: 1.5;
    font-weight: 600;
  }

  /* INNER PAGES — Off-White (#F7F5F2) base, Marrom Profundo (#2E2520) & Café (#4A3A30) structure, Bege Champagne (#C9B6A3) accents */
  .inner-header {
    background: #2E2520;
    height: 16mm;
    padding: 0 18mm;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid #C9B6A3;
  }
  .inner-header-left {
    display: flex;
    align-items: center;
    gap: 3mm;
  }
  .inner-header-logo {
    height: 8.5mm;
  }
  .inner-header-logo svg {
    height: 8.5mm;
    width: auto;
  }
  .inner-header-guide {
    font-size: 7.6pt;
    color: #E7E1DA;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    border-left: 1px solid rgba(201, 182, 163, 0.35);
    padding-left: 3mm;
  }
  .inner-header-page {
    font-size: 8pt;
    color: #C9B6A3;
    font-weight: 600;
    letter-spacing: 0.12em;
  }

  .inner-content {
    padding: 7.5mm 18mm 14mm 18mm;
  }

  .inner-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 11mm;
    padding: 0 18mm;
    border-top: 1px solid #E7E1DA;
    background: #EFECE6;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 7.3pt;
    color: #8D7B6B;
  }
  .inner-footer strong {
    color: #2E2520;
  }

  /* COMPONENTS */
  .intro-box {
    background: linear-gradient(135deg, #2E2520 0%, #4A3A30 100%);
    color: #F7F5F2;
    border-radius: 8px;
    padding: 4.2mm 5.5mm;
    margin-bottom: 4.5mm;
    border-left: 4px solid #C9B6A3;
  }
  .intro-box p {
    font-size: 9pt;
    line-height: 1.46;
    color: #F7F5F2;
    margin-bottom: 1.5mm;
  }
  .intro-box p:last-child {
    margin-bottom: 0;
  }
  .intro-box strong {
    color: #C9B6A3;
  }

  .section-block {
    margin-bottom: 4.2mm;
  }

  .section-title {
    font-family: 'Callingstone', 'Cinzel', Georgia, serif;
    font-size: 15.2pt;
    color: #2E2520;
    font-weight: normal;
    margin-bottom: 1.2mm;
    padding-bottom: 1mm;
    border-bottom: 1.5px solid #8D7B6B;
    display: inline-block;
  }

  .section-p {
    font-size: 9pt;
    color: #2E2520;
    line-height: 1.46;
    margin-top: 1.5mm;
    margin-bottom: 2mm;
  }
  .section-p strong {
    color: #4A3A30;
    font-weight: 700;
  }

  /* TABLE */
  .clinical-table {
    width: 100%;
    border-collapse: collapse;
    margin: 2.2mm 0 3.8mm 0;
    font-size: 8.4pt;
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid #E7E1DA;
  }
  .clinical-table th {
    background: #2E2520;
    color: #C9B6A3;
    text-align: left;
    padding: 2.1mm 3.2mm;
    font-size: 7.5pt;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 600;
  }
  .clinical-table td {
    padding: 2.1mm 3.2mm;
    border-bottom: 1px solid #E7E1DA;
    color: #2E2520;
    vertical-align: top;
    line-height: 1.4;
    background: #FFFFFF;
  }
  .clinical-table tr:nth-child(even) td {
    background: #F4EFEA;
  }
  .clinical-table td strong {
    color: #2E2520;
  }

  /* TWO COLUMNS CARDS */
  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3.5mm;
    margin: 2.2mm 0 3.8mm 0;
  }
  .col-card {
    background: #FFFFFF;
    border: 1px solid #E7E1DA;
    border-top: 3px solid #4A3A30;
    border-radius: 6px;
    padding: 3.2mm 4mm;
  }
  .col-card h4 {
    font-size: 9.2pt;
    color: #2E2520;
    margin-bottom: 1.2mm;
    font-weight: 700;
  }
  .col-card p, .col-card li {
    font-size: 8.3pt;
    color: #4A3A30;
    line-height: 1.4;
  }
  .col-card ul {
    padding-left: 3.8mm;
    margin-top: 1mm;
  }
  .col-card li {
    margin-bottom: 0.8mm;
  }

  /* CALLOUT / ALERT */
  .callout-box {
    background: #EFECE6;
    border: 1px solid #C9B6A3;
    border-left: 4px solid #4A3A30;
    border-radius: 6px;
    padding: 3.3mm 4.5mm;
    margin: 2.5mm 0 4.2mm 0;
  }
  .callout-box h5 {
    font-size: 8.8pt;
    color: #4A3A30;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 1mm;
    font-weight: 700;
  }
  .callout-box p {
    font-size: 8.6pt;
    color: #2E2520;
    line-height: 1.44;
  }

  /* CHECKLIST / SCORE BOX */
  .checklist-box {
    background: #FFFFFF;
    border: 1.5px solid #C9B6A3;
    border-radius: 8px;
    padding: 4.2mm 5mm;
    margin: 3mm 0 4mm 0;
  }
  .checklist-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2.5mm;
    border-bottom: 1px solid #E7E1DA;
    padding-bottom: 2mm;
  }
  .checklist-title {
    font-size: 9.8pt;
    font-weight: 700;
    color: #2E2520;
  }
  .checklist-badge {
    font-size: 7.2pt;
    background: #2E2520;
    color: #C9B6A3;
    padding: 1mm 2.5mm;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 600;
  }
  .checklist-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2mm 4mm;
  }
  .checklist-item {
    display: flex;
    align-items: flex-start;
    gap: 2.2mm;
    font-size: 8.4pt;
    color: #2E2520;
    line-height: 1.38;
  }
  .checkbox-sq {
    width: 3.5mm;
    height: 3.5mm;
    border: 1.4px solid #8D7B6B;
    border-radius: 2px;
    margin-top: 0.5mm;
    flex-shrink: 0;
    background: #F7F5F2;
  }
  .checklist-footer {
    margin-top: 2.5mm;
    padding-top: 2mm;
    border-top: 1px dashed #C9B6A3;
    font-size: 8.2pt;
    color: #4A3A30;
    font-weight: 600;
  }

  /* CTA BOX ON PAGE 4 */
  .cta-panel {
    background: linear-gradient(145deg, #2E2520 0%, #4A3A30 100%);
    color: #F7F5F2;
    border-radius: 10px;
    padding: 6mm 7mm;
    margin-top: 3.5mm;
    margin-bottom: 4.5mm;
    text-align: center;
    border: 1px solid rgba(201, 182, 163, 0.45);
  }
  .cta-panel h3 {
    font-family: 'Callingstone', 'Cinzel', Georgia, serif;
    font-size: 17.5pt;
    color: #C9B6A3;
    font-weight: normal;
    margin-bottom: 2mm;
  }
  .cta-panel p {
    font-size: 9pt;
    color: #F7F5F2;
    max-width: 145mm;
    margin: 0 auto 4mm auto;
    line-height: 1.48;
  }
  .cta-buttons {
    display: flex;
    justify-content: center;
    gap: 4mm;
    margin-bottom: 3.2mm;
  }
  /* Official Rule 6.3: Botão Primário de Agendamento: Fundo Bege Champagne (#C9B6A3) com texto em Marrom Profundo (#2E2520) */
  .btn-primary {
    display: inline-block;
    background: #C9B6A3;
    color: #2E2520 !important;
    text-decoration: none;
    font-size: 9pt;
    font-weight: 700;
    padding: 2.6mm 6mm;
    border-radius: 6px;
    letter-spacing: 0.04em;
  }
  .btn-secondary {
    display: inline-block;
    background: rgba(247, 245, 242, 0.08);
    border: 1px solid rgba(201, 182, 163, 0.55);
    color: #F7F5F2 !important;
    text-decoration: none;
    font-size: 9pt;
    font-weight: 600;
    padding: 2.6mm 5.5mm;
    border-radius: 6px;
  }
  .cta-sub {
    font-size: 7.8pt;
    color: #C9B6A3;
    letter-spacing: 0.06em;
  }

  .locations-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3mm;
    margin: 2.5mm 0 4mm 0;
  }
  .loc-item {
    background: #FFFFFF;
    border: 1px solid #E7E1DA;
    border-left: 3px solid #8D7B6B;
    border-radius: 6px;
    padding: 2.6mm 3.5mm;
  }
  .loc-item h5 {
    font-size: 8.5pt;
    color: #2E2520;
    font-weight: 700;
    margin-bottom: 0.8mm;
  }
  .loc-item p {
    font-size: 7.8pt;
    color: #4A3A30;
    line-height: 1.38;
  }

  .references-box {
    margin-top: 2.5mm;
    padding-top: 2.2mm;
    border-top: 1px solid #E7E1DA;
  }
  .references-box h5 {
    font-size: 7.4pt;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #8D7B6B;
    margin-bottom: 1.2mm;
  }
  .references-box ol {
    padding-left: 4mm;
    font-size: 7pt;
    color: #8D7B6B;
    line-height: 1.4;
  }
  .references-box li {
    margin-bottom: 0.6mm;
  }
</style>
</head>
<body>

<!-- PAGE 1: COVER -->
<div class="page cover">
  <div class="cover-watermark">${isotipoSvg}</div>

  <div class="cover-top">
    <div class="cover-logo">${landscapeLogoSvg}</div>
    <div class="cover-badge">${guide.badge}</div>
  </div>

  <div class="cover-center">
    <div class="cover-eyebrow">${guide.eyebrow}</div>
    <h1 class="cover-title">${guide.title}</h1>
    <p class="cover-subtitle">${guide.subtitle}</p>

    <div class="cover-highlights">
      <div class="cover-highlights-title">O que você vai encontrar neste guia clínico:</div>
      <ul>
        ${guide.coverBullets.map((b) => `<li>${b}</li>`).join("\n        ")}
      </ul>
    </div>
  </div>

  <div class="cover-footer">
    <div>
      <div class="cover-doctor-name">Dr. Felipe de Bulhões</div>
      <div class="cover-doctor-creds">
        MÉDICO · Urologista &amp; Cirurgião Geral · CRM-SP 202.291 | RQE 146538 / 114019<br/>
        Residência em Urologia pelo Instituto D'Or de Ensino e Pesquisa (IDOR-SP) · Titular do CBC (TCBC)
      </div>
    </div>
    <div class="cover-affiliations">
      TCBC · IDOR-SP · SBU · AUA · EAU<br/>
      São Paulo &amp; Campinas
    </div>
  </div>
</div>

<!-- PAGE 2 -->
<div class="page">
  <div class="inner-header">
    <div class="inner-header-left">
      <div class="inner-header-logo">${landscapeLogoSvg}</div>
      <div class="inner-header-guide">${guide.shortTitle}</div>
    </div>
    <div class="inner-header-page">PÁGINA 02 / 04</div>
  </div>

  <div class="inner-content">
    <div class="intro-box">
      ${guide.introHtml}
    </div>

    ${guide.page2Html}
  </div>

  <div class="inner-footer">
    <span><strong>Dr. Felipe de Bulhões</strong> | MÉDICO | CRM-SP 202.291 | RQE 146538 / 114019</span>
    <span>felipebulhoes.com · WhatsApp: (11) 98112-4455</span>
  </div>
</div>

<!-- PAGE 3 -->
<div class="page">
  <div class="inner-header">
    <div class="inner-header-left">
      <div class="inner-header-logo">${landscapeLogoSvg}</div>
      <div class="inner-header-guide">${guide.shortTitle}</div>
    </div>
    <div class="inner-header-page">PÁGINA 03 / 04</div>
  </div>

  <div class="inner-content">
    ${guide.page3Html}

    <div class="checklist-box">
      <div class="checklist-header">
        <span class="checklist-title">${guide.checklistTitle}</span>
        <span class="checklist-badge">Autoavaliação Clínica</span>
      </div>
      <div class="checklist-grid">
        ${guide.checklistItems
          .map(
            (item) => `
        <div class="checklist-item">
          <div class="checkbox-sq"></div>
          <span>${item}</span>
        </div>`
          )
          .join("")}
      </div>
      <div class="checklist-footer">
        ${guide.checklistFooter}
      </div>
    </div>
  </div>

  <div class="inner-footer">
    <span><strong>Dr. Felipe de Bulhões</strong> | MÉDICO | CRM-SP 202.291 | RQE 146538 / 114019</span>
    <span>felipebulhoes.com · WhatsApp: (11) 98112-4455</span>
  </div>
</div>

<!-- PAGE 4 -->
<div class="page">
  <div class="inner-header">
    <div class="inner-header-left">
      <div class="inner-header-logo">${landscapeLogoSvg}</div>
      <div class="inner-header-guide">${guide.shortTitle}</div>
    </div>
    <div class="inner-header-page">PÁGINA 04 / 04</div>
  </div>

  <div class="inner-content">
    ${guide.page4TopHtml}

    <div class="section-block" style="margin-bottom: 3mm;">
      <h2 class="section-title">Locais Oficiais de Atendimento &amp; Teleconsulta</h2>
      <div class="locations-grid">
        <div class="loc-item">
          <h5>São Paulo — Clinovi Paulista</h5>
          <p>Av. Paulista, 1048, 18º andar — Bela Vista, São Paulo - SP</p>
        </div>
        <div class="loc-item">
          <h5>São Paulo — Clinovi Pinheiros</h5>
          <p>Av. Rebouças, 2636 — Pinheiros, São Paulo - SP</p>
        </div>
        <div class="loc-item">
          <h5>Campinas — Campinas Day Hospital</h5>
          <p>Av. Benjamin Constant, 1991 — Cambuí, Campinas - SP</p>
        </div>
        <div class="loc-item">
          <h5>Campinas — Hospital São Luiz Campinas (Rede D'Or)</h5>
          <p>Av. Andrade Neves, 863 — Centro, Campinas - SP · + Teleconsulta</p>
        </div>
      </div>
    </div>

    <div class="cta-panel">
      <h3>Próximo Passo: Avaliação Médica Individualizada</h3>
      <p>
        Deseja discutir seu caso com discrição absoluta, precisão diagnóstica e plano terapêutico sob medida?
        Nossa equipe de atendimento está pronta para orientar seu agendamento presencial ou por teleconsulta.
      </p>
      <div class="cta-buttons">
        <a class="btn-primary" href="${waUrl}">Falar no WhatsApp: (11) 98112-4455</a>
        <a class="btn-secondary" href="https://felipebulhoes.com/#agendamento">Agendar pelo Site Oficial</a>
      </div>
      <div class="cta-sub">Ciência • Saúde • Discrição • Resultados • Masculinidade • Longevidade</div>
    </div>

    <div class="references-box">
      <h5>Referências Científicas &amp; Conformidade Ética (Resolução CFM nº 2.336/2023)</h5>
      <ol>
        ${guide.references.map((r) => `<li>${r}</li>`).join("\n        ")}
      </ol>
    </div>
  </div>

  <div class="inner-footer">
    <span><strong>Dr. Felipe de Bulhões</strong> | MÉDICO | CRM-SP 202.291 | RQE 146538 / 114019</span>
    <span>felipebulhoes.com · contato@felipebulhoes.com</span>
  </div>
</div>

</body>
</html>`;
}

const GUIDES = [
  {
    id: "performance-hormonal",
    filename: "Guia_Performance_Hormonal_Checkup_Dr_Felipe_Bulhoes.pdf",
    badge: "Andrologia & Longevidade",
    eyebrow: "Protocolo Clínico Masculino 35+",
    title: "Performance Hormonal, Testosterona & Check-up de Precisão",
    shortTitle: "Performance Hormonal & Check-up 35+",
    subtitle:
      "O guia médico definitivo sobre vitalidade, investigação correta da testosterona, função erétil, saúde metabólica e longevidade masculina baseada em evidências.",
    coverBullets: [
      "Os 5 eixos clínicos que todo homem acima dos 35 anos deve monitorar além do exame básico de sangue;",
      "Como diferenciar queda real de testosterona (DAEM) de estresse, privação de sono e resistência insulínica;",
      "Por que implantes hormonais não regulamentados e atalhos comprometem o coração e a fertilidade;",
      "A relação direta entre saúde vascular/endotelial, potência sexual e prevenção cardiovascular.",
    ],
    introHtml: `
      <p><strong>Olá! Sou o Dr. Felipe de Bulhões, médico Urologista (IDOR) e Cirurgião Geral (TCBC).</strong></p>
      <p>Na prática clínica em São Paulo e Campinas, atendo diariamente homens produtivos que relatam queda de energia, redução da libido, perda de massa muscular ou oscilações na qualidade da ereção — muitas vezes tratados apenas como "estresse da rotina" ou expostos a protocolos hormonais sem critério médico. Este guia foi estruturado para mostrar como funciona uma investigação andrológica e metabólica de alta precisão.</p>
    `,
    page2Html: `
      <div class="section-block">
        <h2 class="section-title">1. Os 5 Eixos do Check-up Uro-Hormonal de Precisão</h2>
        <p class="section-p">
          Um check-up masculino moderno não se resume a pedir "colesterol e PSA". Na consulta integral, avaliamos o organismo masculino como um sistema integrado onde metabolismo, endotélio vascular, sono e eixo hormonal determinam sua performance física, mental e sexual:
        </p>
        <table class="clinical-table">
          <thead>
            <tr>
              <th style="width: 26%;">Eixo Clínico</th>
              <th style="width: 37%;">O que Investigamos</th>
              <th style="width: 37%;">Impacto Direto no Paciente</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>1. Eixo Androgênico Completo</strong></td>
              <td>Testosterona Total e Livre Calculada (duas coletas matinais em jejum), SHBG, LH, FSH, Prolactina e Estradiol.</td>
              <td>Regula libido, vigor físico, síntese muscular, densidade óssea, humor e foco cognitivo.</td>
            </tr>
            <tr>
              <td><strong>2. Eixo Cardiometabólico</strong></td>
              <td>Glicemia, Hemoglobina Glicada, Insulina basal (HOMA-IR), perfil lipídico avançado, ácido úrico e inflamação.</td>
              <td>A gordura visceral converte testosterona em estrogênio (aromatização) e inflama a parede arterial.</td>
            </tr>
            <tr>
              <td><strong>3. Função Endotelial &amp; Sexual</strong></td>
              <td>Qualidade das ereções matinais e espontâneas, rigidez axial e avaliação vascular peniana quando indicada.</td>
              <td>As artérias cavernosas (1–2 mm) dão sinais de alerta endotelial 3 a 5 anos antes das coronárias.</td>
            </tr>
            <tr>
              <td><strong>4. Saúde Prostática &amp; Urinária</strong></td>
              <td>PSA individualizado, cinética do PSA, força do jato urinário, esvaziamento vesical e exame físico dirigido.</td>
              <td>Garante segurança obrigatória antes e durante qualquer otimização hormonal e previne obstrução urinária.</td>
            </tr>
            <tr>
              <td><strong>5. Segurança Hematológica</strong></td>
              <td>Hemograma completo (Hematócrito/Hemoglobina), função hepática, renal, tireoidiana (TSH/T4L) e vitaminas.</td>
              <td>Previne policitemia (espessamento sanguíneo) e identifica causas reversíveis de fadiga crônica.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="section-block">
        <h2 class="section-title">2. Testosterona: Quando Repor com Segurança Máxima</h2>
        <p class="section-p">
          Segundo as diretrizes da <strong>European Association of Urology (EAU)</strong> e da <strong>American Urological Association (AUA)</strong>, o diagnóstico de Deficiência Androgênica do Envelhecimento Masculino (DAEM / Hipogonadismo) exige a combinação de <strong>sintomas clínicos consistentes</strong> somados a <strong>níveis bioquimicamente reduzidos</strong> confirmados em duas coletas matinais (entre 7h e 10h).
        </p>
        <div class="callout-box">
          <h5>Alerta Médico: O Perigo dos "Chips" e Fórmulas sem Diagnóstico</h5>
          <p>
            O uso de implantes hormonais manipulados ("chips da beleza/performance") ou doses suprafisiológicas sem indicação médica bloqueia o eixo hipófise-testículo, pode causar atrofia testicular, infertilidade severa (azoospermia), elevação perigosa do hematócrito (risco de trombose/AVC) e instabilidade emocional. Quando bem indicada e monitorada por urologista, a Terapia de Reposição de Testosterona (TRT) com medicações aprovadas é altamente segura e restauradora.
          </p>
        </div>
      </div>
    `,
    page3Html: `
      <div class="section-block">
        <h2 class="section-title">3. Ereção, Libido e Performance: Tratamento da Causa Raiz</h2>
        <p class="section-p">
          Enquanto a <strong>libido (desejo)</strong> tem forte comando hormonal e neuroquímico central, a <strong>ereção</strong> é um fenômeno essencialmente hemodinâmico e endotelial. Tratar uma oscilação erétil apenas com comprimidos sob demanda sem investigar a causa equivale a silenciar um alarme sem apagar o incêndio.
        </p>
        <div class="two-col">
          <div class="col-card">
            <h4>Abordagem Diagnóstica Individualizada</h4>
            <ul>
              <li>Diferenciação precisa entre componente psicogênico/ansiedade de performance e componente orgânico (vascular, hormonal ou medicamentoso);</li>
              <li>Avaliação do sono (a Apneia Obstrutiva do Sono reduz drasticamente os picos noturnos de testosterona e oxigenação cavernosa);</li>
              <li>Revisão de medicamentos de uso contínuo (anti-hipertensivos ou antidepressivos que afetam a resposta sexual).</li>
            </ul>
          </div>
          <div class="col-card">
            <h4>Arsenal Terapêutico Escalonado</h4>
            <ul>
              <li><strong>1ª Linha:</strong> Reabilitação endotelial, ajuste metabólico/hormonal e farmacoterapia oral personalizada (uso diário de baixa dose ou sob demanda);</li>
              <li><strong>2ª Linha:</strong> Terapias regenerativas locais e farmacoterapia intracavernosa de precisão para casos refratários;</li>
              <li><strong>3ª Linha:</strong> Implante de prótese peniana (maleável ou inflável de 3 volumes) com altíssimo índice de satisfação.</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="section-block">
        <h2 class="section-title">4. Pilares de Estilo de Vida que Multiplicam a Resposta Clínica</h2>
        <p class="section-p">
          Nenhuma intervenção farmacológica atinge seu potencial máximo se o ambiente metabólico estiver inflamado. Três ajustes fisiológicos potencializam diretamente a produção endógena de testosterona e a função erétil: <strong>(1) Treinamento de força associado a cardio em Zona 2</strong> (reduz resistência insulínica e aumenta receptores androgênicos); <strong>(2) Sono profundo de 7 a 8 horas</strong> (mais de 70% da liberação diária de testosterona ocorre durante o sono REM); e <strong>(3) Redução da circunferência abdominal</strong> (menor conversão periférica de testosterona em estradiol).
        </p>
      </div>
    `,
    checklistTitle: "Autoavaliação Andrológica: Você Apresenta Algum Destes Sinais?",
    checklistItems: [
      "Queda perceptível da energia física, disposição ou produtividade no fim da tarde;",
      "Redução do desejo sexual (libido) ou diminuição das ereções espontâneas matinais;",
      "Oscilação na rigidez da ereção ou necessidade de maior estímulo para mantê-la;",
      "Dificuldade para ganhar massa muscular ou acúmulo recente de gordura abdominal;",
      "Sono não reparador, irritabilidade frequente ou queda de concentração/memória;",
      "Mais de 12 meses sem realizar check-up urológico, hormonal e prostático completo.",
    ],
    checklistFooter:
      "Interpretação Clínica: Se você assinalou 2 ou mais itens acima, uma investigação urológica e hormonal individualizada é fortemente recomendada para identificar causas tratáveis com segurança.",
    page4TopHtml: `
      <div class="section-block">
        <h2 class="section-title">5. Como Funciona Nossa Consulta de Investigação Integral</h2>
        <p class="section-p">
          Em nossos consultórios em São Paulo (Av. Paulista e Pinheiros) e Campinas (Cambuí e Rede D'Or São Luiz), a primeira consulta é desenhada para ouvir sua história sem pressa e construir um mapa completo da sua saúde:
        </p>
        <table class="clinical-table">
          <thead>
            <tr>
              <th style="width: 28%;">Etapa da Avaliação</th>
              <th style="width: 72%;">O que é Realizado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>1. Anamnese Dirigida &amp; Escuta</strong></td>
              <td>Avaliação detalhada de sintomas de vitalidade, rotina de sono, estresse, função sexual, histórico familiar e objetivos de performance e fertilidade futura.</td>
            </tr>
            <tr>
              <td><strong>2. Exame Físico &amp; Antropometria</strong></td>
              <td>Avaliação clínica urológica/andrológica completa, composição corporal, distribuição de peso e exame prostático quando indicado pela faixa etária.</td>
            </tr>
            <tr>
              <td><strong>3. Painel Laboratorial &amp; Funcional</strong></td>
              <td>Solicitação criteriosa do perfil hormonal matinal, metabólico, inflamatório e exames de imagem/urofluxometria conforme necessidade clínica.</td>
            </tr>
            <tr>
              <td><strong>4. Plano Terapêutico Sob Medida</strong></td>
              <td>Definição compartilhada da estratégia ideal — com monitoramento periódico de eficácia e segurança prostática, hematológica e cardiovascular.</td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    references: [
      "Salonia A, Bettocchi C, Boeri L, et al. EAU Guidelines on Sexual and Reproductive Health. European Association of Urology, 2025/2026.",
      "Mulhall JP, Trost LW, Brannigan RE, et al. Evaluation and Management of Testosterone Deficiency: AUA Guideline. J Urol. 2018;200(2):423-432.",
      "Sociedade Brasileira de Urologia (SBU). Diretrizes de Disfunção Erétil e Deficiência Androgênica do Envelhecimento Masculino.",
      "Conselho Federal de Medicina (CFM). Resolução CFM nº 2.333/2023 e Resolução CFM nº 2.336/2023. Este material tem caráter estritamente educativo e não substitui consulta médica presencial ou por telemedicina.",
    ],
  },
  {
    id: "estetica-intima",
    filename: "Guia_Estetica_Intima_Masculina_Dr_Felipe_Bulhoes.pdf",
    badge: "Estética Íntima & Andrologia",
    eyebrow: "Guia Médico Confidencial",
    title: "Estética Íntima Masculina: Preenchimento Peniano & Botox Íntimo",
    shortTitle: "Estética Íntima & Preenchimento Peniano",
    subtitle:
      "Informação médica transparente sobre espessamento peniano com Ácido Hialurônico (Urofill™), Toxina Botulínica peniana/escrotal, anatomia de segurança e resultados reais.",
    coverBullets: [
      "Como funciona o Preenchimento Peniano com Ácido Hialurônico no plano fascial seguro (sem atingir os corpos cavernosos);",
      "Por que o Ácido Hialurônico é biocompatível e 100% reversível — e por que o PMMA jamais deve ser utilizado;",
      "Botox Peniano e Escrotal (Scrotox): indicações para retração no frio/esporte, conforto térmico e estética escrotal;",
      "Como é o preparo, a anestesia local sem dor no consultório e o cronograma de recuperação passo a passo.",
    ],
    introHtml: `
      <p><strong>Olá! Sou o Dr. Felipe de Bulhões, médico Urologista (IDOR) e Cirurgião Geral (TCBC).</strong></p>
      <p>A insatisfação com o calibre peniano (especialmente em flacidez) ou o desconforto com a retração genital no frio e no esporte são queixas extremamente comuns, mas que muitos homens evitam discutir por receio de julgamento ou falta de informação médica séria. Preparei este guia técnico para explicar, com rigor anatômico e total transparência, o que a urologia moderna oferece com segurança comprovada.</p>
    `,
    page2Html: `
      <div class="section-block">
        <h2 class="section-title">1. Preenchimento Peniano com Ácido Hialurônico: Anatomia e Segurança</h2>
        <p class="section-p">
          O preenchimento peniano médico é um procedimento minimamente invasivo, realizado em consultório sob anestesia local, cujo objetivo é promover o <strong>aumento simétrico da circunferência (espessura/calibre)</strong> do pênis tanto em estado de flacidez quanto em ereção, além de reduzir a retração em repouso pelo efeito de peso/sustentação.
        </p>
        <p class="section-p">
          <strong>Onde o produto é depositado?</strong> Com o uso de microcânulas atraumáticas de ponta romba, o gel de Ácido Hialurônico reticulado de alta coesividade é depositado exclusivamente no plano virtual entre a <strong>Fáscia de Dartos e a Fáscia de Buck</strong> (camadas superficiais de revestimento). Os <strong>corpos cavernosos</strong> (estruturas profundas responsáveis pela ereção) e a <strong>uretra</strong> permanecem 100% intactos.
        </p>
        <table class="clinical-table">
          <thead>
            <tr>
              <th style="width: 24%;">Critério de Segurança</th>
              <th style="width: 40%;">Ácido Hialurônico Médico (Padrão-Ouro)</th>
              <th style="width: 36%;">PMMA / Silicone (Contraindicado)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Biocompatibilidade</strong></td>
              <td>Substância naturalmente presente no organismo humano; integração tecidual macia e natural ao toque.</td>
              <td>Polímero plástico permanente (acrílico); reconhecido pelo corpo como corpo estranho definitivo.</td>
            </tr>
            <tr>
              <td><strong>Reversibilidade</strong></td>
              <td><strong>100% reversível</strong> a qualquer momento através da enzima Hialuronidase se necessário ajuste fino.</td>
              <td>Irreversível; a remoção exige cirurgias complexas com perda de pele e tecido saudável.</td>
            </tr>
            <tr>
              <td><strong>Planejamento &amp; Retoque</strong></td>
              <td>Permite sessões progressivas e personalizadas (ganho médio de 2 a 4 cm de circunferência conforme anatomia).</td>
              <td>Risco elevado de migração, nódulos pétreos (granulomas), infecção tardia e deformidade peniana.</td>
            </tr>
            <tr>
              <td><strong>Função Erétil &amp; Sensibilidade</strong></td>
              <td>Preserva integralmente a rigidez erétil, a sensibilidade glândular/cutânea e o prazer sexual.</td>
              <td>Alto índice de dor crônica na ereção e encarceramento cicatricial da pele peniana.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="section-block">
        <h2 class="section-title">2. Botox Peniano e Escrotal (Toxina Botulínica Tipo A)</h2>
        <p class="section-p">
          A aplicação de <strong>Toxina Botulínica Tipo A</strong> na região genital masculina (frequentemente chamada de <em>Scrotox</em> no escroto e Botox Peniano/Dartos na haste) atua promovendo o relaxamento temporário e seguro das fibras musculares lisas superficiais (<strong>Músculo Dartos</strong>) e do músculo cremaster:
        </p>
        <div class="two-col">
          <div class="col-card">
            <h4>Botox Peniano (Relaxamento do Dartos)</h4>
            <ul>
              <li>Reduz a hiperatividade do reflexo de retração peniana causada por frio, estresse, ansiedade ou atividade física ("síndrome do vestiário");</li>
              <li>Proporciona maior comprimento aparente e relaxamento em flacidez;</li>
              <li>Pode ser associado ao preenchimento com Ácido Hialurônico para otimizar a acomodação do gel.</li>
            </ul>
          </div>
          <div class="col-card">
            <h4>Botox Escrotal (Conforto &amp; Estética)</h4>
            <ul>
              <li>Suaviza a rugosidade excessiva da bolsa escrotal e permite que os testículos fiquem posicionados de forma mais baixa e confortável;</li>
              <li>Controla a <strong>hiperidrose escrotal/inguinal</strong> (suor excessivo, atrito e desconforto térmico ao usar roupas sociais ou treinar);</li>
              <li>Alivia quadros selecionados de dor escrotal crônica por espasmo muscular.</li>
            </ul>
          </div>
        </div>
      </div>
    `,
    page3Html: `
      <div class="section-block">
        <h2 class="section-title">3. Passo a Passo do Procedimento e Recuperação</h2>
        <p class="section-p">
          Todo o protocolo é conduzido pessoalmente pelo Dr. Felipe de Bulhões em ambiente médico estéril, com privacidade total e sem necessidade de internação hospitalar:
        </p>
        <table class="clinical-table">
          <thead>
            <tr>
              <th style="width: 24%;">Fase do Protocolo</th>
              <th style="width: 76%;">Como Funciona na Prática</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>1. Consulta &amp; Planejamento</strong></td>
              <td>Avaliação anatômica presencial (elasticidade da pele, presença ou não de postectomia/circuncisão prévia, simetria da haste) e alinhamento realista de volume (quantidade de seringas/ml) e objetivos.</td>
            </tr>
            <tr>
              <td><strong>2. Anestesia Local Sem Dor</strong></td>
              <td>Bloqueio anestésico local na base peniana (semelhante a uma anestesia odontológica leve). O procedimento dura cerca de <strong>40 a 50 minutos</strong> com conforto absoluto.</td>
            </tr>
            <tr>
              <td><strong>3. Retorno à Rotina</strong></td>
              <td>O paciente sai caminhando normalmente do consultório no mesmo dia e pode retornar ao trabalho administrativo/escritório imediatamente.</td>
            </tr>
            <tr>
              <td><strong>4. Cuidados Pós-Procedimento</strong></td>
              <td>Abstinência sexual e de atividades físicas intensas por <strong>10 a 14 dias</strong>, uso de cueca de sustentação orientada e retorno presencial de revisão para avaliação da simetria e acomodação do produto.</td>
            </tr>
          </tbody>
        </table>

        <div class="callout-box">
          <h5>Durabilidade e Manutenção Natural</h5>
          <p>
            No preenchimento peniano com Ácido Hialurônico de alta densidade, a durabilidade média varia de <strong>18 a 24 meses</strong> (com absorção lenta e gradual, além de estímulo de colágeno endógeno na fáscia, mantendo parte do ganho estrutural a longo prazo). Já a Toxina Botulínica apresenta duração média de <strong>4 a 6 meses</strong> por aplicação.
          </p>
        </div>
      </div>
    `,
    checklistTitle: "Checklist de Identificação: Este Protocolo é Indicado para Você?",
    checklistItems: [
      "Deseja aumentar a circunferência (espessura/calibre) peniana com resultado natural e proporcional;",
      "Sente incômodo com a retração do pênis em repouso (no frio, piscina, academia ou vestiário);",
      "Busca um procedimento não cirúrgico, realizado em consultório, com ácido hialurônico 100% seguro;",
      "Apresenta suor excessivo (hiperidrose) ou contração desconfortável na bolsa escrotal;",
      "Deseja melhorar a autoconfiança íntima mantendo 100% da função erétil e da sensibilidade;",
      "Valoriza ser atendido diretamente por Cirurgião Urologista Titular (TCBC / SBU / EAU).",
    ],
    checklistFooter:
      "Próximo passo seguro: A indicação exata de volume (ml) e a associação entre Ácido Hialurônico e Botox Íntimo dependem do exame físico individualizado em consulta médica confidencial.",
    page4TopHtml: `
      <div class="section-block">
        <h2 class="section-title">4. Perguntas Frequentes (Dúvidas Reais de Consultório)</h2>
        <div class="two-col" style="margin-bottom: 3mm;">
          <div class="col-card">
            <h4>O pênis fica com aspecto artificial ao toque?</h4>
            <p>Não. Utilizamos Ácido Hialurônico específico de alta coesividade depositado abaixo da Fáscia de Dartos. Após o período inicial de acomodação (2 semanas), a textura é uniforme, simétrica e indistinguível do tecido natural.</p>
          </div>
          <div class="col-card">
            <h4>É necessário ter feito postectomia (circuncisão)?</h4>
            <p>Não é obrigatório, mas o excesso acentuado de prepúcio é avaliado na consulta para definir a distribuição ideal do produto e evitar acúmulo distal, garantindo resultado estético harmônico.</p>
          </div>
        </div>
      </div>
    `,
    references: [
      "Yang DY, Ko K, Lee WK, et al. Hyaluronic Acid Filler Injection for Penile Augmentation: A Review of Anatomic Planes, Efficacy and Safety. Sex Med Rev.",
      "El-Shaer W, Ghanem H, et al. Botulinum Toxin A in Andrology and Male Genital Aesthetics: Clinical Applications and Safety Profile. J Sex Med.",
      "European Association of Urology (EAU). Guidelines on Sexual and Reproductive Health — Penile Size Abnormalities and Dysmorphophobia, 2025/2026.",
      "Conselho Federal de Medicina (CFM). Resolução CFM nº 2.336/2023. Todo procedimento médico possui indicações, limites anatômicos e riscos que são avaliados individualmente em consulta presencial.",
    ],
  },
  {
    id: "prostata-cirurgia",
    filename: "Guia_Saude_Prostata_Cirurgia_Dr_Felipe_Bulhoes.pdf",
    badge: "Próstata, Laser & Robótica",
    eyebrow: "Guia de Precisão Cirúrgica",
    title: "Saúde da Próstata, Urina & Cirurgia Minimamente Invasiva",
    shortTitle: "Saúde da Próstata & Cirurgia Minimamente Invasiva",
    subtitle:
      "Como funcionam o rastreio prostático moderno (Ressonância PI-RADS), a proteção da bexiga e os tratamentos a Laser (HoLEP), Rezum e Cirurgia Robótica.",
    coverBullets: [
      "A diferença anatômica e clínica entre Hiperplasia Prostática Benigna (HPB) e Câncer de Próstata;",
      "Como a Ressonância Multiparamétrica (PI-RADS) evita biópsias desnecessárias e aumenta a precisão diagnóstica;",
      "Por que urinar fraco ou acordar à noite (noctúria) sobrecarrega a parede da bexiga silenciosamente;",
      "Tecnologias sem corte abdominal (Laser HoLEP, Vapor d'Água Rezum e Cirurgia Robótica Da Vinci).",
    ],
    introHtml: `
      <p><strong>Olá! Sou o Dr. Felipe de Bulhões, médico Urologista (IDOR) e Cirurgião Geral (TCBC).</strong></p>
      <p>O cuidado com a próstata passou por uma revolução tecnológica nos últimos anos. Hoje, nosso foco não é apenas detectar doenças precocemente, mas preservar integralmente a qualidade de vida do homem: um sono contínuo sem acordar várias vezes para urinar, preservação da função da bexiga, continência urinária e potência sexual. Este guia explica os recursos mais modernos disponíveis em São Paulo e Campinas.</p>
    `,
    page2Html: `
      <div class="section-block">
        <h2 class="section-title">1. Próstata Aumentada (HPB) vs. Câncer de Próstata: Entenda a Diferença</h2>
        <p class="section-p">
          Uma das maiores fontes de ansiedade no consultório é confundir o crescimento benigno da próstata com o câncer. Embora ambos possam elevar o PSA no sangue, trata-se de condições distintas que surgem em regiões diferentes da glândula:
        </p>
        <table class="clinical-table">
          <thead>
            <tr>
              <th style="width: 22%;">Característica</th>
              <th style="width: 39%;">Hiperplasia Prostática Benigna (HPB)</th>
              <th style="width: 39%;">Câncer de Próstata (Neoplasia)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Zona Anatômica</strong></td>
              <td>Cresce na <strong>Zona de Transição</strong> (centro da próstata, abraçando o canal da uretra).</td>
              <td>Surge em 75–80% dos casos na <strong>Zona Periférica</strong> (borda externa da próstata).</td>
            </tr>
            <tr>
              <td><strong>Sintomas Iniciais</strong></td>
              <td>Causa sintomas precoces: jato urinário fraco, demora para iniciar a micção, urgência e acordar à noite.</td>
              <td><strong>Totalmente silencioso</strong> nas fases iniciais (não comprime a uretra no começo).</td>
            </tr>
            <tr>
              <td><strong>Relação entre Ambos</strong></td>
              <td>A HPB <strong>não vira câncer</strong>, mas exige tratamento quando obstrui a bexiga ou afeta a qualidade de vida.</td>
              <td>Tem <strong>mais de 90–95% de chance de cura</strong> quando diagnosticado precocemente no rastreio.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="section-block">
        <h2 class="section-title">2. Rastreio Inteligente: PSA, Ressonância PI-RADS e Biópsia por Fusão</h2>
        <p class="section-p">
          Seguindo as diretrizes da <strong>Sociedade Brasileira de Urologia (SBU)</strong> e da <strong>EAU</strong>, recomendamos iniciar a avaliação individualizada aos <strong>45 anos</strong> (para homens com histórico familiar de câncer de próstata/mama ou afrodescendentes) e aos <strong>50 anos</strong> para a população geral.
        </p>
        <div class="callout-box">
          <h5>O Fim das Biópsias "às Cegas"</h5>
          <p>
            Quando o PSA apresenta oscilação, não indicamos biópsia imediata de forma automática. Utilizamos a <strong>Ressonância Magnética Multiparamétrica da Próstata (classificação PI-RADS 1 a 5)</strong> para mapear milimetricamente a glândula. Se houver área suspeita (PI-RADS 4 ou 5), realizamos a <strong>Biópsia Transperineal com Fusão de Imagens</strong> sob sedação — técnica de altíssima precisão e baixíssimo risco infeccioso.
          </p>
        </div>
      </div>
    `,
    page3Html: `
      <div class="section-block">
        <h2 class="section-title">3. Por Que Não Ignorar o Jato Fraco: Protegendo a Bexiga e os Rins</h2>
        <p class="section-p">
          Quando a próstata aumentada comprime a uretra, a <strong>bexiga</strong> precisa fazer até 3 vezes mais força para expulsar a urina. Com o passar dos anos, a musculatura vesical (detrusor) engrossa, perde elasticidade, forma divertículos e pode evoluir para retenção urinária ou sobrecarga renal. A <strong>Avaliação Urodinâmica</strong> e a urofluxometria nos permitem identificar o momento exato de intervir antes que a bexiga perca sua força contrátil.
        </p>
      </div>

      <div class="section-block">
        <h2 class="section-title">4. Tecnologias Minimamente Invasivas (Laser, Rezum e Robótica)</h2>
        <table class="clinical-table">
          <thead>
            <tr>
              <th style="width: 28%;">Tecnologia Cirúrgica</th>
              <th style="width: 36%;">Indicação Principal</th>
              <th style="width: 36%;">Diferenciais de Recuperação</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Terapia com Vapor d'Água (Rezum) / UroLift</strong></td>
              <td>HPB leve a moderada em homens que desejam evitar uso contínuo de medicamentos e preservar a ejaculação.</td>
              <td>Procedimento endoscópico ambulatorial rápido; preserva >90% da função ejaculatória anterógrada.</td>
            </tr>
            <tr>
              <td><strong>Enucleação Prostática a Laser (HoLEP / ThuLEP)</strong></td>
              <td>HPB moderada a volumosa (inclusive próstatas >80g–150g), substituindo a cirurgia aberta tradicional.</td>
              <td>Realizada 100% pelo canal da uretra (sem cortes), mínimo sangramento e alta hospitalar em 24–48h.</td>
            </tr>
            <tr>
              <td><strong>Ureterorrenolitotripsia Flexível a Laser</strong></td>
              <td>Cálculos renais e ureterais (pedras nos rins) de qualquer densidade.</td>
              <td>Microfibra óptica flexível com fragmentação a Holmium/Thulium Laser (pulverização sem incisões).</td>
            </tr>
            <tr>
              <td><strong>Cirurgia Robótica (Plataforma Da Vinci)</strong></td>
              <td>Câncer de próstata localizado (Prostatectomia Radical) e tumores renais (Nefrectomia Parcial).</td>
              <td>Visão 3D HD ampliada em 10x e pinças articuladas em 360° para preservação máxima de potência e continência.</td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    checklistTitle: "Autoavaliação de Sintomas Urinários e Prostáticos (Baseada no IPSS):",
    checklistItems: [
      "Sensação de que a bexiga não esvaziou completamente após terminar de urinar;",
      "Necessidade de urinar novamente em menos de 2 horas após a última micção;",
      "Jato urinário mais fraco, fino, dividido ou que interrompe e recomeça;",
      "Necessidade de levantar 2 ou mais vezes durante a noite para urinar (noctúria);",
      "Urgência urinária (dificuldade para segurar a urina quando surge a vontade);",
      "Usa medicamentos para próstata (tansulosina/dutasterida) com efeitos colaterais ou pouca melhora.",
    ],
    checklistFooter:
      "Importante: Sintomas urinários persistentes ou uso prolongado de medicações sem reavaliação merecem investigação especializada para proteger a função vesical.",
    page4TopHtml: `
      <div class="section-block">
        <h2 class="section-title">5. Excelência Hospitalar e Segunda Opinião Cirúrgica</h2>
        <p class="section-p">
          Quando uma cirurgia urológica ou biópsia é indicada, a escolha da técnica e a experiência da equipe cirúrgica fazem toda a diferença no pós-operatório. Como <strong>Membro Titular do Colégio Brasileiro de Cirurgiões (TCBC)</strong> e urologista formado pelo <strong>Instituto D'Or (IDOR)</strong>, realizo procedimentos nos principais centros cirúrgicos de São Paulo e Campinas (Rede D'Or São Luiz, Campinas Day Hospital e hospitais de referência), com suporte completo da nossa equipe para planejamento cirúrgico e orientações de convênio/reembolso.
        </p>
      </div>
    `,
    references: [
      "Cornu JN, Gacci M, Hashim H, et al. EAU Guidelines on Management of Non-Neurogenic Male Lower Urinary Tract Symptoms (LUTS), incl. Benign Prostatic Obstruction (BPO). European Association of Urology, 2025/2026.",
      "Cornford P, Tilki D, van den Bergh RCN, et al. EAU-EANM-ESTRO-ESUR-ISUP-SIOG Guidelines on Prostate Cancer. Eur Urol, 2025.",
      "Sandhu JS, Bixler BR, Dahm P, et al. Management of Lower Urinary Tract Symptoms Attributed to Benign Prostatic Hyperplasia: AUA Guideline. J Urol. 2024.",
      "Conselho Federal de Medicina (CFM). Resolução CFM nº 2.336/2023. Material informativo elaborado pelo Dr. Felipe de Bulhões Ojeda (CRM-SP 202291 | RQE 146538 | RQE 114019).",
    ],
  },
  {
    id: "fertilidade-vasectomia",
    filename: "Guia_Fertilidade_Microcirurgia_Vasectomia_Dr_Felipe_Bulhoes.pdf",
    badge: "Microcirurgia & Planejamento",
    eyebrow: "Saúde Reprodutiva Masculina",
    title: "Fertilidade Masculina, Varicocele com Microscópio & Vasectomia Sem Bisturi",
    shortTitle: "Fertilidade, Varicocele & Vasectomia",
    subtitle:
      "O guia completo para as duas fases do planejamento reprodutivo do homem: como restaurar o potencial fértil com microcirurgia ou realizar a Vasectomia Sem Bisturi com recuperação rápida.",
    coverBullets: [
      "Por que o fator masculino responde por 50% das dificuldades de engravidar — e o papel oculto da Fragmentação do DNA Espermático;",
      "Varicocelectomia Microcirúrgica Subinguinal com Microscópio Óptico: por que é o padrão-ouro mundial (EAU/AUA);",
      "Como proteger ou recuperar a produção de espermatozoides em homens que usaram testosterona;",
      "Vasectomia Sem Bisturi (No-Scalpel): como funciona a técnica em 30 minutos, recuperação em 48–72h e regras da Lei atual.",
    ],
    introHtml: `
      <p><strong>Olá! Sou o Dr. Felipe de Bulhões, médico Urologista (IDOR) e Cirurgião Geral (TCBC).</strong></p>
      <p>Na saúde reprodutiva masculina, atuo nos dois momentos mais importantes da vida familiar de um homem: quando o casal busca realizar o sonho de ter filhos — exigindo investigação andrológica refinada e microcirurgia de alta precisão — e quando a família já está completa, oferecendo a <strong>Vasectomia Sem Bisturi</strong> com máximo conforto e segurança. Este guia reúne as informações essenciais para sua decisão.</p>
    `,
    page2Html: `
      <div class="section-block">
        <h2 class="section-title">1. Fertilidade Masculina e Varicocele: Muito Além do Espermograma Básico</h2>
        <p class="section-p">
          Em cerca de <strong>50% dos casais</strong> que enfrentam dificuldade para engravidar (ou perdas gestacionais de repetição), existe um fator masculino associado. A <strong>Varicocele</strong> — dilatação das veias do plexo pampiniforme que drenam o testículo — é a causa tratável mais comum de infertilidade masculina (presente em até 40% dos casos primários e 80% da infertilidade secundária).
        </p>
        <p class="section-p">
          O refluxo venoso eleva a temperatura intratesticular e gera <strong>estresse oxidativo</strong>, danificando não apenas a contagem e a motilidade, mas também a integridade genética do espermatozoide (<strong>Fragmentação do DNA Espermático</strong>) e a produção testicular de testosterona pelas células de Leydig.
        </p>
        <table class="clinical-table">
          <thead>
            <tr>
              <th style="width: 26%;">Técnica Cirúrgica</th>
              <th style="width: 40%;">Varicocelectomia Microcirúrgica (Padrão-Ouro)</th>
              <th style="width: 34%;">Técnicas Convencionais Sem Microscópio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Magnificação Óptica</strong></td>
              <td>Uso de <strong>Microscópio Cirúrgico (10x a 25x)</strong> por acesso subinguinal (sem abrir aponeurose muscular).</td>
              <td>Olho nu ou lupa simples, dificultando a distinção de microvasos aderidos.</td>
            </tr>
            <tr>
              <td><strong>Segurança Arterial &amp; Linfática</strong></td>
              <td>Preservação milimétrica da <strong>artéria testicular</strong> e dos vasos linfáticos; risco de hidrocele <strong>&lt; 1%</strong>.</td>
              <td>Maior risco de lesão arterial ou obstrução linfática (hidrocele pós-operatória em 5–10%).</td>
            </tr>
            <tr>
              <td><strong>Taxa de Sucesso</strong></td>
              <td>Menor índice de recidiva (&lt;1–2%), melhora seminal em <strong>60% a 80%</strong> dos pacientes e aumento de gravidez espontânea ou sucesso na FIV.</td>
              <td>Taxa de persistência/recidiva venosa significativamente superior (até 10–15%).</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="section-block">
        <h2 class="section-title">2. Reposição de Testosterona e Fertilidade: É Possível Reverter?</h2>
        <div class="callout-box">
          <h5>O Efeito Contraceptivo da Testosterona Exógena</h5>
          <p>
            Muitos homens jovens utilizam testosterona ou anabolizantes sem saber que o hormônio externo inibe os sinais da hipófise (LH e FSH), fazendo o testículo parar de produzir espermatozoides. Se você deseja ter filhos, <strong>nunca inicie testosterona convencional sem orientação urológica</strong> — dispomos de protocolos específicos (moduladores seletivos e gonadotrofinas como hCG/FSH) que estimulam a testosterona endógena preservando ou resgatando a espermatogênese.
          </p>
        </div>
      </div>
    `,
    page3Html: `
      <div class="section-block">
        <h2 class="section-title">3. Vasectomia Sem Bisturi (No-Scalpel Vasectomy): Contracepção Definitiva</h2>
        <p class="section-p">
          Para o homem ou casal que já definiu seu planejamento familiar e deseja encerrar o uso de anticoncepcionais hormonais femininos ou DIU, a <strong>Vasectomia Sem Bisturi</strong> é o método contraceptivo mais seguro e eficaz da medicina (eficácia <strong>&gt; 99,8%</strong> após confirmação pelo espermograma).
        </p>
        <div class="two-col">
          <div class="col-card">
            <h4>Como Funciona a Técnica Sem Bisturi</h4>
            <ul>
              <li>Em vez de cortes com lâmina de bisturi, utiliza-se uma pinça hemostática de ponta fina para afastar delicadamente as fibras da pele escrotal por micropunção (~3 a 5 mm);</li>
              <li>Realizada com anestesia local (ou sedação leve opcional) em cerca de <strong>25 a 30 minutos</strong>;</li>
              <li>Mínimo sangramento, muitas vezes sem necessidade de pontos externos, e retorno às atividades leves em <strong>48 a 72 horas</strong>.</li>
            </ul>
          </div>
          <div class="col-card">
            <h4>O Que NÃO Muda Após a Vasectomia</h4>
            <ul>
              <li><strong>Produção de Testosterona e Libido:</strong> 100% preservadas (os hormônios saem pela corrente sanguínea, não pelo canal deferente);</li>
              <li><strong>Potência e Sensibilidade:</strong> Nenhuma alteração nos nervos ou vasos da ereção;</li>
              <li><strong>Volume do Sêmen:</strong> 95% do líquido ejaculado vem da próstata e das vesículas seminais — o aspecto visual da ejaculação permanece idêntico.</li>
            </ul>
          </div>
        </div>
        <p class="section-p">
          <strong>Legislação Atualizada (Lei nº 14.443/2022):</strong> A vasectomia pode ser realizada por qualquer homem com capacidade civil plena a partir de <strong>21 anos de idade</strong> (ou com pelo menos 2 filhos vivos), respeitado o prazo legal de manifestação de vontade, <strong>sem necessidade de assinatura ou consentimento do cônjuge</strong>.
        </p>
      </div>
    `,
    checklistTitle: "Checklist de Planejamento Reprodutivo: Qual é o Seu Momento?",
    checklistItems: [
      "Casal tentando engravidar há 6–12 meses sem sucesso ou com histórico de abortamento;",
      "Diagnóstico de Varicocele no exame físico/ultrassom ou alteração no espermograma;",
      "Dor testicular tipo peso/latejamento que piora ao ficar em pé ou após atividade física;",
      "Fez ou faz uso de testosterona/ergogênicos e deseja preservar ou recuperar a fertilidade;",
      "Já tem a família completa e busca a Vasectomia Sem Bisturi com rápida recuperação;",
      "Deseja realizar Reversão Microcirúrgica de Vasectomia prévia (Vasovasostomia).",
    ],
    checklistFooter:
      "Orientação Médica: Tanto a investigação de fertilidade/varicocele quanto o planejamento da Vasectomia Sem Bisturi começam em uma consulta urológica estruturada e acolhedora.",
    page4TopHtml: `
      <div class="section-block">
        <h2 class="section-title">4. Segurança no Pós-Procedimento e Acompanhamento</h2>
        <table class="clinical-table">
          <thead>
            <tr>
              <th style="width: 30%;">Procedimento</th>
              <th style="width: 70%;">Protocolo de Recuperação e Controle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Vasectomia Sem Bisturi</strong></td>
              <td>Alta no mesmo dia; repouso relativo por 48–72h e retorno às relações em 7 dias. <strong>Fundamental:</strong> manter método contraceptivo até a realização do <strong>Espermograma Pós-Vasectomia (após 60–90 dias e ~20 ejaculações)</strong> confirmando azoospermia (zero espermatozoides).</td>
            </tr>
            <tr>
              <td><strong>Varicocelectomia Microcirúrgica</strong></td>
              <td>Procedimento Hospital Day (alta no mesmo dia); retorno ao trabalho de escritório em 3 a 5 dias e treinos em 2 a 3 semanas. O ciclo da espermatogênese dura ~74 dias, com reavaliação seminal aos <strong>3 e 6 meses</strong>.</td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    references: [
      "Salonia A, Bettocchi C, Boeri L, et al. EAU Guidelines on Sexual and Reproductive Health — Male Infertility & Varicocele. European Association of Urology, 2025/2026.",
      "Schlegel PN, Sigman M, Collura B, et al. Diagnosis and Treatment of Infertility in Men: AUA/ASRM Guideline. J Urol. 2021.",
      "Sharlip ID, Belker AM, Honig S, et al. Vasectomy: AUA Guideline. American Urological Association.",
      "Conselho Federal de Medicina (CFM). Resolução CFM nº 2.336/2023. Dr. Felipe de Bulhões Ojeda — CRM-SP 202291 | RQE 146538 | RQE 114019.",
    ],
  },
];

const edgePaths = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
];

const browserExe = edgePaths.find((p) => fs.existsSync(p));
if (!browserExe) {
  throw new Error("Neither Edge nor Chrome found for headless PDF generation.");
}

const tmpDir = path.join(ROOT, "audit", "tmp-playbooks");
fs.mkdirSync(tmpDir, { recursive: true });

for (const guide of GUIDES) {
  const htmlPath = path.join(tmpDir, `${guide.id}.html`);
  const outPdfPath = path.join(STORAGE_DIR, guide.filename);
  fs.writeFileSync(htmlPath, buildHtml(guide), "utf8");

  const fileUrl = `file:///${htmlPath.replace(/\\/g, "/")}`;
  execFileSync(
    browserExe,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-pdf-header-footer",
      `--print-to-pdf=${outPdfPath}`,
      fileUrl,
    ],
    { stdio: "inherit" }
  );
  const stat = fs.statSync(outPdfPath);
  console.log(`Generated ${guide.filename} (${Math.round(stat.size / 1024)} KB)`);
}

// Copy flagship guide to legacy filename so any existing link or test remains 100% functional
const legacyPath = path.join(
  STORAGE_DIR,
  "Guia_Saude_Integral_Homem_Dr_Felipe_Bulhoes_113672bc.pdf"
);
fs.copyFileSync(
  path.join(STORAGE_DIR, GUIDES[0].filename),
  legacyPath
);
console.log("Updated legacy Guia_Saude_Integral_Homem_Dr_Felipe_Bulhoes_113672bc.pdf");
