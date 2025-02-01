import { NoteGridSkeleton } from "./_components/note-grid";

function Loading() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-8 py-8 text-center text-5xl font-bold text-white">
        Your notes
      </h1>
      <NoteGridSkeleton />
    </div>
  );
}

export default Loading;
