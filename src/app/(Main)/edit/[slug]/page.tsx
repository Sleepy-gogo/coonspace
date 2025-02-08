/* eslint-disable @typescript-eslint/await-thenable */
import { notFound } from "next/navigation";
import { Suspense } from "react";
import EditorInterface, {
  EditorInterfaceSkeleton,
} from "~/components/editor-interface";
import { getNoteBySlug, getUserById } from "~/server/queries/select";

export const metadata = {
  title: "Edit Note | Coonspace",
  description:
    "Edit a note on Coonspace!\n\nOnline Markdown sharing, fast and easy.",
};

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const noteRes = await getNoteBySlug(slug);
  const post = noteRes[0];

  if (!post) {
    return notFound();
  }

  const userRes = await getUserById(post.userId);
  const user = userRes[0];

  if (!user) {
    return notFound();
  }

  if (post.userId !== user.id) {
    return notFound();
  }

  const content = await fetch(post.content);
  if (!content.ok) {
    return notFound();
  }

  const markdown = await content.text();

  return (
    <Suspense fallback={<EditorInterfaceSkeleton />}>
      <EditorInterface
        initialState={{
          markdown: markdown,
          title: post.title,
          slug: post.slug,
        }}
        noteId={post.id}
      />
    </Suspense>
  );
}
