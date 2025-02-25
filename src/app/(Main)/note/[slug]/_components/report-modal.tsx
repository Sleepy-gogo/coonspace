"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Flag } from "lucide-react";
import { useForm } from "react-hook-form";
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
import { saveReportSchema } from "~/lib/schemas/report";
import { submitReport } from "~/server/report";

interface ReportModalProps {
  noteId: string;
}

export function ReportModal({ noteId }: ReportModalProps) {
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
  }

  return (
    <ResponsiveModal>
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
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                      maxHeight={200}
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}

export function DisabledAddNoteModal() {
  return <Button disabled>Add Note</Button>;
}
