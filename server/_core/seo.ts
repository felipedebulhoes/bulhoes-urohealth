import {
  isIndexableSitePath,
  isKnownSitePath,
  normalizeSitePath,
} from "../../shared/siteRoutes";
import { getPageMetadata } from "../../shared/pageMetadata";

export const CANONICAL_ORIGIN = "https://felipebulhoes.com";

const ALTERNATE_HOSTNAMES = new Set([
  "www.felipebulhoes.com",
  "felipebulhoes.com.br",
  "www.felipebulhoes.com.br",
  "drfelipebulhoesurologia.com.br",
  "www.drfelipebulhoesurologia.com.br",
  "bulhoesurohealth.com",
  "www.bulhoesurohealth.com",
]);

function normalizeHostname(host: string | undefined): string {
  return (host ?? "")
    .trim()
    .toLowerCase()
    .replace(/:\d+$/, "")
    .replace(/\.$/, "");
}

export function getRequestHostname(
  headers: Record<string, string | string[] | undefined>,
  fallback?: string
): string {
  const forwardedHost = headers["x-forwarded-host"];
  const originalHost = headers["x-original-host"];
  const directHost = headers.host;
  const candidate = Array.isArray(forwardedHost)
    ? forwardedHost[0]
    : forwardedHost?.split(",")[0] ||
      (Array.isArray(originalHost) ? originalHost[0] : originalHost) ||
      (Array.isArray(directHost) ? directHost[0] : directHost) ||
      fallback;

  return normalizeHostname(candidate);
}

/**
 * Returns the one-step SEO redirect for alternate domains and known malformed
 * URLs. A relative target keeps local development on the current host, while
 * alternate production hosts are consolidated on the canonical origin.
 */
export function getSeoRedirectTarget(
  host: string | undefined,
  originalUrl: string
): string | null {
  const hostname = normalizeHostname(host);
  const url = new URL(originalUrl || "/", "https://request.invalid");
  const isAlternateHost = ALTERNATE_HOSTNAMES.has(hostname);
  let normalizedPath = url.pathname;
  let normalizedSearch = url.search;
  let hasPathFix = false;

  // URL discovered by Google and reported as a duplicate canonical conflict.
  if (normalizedPath === "/$") {
    normalizedPath = "/";
    normalizedSearch = "";
    hasPathFix = true;
  }

  // Obsolete SearchAction placeholder discovered as an alternate blog URL.
  if (
    normalizedPath === "/blog" &&
    url.searchParams.get("q") === "{search_term_string}"
  ) {
    normalizedSearch = "";
    hasPathFix = true;
  }

  const pathWithoutTrailingSlash = normalizeSitePath(normalizedPath);
  if (
    normalizedPath !== "/" &&
    normalizedPath !== pathWithoutTrailingSlash &&
    isKnownSitePath(pathWithoutTrailingSlash)
  ) {
    normalizedPath = pathWithoutTrailingSlash;
    hasPathFix = true;
  }

  if (!isAlternateHost && !hasPathFix) return null;

  const target = `${normalizedPath}${normalizedSearch}`;
  return isAlternateHost ? `${CANONICAL_ORIGIN}${target}` : target;
}

export function getCanonicalUrl(requestPath: string): string {
  const url = new URL(requestPath || "/", CANONICAL_ORIGIN);
  let pathname = url.pathname || "/";

  if (pathname !== "/") {
    pathname = pathname.replace(/\/+$/, "");
  }

  return `${CANONICAL_ORIGIN}${pathname}`;
}

export function getSpaResponseStatus(requestPath: string): 200 | 404 {
  if (normalizeSitePath(requestPath) === "/404") return 404;
  return isKnownSitePath(requestPath) ? 200 : 404;
}

function escapeHtmlAttribute(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function getSocialImageType(imageUrl: string): string {
  const pathname = imageUrl.split("?")[0].toLowerCase();
  if (pathname.endsWith(".webp")) return "image/webp";
  if (pathname.endsWith(".jpg") || pathname.endsWith(".jpeg")) return "image/jpeg";
  return "image/png";
}

/**
 * Injects crawler-visible metadata for every response. This is intentionally
 * server-side because social crawlers generally do not wait for React effects.
 */
export function injectCanonicalMetadata(html: string, requestPath: string): string {
  const canonicalUrl = getCanonicalUrl(requestPath);
  const withoutExistingTags = html
    .replace(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>\s*/gi, "")
    .replace(/<meta\b(?=[^>]*\bname=["']description["'])[^>]*>\s*/gi, "")
    .replace(/<meta\b(?=[^>]*\bproperty=["']og:(?:title|description|type|url|site_name|locale|image(?::(?:alt|width|height|type))?)["'])[^>]*>\s*/gi, "")
    .replace(/<meta\b(?=[^>]*\bname=["']twitter:(?:card|title|description|image|image:alt)["'])[^>]*>\s*/gi, "")
    .replace(/<meta\b(?=[^>]*\bname=["']robots["'])[^>]*>\s*/gi, "");

  const tags = isIndexableSitePath(requestPath)
    ? (() => {
        const metadata = getPageMetadata(requestPath);
        const title = escapeHtmlAttribute(metadata.title);
        const description = escapeHtmlAttribute(metadata.description);
        const image = escapeHtmlAttribute(metadata.image);
        const imageAlt = escapeHtmlAttribute(metadata.imageAlt);
        const imageType = getSocialImageType(metadata.image);

        return [
          `    <title>${title}</title>`,
          `    <meta name="description" content="${description}" />`,
          '    <meta name="robots" content="index, follow" />',
          `    <link rel="canonical" href="${canonicalUrl}" />`,
          `    <meta property="og:title" content="${title}" />`,
          `    <meta property="og:description" content="${description}" />`,
          `    <meta property="og:type" content="${metadata.type}" />`,
          `    <meta property="og:url" content="${canonicalUrl}" />`,
          '    <meta property="og:site_name" content="Dr. Felipe de Bulhões | Urologista" />',
          '    <meta property="og:locale" content="pt_BR" />',
          `    <meta property="og:image" content="${image}" />`,
          '    <meta property="og:image:width" content="1200" />',
          '    <meta property="og:image:height" content="630" />',
          `    <meta property="og:image:type" content="${imageType}" />`,
          `    <meta property="og:image:alt" content="${imageAlt}" />`,
          '    <meta name="twitter:card" content="summary_large_image" />',
          `    <meta name="twitter:title" content="${title}" />`,
          `    <meta name="twitter:description" content="${description}" />`,
          `    <meta name="twitter:image" content="${image}" />`,
          `    <meta name="twitter:image:alt" content="${imageAlt}" />`,
        ].join("\n");
      })()
    : [
        `    <title>${
          getSpaResponseStatus(requestPath) === 404
            ? "Página não encontrada | Dr. Felipe de Bulhões"
            : escapeHtmlAttribute(getPageMetadata(requestPath).title)
        }</title>`,
        '    <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />',
      ].join("\n");

  return withoutExistingTags
    .replace(/<title>[^<]*<\/title>\s*/i, "")
    .replace(/\s*<\/head>/i, `\n${tags}\n  </head>`);
}
