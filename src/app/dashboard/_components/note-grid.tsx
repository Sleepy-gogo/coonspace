"use client";

import { Note } from "./note";
import { AddNoteModal } from "./add-note-modal";
import { SearchBox } from "./search-box";
import { useEffect, useState } from "react";
import type { PartialNote } from "~/types/note";
import { toast } from "sonner";
import { useDebounce } from "@uidotdev/usehooks";

function NoteGrid() {
  const [notes, setNotes] = useState<PartialNote[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

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
      <div className="mb-6 flex items-center justify-between gap-4">
        <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <AddNoteModal />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.length === 0 && !loading && (
          <p className="text-center text-slate-400">No notes found</p>
        )}
        {notes.map((note, index) => (
          <Note key={index} note={note} />
        ))}
      </div>
    </>
  );
}

export default NoteGrid;
