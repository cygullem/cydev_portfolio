"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/content";
import { works } from "@/lib/works";
import { Close, GitHub, LinkedIn, Menu } from "@/components/icons";

const primaryNav = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/works", label: `Work (${works.length})` },
  { href: "/resume", label: "Resume" },
  { href: "/#contact", label: "Contact" },
];

export function SiteNavBar({ animateIn }: { animateIn?: boolean }) {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [menu]);

  return (
    <>
      <header
        {...(animateIn ? { "data-ph-in": true } : {})}
        className={`relative flex items-center justify-between px-5 py-6 sm:px-10 sm:py-8 ${menu ? "z-70" : "z-40"}`}
      >
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight sm:text-xl"
        >
          {site.brand}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.2em]">
            {primaryNav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="cursor-pointer text-white/85 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1 border-l border-white/25 pl-6">
            <Link
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="grid size-9 cursor-pointer place-items-center text-white/85 transition-colors hover:text-white"
            >
              <GitHub />
            </Link>
            <Link
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="grid size-9 cursor-pointer place-items-center text-white/85 transition-colors hover:text-white"
            >
              <LinkedIn />
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="grid size-9 cursor-pointer place-items-center text-white/85 transition-colors hover:text-white"
          >
            <GitHub />
          </Link>
          <Link
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="grid size-9 cursor-pointer place-items-center text-white/85 transition-colors hover:text-white"
          >
            <LinkedIn />
          </Link>
          <button
            type="button"
            aria-expanded={menu}
            aria-label={menu ? "Close menu" : "Open menu"}
            onClick={() => setMenu((o) => !o)}
            className="flex cursor-pointer flex-col gap-1.5"
          >
            {menu ? <Close className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      {menu ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-60 bg-hero-orange md:hidden"
        >
          <div className="mx-auto flex h-full max-w-[100rem] flex-col border-x border-white/20">
            <nav className="flex flex-1 flex-col justify-center px-8 pb-28 pt-28">
              <ul className="font-mono text-lg uppercase tracking-[0.2em]">
                {primaryNav.map((item) => (
                  <li key={item.label} className="border-b border-white/15 last:border-b-0">
                    <Link
                      href={item.href}
                      onClick={() => setMenu(false)}
                      className="block py-4 text-white/90 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
