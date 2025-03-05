"use client";

import { useState } from "react";
import MarkdownEditor, {
  MarkdownEditorSkeleton,
} from "~/components/markdown-editor";
import SaveNoteModal from "./save-note-modal";
import { Skeleton } from "../ui/skeleton";
import { Info } from "lucide-react";

interface MarkdownEditorProps {
  initialState?: {
    markdown: string;
    title: string;
    slug: string;
  };
  noteId?: string;
}

/**
 * EditorInterface Component
 *
 * A markdown editor component that supports both creating new notes and editing existing ones.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} [props.initialState] - Initial state for the editor
 * @param {string} [props.initialState.markdown=""] - Initial markdown content
 * @param {string} [props.initialState.title=""] - Initial title of the note
 * @param {string} [props.initialState.slug=""] - Initial URL slug for the note
 * @param {string} [props.noteId=""] - ID of the note being edited
 *
 * @remarks
 * The component operates in two modes:
 * 1. Save Mode (Default): When no initialState or noteId is provided, allows creating new notes
 * 2. Edit Mode: When both initialState and noteId are provided, enables editing existing notes
 *
 * @returns {JSX.Element} Rendered editor interface with markdown editor and save/update functionality
 */

export default function EditorInterface({
  initialState = {
    markdown: "",
    title: "",
    slug: "",
  },
  noteId = "",
}: MarkdownEditorProps) {
  const [markdown, setMarkdown] = useState(initialState.markdown);

  return (
    <div className="flex flex-col">
      <MarkdownEditor markdown={markdown} setMarkdown={setMarkdown} />
      <a
        href="https://www.markdownguide.org/basic-syntax/"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-4 flex w-full items-center justify-center gap-2 text-sm text-slate-400 transition-all hover:text-slate-300 hover:underline md:mt-4"
      >
        <Info className="size-5" /> Don&apos;t know how to write markdown?
      </a>
      <div className="mx-auto flex w-full max-w-screen-sm justify-center border-t border-slate-400/40 pt-4">
        <SaveNoteModal
          markdown={markdown}
          initialTitle={initialState.title}
          initialSlug={initialState.slug}
          noteId={noteId}
        />
      </div>
    </div>
  );
}

export function EditorInterfaceSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <MarkdownEditorSkeleton />
      <div className="mx-auto flex w-full max-w-screen-sm justify-center border-t border-slate-400 pt-4">
        <Skeleton className="h-10 w-24 rounded-full" />
      </div>
    </div>
  );
}
