export const site = {
  name: "Clyde Cyril Gullem",
  firstName: "Clyde",
  brand: "Cydev®",
  initials: "CCG",
  role: "Full-Stack Developer",
  heroStatement:
    "I BUILD USER-CENTERED WEB PRODUCTS THAT ARE SIMPLE, SMART, AND BUILT TO SHIP.",
  profileImage: "https://github.com/cygullem.png",
  location: "Bogo City, Cebu, Philippines",
  email: "cygullem@gmail.com",
  phone: "+63 930 149 2207",
  github: "https://github.com/cygullem",
  linkedin: "https://www.linkedin.com/in/clyde-cyril-gullem-114a67349/",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  headline: "Shipping interfaces that feel as considered as the products behind them.",
  summary:
    "Full-stack developer with Next.js, TypeScript, and Tailwind — from campaign dashboards to booking flows and mobile attendance tools.",
  description:
    "Clyde Cyril Gullem — Full-stack developer building Next.js and React products for SaaS, e-commerce, and mobile.",
  stack: "next.js · react · typescript · tailwind",
  status: "open_to_work",
  education: {
    degree: "B.S. Information Technology",
    school: "Cebu Roosevelt Memorial Colleges",
    period: "2021 — 2026",
  },
  certifications: [
    "Software Engineer Certificate",
    "Frontend Developer Certification",
    "React Certification",
    "Next.js App Router Fundamentals",
  ],
};

export const highlights = [
  { value: "30%", label: "Faster page loads (Abstract Digital)" },
  { value: "5+", label: "Production flows shipped with design" },
  { value: "Full-stack", label: "Next.js, APIs, Firebase, mobile" },
  { value: "Deploy", label: "Vercel · Netlify · Cloudflare" },
];

export const about = [
  "I build full-stack web products where layout, motion, and performance are part of the feature — not polish added at the end.",
  "At Pacific Equities Group I ship SaleSnap and partner products with design-led teams. Before that I cut load times and shipped auth and real-time features at Abstract Digital. I started in mobile with Flexi App’s QR attendance flows.",
];

export const principles = [
  { title: "Ship the whole funnel", body: "From empty states to error paths — not just the happy screenshot." },
  { title: "Measure what users feel", body: "Load time, tap targets, and scroll jank show up in retention." },
  { title: "Own the stack trace", body: "AI speeds me up; I still review, test, and merge what goes live." },
  { title: "Design is a constraint", body: "Tight systems make better interfaces than one-off hero effects." },
];

export const skills: { group: string; items: { name: string; note?: string }[] }[] = [
  {
    group: "Frontend",
    items: [
      { name: "Next.js" },
      { name: "React" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "shadcn/ui" },
      { name: "React Native" },
      { name: "Motion" },
      { name: "GSAP" },
    ],
  },
  {
    group: "Backend & data",
    items: [{ name: "Node.js" }, { name: "REST APIs" }, { name: "Firebase" }, { name: "Supabase" }],
  },
  {
    group: "Tooling",
    items: [{ name: "Git" }, { name: "GitHub" }, { name: "Vercel" }, { name: "Netlify" }, { name: "Cloudflare" }],
  },
];

export const experience = [
  {
    period: "Dec 2025 — Aug 2026",
    role: "Full-Stack Developer · SaleSnap PH",
    company: "Pacific Equities Group",
    location: "Cebu",
    achievements: [
      "Develop scalable front-end interfaces and back-end services with Next.js, TypeScript, Tailwind CSS, and shadcn/ui",
      "Collaborate with design to deliver 5+ seamless, production user experiences",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
  },
  {
    period: "Aug 2025 — Dec 2025",
    role: "Full-Stack Developer · Abstract Digital",
    company: "Pacific Equities Group (part-time)",
    location: "Cebu",
    achievements: [
      "Improved page load speed by ~30% across client deliverables",
      "Built authentication flows and integrated real-time features with Firebase",
    ],
    stack: ["Next.js", "React", "Firebase", "TypeScript"],
  },
  {
    period: "Feb 2025 — May 2025",
    role: "Software Developer Intern",
    company: "TechTalk",
    location: "Bogo, Cebu",
    achievements: [
      "Contributed to Flexi App — school attendance monitoring with React Native",
      "Implemented QR scanning; supported Node.js services for check-in/out (~30% faster)",
    ],
    stack: ["React Native", "Node.js", "TypeScript"],
  },
];
