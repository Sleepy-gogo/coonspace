import { Input } from '~/components/ui/input'

interface SearchBoxProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
}

export function SearchBox({ searchTerm, setSearchTerm }: SearchBoxProps) {
  return (
    <Input
      type="text"
      placeholder="Search notes..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="max-w-sm"
    />
  )
}

