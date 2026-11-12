"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * One scroll-animation setup for the whole page, driven by data attributes so
 * sections can stay Server Components:
 *
 * - `data-reveal`           fade + rise once, staggered with neighbours
 * - `data-reveal-mask`      heading rises from behind its own baseline
 * - `data-parallax="n"`     drifts ±n% vertically while its parent crosses the viewport
 * - `data-drift="n"`        slides in from n% horizontally as it enters
 * - `data-parallax-out="n"` sinks n% while its parent scrolls out (hero curtain)
 */
export function ScrollEffects() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const all = <T extends HTMLElement>(selector: string) =>
        gsap.utils.toArray<T>(selector);

      const reveals = all("[data-reveal]");
      gsap.set(reveals, { opacity: 0, y: 28 });
      ScrollTrigger.batch(reveals, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            overwrite: true,
          }),
      });

      for (const el of all("[data-reveal-mask]")) {
        gsap.fromTo(
          el,
          { yPercent: 100, clipPath: "inset(-20% -5% 100% -5%)" },
          {
            yPercent: 0,
            clipPath: "inset(-20% -5% 0% -5%)",
            duration: 1.1,
            ease: "power4.out",
            clearProps: "clipPath,transform",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      for (const el of all("[data-parallax]")) {
        const amount = Number(el.dataset.parallax) || 6;
        gsap.fromTo(
          el,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }

      for (const el of all("[data-drift]")) {
        gsap.from(el, {
          xPercent: Number(el.dataset.drift) || 0,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        });
      }

      for (const el of all("[data-parallax-out]")) {
        gsap.to(el, {
          yPercent: Number(el.dataset.parallaxOut) || 0,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });

    return () => mm.revert();
  }, []);

  return null;
}
