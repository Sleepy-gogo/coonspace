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
    <header className="mx-auto flex container justify-between items-center px-4 py-4">
      <Link
        href="/"
        className="text-3xl lg:text-4xl font-black tracking-tighter text-white"
      >
        CoonSpace
      </Link>
      <SignedIn>
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Button variant="secondary" className="lg:h-11 lg:text-base">Dashboard</Button>
          </Link>
          <ClerkLoading>
            <Skeleton className="size-10 rounded-full" />
          </ClerkLoading>
          <UserButton />
        </div>
      </SignedIn>
      <SignedOut>
        <SignUpButton mode="modal">
          <Button variant="secondary" className="lg:h-11 lg:text-base">Sign Up</Button>
        </SignUpButton>
      </SignedOut>
    </header>
  );
}

export default Header;
