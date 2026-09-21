import sharp from "sharp";
import { describe, expect, it } from "vitest";
import {
  cropImageToOpenGraph,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  renderArticleOgSvg,
} from "./socialImageBuilder";

describe("social image builder", () => {
  it("creates an exact 1200 × 630 JPEG crop from a wide source image", async () => {
    const source = await sharp({
      create: { width: 2560, height: 1440, channels: 3, background: "#123456" },
    }).png().toBuffer();

    const output = await cropImageToOpenGraph(source);
    const metadata = await sharp(output).metadata();

    expect(metadata.width).toBe(OG_IMAGE_WIDTH);
    expect(metadata.height).toBe(OG_IMAGE_HEIGHT);
    expect(metadata.format).toBe("jpeg");
  });

  it("renders a branded SVG with title text escaped and wrapped", () => {
    const svg = renderArticleOgSvg('Pedra no rim: "o que fazer" & quando procurar ajuda');

    expect(svg).toContain('width="1200" height="630"');
    expect(svg).toContain("UROLOGIA • CONTEÚDO EDUCATIVO");
    expect(svg).toContain("Pedra no rim:");
    expect(svg).toContain("&quot;o que fazer&quot;");
    expect(svg).toContain("&amp; quando procurar ajuda");
    expect(svg).toContain("DR. FELIPE DE BULHÕES");
  });

  it("rasterizes the article SVG to the expected Open Graph dimensions", async () => {
    const output = await sharp(Buffer.from(renderArticleOgSvg("Como se preparar para a primeira consulta urológica"))).png().toBuffer();
    const metadata = await sharp(output).metadata();

    expect(metadata.width).toBe(OG_IMAGE_WIDTH);
    expect(metadata.height).toBe(OG_IMAGE_HEIGHT);
    expect(metadata.format).toBe("png");
  });
});
