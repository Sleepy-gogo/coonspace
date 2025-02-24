"use client";

import { useEffect, useState, useMemo } from "react";
import { parseMarkdown, createMarkedInstance } from "~/lib/markdown";

interface MarkdownRendererProps {
  markdown: string;
}

function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
  const [htmlContent, setHtmlContent] = useState<string>("");
  const marked = useMemo(() => createMarkedInstance(), []);

  useEffect(() => {
    parseMarkdown(markdown, marked)
      .then((sanitizedHtml) => {
        setHtmlContent(sanitizedHtml);
        console.log("Markdown parsed successfully");
      })
      .catch((error) => {
        console.error("Error parsing markdown:", error);
      });
  }, [markdown, marked]);

  return (
    <div
      className="prose prose-invert w-full max-w-none break-words"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

export default MarkdownRenderer;
