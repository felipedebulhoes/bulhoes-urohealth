import express from "express";
import { createServer, type Server } from "node:http";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { registerOutboundRedirects, type OutboundClickLog } from "./outboundRedirects";

describe("links curtos de saída", () => {
  let server: Server;
  let baseUrl: string;
  let logs: OutboundClickLog[];

  beforeEach(async () => {
    logs = [];
    const app = express();
    registerOutboundRedirects(app, entry => logs.push(entry));
    server = createServer(app);
    await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("Servidor de teste sem porta");
    baseUrl = `http://127.0.0.1:${address.port}`;
  });

  afterEach(async () => {
    await new Promise<void>((resolve, reject) => server.close(error => (error ? reject(error) : resolve())));
  });

  it("redireciona /instagram ao perfil oficial sem cache e fora do índice", async () => {
    const response = await fetch(`${baseUrl}/instagram`, { redirect: "manual" });

    expect(response.status).toBe(302);
    expect(response.headers.get("location")).toBe("https://www.instagram.com/drfelipebulhoes/");
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("x-robots-tag")).toContain("noindex");
  });

  it("registra a origem do clique a partir dos parâmetros UTM", async () => {
    await fetch(
      `${baseUrl}/instagram?utm_source=taggo&utm_medium=cartao_digital&utm_campaign=cartao_taggo&utm_content=link_instagram`,
      { redirect: "manual" }
    );

    expect(logs).toEqual([
      {
        severity: "INFO",
        message: "outbound_redirect",
        path: "/instagram",
        destination: "https://www.instagram.com/drfelipebulhoes/",
        utm_source: "taggo",
        utm_medium: "cartao_digital",
        utm_campaign: "cartao_taggo",
        utm_content: "link_instagram",
      },
    ]);
  });

  it("descarta valores UTM fora do padrão e não registra dados do visitante", async () => {
    await fetch(`${baseUrl}/instagram?utm_source=%3Cscript%3E&utm_medium=${"a".repeat(80)}`, {
      redirect: "manual",
      headers: { "User-Agent": "teste", "X-Forwarded-For": "203.0.113.7" },
    });

    expect(logs).toHaveLength(1);
    expect(logs[0]).not.toHaveProperty("utm_source");
    expect(logs[0]).not.toHaveProperty("utm_medium");
    expect(JSON.stringify(logs[0])).not.toMatch(/203\.0\.113\.7|teste/);
  });

  it("não aceita destino informado pelo visitante", async () => {
    const response = await fetch(`${baseUrl}/instagram?next=https://exemplo.com`, { redirect: "manual" });

    expect(response.headers.get("location")).toBe("https://www.instagram.com/drfelipebulhoes/");
  });
});
