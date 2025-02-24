import { Coffee, Share2, SquareChevronRight } from "lucide-react";
import Background from "~/components/background";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <>
      <main className="flex flex-col gap-32 lg:gap-40">
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
          <div className="mx-auto w-full max-w-screen-lg px-4">
            <div className="mt-6 flex w-full flex-col gap-6 sm:flex-row sm:flex-wrap sm:justify-center lg:flex-nowrap">
              <div className="group rounded-lg border border-slate-200/20 bg-slate-800/50 p-6 shadow-sm transition-colors hover:border-slate-200/40 hover:bg-slate-700/30 hover:shadow-lg sm:w-[48%] md:w-[31%]">
                <h3 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-200/95 group-hover:text-white">
                  <SquareChevronRight className="mt-0.5" />
                  Create
                </h3>
                <p className="mt-2 font-semibold text-slate-300">
                  Use our markdown editor to create markdown documents online.
                </p>
              </div>
              <div className="group rounded-lg border border-slate-200/20 bg-slate-800/50 p-6 shadow-sm transition-colors hover:border-slate-200/40 hover:bg-slate-700/30 hover:shadow-lg sm:w-[48%] md:w-[31%]">
                <h3 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-200/95 group-hover:text-white">
                  <Share2 className="mt-0.5 size-6" />
                  Share
                </h3>
                <p className="mt-2 font-semibold text-slate-300">
                  Share your markdown documents with anyone by simply sharing
                  the link.
                </p>
              </div>
              <div className="group rounded-lg border border-slate-200/20 bg-slate-800/50 p-6 shadow-sm transition-colors hover:border-slate-200/40 hover:bg-slate-700/30 hover:shadow-lg sm:w-[48%] md:w-[31%]">
                <h3 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-200/95 group-hover:text-white">
                  <Coffee className="mt-0.5 size-6" />
                  Open
                </h3>
                <p className="mt-2 font-semibold text-slate-300">
                  Fully free and open-source project, built by the community for
                  everyone
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>Add screenshots of the app here</section>
      </main>
      <Background />
    </>
  );
}
