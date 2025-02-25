"use server";
import { auth } from '@clerk/nextjs/server';
import { createReport } from './queries/insert';
import { updateReportStatus } from './queries/update';

export async function submitReport({ noteId, reason = "" }: { noteId: string, reason?: string; }) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');
  await createReport({
    noteId,
    userId,
    reason,
  });

  return { success: true, message: 'Report submitted' };
}

export async function updateStatus({ reportId, status }: { reportId: string, status: 'pending' | 'resolved' | 'ignored'; }) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  await updateReportStatus(
    reportId,
    {
      status,
    });
}