import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "CoonSpace | Online Markdown Sharing",
  description:
    "CoonSpace is a fast and easy way to share markdown documents online",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  keywords: ["markdown", "documents", "sharing", "online", "fast", "easy"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        userButton: {
          elements: {
            userButtonAvatarBox: "size-10",
          },
        },
      }}
    >
      <html lang="en">
        <body className="bg-slate-900">{children}</body>
      </html>
    </ClerkProvider>
  );
}
