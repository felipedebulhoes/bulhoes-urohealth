const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const REQUEST_TIMEOUT_MS = 12_000;
const EXPECTED_WIDTH = 1200;
const EXPECTED_HEIGHT = 630;

export type SocialImageFormat = "png" | "jpeg" | "webp" | "gif" | "unknown";

export type ImageDimensions = {
  width: number;
  height: number;
  format: SocialImageFormat;
};

export type SocialImageAudit = {
  url: string;
  finalUrl: string;
  reachable: boolean;
  contentType: string | null;
  bytes: number | null;
  width: number | null;
  height: number | null;
  format: SocialImageFormat;
  expectedWidth: number;
  expectedHeight: number;
  dimensionStatus: "pass" | "warning" | "error";
  sizeStatus: "pass" | "warning" | "error";
  overallStatus: "pass" | "warning" | "error";
  messages: string[];
};

function readUint24LE(buffer: Uint8Array, offset: number): number {
  return buffer[offset]! | (buffer[offset + 1]! << 8) | (buffer[offset + 2]! << 16);
}

function ascii(buffer: Uint8Array, offset: number, length: number): string {
  let value = "";
  for (let index = offset; index < offset + length; index += 1) {
    value += String.fromCharCode(buffer[index]!);
  }
  return value;
}

function parseJpegDimensions(buffer: Uint8Array): ImageDimensions | null {
  if (buffer.length < 10 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return null;

  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = buffer[offset + 1]!;
    if (marker === 0xd9 || marker === 0xda) break;
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      offset += 2;
      continue;
    }

    const length = (buffer[offset + 2]! << 8) | buffer[offset + 3]!;
    if (length < 2 || offset + length + 2 > buffer.length) break;

    const isStartOfFrame =
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf);

    if (isStartOfFrame) {
      return {
        height: (buffer[offset + 5]! << 8) | buffer[offset + 6]!,
        width: (buffer[offset + 7]! << 8) | buffer[offset + 8]!,
        format: "jpeg",
      };
    }

    offset += length + 2;
  }

  return null;
}

/** Parses dimensions from the common raster formats used by the social catalog. */
export function getImageDimensions(buffer: Uint8Array): ImageDimensions | null {
  if (
    buffer.length >= 24 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[12] === 0x49 &&
    buffer[13] === 0x48 &&
    buffer[14] === 0x44 &&
    buffer[15] === 0x52
  ) {
    const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    return { width: view.getUint32(16), height: view.getUint32(20), format: "png" };
  }

  const jpeg = parseJpegDimensions(buffer);
  if (jpeg) return jpeg;

  if (
    buffer.length >= 30 &&
    ascii(buffer, 0, 4) === "RIFF" &&
    ascii(buffer, 8, 4) === "WEBP"
  ) {
    const chunkType = ascii(buffer, 12, 4);
    if (chunkType === "VP8X" && buffer.length >= 30) {
      return {
        width: 1 + readUint24LE(buffer, 24),
        height: 1 + readUint24LE(buffer, 27),
        format: "webp",
      };
    }
    if (
      chunkType === "VP8 " &&
      buffer.length >= 30 &&
      buffer[23] === 0x9d &&
      buffer[24] === 0x01 &&
      buffer[25] === 0x2a
    ) {
      return {
        width: (buffer[26]! | (buffer[27]! << 8)) & 0x3fff,
        height: (buffer[28]! | (buffer[29]! << 8)) & 0x3fff,
        format: "webp",
      };
    }
  }

  if (
    buffer.length >= 10 &&
    ascii(buffer, 0, 3) === "GIF"
  ) {
    return {
      width: buffer[6]! | (buffer[7]! << 8),
      height: buffer[8]! | (buffer[9]! << 8),
      format: "gif",
    };
  }

  return null;
}

async function readBodyWithLimit(response: Response): Promise<Uint8Array> {
  if (!response.body) throw new Error("A resposta da imagem não contém conteúdo.");

  const declaredSize = Number(response.headers.get("content-length"));
  if (Number.isFinite(declaredSize) && declaredSize > MAX_IMAGE_BYTES) {
    throw new Error("A imagem excede o limite operacional de 8 MB.");
  }

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let bytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;
      bytes += value.byteLength;
      if (bytes > MAX_IMAGE_BYTES) {
        await reader.cancel();
        throw new Error("A imagem excede o limite operacional de 8 MB.");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const output = new Uint8Array(bytes);
  let offset = 0;
  for (const chunk of chunks) {
    output.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return output;
}

export async function auditSocialImage(imageUrl: string): Promise<SocialImageAudit> {
  const base = {
    url: imageUrl,
    finalUrl: imageUrl,
    reachable: false,
    contentType: null,
    bytes: null,
    width: null,
    height: null,
    format: "unknown" as SocialImageFormat,
    expectedWidth: EXPECTED_WIDTH,
    expectedHeight: EXPECTED_HEIGHT,
    dimensionStatus: "error" as const,
    sizeStatus: "error" as const,
    overallStatus: "error" as const,
    messages: [] as string[],
  };

  try {
    const response = await fetch(imageUrl, {
      redirect: "follow",
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      headers: { Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8" },
    });

    if (!response.ok) {
      return { ...base, finalUrl: response.url || imageUrl, messages: [`A imagem respondeu com HTTP ${response.status}.`] };
    }

    const contentType = response.headers.get("content-type");
    const body = await readBodyWithLimit(response);
    const dimensions = getImageDimensions(body);

    if (!dimensions) {
      return {
        ...base,
        finalUrl: response.url || imageUrl,
        reachable: true,
        contentType,
        bytes: body.byteLength,
        sizeStatus: "pass",
        messages: ["A imagem foi baixada, mas o formato não permite leitura segura de dimensões."],
      };
    }

    const expectedDimensions = dimensions.width === EXPECTED_WIDTH && dimensions.height === EXPECTED_HEIGHT;
    const messages = [
      `Imagem acessível: ${dimensions.width} × ${dimensions.height}px (${dimensions.format.toUpperCase()}).`,
      `Arquivo: ${(body.byteLength / 1024).toFixed(1)} KB.`,
    ];
    if (!expectedDimensions) {
      messages.push(`A proporção difere do padrão operacional de ${EXPECTED_WIDTH} × ${EXPECTED_HEIGHT}px configurado para os cards sociais.`);
    }

    return {
      ...base,
      finalUrl: response.url || imageUrl,
      reachable: true,
      contentType,
      bytes: body.byteLength,
      width: dimensions.width,
      height: dimensions.height,
      format: dimensions.format,
      dimensionStatus: expectedDimensions ? "pass" : "warning",
      sizeStatus: "pass",
      overallStatus: expectedDimensions ? "pass" : "warning",
      messages,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Não foi possível verificar a imagem.";
    return { ...base, messages: [message] };
  }
}
