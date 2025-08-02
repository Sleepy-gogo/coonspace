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
      <div className="relative w-full overflow-hidden rounded-[1.55rem] bg-blue-600 p-0.5 shadow-lg shadow-blue-500/20">
        <div className="relative rounded-3xl bg-slate-900 p-4 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
            <div className="rounded-xl bg-blue-400/10 px-4 py-1 text-sm font-semibold text-blue-300">
              Live
            </div>
          </div>
          <MarkdownEditor
            markdown={markdown}
            setMarkdown={setMarkdown}
            className="h-[500px]"
          />
        </div>
      </div>
    </div>
  );
}

export default MiniPreview;
