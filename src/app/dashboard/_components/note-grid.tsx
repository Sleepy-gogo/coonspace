"use client";

import useSWR from "swr";
import { Note, NoteSkeleton } from "./note";
import { useState } from "react";
import type { PartialNote } from "~/types/note";
import { toast } from "sonner";
import { useDebounce } from "@uidotdev/usehooks";
import GridTopBar from "./top-bar";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function NoteGrid({ initialNotes }: { initialNotes: PartialNote[] }) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  // Use SWR to fetch notes
  const {
    data: notes,
    error,
    mutate,
  } = useSWR<PartialNote[]>(
    `/api/note/list${debouncedSearchTerm ? `?search=${encodeURIComponent(debouncedSearchTerm)}` : ""}`,
    fetcher,
    {
      fallbackData: initialNotes,
    },
  );

  // Handle errors
  if (error) {
    toast.error("Failed to fetch notes");
  }

  return (
    <>
      <GridTopBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        refetchNotes={mutate}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes && notes.length === 0 && (
          <p className="text-center text-slate-400">No notes found</p>
        )}
        {!notes &&
          Array.from({ length: 3 }).map((_, index) => (
            <NoteSkeleton key={index} />
          ))}
        {notes?.map((note, index) => <Note key={index} note={note} />)}
      </div>
    </>
  );
}

export default NoteGrid;
