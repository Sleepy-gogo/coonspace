"use client";

import { useState } from "react";
import MarkdownEditor from "~/components/markdown-editor";
import SaveNoteModal from './save-note-modal';

interface MarkdownEditorProps {
  initialState?: {
    markdown: string;
    title: string;
    slug: string;
  },
  noteId?: string
}

export default function EditorInterface({
  initialState = {
    markdown: "",
    title: "",
    slug: "",
  },
  noteId = ""
}: MarkdownEditorProps) {
  const [markdown, setMarkdown] = useState(initialState.markdown);

  return (
    <div className="flex flex-col gap-2">
      <MarkdownEditor markdown={markdown} setMarkdown={setMarkdown} />
      <div className='flex justify-center border-t pt-4 border-slate-400 max-w-screen-sm w-full mx-auto'>
        <SaveNoteModal markdown={markdown} initialTitle={initialState.title} initialSlug={initialState.slug} noteId={noteId} />
      </div>
    </div>
  );
}
