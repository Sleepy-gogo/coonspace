"use client";

import { Note, NoteSkeleton } from "./note";
import { useEffect, useState } from "react";
import type { PartialNote } from "~/types/note";
import { toast } from "sonner";
import { useDebounce } from "@uidotdev/usehooks";
import GridTopBar from "./top-bar";

function NoteGrid({initialNotes}: {initialNotes: PartialNote[]}) {
  const [notes, setNotes] = useState<PartialNote[]>(initialNotes);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        let data: PartialNote[] = [];

        const response = await fetch(
          "/api/note/list" +
            (debouncedSearchTerm
              ? `?search=${encodeURIComponent(debouncedSearchTerm)}`
              : ""),
        );

        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }

        data = (await response.json()) as PartialNote[];

        setNotes(data);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An error occurred";
        toast.error(errorMessage);
      }
      setLoading(false);
    };

    fetchNotes().catch((error) => {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      toast.error(errorMessage);
    });
  }, [debouncedSearchTerm]);

  return (
    <>
      <GridTopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.length === 0 && !loading && (
          <p className="text-center text-slate-400">No notes found</p>
        )}
        {loading &&
          Array.from({ length: 3 }).map((_, index) => (
            <NoteSkeleton key={index} />
          ))}
        {notes.map((note, index) => (
          <Note key={index} note={note} />
        ))}
      </div>
    </>
  );
}

export default NoteGrid;
