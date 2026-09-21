import { afterEach, describe, expect, it, vi } from "vitest";
import { auditSocialImage, getImageDimensions } from "./socialImageAudit";

function png(width: number, height: number): Uint8Array {
  const output = new Uint8Array(24);
  output.set([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a], 0);
  output.set([0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52], 8);
  const view = new DataView(output.buffer);
  view.setUint32(16, width);
  view.setUint32(20, height);
  return output;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("social image audit", () => {
  it("reads PNG dimensions without relying on browser APIs", () => {
    expect(getImageDimensions(png(1200, 630))).toEqual({ width: 1200, height: 630, format: "png" });
    expect(getImageDimensions(new Uint8Array([1, 2, 3]))).toBeNull();
  });

  it("reads dimensions from a lossy WebP VP8 payload", () => {
    const webp = new Uint8Array(30);
    webp.set([0x52, 0x49, 0x46, 0x46], 0); // RIFF
    webp.set([0x57, 0x45, 0x42, 0x50], 8); // WEBP
    webp.set([0x56, 0x50, 0x38, 0x20], 12); // VP8
    webp.set([0x9d, 0x01, 0x2a], 23);
    webp.set([0x00, 0x0a, 0xa0, 0x05], 26); // 2560 × 1440, little-endian

    expect(getImageDimensions(webp)).toEqual({ width: 2560, height: 1440, format: "webp" });
  });

  it("approves the configured 1200 × 630 image after a server-side fetch", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(png(1200, 630), {
      status: 200,
      headers: { "content-type": "image/png", "content-length": "24" },
    })));

    const result = await auditSocialImage("https://images.example.test/social.png");

    expect(result.reachable).toBe(true);
    expect(result.width).toBe(1200);
    expect(result.height).toBe(630);
    expect(result.bytes).toBe(24);
    expect(result.dimensionStatus).toBe("pass");
    expect(result.sizeStatus).toBe("pass");
    expect(result.overallStatus).toBe("pass");
  });

  it("flags an image with dimensions outside the configured social-card standard", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(png(600, 315), {
      status: 200,
      headers: { "content-type": "image/png" },
    })));

    const result = await auditSocialImage("https://images.example.test/legacy.png");

    expect(result.reachable).toBe(true);
    expect(result.dimensionStatus).toBe("warning");
    expect(result.overallStatus).toBe("warning");
    expect(result.messages.join(" ")).toContain("difere do padrão operacional");
  });

  it("stops a declared oversized download before buffering the response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(png(1200, 630), {
      status: 200,
      headers: { "content-length": String(9 * 1024 * 1024) },
    })));

    const result = await auditSocialImage("https://images.example.test/oversized.png");

    expect(result.reachable).toBe(false);
    expect(result.overallStatus).toBe("error");
    expect(result.messages[0]).toContain("8 MB");
  });
});
