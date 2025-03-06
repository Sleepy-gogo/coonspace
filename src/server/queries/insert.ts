import { revalidatePath } from 'next/cache';
import "server-only";

import { db } from '~/server/db';
import type { InsertNote, InsertReport } from '~/server/db/schema';
import { notes, reports } from '~/server/db/schema';


export async function createNote(data: InsertNote) {
  return db.insert(notes).values(data);
}

export async function createReport(data: InsertReport) {
  await db.insert(reports).values(data);
  revalidatePath("/admin");
}