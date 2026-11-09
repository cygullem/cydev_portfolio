import { site } from "@/lib/content";
import { works } from "@/lib/works";

export type NavLink = {
  href: string;
  label: string;
  detail?: string;
  external?: boolean;
};

export const dockLinks: NavLink[] = [
  { href: "/#about", label: "About" },
  { href: "/works", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/resume", label: "Resume" },
];

export const overflowLinks: NavLink[] = [
  { href: "/#contact", label: "Contact", detail: "Say hello about a build" },
  { href: site.github, label: "GitHub", detail: "Selected source", external: true },
  { href: site.linkedin, label: "LinkedIn", detail: "Work and notes", external: true },
  { href: `mailto:${site.email}`, label: "Email", detail: site.email, external: true },
];

export const overlayLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/works", label: "Work", detail: `${works.length} projects` },
  { href: "/#experience", label: "Experience" },
  { href: "/resume", label: "Resume" },
  { href: "/#contact", label: "Contact" },
  { href: site.github, label: "GitHub", external: true },
  { href: site.linkedin, label: "LinkedIn", external: true },
];

export const tickerItems = [
  { text: "OPEN TO WORK", dir: "up" as const },
  { text: site.role.toUpperCase() },
  { text: "NEXT.JS · REACT · TYPESCRIPT" },
  { text: site.location.toUpperCase() },
  { text: "30% FASTER PAGE LOADS", dir: "up" as const },
  { text: "5+ PRODUCTION FLOWS", dir: "up" as const },
];
