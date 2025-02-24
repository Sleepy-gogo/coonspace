"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { saveNoteSchema, type SaveNoteFormData } from "~/lib/schemas/note";
import { checkSlugExists, saveNote, updateNote } from "~/lib/services/note";

interface SaveNoteModalProps {
  markdown: string;
  initialTitle?: string;
  initialSlug?: string;
  noteId?: string;
}

/**
 * Modal component for saving or updating notes.
 * Used internally by EditorInterface to handle note persistence.
 *
 * @internal
 * @component
 * @param {Object} props
 * @param {string} props.markdown - Current markdown content to be saved
 * @param {string} [props.initialTitle=""] - Pre-filled title when editing an existing note
 * @param {string} [props.initialSlug=""] - Pre-filled slug when editing an existing note
 * @param {string} [props.noteId=""] - ID of the note being edited, if any
 *
 * @remarks
 * This component handles:
 * - Form validation including async slug uniqueness check
 * - Note creation/update via API
 * - Success/error notifications
 * - Analytics events tracking
 */
function SaveNoteModal({
  markdown,
  initialTitle = "",
  initialSlug = "",
  noteId = "",
}: SaveNoteModalProps) {
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const posthog = usePostHog();

  const validationSchema = useMemo(() => {
    return saveNoteSchema.extend({
      slug: saveNoteSchema.shape.slug.refine(
        async (slug) => {
          if (!slug || slug === initialSlug) return true;
          if (slug.length < 4) return false;
          return !(await checkSlugExists(slug));
        },
        { message: "Slug already in use or too short. (4 characters minimum)" },
      ),
    });
  }, [initialSlug]);

  const form = useForm<SaveNoteFormData>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      title: initialTitle,
      slug: initialSlug,
    },
    mode: "onChange",
  });

  async function onSubmit(values: SaveNoteFormData) {
    if (isSaving) return;
    setIsSaving(true);

    try {
      const formData = new FormData();
      formData.set("markdown", markdown);
      formData.set("title", values.title);
      formData.set("slug", values.slug ?? "");

      const data = await (noteId
        ? updateNote(noteId, formData)
        : saveNote(formData));

      if (data?.error) {
        throw new Error(data.error.message);
      }

      posthog.capture(noteId ? "note_updated" : "note_created_from_editor");
      toast.success("Note saved successfully!");
      router.push("/dashboard");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Upload failed. Try again later.",
      );
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
