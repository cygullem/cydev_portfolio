"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/content";
import { dockLinks, overlayLinks, overflowLinks, type NavLink } from "@/lib/nav";
import { Close, GitHub, LinkedIn, Plus } from "@/components/icons";

function linkProps(item: NavLink) {
  return item.external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

const noopSubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

function subscribeDesktop(onStoreChange: () => void) {
  const mq = matchMedia("(min-width: 768px)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function useDesktop() {
  return useSyncExternalStore(
    subscribeDesktop,
    () => matchMedia("(min-width: 768px)").matches,
    () => false,
  );
}

export function DockNav() {
  const pathname = usePathname();
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (next: boolean | ((value: boolean) => boolean)) => {
    const value = typeof next === "function" ? next(open) : next;
    setOpenOn(value ? pathname : null);
  };
  const isClient = useIsClient();
  const desktop = useDesktop();
  const reduce = useReducedMotion();
  const menuId = useId();
  const plusRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenOn(null);
    };
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (plusRef.current?.contains(t) || popoverRef.current?.contains(t)) return;
      if (desktop) setOpenOn(null);
    };
    addEventListener("keydown", onKey);
    addEventListener("pointerdown", onPointer);
    if (!desktop) document.body.style.overflow = "hidden";
    return () => {
      removeEventListener("keydown", onKey);
      removeEventListener("pointerdown", onPointer);
      document.body.style.overflow = "";
    };
  }, [open, desktop]);

  const spring = reduce
    ? { duration: 0.2 }
    : { type: "spring" as const, bounce: 0.12, visualDuration: 0.45 };

  const bar = (
      <nav
        aria-label="Primary"
        className={`fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 z-100 w-max max-w-[calc(100vw-1.25rem)] -translate-x-1/2 ${open ? "max-md:invisible" : ""}`}
      >
        <div className="relative flex items-center gap-0.5 rounded-full bg-[#161412] px-1.5 py-1.5 text-[#f4efe6] shadow-[0_18px_50px_rgba(0,0,0,0.35)] sm:gap-1">
          <Link
            href="/"
            className="font-hero grid h-10 shrink-0 place-items-center px-2.5 text-xl tracking-[0.06em] sm:px-3"
          >
            {site.initials}
          </Link>

          <ul className="hidden items-center md:flex">
            {dockLinks.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="grid h-10 cursor-pointer place-items-center px-3 font-sans text-[13px] font-medium text-white/80 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/works"
            className="grid h-10 place-items-center px-3 text-[13px] font-medium text-white/80 md:hidden"
          >
            Work
          </Link>

          <div className="relative">
            <button
              ref={plusRef}
              type="button"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? "Close more links" : "Open more links"}
              onClick={() => setOpen((v) => !v)}
              className="grid size-10 cursor-pointer place-items-center rounded-full bg-white/10 text-white"
            >
              <Plus
                className={`size-4 transition-transform duration-200 ${open ? "rotate-45" : ""}`}
              />
            </button>

            {open && desktop ? (
              <div
                ref={popoverRef}
                className="absolute bottom-[calc(100%+14px)] left-1/2 z-10 w-72 -translate-x-1/2 rounded-3xl bg-foreground p-4 text-[#f4efe6] shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
              >
                <ul>
                  {overflowLinks.map((item, i) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        {...linkProps(item)}
                        onClick={() => setOpen(false)}
                        className="flex items-start gap-3 rounded-2xl px-2 py-2.5 transition-colors hover:bg-white/5"
                      >
                        <span className="font-mono text-[10px] text-white/40">
                          {pad(i + 1)}
                        </span>
                        <span>
                          <span className="block text-sm font-semibold">
                            {item.label}
                          </span>
                          {item.detail ? (
                            <span className="mt-0.5 block text-xs text-white/50">
                              {item.detail}
                            </span>
                          ) : null}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <Link
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="grid size-9 shrink-0 place-items-center text-white/80 transition-colors hover:text-white sm:size-10"
          >
            <GitHub className="size-4" />
          </Link>
          <Link
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="grid size-9 shrink-0 place-items-center text-white/80 transition-colors hover:text-white sm:size-10"
          >
            <LinkedIn className="size-4" />
          </Link>

          <Link
            href="/#contact"
            className="ml-0.5 grid h-10 shrink-0 cursor-pointer place-items-center rounded-full bg-hero-orange px-3 text-[13px] font-semibold text-white transition-colors hover:bg-hero-orange-deep sm:px-4"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </nav>
  );

  return isClient
    ? createPortal(
        <>
          <AnimatePresence>
            {open && !desktop ? (
              <motion.div
                key="overlay"
                role="dialog"
                aria-modal="true"
                aria-label="Site navigation"
                id={menuId}
                initial={reduce ? false : { y: "110%" }}
                animate={{ y: 0 }}
                exit={reduce ? undefined : { y: "110%" }}
                transition={spring}
                className="fixed inset-x-0 bottom-0 top-9 z-100 flex flex-col rounded-t-3xl bg-foreground text-[#f4efe6]"
              >
                <div className="flex items-center justify-between px-5 pt-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
                    {site.brand} · {site.location.split(",")[0]}
                  </p>
                  <button
                    type="button"
                    aria-label="Close menu"
                    autoFocus
                    onClick={() => setOpen(false)}
                    className="grid size-10 cursor-pointer place-items-center rounded-full border border-white/15"
                  >
                    <Close className="size-4" />
                  </button>
                </div>

                <nav className="mt-4 flex-1 overflow-y-auto px-5 pb-4">
                  <ul>
                    {overlayLinks.map((item, i) => (
                      <li key={item.label} className="border-b border-white/10">
                        <Link
                          href={item.href}
                          {...linkProps(item)}
                          onClick={() => setOpen(false)}
                          className="flex items-baseline justify-between gap-4 py-3"
                        >
                          <span className="font-hero text-[clamp(2.25rem,11vw,3.25rem)] leading-[0.9] tracking-wide">
                            {item.label}
                          </span>
                          <span className="font-mono text-[11px] text-white/40">
                            {pad(i + 1)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="flex gap-2 px-5 pb-3">
                  <Link
                    href={site.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/20 py-3 text-sm font-medium"
                  >
                    <GitHub className="size-4" />
                    GitHub
                  </Link>
                  <Link
                    href="/#contact"
                    onClick={() => setOpen(false)}
                    className="flex flex-1 items-center justify-center rounded-full bg-hero-orange py-3 text-sm font-semibold text-white"
                  >
                    Let&apos;s Talk
                  </Link>
                </div>
                <p className="px-5 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                  {site.role}
                </p>
              </motion.div>
              ) : null}
          </AnimatePresence>
          {bar}
        </>,
        document.body,
      )
    : bar;
}
