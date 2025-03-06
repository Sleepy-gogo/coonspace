"use client";

import useSWR from "swr";
import { Note, NoteSkeleton } from "./note";
import { useEffect, useRef, useState } from "react";
import type { PartialNote } from "~/types/note";
import { toast } from "sonner";
import { useDebounceValue } from "usehooks-ts";
import GridTopBar from "./top-bar";
import { DisabledGridTopBar } from "./top-bar";
import autoAnimate from "@formkit/auto-animate";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

/**
 * A responsive grid component for displaying and managing notes.
 * Features include:
 * - Dynamic note loading with loading skeletons
 * - Search functionality with debouncing
 * - Empty state handling
 * - Grid layout that adapts to different screen sizes
 * - Support for note deletion
 * @component
 */
export function NoteGrid() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebounced] = useDebounceValue(searchTerm, 400);
  const notesParent = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!notesParent.current) return;
    autoAnimate(notesParent.current, {
      easing: "ease-in",
      duration: 120,
    });
  }, [notesParent]);

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
      <div
        ref={notesParent}
        className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {notes?.map((note) => (
          <Note key={note.id} note={note} onDelete={mutate} />
        ))}
        {isLoading &&
          Array.from({ length: 6 }).map((_, index) => (
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
