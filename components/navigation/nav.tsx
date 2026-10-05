"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";
import { site } from "@/lib/content";
import { Close, GitHub, LinkedIn, Menu } from "@/components/icons";
import { ThemeToggle } from "./theme-toggle";

const homeAnchors = [
  { href: "/works", label: "Work", match: "/works" },
  { href: "/#about", label: "About", id: "about" },
  { href: "/#experience", label: "Experience", id: "experience" },
  { href: "/#contact", label: "Contact", id: "contact" },
];

export function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const compact = !onHome || scrolled || open;

  useEffect(() => {
    if (!onHome) return;
    const top = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting));
    const sentinel = document.getElementById("top");
    if (sentinel) top.observe(sentinel);
    const spy = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    document.querySelectorAll("main section[id]").forEach((s) => spy.observe(s));
    return () => {
      top.disconnect();
      spy.disconnect();
    };
  }, [onHome, pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  const linkClass =
    "rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-foreground aria-[current]:text-foreground";

  return (
    <header
      className={`sticky top-0 z-[60] border-b backdrop-blur-xl transition-[background-color,border-color] duration-300 ${
        compact ? "border-line bg-background/85" : "border-transparent bg-background/50"
      }`}
    >
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-[90rem] items-center justify-between px-5 transition-[height] duration-300 sm:px-10 ${
          compact ? "h-14" : "h-[4.5rem]"
        }`}
      >
        <Link href="/" className="font-display text-sm font-semibold tracking-tight sm:text-base">
          <span className="text-muted">{site.initials}</span>
          <span className="mx-2 text-line">/</span>
          {site.name.split(" ")[0]}
        </Link>

        <ul className="hidden items-center gap-0.5 md:flex">
          {homeAnchors.map((l) => {
            const current =
              l.match === pathname ||
              (onHome && l.id && active === l.id) ||
              (l.match === "/works" && pathname.startsWith("/works"));
            return (
              <li key={l.label}>
                {l.href.startsWith("/#") ? (
                  <a href={l.href} aria-current={current ? "true" : undefined} className={linkClass}>
                    {l.label}
                  </a>
                ) : (
                  <Link href={l.href} aria-current={current ? "true" : undefined} className={linkClass}>
                    {l.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hidden size-9 place-items-center rounded-md text-muted transition-colors hover:bg-surface hover:text-foreground sm:grid"
          >
            <GitHub />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hidden size-9 place-items-center rounded-md text-muted transition-colors hover:bg-surface hover:text-foreground sm:grid"
          >
            <LinkedIn />
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-9 place-items-center rounded-md text-muted hover:bg-surface hover:text-foreground md:hidden"
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </nav>

      <LazyMotion features={domAnimation} strict>
        <AnimatePresence>
          {open && (
            <m.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-line md:hidden"
            >
              <ul className="mx-auto flex max-w-[90rem] flex-col px-5 py-4">
                {homeAnchors.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith("/#") ? (
                      <a href={l.href} onClick={() => setOpen(false)} className="block py-3 font-display text-2xl tracking-tight">
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href} onClick={() => setOpen(false)} className="block py-3 font-display text-2xl tracking-tight">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </header>
  );
}
