import { Pencil, Trash2, Share2, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Skeleton } from "~/components/ui/skeleton";
import type { PartialNote } from "~/types/note";
import React, { useState } from "react";
import { toast } from "sonner";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { useRouter } from 'next/navigation';

interface NoteProps {
  note: PartialNote;
  onDelete: () => void;
}

const NoteComponent = ({ note, onDelete }: NoteProps) => {
  const router = useRouter();
  const [, copyToClipboard] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isDeleting) return;
    setIsDeleting(true);
    e.stopPropagation();

    try {
      const response = await fetch(`/api/note/${note.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete note");
      }

      toast.success("Note deleted successfully");
      onDelete();
    } catch {
      toast.error("Failed to delete note");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const url = window.location.href.replace(
        "dashboard",
        "note/" + note.slug,
      );
      await copyToClipboard(url);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      toast.error("Failed to copy link to clipboard");
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/edit/${note.slug}`);
  };

  return (
    <Link
      href={`/note/${note.slug}`}
      aria-label={note.title}
      className={
        isDeleting ? "pointer-events-none animate-pulse cursor-wait" : ""
      }
    >
      <Card className="group flex h-full flex-col">
        <CardContent className="flex-grow p-4">
          <h2 className="text-xl font-bold">{note.title}</h2>
          <p className="whitespace-pre-wrap text-slate-400 transition-colors group-hover:text-slate-200">
            Last update:{" "}
            {new Date(note.updatedAt).toLocaleString("en-US", {
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2 p-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="group-hover:border-slate-50/20 group-hover:shadow"
                  size="icon"
                  variant="outline"
                  onClick={handleEdit}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit note</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="group-hover:border-slate-50/20 group-hover:shadow"
                  size="icon"
                  variant="outline"
                  onClick={handleDelete}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete note</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="group-hover:border-slate-50/20 group-hover:shadow"
                  size="icon"
                  variant="outline"
                  onClick={handleShare}
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Share2 className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share note</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </Card>
    </Link>
  );
};

NoteComponent.displayName = "Note";

export const Note = React.memo(NoteComponent);

export function NoteSkeleton() {
  return (
    <Card className="flex h-full animate-pulse flex-col">
      <CardContent className="flex-grow p-4">
        <Skeleton className="mb-2 h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 p-4">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
      </CardFooter>
    </Card>
  );
}
