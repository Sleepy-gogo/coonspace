import { Search } from "lucide-react";

interface SearchBoxProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function SearchBox({ searchTerm, setSearchTerm }: SearchBoxProps) {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="h-11 w-full rounded-xl border border-slate-700/50 bg-slate-800/50 pl-11 pr-4 text-sm text-slate-100 transition-all placeholder:text-slate-500 hover:border-slate-600/80 hover:bg-slate-800/80 focus-visible:border-blue-500/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500/30"
      />
    </div>
  );
}

export function DisabledSearchBox() {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
      <input
        type="text"
        placeholder="Search notes..."
        value=""
        disabled
        className="h-11 w-full cursor-not-allowed rounded-xl border border-slate-700/50 bg-slate-800/30 pl-11 pr-4 text-sm text-slate-100 opacity-50 placeholder:text-slate-500"
      />
    </div>
  );
}
