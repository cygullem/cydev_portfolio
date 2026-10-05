"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { m, useReducedMotion } from "motion/react";
import type { Work } from "@/lib/works";
import { works } from "@/lib/works";
import { ArrowUpRight } from "@/components/icons";

export function WorkDetail({ work }: { work: Work }) {
  const hero = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const related = works.filter((w) => w.slug !== work.slug && w.category === work.category).slice(0, 2);

  useEffect(() => {
    if (reduce || !hero.current) return;
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
  }, [reduce, work.slug]);

  return (
    <article ref={hero}>
      <div className="border-b border-line">
        <div
          className="mx-auto max-w-[90rem] px-5 py-16 sm:px-10 sm:py-24"
          style={{
            background: `radial-gradient(70% 50% at 0% 0%, hsl(${work.hue} 65% 45% / 0.2), transparent 60%)`,
          }}
        >
          <nav data-detail-in aria-label="Breadcrumb" className="font-mono text-sm text-muted">
            <Link href="/works" className="cursor-pointer hover:text-foreground">
              Works
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{work.name}</span>
          </nav>
          <p data-detail-in className="mt-8 font-mono text-xs uppercase tracking-[0.25em] text-accent">
            {work.category} · {work.year}
          </p>
          <h1 data-detail-in className="font-display mt-4 max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            {work.name}
          </h1>
          <p data-detail-in className="mt-6 max-w-2xl text-xl text-muted">{work.tagline}</p>
          {work.live && (
            <a
              data-detail-in
              href={work.live}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent"
            >
              Live site <ArrowUpRight />
            </a>
          )}
        </div>
      </div>

      <div className="mx-auto grid max-w-[90rem] gap-16 px-5 py-16 sm:px-10 lg:grid-cols-[1fr_22rem] lg:gap-20 lg:py-24">
        <div className="space-y-12">
          <section>
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted">Overview</h2>
            <p className="mt-4 text-lg leading-relaxed text-pretty">{work.description}</p>
          </section>
          <section>
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted">Challenge</h2>
            <p className="mt-4 leading-relaxed">{work.challenge}</p>
          </section>
          <section>
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted">Contribution</h2>
            <ul className="mt-4 space-y-2">
              {work.contribution.map((c) => (
                <li key={c} className="flex gap-3 leading-relaxed">
                  <span className="text-accent">—</span>
                  {c}
                </li>
              ))}
            </ul>
          </section>
          {work.impact.length > 0 && (
            <section>
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted">Impact</h2>
              <ul className="mt-4 space-y-2 font-display text-xl font-semibold">
                {work.impact.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <m.div
            initial={reduce ? false : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl border border-line bg-surface p-6"
          >
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent">Frontend</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {work.frontend.map((t) => (
                <li key={t} className="rounded-md border border-line px-2.5 py-1 font-mono text-xs">
                  {t}
                </li>
              ))}
            </ul>
          </m.div>
          <m.div
            initial={reduce ? false : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="rounded-2xl border border-line bg-surface p-6"
          >
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent">Backend</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {work.backend.map((t) => (
                <li key={t} className="rounded-md border border-line px-2.5 py-1 font-mono text-xs">
                  {t}
                </li>
              ))}
            </ul>
          </m.div>
        </aside>
      </div>

      {related.length > 0 && (
        <div className="border-t border-line bg-surface/30 py-16">
          <div className="mx-auto max-w-[90rem] px-5 sm:px-10">
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted">Related</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/works/${r.slug}`}
                    className="block cursor-pointer rounded-xl border border-line p-6 transition-colors hover:border-accent/50"
                  >
                    <p className="font-display text-xl font-semibold">{r.name}</p>
                    <p className="mt-1 text-sm text-muted">{r.tagline}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </article>
  );
}
