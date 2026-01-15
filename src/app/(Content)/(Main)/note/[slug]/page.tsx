import { notFound } from "next/navigation";
import GoToTopButton from "./_components/go-to-top";
import UserInfoCard from "./_components/user-info";
import {
  getCachedNotePageData,
  getCachedNoteBySlug,
  getCachedUserInfo,
} from "~/lib/note-cache";
import FadeIn from "./_components/fade-in";

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ slug: string }> }>) {
  const { slug } = await params;

  // Uses the same cached function, so no duplicate requests
  const note = await getCachedNoteBySlug(slug);

  if (!note) {
    return notFound();
  }

  const user = await getCachedUserInfo(note.userId);

  return {
    title: `${note.title} - Coonspace`,
    description: `Note shared by ${user.fullName} on Coonspace!\n\nOnline Markdown sharing, fast and easy.`,
    openGraph: {
      title: `${note.title} - Coonspace`,
      description: `Note shared by ${user.fullName} on Coonspace!\n\nOnline Markdown sharing, fast and easy.`,
      url: `https://sgcoon.space/note/${slug}`,
      siteName: "CoonSpace",
      images: [
        {
          url: "https://sgcoon.space/note.png",
          width: 1200,
          height: 630,
          alt: `${note.title} - Coonspace`,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${note.title} - Coonspace`,
      description: `Note shared by ${user.fullName} on Coonspace!\n\nOnline Markdown sharing, fast and easy.`,
      images: ["https://sgcoon.space/note.png"],
      site: "@sleepygogo",
      creator: "@sleepygogo",
    },
  };
}

export default async function NotePage({
  params,
}: Readonly<{ params: Promise<{ slug: string }> }>) {
  const { slug } = await params;

  // Single cached call that gets everything in parallel
  const data = await getCachedNotePageData(slug);

  if (!data) {
    return notFound();
  }

  const { note, user, renderedHtml } = data;

  return (
    <div className="container relative mx-auto flex flex-col gap-4 px-4">
      <FadeIn>
        <div className="mx-auto min-h-[60vh] w-full transition-all">
          <GoToTopButton />
          <h1 className="my-8 pb-4 text-center text-5xl font-bold tracking-tight text-white">
            {note.title}
          </h1>
          <div
            className="prose prose-invert w-full max-w-none break-words"
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
          />
        </div>
        <UserInfoCard user={user} info={note} />
      </FadeIn>
    </div>
  );
}
