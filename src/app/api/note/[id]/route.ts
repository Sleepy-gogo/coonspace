import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { deleteNote } from '~/server/queries/delete';
import { getNoteById } from '~/server/queries/select';
import { updateMarkdown } from '~/server/upload-markdown';

export async function DELETE(
  request: Request,
  { params }: Readonly<{ params: Promise<{ id: string; }>; }>
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
    await deleteNote(note[0].utId);
    return NextResponse.json({ message: 'Note deleted successfully' }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Readonly<{ params: Promise<{ id: string; }>; }>) {
  const user = await auth();
  if (!user.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: 'Invalid note ID' }, { status: 400 });
  }

  const formData = await request.formData();

  try {
    const result = await updateMarkdown(id, formData);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update note' }, { status: 500 });
  }
}