// TODO: Replace every placeholder below with real resume data. Never add metrics you can't back up.

export const site = {
  name: "Clyde Cyril Gullem",
  initials: "CCG",
  role: "Full-stack Engineer",
  location: "Cebu City, Philippines",
  email: "cygullem@gmail.com",
  github: "https://github.com/cygullem",
  linkedin: "https://www.linkedin.com/in/clyde-cyril-gullem/",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  headline: "I build fast, scalable digital products.",
  summary:
    "Full-stack engineer turning complex requirements into fast, intuitive interfaces with Next.js, React and TypeScript — shipped quickly with AI-assisted workflows I still review, test and own.",
  description:
    "Full-stack engineer building fast, accessible web products with Next.js, React and TypeScript.",
  stack: "next.js / react / typescript",
  status: "open_to_work",
};

// Use real numbers from your resume as `value` (e.g. "5+") only if you can prove them.
export const highlights = [
  { value: "Frontend", label: "UI engineering & interaction design" },
  { value: "Next.js + React", label: "Primary production stack" },
  { value: "Production SaaS", label: "Shipped, not just prototyped" },
  { value: "AI-assisted", label: "Faster delivery, owned code" },
];

export type Project = {
  name: string;
  tagline: string;
  description: string;
  challenge: string;
  contribution: string[];
  impact: string[];
  stack: string[];
  live?: string;
  repo?: string;
  image?: string;
};

export const projects: Project[] = [
  {
    name: "Onda Fit",
    tagline: "Pickleball booking platform",
    description:
      "A booking experience that lets players discover courts, check availability and reserve games online.",
    challenge:
      "Players needed a simpler way to find available pickleball courts and manage their bookings.",
    contribution: [
      "Built responsive booking flows",
      "Developed reusable React components",
      "Integrated backend APIs",
      "Optimized page performance and mobile UX",
    ],
    impact: [],
    stack: ["Next.js", "React", "Supabase", "TypeScript"],
  },
  {
    name: "Project two",
    tagline: "One-line value proposition",
    description: "Short description of what the product does and who it serves.",
    challenge: "The problem that existed before this work.",
    contribution: ["What you personally built", "What you improved"],
    impact: [],
    stack: ["Next.js", "Tailwind CSS"],
  },
  {
    name: "Project three",
    tagline: "One-line value proposition",
    description: "Short description of what the product does and who it serves.",
    challenge: "The problem that existed before this work.",
    contribution: ["What you personally built", "What you improved"],
    impact: [],
    stack: ["React", "Node.js"],
  },
];

export const about = [
  "I'm a frontend-focused engineer who turns complex product requirements into fast, intuitive interfaces. I care about the details users notice — performance, responsiveness, accessibility and interaction design — and about code the next engineer can maintain.",
  "I work comfortably on my own, from a rough idea to production software, and use AI-assisted development to move faster without handing over ownership of the result.",
];

export const principles = [
  { title: "Product first", body: "I don't just build features. I think about why they exist." },
  { title: "Performance matters", body: "Fast interfaces make better products." },
  {
    title: "AI as a force multiplier",
    body: "I use AI to move faster while still reviewing, testing and owning the code.",
  },
  { title: "Details matter", body: "Small interaction and UX decisions compound into better products." },
];

// Remove anything you haven't actually used. `note` appears on hover/focus.
export const skills: { group: string; items: { name: string; note?: string }[] }[] = [
  {
    group: "Languages",
    items: [{ name: "TypeScript" }, { name: "JavaScript" }, { name: "HTML" }, { name: "CSS" }, { name: "SQL" }],
  },
  {
    group: "Frontend",
    items: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "React Native" },
      { name: "GSAP" },
      { name: "Motion" },
    ],
  },
  {
    group: "Backend",
    items: [{ name: "Node.js" }, { name: "Hono" }, { name: "REST APIs" }, { name: "Supabase" }, { name: "PostgreSQL" }],
  },
  {
    group: "AI",
    items: [{ name: "OpenAI" }, { name: "Claude" }, { name: "Cursor" }, { name: "RAG" }, { name: "API integrations" }],
  },
  {
    group: "Infrastructure",
    items: [{ name: "Vercel" }, { name: "Netlify" }, { name: "GitHub" }, { name: "CI/CD" }, { name: "Docker" }],
  },
];

export const experience = [
  {
    period: "2024 — Present",
    role: "Role title",
    company: "Company name",
    achievements: [
      "Achievement with a measurable outcome",
      "Achievement with a measurable outcome",
      "Achievement with a measurable outcome",
    ],
    stack: ["Next.js", "React", "TypeScript", "Supabase"],
  },
];
