import { Skeleton } from "~/components/ui/skeleton";
import { UserInfoCardSkeleton } from "./_components/user-info";

export default function Loading() {
  return (
    <div className="container mx-auto grid grid-cols-1 gap-y-4 p-3 pb-8 sm:px-6">
      <div className="w-full">
        <h1 className="my-8 border-b pb-4 text-center text-4xl font-bold italic tracking-tight text-white md:mt-4 md:text-left">
          Loading...
        </h1>
        <Skeleton className="h-96 w-full" />
      </div>

      <UserInfoCardSkeleton />
    </div>
  );
}
