import { Code, Github, Share2, Zap } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';
import Background from "~/components/background";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <>
      <main className="flex flex-col gap-32 pb-24 lg:gap-40">
        <div className="mx-auto flex max-w-md flex-col items-center justify-center gap-8 px-6 pt-36 sm:max-w-2xl sm:px-8 md:max-w-3xl md:px-10 md:pt-48 lg:max-w-4xl lg:px-4 xl:max-w-5xl 2xl:max-w-6xl">
          <div className="flex flex-col gap-6">
            <h1 className="text-center text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-[4rem] xl:text-[6rem] 2xl:text-[6.5rem]">
              Share <span className="text-violet-400">Beautiful</span>
              <br />
              Notes, <span className="text-blue-500">Instantly</span>
            </h1>
            <p className="text-center text-xl italic text-slate-200">
              The free and open-source solution for sharing markdown across the
              web.
            </p>
          </div>

          <Button className="transition-all hover:shadow-md" size="lg">
            Get started!
          </Button>
        </div>

        <section>
          <div className="mx-auto flex w-full max-w-screen-lg flex-col gap-4 px-4">
            <div className="mt-6 flex w-full flex-col gap-6 sm:flex-row sm:flex-wrap sm:justify-center lg:flex-nowrap">
              <div className="group flex flex-col items-center rounded-lg border border-blue-200/20 bg-blue-800/20 p-6 shadow-sm transition-colors hover:border-blue-200/40 hover:bg-blue-700/30 hover:shadow-lg sm:w-[48%] md:w-[31%]">
                <div className="mb-4 rounded-full bg-violet-500/20 p-4">
                  <Code className="size-8 text-violet-400" />
                </div>
                <h3 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-200/95 group-hover:text-white">
                  Write in Markdown
                </h3>
                <p className="mt-2 text-center font-semibold text-slate-300">
                  Create your content using simple Markdown syntax with our
                  built-in editor
                </p>
              </div>
              <div className="group flex flex-col items-center rounded-lg border border-blue-200/20 bg-blue-800/20 p-6 shadow-sm transition-colors hover:border-blue-200/40 hover:bg-blue-700/30 hover:shadow-lg sm:w-[48%] md:w-[31%]">
                <div className="mb-4 rounded-full bg-blue-500/20 p-4">
                  <Zap className="size-8 text-blue-400" />
                </div>
                <h3 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-200/95 group-hover:text-white">
                  Instant Preview
                </h3>
                <p className="mt-2 text-center font-semibold text-slate-300">
                  See your formatted content in real-time as you type
                </p>
              </div>
              <div className="group flex flex-col items-center rounded-lg border border-blue-200/20 bg-blue-800/20 p-6 shadow-sm transition-colors hover:border-blue-200/40 hover:bg-blue-700/30 hover:shadow-lg sm:w-[48%] md:w-[31%]">
                <div className="mb-4 rounded-full bg-green-500/20 p-4">
                  <Share2 className="size-8 text-green-400" />
                </div>
                <h3 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-200/95 group-hover:text-white">
                  Share Anywhere
                </h3>
                <p className="mt-2 text-center font-semibold text-slate-300">
                  Generate a link and share your content with anyone, anywhere
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold text-white">
            Powerful Features, Simple Interface
          </h2>
          <div className="grid gap-16 lg:grid-cols-2">
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-4">
                <div className="overflow-hidden rounded-lg border border-slate-200/20 bg-slate-800/50 shadow-lg">
                  <Image
                    height={720}
                    width={1240}
                    src="/screenshots/editor.webp"
                    alt="CoonSpace Editor Interface"
                    className="aspect-video w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="mb-2 text-2xl font-bold text-white">
                    Powerful Markdown Editor
                  </h3>
                  <p className="text-lg text-slate-300">
                    Write in Markdown with syntax highlighting, live preview,
                    and support for tables, code blocks, and more.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="overflow-hidden rounded-lg border border-slate-200/20 bg-slate-800/50 shadow-lg">
                  <Image
                    height={300}
                    width={600}
                    src="/screenshots/note.webp"
                    alt="CoonSpace Note Interface"
                    className="aspect-video w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="mb-2 text-2xl font-bold text-white">
                    One-Click Sharing
                  </h3>
                  <p className="text-lg text-slate-300">
                    Share your documents instantly with a unique, shareable
                    link. No sign-up required for viewers.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-4">
                <div className="overflow-hidden rounded-lg border border-slate-200/20 bg-slate-800/50 shadow-lg">
                  <Image
                    height={720}
                    width={1240}
                    src="/screenshots/syntax.webp"
                    alt="CoonSpace Syntax Highlight"
                    className="aspect-video w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="mb-2 text-2xl font-bold text-white">
                    Beautiful Syntax Highlighting
                  </h3>
                  <p className="text-lg text-slate-300">
                    Code blocks are automatically highlighted with support for
                    numerous programming languages.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="overflow-hidden rounded-lg border border-slate-200/20 bg-slate-800/50 shadow-lg">
                  <Image
                    height={720}
                    width={1240}
                    src="/screenshots/dashboard.webp"
                    alt="CoonSpace Dashboard"
                    className="aspect-video w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="mb-2 text-2xl font-bold text-white">
                    Organized Dashboard
                  </h3>
                  <p className="text-lg text-slate-300">
                    Keep track of all your documents in one place with our
                    intuitive dashboard interface.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container mx-auto grid h-80 place-items-center">
          <div className="text-center">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Ready to Start Sharing?
            </h2>
            <p className="mb-8 text-xl text-slate-300">
              Join the community and start sharing your markdown documents
              today.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/dashboard">
                  Get Started for Free
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <a
                  href="https://github.com/sleepy-gogo/coonspace"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="size-5" />
                  View on GitHub
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Background />
    </>
  );
}
