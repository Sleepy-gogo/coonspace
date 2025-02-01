/* eslint-disable @typescript-eslint/await-thenable */

import { notFound } from "next/navigation";
import { getNoteById, getUserById } from "~/server/queries/select";
import MarkdownRenderer from "~/components/markdown-renderer";
import { Suspense } from "react";
import LoadingSpinner from "~/components/loading-spinner";
import GoToTopButton from "./_components/go-to-top";
import UserInfoCard from "./_components/user-info";

export default async function NotePage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const note = (await getNoteById(id))[0];

  if (!note) {
    return notFound();
  }

  const { content, title } = note;

  const response = await fetch(content);

  if (!response.ok) {
    return notFound();
  }

  const markdownContent = await response.text();
  let user = (await getUserById(note.userId))[0];

  if (!user) {
    user = {
      id: "unknown",
      fullName: "John Doe",
      username: "Unknown",
      imageUrl: "/default-avatar.png",
    };
  }

  return (
    <div className="container mx-auto grid grid-cols-1 gap-4 p-3 sm:px-6 pb-8 lg:grid-cols-12">
      <GoToTopButton />
      <div className="lg:col-span-9 lg:h-[85vh] lg:overflow-y-scroll mx-auto lg:mx-0">
        <h1 className="my-8 text-center md:text-left text-4xl font-bold italic tracking-tight text-white md:mt-4 border-b pb-4">
          {title}
        </h1>
        <Suspense fallback={<LoadingSpinner />}>
          <MarkdownRenderer markdown={markdownContent} />
        </Suspense>
      </div>

      <UserInfoCard
        user={user}
        info={{
          id,
          updatedAt: note.updatedAt,
        }}
      />
    </div>
  );
}
