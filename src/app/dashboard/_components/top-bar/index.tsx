import { AddNoteModal } from "./add-note-modal";
import { SearchBox } from "./search-box";

interface GridTopBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  refetchNotes: () => void;
}

function GridTopBar({
  refetchNotes,
  searchTerm,
  setSearchTerm,
}: GridTopBarProps) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <AddNoteModal refetchNotes={refetchNotes} />
    </div>
  );
}

export default GridTopBar;
