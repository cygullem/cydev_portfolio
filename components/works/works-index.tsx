"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { works, type Work } from "@/lib/works";
import { ArrowUpRight } from "@/components/icons";

const categories = ["All", "SaaS", "E-commerce", "Mobile", "Marketing"] as const;

export function WorksIndex() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const list = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();

  const filtered =
    filter === "All" ? works : works.filter((w) => w.category === filter);

  useEffect(() => {
    if (reduce || !list.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-work-row]",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: list.current, start: "top 90%" },
        },
      );
    }, list);
    return () => ctx.revert();
  }, [filter, reduce]);

  return (
    <div className="mx-auto max-w-[90rem] px-5 pb-24 pt-12 sm:px-10 sm:pt-16">
      <header className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">Archive</p>
        <h1 className="font-display mt-4 text-5xl font-semibold tracking-tight sm:text-7xl">Works</h1>
        <p className="mt-6 text-lg text-muted">
          SaaS, commerce, and mobile products — interfaces I helped design, build, and ship with product teams.
        </p>
      </header>

      <ul className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
        {categories.map((c) => (
          <li key={c}>
            <button
              type="button"
              role="tab"
              aria-selected={filter === c}
              onClick={() => setFilter(c)}
              className={`cursor-pointer rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                filter === c ? "border-accent bg-accent/10 text-foreground" : "border-line text-muted hover:border-foreground/30"
              }`}
            >
              {c}
            </button>
          </li>
        ))}
      </ul>

      <ul ref={list} className="mt-12 divide-y divide-line border-y border-line">
        {filtered.map((work: Work, i) => (
          <li key={work.slug} data-work-row>
            <Link
              href={`/works/${work.slug}`}
              className="group grid cursor-pointer gap-4 py-8 transition-colors hover:bg-surface/50 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-8 sm:px-4"
            >
              <span className="font-mono text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="font-display text-2xl font-semibold tracking-tight transition-transform group-hover:translate-x-1 sm:text-3xl">
                  {work.name}
                </p>
                <p className="mt-1 text-muted">{work.tagline}</p>
                <p className="mt-3 font-mono text-xs text-muted">
                  {work.category} · {work.year}
                </p>
              </div>
              <span className="inline-flex items-center gap-2 font-mono text-sm text-accent opacity-70 transition-opacity group-hover:opacity-100">
                Open
                <ArrowUpRight />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
