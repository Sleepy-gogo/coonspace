import EditorInterface from "~/components/editor-interface";

export const metadata = {
  title: "New Note | Coonspace",
  description:
    "Create a new note on Coonspace!\n\nOnline Markdown sharing, fast and easy.",
  openGraph: {
    title: "New Note | Coonspace",
    description:
      "Create a new note on Coonspace!\n\nOnline Markdown sharing, fast and easy.",
    url: "https://sgcoon.space/new",
    siteName: "CoonSpace",
    images: [
      {
        url: "https://sgcoon.space/site.png",
        width: 1200,
        height: 630,
        alt: "New Note - Coonspace",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "New Note | Coonspace",
    description:
      "Create a new note on Coonspace!\n\nOnline Markdown sharing, fast and easy.",
    images: ["https://sgcoon.space/site.png"],
    site: "@sleepygogo",
    creator: "@sleepygogo"
  }
};

export default function Page() {
  return (
      <EditorInterface />
  );
}
