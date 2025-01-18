// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `coonspace_${name}`);

export const users = createTable(
  "user",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    username: text("username", { length: 256 }).unique().notNull(),
    imageUrl: text("image_url", { length: 256 }).notNull(),
  }
);

export const notes = createTable(
  "note",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    title: text("title", { length: 256 }).notNull(),
    content: text("content", { length: 256 }).notNull(),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
      () => new Date()
    ),
    userId: int("user_id", { mode: "number" }).notNull().references(() => users.id),
  }
);

export type InsertUser = typeof users.$inferInsert;
export type InsertNote = typeof notes.$inferInsert;

export type SelectUser = typeof users.$inferSelect;
export type SelectNote = typeof notes.$inferSelect;