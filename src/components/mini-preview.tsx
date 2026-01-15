"use client";

import { Suspense, useState } from "react";
import MarkdownEditor from "./markdown-editor";
import { Badge } from "./ui/badge";
import { cn } from "~/lib/utils";

const initialMarkdown = `# Welcome to Coonspace! 🚀

You can easily **bold** your text, *italicize* it, or even ***bold and italicize***! Need to highlight something important? Use \`monospace\` for code or keywords.

### Unordered List:

*   Item one
*   Item two
    *   Nested item A
    *   Nested item B
*   Item three

### Ordered List:

1.  First step
2.  Second step
    1.  Sub-step 2.1
    2.  Sub-step 2.2
3.  Third step

You can link to external websites: [Visit Google](https://www.google.com).

Embed images to make your notes more engaging:

![Coonspace Logo](/racc.svg)

##  Quoting

> The only way to do great work is to love what you do.
> - Steve Jobs

## Code Blocks

Showcase your code snippets:

\`\`\`python
def fibonacci(n):
    a, b = 0, 1
    for i in range(n):
        print(a, end=" ")
        a, b = b, a + b

fibonacci(10)
\`\`\`

And for inline code: \`print("Hello, Coonspace!")\`

## Tables

Present data clearly with tables:

| Header 1    | Header 2      | Header 3    |
| :---------- | :------------ | ----------- |
| Left Aligned | Center Aligned | Right Aligned |
| Row 2, Col 1 | Row 2, Col 2 | Row 2, Col 3 |
| Short       | A longer piece of text | 12345     |

## Mathematical Expressions

Coonspace supports LaTeX for beautiful mathematical notation!

### Inline Math:

The quadratic formula is given by $x = \\frac{-b\\pm\\sqrt{b^2 - 4ac}}{2a}$.

### Display Math:

$$
E = mc^2
$$

$$
\\int_a^b f(x) dx = F(b) - F(a)
$$
`;

function MiniPreview({ className }: { className?: string }) {
  const [markdown, setMarkdown] = useState(initialMarkdown);
  return (
    <div className={cn("relative z-10 w-full", className)}>
      <div className="overflow-hidden rounded-xl bg-slate-900/90 backdrop-blur-sm">
        {/* Window chrome */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex gap-2">
            <div className="size-3 rounded-full bg-red-500/80" />
            <div className="size-3 rounded-full bg-yellow-500/80" />
            <div className="size-3 rounded-full bg-green-500/80" />
          </div>
          <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-300">
            Live Preview
          </span>
        </div>
        {/* Editor */}
        <div className="p-4">
          <MarkdownEditor
            markdown={markdown}
            setMarkdown={setMarkdown}
            className="h-[400px]"
          />
        </div>
      </div>
    </div>
  );
}

export default MiniPreview;
