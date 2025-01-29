import { Skeleton } from "~/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <div className="mb-8 mt-6">
        <h1 className="mb-8 text-center text-4xl font-bold italic tracking-tight text-white md:mt-4 md:text-5xl">
          Loading content
        </h1>
      </div>
      <div className="space-y-4">
        <Skeleton className="mb-4 h-64"></Skeleton>
        <Skeleton className="mb-4 h-64"></Skeleton>
        <Skeleton className="mb-4 h-64"></Skeleton>
      </div>
    </>
  );
}
