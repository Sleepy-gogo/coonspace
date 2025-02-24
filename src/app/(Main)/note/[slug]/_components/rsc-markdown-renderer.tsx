import { parseMarkdown } from "~/lib/markdown";

interface MarkdownRendererProps {
  markdown: string;
}

export default async function RSCMarkdownRenderer({
  markdown,
}: MarkdownRendererProps) {
  const sanitizedHtml = await parseMarkdown(markdown);

  return (
    <div
      className="prose prose-invert w-full max-w-none break-words"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
