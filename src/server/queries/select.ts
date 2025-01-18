import "server-only";

import { asc, eq } from 'drizzle-orm';
import { db } from '~/server/db';
import type { SelectUser, SelectNote } from '~/server/db/schema';
import { users, notes } from '~/server/db/schema';
import { auth } from '@clerk/nextjs/server';

export async function getUserById(id: SelectUser['id']): Promise<Array<{
  username: string,
  imageUrl: string;
}>> {
  return db.select().from(users).where(eq(users.id, id));
}

export async function getPersonalNotes(
  page = 1,
  pageSize = 10
): Promise<Array<{
  id: number,
  title: string,
  content: string;
}>> {
  const user = await auth();

  if (!user.userId) {
    throw new Error('Unauthorized');
  }

  const userId = Number(user.userId);

  const offset = (page - 1) * pageSize;
  return db.select().from(notes).where(eq(notes.userId, userId)).orderBy(asc(notes.updatedAt)).limit(pageSize).offset(offset);
}

export async function getNoteById(id: SelectNote['id']): Promise<Array<{
  title: string,
  content: string;
}>> {
  return db.select().from(notes).where(eq(notes.id, id));
}

export async function getMatchingNotes(
  query: string,
  page = 1,
  pageSize = 10
): Promise<Array<{
  id: number,
  title: string,
  content: string;
}>> {
  const user = await auth();

  if (!user.userId) {
    throw new Error('Unauthorized');
  }

  const userId = Number(user.userId);

  const offset = (page - 1) * pageSize;
  return db.select().from(notes).where(eq(notes.userId, userId)).orderBy(asc(notes.updatedAt)).limit(pageSize).offset(offset);
}