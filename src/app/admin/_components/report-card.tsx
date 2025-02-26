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
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { toast } from "sonner";
import type { ReportStatus } from "~/types/report";
import { Trash } from 'lucide-react';
import { Spinner } from '~/components/ui/spinner';
import { Separator } from '~/components/ui/separator';

interface ReportCardProps {
  report: {
    id: string;
    title: string;
    url: string;
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
  const [isDeleting, setIsDeleting] = useState(false);

  const statusColors = {
    pending: "text-yellow-300 bg-yellow-300/20 border-yellow-300/50 hover:bg-yellow-300/30",
    resolved: "text-green-300 bg-green-300/20 border-green-300/50 hover:bg-green-300/30",
    ignored: "text-red-300 bg-red-300/20 border-red-300/50 hover:bg-red-300/30",
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

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteReport(report.id);
      toast.success("The report has been successfully deleted");
    } catch (error) {
      console.error("Failed to delete report:", error);
      toast.error("Failed to delete report");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="">
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-xl flex items-center justify-between"><span className="font-bold">{report.title}</span><Badge className={statusColors[status]}>
          {capitalizeFirstLetter(status)}
        </Badge></CardTitle>
        </CardHeader>
        <CardContent className="pb-3">
          <p className="text-slate-300 mb-4">
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
            <Separator orientation='vertical' className="bg-slate-600 h-6" />
            <span className="text-slate-300 text-sm font-semibold">
              @{report.user.username}
            </span>
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="mt-2 flex justify-between pb-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Status: {status}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleStatusChange("pending")}>
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange("resolved")}>
                Resolved
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange("ignored")}>
                Ignored
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon" disabled={isDeleting}>
                {isDeleting ? <Spinner /> : <Trash />}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  report.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
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

