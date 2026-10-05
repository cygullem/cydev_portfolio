import { site } from "@/lib/content";
import { HeroScene } from "@/components/hero/hero-scene";
import { FeaturedWorks } from "@/components/home/featured-works";
import { About } from "@/components/about/about";
import { Experience } from "@/components/experience/experience";
import { Contact } from "@/components/contact/contact";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  email: `mailto:${site.email}`,
  sameAs: [site.github, site.linkedin],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <HeroScene />
      <FeaturedWorks />
      <About />
      <Experience />
      <Contact />
    </>
  );
}
