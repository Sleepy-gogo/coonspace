"use client";

import { useState, useRef, useCallback } from "react"; // Add useRef and useCallback
import MarkdownRenderer from "~/components/markdown-renderer";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { Eye, EyeClosed } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

interface MarkdownEditorProps {
  markdown: string;
  setMarkdown: (value: string) => void;
  className?: string;
}

/**
 * A markdown editor component with live preview functionality
 *
 * @component
 * @param {Object} props - The component props
 * @param {string} props.markdown - The markdown content to edit
 * @param {function} props.setMarkdown - Callback function to update markdown content
 *
 * @example
 * ```tsx
 * const [content, setContent] = useState("");
 *
 * return (
 *   <MarkdownEditor
 *     markdown={content}
 *     setMarkdown={setContent}
 *   />
 * );
 * ```
 */
function MarkdownEditor({
  markdown,
  setMarkdown,
  className,
}: MarkdownEditorProps) {
  const [showPreview, setShowPreview] = useState<boolean>(false);

  // Refs for the textarea and preview div elements
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Flag to prevent infinite scroll loops between the two panes
  const ignoreScroll = useRef(false);

  // Scroll sync function to keep the two panes in sync
  const handleScroll = useCallback(
    (
      scrolledElementRef: React.RefObject<HTMLElement>,
      targetElementRef: React.RefObject<HTMLElement>,
    ) => {
      if (ignoreScroll.current) {
        ignoreScroll.current = false; // Reset the flag for the next user scroll
        return;
      }

      const scrolledElement = scrolledElementRef.current;
      const targetElement = targetElementRef.current;

      if (scrolledElement && targetElement) {
        const { scrollTop, scrollHeight, clientHeight } = scrolledElement;

        const scrollRange = scrollHeight - clientHeight;
        const scrollPercent = scrollRange > 0 ? scrollTop / scrollRange : 0;

        const targetScrollRange = targetElement.scrollHeight - targetElement.clientHeight;
        const targetScrollTop = scrollPercent * targetScrollRange;

        ignoreScroll.current = true;
        targetElement.scrollTop = targetScrollTop;
      }
    },
    [],
  );

  const togglePreview = () => {
    setShowPreview((prev) => !prev);
  };

  return (
    <div
      className={
        "relative p-4 md:container md:mx-auto md:flex md:gap-2 md:p-0 " +
        (className ?? "h-[85vh]")
      }
    >
      <div className="absolute right-8 top-8 z-10 md:hidden">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={togglePreview}
        >
          {showPreview ? (
            <EyeClosed size={16} />
          ) : (
            <Eye size={16} />
          )}
        </Button>
      </div>
      <Textarea
        ref={editorRef}
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        onScroll={() => handleScroll(editorRef, previewRef)}
        placeholder="Type your markdown here..."
        className={
          "custom-scroll h-full w-full resize-none border p-4 font-mono text-base outline-none md:w-1/2 " +
          (!showPreview ? "" : "hidden md:block") // On mobile, hide if preview is shown
        }
      />
      <div
        ref={previewRef}
        onScroll={() => handleScroll(previewRef, editorRef)}
        className={
          "h-full overflow-y-auto custom-scroll rounded-md bg-slate-600/10 p-4 md:w-1/2 " +
          (showPreview ? "" : "hidden md:block") // On mobile, hide if preview is not shown
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