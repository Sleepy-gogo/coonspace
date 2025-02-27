"use server";

import { eq } from 'drizzle-orm';
import { db } from '~/server/db';
import type { SelectNote, SelectReport } from '~/server/db/schema';
import { notes, reports } from '~/server/db/schema';
import { utapi } from '~/server/uploadthing';

export async function deleteNote(utId: SelectNote['utId']) {
  const note = await db.select().from(notes).where(eq(notes.utId, utId)).get();

  if (!note) {
    throw new Error(`Note with utId ${utId} not found`);
  }

  await db.update(reports).set({ noteId: null, status: "resolved" }).where(eq(reports.noteId, note.id));
  await utapi.deleteFiles(utId);

  return db.delete(notes).where(eq(notes.utId, utId));
}

export async function deleteReport(id: SelectReport['id']) {
  return db.delete(reports).where(eq(reports.id, id));
}