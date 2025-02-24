"use client";

import { useEffect, useState, useMemo } from "react";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import sanitize from "sanitize-html";

interface MarkdownRendererProps {
  markdown: string;
}

function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
  const [htmlContent, setHtmlContent] = useState<string>("");
  const marked = useMemo(
    () =>
      new Marked(
        markedHighlight({
          async: true,
          emptyLangClass: "hljs",
          langPrefix: "hljs language-",
          highlight(code, lang, _) {
            const language = hljs.getLanguage(lang) ? lang : "plaintext";
            return hljs.highlight(code, { language }).value;
          },
        }),
      ),
    [],
  );

  useEffect(() => {
    const parseMarkdown = async () => {
      const html = await marked.parse(markdown);
      const sanitizedHtml = sanitize(html, {
        allowedTags: [
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "p",
          "strong",
          "em",
          "ul",
          "ol",
          "li",
          "a",
          "img",
          "code",
          "pre",
          "span",
          "table",
          "thead",
          "tbody",
          "tr",
          "th",
          "td",
          "blockquote",
          "hr",
          "br",
        ],
        allowedAttributes: {
          a: ["href"],
          img: ["src", "alt"],
          code: ["class"],
          span: ["class"],
        },
      });

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
