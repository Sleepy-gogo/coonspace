"use server";

import { eq } from 'drizzle-orm';
import { db } from './db';
import { notes } from '~/server/db/schema';
import { utapi } from './uploadthing';

export async function deleteUser(userId: string) {
  const notesFromUser = await db.select().from(notes).where(eq(notes.userId, userId));

  if (notesFromUser.length === 0) return {
    success: true,
    message: 'No notes found for this user.',
    status: 200
  };

  const noteIds = notesFromUser.map(note => note.utId);

  await utapi.deleteFiles(noteIds);
  await db.delete(notes).where(eq(notes.userId, userId));

  return {
    success: true,
    message: 'User notes deleted successfully.',
    status: 200
  };
}