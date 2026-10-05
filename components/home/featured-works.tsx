"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { m, useReducedMotion } from "motion/react";
import { featuredWorks, works } from "@/lib/works";
import { ArrowUpRight } from "@/components/icons";

export function FeaturedWorks() {
  const grid = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !grid.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from("[data-work-card]", {
        y: 80,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: grid.current, start: "top 85%" },
      });
    }, grid);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section id="work" aria-labelledby="featured-work-title" className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">Selected</p>
            <h2 id="featured-work-title" className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Recent product work
            </h2>
          </div>
          <Link
            href="/works"
            className="group inline-flex cursor-pointer items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-foreground"
          >
            All {works.length} projects
            <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div ref={grid} className="mt-16 grid gap-6 lg:grid-cols-12 lg:gap-8">
          {featuredWorks.map((work, i) => (
            <m.article
              key={work.slug}
              data-work-card
              whileHover={reduce ? undefined : { y: -6 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={`group relative overflow-hidden rounded-2xl border border-line bg-surface ${
                i === 0 ? "lg:col-span-7 lg:row-span-2" : "lg:col-span-5"
              }`}
            >
              <Link href={`/works/${work.slug}`} className="flex h-full min-h-[280px] cursor-pointer flex-col p-6 sm:p-8">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-40 transition-opacity group-hover:opacity-60"
                  style={{
                    background: `radial-gradient(80% 60% at 20% 0%, hsl(${work.hue} 70% 50% / 0.35), transparent 70%)`,
                  }}
                />
                <div className="relative flex flex-1 flex-col">
                  <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display mt-auto text-3xl font-semibold tracking-tight sm:text-4xl">{work.name}</h3>
                  <p className="mt-2 text-muted">{work.tagline}</p>
                  <p className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                    Case study <ArrowUpRight />
                  </p>
                </div>
              </Link>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  );
}
