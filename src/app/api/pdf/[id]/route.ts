import { NextResponse } from 'next/server';
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import { auth } from '@clerk/nextjs/server';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import typography from '@tailwindcss/typography';
import puppeteer, { Browser } from 'puppeteer';
import puppeteerCore, { type Browser as BrowserCore } from 'puppeteer-core';
import chromium from '@sparticuz/chromium-min';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(request: Request, { params }: Readonly<{ params: Promise<{ id: string; }>; }>) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  const markdown = "# hi\nthis is a test\n\n- one\n- two\n- three\n**Placeholder only**";

  const processedContent = await unified()
    .use(remarkParse) // Parse markdown
    .use(remarkHtml) // Convert to HTML
    .process(markdown);

  const htmlContent = `<div class="prose lg:prose-xl max-w-none px-4">${processedContent.toString()}</div>`;

  // const processedCss = await postcss([
  //   tailwindcss({
  //     content: [{
  //       raw: htmlContent,
  //       extension: 'html'
  //     }],
  //     theme: {
  //       extend: {}
  //     },
  //     plugins: [typography],
  //     corePlugins: {
  //       preflight: false
  //     }
  //   })
  // ]).process(
  //   `@tailwind base;
  //    @tailwind components;
  //    @tailwind utilities;`,
  //   { from: undefined }
  // );
  let browser: Browser | BrowserCore;
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production') {
      const executablePath = await chromium.executablePath('https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar')
      browser = await puppeteerCore.launch({
          executablePath,
          args: chromium.args,
          headless: true,
          defaultViewport: chromium.defaultViewport
      });
  } else {
      browser = await puppeteer.launch({
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
  }

  try {
    const page = await browser.newPage();

    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0'
    });

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    });

    const headers = {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${id}.pdf"`
    };

    return new NextResponse(pdf, { headers });
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  } finally {
    await browser.close();
  }
}

