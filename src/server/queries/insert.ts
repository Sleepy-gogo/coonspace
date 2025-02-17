import "server-only";

import { db } from '~/server/db';
import type { InsertNote } from '~/server/db/schema';
import { notes } from '~/server/db/schema';


export async function createNote(data: InsertNote) {
  return db.insert(notes).values(data);
}