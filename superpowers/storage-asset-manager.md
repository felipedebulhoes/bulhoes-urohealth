# Superpower: Storage & Asset Manager

> **Especialidade:** Gestão do Proxy Híbrido de Armazenamento, Cache Local Offline, CDN e Mídias Visuais  
> **Escopo:** `server/_core/storageProxy.ts`, diretório `client/public/manus-storage/` e rotas de mídia `/manus-storage/*`.

---

## 1. Arquitetura do Armazenamento de Mídia

O projeto adota uma arquitetura híbrida de armazenamento de alta disponibilidade:

```
[Requisição do Navegador: /manus-storage/arquivo.ext]
                      │
                      ▼
[Express Router: server/_core/storageProxy.ts]
                      │
                      ├─► 1. Arquivo existe em client/public/manus-storage/?
                      │      ├─► SIM: Serve direto do disco local (HTTP 200)
                      │      │
                      │      └─► NÃO: Está em ambiente local sem chaves S3/Forge?
                      │             │
                      │             └─► Faz fetch em https://felipebulhoes.com/manus-storage/
                      │                    │
                      │                    ├─► Salva cópia em client/public/manus-storage/
                      │                    └─► Faz pipe para a resposta HTTP do cliente
                      │
                      └─► 2. Em produção na nuvem:
                             └─► Consulta S3/Forge API com credenciais de ambiente
```

---

## 2. Inventário de Assets Essenciais

Os seguintes arquivos devem estar sempre presentes e acessíveis no diretório local [`client/public/manus-storage/`](file:///c:/Users/drfel/OneDrive/%C3%81rea%20de%20Trabalho/04_Profissional/Site/client/public/manus-storage/):

| Arquivo | Tipo | Descrição |
|---|---|---|
| `logo-landscape-dr-felipe_cc84d4a3.svg` | Vetor SVG | Logo oficial horizontal do Dr. Felipe de Bulhões (marca + nome + especialidade). |
| `felipe-portrait_0e0693e4_be070ac1.webp` | Imagem WebP | Retrato médico oficial de estúdio do Dr. Felipe de Bulhões com estetoscópio. |
| `Callingstone_0c7058f7.ttf` | Fonte TrueType | Tipografia de luxo display para títulos e cabeçalhos. |
| `campinas-day-hospital_d2fdf211.webp` | Imagem WebP | Fachada/interior do Campinas Day Hospital (Cambuí, Campinas). |
| `clinovi-paulista_448e833f.webp` | Imagem WebP | Consultório Clinovi Paulista (Av. Paulista, São Paulo). |
| `clinovi-pinheiros_2e2cb6b3.webp` | Imagem WebP | Consultório Clinovi Pinheiros (Pinheiros, São Paulo). |
| `cemed-campinas_3e98bbd4.webp` | Imagem WebP | Hospital São Luiz / CEMED Rede D'Or (Campinas). |
| `og-home.jpg` / `og-image.jpg` | Imagem 1200x630 | Imagens de visualização social Open Graph para compartilhamento no WhatsApp e LinkedIn. |

---

## 3. Regra Especial para Logos em Fundo Escuro vs Claro

O logo vetorial oficial `logo-landscape-dr-felipe_cc84d4a3.svg` possui traços originais em tons escuros. Para garantir contraste perfeito tanto no Header (fundo escuro `#1C3D5A`) quanto em páginas claras:

1. **No Header e Seções Escuras:**
   Utilize o filtro de brilho e inversão suave:
   ```tsx
   <img
     src="/manus-storage/logo-landscape-dr-felipe_cc84d4a3.svg"
     alt="Dr. Felipe de Bulhões - Urologia e Cirurgia Robótica"
     className="h-10 md:h-12 w-auto brightness-0 invert opacity-95 transition-opacity hover:opacity-100"
   />
   ```
2. **Em Fundo Claro:**
   Pode ser renderizado sem filtros ou com a cor original da marca.

---

## 4. Como Adicionar Novos Assets de Forma Segura

Ao adicionar novas fotos de procedimentos, consultórios ou banners:
1. Converta as imagens para o formato `.webp` com compressão entre 80% e 85% de qualidade para manter a carga leve.
2. Nomeie o arquivo com convenção kebab-case e hash curto opcional: `nome-do-recurso_hash.webp`.
3. Salve o arquivo diretamente em `client/public/manus-storage/`.
4. Faça o teste de requisição HTTP:
   ```bash
   curl -I http://localhost:3000/manus-storage/nome-do-recurso_hash.webp
   ```
   Deve retornar `HTTP/1.1 200 OK` com `Content-Type: image/webp`.

---

## 5. Resolução de Problemas (Troubleshooting)

- **Sintoma:** Logo ou fotos aparecem como ícone quebrado no navegador.
- **Causa 1:** O proxy de armazenamento não encontrou o arquivo local e falhou no fetch remoto.
  - *Ação:* Verifique se o arquivo está na pasta `client/public/manus-storage/`. Se não estiver, faça o download direto via `Invoke-WebRequest -Uri "https://felipebulhoes.com/manus-storage/[arquivo]" -OutFile "client/public/manus-storage/[arquivo]"`.
- **Causa 2:** Cache do navegador persistiu um erro 404 anterior.
  - *Ação:* No navegador, limpe o cache da URL ou abra em janela anônima para recarregar o recurso.
