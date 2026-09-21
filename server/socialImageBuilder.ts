import { createHash } from "node:crypto";
import { nanoid } from "nanoid";
import sharp from "sharp";
import { storagePut } from "./storage";

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
const MAX_SOURCE_BYTES = 8 * 1024 * 1024;
const REQUEST_TIMEOUT_MS = 15_000;

export type GeneratedOgImage = {
  url: string;
  key: string;
  width: number;
  height: number;
  bytes: number;
  format: "jpeg" | "png";
  source: "auto-crop" | "article-template";
};

function escapeXml(value: string): string {
  return value.replace(/[<>&"']/g, character => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;",
  })[character]!);
}

function wrapTitle(title: string, maxCharsPerLine = 28): string[] {
  const words = title.trim().replace(/\s+/g, " ").split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxCharsPerLine || !current) {
      current = candidate;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);

  if (lines.length <= 3) return lines;
  return [lines[0]!, lines[1]!, `${lines.slice(2).join(" ").slice(0, maxCharsPerLine - 1).trim()}…`];
}

async function downloadSourceImage(imageUrl: string): Promise<Buffer> {
  const response = await fetch(imageUrl, {
    redirect: "follow",
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    headers: { Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8" },
  });
  if (!response.ok) throw new Error(`A imagem de origem respondeu com HTTP ${response.status}.`);

  const declaredSize = Number(response.headers.get("content-length"));
  if (Number.isFinite(declaredSize) && declaredSize > MAX_SOURCE_BYTES) {
    throw new Error("A imagem de origem excede o limite operacional de 8 MB.");
  }

  const arrayBuffer = await response.arrayBuffer();
  if (arrayBuffer.byteLength > MAX_SOURCE_BYTES) {
    throw new Error("A imagem de origem excede o limite operacional de 8 MB.");
  }
  return Buffer.from(arrayBuffer);
}

/** Creates a fixed 1200×630 crop using Sharp attention-based focal selection. */
export async function cropImageToOpenGraph(source: Buffer): Promise<Buffer> {
  return sharp(source, { failOn: "none" })
    .rotate()
    .resize(OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT, {
      fit: "cover",
      position: sharp.strategy.attention,
      kernel: sharp.kernel.lanczos3,
    })
    .jpeg({ quality: 88, progressive: true, chromaSubsampling: "4:4:4" })
    .toBuffer();
}

/** Renders an exact, branded 1200×630 banner for a new article title. */
export function renderArticleOgSvg(title: string): string {
  const lines = wrapTitle(title);
  const fontSize = lines.length === 1 ? 82 : lines.length === 2 ? 70 : 62;
  const lineHeight = fontSize + 16;
  const titleStartY = lines.length === 1 ? 320 : lines.length === 2 ? 270 : 230;
  const titleMarkup = lines
    .map((line, index) => `<text x="92" y="${titleStartY + index * lineHeight}" font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="700" fill="#FFFFFF">${escapeXml(line)}</text>`)
    .join("");

  return `<svg width="${OG_IMAGE_WIDTH}" height="${OG_IMAGE_HEIGHT}" viewBox="0 0 ${OG_IMAGE_WIDTH} ${OG_IMAGE_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0E2945" />
      <stop offset="100%" stop-color="#173F65" />
    </linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#B87333" />
      <stop offset="100%" stop-color="#E6BC72" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#background)" />
  <circle cx="1060" cy="112" r="238" fill="none" stroke="#E6BC72" stroke-opacity="0.22" stroke-width="2" />
  <circle cx="1060" cy="112" r="176" fill="none" stroke="#E6BC72" stroke-opacity="0.12" stroke-width="1" />
  <path d="M818 612 C912 468, 1055 418, 1200 385" fill="none" stroke="#B87333" stroke-opacity="0.34" stroke-width="2" />
  <rect x="92" y="128" width="102" height="5" rx="2.5" fill="url(#gold)" />
  <text x="92" y="180" font-family="Arial, sans-serif" font-size="23" font-weight="700" letter-spacing="3" fill="#E6BC72">UROLOGIA • CONTEÚDO EDUCATIVO</text>
  ${titleMarkup}
  <line x1="92" y1="502" x2="448" y2="502" stroke="#E6BC72" stroke-opacity="0.52" stroke-width="1" />
  <text x="92" y="552" font-family="Arial, sans-serif" font-size="25" font-weight="700" fill="#FFFFFF">DR. FELIPE DE BULHÕES</text>
  <text x="92" y="586" font-family="Arial, sans-serif" font-size="19" fill="#D9E4EE">Urologista • São Paulo e Campinas</text>
  </svg>`;
}

async function uploadGeneratedImage(
  folder: "crops" | "articles",
  seed: string,
  buffer: Buffer,
  contentType: "image/jpeg" | "image/png",
  format: "jpeg" | "png",
  source: GeneratedOgImage["source"]
): Promise<GeneratedOgImage> {
  const digest = createHash("sha256").update(seed).digest("hex").slice(0, 10);
  const extension = format === "jpeg" ? "jpg" : "png";
  const { key, url } = await storagePut(
    `social-og/${folder}/${digest}-${nanoid(8)}.${extension}`,
    buffer,
    contentType
  );
  return { url, key, width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT, bytes: buffer.byteLength, format, source };
}

export async function createCroppedOpenGraphImage(imageUrl: string): Promise<GeneratedOgImage> {
  const source = await downloadSourceImage(imageUrl);
  const output = await cropImageToOpenGraph(source);
  return uploadGeneratedImage("crops", imageUrl, output, "image/jpeg", "jpeg", "auto-crop");
}

export async function createArticleOpenGraphImage(title: string): Promise<GeneratedOgImage> {
  const svg = renderArticleOgSvg(title);
  const output = await sharp(Buffer.from(svg)).png({ compressionLevel: 9, adaptiveFiltering: true }).toBuffer();
  return uploadGeneratedImage("articles", title, output, "image/png", "png", "article-template");
}
