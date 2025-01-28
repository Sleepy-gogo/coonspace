import "~/styles/globals.css";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { type Metadata } from "next";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "~/app/api/uploadthing/core";
import { Toaster } from "~/components/ui/sonner";

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
        <head>
          <script
            async
            src="https://unpkg.com/react-scan/dist/auto.global.js"
          ></script>
        </head>
        <body className="bg-slate-900">
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          {children}
          <Toaster theme="dark" />
        </body>
      </html>
    </ClerkProvider>
  );
}
