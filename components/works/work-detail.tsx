"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import type { Work } from "@/lib/works";
import { ArrowUpRight } from "@/components/icons";
import { WorkGallery } from "./work-gallery";

function SectionLabel({ children }: { children: string }) {
  return (
    <h2 className="font-mono text-xs uppercase tracking-[0.28em] text-muted">{children}</h2>
  );
}

function MetaBlock({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-line pt-8">
      <div className="flex items-center gap-2 text-accent">
        <span aria-hidden className="grid size-7 place-items-center rounded-full border border-line bg-surface text-xs">
          {icon}
        </span>
        <h3 className="font-mono text-[11px] uppercase tracking-[0.22em]">{title}</h3>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}



function CaseStudySections({ work }: { work: Work }) {
  return (
    <div className="space-y-10">
      <section>
        <SectionLabel>Overview</SectionLabel>
        <p className="mt-4 text-base leading-[1.75] text-pretty sm:text-lg">{work.description}</p>
      </section>
      <section>
        <SectionLabel>Challenge</SectionLabel>
        <p className="mt-4 leading-relaxed text-muted">{work.challenge}</p>
      </section>
      <section>
        <SectionLabel>Contribution</SectionLabel>
        <ul className="mt-4 space-y-3">
          {work.contribution.map((c) => (
            <li key={c} className="flex gap-3 leading-relaxed text-muted">
              <span className="text-accent" aria-hidden>
                —
              </span>
              {c}
            </li>
          ))}
        </ul>
      </section>
      {work.impact.length > 0 && (
        <section>
          <SectionLabel>Impact</SectionLabel>
          <ul className="mt-4 space-y-2 font-display text-xl font-semibold tracking-tight">
            {work.impact.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export function WorkDetail({ work }: { work: Work }) {
  const hero = useRef<HTMLElement>(null);
  const galleryImages = work.gallery?.length ? work.gallery : work.cover ? [work.cover] : [];

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !hero.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-detail-in]", {
        y: 36,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.08,
      });
    }, hero);
    return () => ctx.revert();
  }, [work.slug]);

  return (
    <article ref={hero}>
      <header
        className="border-b border-line"
        style={{
          background: `radial-gradient(75% 55% at 0% 0%, hsl(${work.hue} 55% 42% / 0.18), transparent 62%)`,
        }}
      >
        <div className="mx-auto max-w-360 px-5 py-14 sm:px-10 sm:py-20 lg:py-24">
          <nav data-detail-in aria-label="Breadcrumb" className="font-mono text-sm text-muted">
            <Link href="/works" className="cursor-pointer transition-colors hover:text-foreground">
              Works
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{work.name}</span>
          </nav>
          <p
            data-detail-in
            className="mt-8 font-mono text-xs uppercase tracking-[0.28em] text-accent"
          >
            {work.category} · {work.year}
          </p>
          <h1
            data-detail-in
            className="font-display mt-4 max-w-4xl text-[clamp(2.75rem,8vw,4.5rem)] font-semibold leading-[1.02] tracking-tight"
          >
            {work.name}
          </h1>
          <p data-detail-in className="mt-5 max-w-2xl text-lg text-muted sm:text-xl">
            {work.tagline}
          </p>
          {work.live && (
            <Link
              data-detail-in
              href={work.live}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium shadow-sm transition-colors hover:border-accent"
            >
              Live site <ArrowUpRight className="size-4" />
            </Link>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-360 px-5 py-14 sm:px-10 sm:py-20 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)] lg:gap-16 xl:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Link
              href="/works"
              className="inline-flex cursor-pointer items-center gap-2 font-mono text-sm italic text-muted transition-colors hover:text-foreground"
            >
              ← Back
            </Link>

            <div className="mt-10">
              <CaseStudySections work={work} />
            </div>

            {work.live && (
              <MetaBlock icon="↗" title="Links">
                <Link
                  href={work.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors hover:border-accent"
                >
                  Visit site
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </MetaBlock>
            )}
          </div>

          <div className="min-w-0 lg:pt-0">
            <SectionLabel>Screens</SectionLabel>
            <div className="mt-5">
              <WorkGallery images={galleryImages} />
            </div>
            <p className="mt-10 font-mono text-xs italic text-muted">
              <Link
                href="/works"
                className="transition-colors hover:text-accent"
              >
                View more projects
              </Link>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
