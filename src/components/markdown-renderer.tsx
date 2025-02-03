"use client";

import React from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import { useEffect, useState } from "react";

interface MarkdownRendererProps {
  markdown: string;
}

function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
  const [htmlContent, setHtmlContent] = useState<string>("");

  useEffect(() => {
    const parseMarkdown = async () => {
      const processedContent = await unified()
        .use(remarkParse) // Parse markdown
        .use(remarkHtml) // Convert to HTML
        .process(markdown);

      setHtmlContent(processedContent.toString());
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
      className="prose prose-invert max-w-none w-full break-words"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

export default MarkdownRenderer;
