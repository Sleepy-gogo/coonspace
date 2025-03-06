import { getNoteById, getReports } from "~/server/queries/select";
import { clerkClient } from "@clerk/nextjs/server";
import { ReportCard, ReportCardSkeleton } from "./report-card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteAllResolved } from "~/server/report";

interface AdminDashboardProps {
  currentPage: number;
}

async function AdminDashboard({ currentPage }: AdminDashboardProps) {
  const { totalPages, reports } = await getReports(currentPage, 5);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show the first page on selector
      pageNumbers.push(1);

      // Show ellipsis after first page when needed
      if (currentPage > 2) {
        pageNumbers.push(-1); // Ellipsis
      }

      // Shows the current one if it's not the first or last page
      if (currentPage !== 1 && currentPage !== totalPages) {
        pageNumbers.push(currentPage);
      }

      // Show ellipsis before last page when needed
      if (currentPage < totalPages - 1) {
        pageNumbers.push(-1); // Ellipsis
      }

      // Always show last page on selector
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

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
    <>
      {reportsWithUserData.length > 0 && (
        <div className="flex items-center justify-end">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 /> Delete All Resolved
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. All resolved reports will be
                  deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={deleteAllResolved}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
      <div className="grid min-h-[50vh] grid-cols-1 gap-6 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 lg:grid-rows-2">
        {reportsWithUserData.length === 0 && (
          <p className="col-span-3 text-center text-slate-400 md:text-lg">
            There&apos;s no reports yet. Wait until a user creates a report.
          </p>
        )}
        {reportsWithUserData.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`/admin?page=${currentPage - 1}`}
                className={
                  currentPage <= 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
                aria-disabled={currentPage <= 1}
              />
            </PaginationItem>

            {getPageNumbers().map((pageNum, index) =>
              pageNum === -1 ? (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    isActive={pageNum === currentPage}
                    href={`/admin?page=${pageNum}`}
                    className="cursor-pointer"
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}

            <PaginationItem>
              <PaginationNext
                href={`/admin?page=${currentPage + 1}`}
                className={
                  currentPage >= totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
                aria-disabled={currentPage >= totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}

export default AdminDashboard;

export function AdminDashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <ReportCardSkeleton key={index} />
      ))}
    </div>
  );
}
