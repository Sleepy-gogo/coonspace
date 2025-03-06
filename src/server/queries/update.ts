import "server-only";

import { eq } from 'drizzle-orm';
import { db } from '~/server/db';
import type { SelectNote, SelectReport } from '~/server/db/schema';
import { notes, reports } from '~/server/db/schema';
import { revalidatePath } from 'next/cache';

export async function updateNoteMetadata(
  id: SelectNote['id'],
  data: Pick<SelectNote, 'title' | 'slug'>) {
  await db.update(notes).set(data).where(eq(notes.id, id));
}

export async function updateNoteContent(
  id: SelectNote['id'],
  data: Pick<SelectNote, 'utId' | 'content'>) {
  await db.update(notes).set(data).where(eq(notes.id, id));
}

export async function updateReportStatus(
  id: SelectReport['id'],
  data: Pick<SelectReport, 'status'>) {
  await db.update(reports).set(data).where(eq(reports.id, id));
  revalidatePath("/admin");
}