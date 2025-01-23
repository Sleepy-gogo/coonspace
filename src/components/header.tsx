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
    <header className="mx-auto flex container justify-between px-4 py-4">
      <Link
        href="/"
        className="text-3xl font-black tracking-tighter text-white"
      >
        CoonSpace
      </Link>
      <SignedIn>
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Button variant="secondary">Dashboard</Button>
          </Link>
          <ClerkLoading>
            <Skeleton className="h-10 w-10 rounded-full" />
          </ClerkLoading>
          <UserButton />
        </div>
      </SignedIn>
      <SignedOut>
        <SignUpButton mode="modal">
          <Button variant="secondary">Sign Up</Button>
        </SignUpButton>
      </SignedOut>
    </header>
  );
}

export default Header;
