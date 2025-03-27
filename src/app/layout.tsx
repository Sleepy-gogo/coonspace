import "~/styles/globals.css";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";
import { dark } from "@clerk/themes";
import { type Metadata } from "next";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "~/app/api/uploadthing/core";
import { Toaster } from "~/components/ui/sonner";
import { CSPostHogProvider } from "./providers";

export const metadata: Metadata = {
  title: "CoonSpace | Online Markdown Sharing & Collaboration",
  description:
    "CoonSpace is a fast, easy, and collaborative platform to share, edit, and manage your markdown documents online. Perfect for developers, writers, and teams.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  keywords: [
    "markdown",
    "documents",
    "sharing",
    "online",
    "editing",
    "developers",
    "writers",
    "notes",
    "knowledge base",
    "plain text",
    "web editor",
    "realtime",
    "free",
    "fast",
    "easy",
    "style",
    "text"
  ],
  openGraph: {
    title: "CoonSpace | Online Markdown Sharing & Collaboration",
    description:
      "Share, edit, and collaborate on markdown documents online with CoonSpace. Boost your team's productivity with our fast and easy platform.",
    url: "https://sgcoon.space/",
    siteName: "CoonSpace",
    images: [
      {
        url: "https://sgcoon.space/site.png",
        width: 1200,
        height: 630,
        alt: "CoonSpace - Online Markdown Sharing",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CoonSpace | Online Markdown Sharing & Collaboration",
    description:
      "Share, edit, and collaborate on markdown documents online with CoonSpace.",
    site: "@sleepygogo",
    creator: "@sleepygogo",
    images: ["https://sgcoon.space/site.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": 200,
      "max-image-preview": "standard",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#64748b", // slate-500
          colorText: "#f1f5f9", // slate-100
          colorTextSecondary: "#cbd5e1", // slate-300
          colorBackground: "#0f172b", // deep space blue (darker than slate-900)
          colorInputBackground: "#1e293b", // slate-800
          colorInputText: "#f8fafc", // slate-50
          colorDanger: "#ef4444", // red-500
          colorSuccess: "#10b981", // emerald-500
          colorWarning: "#f59e0b", // amber-500
        },
        elements: {
          card: "border border-slate-700 shadow-xl bg-slate-800/80 backdrop-blur-md",
          navbar: "bg-slate-900 border-b border-slate-800",
          headerTitle: "text-slate-100",
          headerSubtitle: "text-slate-400",
          socialButtonsIconButton:
            "bg-slate-800 hover:bg-slate-700 border-slate-700",
          socialButtonsBlockButton:
            "bg-slate-800 hover:bg-slate-700 border-slate-700",
          formButtonPrimary:
            "bg-slate-500 hover:bg-slate-400 text-white shadow-md",
          formButtonReset: "text-slate-400 hover:text-slate-300",
          formFieldLabel: "text-slate-300",
          formFieldInput:
            "bg-slate-800/70 border-slate-700/50 text-slate-100 focus:border-slate-500",
          footerActionLink: "text-slate-400 hover:text-slate-300",
          identityPreview: "bg-slate-800 border-slate-700",
          userButtonAvatarBox: "size-10",
          userButtonPopoverCard:
            "bg-slate-800/90 backdrop-blur-md border border-slate-700/50 shadow-xl",
          userButtonPopoverActionButton: "text-slate-300 hover:bg-slate-700",
          userButtonPopoverActionButtonIcon: "text-slate-400",
          userButtonPopoverFooter: "border-t border-slate-700/50",
          avatarBox: "border-2 border-slate-500",
          badge: "bg-slate-700 text-slate-200",
          alert: "bg-slate-800 border border-slate-700 text-slate-300",
          alertText: "text-slate-300",
          alertIcon: "text-slate-400",
          breadcrumbsItem: "text-slate-400",
          breadcrumbsItemDivider: "text-slate-600",
          otpCodeFieldInput: "bg-slate-800 border-slate-700 text-slate-100",
          cardBox: "shadow-none border-none",
        },
        layout: {
          socialButtonsVariant: "iconButton",
          socialButtonsPlacement: "bottom",
          termsPageUrl: "https://sgcoon.space/terms",
          privacyPageUrl: "https://sgcoon.space/privacy",
          helpPageUrl: "https://sgcoon.space/contact",
        },
      }}
    >
      <html lang="en" className={GeistSans.className}>
        <body className="bg-slate-900">
          <CSPostHogProvider>
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            <div className="relative min-h-screen w-[100dvw] overflow-hidden">
              {children}
            </div>
            <Toaster theme="dark" />
          </CSPostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
