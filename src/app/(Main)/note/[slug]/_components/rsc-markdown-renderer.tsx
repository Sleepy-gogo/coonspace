import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

interface MarkdownRendererProps {
  markdown: string;
}

export default async function RSCMarkdownRenderer({
  markdown,
}: MarkdownRendererProps) {
  const html = await marked(markdown);
  const sanitizedHtml = sanitizeHtml(html, {
    allowedTags: [
      "h1",
      "h2",
      "h3",
      "p",
      "strong",
      "em",
      "ul",
      "ol",
      "li",
      "a",
      "img",
    ],
    allowedAttributes: { a: ["href"], img: ["src", "alt"] },
  });

  return (
    <div
      className="prose prose-invert w-full max-w-none break-words"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
