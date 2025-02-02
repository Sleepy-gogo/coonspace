import { NextResponse } from 'next/server';
import { getMatchingNotes } from '~/server/queries/select';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('search') ?? '';

  try {
    const notes = await getMatchingNotes(searchTerm);
    return NextResponse.json(notes);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 });
  }
}