import { auth } from '@clerk/nextjs/server';
import { createId } from '@paralleldrive/cuid2';
import { createNote } from './queries/insert';
import "server-only";
import slugify from 'slug';

import { utapi } from "~/server/uploadthing";

export async function saveMarkdown(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized file upload");
  }

  const markdown = formData.get("markdown");
  const title = formData.get("title");
  const slug = formData.get("slug");

  if (typeof markdown !== "string") {
    throw new Error("Markdown data missing or invalid");
  }
  if (typeof title !== "string" || !title) {
    throw new Error("Title missing or invalid");
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
    id: key,
    userId: userId,
    title: title,
    slug: fileSlug,
    content: uploadResponse.data?.url ?? '',
  };
  await createNote(note);

  return uploadResponse;
}