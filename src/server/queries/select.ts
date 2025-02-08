import "server-only";

import { asc, eq, and, like } from 'drizzle-orm';
import { db } from '~/server/db';
import type { SelectUser, SelectNote } from '~/server/db/schema';
import { users, notes } from '~/server/db/schema';
import { auth } from '@clerk/nextjs/server';

export async function getUserById(id: SelectUser['id']): Promise<Array<{
  id: string,
  fullName: string,
  username: string,
  imageUrl: string;
}>> {
  return db.select().from(users).where(eq(users.id, id));
}

export async function getUserByUsername(username: SelectUser['username']): Promise<Array<{
  id: string,
  fullName: string,
  username: string,
  imageUrl: string;
}>> {
  return db.select().from(users).where(eq(users.username, username));
}

export async function getPersonalNotes(
  page = 1,
  pageSize = 10
): Promise<Array<{
  id: string;
  title: string;
  content: string;
  slug: string;
  updatedAt: Date;
}>> {
  const user = await auth();

  if (!user.userId) {
    throw new Error('Unauthorized');
  }

  const userId = user.userId;

  const offset = (page - 1) * pageSize;
  return db.select().from(notes).where(eq(notes.userId, userId)).orderBy(asc(notes.updatedAt)).limit(pageSize).offset(offset);
}

export async function getNoteById(id: SelectNote['id']): Promise<Array<{
  title: string;
  content: string;
  slug: string;
  updatedAt: Date;
  userId: string;
}>> {
  return db.select().from(notes).where(eq(notes.id, id));
}

export async function getMatchingNotes(
  query: string,
  page = 1,
  pageSize = 10
): Promise<Array<{
  id: string;
  title: string;
  slug: string;
  updatedAt: Date;
}>> {
  const user = await auth();

  if (!user.userId) {
    throw new Error('Unauthorized');
  }

  const userId = user.userId;

  const offset = (page - 1) * pageSize;
  return db.select().from(notes).where(and(eq(notes.userId, userId), like(notes.title, `%${query}%`))).orderBy(asc(notes.updatedAt)).limit(pageSize).offset(offset);
}

export async function slugExists(slug: string): Promise<boolean> {
  const note = await db.query.notes.findFirst({ where: eq(notes.slug, slug) })

  if (note?.id) {
    return true;
  }
  return false;
}