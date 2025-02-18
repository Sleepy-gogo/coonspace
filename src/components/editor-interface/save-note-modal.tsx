"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { usePostHog } from 'posthog-js/react';
import { useMemo, useState } from "react";
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

interface SaveNoteModalProps {
  markdown: string;
  initialTitle?: string;
  initialSlug?: string;
  noteId?: string;
}

function SaveNoteModal({
  markdown,
  initialTitle = "",
  initialSlug = "",
  noteId = "",
}: SaveNoteModalProps) {
  const formSchema = useMemo(
    () =>
      z.object({
        title: z.string().min(2, "Title is required"),
        slug: z
          .string()
          .max(256, "Slug must be between 4 and 256 characters")
          .optional()
          .refine(
            async (slug) => {
              if (!slug) return true;

              if (slug == initialSlug) return true;

              if (slug.length < 4) return false;

              const res = await fetch(`/api/note/exists?slug=${slug}`);

              if (!res.ok) return false;

              const slugExists = ((await res.json()) as slugApiResponse).exists;

              return !slugExists;
            },
            {
              message: "Slug already in use or too short. (4 characters minimum)",
            },
          ),
      }),
    [initialSlug],
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialTitle,
      slug: initialSlug,
    },
    mode: "onChange",
  });
  const posthog = usePostHog();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [isSaving, setIsSaving] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSaving(true);

    try {
      const formData = new FormData();
      formData.set("markdown", markdown);
      formData.set("title", values.title);
      formData.set("slug", values.slug ?? "");

      let res;
      if (!noteId) {
        res = await fetch("/api/note/save", {
          method: "POST",
          body: formData,
        });
      } else {
        res = await fetch(`/api/note/${noteId}`, {
          method: "PUT",
          body: formData,
        });
      }

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data: UploadFileResult = (await res.json()) as UploadFileResult;

      if (data?.error) {
        toast.error("Error trying to upload note: " + data.error.message);
      }

      if (!noteId) {
        posthog.capture("note_created_from_editor");
      } else {
        posthog.capture("note_updated");
      }
      
      toast.success("Note saved successfully!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Upload failed. Try again later.");
      console.error("Save error:", error);
    } finally {
      setIsSaving(false);
      setOpen(false);
    }
  }

  return (
    <ResponsiveModal open={open} onOpenChange={setOpen}>
      <ResponsiveModalTrigger asChild>
        <Button disabled={markdown.length < 1}>
          {noteId ? "Update" : "Publish"}
        </Button>
      </ResponsiveModalTrigger>
      <ResponsiveModalContent side="bottom">
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>
            {noteId ? "Edit note" : "Publish note"}
          </ResponsiveModalTitle>
          <ResponsiveModalDescription>
            {noteId
              ? "Update your note's title and slug. You can leave it the same if this is not what you want."
              : "Before saving your note, set a public title and slug for your note."}
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
                    This will be used in the url to access the note. i.e:
                    coonspace.com/note/my-app-tos
                    <br />
                    If a slug is not provided, an automatic one will be
                    generated.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : noteId ? "Update" : "Save"}
            </Button>
          </form>
        </Form>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}

export default SaveNoteModal;
