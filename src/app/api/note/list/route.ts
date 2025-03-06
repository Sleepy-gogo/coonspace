import { NextResponse } from 'next/server';
import { getMatchingNotes } from '~/server/queries/select';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('search') ?? '';
  const page = parseInt(searchParams.get('page') ?? '1', 10);

  try {
    const response = await getMatchingNotes(searchTerm, page, 6);
    return NextResponse.json(response);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 });
  }
}