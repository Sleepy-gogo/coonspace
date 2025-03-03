"use server";

import { auth } from '@clerk/nextjs/server';
import { createId } from '@paralleldrive/cuid2';
import { createNote } from './queries/insert';
import slugify from 'slug';

import { utapi } from "~/server/uploadthing";
import { getNoteById } from './queries/select';
import { updateNoteContent, updateNoteMetadata } from './queries/update';

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
      });
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
