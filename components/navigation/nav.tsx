"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";
import { site } from "@/lib/content";
import { Close, GitHub, LinkedIn, Menu } from "@/components/icons";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const top = new IntersectionObserver(([e]) => setCompact(!e.isIntersecting));
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
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition-[background-color,border-color] duration-300 ${
        compact || open ? "border-line bg-background/80" : "border-transparent bg-background/0"
      }`}
    >
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-6xl items-center justify-between px-5 transition-[height] duration-300 sm:px-8 ${
          compact ? "h-14" : "h-18"
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5 font-medium tracking-tight">
          <span aria-hidden className="grid size-7 place-items-center rounded-md bg-foreground font-mono text-[11px] text-background">
            {site.initials}
          </span>
          {site.name}
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? "true" : undefined}
                className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-foreground aria-[current]:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hidden size-9 place-items-center rounded-md text-muted transition-colors hover:bg-surface hover:text-foreground sm:grid">
            <GitHub />
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hidden size-9 place-items-center rounded-md text-muted transition-colors hover:bg-surface hover:text-foreground sm:grid">
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
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-line md:hidden"
            >
              <ul className="mx-auto flex max-w-6xl flex-col px-5 py-3">
                {links.map((l) => (
                  <li key={l.id}>
                    <a href={`#${l.id}`} onClick={() => setOpen(false)} className="block py-3 text-lg tracking-tight">
                      {l.label}
                    </a>
                  </li>
                ))}
                <li className="mt-2 flex gap-4 border-t border-line pt-4 text-sm text-muted">
                  <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                  <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </li>
              </ul>
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </header>
  );
}
