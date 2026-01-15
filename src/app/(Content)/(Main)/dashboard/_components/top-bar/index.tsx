import { AddNoteModal, DisabledAddNoteModal } from "./add-note-modal";
import { SearchBox, DisabledSearchBox } from "./search-box";

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
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <AddNoteModal refetchNotes={refetchNotes} />
    </div>
  );
}

export function DisabledGridTopBar() {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <DisabledSearchBox />
      <DisabledAddNoteModal />
    </div>
  );
}

export default GridTopBar;
