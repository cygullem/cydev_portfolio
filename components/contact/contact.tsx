import type { ReactNode } from "react";
import Link from "next/link";
import { site } from "@/lib/content";
import { ArrowUpRight } from "@/components/icons";

function InfoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex min-h-38 flex-col justify-between bg-[#e8e8e8] p-6 sm:min-h-42 sm:p-8">
      <p className="text-sm text-muted">{label}</p>
      <div className="font-display text-lg font-semibold uppercase leading-snug tracking-tight text-foreground sm:text-xl">
        {children}
      </div>
    </div>
  );
}

export function Contact() {
  const year = new Date().getFullYear();
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Let's talk — portfolio")}`;

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-[#f3f3f3] px-5 py-14 sm:px-10 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-360">
        <div className="flex items-start justify-between gap-6">
          <Link href="/" className="font-display text-sm font-semibold tracking-tight sm:text-base">
            {site.brand}
          </Link>
          <p className="shrink-0 text-right font-mono text-[10px] uppercase tracking-widest text-muted sm:text-xs">
            ©{year}{" "}
          </p>
        </div>

        <h2 id="contact-title" className="font-hero mt-10 text-[clamp(3.25rem,13vw,9.5rem)] leading-[0.92] tracking-tight text-foreground">
          CONTACT ME
        </h2>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <div>
            <p className="inline-flex items-center gap-2 bg-[#e8e8e8] px-3 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-foreground sm:text-xs">
              <span aria-hidden className="text-hero-orange">
                ✱
              </span>
              Ready to start?
            </p>
            <h3 className="font-display mt-10 text-4xl font-semibold uppercase tracking-tight sm:text-5xl lg:text-6xl">
              Get in touch
            </h3>
            <Link
              href={mailto}
              className="group mt-10 inline-flex cursor-pointer overflow-hidden rounded-sm"
            >
              <span className="flex items-center bg-[#e8e8e8] px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-foreground transition-colors group-hover:bg-[#dedede] sm:px-10 sm:py-5 sm:text-sm">
                Book a call
              </span>
              <span className="grid w-14 place-items-center bg-hero-orange text-white transition-colors group-hover:bg-hero-orange-deep sm:w-16">
                <ArrowUpRight className="size-5" />
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <InfoCard label="Address:">{site.location}</InfoCard>
            <InfoCard label="Open hours:">Flexible · UTC+8 (PH)</InfoCard>
            <InfoCard label="Phone:">
              <Link href={`tel:${site.phone.replace(/\s/g, "")}`} className="cursor-pointer hover:text-hero-orange-deep">
                {site.phone}
              </Link>
            </InfoCard>
            <InfoCard label="Email:">
              <Link href={mailto} className="cursor-pointer break-all hover:text-hero-orange-deep">
                {site.email}
              </Link>
            </InfoCard>
          </div>
        </div>
      </div>
    </section>
  );
}
