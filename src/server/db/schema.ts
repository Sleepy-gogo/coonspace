// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";
import { init } from '@paralleldrive/cuid2';

const createId = init({
  length: 48
});

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `coonspace_${name}`);

export const notes = createTable(
  "note",
  {
    id: text("id", { length: 48 }).primaryKey().unique().notNull().$defaultFn(() => createId()),
    title: text("title", { length: 256 }).notNull(),
    content: text("content", { length: 256 }).notNull(),
    slug: text("slug", { length: 256 }).notNull().unique(),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int("updated_at", { mode: "timestamp" }).default(sql`(unixepoch())`).$onUpdate(
      () => new Date()
    ).notNull(),
    userId: text("user_id", { length: 32 }).notNull(),
  }
);

export type InsertNote = typeof notes.$inferInsert;

export type SelectNote = typeof notes.$inferSelect;