import "server-only";

import { eq, and, like, desc } from 'drizzle-orm';
import { db } from '~/server/db';
import type { SelectNote } from '~/server/db/schema';
import { notes } from '~/server/db/schema';
import { auth } from '@clerk/nextjs/server';

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
  return db.select().from(notes).where(eq(notes.userId, userId)).orderBy(desc(notes.updatedAt)).limit(pageSize).offset(offset);
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

export async function getNoteBySlug(slug: SelectNote['slug']): Promise<Array<{
  id: string;
  title: string;
  content: string;
  slug: string;
  updatedAt: Date;
  userId: string;
}>> {
  return db.select().from(notes).where(eq(notes.slug, slug));
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
  return db.select().from(notes).where(and(eq(notes.userId, userId), like(notes.title, `%${query}%`))).orderBy(desc(notes.updatedAt)).limit(pageSize).offset(offset);
}

export async function slugExists(slug: string): Promise<boolean> {
  const note = await db.query.notes.findFirst({ where: eq(notes.slug, slug) });

  if (note?.id) {
    return true;
  }
  return false;
}