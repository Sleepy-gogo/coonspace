import { notFound } from "next/navigation";
import { getNoteBySlug } from "~/server/queries/select";
import { Suspense } from "react";
import LoadingSpinner from "~/components/loading-spinner";
import GoToTopButton from "./_components/go-to-top";
import { clerkClient } from "@clerk/nextjs/server";
import UserInfoCard from "./_components/user-info";
import RSCMarkdownRenderer from "./_components/rsc-markdown-renderer";

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ slug: string }> }>) {
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

  return {
    title: `${post.title} - Coonspace`,
    description: `Note shared by ${user.fullName} on Coonspace!\n\nOnline Markdown sharing, fast and easy.`,
  };
}

export default async function NotePage({
  params,
}: Readonly<{ params: Promise<{ slug: string }> }>) {
  const { slug } = await params;
  const note = (await getNoteBySlug(slug))[0];

  if (!note) {
    return notFound();
  }

  const { content, title } = note;

  const response = await fetch(content);

  if (!response.ok) {
    return notFound();
  }

  const markdownContent = await response.text();
  const fullUser = await (await clerkClient()).users.getUser(note.userId);

  const user = {
    id: note.userId,
    fullName: fullUser.fullName ?? "John Doe",
    username: fullUser.username ?? "Unknown",
    imageUrl: fullUser.imageUrl,
  };

  const info = {
    id: note.id,
    updatedAt: note.updatedAt,
  };

  return (
    <div className="container relative mx-auto flex flex-col gap-4 px-4">
      <div className="mx-auto min-h-[60vh] w-full transition-all">
        <GoToTopButton />
        <h1 className="my-8 border-b pb-4 text-center text-4xl font-bold italic tracking-tight text-white md:mt-4 md:text-left">
          {title}
        </h1>
        <Suspense fallback={<LoadingSpinner />}>
          <RSCMarkdownRenderer markdown={markdownContent} />
        </Suspense>
      </div>
      <UserInfoCard user={user} info={info} />
    </div>
  );
}
