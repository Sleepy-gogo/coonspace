import "server-only";

import { eq } from 'drizzle-orm';
import { db } from '~/server/db';
import type { SelectNote } from '~/server/db/schema';
import { notes } from '~/server/db/schema';
import { utapi } from '~/server/uploadthing';

export async function deleteNote(id: SelectNote['id']) {
  await utapi.deleteFiles(id);
  return db.delete(notes).where(eq(notes.id, id));
}