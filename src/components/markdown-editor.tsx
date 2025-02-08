"use client";

import { useState } from "react";
import MarkdownRenderer from "~/components/markdown-renderer";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { Eye, EyeClosed } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

interface MarkdownEditorProps {
  markdown: string;
  setMarkdown: (value: string) => void;
}

function MarkdownEditor({ markdown, setMarkdown }: MarkdownEditorProps) {
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const togglePreview = () => {
    setShowPreview((prev) => !prev);
  };

  return (
    <div className="relative h-[85vh] p-4 md:container md:mx-auto md:flex md:gap-2 md:p-0">
      <div className="absolute right-8 top-8 z-10 md:hidden">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={togglePreview}
        >
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
      <Textarea
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        placeholder="Type your markdown here..."
        className={
          "h-full w-full resize-none border p-4 font-mono text-base outline-none md:w-1/2 " +
          (!showPreview ? "" : "hidden md:block")
        }
      />
      <div
        className={
          "h-full overflow-y-auto rounded-md bg-slate-600/10 p-4 md:w-1/2 " +
          (showPreview ? "" : "hidden md:block")
        }
      >
        <MarkdownRenderer markdown={markdown} />
      </div>
    </div>
  );
}

export function MarkdownEditorSkeleton() {
  return (
    <div className="h-[85vh] p-4">
      <div className="flex h-full md:gap-2">
        <Skeleton className="h-full w-full md:w-1/2" />
        <Skeleton className="hidden h-full w-full md:block md:w-1/2" />
      </div>
    </div>
  );
}

export default MarkdownEditor;
