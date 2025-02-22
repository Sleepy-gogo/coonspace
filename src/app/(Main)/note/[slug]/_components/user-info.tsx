import { Flag } from "lucide-react";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";

interface UserInfoCardProps {
  user: {
    id: string;
    fullName: string;
    username: string;
    imageUrl: string;
  };
  info: {
    slug: string;
    updatedAt: Date;
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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="destructive" size="icon">
                <Flag />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Report note</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
