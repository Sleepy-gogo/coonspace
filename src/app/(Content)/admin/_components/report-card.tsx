"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { deleteReport, updateStatus } from "~/server/report";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { toast } from "sonner";
import type { ReportStatus } from "~/types/report";
import { ChevronDown, Trash } from "lucide-react";
import { Spinner } from "~/components/ui/spinner";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";
import Link from "next/link";
import { deleteNote } from "~/server/queries/delete";

interface ReportCardProps {
  report: {
    id: string;
    title: string;
    slug: string;
    noteId: string;
    reason: string | null;
    status: ReportStatus;
    user: {
      username: string;
      imageUrl: string;
    };
  };
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function ReportCard({ report }: ReportCardProps) {
  const [status, setStatus] = useState<ReportStatus>(report.status);
  const [open, setOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const statusColors = {
    pending:
      "text-yellow-300 bg-yellow-300/20 border-yellow-300/50 hover:bg-yellow-300/30",
    resolved:
      "text-green-300 bg-green-300/20 border-green-300/50 hover:bg-green-300/30",
    ignored: "text-red-400 bg-red-400/20 border-red-400/50 hover:bg-red-400/30",
  };

  const handleStatusChange = async (newStatus: ReportStatus) => {
    try {
      await updateStatus(report.id, newStatus);
      setStatus(newStatus);
      toast.success(`Report status changed to ${newStatus}`);
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleNoteDelete = async () => {
    console.log("awawa 1");
    setIsDeleting(true);
    try {
      console.log("awawa 2");
      await deleteNote(report.noteId);
      console.log("awawa 3");
      await handleStatusChange("resolved");
      console.log("awawa 4");
      toast.success("The note has been successfully deleted");
    } catch (error) {
      console.error("Failed to delete note:", error);
      toast.error("Failed to delete note.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteReport(report.id);
      toast.success("The report has been successfully deleted");
    } catch (error) {
      console.error("Failed to delete note:", error);
      toast.error("Failed to delete note.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="overflow-hidden hover:border-slate-400/40 hover:bg-slate-600/30">
      <div className="">
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="flex items-center justify-between gap-4 text-xl">
            <span className="break-words font-bold">{report.title}</span>
            <Badge className={statusColors[status]}>
              {capitalizeFirstLetter(status)}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-3">
          <p className="mb-4 text-slate-300">
            {report.reason ? `"${report.reason}"` : "No reason provided."}
          </p>
          <div className="flex items-center gap-2">
            <Avatar className="size-10">
              <AvatarImage
                src={report.user.imageUrl}
                alt={report.user.username}
              />
              <AvatarFallback>
                {report.user.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Separator orientation="vertical" className="h-6 bg-slate-600" />
            <span className="text-sm font-semibold text-slate-300">
              @{report.user.username}
            </span>
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="mt-2 flex justify-between pb-3">
          <Button variant="outline" size="sm" disabled={status === "resolved"}>
            <Link href={`/note/${report.slug}`}>Visit note</Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-sm">
                Actions <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                disabled={isDeleting}
                onClick={() => handleDelete()}
              >
                Ignore Report
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={isDeleting || status === "resolved"}
                onClick={() => setOpen(true)}
                className="focus:bg-red-500/20 focus:text-red-500"
              >
                {isDeleting ? (
                  <>
                    <Spinner /> Deleting...
                  </>
                ) : (
                  <>
                    <Trash /> Delete Note
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. The note will be removed, and
                  the report will be marked as resolved.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleNoteDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </div>
    </Card>
  );
}

export function ReportCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div>
        <CardHeader className="pb-2 pt-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-7 w-1/3" />
            <Skeleton className="h-6 w-20" />
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          <Skeleton className="mb-4 h-4 w-3/4" />
          <div className="flex items-center gap-2">
            <Skeleton className="size-10 rounded-full" />
            <Separator orientation="vertical" className="h-6 bg-slate-600" />
            <Skeleton className="h-4 w-24" />
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="mt-2 flex justify-between pb-3">
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-9 w-9" />
        </CardFooter>
      </div>
    </Card>
  );
}
