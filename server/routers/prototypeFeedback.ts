import { z } from "zod";
import { publicProcedure, rateLimit, router } from "../_core/trpc";
import { incrementFaqHelpfulCount, listFaqHelpfulCounts } from "../db";

const popularFaqQuestionId = z.enum(["faq_duration", "faq_risks", "faq_candidate"]);

export const prototypeFeedbackRouter = router({
  listHelpfulCounts: publicProcedure.query(async () => {
    const counts = await listFaqHelpfulCounts();
    return {
      faq_duration: counts.faq_duration ?? 0,
      faq_risks: counts.faq_risks ?? 0,
      faq_candidate: counts.faq_candidate ?? 0,
    };
  }),

  markHelpful: publicProcedure
    .use(rateLimit({ windowMs: 60 * 60 * 1000, max: 12 }))
    .input(z.object({ questionId: popularFaqQuestionId }))
    .mutation(async ({ input }) => ({
      success: true as const,
      questionId: input.questionId,
      helpfulCount: await incrementFaqHelpfulCount(input.questionId),
    })),
});
