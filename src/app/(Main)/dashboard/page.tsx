import { NoteGrid } from "./_components/note-grid";
import { getPersonalNotes } from "~/server/queries/select";

async function DashboardPage() {
  const notes = await getPersonalNotes();
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-8 py-8 text-center text-5xl font-bold text-white">
        Your notes
      </h1>

      <NoteGrid initialNotes={notes} />
    </div>
  );
}

export default DashboardPage;
