import { site } from "@/lib/content";
import { PortfolioHero } from "@/components/home/portfolio-hero";
import { About } from "@/components/about/about";
import { Experience } from "@/components/experience/experience";
import { Contact } from "@/components/contact/contact";
import { Footer } from "@/components/footer/footer";

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
      <PortfolioHero />
      <div className="bg-background">
        <About />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
