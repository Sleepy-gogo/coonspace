import { NextResponse } from 'next/server';
import { getPersonalNotes } from '~/server/queries/select';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('search') ?? '';

  try {
    const notes = await getPersonalNotes(); // Change to getMatchingNotes in the future
    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 });
  }
}