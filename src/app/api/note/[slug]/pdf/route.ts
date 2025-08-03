import { type NextRequest, NextResponse } from 'next/server';
import { getNoteBySlug } from '~/server/queries/select';
import { generatePDF } from '~/lib/pdf-generator';
import { notFound } from 'next/navigation';

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: Readonly<{ params: Promise<{ slug: string }> }>
) {
  try {
    const { slug } = await params;
    const noteRes = await getNoteBySlug(slug);
    const note = noteRes[0];

    if (!note) {
      return notFound();
    }

    const response = await fetch(note.content);
    if (!response.ok) {
      throw new Error('Failed to fetch note content');
    }

    const markdownContent = await response.text();
    
    const pdfBuffer = await generatePDF(markdownContent, note.title);
    
    const filename = `${note.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
    
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}