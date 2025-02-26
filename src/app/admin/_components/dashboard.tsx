import { getNoteById, getReports } from "~/server/queries/select";
import { clerkClient } from "@clerk/nextjs/server";
import { ReportCard } from "./report-card";

async function AdminDashboard() {
  const reports = await getReports();

  const reportsWithUserData = await Promise.all(
    reports.map(async (report) => {
      try {
        const user = await (await clerkClient()).users.getUser(report.userId);
        const [note] = await getNoteById(report.noteId);
        return {
          id: report.id,
          title: note?.title ?? "Unknown",
          url: note?.slug ?? "Unknown",
          reason: report.reason,
          status: report.status,
          user: {
            username: user?.username ?? "unknown",
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
          title: "Unknown",
          url: "Unknown",
          reason: report.reason,
          status: report.status,
          user: {
            username: "unknown",
            imageUrl: "",
          },
        };
      }
    }),
  );
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {reportsWithUserData.map((report) => (
        <ReportCard key={report.id} report={report} />
      ))}
    </div>
  );
}

export default AdminDashboard;
