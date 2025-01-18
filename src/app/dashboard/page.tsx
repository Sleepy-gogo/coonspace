import Header from "~/components/header";
import notes from "~/lib/notes.json";
import { Note } from "./_components/note";

function DashboardPage() {
  return (
    <>
      <Header />
      <main className="h-screen">
        <div className="container mx-auto p-4">
          <h1 className="mb-8 text-center text-4xl font-bold text-white">
            Your notes
          </h1>

          <div className="mb-6 flex items-center justify-between">
            <input
              type="text"
              placeholder="Search notes..."
              className="w-full rounded-lg bg-slate-800 p-2 text-white"
            />
            <a
              href="/new"
              className="rounded-lg bg-blue-500 px-4 py-2 text-white"
            >
              New Note
            </a>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((note, index) => (
              <Note key={index} note={note} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default DashboardPage;
