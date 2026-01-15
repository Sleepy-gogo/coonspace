"use client";

import { ArrowRight, Github, CornerDownRight } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import Background from "~/components/background";
import MiniPreview from "~/components/mini-preview";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <>
      <main className="relative">
        <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-32 pt-40">
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="font-[family-name:var(--font-plus-jakarta)] text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
            >
              <span className="text-white">Share </span>
              <span className="text-gradient">Beautiful</span>
              <br />
              <span className="text-white">Notes, </span>
              <span className="text-gradient">Instantly</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="mx-auto mt-10 max-w-xl text-lg text-slate-300 sm:text-xl"
            >
              The free and open-source way to share markdown across the web.
              <br />
              <span className="text-slate-400">
                No sign-up required for viewers.
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="mt-12 flex flex-wrap items-center justify-center gap-4"
            >
              <Button variant="primary" size="lg" asChild>
                <Link href="/dashboard">
                  Get Started <ArrowRight className="ml-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a
                  href="https://github.com/sleepy-gogo/coonspace"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2" />
                  View on GitHub
                </a>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
            className="relative mt-24 w-full max-w-5xl px-4"
          >
            <div className="absolute -top-14 xl:-left-[10%] xl:top-[50%] hidden items-end gap-1 lg:flex flex-row-reverse xl:flex-row">
              <p className="-rotate-6 font-[family-name:var(--font-caveat)] text-3xl text-white/80">
                Try it now!
              </p>
              <CornerDownRight className="size-7 translate-y-3 xl:translate-y-4 xl:-translate-x-7 rotate-[85deg] xl:-rotate-12 text-white/60" />
            </div>

            <div className="preview-frame overflow-hidden rounded-2xl">
              <MiniPreview />
            </div>
          </motion.div>
        </section>

        <section className="relative py-40">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Ready to share your ideas?
              </h2>
              <p className="mt-8 text-lg text-slate-400">
                Start writing in seconds. Free and open source forever.
              </p>
              <div className="mt-12">
                <Button variant="primary" size="lg" asChild>
                  <Link href="/dashboard">
                    Start Writing <ArrowRight className="ml-1" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Background />
    </>
  );
}
