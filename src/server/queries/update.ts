import "server-only";

import { eq } from 'drizzle-orm';
import { db } from '~/server/db';
import type { SelectNote, SelectReport } from '~/server/db/schema';
import { notes, reports } from '~/server/db/schema';
import { revalidatePath, revalidateTag } from 'next/cache';
import { CACHE_TAGS } from '~/lib/note-cache';

export async function updateNoteMetadata(
  id: SelectNote['id'],
  data: Pick<SelectNote, 'title' | 'slug'>,
  oldSlug: string
) {
  await db.update(notes).set(data).where(eq(notes.id, id));

  // Invalidate both old and new slug caches
  revalidateTag(CACHE_TAGS.note(oldSlug));
  revalidateTag(CACHE_TAGS.note(data.slug));
}

export async function updateNoteContent(
  id: SelectNote['id'],
  data: Pick<SelectNote, 'utId' | 'content'>
) {
  await db.update(notes).set(data).where(eq(notes.id, id));

  // Invalidate content and rendered HTML caches
  revalidateTag(CACHE_TAGS.noteContent(id));
  revalidateTag(CACHE_TAGS.noteHtml(id));
}

export async function updateReportStatus(
  id: SelectReport['id'],
  data: Pick<SelectReport, 'status'>) {
  await db.update(reports).set(data).where(eq(reports.id, id));
  revalidatePath("/admin");
}