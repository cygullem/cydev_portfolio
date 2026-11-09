"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { ComponentProps } from "react";
import gsap from "gsap";
import { site } from "@/lib/content";
import { featuredWorks, projectTrailCovers } from "@/lib/works";
import dynamic from "next/dynamic";

const spotlight = featuredWorks[0];

const ImageTrail = dynamic(() => import("@/components/react-bits/ImageTrail"), {
  ssr: false,
});

function subscribeMotionPreference(onStoreChange: () => void) {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  reduced.addEventListener("change", onStoreChange);
  return () => reduced.removeEventListener("change", onStoreChange);
}

function subscribePointerFine(onStoreChange: () => void) {
  const fine = matchMedia("(pointer: fine)");
  fine.addEventListener("change", onStoreChange);
  return () => fine.removeEventListener("change", onStoreChange);
}

function useHeroImageTrail() {
  const pointerFine = useSyncExternalStore(
    subscribePointerFine,
    () => matchMedia("(pointer: fine)").matches,
    () => false,
  );
  const reducedMotion = useSyncExternalStore(
    subscribeMotionPreference,
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true,
  );
  const enabled = pointerFine && !reducedMotion;

  useEffect(() => {
    if (!enabled) return;
    for (const src of projectTrailCovers) {
      const img = new window.Image();
      img.decoding = "async";
      img.src = src;
    }
  }, [enabled]);

  return enabled;
}

function GridMarks() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-5 grid grid-cols-6 grid-rows-4 sm:inset-8 md:inset-10"
    >
      {Array.from({ length: 24 }).map((_, i) => (
        <span
          key={i}
          className="flex items-center justify-center font-mono text-[10px] text-white/35 sm:text-xs"
        >
          +
        </span>
      ))}
    </div>
  );
}

function ProfilePhoto(
  props: Omit<ComponentProps<typeof Image>, "src" | "alt"> & {
    className?: string;
  },
) {
  const [ok, setOk] = useState(true);
  if (!ok) {
    return (
      <div
        className={`grid place-items-center bg-white/15 font-hero text-6xl text-white ${props.className ?? ""}`}
        aria-hidden
      >
        {site.initials}
      </div>
    );
  }
  return (
    <Image
      {...props}
      src={site.profileImage}
      alt=""
      onError={() => setOk(false)}
    />
  );
}

export function PortfolioHero() {
  const root = useRef<HTMLElement>(null);
  const trailEnabled = useHeroImageTrail();

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !root.current) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-ph-in]", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.1,
      });
      gsap.from("[data-ph-name]", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.35,
      });
      gsap.to("[data-ph-float]", {
        y: -8,
        duration: 2.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      aria-label="Introduction"
      className="relative isolate z-0 overflow-hidden bg-hero-orange text-white"
    >
      <div className="relative mx-auto min-h-svh max-w-[100rem] border-x border-white/20">
        <div className="absolute inset-x-0 top-0 h-px bg-white/20" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/20" />
        <GridMarks />

        {trailEnabled ? (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-12 overflow-hidden"
          >
            <ImageTrail
              eventTargetRef={root}
              items={projectTrailCovers}
              size={190}
              threshold={80}
              appearScale={0}
              zoom={2.4}
              flash={0.6}
              className="z-0 h-full w-full"
            />
          </div>
        ) : null}

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 top-10 z-10 flex flex-col items-center overflow-visible"
        >
          <p className="font-hero max-w-[100vw] shrink-0 select-none whitespace-nowrap px-2 text-[clamp(3.25rem,min(20vw,18svh),15rem)] font-medium leading-none text-white/15">
            {site.firstName.toUpperCase()}
          </p>
          <div className="relative -mt-[clamp(0.35rem,1.2vh,0.85rem)] flex min-h-0 w-full flex-1 items-end justify-center">
            <ProfilePhoto
              data-ph-in
              width={990}
              height={1230}
              priority
              className="h-full w-auto max-h-full max-w-[min(100vw,52rem)] origin-bottom scale-[1.08] object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] sm:scale-[1.12] md:scale-[1.16] lg:scale-[1.2]"
            />
          </div>
        </div>

        <div className="relative z-20 flex min-h-[calc(100svh-5.5rem)] flex-col px-5 pb-6 pt-4 sm:px-10 sm:pb-8">
          <p data-ph-in className="font-mono text-xs text-white/70">
            ©{new Date().getFullYear()}
          </p>

          <p
            data-ph-in
            className="mt-[min(22vh,10rem)] max-w-[16rem] text-[11px] font-medium uppercase leading-relaxed tracking-[0.18em] text-white sm:max-w-xs sm:text-xs"
          >
            {site.heroStatement}
          </p>

          <p
            data-ph-name
            className="font-hero relative mt-auto text-[clamp(3.5rem,16vw,11rem)] leading-[0.85] tracking-tight"
          >
            {site.lastName.toUpperCase()}
          </p>
        </div>

        {spotlight && (
          <Link
            href={`/works/${spotlight.slug}`}
            data-ph-float
            className="absolute right-[8%] top-[42%] z-30 hidden w-38 cursor-pointer overflow-hidden rounded-sm 2 text-foreground transition-transform hover:scale-[1.02] sm:block lg:right-[14%] lg:w-42"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#e8e8e8]">
              {spotlight.cover ? (
                <Image
                  src={spotlight.cover}
                  alt="Project Cover Photo"
                  fill
                  sizes="168px"
                  className="object-cover object-center"
                />
              ) : (
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(145deg, hsl(${spotlight.hue} 60% 88%), hsl(${spotlight.hue} 40% 70%))`,
                  }}
                />
              )}
            </div>
            <p className="mt-2 font-display text-sm font-semibold leading-tight text-white">
              {spotlight.name}
            </p>
            <p className="font-mono text-[10px] text-white/90">
              /{spotlight.category}
            </p>
          </Link>
        )}
      </div>
    </section>
  );
}
