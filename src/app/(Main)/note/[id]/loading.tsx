import CenterLight from "~/components/background/center-light";
import { Skeleton } from "~/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="relative min-h-screen w-screen overflow-hidden py-8">
      <main className="container mx-auto p-4 md:px-6 lg:px-40">
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
      </main>
      <CenterLight />
    </div>
  );
}
