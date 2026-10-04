# Spec 04: Proxy de Armazenamento & Gestão de Assets

> **Status:** Aprovado  
> **Versão:** 1.0  
> **Arquivo Central:** `server/_core/storageProxy.ts`

---

## 1. Visão Geral da Arquitetura

O sistema de mídia da plataforma adota um proxy inteligente projetado para garantir que fotos, logotipos, fontes e mídias estáticas carreguem instantaneamente tanto no ambiente de desenvolvimento local quanto em servidores de produção:

```
[Cliente HTTP: GET /manus-storage/:filename]
                     │
                     ▼
       ┌───────────────────────────┐
       │ Express storageProxy.ts   │
       └─────────────┬─────────────┘
                     │
         [1. Existe no Disco Local?]
         (client/public/manus-storage/:filename)
                     │
          ┌──────────┴──────────┐
          │ SIM                 │ NÃO
          ▼                     ▼
┌──────────────────┐    [2. Ambiente de Execução?]
│ Serve via        │    ├─► LOCAL / SEM CHAVE FORGE:
│ res.sendFile()   │    │   1. Fetch em https://felipebulhoes.com/manus-storage/:filename
│ (200 OK Rápido)  │    │   2. Grava em disco local (client/public/manus-storage/)
└──────────────────┘    │   3. Encaminha stream ao cliente com status 200 OK
                        │
                        └─► PRODUÇÃO / COM CHAVE FORGE:
                            1. Consulta bucket S3 via API Forge
                            2. Encaminha stream ao cliente
```

---

## 2. Cabeçalhos HTTP de Cache

Para garantir pontuações máximas em Core Web Vitals (LCP) e reduzir tráfego de rede desnecessário:

- **Assets com hash ou estáticos:**
  ```http
  Cache-Control: public, max-age=31536000, immutable
  ```
- **Resolução de MIME-Type Automática:**
  - `.webp` -> `image/webp`
  - `.svg` -> `image/svg+xml`
  - `.ttf` -> `font/ttf`
  - `.png` -> `image/png`
  - `.jpg` / `.jpeg` -> `image/jpeg`

---

## 3. Diretório de Persistência Local

Todos os arquivos baixados ou sincronizados residem no diretório:
`client/public/manus-storage/`

### Vantagens do Diretório `client/public/manus-storage/`:
1. **Resolução Nativa pelo Vite:** Durante o desenvolvimento no navegador, requisições estáticas a `/manus-storage/xyz.ext` podem ser servidas pelo servidor estático do Vite ou pelo proxy Express na porta 3000.
2. **Build de Produção:** Ao executar `npm run build`, o Vite copia automaticamente os arquivos de `public/` para a pasta de distribuição `dist/public/`, garantindo portabilidade para qualquer provedor de hospedagem (Vercel, Cloudflare Pages, Docker, VPS).

---

## 4. Auditoria de Integridade de Assets

Um asset é considerado íntegro quando:
1. Retorna código de status HTTP `200 OK`.
2. O cabeçalho `Content-Length` é superior a 0 bytes.
3. Não há redirecionamentos circulares ou fallbacks em texto plano de erro 404/500 embutidos no corpo da imagem.
