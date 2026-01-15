import { NoteGrid } from "./_components/note-grid";

export const metadata = {
  title: "Dashboard | Coonspace",
  description:
    "See your shared notes on Coonspace!\n\nOnline Markdown sharing, fast and easy.",
  openGraph: {
    title: "Dashboard | Coonspace",
    description:
      "See your shared notes on Coonspace!\n\nOnline Markdown sharing, fast and easy.",
    url: "https://sgcoon.space/dashboard",
    siteName: "CoonSpace",
    images: [
      {
        url: "https://sgcoon.space/note.png",
        width: 1200,
        height: 630,
        alt: "Dashboard - Coonspace",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dashboard | Coonspace",
    description: "See your shared notes on Coonspace!",
    site: "@sleepygogo",
    creator: "@sleepygogo",
  },
};

function DashboardPage() {
  return (
    <div className="container mx-auto max-w-6xl px-6">
      <div className="mb-10">
        <h1 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-white sm:text-4xl">
          Your notes
        </h1>
        <p className="mt-2 text-slate-400">
          Create, edit and share your markdown notes
        </p>
      </div>

      <NoteGrid />
    </div>
  );
}

export default DashboardPage;
