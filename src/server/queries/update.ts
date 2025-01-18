import "server-only";

import { eq } from 'drizzle-orm';
import { db } from '~/server/db';
import type { SelectNote, SelectUser } from '~/server/db/schema';
import { users, notes } from '~/server/db/schema';

export async function updateNote(
  id: SelectNote['id'],
  data: Partial<Omit<SelectNote, 'id'>>) {
  await db.update(notes).set(data).where(eq(notes.id, id));
}

export async function updateUser(
  id: SelectUser['id'],
  data: Partial<Omit<SelectUser, 'id'>>) {
  await db.update(users).set(data).where(eq(users.id, id));
}

