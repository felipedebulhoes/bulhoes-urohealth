import { createHash } from "node:crypto";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getSocialPreviewData } from "../../shared/pageMetadata";
import { normalizeSitePath } from "../../shared/siteRoutes";
import {
  createSocialMetadataHistorySnapshot,
  listSocialMetadataHistory,
} from "../db";
import { adminProcedure, router } from "../_core/trpc";
import { auditSocialImage } from "../socialImageAudit";

const pathInput = z.object({ path: z.string().min(1).max(512) });

export function buildSocialMetadataSnapshot(inputPath: string, actorUserId: number) {
  const preview = getSocialPreviewData(inputPath);
  if (!preview) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Selecione uma URL pública indexável para consultar o histórico.",
    });
  }

  const payload = JSON.stringify({
    title: preview.metadata.title,
    description: preview.metadata.description,
    image: preview.metadata.image,
    imageAlt: preview.metadata.imageAlt,
    type: preview.metadata.type,
  });

  return {
    path: normalizeSitePath(preview.pathname),
    title: preview.metadata.title,
    description: preview.metadata.description,
    image: preview.metadata.image,
    imageAlt: preview.metadata.imageAlt,
    type: preview.metadata.type,
    contentHash: createHash("sha256").update(payload).digest("hex"),
    createdByUserId: actorUserId,
  };
}

export const socialPreviewRouter = router({
  history: adminProcedure.input(pathInput).query(async ({ input, ctx }) => {
    const snapshot = buildSocialMetadataSnapshot(input.path, ctx.user.id);
    await createSocialMetadataHistorySnapshot(snapshot);
    return listSocialMetadataHistory(snapshot.path, 10);
  }),

  imageAudit: adminProcedure.input(pathInput).query(async ({ input }) => {
    const preview = getSocialPreviewData(input.path);
    if (!preview) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Selecione uma URL pública indexável para verificar a imagem.",
      });
    }

    // The URL comes exclusively from the server-side public metadata catalog;
    // it is never accepted from the browser, preventing arbitrary URL fetches.
    return auditSocialImage(preview.metadata.image);
  }),
});
