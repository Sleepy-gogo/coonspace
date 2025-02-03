import { auth } from '@clerk/nextjs/server';
import { createId } from '@paralleldrive/cuid2';
import { createNote } from './queries/insert';
import "server-only";

import { utapi } from "~/server/uploadthing";

export async function saveMarkdown(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized file upload");
  }

  const markdown = formData.get("markdown");
  if (typeof markdown !== "string") {
    throw new Error("Markdown data missing or invalid");
  }

  const randomId = createId();

  const file = new File([markdown], `note-${randomId}.md`, {
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
    title: file.name.replace(/\.md$/, ''),
    content: uploadResponse.data?.url ?? '',
  };
  await createNote(note);

  return uploadResponse;
}
