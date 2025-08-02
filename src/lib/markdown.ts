import hljs from "highlight.js";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import sanitize from "sanitize-html";
import markedKatex from "marked-katex-extension";


export const ALLOWED_TAGS = [
  "h1", "h2", "h3", "h4", "h5", "h6",
  "p", "strong", "em", "ul", "ol", "li",
  "a", "img", "code", "pre", "span",
  "table", "thead", "tbody", "tr", "th", "td",
  "blockquote", "hr", "br",
  "div",
  // MathML tags
  "math", "semantics", "annotation", "mtext", "mrow", "mi", "mo", "mn",
  "mspace", "ms", "mstyle", "menclose", "mtable", "mtr", "mtd",
  "munderover", "msubsup", "mover", "munder", "mmultiscripts",
  "mfenced", "mphantom", "merror", "mglyph", "maction",
];

export const ALLOWED_ATTRIBUTES = {
  a: ["href"],
  img: ["src", "alt"],
  code: ["class"],
  div: ["class", "style"],
  span: ["class", "style", "aria-hidden"],
  // For MathML tags
  math: ["display", "xmlns"],
  annotation: ["encoding"],
  semantics: ["encoding"],
  mrow: ["class", "style"],
  mi: ["class", "style"],
  mo: ["class", "style"],
  mn: ["class", "style"],
  mspace: ["class", "style"],
  ms: ["class", "style"],
  mstyle: ["class", "style"],
  menclose: ["class", "style"],
  mtable: ["class", "style"],
  mtr: ["class", "style"],
  mtd: ["class", "style"],
  munderover: ["class", "style"],
  msubsup: ["class", "style"],
  mover: ["class", "style"],
  munder: ["class", "style"],
  mmultiscripts: ["class", "style"],
  mfenced: ["class", "style"],
  mphantom: ["class", "style"],
  merror: ["class", "style"],
  mglyph: ["class", "style"],
  maction: ["class", "style"],
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

export const katexOptions = {
  throwOnError: false,
  displayMode: true,
};

/**
 * Creates a new instance of the Marked parser with syntax highlighting and KaTeX enabled.
 * Should probably be memoized when used on client components.
 *
 * @returns {Marked} Configured marked instance
 */
export function createMarkedInstance() {
  return new Marked(
    markedHighlight(markedOptions),
    markedKatex(katexOptions)
  );
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