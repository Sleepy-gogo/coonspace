import Header from "~/components/header";
import { NoteGrid } from "./_components/note-grid";
import { getPersonalNotes } from "~/server/queries/select";
import CenterLight from '~/components/background/center-light';

async function DashboardPage() {
  const notes = await getPersonalNotes();
  return (
    <div className="relative min-h-screen w-screen overflow-hidden pb-4">
      <Header />
      <main>
        <div className="container mx-auto p-4">
          <h1 className="mb-8 py-8 text-center text-5xl font-bold text-white">
            Your notes
          </h1>

          <NoteGrid initialNotes={notes} />
        </div>
      </main>
      <CenterLight />
    </div>
  );
}

export default DashboardPage;
