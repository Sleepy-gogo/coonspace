/* eslint-disable @typescript-eslint/only-throw-error */
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from '@clerk/nextjs/server';
import { createNote } from '~/server/queries/insert';
import { revalidatePath } from 'next/cache';
import { createId } from '@paralleldrive/cuid2';
import slugify from "slug";
import { ratelimit } from '~/server/ratelimit';

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

      const { success } = await ratelimit.limit(user.userId);

      if (!success) throw new UploadThingError("Too many uploads in a short time");

      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const note = {
        utId: file.key,
        userId: metadata.userId,
        title: file.name.replace(/\.md$/, ''),
        content: file.ufsUrl,
        slug: slugify(file.name.replace(/\.md$/, '')) + "-" + createId(),
      };
      await createNote(note);
      revalidatePath('/dashboard');
      return { fileName: file.name };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
