import "server-only";

import { unstable_cache } from "next/cache";
import { clerkClient } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { notes } from "~/server/db/schema";
import { parseMarkdown } from "~/lib/markdown";

/**
 * Cache tags used for invalidation.
 * Format: note-{slug}, note-content-{noteId}, user-{userId}
 */
export const CACHE_TAGS = {
  note: (slug: string) => `note-${slug}`,
  noteContent: (noteId: string) => `note-content-${noteId}`,
  noteHtml: (noteId: string) => `note-html-${noteId}`,
  user: (userId: string) => `user-${userId}`,
} as const;

// 1 hour revalidation as safety net
const REVALIDATE_SECONDS = 3600;

/**
 * Cached DB lookup for note by slug.
 * Returns the first note matching the slug, or null if not found.
 */
export const getCachedNoteBySlug = (slug: string) =>
  unstable_cache(
    async () => {
      const result = await db
        .select()
        .from(notes)
        .where(eq(notes.slug, slug))
        .limit(1);
      return result[0] ?? null;
    },
    [`note-by-slug-${slug}`],
    {
      tags: [CACHE_TAGS.note(slug)],
      revalidate: REVALIDATE_SECONDS,
    }
  )();

/**
 * Cached fetch of markdown content from UploadThing URL.
 */
export const getCachedMarkdownContent = (url: string, noteId: string) =>
  unstable_cache(
    async () => {
      const response = await fetch(url);
      if (!response.ok) {
        return null;
      }
      return response.text();
    },
    [`markdown-content-${noteId}`],
    {
      tags: [CACHE_TAGS.noteContent(noteId)],
      revalidate: REVALIDATE_SECONDS,
    }
  )();

/**
 * Cached Clerk user lookup.
 * Returns a simplified user object for display.
 */
export const getCachedUserInfo = (userId: string) =>
  unstable_cache(
    async () => {
      const clerk = await clerkClient();
      const user = await clerk.users.getUser(userId);
      return {
        id: userId,
        fullName: user.fullName ?? "Anonymous",
        username: user.username ?? "unknown",
        imageUrl: user.imageUrl,
      };
    },
    [`user-info-${userId}`],
    {
      tags: [CACHE_TAGS.user(userId)],
      revalidate: REVALIDATE_SECONDS,
    }
  )();

/**
 * Cached markdown parsing.
 * Parses markdown to sanitized HTML with syntax highlighting and KaTeX.
 */
export const getCachedRenderedMarkdown = (markdown: string, noteId: string) =>
  unstable_cache(
    async () => {
      return parseMarkdown(markdown);
    },
    [`rendered-html-${noteId}`],
    {
      tags: [CACHE_TAGS.noteHtml(noteId)],
      revalidate: REVALIDATE_SECONDS,
    }
  )();

/**
 * Single function to get all note page data in parallel.
 * This is the primary entry point for the note page.
 */
export async function getCachedNotePageData(slug: string) {
  // First, get the note metadata
  const note = await getCachedNoteBySlug(slug);

  if (!note) {
    return null;
  }

  // Then fetch content and user info in parallel
  const [markdownContent, user] = await Promise.all([
    getCachedMarkdownContent(note.content, note.id),
    getCachedUserInfo(note.userId),
  ]);

  if (!markdownContent) {
    return null;
  }

  // Finally, parse the markdown (also cached)
  const renderedHtml = await getCachedRenderedMarkdown(markdownContent, note.id);

  return {
    note: {
      id: note.id,
      title: note.title,
      slug: note.slug,
      updatedAt: note.updatedAt,
    },
    user,
    renderedHtml,
  };
}
