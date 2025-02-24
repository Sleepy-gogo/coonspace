import "server-only";

import { eq } from 'drizzle-orm';
import { db } from '~/server/db';
import type { SelectNote, SelectReport } from '~/server/db/schema';
import { notes, reports } from '~/server/db/schema';
import { utapi } from '~/server/uploadthing';

export async function deleteNote(id: SelectNote['id']) {
  await utapi.deleteFiles(id);
  return db.delete(notes).where(eq(notes.id, id));
}

export async function deleteReport(id: SelectReport['id']) {
  return db.delete(reports).where(eq(reports.id, id));
}