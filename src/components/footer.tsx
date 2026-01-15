import Link from "next/link";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-slate-900/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm font-semibold text-slate-300 transition-colors hover:text-white"
          >
            CoonSpace
          </Link>
          <a
            href="https://github.com/sleepy-gogo/coonspace"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 transition-colors hover:text-white"
          >
            <Github className="size-4" />
          </a>
        </div>

        <nav className="flex items-center gap-6 text-sm text-slate-500">
          <Link href="/about" className="transition-colors hover:text-white">
            About
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-white">
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-white">
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
}
