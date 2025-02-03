"use client";

import React, { useState } from "react";
import MarkdownRenderer from "~/components/markdown-renderer";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { Eye, EyeClosed } from "lucide-react";
import { useMediaQuery } from "@uidotdev/usehooks";

interface MarkdownEditorProps {
  markdown: string;
  setMarkdown: (value: string) => void;
}

function MarkdownEditor({ markdown, setMarkdown }: MarkdownEditorProps) {
  // If viewport is 768px or less, treat as mobile
  const isMobile = useMediaQuery("(max-width: 768px)");
  // Local state to toggle preview vs. edit mode (only active on mobile)
  const [showPreview, setShowPreview] = useState<boolean>(false);

  // Handler to toggle preview
  const togglePreview = () => {
    setShowPreview((prev) => !prev);
  };

  if (isMobile) {
    return (
      <div className="relative h-[85vh] p-4">
        <div className="absolute right-8 top-8 z-10">
          <Button type="button" variant="outline" size="icon" onClick={togglePreview}>
            {showPreview ? (
              <>
                <EyeClosed size={16} />
              </>
            ) : (
              <>
                <Eye size={16} />
              </>
            )}
          </Button>
        </div>
        {showPreview ? (
          <div className="h-full overflow-y-auto rounded-lg bg-slate-600/10 p-4">
            <MarkdownRenderer markdown={markdown} />
          </div>
        ) : (
          <Textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Type your markdown here..."
            className="h-full w-full resize-none border p-4 font-mono text-base outline-none"
          />
        )}
      </div>
    );
  }

  // Desktop view: show side-by-side panels with a small gap.
  return (
    <div className="flex h-[85vh] gap-2">
      <Textarea
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        placeholder="Type your markdown here..."
        className="w-1/2 resize-none border-r p-4 font-mono text-base outline-none"
      />
      <div className="w-1/2 overflow-y-auto rounded-lg bg-slate-600/10 p-4">
        <MarkdownRenderer markdown={markdown} />
      </div>
    </div>
  );
}

export default MarkdownEditor;
