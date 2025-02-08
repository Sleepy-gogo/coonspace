"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { UploadFileResult } from "uploadthing/types";
import { z } from "zod";
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
import { Input } from "~/components/ui/input";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "~/components/ui/responsive-dialog";

interface slugApiResponse {
  exists: boolean;
}

const formSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z
    .string()
    .min(4, "Slug is required")
    .max(256, "Slug must be between 4 and 256 characters").refine(async (slug) => {
      const res = await fetch(`/api/note/exists?slug=${slug}`);
      return !res.ok || !(await res.json() as slugApiResponse).exists;
    }, {
      message: "Slugs already in use."
    }),
});

interface SaveNoteModalProps {
  markdown: string;
}

function SaveNoteModal({markdown} : SaveNoteModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
    },
  });
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [isSaving, setIsSaving] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSaving(true);

    try {
      const formData = new FormData();
      formData.set("markdown", markdown);
      formData.set("title", values.title);
      formData.set("slug", values.slug);

      const res = await fetch("/api/note/save", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data: UploadFileResult = (await res.json()) as UploadFileResult;

      if (data?.error) {
        toast.error("Error trying to upload note: " + data.error.message);
      }

      toast.success("Note saved successfully!");
      router.push("/dashboard");
    } catch {
      toast.error("Upload failed. Try again later.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <ResponsiveModal open={open} onOpenChange={setOpen}>
      <ResponsiveModalTrigger asChild>
        <Button disabled={(markdown.length < 2)}>Publish</Button>
      </ResponsiveModalTrigger>
      <ResponsiveModalContent side="bottom">
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Publish note</ResponsiveModalTitle>
          <ResponsiveModalDescription>
            Before saving your note, set a public title and a slug for your
            note.
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="container mx-auto flex h-full flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-slate-200">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Your title" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    Your note title
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-slate-200">
                    Slug
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="your-note-slug" {...field} />
                  </FormControl>
                  <FormDescription>
                    This will be used in the url to access the note. i.e: coonspace.com/note/my-app-tos
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </form>
        </Form>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}

export default SaveNoteModal;
