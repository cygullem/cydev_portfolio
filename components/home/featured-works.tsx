"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Work } from "@/lib/works";
import { featuredWorks, works } from "@/lib/works";
import { ArrowUpRight } from "@/components/icons";

function workTags(work: Work): [string, string] {
  const primary = work.category === "SaaS" ? "SaaS" : work.category;
  const secondary = work.tagline.replace(/\.$/, "").split(" ").slice(-2).join(" ");
  return [primary, secondary.charAt(0).toUpperCase() + secondary.slice(1)];
}

function PlaceholderPreview({ hue }: { hue: number }) {
  return (
    <div
      aria-hidden
      className="relative aspect-4/3 w-full overflow-hidden bg-[#dce9f2]"
      style={{
        background: `linear-gradient(165deg, hsl(${hue} 35% 92%) 0%, hsl(${hue} 28% 82%) 45%, hsl(${hue} 22% 74%) 100%)`,
      }}
    >
      <div
        className="absolute inset-x-0 bottom-0 h-[38%] opacity-90"
        style={{
          background: `repeating-linear-gradient(
            90deg,
            hsl(${hue} 25% 78%) 0px,
            hsl(${hue} 25% 78%) 3px,
            hsl(${hue} 30% 84%) 3px,
            hsl(${hue} 30% 84%) 14px
          )`,
        }}
      />
      <div className="absolute inset-x-[10%] top-[14%] bottom-[28%] rounded-md border border-white/50 bg-linear-to-b from-[#f8fafc] to-[#e2e8f0] shadow-[0_24px_48px_-12px_rgba(15,23,42,0.25)]">
        <div className="flex h-5 items-center gap-1 border-b border-[#e2e8f0] px-2">
          <span className="size-1.5 rounded-full bg-[#cbd5e1]" />
          <span className="size-1.5 rounded-full bg-[#cbd5e1]" />
          <span className="size-1.5 rounded-full bg-[#cbd5e1]" />
        </div>
        <div className="p-3">
          <div className="h-2 w-2/5 rounded-full bg-[#cbd5e1]" />
          <div className="mt-2 h-2 w-3/5 rounded-full bg-[#e2e8f0]" />
          <div className="mt-6 grid grid-cols-3 gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-sm bg-[#e2e8f0]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const showcase = featuredWorks.slice(0, 4);

export function FeaturedWorks() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from("[data-work-card]", {
        y: 56,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: "[data-work-grid]", start: "top 88%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={root}
      aria-labelledby="featured-work-title"
      className="overflow-hidden border-t border-line bg-[#f6f7f8] py-20 sm:py-28"
    >
      <div className="@container mx-auto max-w-360 px-5 sm:px-10">
        <h2
          id="featured-work-title"
          className="relative z-10 flex w-full items-baseline justify-between gap-[min(4vw,2rem)] whitespace-nowrap leading-[0.88] tracking-tighter"
        >
          <span className="font-featured-serif text-[clamp(3.5rem,16cqw,12rem)] italic text-[#b8bcc4]">
            Featured
          </span>
          <span className="font-display text-[clamp(3.25rem,15.5cqw,11.5rem)] font-medium lowercase text-[#5c6570]">
            works
          </span>
        </h2>

        <div data-work-grid className="relative z-20 -mt-4 grid gap-5 sm:-mt-8 sm:grid-cols-2 sm:gap-6 lg:gap-8">
          {showcase.map((work) => {
            const [tagA, tagB] = workTags(work);
            return (
              <article
                key={work.slug}
                data-work-card
                className="overflow-hidden rounded-2xl bg-white shadow-[0_20px_50px_-28px_rgba(15,23,42,0.18)] transition-shadow hover:shadow-[0_28px_60px_-24px_rgba(15,23,42,0.22)]"
              >
                <Link href={`/works/${work.slug}`} className="group block cursor-pointer">
                  <PlaceholderPreview hue={work.hue} />
                  <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-6">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-[#1e293b] transition-colors group-hover:text-[#0f172a] sm:text-2xl">
                      {work.name}
                    </h3>
                    <div className="flex shrink-0 items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-[#64748b] sm:text-xs">
                      <span>{tagA}</span>
                      <span aria-hidden className="h-px w-10 bg-[#cbd5e1] sm:w-16" />
                      <span>{tagB}</span>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>

        <div className="relative z-30 mt-12 flex justify-center sm:mt-14">
          <Link
            href="/works"
            className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#94a3b8] bg-white px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-[#334155] shadow-[0_8px_24px_-12px_rgba(15,23,42,0.2)] transition-colors hover:border-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
          >
            View all projects ({works.length})
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
