import { NoteGrid } from "./_components/note-grid";

export const metadata = {
  title: 'Dashboard | Coonspace',
  description: 'See your shared notes on Coonspace!\n\nOnline Markdown sharing, fast and easy.',
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
