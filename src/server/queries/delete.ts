import "server-only";

import { eq } from 'drizzle-orm';
import { db } from '~/server/db';
import type { SelectUser, SelectNote } from '~/server/db/schema';
import { users, notes } from '~/server/db/schema';

export async function deleteUser(id: SelectUser['id']) {
  return db.delete(users).where(eq(users.id, id));
}

export async function deleteNote(id: SelectNote['id']) {
  return db.delete(notes).where(eq(notes.id, id));
}