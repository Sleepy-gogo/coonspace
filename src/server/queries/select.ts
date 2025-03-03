import "server-only";

import { eq, and, like, desc } from 'drizzle-orm';
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

export async function getMatchingNotes(
  query: string,
  page = 1,
  pageSize = 10
): Promise<Array<{
  id: string;
  utId: string;
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

