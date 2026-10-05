import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkDetail } from "@/components/works/work-detail";
import { getWork, workSlugs } from "@/lib/works";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return workSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return {};
  return {
    title: work.name,
    description: work.description,
    alternates: { canonical: `/works/${slug}` },
    openGraph: { title: `${work.name} — ${work.tagline}`, description: work.description },
  };
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();
  return <WorkDetail work={work} />;
}
