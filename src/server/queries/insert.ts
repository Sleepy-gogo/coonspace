import { revalidatePath, revalidateTag } from 'next/cache';
import "server-only";

import { db } from '~/server/db';
import type { InsertNote, InsertReport } from '~/server/db/schema';
import { notes, reports } from '~/server/db/schema';
import { CACHE_TAGS } from '~/lib/note-cache';


export async function createNote(data: InsertNote) {
  const result = await db.insert(notes).values(data).returning();
  const note = result[0];

  if (note) {
    // Invalidate the new note's cache tag so first visit caches correctly
    revalidateTag(CACHE_TAGS.note(note.slug));
  }

  return result;
}

export async function createReport(data: InsertReport) {
  await db.insert(reports).values(data);
  revalidatePath("/admin");
}