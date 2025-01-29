/* eslint-disable @typescript-eslint/await-thenable */

import { notFound } from "next/navigation";
import { getNoteById } from "~/server/queries/select";
import MarkdownRenderer from "~/components/markdown-renderer";
import { Suspense } from "react";
import LoadingSpinner from "~/components/loading-spinner";

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

  return (
    <div className="px-4 md:px-12 lg:px-40">
      <h1 className="my-8 text-center text-4xl font-bold italic tracking-tight text-white md:mt-4 md:text-5xl">
        {title}
      </h1>
      <Suspense fallback={<LoadingSpinner />}>
        <MarkdownRenderer markdown={markdownContent} />
      </Suspense>
    </div>
  );
}
