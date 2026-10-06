"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ComponentProps } from "react";
import gsap from "gsap";
import { site } from "@/lib/content";
import { featuredWorks, works } from "@/lib/works";
import { ArrowUpRight, Close, Menu } from "@/components/icons";

const spotlight = featuredWorks[0];
const nav = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/works", label: `Work (${works.length})` },
  { href: "/#contact", label: "Contact" },
];

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
  const [menu, setMenu] = useState(false);

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
      className="relative bg-hero-orange text-white"
    >
      <div className="relative mx-auto min-h-svh max-w-[100rem] border-x border-white/20">
        <div className="absolute inset-x-0 top-0 h-px bg-white/20" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/20" />
        <GridMarks />

        <header
          data-ph-in
          className="relative z-40 flex items-center justify-between px-5 py-6 sm:px-10 sm:py-8"
        >
          <Link
            href="/"
            className="font-display text-lg font-semibold tracking-tight sm:text-xl"
          >
            {site.brand}
          </Link>

          <ul className="hidden items-center gap-8 font-mono text-[11px] uppercase tracking-[0.2em] md:flex">
            {nav.map((item) => (
              <li key={item.label}>
                {item.href.startsWith("/#") ? (
                  <a
                    href={item.href}
                    className="cursor-pointer text-white/85 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="cursor-pointer text-white/85 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <button
            type="button"
            aria-expanded={menu}
            aria-label={menu ? "Close menu" : "Open menu"}
            onClick={() => setMenu((o) => !o)}
            className="flex cursor-pointer flex-col gap-1.5 md:hidden"
          >
            {menu ? <Close className="size-5" /> : <Menu className="size-5" />}
          </button>
        </header>

        {menu && (
          <ul className="relative z-40 border-y border-white/20 px-5 py-4 font-mono text-sm uppercase tracking-widest md:hidden">
            {nav.map((item) => (
              <li key={item.label}>
                {item.href.startsWith("/#") ? (
                  <Link
                    href={item.href}
                    onClick={() => setMenu(false)}
                    className="block py-2"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setMenu(false)}
                    className="block py-2"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 top-[clamp(4.5rem,10vh,6.75rem)] z-10 flex flex-col items-center overflow-visible"
        >
          <p className="font-hero max-w-[100vw] shrink-0 select-none whitespace-nowrap px-2 text-[clamp(3.25rem,min(20vw,18svh),15rem)] leading-none text-white/15">
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
            className="absolute right-[8%] top-[42%] z-30 hidden w-38 cursor-pointer overflow-hidden rounded-sm bg-white p-2 text-foreground shadow-xl transition-transform hover:scale-[1.02] sm:block lg:right-[14%] lg:w-42"
          >
            <div
              className="aspect-square w-full rounded-sm"
              style={{
                background: `linear-gradient(145deg, hsl(${spotlight.hue} 60% 88%), hsl(${spotlight.hue} 40% 70%))`,
              }}
            />
            <p className="mt-2 font-display text-sm font-semibold leading-tight">
              {spotlight.name}
            </p>
            <p className="font-mono text-[10px] text-muted">
              /{spotlight.category}
            </p>
          </Link>
        )}

        <a
          href="#contact"
          data-ph-float
          className="absolute bottom-8 right-5 z-30 flex cursor-pointer items-center gap-3 rounded-sm bg-foreground px-3 py-2.5 text-background shadow-lg sm:bottom-12 sm:right-10"
        >
          <ProfilePhoto
            width={36}
            height={36}
            className="size-9 rounded-full object-cover"
          />
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-wider text-white/70">
              Let&apos;s Talk
            </p>
            <p className="truncate text-sm font-semibold">{site.firstName}</p>
            <p className="truncate text-[10px] text-white/60">{site.role}</p>
          </div>
          <span className="grid size-8 shrink-0 place-items-center rounded-sm bg-white text-foreground">
            <ArrowUpRight className="size-4" />
          </span>
        </a>
      </div>
    </section>
  );
}
