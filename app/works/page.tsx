import type { Metadata } from "next";
import { WorksIndex } from "@/components/works/works-index";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Works",
  description: `Product work by ${site.name} — SaaS, e-commerce, and mobile interfaces.`,
  alternates: { canonical: "/works" },
};

export default function WorksPage() {
  return <WorksIndex />;
}
