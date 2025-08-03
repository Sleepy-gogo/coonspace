import Image from "next/image";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { ReportModal } from "./report-modal";
import PDFDownloadButton from '~/components/pdf-download-button';

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
    <div className="col-span-3 flex h-full w-full flex-col gap-2 rounded-lg bg-slate-800 p-4">
      <div className="justify-left flex h-full items-center gap-2">
        <Image
          className="size-24 rounded-full"
          src={user.imageUrl}
          alt={user.username}
          width={96}
          height={96}
        />
        <div className="flex flex-col items-center justify-center">
          <p className="text-lg font-bold text-white">{user.fullName}</p>
          <p className="text-slate-400">@{user.username}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">
          Last update:{" "}
          {info.updatedAt.toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <div className="flex gap-2 flex-wrap">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <ReportModal noteId={info.id} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Report note</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <PDFDownloadButton slug={info.slug} title={info.title} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Download</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        </div>
      </div>
    </div>
  );
}

export default UserInfoCard;

export function UserInfoCardSkeleton() {
  return (
    <div className="col-span-3 flex h-full w-full flex-col gap-2 rounded-lg bg-slate-800 p-4">
      <div className="justify-left flex h-full items-center gap-2">
        <Skeleton className="size-24 rounded-full" />
        <div className="flex flex-col items-center justify-center gap-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-8 w-8" />
      </div>
    </div>
  );
}
