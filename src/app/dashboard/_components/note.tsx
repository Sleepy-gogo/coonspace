import { Pencil, Trash2, Share2 } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import type { PartialNote } from "~/types/note";

interface NoteProps {
  note: PartialNote;
}

export function Note({ note }: NoteProps) {
  return (
    <Link href={`/notes/${note.id}`} aria-label={note.title}>
      <Card className="group flex h-full flex-col">
        <CardContent className="flex-grow p-4">
          <h2 className="text-xl font-semibold">{note.title}</h2>
          <p className="whitespace-pre-wrap text-slate-400">
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
                <Button size="icon" variant="outline">
                  <Pencil className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit note</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="outline">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete note</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="outline">
                  <Share2 className="h-4 w-4" />
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
}
