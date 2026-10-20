#!/usr/bin/env node

import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDirectory, "../..");
const manifestPath = resolve(projectRoot, "docs/migration/manus-assets.manifest.json");
const sourceDirectories = ["client", "server", "shared"];
const sourceExtensions = new Set([".css", ".html", ".ts", ".tsx"]);
const excludedRelativeDirectories = new Set([
  "client/public/__manus__",
  "node_modules",
  "dist",
  ".git",
]);
const publicStoragePattern = /(?:https?:\/\/[^/\s"']+)?\/manus-storage\/([A-Za-z0-9._-]+)/g;

function isExcluded(path) {
  const normalized = relative(projectRoot, path).replaceAll("\\", "/");
  return [...excludedRelativeDirectories].some(
    excluded => normalized === excluded || normalized.startsWith(`${excluded}/`)
  );
}

function collectSourceFiles(path) {
  if (isExcluded(path)) return [];

  const stats = statSync(path);
  if (!stats.isDirectory()) {
    return sourceExtensions.has(extname(path)) ? [path] : [];
  }

  return readdirSync(path, { withFileTypes: true }).flatMap(entry =>
    collectSourceFiles(resolve(path, entry.name))
  );
}

function getMediaKind(key) {
  const extension = extname(key).toLowerCase();
  if ([".avif", ".gif", ".ico", ".jpeg", ".jpg", ".png", ".svg", ".webp"].includes(extension)) {
    return "image";
  }
  if ([".mp4", ".mov", ".webm"].includes(extension)) return "video";
  if ([".mp3", ".ogg", ".wav"].includes(extension)) return "audio";
  if ([".pdf"].includes(extension)) return "document";
  if ([".otf", ".ttf", ".woff", ".woff2"].includes(extension)) return "font";
  return "other";
}

function findReferences(sourceFile) {
  const source = readFileSync(sourceFile, "utf8");
  const references = [];
  for (const match of source.matchAll(publicStoragePattern)) {
    const key = match[1];
    if (!key) continue;
    references.push(key);
  }
  return references;
}

const assets = new Map();
for (const directory of sourceDirectories) {
  const absoluteDirectory = resolve(projectRoot, directory);
  if (!existsSync(absoluteDirectory)) continue;

  for (const sourceFile of collectSourceFiles(absoluteDirectory)) {
    const sourcePath = relative(projectRoot, sourceFile).replaceAll("\\", "/");
    for (const key of findReferences(sourceFile)) {
      const asset = assets.get(key) ?? {
        key,
        kind: getMediaKind(key),
        sources: new Set(),
        plannedCloudStorageObject: `site-assets/${key}`,
      };
      asset.sources.add(sourcePath);
      assets.set(key, asset);
    }
  }
}

const manifest = {
  version: 1,
  source: "/manus-storage/",
  migrationTarget: "Cloud Storage private asset bucket served by Cloud Run",
  exclusions: ["client/public/__manus__", "node_modules", "dist", ".git"],
  assets: [...assets.values()]
    .map(asset => ({
      key: asset.key,
      kind: asset.kind,
      plannedCloudStorageObject: asset.plannedCloudStorageObject,
      sources: [...asset.sources].sort(),
    }))
    .sort((left, right) => left.key.localeCompare(right.key)),
};

mkdirSync(dirname(manifestPath), { recursive: true });
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Inventariados ${manifest.assets.length} assets públicos em ${relative(projectRoot, manifestPath)}.`);
