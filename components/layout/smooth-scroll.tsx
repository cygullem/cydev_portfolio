"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    // Anchor scrolling honours `scroll-padding-top` from globals.css.
    const lenis = new Lenis({ anchors: true, stopInertiaOnNavigate: true });
    lenis.on("scroll", ScrollTrigger.update);
    // Drive Lenis from GSAP's ticker so scroll and scrubbed tweens share a frame.
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
