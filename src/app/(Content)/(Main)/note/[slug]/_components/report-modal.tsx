"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Flag } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { AutosizeTextarea } from "~/components/ui/autosize-textarea";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "~/components/ui/responsive-dialog";
import { Separator } from "~/components/ui/separator";
import { saveReportSchema } from "~/lib/schemas/report";
import { submitReport } from "~/server/report";

interface ReportModalProps {
  noteId: string;
}

export function ReportModal({ noteId }: ReportModalProps) {
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof saveReportSchema>>({
    resolver: zodResolver(saveReportSchema),
    defaultValues: {
      reason: "",
    },
  });

  async function onSubmit(values: z.infer<typeof saveReportSchema>) {
    await submitReport({
      noteId,
      reason: values.reason,
    });
    setOpen(false);
    toast.success("Report recieved! We'll review it soon.");
  }

  return (
    <ResponsiveModal open={open} onOpenChange={setOpen}>
      <ResponsiveModalTrigger asChild>
        <Button variant="destructive" size="icon">
          <Flag />
        </Button>
      </ResponsiveModalTrigger>
      <ResponsiveModalContent side="bottom">
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Report note</ResponsiveModalTitle>
          <ResponsiveModalDescription>
            Are you sure you want to report this note for review? Please, tell
            us why you think this content is inappropriate.
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-slate-200">
                    Reason:
                  </FormLabel>
                  <FormControl>
                    <AutosizeTextarea
                      placeholder="This note contains..."
                      maxHeight={100}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This will be taken into consideration by the reviewer.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator className="mb-2" />
            <Button type="submit" className="self-center">
              Submit
            </Button>
          </form>
        </Form>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}

export function DisabledAddNoteModal() {
  return <Button disabled>Add Note</Button>;
}
