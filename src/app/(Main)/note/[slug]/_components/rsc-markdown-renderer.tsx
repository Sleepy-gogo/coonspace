import hljs from "highlight.js";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import sanitize from "sanitize-html";

interface MarkdownRendererProps {
  markdown: string;
}

export default async function RSCMarkdownRenderer({
  markdown,
}: MarkdownRendererProps) {
  const marked = new Marked(
    markedHighlight({
      async: true,
      emptyLangClass: "hljs",
      langPrefix: "hljs language-",
      highlight(code, lang, _) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value;
      },
    }),
  );
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

  return (
    <div
      className="prose prose-invert w-full max-w-none break-words"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
