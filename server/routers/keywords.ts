import { z } from "zod";
import { adminProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { keywordSnapshots, trackedKeywords, articleFavorites, articleDrafts } from "../../drizzle/schema";
import { eq, desc, and, asc } from "drizzle-orm";
import { invokeLLM } from "../_core/llm";
import { callDataApi } from "../_core/dataApi";
import { TRPCError } from "@trpc/server";

async function requireDb() {
  const db = await getDb();
  if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
  return db;
}

/**
 * Keywords router — Admin-only panel for SEO keyword tracking.
 * Uses SimilarWeb Keywords Overview API for data collection.
 */
export const keywordsRouter = router({
  /** List all tracked keywords */
  listTracked: adminProcedure.query(async () => {
    const db = await requireDb();
    return db.select().from(trackedKeywords).orderBy(trackedKeywords.category, trackedKeywords.keyword);
  }),

  /** Add a keyword to track */
  addKeyword: adminProcedure
    .input(z.object({
      keyword: z.string().min(2).max(512),
      category: z.enum(["urologia", "robotica", "andrologia"]),
    }))
    .mutation(async ({ input }) => {
      const db = await requireDb();
      const [result] = await db.insert(trackedKeywords).values({
        keyword: input.keyword,
        category: input.category,
      });
      return { id: (result as any).insertId };
    }),

  /** Remove a keyword from tracking */
  removeKeyword: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await requireDb();
      await db.delete(trackedKeywords).where(eq(trackedKeywords.id, input.id));
      return { success: true };
    }),

  /** Toggle keyword active status */
  toggleKeyword: adminProcedure
    .input(z.object({ id: z.number(), active: z.enum(["yes", "no"]) }))
    .mutation(async ({ input }) => {
      const db = await requireDb();
      await db.update(trackedKeywords)
        .set({ active: input.active })
        .where(eq(trackedKeywords.id, input.id));
      return { success: true };
    }),

  /** Get latest snapshots for dashboard */
  getSnapshots: adminProcedure
    .input(z.object({
      category: z.enum(["urologia", "robotica", "andrologia", "all"]).optional().default("all"),
      limit: z.number().min(1).max(500).optional().default(100),
    }))
    .query(async ({ input }) => {
      const db = await requireDb();
      const conditions = [];
      if (input.category !== "all") {
        conditions.push(eq(keywordSnapshots.category, input.category));
      }

      const snapshots = await db.select()
        .from(keywordSnapshots)
        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .orderBy(desc(keywordSnapshots.weekDate), keywordSnapshots.keyword)
        .limit(input.limit);

      return snapshots;
    }),

  /** Get trend data for a specific keyword (last 12 weeks) */
  getKeywordTrend: adminProcedure
    .input(z.object({ keyword: z.string() }))
    .query(async ({ input }) => {
      const db = await requireDb();
      const snapshots = await db.select()
        .from(keywordSnapshots)
        .where(eq(keywordSnapshots.keyword, input.keyword))
        .orderBy(desc(keywordSnapshots.weekDate))
        .limit(12);

      return snapshots.reverse(); // chronological order
    }),

  /** Manually trigger a keyword data refresh (for testing) */
  refreshData: adminProcedure.mutation(async () => {
    const db = await requireDb();
    const keywords = await db.select()
      .from(trackedKeywords)
      .where(eq(trackedKeywords.active, "yes"));

    if (keywords.length === 0) {
      return { success: false, message: "Nenhuma keyword ativa para rastrear", results: [] as any[], refreshedAt: new Date().toISOString() };
    }

    const now = new Date();
    // Get Monday of current week
    const monday = new Date(now);
    monday.setDate(now.getDate() - now.getDay() + 1);
    monday.setHours(0, 0, 0, 0);

    const results: { keyword: string; success: boolean; error?: string }[] = [];

    for (const kw of keywords) {
      try {
        // Call SimilarWeb Keywords Overview API
        const data = await callDataApi("Similarweb/keywords_overview", {
          query: {
            keyword: kw.keyword,
            country: "ww",
            web_source: "Total",
          },
        }) as any;

        // Extract relevant data
        const volume = data?.search_volume || data?.volume || null;
        const difficulty = data?.organic_difficulty || null;
        const cpc = data?.cpc_range?.high_cpc || data?.cpc || null;
        const intent = data?.primary_intent || null;

        // Determine trend by comparing with previous snapshot
        const prevSnapshots = await db.select()
          .from(keywordSnapshots)
          .where(and(
            eq(keywordSnapshots.keyword, kw.keyword),
            eq(keywordSnapshots.source, "similarweb"),
          ))
          .orderBy(desc(keywordSnapshots.weekDate))
          .limit(1);

        const prevSnapshot = prevSnapshots[0];

        let trend: string = "stable";
        let trendChange: string | null = null;
        if (prevSnapshot && prevSnapshot.volume && volume) {
          const change = ((volume - prevSnapshot.volume) / prevSnapshot.volume) * 100;
          trendChange = change.toFixed(1);
          if (change > 5) trend = "up";
          else if (change < -5) trend = "down";
        }

        await db.insert(keywordSnapshots).values({
          keyword: kw.keyword,
          category: kw.category,
          source: "similarweb",
          volume: volume ? Math.round(volume) : null,
          difficulty: difficulty ? Math.round(difficulty) : null,
          cpc: cpc ? String(cpc) : null,
          intent,
          trend,
          trendChange,
          metadata: JSON.stringify(data),
          weekDate: monday,
        });

        results.push({ keyword: kw.keyword, success: true });
      } catch (error: any) {
        results.push({ keyword: kw.keyword, success: false, error: error.message });
      }
    }

    return { success: true, results, refreshedAt: now.toISOString() };
  }),

  /** List all article favorites */
  listFavorites: adminProcedure.query(async () => {
    const db = await requireDb();
    return db.select().from(articleFavorites).orderBy(desc(articleFavorites.createdAt));
  }),

  /** Add an article idea to favorites */
  addFavorite: adminProcedure
    .input(z.object({
      keyword: z.string(),
      category: z.string(),
      title: z.string(),
      volume: z.number().nullable().optional(),
      difficulty: z.number().nullable().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await requireDb();
      const [result] = await db.insert(articleFavorites).values({
        keyword: input.keyword,
        category: input.category,
        title: input.title,
        volume: input.volume ?? null,
        difficulty: input.difficulty ?? null,
      });
      return { id: (result as any).insertId };
    }),

  /** Remove a favorite */
  removeFavorite: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await requireDb();
      await db.delete(articleFavorites).where(eq(articleFavorites.id, input.id));
      return { success: true };
    }),

  /** Update favorite status */
  updateFavoriteStatus: adminProcedure
    .input(z.object({
      id: z.number(),
      status: z.enum(["pending", "in_progress", "published"]),
    }))
    .mutation(async ({ input }) => {
      const db = await requireDb();
      await db.update(articleFavorites)
        .set({ status: input.status })
        .where(eq(articleFavorites.id, input.id));
      return { success: true };
    }),

  /** Generate article draft using LLM */
  createDraft: adminProcedure
    .input(z.object({
      keyword: z.string(),
      category: z.string(),
      title: z.string(),
      favoriteId: z.number().nullable().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await requireDb();

      // Generate article structure using LLM
      const response = await invokeLLM({
        messages: [
          {
            role: "system",
            content: `Você é um redator especializado em conteúdo médico para SEO. Gere a estrutura completa de um artigo de blog para um urologista (Dr. Felipe de Bulhões). O artigo deve ser informativo, baseado em evidências, e otimizado para a keyword fornecida. Escreva em Português do Brasil. Formato: Markdown com H2, H3, parágrafos, e sugestões de CTA. Inclua: introdução engajante, 4-6 seções principais, FAQ com 3-5 perguntas, e conclusão com CTA para agendamento. O tom deve ser profissional mas acessível ao paciente leigo.`,
          },
          {
            role: "user",
            content: `Gere a estrutura completa do artigo:\n\nTítulo: ${input.title}\nKeyword principal: ${input.keyword}\nCategoria: ${input.category}\n\nInclua conteúdo real (não apenas placeholders), com informações médicas precisas e atualizadas.`,
          },
        ],
      });

      const rawContent = response.choices?.[0]?.message?.content;
      const content = typeof rawContent === "string" ? rawContent : "Erro ao gerar conteúdo";

      const [result] = await db.insert(articleDrafts).values({
        keyword: input.keyword,
        category: input.category,
        title: input.title,
        content,
        favoriteId: input.favoriteId ?? null,
      });

      // Update favorite status if linked
      if (input.favoriteId) {
        await db.update(articleFavorites)
          .set({ status: "in_progress" })
          .where(eq(articleFavorites.id, input.favoriteId));
      }

      return { id: (result as any).insertId, content };
    }),

  /** List all article drafts */
  listDrafts: adminProcedure.query(async () => {
    const db = await requireDb();
    return db.select().from(articleDrafts).orderBy(desc(articleDrafts.createdAt));
  }),

  /** Delete a draft */
  removeDraft: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await requireDb();
      await db.delete(articleDrafts).where(eq(articleDrafts.id, input.id));
      return { success: true };
    }),

  /** Seed default keywords for tracking */
  seedDefaults: adminProcedure.mutation(async () => {
    const db = await requireDb();
    const defaults = [
      // Urologia
      { keyword: "urologista são paulo", category: "urologia" as const },
      { keyword: "urologista pinheiros", category: "urologia" as const },
      { keyword: "urologista moema", category: "urologia" as const },
      { keyword: "urologista campinas", category: "urologia" as const },
      { keyword: "consulta urologia", category: "urologia" as const },
      { keyword: "cancer de prostata tratamento", category: "urologia" as const },
      { keyword: "hiperplasia prostatica benigna", category: "urologia" as const },
      { keyword: "pedra nos rins tratamento", category: "urologia" as const },
      { keyword: "infecção urinária masculina", category: "urologia" as const },
      { keyword: "exame de prostata", category: "urologia" as const },
      // Robótica
      { keyword: "cirurgia robótica urologia", category: "robotica" as const },
      { keyword: "prostatectomia robótica", category: "robotica" as const },
      { keyword: "cirurgia robótica próstata", category: "robotica" as const },
      { keyword: "cirurgia robótica são paulo", category: "robotica" as const },
      { keyword: "nefrectomia robótica", category: "robotica" as const },
      // Andrologia
      { keyword: "vasectomia preço", category: "andrologia" as const },
      { keyword: "disfunção erétil tratamento", category: "andrologia" as const },
      { keyword: "infertilidade masculina", category: "andrologia" as const },
      { keyword: "varicocele cirurgia", category: "andrologia" as const },
      { keyword: "reposição hormonal masculina", category: "andrologia" as const },
      { keyword: "prótese peniana", category: "andrologia" as const },
      { keyword: "ejaculação precoce tratamento", category: "andrologia" as const },
    ];

    let added = 0;
    for (const kw of defaults) {
      // Check if already exists
      const existing = await db.select()
        .from(trackedKeywords)
        .where(eq(trackedKeywords.keyword, kw.keyword))
        .limit(1);

      if (existing.length === 0) {
        await db.insert(trackedKeywords).values(kw);
        added++;
      }
    }

    return { success: true, added, total: defaults.length };
  }),
});
