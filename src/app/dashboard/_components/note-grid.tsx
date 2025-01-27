"use client";

import notes from "~/lib/notes.json";
import { Note } from "./note";
import { useState } from 'react';
import { SearchBox } from './search-box';
import { AddNoteModal } from './add-note-modal';

function NoteGrid() {
  const [searchTerm, setSearchTerm] = useState("");
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
