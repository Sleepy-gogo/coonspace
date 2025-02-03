"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { type UploadFileResult } from "uploadthing/types";
import MarkdownEditor from "~/components/makdown-editor";

interface MarkdownEditorProps {
  initialMarkdown?: string;
}

export default function Page({ initialMarkdown = "" }: MarkdownEditorProps) {
  const router = useRouter();
  const [markdown, setMarkdown] = useState<string>(initialMarkdown);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSaving(true);

    try {
      const formData = new FormData(e.currentTarget);
      formData.set("markdown", markdown);

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
      setMarkdown("");
      router.push("/dashboard");
    } catch {
      toast.error("Upload failed. Try again later.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col container mx-auto gap-4">
      <MarkdownEditor markdown={markdown} setMarkdown={setMarkdown} />
      <div className="flex items-center justify-between border-t border-slate-400 p-4">
        <button
          type="submit"
          disabled={isSaving}
          className="rounded bg-blue-600 px-4 py-2 text-white focus:outline-none"
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
