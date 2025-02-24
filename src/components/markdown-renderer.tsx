"use client";

import { useEffect, useState } from "react";
import { marked } from "marked";
import sanitize from "sanitize-html";

interface MarkdownRendererProps {
  markdown: string;
}

function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
  const [htmlContent, setHtmlContent] = useState<string>("");

  useEffect(() => {
    const parseMarkdown = async () => {
      const html = await marked(markdown);
      const sanitizedHtml = sanitize(html) ?? html;

      setHtmlContent(sanitizedHtml);
    };

    parseMarkdown()
      .then(() => {
        console.log("Markdown parsed successfully");
      })
      .catch((error) => {
        console.error("Error parsing markdown:", error);
      });
  }, [markdown]);

  return (
    <div
      className="prose prose-invert w-full max-w-none break-words"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

export default MarkdownRenderer;
