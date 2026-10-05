import { site } from "@/lib/content";
import { Section } from "@/components/section";
import { ContactForm } from "./contact-form";

export function Contact() {
  return (
    <Section id="contact" index="04" label="Contact" title="Let's build something useful.">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <div>
          <p className="max-w-sm text-lg leading-relaxed text-muted">
            Have a product, idea or opportunity? I&apos;d love to hear about it.
          </p>
          <a href={`mailto:${site.email}`} className="mt-8 inline-block text-xl font-medium tracking-tight underline decoration-line underline-offset-8 transition-colors hover:decoration-accent sm:text-2xl">
            {site.email}
          </a>
          <ul className="mt-8 flex gap-6 text-sm text-muted">
            <li>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">GitHub</a>
            </li>
            <li>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">LinkedIn</a>
            </li>
          </ul>
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}
