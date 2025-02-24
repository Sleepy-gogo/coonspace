import Link from "next/link"
import { Github } from "lucide-react"
import { Button } from "~/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Link href="/" className="text-2xl font-bold text-slate-100 mr-4 mb-2">
              CoonSpace
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-slate-100"
              asChild
            >
              <a href="https://github.com/sleepy-gogo/coonspace" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </Button>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <nav className="flex space-x-4 mb-4 md:mb-0 md:mr-4">
              <Link href="/about" className="text-sm text-slate-400 hover:text-slate-100 transition-colors">
                About
              </Link>
              <Link href="/privacy" className="text-sm text-slate-400 hover:text-slate-100 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-slate-400 hover:text-slate-100 transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="text-sm text-slate-400 hover:text-slate-100 transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-slate-500">
          This project is open source and available under the
          <Link
            href="https://opensource.org/licenses/MIT"
            className="underline ml-1 hover:text-slate-300 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            MIT License
          </Link>
        </div>
      </div>
    </footer>
  )
}

