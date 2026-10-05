"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { highlights, site } from "@/lib/content";
import { works } from "@/lib/works";
import { GitHub, LinkedIn, Mail } from "@/components/icons";
import { HeroStage } from "./hero-stage";

const socials = [
  { href: site.github, label: "GitHub", Icon: GitHub },
  { href: site.linkedin, label: "LinkedIn", Icon: LinkedIn },
  { href: `mailto:${site.email}`, label: "Email", Icon: Mail },
];

export function HeroScene() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !root.current) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-hero-line]", {
        yPercent: 110,
        opacity: 0,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.12,
        delay: 0.15,
      });
      gsap.from("[data-hero-fade]", {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.55,
      });
      gsap.from("[data-hero-glow]", {
        scale: 0.8,
        opacity: 0,
        duration: 1.4,
        ease: "power2.out",
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const marqueeItems = [...works.map((w) => w.name), ...works.map((w) => w.name)];

  return (
    <section ref={root} aria-labelledby="hero-title" className="relative -mt-[4.5rem] overflow-hidden pt-[4.5rem]">
      <div
        data-hero-glow
        aria-hidden
        className="pointer-events-none absolute -left-1/4 top-0 -z-10 h-[32rem] w-[70%] rounded-full bg-[radial-gradient(circle,var(--glow),transparent_65%)] blur-3xl"
      />
      <div className="mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-[90rem] grid-rows-[1fr_auto] gap-12 px-5 pb-10 pt-12 sm:px-10 sm:pt-16 lg:pt-20">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_minmax(0,26rem)] xl:grid-cols-[1fr_28rem] xl:gap-14">
        <div className="flex flex-col justify-end">
          <p data-hero-fade className="mb-8 inline-flex w-fit items-center gap-2 border border-line bg-surface/80 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-muted backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden />
            {site.status.replaceAll("_", " ")}
          </p>

          <h1 id="hero-title" className="font-display max-w-[14ch] text-[clamp(2.75rem,8vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
            <span className="block overflow-hidden">
              <span data-hero-line className="block">Interfaces</span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-line className="block text-muted">engineered</span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-line className="block">
                to <span className="text-accent">ship.</span>
              </span>
            </span>
          </h1>

          <p data-hero-fade className="mt-10 max-w-xl text-lg leading-relaxed text-muted text-pretty">
            {site.summary}
          </p>

          <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/works"
              className="group inline-flex h-12 cursor-pointer items-center gap-2 rounded-full bg-foreground px-7 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
            >
              View all work
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
            <a
              href="#contact"
              className="inline-flex h-12 cursor-pointer items-center rounded-full border border-line px-7 text-sm font-medium transition-colors hover:bg-surface"
            >
              Get in touch
            </a>
            <ul className="flex gap-1 sm:ml-2">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    target={label !== "Email" ? "_blank" : undefined}
                    rel={label !== "Email" ? "noopener noreferrer" : undefined}
                    className="grid size-11 cursor-pointer place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-foreground"
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <HeroStage />
        </div>

        <ul data-hero-fade className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <li key={h.label} className="bg-background px-5 py-6 sm:px-6">
              <p className="font-display text-3xl font-semibold tracking-tight text-accent">{h.value}</p>
              <p className="mt-2 text-sm leading-snug text-muted">{h.label}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-y border-line bg-surface/40 py-4 backdrop-blur-sm">
        <div className="overflow-hidden">
          <ul className="marquee-track flex w-max gap-12 px-6 font-mono text-sm uppercase tracking-[0.2em] text-muted">
            {marqueeItems.map((name, i) => (
              <li key={`${name}-${i}`} className="shrink-0">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
