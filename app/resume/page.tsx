import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/content";
import { ArrowUpRight } from "@/components/icons";
import { ResumePdfViewer } from "@/components/resume/resume-pdf-viewer";

export const metadata: Metadata = {
  title: "Resume",
  description: `${site.name} — ${site.role}. Download or view the full-stack developer resume (PDF).`,
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  const pdf = site.resumePdf;

  return (
    <div className="mx-auto max-w-360 px-5 pb-16 pt-12 sm:px-10 sm:pb-24 sm:pt-16">
      <header className="flex flex-col gap-6 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">Resume</p>
          <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            {site.name}
          </h1>
          <p className="mt-2 text-muted">{site.role}</p>
        </div>
        <Link
          href={pdf}
          download
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent"
        >
          Download PDF
          <ArrowUpRight className="size-4" />
        </Link>
      </header>

      <div className="mt-8 overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
        <ResumePdfViewer src={pdf} />
      </div>

      <p className="mt-6 text-sm text-muted">
        Prefer the system viewer?{" "}
        <Link href={pdf} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4">
          Open the PDF in a new tab
        </Link>
        .
      </p>
    </div>
  );
}
