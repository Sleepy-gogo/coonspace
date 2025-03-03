import { clerkClient } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import EditorInterface from "~/components/editor-interface";
import { getNoteBySlug } from "~/server/queries/select";

export const metadata = {
  title: "Edit Note | Coonspace",
  description:
    "Edit a note on Coonspace!\n\nOnline Markdown sharing, fast and easy.",
};

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;
  const noteRes = await getNoteBySlug(slug);
  const post = noteRes[0];

  if (!post) {
    return notFound();
  }

  const user = await (await clerkClient()).users.getUser(post.userId);

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
    <EditorInterface
      initialState={{
        markdown: markdown,
        title: post.title,
        slug: post.slug,
      }}
      noteId={post.id}
    />
  );
}
