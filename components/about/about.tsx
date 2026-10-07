"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about, highlights, principles, processSteps, site } from "@/lib/content";
import { Skills } from "@/components/skills/skills";
import { AboutStatement } from "./about-statement";

const marqueeItems = [
  site.role,
  site.stack,
  site.location,
  "Open to work",
  "Next.js · React · TypeScript",
  site.education.degree,
];

export function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !root.current) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-about-in]", {
        y: 48,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.07,
        scrollTrigger: { trigger: root.current, start: "top 82%" },
      });
      gsap.from("[data-about-process]", {
        y: 36,
        opacity: 0,
        duration: 0.75,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: { trigger: "[data-about-process-wrap]", start: "top 85%" },
      });
      gsap.from("[data-about-principle]", {
        x: -24,
        opacity: 0,
        duration: 0.65,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: { trigger: "[data-about-principles]", start: "top 88%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={root}
      aria-labelledby="about-title"
      className="relative overflow-hidden border-t border-hero-orange/25 bg-background"
    >
      <div className="relative mx-auto max-w-360 px-5 pb-24 pt-20 sm:px-10 sm:pb-32 sm:pt-28">
        <div data-about-in className="flex flex-wrap items-end justify-between gap-6">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">02 / About</p>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted">
            <span aria-hidden className="size-1.5 rounded-full bg-hero-orange" />
            {site.status.replace(/_/g, " ")}
          </span>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_minmax(0,0.85fr)] lg:items-end lg:gap-16">
          <h2
            id="about-title"
            data-about-in
            className="font-display text-[clamp(2.5rem,6.5vw,4.75rem)] font-semibold leading-[1.02] tracking-tight text-balance"
          >
            Building products,{" "}
            <span className="text-muted">not just pages.</span>
          </h2>
          <div data-about-in className="space-y-5 text-base leading-relaxed text-pretty sm:text-lg">
            {about.map((p, i) => (
              <p key={i} className={i ? "text-muted" : "font-medium text-foreground"}>
                {p}
              </p>
            ))}
            <Link
              href="/works"
              className="group inline-flex cursor-pointer items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent"
            >
              View selected work
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        <div
          data-about-in
          className="about-marquee mt-14 overflow-hidden border-y border-line py-4 sm:mt-16"
          aria-hidden
        >
          <div className="about-marquee-track flex w-max gap-10 font-mono text-[11px] uppercase tracking-[0.32em] text-muted">
            {[0, 1].map((pass) =>
              marqueeItems.map((item) => (
                <span key={`${pass}-${item}`} className="flex shrink-0 items-center gap-10">
                  {item}
                  <span className="text-hero-orange">✦</span>
                </span>
              )),
            )}
          </div>
        </div>

        <ul
          data-about-in
          className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
        >
          {highlights.map((h) => (
            <li key={h.label} className="bg-surface px-6 py-8 sm:py-10">
              <p className="font-hero text-4xl leading-none text-hero-orange sm:text-5xl">{h.value}</p>
              <p className="mt-3 max-w-56 text-sm leading-snug text-muted">{h.label}</p>
            </li>
          ))}
        </ul>

        <div data-about-in className="mt-16 sm:mt-20">
          <AboutStatement />
        </div>

        <div data-about-process-wrap className="mt-16 sm:mt-20">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">How I work</p>
          <h3 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Discover → Design → Deliver</h3>
          <ul className="mt-10 grid gap-4 lg:grid-cols-3 lg:gap-5">
            {processSteps.map((step, i) => (
              <li
                key={step.title}
                data-about-process
                className={`group rounded-2xl border border-line bg-surface p-7 transition-shadow hover:shadow-[0_24px_60px_-32px_rgba(28,25,23,0.35)] sm:p-8 ${i === 1 ? "lg:translate-y-8" : ""}`}
              >
                <span className="font-mono text-xs text-hero-orange">{String(i + 1).padStart(2, "0")}</span>
                <h4 className="font-display mt-4 text-2xl font-semibold tracking-tight">{step.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <div data-about-principles className="mt-20 sm:mt-24">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">Principles</p>
          <h3 className="font-display mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Craft with intent, ship with proof.
          </h3>
          <ol className="mt-10 divide-y divide-line border-y border-line">
            {principles.map((p, i) => (
              <li
                key={p.title}
                data-about-principle
                className="group grid gap-4 py-7 transition-colors hover:bg-surface sm:grid-cols-[4rem_1fr_auto] sm:items-center sm:gap-8 sm:py-8"
              >
                <span className="font-hero text-3xl leading-none text-hero-orange/80 sm:text-4xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">{p.title}</h4>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted sm:text-base">{p.body}</p>
                </div>
                <span
                  aria-hidden
                  className="hidden font-mono text-xs uppercase tracking-widest text-muted opacity-0 transition-opacity group-hover:opacity-100 sm:block"
                >
                  Guideline
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16 grid gap-8 border-t border-line pt-12 sm:mt-20 sm:grid-cols-2 sm:pt-14">
          <div data-about-in>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">Education</p>
            <p className="font-display mt-3 text-2xl font-semibold tracking-tight">{site.education.degree}</p>
            <p className="mt-1 text-muted">{site.education.school}</p>
            <p className="mt-2 font-mono text-xs text-muted">{site.education.period}</p>
          </div>
          <div data-about-in>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">Certifications</p>
            <ul className="mt-3 space-y-2">
              {site.certifications.map((c) => (
                <li key={c} className="flex gap-3 text-sm sm:text-base">
                  <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-hero-orange" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 sm:mt-28">
          <div data-about-in className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">Stack</p>
              <h3 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Tools in production</h3>
            </div>
            <p className="max-w-sm text-sm text-muted">Mapped to real projects — hover a chip for context.</p>
          </div>
          <div data-about-in className="mt-10">
            <Skills />
          </div>
        </div>
      </div>
    </section>
  );
}
