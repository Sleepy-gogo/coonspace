import "server-only";

import { eq } from 'drizzle-orm';
import { db } from '~/server/db';
import type { SelectNote } from '~/server/db/schema';
import { notes } from '~/server/db/schema';

export async function updateNoteMetadata(
  id: SelectNote['id'],
  data: Pick<SelectNote, 'title' | 'slug'>) {
  await db.update(notes).set(data).where(eq(notes.id, id));
}

export async function updateNoteContent(
  id: SelectNote['id'],
  data: Pick<SelectNote, 'id' | 'content'>) {
  await db.update(notes).set(data).where(eq(notes.id, id));
}
