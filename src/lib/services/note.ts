import type { UploadFileResult } from "uploadthing/types";

interface SlugCheckResponse {
  exists: boolean;
}

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