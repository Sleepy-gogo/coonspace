import { Pencil, Trash2, Share2, Check, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
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
import { useCopyToClipboard } from "usehooks-ts";
import { useRouter } from "next/navigation";
import { deleteNoteAction } from "~/server/markdown";
import PDFDownloadButton from "~/components/pdf-download-button";

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

    const data = await deleteNoteAction(note.id);

    if (!data.success) {
      toast.error("Failed to delete note. " + data.error);
      setIsDeleting(false);
      return;
    }

    toast.success("Note deleted successfully");
    onDelete();
    setIsDeleting(false);
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
        isDeleting ? "pointer-events-none animate-pulse cursor-wait" : "group"
      }
    >
      <div className="flex h-full min-h-[160px] flex-col overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/40 backdrop-blur-sm transition-all duration-200 hover:border-slate-600 hover:bg-slate-800/60">
        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-slate-700/50 p-2 text-slate-400">
              <FileText className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-base font-semibold text-white">
                {note.title}
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Updated{" "}
                {new Date(note.updatedAt).toLocaleString("en-US", {
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-1 border-t border-slate-700/30 bg-slate-900/30 px-3 py-2">
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleEdit}
                  className="size-8 text-slate-500 hover:text-white"
                >
                  <Pencil className="size-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleDelete}
                  className="size-8 text-slate-500 hover:text-red-400"
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleShare}
                  className="size-8 text-slate-500 hover:text-blue-400"
                >
                  {copied ? (
                    <Check className="size-3.5" />
                  ) : (
                    <Share2 className="size-3.5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Share</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <PDFDownloadButton
                  slug={note.slug}
                  title={note.title}
                  className="size-8 text-slate-500 hover:text-white"
                />
              </TooltipTrigger>
              <TooltipContent>Download PDF</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </Link>
  );
};

NoteComponent.displayName = "Note";

export const Note = React.memo(NoteComponent);

export function NoteSkeleton() {
  return (
    <div className="flex h-full min-h-[160px] flex-col overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/40">
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start gap-3">
          <Skeleton className="size-8 rounded-lg" />
          <div className="flex-1">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="mt-2 h-3 w-1/2" />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-1 border-t border-slate-700/30 bg-slate-900/30 px-3 py-2">
        <Skeleton className="size-8 rounded-lg" />
        <Skeleton className="size-8 rounded-lg" />
        <Skeleton className="size-8 rounded-lg" />
        <Skeleton className="size-8 rounded-lg" />
      </div>
    </div>
  );
}
