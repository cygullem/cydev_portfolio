"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { site } from "@/lib/content";
import { featuredWorks } from "@/lib/works";

const stack = featuredWorks.slice(0, 3);

export function HeroStage() {
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !stage.current) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-stage-card]", {
        y: 48,
        opacity: 0,
        rotateX: 8,
        duration: 1,
        ease: "power3.out",
        stagger: 0.14,
        delay: 0.7,
        transformPerspective: 800,
      });
      gsap.to("[data-stage-card]", {
        y: -10,
        duration: 2.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.35, from: "end" },
      });
    }, stage);

    return () => ctx.revert();
  }, []);

  const offsets = [
    "right-10 top-2 z-10 opacity-75",
    "right-5 top-14 z-20 opacity-90",
    "right-0 top-[7rem] z-30",
  ];

  return (
    <aside
      ref={stage}
      aria-label="Featured work previews"
      className="relative hidden min-h-88 lg:block xl:min-h-104"
    >
      <div
        aria-hidden
        className="absolute inset-0 rounded-2xl border border-line bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_at_center,black,transparent_72%)]"
      />

      <div className="absolute left-0 top-6 max-w-44 rounded-xl border border-line bg-surface/90 p-4 font-mono text-[11px] leading-5 backdrop-blur-md">
        <p className="text-muted">
          <span className="text-accent">$</span> whoami
        </p>
        <p className="truncate text-foreground">{site.role.toLowerCase()}</p>
        <p className="mt-3 text-muted">
          <span className="text-accent">$</span> location
        </p>
        <p className="truncate">{site.location}</p>
        <p className="mt-3 text-muted">
          <span className="text-accent">$</span> stack
        </p>
        <p className="truncate">{site.stack}</p>
      </div>

      <div className="relative ml-auto h-80 w-[min(100%,20rem)] xl:h-88 xl:w-88">
        {stack.map((work, i) => (
          <Link
            key={work.slug}
            href={`/works/${work.slug}`}
            data-stage-card
            className={`group absolute block w-full cursor-pointer overflow-hidden rounded-xl border border-line bg-surface shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)] transition-[box-shadow,transform] hover:shadow-[0_28px_70px_-18px_color-mix(in_oklab,var(--accent)_35%,transparent)] ${offsets[i]}`}
            style={{
              transformOrigin: "center top",
              backgroundImage: `radial-gradient(90% 70% at 10% 0%, hsl(${work.hue} 70% 45% / 0.25), transparent 65%)`,
            }}
          >
            <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
              <span className="size-2 rounded-full bg-line" />
              <span className="size-2 rounded-full bg-line" />
              <span className="size-2 rounded-full bg-line" />
              <span className="ml-auto font-mono text-[10px] text-muted">{work.category}</span>
            </div>
            <div className="p-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">{work.year}</p>
              <p className="font-display mt-1 text-xl font-semibold tracking-tight">{work.name}</p>
              <p className="mt-1 line-clamp-2 text-sm text-muted">{work.tagline}</p>
              <p className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                View case study →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
