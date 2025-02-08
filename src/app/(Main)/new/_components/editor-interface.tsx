"use client";

import { useState } from "react";
import MarkdownEditor from "~/components/markdown-editor";
import SaveNoteModal from './save-note-modal';

interface MarkdownEditorProps {
  initialMarkdown?: string;
}

export default function EditorInterface({
  initialMarkdown = ""
}: MarkdownEditorProps) {
  const [markdown, setMarkdown] = useState(initialMarkdown);

  return (
    <div className="flex flex-col gap-2">
      <MarkdownEditor markdown={markdown} setMarkdown={setMarkdown} />
      <div className='flex justify-center border-t pt-4 border-slate-400 max-w-screen-sm w-full mx-auto'>
        <SaveNoteModal markdown={markdown} />
      </div>
    </div>
  );
}
