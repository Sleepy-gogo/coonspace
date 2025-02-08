"use client";

import { useEffect, useState } from "react";
import UserInfoCard, { UserInfoCardSkeleton } from "./user-info";
import { Button } from "~/components/ui/button";
import { useMediaQuery } from "@uidotdev/usehooks";
import { ArrowLeftFromLine } from "lucide-react";
import { Skeleton } from "~/components/ui/skeleton";

interface PageWrapperProps {
  sidebarData: {
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
  };
  children: React.ReactNode;
}

export default function PageWrapper({
  sidebarData: { user, info },
  children,
}: PageWrapperProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const matches = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    setSidebarOpen(matches);
  }, [setSidebarOpen, matches]);

  return (
    <div className="container relative mx-auto grid grid-cols-1 gap-y-8 lg:gap-x-4 lg:gap-y-0 p-3 pb-8 sm:px-6 lg:grid-cols-12">
      {!sidebarOpen && (
        <Button
          onClick={() => setSidebarOpen(true)}
          variant="outline"
          className="absolute right-8 top-10 hidden lg:flex"
          size="icon"
        >
          <ArrowLeftFromLine />
        </Button>
      )}
      <div
        className={`transition-all ${
          sidebarOpen ? "lg:col-span-9" : "lg:col-span-12"
        } mx-auto w-full lg:mx-0 lg:h-[85vh] lg:overflow-y-scroll`}
      >
        {children}
      </div>

      {sidebarOpen && (
        <div className="col-span-3">
          <UserInfoCard
            closeSidebar={() => setSidebarOpen(false)}
            user={user}
            info={info}
          />
        </div>
      )}
    </div>
  );
}

export function SidebarWrapperSkeleton() {
  return (
    <div className="container mx-auto grid grid-cols-1 gap-y-4 p-3 pb-8 sm:px-6 lg:grid-cols-12 lg:gap-x-4">
      <div className="w-full lg:col-span-9 lg:h-[85vh] lg:overflow-y-scroll">
        <h1 className="my-8 border-b pb-4 text-center text-4xl font-bold italic tracking-tight text-white md:mt-4 md:text-left">
          Loading...
        </h1>
        <Skeleton className="h-96 w-full lg:h-full" />
      </div>

      <UserInfoCardSkeleton />
    </div>
  );
}
