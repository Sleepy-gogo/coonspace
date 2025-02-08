"use client";

import useSWR from "swr";
import { Note, NoteSkeleton } from "./note";
import { useState } from "react";
import type { PartialNote } from "~/types/note";
import { toast } from "sonner";
import { useDebounceValue } from "usehooks-ts";
import GridTopBar from "./top-bar";
import { DisabledGridTopBar } from "./top-bar";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function NoteGrid() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebounced] = useDebounceValue(searchTerm, 400);

  const {
    data: notes,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    error,
    mutate,
    isLoading,
  } = useSWR<PartialNote[]>(
    `/api/note/list${debouncedSearchTerm ? `?search=${encodeURIComponent(debouncedSearchTerm)}` : ""}`,
    fetcher,
  );

  // Handle errors
  if (error) {
    toast.error("Failed to fetch notes");
  }

  const handleWrite = (term: string) => {
    setSearchTerm(term);
    setDebounced(term);
  };

  return (
    <>
      <GridTopBar
        searchTerm={searchTerm}
        setSearchTerm={handleWrite}
        refetchNotes={mutate}
      />

      {notes && notes.length === 0 && !isLoading && (
        <p className="text-center text-slate-400 md:text-lg">
          Click the <span className="font-bold">Add Note</span> to start
          publishing your notes!
        </p>
      )}
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes?.map((note, index) => (
          <Note key={index} note={note} onDelete={mutate} />
        ))}
        {isLoading &&
          Array.from({ length: 3 }).map((_, index) => (
            <NoteSkeleton key={index} />
          ))}
      </div>
    </>
  );
}

export function NoteGridSkeleton() {
  return (
    <>
      <DisabledGridTopBar />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <NoteSkeleton key={index} />
        ))}
      </div>
    </>
  );
}
