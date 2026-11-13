"use client";

import { useEffect, useRef } from "react";

const DURATION = 1200;

export function StatValue({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = /^(\d+)(.*)$/.exec(value);

  useEffect(() => {
    const node = ref.current;
    const parsed = /^(\d+)(.*)$/.exec(value);
    if (!node || !parsed) return;
    const target = Number(parsed[1]);
    const tail = parsed[2];
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.textContent = value;
      return;
    }

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION);
          const eased = 1 - (1 - t) ** 3;
          node.textContent = `${Math.round(target * eased)}${tail}`;
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        node.textContent = `0${tail}`;
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <dd aria-label={value} className={className}>
      <span ref={ref} aria-hidden>
        {match ? `0${match[2]}` : value}
      </span>
    </dd>
  );
}
