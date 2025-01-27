"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import UploadButton from "./upload-button";
import Link from "next/link";

export function AddNoteModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Note</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Note</DialogTitle>
          <DialogDescription>
            Upload a Markdown file directly or use our built in editor.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-1">
          <UploadButton />
          <p className="mx-auto text-slate-400">- or -</p>
          <Link href="/new" className="mx-auto">
            <Button variant="outline">Create a new note</Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
