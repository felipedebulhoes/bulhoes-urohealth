import { z } from "zod";
import { nanoid } from "nanoid";
import { router } from "../_core/trpc";
import { adminProcedure } from "../_core/trpc";
import { storagePut } from "../storage";
import { insertFile, listFiles, getFileById, deleteFile } from "../db";

export const fileStorageRouter = router({
  /**
   * Upload a file to S3 and save metadata to DB.
   * Expects base64-encoded file data from the client.
   */
  upload: adminProcedure
    .input(
      z.object({
        filename: z.string().min(1),
        mimeType: z.string().min(1),
        base64Data: z.string().min(1),
        description: z.string().optional(),
        category: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const buffer = Buffer.from(input.base64Data, "base64");
      const size = buffer.length;

      // Generate a unique key to prevent enumeration
      const ext = input.filename.includes(".")
        ? input.filename.split(".").pop()
        : "";
      const safeFilename = input.filename
        .replace(/[^a-zA-Z0-9._-]/g, "_")
        .substring(0, 100);
      const fileKey = `uploads/${ctx.user.id}/${nanoid(12)}-${safeFilename}`;

      // Upload to S3
      const { url } = await storagePut(fileKey, buffer, input.mimeType);

      // Save metadata to DB
      const record = await insertFile({
        userId: ctx.user.id,
        filename: input.filename,
        mimeType: input.mimeType,
        size,
        fileKey,
        url,
        description: input.description ?? null,
        category: input.category ?? null,
      });

      return record;
    }),

  /**
   * List all files, optionally filtered by category.
   */
  list: adminProcedure
    .input(
      z
        .object({
          category: z.string().optional(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      return listFiles({ category: input?.category });
    }),

  /**
   * Get a single file by ID.
   */
  getById: adminProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const file = await getFileById(input.id);
      if (!file) {
        throw new Error("File not found");
      }
      return file;
    }),

  /**
   * Delete a file record from DB (S3 object remains for CDN cache).
   */
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const success = await deleteFile(input.id);
      return { success };
    }),
});
