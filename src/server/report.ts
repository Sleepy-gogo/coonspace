"use server";
import { auth } from '@clerk/nextjs/server';
import { createReport } from './queries/insert';
import { updateReportStatus } from './queries/update';
import { checkRole } from '~/utils/roles';
import { deleteReport as deleteReportFromDb, deleteResolvedReports } from './queries/delete';
import { ratelimit } from './ratelimit';

export async function submitReport({ noteId, reason = "" }: { noteId: string, reason?: string; }) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const { success } = await ratelimit.limit(userId);
  if (!success) throw new Error('Rate limit exceeded');

  await createReport({
    noteId,
    userId,
    reason,
  });

  return { success: true, message: 'Report submitted' };
}

export async function updateStatus(reportId: string, status: 'pending' | 'resolved' | 'ignored') {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  if (!(await checkRole('admin'))) throw new Error('Unauthorized');

  await updateReportStatus(
    reportId,
    {
      status,
    });
}

export async function deleteReport(
  reportId: string,
) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  if (!(await checkRole('admin'))) throw new Error('Unauthorized');

  await deleteReportFromDb(reportId);
}

export async function deleteAllResolved() {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  if (!(await checkRole('admin'))) throw new Error('Unauthorized');

  await deleteResolvedReports();
}