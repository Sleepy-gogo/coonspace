"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import UploadButton from "./upload-button";
import Link from "next/link";
import { Plus } from "lucide-react";
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
        <Button variant="primary">
          <Plus className="size-4" />
          Add Note
        </Button>
      </ResponsiveModalTrigger>
      <ResponsiveModalContent side="bottom">
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Create a New Note</ResponsiveModalTitle>
          <ResponsiveModalDescription>
            Upload a Markdown file directly or use our built in editor.
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <div className="flex flex-col gap-3 pt-4">
          <UploadButton onComplete={onComplete} />
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-700/50" />
            <span className="text-sm text-slate-500">or</span>
            <div className="h-px flex-1 bg-slate-700/50" />
          </div>
          <Link href="/new" className="w-full">
            <Button variant="outline" className="w-full">
              Create from scratch
            </Button>
          </Link>
        </div>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}

export function DisabledAddNoteModal() {
  return (
    <Button variant="primary" disabled>
      <Plus className="size-4" />
      Add Note
    </Button>
  );
}
