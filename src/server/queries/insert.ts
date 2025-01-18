import "server-only";

import { db } from '~/server/db';
import type { InsertUser, InsertNote } from '~/server/db/schema';
import { users, notes } from '~/server/db/schema';

export async function createUser(data: InsertUser) {
  return db.insert(users).values(data);
}

export async function createNote(data: InsertNote) {
  return db.insert(notes).values(data);
}