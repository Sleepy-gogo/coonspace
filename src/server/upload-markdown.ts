import { auth } from '@clerk/nextjs/server';
import { createId } from '@paralleldrive/cuid2';
import { createNote } from './queries/insert';
import "server-only";
import slugify from 'slug';

import { utapi } from "~/server/uploadthing";
import { getNoteById } from './queries/select';
import { updateNoteContent, updateNoteMetadata } from './queries/update';

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
    content: uploadResponse.data?.ufsUrl ?? '',
  };
  await createNote(note);

  return uploadResponse;
}

export async function updateMarkdown(id: string, formData: FormData) {
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
  if (typeof slug !== "string") {
    throw new Error("Slug invalid");
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
    });
  }

  const contentResponse = await fetch(post.content);
  const originalContent = await contentResponse.text();

  if (markdown !== originalContent) {
    console.log("Updating note content");
    await utapi.deleteFiles(id);

    const fileName = `${title}.md`;
    const file = new File([markdown], fileName, { type: "text/markdown", });

    const uploadResponse = await utapi.uploadFiles(file);

    const key = uploadResponse.data?.key;

    if (!key) {
      throw new Error("Failed to upload file");
    }

    const note = {
      id: key,
      content: uploadResponse.data?.ufsUrl ?? '',
    };
    await updateNoteContent(id, note);
  }
  return Response.json({ message: "Note updated successfully" }, { status: 200 });
}
