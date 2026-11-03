"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about, principles, processSteps, site } from "@/lib/content";
import { Skills } from "@/components/skills/skills";

export function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from("[data-about-hero]", {
        y: 32,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 88%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={root}
      aria-labelledby="about-title"
      className="border-t border-line bg-background"
    >
      <div className="mx-auto max-w-360 px-5 pb-20 pt-16 sm:px-10 sm:pb-28 sm:pt-20">
        <div
          data-about-hero
          className="flex items-center justify-between gap-4"
        >
          <p className="text-sm font-medium text-accent">02 / About</p>
          <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs text-muted">
            <span
              aria-hidden
              className="size-1.5 rounded-full bg-hero-orange"
            />
            {site.status.replace(/_/g, " ")}
          </span>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-20 lg:pt-4">
          <h2
            id="about-title"
            data-about-hero
            className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.08] tracking-tight text-balance lg:max-w-md"
          >
            Building products,{" "}
            <span className="text-muted">not just pages.</span>
          </h2>
          <div data-about-hero className="lg:pt-2">
            {about.map((p, i) => (
              <p
                key={i}
                className={`max-w-lg text-base leading-[1.7] sm:text-[1.0625rem] ${i === 0 ? "text-foreground" : "mt-4 text-muted"}`}
              >
                {p}
              </p>
            ))}
            <Link
              href="/works"
              className="mt-8 inline-block text-sm font-medium text-accent underline decoration-accent/35 underline-offset-[6px] transition-colors hover:decoration-accent"
            >
              View selected work
            </Link>
          </div>
        </div>

        <div className="mt-20 lg:grid lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
              How I work
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              A simple loop I use on client and product work — from discovery
              through handoff.
            </p>
          </div>
          <ol className="mt-10 space-y-10 lg:col-span-8 lg:mt-0 lg:space-y-0 lg:divide-y lg:divide-line lg:border-y lg:border-line">
            {processSteps.map((step, i) => (
              <li
                key={step.title}
                className="grid gap-3 pb-10 lg:grid-cols-[7rem_1fr] lg:items-baseline lg:gap-8 lg:py-8 lg:pb-8"
              >
                <span className="font-mono text-xs tabular-nums text-muted">
                  {String(i + 1).padStart(2, "0")} — {step.title}
                </span>
                <p className="text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-20 border-t border-line pt-16 lg:grid lg:grid-cols-12 lg:gap-16">
          <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl lg:col-span-4">
            What I optimize for
          </h3>
          <dl className="mt-8 space-y-0 lg:col-span-8 lg:mt-0">
            {principles.map((p) => (
              <div
                key={p.title}
                className="grid gap-2 border-t border-line py-6 first:border-t-0 first:pt-0 sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-10 sm:py-7"
              >
                <dt className="text-sm font-medium leading-snug">{p.title}</dt>
                <dd className="text-sm leading-relaxed text-muted">{p.body}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-16 grid gap-10 border-t border-line pt-16 sm:grid-cols-2 sm:gap-16">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted">
              Education
            </p>
            <p className="mt-3 font-display text-lg font-semibold">
              {site.education.degree}
            </p>
            <p className="mt-1 text-sm text-muted">{site.education.school}</p>
            <p className="mt-2 font-mono text-xs text-muted">
              {site.education.period}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted">
              Certifications
            </p>
            <ul className="mt-3 space-y-2.5 text-sm">
              {site.certifications.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted underline decoration-line underline-offset-[5px] transition-colors hover:text-accent hover:decoration-accent/40"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 border-t border-line pt-16">
          <div className="max-w-2xl">
            <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
              Stack
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              What I reach for to ship UI, APIs, and production deploys — linked
              to work in the archive where it applies.
            </p>
          </div>
          <div className="mt-8">
            <Skills />
          </div>
        </div>
      </div>
    </section>
  );
}
