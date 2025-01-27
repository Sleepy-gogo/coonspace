"use client";

import { Note } from "./note";
import { AddNoteModal } from "./add-note-modal";
import { SearchBox } from "./search-box";
import { useEffect, useState } from "react";
import type { PartialNote } from "~/types/note";
import { toast } from "sonner";

function NoteGrid() {
  const [notes, setNotes] = useState<PartialNote[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(
          `/api/note/list?search=${encodeURIComponent(searchTerm)}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }

        const data = (await response.json()) as PartialNote[];
        setNotes(data);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An error occurred";
        toast.error(errorMessage);
      }
    };

    fetchNotes().catch((error) => {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      toast.error(errorMessage);
    });
  }, [searchTerm]);

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4">
        <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <AddNoteModal />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note, index) => (
          <Note key={index} note={note} />
        ))}
      </div>
    </>
  );
}

export default NoteGrid;
