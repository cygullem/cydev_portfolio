import type { ReactNode } from "react";

export function Section({
  id,
  index,
  label,
  title,
  children,
}: {
  id: string;
  index: string;
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
          {index} / {label}
        </p>
        <h2 id={`${id}-title`} className="font-display mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {title}
        </h2>
        <div className="mt-14">{children}</div>
      </div>
    </section>
  );
}
