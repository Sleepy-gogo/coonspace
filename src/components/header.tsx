import {
  SignedIn,
  SignedOut,
  UserButton,
  SignUpButton,
  ClerkLoading,
} from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";

function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-slate-900/50 backdrop-blur-md border border-slate-800/50 max-w-screen-lg rounded-full mx-auto">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-xl font-black tracking-tight text-white transition-colors hover:text-blue-400 lg:text-2xl"
        >
          CoonSpace
        </Link>
        <SignedIn>
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button size="sm">Dashboard</Button>
            </Link>
            <ClerkLoading>
              <Skeleton className="size-8 rounded-full" />
            </ClerkLoading>
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <SignUpButton mode="modal">
            <Button variant="primary" size="sm">
              Sign Up
            </Button>
          </SignUpButton>
        </SignedOut>
      </div>
    </header>
  );
}

export default Header;
