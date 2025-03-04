import { Github } from "lucide-react";
import { Button } from "~/components/ui/button";

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 text-white">
      <h1 className="mb-8 text-center text-4xl font-bold md:text-5xl">
        Contact CoonSpace
      </h1>

      <p className="mb-12 text-center">
        Thank you for your interest in CoonSpace! We&apos;d love to hear from
        you. Whether you have questions, feedback, bug reports, or just want to
        say hello, please feel free to reach out.
      </p>

      <h2 className="mb-4 mt-6 text-center text-3xl font-bold">
        Contribute and Get Involved
      </h2>
      <p className="mb-4 text-center">
        CoonSpace is an open-source project, and we welcome contributions from
        the community! If you&apos;re interested in contributing code,
        suggesting features, reporting issues, or getting involved in any way,
        please visit our GitHub repository:
      </p>
      <p className="mb-4 flex justify-center">
        <Button
          variant="outline"
          size="default"
          className="border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-slate-100"
          asChild
        >
          <a
            href="https://github.com/sleepy-gogo/coonspace"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
            CoonSpace
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </Button>
      </p>

      <p className="mb-12 text-center">
        We appreciate your support and look forward to connecting with you!
      </p>

      <h2 className="mb-4 mt-6 text-center text-3xl font-bold">
        Contact Information
      </h2>
      <p className="mb-4 text-center">
        If you need further support, or are in need to contact me, feel free to <a
          href={`mailto:${"axelcastano@proton.me"}`}
          className="text-blue-500 underline hover:no-underline"
        >
          Email me
        </a> directly. I aim to respond to emails as promptly as possible, but please allow
        for some time for a response.
      </p>
    </div>
  );
}
