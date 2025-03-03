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
