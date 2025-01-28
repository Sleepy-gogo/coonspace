import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { deleteNote } from '~/server/queries/delete';
import { getNoteById } from '~/server/queries/select';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; }; }
) {
  const user = await auth();

  if (!user.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: 'Invalid note ID' }, { status: 400 });
  }

  const note = await getNoteById(id);

  if (note.length === 0) {
    return NextResponse.json({ error: 'Note not found' }, { status: 404 });
  }

  if (note[0]?.userId !== user.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await deleteNote(id);
    return NextResponse.json({ message: 'Note deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 });
  }
}