"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about } from "@/lib/content";

const copy = about.join(" ");

export function AboutStatement() {
  const block = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = block.current;
    if (!root || reduced) return;

    const words = root.querySelectorAll("[data-word]");
    gsap.set(words, { opacity: 0.22 });
    const tween = gsap.to(words, {
      opacity: 1,
      stagger: 0.02,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top 78%",
        end: "bottom 42%",
        scrub: 0.45,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const words = copy.split(/\s+/);

  return (
    <div
      ref={block}
      className="rounded-2xl bg-[#141210] px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/45">Manifesto</p>
      <p className="mt-6 max-w-5xl font-display text-[clamp(1.35rem,3.2vw,2.35rem)] font-medium leading-[1.35] tracking-tight text-white">
        {words.map((word, i) => (
          <span key={`${word}-${i}`} data-word className="mr-[0.32em] inline motion-reduce:opacity-100">
            {word}
          </span>
        ))}
      </p>
    </div>
  );
}
