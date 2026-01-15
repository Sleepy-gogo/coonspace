import { NoteGridSkeleton } from "./_components/note-grid";

function Loading() {
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
      <NoteGridSkeleton />
    </div>
  );
}

export default Loading;
