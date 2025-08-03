import { parseMarkdown } from './markdown';

async function getBrowser() {
  try {
    const isVercel = !!process.env.VERCEL_ENV;

    if (isVercel) {
      const chromium = (await import("@sparticuz/chromium")).default;
      const puppeteer = await import("puppeteer-core");
      const launchOptions = {
        headless: true,
        args: chromium.args,
        executablePath: await chromium.executablePath(),
      };
      return await puppeteer.launch(launchOptions);
    } else {
      const puppeteer = await import("puppeteer");
      return await puppeteer.launch({ headless: true });
    }
  } catch (error) {
    console.error('Failed to launch browser:', error);
    throw error;
  }
}

export async function generatePDF(markdown: string, title: string): Promise<Buffer> {
  const browser = await getBrowser();

  try {
    const page = await browser.newPage();

    const htmlContent = await parseMarkdown(markdown);

    const pdfHtml = createPDFTemplate(htmlContent, title);

    await page.setContent(pdfHtml, { waitUntil: 'networkidle0' });

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: false,
      margin: {
        top: '0',
        right: '0.75in',
        bottom: '1in',
        left: '0.75in',
      },
    });

    return Buffer.from(pdf);
  } finally {
    if (browser) await browser.close();
  }
}


function createPDFTemplate(content: string, title: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
      <style>
      ${getPDFStyles()}
      </style>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css"/>
    </head>
    <body>
      <div class="pdf-container">
        <h1 class="pdf-title">${title}</h1>
        <div class="pdf-content">
          ${content}
        </div>
      </div>
    </body>
    </html>
  `;
}

// Probably should move onto another file, or like, see if it's possible to load the typography styles from tailwind prose thing
function getPDFStyles() {
  return `
    * {
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      background: white;
      margin: 0;
      padding: 0;
    }
    
    .pdf-container {
      max-width: 100%;
      margin: 0 auto;
    }
    
    .pdf-title {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 2rem;
      color: #1a1a1a;
      border-bottom: 2px solid #e5e5e5;
      padding-bottom: 0.5rem;
    }

    .pdf-content img, .pdf-content svg {
      max-width: 100%;
      height: auto;
    }
    
    .pdf-content h1, .pdf-content h2, .pdf-content h3, 
    .pdf-content h4, .pdf-content h5, .pdf-content h6 {
      color: #1a1a1a;
      margin-top: 2rem;
      margin-bottom: .5rem;
      page-break-after: avoid;
    }
    
    .pdf-content p {
      margin-bottom: 1rem;
      orphans: 3;
      widows: 3;
    }
    
    .pdf-content pre {
      background: #f8f9fa;
      border: 1px solid #e9ecef;
      border-radius: 4px;
      padding: 1rem;
      overflow-x: auto;
      page-break-inside: avoid;
    }
    
    .pdf-content code {
      background: #d8d9da;
      padding: 0.2rem 0.4rem;
      border-radius: 3px;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    }
    
    .pdf-content blockquote {
      border-left: 4px solid #ddd;
      margin: 1rem 0;
      padding-left: 1rem;
      color: #666;
    }
    
    .pdf-content table {
      width: 100%;
      border-collapse: collapse;
      margin: 1rem 0;
      page-break-inside: avoid;
    }
    
    .pdf-content th, .pdf-content td {
      border: 1px solid #ddd;
      padding: 0.5rem;
      text-align: left;
    }
    
    .pdf-content th {
      background: #f8f9fa;
      font-weight: bold;
    }
    
    @page {
      margin: 0.5in 0.75in;
    }
    
    @media print {
      .pdf-container {
        page-break-inside: avoid;
      }
    }
  `;
}
