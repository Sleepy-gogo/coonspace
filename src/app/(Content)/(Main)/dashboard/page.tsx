import { NoteGrid } from "./_components/note-grid";

export const metadata = {
  title: 'Dashboard | Coonspace',
  description: 'See your shared notes on Coonspace!\n\nOnline Markdown sharing, fast and easy.',
  openGraph: {
    title: 'Dashboard | Coonspace',
    description: 'See your shared notes on Coonspace!\n\nOnline Markdown sharing, fast and easy.',
    url: 'https://sgcoon.space/dashboard',
    siteName: 'CoonSpace',
    images: [
      {
        url: 'https://sgcoon.space/note.png',
        width: 1200,
        height: 630,
        alt: 'Dashboard - Coonspace',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dashboard | Coonspace',
    description: 'See your shared notes on Coonspace!',
    site: '@sleepygogo',
    creator: '@sleepygogo'
  }
};

function DashboardPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-8 py-8 text-center text-5xl font-bold text-white">
        Your notes
      </h1>

      <NoteGrid />
    </div>
  );
}

export default DashboardPage;
