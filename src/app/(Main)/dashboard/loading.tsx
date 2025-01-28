import Header from '~/components/header';
import { NoteGridSkeleton } from './_components/note-grid';

function Loading() {
  return (
    <div className="relative min-h-screen w-screen overflow-hidden pb-4">
      <Header />
      <main>
        <div className="container mx-auto p-4">
          <h1 className="mb-8 py-8 text-center text-5xl font-bold text-white">
            Your notes
          </h1>
          <NoteGridSkeleton />
        </div>
      </main>
      <div>
        <div className="absolute left-1/2 top-0 -z-10 size-[100rem] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_farthest-side,rgba(90,90,255,.25),rgba(255,255,255,0))] opacity-60"></div>
      </div>
    </div>
  );
}

export default Loading;