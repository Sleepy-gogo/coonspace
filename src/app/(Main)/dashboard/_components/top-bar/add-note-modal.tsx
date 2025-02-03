"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import UploadButton from "./upload-button";
import Link from "next/link";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "~/components/ui/responsive-dialog";

interface AddNoteModalProps {
  refetchNotes: () => void;
}

export function AddNoteModal({ refetchNotes }: AddNoteModalProps) {
  const [open, setOpen] = useState(false);

  const onComplete = () => {
    setOpen(false);
    refetchNotes();
  };

  return (
    <ResponsiveModal open={open} onOpenChange={setOpen}>
      <ResponsiveModalTrigger asChild>
        <Button>Add Note</Button>
      </ResponsiveModalTrigger>
      <ResponsiveModalContent side="bottom">
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Create a New Note</ResponsiveModalTitle>
          <ResponsiveModalDescription>
            Upload a Markdown file directly or use our built in editor.
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <div className="flex flex-col gap-1">
          <UploadButton onComplete={onComplete} />
          <p className="mx-auto text-slate-400">- or -</p>
          <Link href="/new" className="mx-auto">
            <Button variant="outline">Create a new note</Button>
          </Link>
        </div>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}

export function DisabledAddNoteModal() {
  return <Button disabled>Add Note</Button>;
}
