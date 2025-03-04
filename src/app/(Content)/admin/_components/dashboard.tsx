import { getNoteById, getReports } from "~/server/queries/select";
import { clerkClient } from "@clerk/nextjs/server";
import { ReportCard, ReportCardSkeleton } from "./report-card";

async function AdminDashboard() {
  const reports = await getReports();

  const reportsWithUserData = await Promise.all(
    reports.map(async (report) => {
      try {
        const user = await (await clerkClient()).users.getUser(report.userId);
        const [note] = report.noteId
          ? await getNoteById(report.noteId)
          : [
              {
                title: "Deleted note",
                utId: "",
                slug: "",
              },
            ];
        return {
          id: report.id,
          title: note.title,
          slug: note.slug,
          noteId: note.utId,
          reason: report.reason,
          status: report.status,
          user: {
            username: user.username ?? "Unknown",
            imageUrl: user.imageUrl,
          },
        };
      } catch (error) {
        console.error(
          `Failed to fetch user data for report ${report.id}:`,
          error,
        );
        return {
          id: report.id,
          title: "Report failed to fetch.",
          slug: "",
          noteId: "",
          reason: report.reason,
          status: report.status,
          user: {
            username: "Unknown",
            imageUrl: "",
          },
        };
      }
    }),
  );
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {reportsWithUserData.length === 0 && (
        <p className="col-span-3 text-center text-slate-400 md:text-lg">
          There&apos;s no reports yet. Wait until a user creates a report.
        </p>
      )}
      {reportsWithUserData.map((report) => (
        <ReportCard key={report.id} report={report} />
      ))}
    </div>
  );
}

export default AdminDashboard;

export function AdminDashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <ReportCardSkeleton key={index} />
      ))}
    </div>
  );
}
