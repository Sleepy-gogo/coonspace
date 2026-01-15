"use server";

import { auth } from '@clerk/nextjs/server';
import { createId } from '@paralleldrive/cuid2';
import { createNote } from './queries/insert';
import slugify from 'slug';

import { utapi } from "~/server/uploadthing";
import { getNoteById, slugExists } from './queries/select';
import { updateNoteContent, updateNoteMetadata } from './queries/update';
import { deleteNote } from './queries/delete';

/**
 * Saves a new markdown document to the storage system
 * 
 * This function:
 * 1. Authenticates the current user
 * 2. Creates a slug from the title or uses the provided slug
 * 3. Uploads the markdown content as a file
 * 4. Creates a new note record in the database
 * 
 * @param markdown - The markdown content to save
 * @param title - The title of the document
 * @param slug - Optional custom slug for the document URL
 * @returns The upload response object or an error object
 */
export async function saveMarkdown(markdown: string, title: string, slug?: string) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized file upload");
    }

    const fileSlug = slug && typeof slug === 'string' ? slugify(slug, { lower: true }) : slugify(title, { lower: true }) + "-" + createId();
    const fileName = `${fileSlug}.md`;

    const file = new File([markdown], fileName, {
      type: "text/markdown",
    });

    const uploadResponse = await utapi.uploadFiles(file);
    const key = uploadResponse.data?.key;

    if (!key) {
      throw new Error("Failed to upload file");
    }

    const note = {
      utId: key,
      userId: userId,
      title: title,
      slug: fileSlug,
      content: uploadResponse.data?.ufsUrl ?? '',
    };
    await createNote(note);

    return uploadResponse;
  } catch (e) {
    const error = e as Error;
    return {
      error: {
        message: error.message ?? "An error occurred",
      }
    };
  }
}

/**
 * Updates an existing markdown document
 * 
 * This function:
 * 1. Authenticates the current user
 * 2. Retrieves the existing note by ID
 * 3. Verifies the user has permission to edit the note
 * 4. Updates metadata (title/slug) if changed
 * 5. Updates content if changed by:
 *    - Deleting the old file
 *    - Uploading the new content
 *    - Updating the database record
 * 
 * @param id - The ID of the note to update
 * @param markdown - The new markdown content
 * @param title - The new title for the document
 * @param slug - Optional new custom slug for the document URL
 * @returns A success message or an error object
 */
export async function updateMarkdown(id: string, markdown: string, title: string, slug?: string) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized file upload");
    }

    const fileSlug = slug && typeof slug === 'string' ? slugify(slug, { lower: true }) : slugify(title, { lower: true }) + "-" + createId();

    const res = await getNoteById(id);

    if (res.length === 0) {
      throw new Error("Note not found");
    }

    const post = res[0];

    if (post?.userId !== userId) {
      throw new Error("Unauthorized");
    }

    if (post.title !== title || post.slug !== fileSlug) {
      console.log("Updating note metadata");
      await updateNoteMetadata(id, {
        ...post,
        title: title,
        slug: fileSlug,
      }, post.slug); // Pass old slug for cache invalidation
    }

    const contentResponse = await fetch(post.content);
    const originalContent = await contentResponse.text();

    if (markdown !== originalContent) {
      console.log("Updating note content");
      await utapi.deleteFiles(post.utId);

      const fileName = `${title}.md`;
      const file = new File([markdown], fileName, { type: "text/markdown", });

      const uploadResponse = await utapi.uploadFiles(file);

      const key = uploadResponse.data?.key;

      if (!key) {
        throw new Error("Failed to upload file");
      }

      const note = {
        utId: key,
        content: uploadResponse.data?.ufsUrl ?? '',
      };
      await updateNoteContent(id, note);
    }
    return { message: "Note updated successfully" };
  } catch (e) {
    const error = e as Error;
    return {
      error: {
        message: error.message ?? "An error occurred",
      }
    };
  }
}

/**
 * Server action to delete a note
 * @param id The ID of the note to delete
 * @returns Result object with success status and message or error
 */
export async function deleteNoteAction(id: string): Promise<{
  success: boolean;
  message?: string;
  error?: string;
}> {
  const user = await auth();

  if (!user.userId) {
    return {
      success: false,
      error: 'Unauthorized'
    };
  }

  const note = await getNoteById(id);

  if (note.length === 0) {
    return {
      success: false,
      error: 'Note not found'
    };
  }

  if (note[0]?.userId !== user.userId) {
    return {
      success: false,
      error: 'Unauthorized'
    };
  }

  try {
    await deleteNote(note[0].utId);
    return {
      success: true,
      message: 'Note deleted successfully'
    };
  } catch (error) {
    console.error('Failed to delete note:', error);
    return {
      success: false,
      error: 'Failed to delete note'
    };
  }
}

/**
 * Server action to check if a slug already exists
 * @param slug The slug to check
 * @returns Result object with exists status and optional error
 */
export async function checkSlugExists(slug: string): Promise<boolean> {
  try {
    const normalizedSlug = slugify(slug, { lower: true });
    const inUse = await slugExists(normalizedSlug);
    return inUse;
  } catch (error) {
    console.error("Error checking slug existence:", error);
    return true; // Assume exists to prevent saving on error
  }
}