import hljs from "highlight.js";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import sanitize from "sanitize-html";

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

/**
 * Configuration options for the marked parser.
 * Sets up syntax highlighting and other parsing preferences.
 * 
 * @constant
 * @type {const}
 */
export const markedOptions = {
  async: true,
  emptyLangClass: "hljs",
  langPrefix: "hljs language-",
  highlight(code: string, lang: string) {
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language }).value;
  },
} as const;

/**
 * Creates a new instance of the Marked parser with syntax highlighting enabled.
 * Should probably be memoized when used on client components.
 * 
 * @returns {Marked} Configured marked instance
 */
export function createMarkedInstance() {
  return new Marked(markedHighlight(markedOptions));
}

/**
 * Converts markdown content to sanitized HTML allowing only the tags previously defined.
 * 
 * @param {string} markdown - Raw markdown content to parse
 * @param {Marked} [markedInstance] - Optional pre-configured marked instance for performance optimization. When using on a cliet component, the memoized instance should be passed here.
 * @returns {Promise<string>} Sanitized HTML string
 * 
 * @example
 * ```ts
 * const html = await parseMarkdown("# Hello\n\nThis is **markdown**");
 * // Returns: "<h1>Hello</h1><p>This is <strong>markdown</strong></p>"
 * 
 * // or
 * 
 * const marked = useMemo(createMarkedInstance, []);
 * useEffect(() => {
 *   const html = await parseMarkdown("# Hello\n\nThis is **markdown**", marked);
 * }, [marked]);
 * ```
 */
export async function parseMarkdown(markdown: string, markedInstance?: Marked) {
  const marked = markedInstance ?? createMarkedInstance();
  const html = await marked.parse(markdown);
  return sanitize(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
  });
}