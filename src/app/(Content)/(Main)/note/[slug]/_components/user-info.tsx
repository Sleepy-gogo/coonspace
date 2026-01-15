"use client";

import Image from "next/image";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { ReportModal } from "./report-modal";
import PDFDownloadButton from "~/components/pdf-download-button";

interface UserInfoCardProps {
  user: {
    id: string;
    fullName: string;
    username: string;
    imageUrl: string;
  };
  info: {
    id: string;
    updatedAt: Date;
    slug: string;
    title: string;
  };
}

function UserInfoCard({ user, info }: UserInfoCardProps) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-xl border border-slate-700/50 bg-slate-800/50 p-4 backdrop-blur-sm transition-all sm:flex-row sm:items-center sm:justify-between">
      {/* User Info */}
      <div className="flex items-center gap-4">
        <Image
          className="size-12 rounded-full ring-2 ring-slate-700/50"
          src={user.imageUrl}
          alt={user.username}
          width={48}
          height={48}
        />
        <div className="flex flex-col">
          <p className="font-semibold text-white">{user.fullName}</p>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="font-medium text-slate-300">@{user.username}</span>
            <span className="text-slate-600">•</span>
            <span>
              Updated{" "}
              {info.updatedAt.toLocaleString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 self-end sm:self-auto">
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            {/* Report Modal Button - Ghost variant handled inside component */}
            <TooltipTrigger asChild>
              <ReportModal noteId={info.id} />
            </TooltipTrigger>
            <TooltipContent>Report note</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <PDFDownloadButton
                slug={info.slug}
                title={info.title}
                variant="ghost"
                className="text-slate-500 hover:bg-blue-500/10 hover:text-blue-400"
              />
            </TooltipTrigger>
            <TooltipContent>Download PDF</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export default UserInfoCard;

export function UserInfoCardSkeleton() {
  return (
    <div className="flex w-full flex-col gap-4 rounded-xl border border-slate-700/50 bg-slate-800/50 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <Skeleton className="size-12 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <div className="flex gap-2 self-end sm:self-auto">
        <Skeleton className="size-9 rounded-lg" />
        <Skeleton className="size-9 rounded-lg" />
      </div>
    </div>
  );
}
