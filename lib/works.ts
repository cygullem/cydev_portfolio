export type Work = {
  slug: string;
  name: string;
  tagline: string;
  category: "SaaS" | "E-commerce" | "Mobile" | "Marketing";
  year: string;
  featured: boolean;
  live?: string;
  description: string;
  challenge: string;
  contribution: string[];
  impact: string[];
  frontend: string[];
  backend: string[];
  hue: number;
};

export const works: Work[] = [
  {
    slug: "salesnap",
    name: "SaleSnap",
    tagline: "Creator marketing platform",
    category: "Marketing",
    year: "2025",
    featured: true,
    live: "https://salesnap.com/",
    description:
      "Connects businesses with local creators and tracks creator-driven sales across campaigns.",
    challenge: "Teams needed one place to run campaigns, discover creators, and attribute revenue.",
    contribution: [
      "Built responsive campaign and creator-discovery interfaces with Next.js and TypeScript",
      "Implemented shadcn/ui component patterns aligned with design handoffs",
      "Collaborated with design on five production user flows end to end",
    ],
    impact: ["5+ shipped product experiences with the design team"],
    frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    backend: ["REST APIs", "Node.js"],
    hue: 145,
  },
  {
    slug: "spendowl",
    name: "SpendOwl",
    tagline: "Spend management platform",
    category: "SaaS",
    year: "2025",
    featured: true,
    live: "https://spendowl.com/",
    description: "Helps businesses manage budgets, approvals, payments, and expenses in one workflow.",
    challenge: "Finance teams lacked clear visibility into spend across approval stages.",
    contribution: [
      "Developed dashboard and approval UI with reusable data-dense components",
      "Improved perceived performance through layout stability and lazy-loaded views",
      "Integrated REST endpoints for budgets and transaction states",
    ],
    impact: ["~30% improvement in page load speed during Abstract Digital engagement"],
    frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    backend: ["REST APIs", "Firebase", "Node.js"],
    hue: 210,
  },
  {
    slug: "onda-fit",
    name: "Onda Fit",
    tagline: "Pickleball booking platform",
    category: "SaaS",
    year: "2025",
    featured: true,
    live: "https://onda.fit/",
    description: "Lets players discover courts, check availability, and book sessions online.",
    challenge: "Booking flows had to stay fast on mobile with real-time availability.",
    contribution: [
      "Built responsive booking and discovery flows",
      "Developed reusable React components for schedules and court cards",
      "Tuned mobile UX and interaction states across the funnel",
    ],
    impact: [],
    frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    backend: ["REST APIs", "Supabase"],
    hue: 175,
  },
  {
    slug: "merchantbee",
    name: "MerchantBee",
    tagline: "Business operations platform",
    category: "SaaS",
    year: "2025",
    featured: true,
    live: "https://merchantbee.com/",
    description: "Digital platform for merchant workflows and customer-facing business tools.",
    challenge: "Operators needed intuitive flows without sacrificing information density.",
    contribution: [
      "Shipped responsive application screens and shared UI primitives",
      "Streamlined multi-step flows for repeat merchant tasks",
    ],
    impact: [],
    frontend: ["React", "TypeScript", "Tailwind CSS"],
    backend: ["REST APIs", "Node.js"],
    hue: 45,
  },
  {
    slug: "hr-zen",
    name: "HR Zen",
    tagline: "Modern HR platform",
    category: "SaaS",
    year: "2025",
    featured: false,
    live: "https://hrzen.com/",
    description: "Human resource management with employee-facing and admin experiences.",
    challenge: "HR tools often feel heavy; the UI had to stay approachable at scale.",
    contribution: [
      "Built responsive HR interfaces and interactive form patterns",
      "Created reusable components for tables, filters, and employee profiles",
    ],
    impact: [],
    frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    backend: ["REST APIs"],
    hue: 265,
  },
  {
    slug: "qrwise",
    name: "QRWise",
    tagline: "Influencer marketing & analytics",
    category: "Marketing",
    year: "2025",
    featured: false,
    live: "https://qrwise.com/influencer-marketing",
    description: "Analytics and creator-driven marketing for business operations.",
    challenge: "Marketing data had to be readable at a glance for non-technical users.",
    contribution: [
      "Developed analytics views and campaign tracking interfaces",
      "Implemented responsive layouts for sales and performance metrics",
    ],
    impact: [],
    frontend: ["React", "TypeScript", "Tailwind CSS"],
    backend: ["REST APIs", "Node.js"],
    hue: 320,
  },
  {
    slug: "punched-coffee",
    name: "Punched Coffee",
    tagline: "E-commerce storefront",
    category: "E-commerce",
    year: "2025",
    featured: false,
    live: "https://getpunched.com",
    description: "Product browsing and checkout experience for a coffee brand.",
    challenge: "Balance brand storytelling with a frictionless purchase path.",
    contribution: [
      "Built responsive product and cart flows focused on performance",
      "Optimized imagery and layout to reduce layout shift",
    ],
    impact: [],
    frontend: ["Next.js", "React", "Tailwind CSS"],
    backend: ["Headless commerce APIs"],
    hue: 25,
  },
  {
    slug: "loca-cheesecakes",
    name: "Loca Cheesecakes",
    tagline: "E-commerce & ordering",
    category: "E-commerce",
    year: "2025",
    featured: false,
    live: "https://locacheesecakes.com",
    description: "Online catalog and ordering for a local dessert brand.",
    challenge: "Customers needed quick product discovery on mobile-first traffic.",
    contribution: [
      "Developed catalog and checkout UI with clear hierarchy",
      "Streamlined ordering steps for repeat purchases",
    ],
    impact: [],
    frontend: ["React", "Tailwind CSS", "TypeScript"],
    backend: ["REST APIs"],
    hue: 340,
  },
  {
    slug: "flexi-app",
    name: "Flexi App",
    tagline: "School attendance (mobile)",
    category: "Mobile",
    year: "2025",
    featured: false,
    description:
      "Mobile attendance monitoring for schools with QR-based check-in and check-out.",
    challenge: "Manual attendance was slow and error-prone at school gates.",
    contribution: [
      "Contributed React Native screens for attendance workflows",
      "Implemented QR scanning for student check-in and check-out",
      "Supported Node.js services used by the mobile client",
    ],
    impact: ["~30% reduction in student check-in/out time"],
    frontend: ["React Native", "TypeScript"],
    backend: ["Node.js", "REST APIs"],
    hue: 195,
  },
];

export const featuredWorks = works.filter((w) => w.featured);

export function getWork(slug: string) {
  return works.find((w) => w.slug === slug);
}

export function workSlugs() {
  return works.map((w) => w.slug);
}
