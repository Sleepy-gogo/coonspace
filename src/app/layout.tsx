import "~/styles/globals.css";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { type Metadata } from "next";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "~/app/api/uploadthing/core";
import { Toaster } from "~/components/ui/sonner";
import { CSPostHogProvider } from "./providers";
import Header from "~/components/header";
import { Footer } from "~/components/footer";
import BottomGradient from "~/components/background/bottom-gradient";

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
        <body className="bg-slate-900">
          <CSPostHogProvider>
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            <div className="relative min-h-screen w-[100dvw] overflow-hidden">
              <Header />
              {children}
              <BottomGradient />
              <Footer />
            </div>
            <Toaster theme="dark" />
          </CSPostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
