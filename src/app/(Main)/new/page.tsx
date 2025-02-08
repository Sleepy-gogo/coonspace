import { Suspense } from "react";
import EditorInterface, {
  EditorInterfaceSkeleton,
} from "~/components/editor-interface";

export const metadata = {
  title: "New Note | Coonspace",
  description:
    "Create a new note on Coonspace!\n\nOnline Markdown sharing, fast and easy.",
};

export default function Page() {
  return (
    <Suspense fallback={<EditorInterfaceSkeleton />}>
      <EditorInterface />
    </Suspense>
  );
}
