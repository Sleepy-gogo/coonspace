import hljs from "highlight.js";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import sanitize from "sanitize-html";

// Shared configuration
export const ALLOWED_TAGS = [
  "h1", "h2", "h3", "h4", "h5", "h6",
  "p", "strong", "em", "ul", "ol", "li",
  "a", "img", "code", "pre", "span",
  "table", "thead", "tbody", "tr", "th", "td",
  "blockquote", "hr", "br",
];

export const ALLOWED_ATTRIBUTES = {
  a: ["href"],
  img: ["src", "alt"],
  code: ["class"],
  span: ["class"],
};

// Marked configuration options
export const markedOptions = {
  async: true,
  emptyLangClass: "hljs",
  langPrefix: "hljs language-",
  highlight(code: string, lang: string) {
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language }).value;
  },
} as const;

// Create a configured marked instance
export function createMarkedInstance() {
  return new Marked(markedHighlight(markedOptions));
}

// Shared parsing function that accepts an optional marked instance
export async function parseMarkdown(markdown: string, markedInstance?: Marked) {
  const marked = markedInstance ?? createMarkedInstance();
  const html = await marked.parse(markdown);
  return sanitize(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
  });
}