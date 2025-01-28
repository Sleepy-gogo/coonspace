import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from '@clerk/nextjs/server';
import { createNote } from '~/server/queries/insert';
import { revalidatePath } from 'next/cache';

const f = createUploadthing();

export const ourFileRouter = {
  mdUploader: f({
    "text/markdown": {
      maxFileSize: "256KB",
      maxFileCount: 1,
    }
  })
    .middleware(async () => {
      const user = await auth();

      if (!user.userId) throw new UploadThingError("Unauthorized");

      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const note = {
        userId: metadata.userId,
        title: file.name.replace(/\.md$/, ''),
        content: file.url
      };
      await createNote(note);
      revalidatePath('/dashboard');
      return { fileName: file.name };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
