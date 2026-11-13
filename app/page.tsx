import { site } from "@/lib/content";
import { OG_IMAGE_PATH } from "@/lib/seo";
import { PortfolioHero } from "@/components/home/portfolio-hero";
import { About } from "@/components/about/about";
import { FeaturedWorks } from "@/components/home/featured-works";
import { Experience } from "@/components/experience/experience";
import { Contact } from "@/components/contact/contact";
import { Footer } from "@/components/footer/footer";
import { ScrollEffects } from "@/components/motion/scroll-effects";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.brand,
      description: site.description,
      inLanguage: "en-US",
      publisher: { "@id": `${site.url}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      givenName: site.firstName,
      familyName: site.lastName,
      jobTitle: site.role,
      description: site.summary,
      url: site.url,
      image: `${site.url}${OG_IMAGE_PATH}`,
      email: site.email,
      telephone: site.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bogo City",
        addressRegion: "Cebu",
        addressCountry: "PH",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: site.education.school,
      },
      sameAs: [site.github, site.linkedin],
      knowsAbout: site.stack.split(" · "),
    },
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#service`,
      name: `${site.name} — ${site.role}`,
      url: site.url,
      image: `${site.url}${OG_IMAGE_PATH}`,
      areaServed: "PH",
      email: site.email,
      telephone: site.phone,
    },
  ],
};

export default function Home() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ScrollEffects />
      <PortfolioHero />
      {/* Positioned above the hero so it slides over the hero's parallax. */}
      <div className="relative z-10 bg-background">
        <About />
        <FeaturedWorks />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
