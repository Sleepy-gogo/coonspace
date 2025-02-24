import { z } from "zod";

export const saveNoteSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z
    .string()
    .max(256, "Slug must be between 4 and 256 characters")
    .optional(),
});

export type SaveNoteFormData = z.infer<typeof saveNoteSchema>;