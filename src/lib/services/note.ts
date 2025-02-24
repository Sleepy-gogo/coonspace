import type { UploadFileResult } from "uploadthing/types";

interface SlugCheckResponse {
  exists: boolean;
}

/**
 * Checks if a note slug already exists in the database.
 * 
 * @param {string} slug - The slug to check
 * @returns {Promise<boolean>} True if slug exists or if check fails, false if available
 * 
 * @remarks
 * For safety, this function assumes the slug exists (returns true) in case of errors
 * to prevent duplicate slugs in the database.
 */
export async function checkSlugExists(slug: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/note/exists?slug=${slug}`);
    if (!res.ok) return true; // Assume exists on error
    const data = (await res.json()) as SlugCheckResponse;
    return data.exists;
  } catch (error) {
    console.error("Error checking slug:", error);
    return true; // Assume exists on error
  }
}

/**
 * Creates a new note with the provided content.
 * 
 * @param {FormData} formData - Form data containing note details
 * @param {string} formData.markdown - The note's markdown content
 * @param {string} formData.title - The note's title
 * @param {string} [formData.slug] - Optional custom slug for the note
 * @returns {Promise<UploadFileResult>} Result from the upload service
 * @throws {Error} If the save operation fails
 */
export async function saveNote(formData: FormData): Promise<UploadFileResult> {
  const res = await fetch("/api/note/save", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to save note");
  }

  return await res.json() as UploadFileResult;
}

/**
 * Updates an existing note with new content.
 * 
 * @param {string} noteId - ID of the note to update
 * @param {FormData} formData - Form data containing updated note details
 * @param {string} formData.markdown - The note's updated markdown content
 * @param {string} formData.title - The note's updated title
 * @param {string} [formData.slug] - Optional updated slug for the note
 * @returns {Promise<UploadFileResult>} Result from the upload service
 * @throws {Error} If the update operation fails
 */
export async function updateNote(noteId: string, formData: FormData): Promise<UploadFileResult> {
  const res = await fetch(`/api/note/${noteId}`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to update note");
  }

  return await res.json() as UploadFileResult;
}