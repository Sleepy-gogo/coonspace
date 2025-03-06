import "server-only";

import { eq, and, like, desc, count } from 'drizzle-orm';
import { db } from '~/server/db';
import type { SelectNote, SelectReport } from '~/server/db/schema';
import { notes, reports } from '~/server/db/schema';
import { auth } from '@clerk/nextjs/server';
import type { Report } from '~/types/report';

export async function getNoteById(id: SelectNote['id']): Promise<Array<{
  title: string;
  utId: string;
  content: string;
  slug: string;
  updatedAt: Date;
  userId: string;
}>> {
  return db.select().from(notes).where(eq(notes.id, id));
}

export async function getNoteBySlug(slug: SelectNote['slug']): Promise<Array<{
  id: string;
  utId: string;
  title: string;
  content: string;
  slug: string;
  updatedAt: Date;
  userId: string;
}>> {
  return db.select().from(notes).where(eq(notes.slug, slug));
}

/**
 * Retrieves notes that match a search query for the authenticated user
 * 
 * @param query - The search string to match against note titles
 * @param page - The page number for pagination (defaults to 1)
 * @param pageSize - Number of notes per page (defaults to 10)
 * @returns Object containing total pages and an array of matching notes with selected fields
 * @throws Error if user is not authenticated
 */
export async function getMatchingNotes(
  query: string,
  page = 1,
  pageSize = 10
): Promise<{
  totalPages: number;
  notes: Array<{
    id: string;
    utId: string;
    title: string;
    slug: string;
    updatedAt: Date;
  }>;
}> {
  const user = await auth();

  if (!user.userId) {
    throw new Error('Unauthorized');
  }

  const userId = user.userId;

  const offset = (page - 1) * pageSize;
  const countResult = await db.select({ count: count() })
    .from(notes)
    .where(and(
      eq(notes.userId, userId),
      like(notes.title, `%${query}%`)
    ));

  const totalCount = countResult[0]?.count ?? 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  const data = await db.select({
    id: notes.id,
    utId: notes.utId,
    title: notes.title,
    slug: notes.slug,
    updatedAt: notes.updatedAt
  })
    .from(notes)
    .where(and(
      eq(notes.userId, userId),
      like(notes.title, `%${query}%`)
    ))
    .orderBy(desc(notes.updatedAt))
    .limit(pageSize)
    .offset(offset);

  return {
    totalPages,
    notes: data
  };
}

export async function slugExists(slug: string): Promise<boolean> {
  const note = await db.query.notes.findFirst({ where: eq(notes.slug, slug) });

  if (note?.id) {
    return true;
  }
  return false;
}

export async function getReports(
  page = 1,
  pageSize = 10
): Promise<Array<Report>> {
  const user = await auth();

  if (!user.userId) {
    throw new Error('Unauthorized');
  }

  const userId = user.userId;

  const offset = (page - 1) * pageSize;
  return db
    .select()
    .from(reports)
    .where(eq(reports.userId, userId))
    .orderBy(desc(reports.updatedAt))
    .limit(pageSize)
    .offset(offset);
}

export async function getReportById(id: SelectReport['id']): Promise<Array<Report>> {
  return db.select().from(reports).where(eq(reports.id, id));
}

