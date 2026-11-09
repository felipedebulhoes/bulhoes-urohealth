import { Writable } from "node:stream";
import { prerenderToNodeStream } from "react-dom/static";
import { Router } from "wouter";
import { BLOG_SLUGS, PUBLIC_STATIC_PATHS } from "@shared/siteRoutes";
import App from "./App";
import { startJsonLdCollection } from "./lib/prerenderCollector";

export const prerenderPaths: string[] = [
  ...PUBLIC_STATIC_PATHS,
  ...BLOG_SLUGS.map(slug => `/blog/${slug}`),
];

function readStream(stream: NodeJS.ReadableStream): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    const sink = new Writable({
      write(chunk, _encoding, done) {
        chunks.push(Buffer.from(chunk));
        done();
      },
    });
    sink.on("finish", () => resolve(Buffer.concat(chunks).toString("utf8")));
    sink.on("error", reject);
    stream.on("error", reject);
    stream.pipe(sink);
  });
}

export async function renderRoute(path: string) {
  const jsonLd = startJsonLdCollection();
  const errors: string[] = [];
  const { prelude } = await prerenderToNodeStream(
    <Router ssrPath={path}>
      <App />
    </Router>,
    {
      // Sem esse limite, o React separa blocos grandes em fallback + script inline.
      progressiveChunkSize: Number.MAX_SAFE_INTEGER,
      onError: error => void errors.push(error instanceof Error ? error.stack ?? error.message : String(error)),
    }
  );
  const html = await readStream(prelude);
  return { html, jsonLd: Array.from(jsonLd, ([id, json]) => ({ id, json })), errors };
}
