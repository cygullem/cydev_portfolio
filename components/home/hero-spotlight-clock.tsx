"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import gsap from "gsap";
import { heroSpotlightClockProjectAssets } from "@/lib/content";

const STEP_S = 5;
const CARD_PX = 150;
const RADIUS = `calc(${CARD_PX}px + 5.25rem)`;

type ClockItem = (typeof heroSpotlightClockProjectAssets)[number];

function subscribeReduced(onStoreChange: () => void) {
  const mq = matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReduced,
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true,
  );
}

function syncDialRotate(el: HTMLElement) {
  const rotate = Number(gsap.getProperty(el, "rotate")) || 0;
  el.style.setProperty("--dial-rotate", `${rotate}deg`);
}

function shortestDelta(deg: number) {
  let d = ((deg % 360) + 360) % 360;
  if (d > 180) d -= 360;
  return d;
}

function lensStrength(deltaDeg: number, stepDeg: number) {
  const steps = Math.min(Math.abs(deltaDeg) / stepDeg, 3);
  return {
    scale: 1.1 - steps * 0.14,
    opacity: 1 - steps * 0.2,
    isFocus: Math.abs(deltaDeg) < stepDeg * 0.45,
  };
}

function SpotlightCard({
  item,
  scale,
  opacity,
  isFocus,
}: {
  item: ClockItem;
  scale: number;
  opacity: number;
  isFocus: boolean;
}) {
  return (
    <Link
      href={`/works/${item.slug}`}
      className="block size-37.5 origin-center"
      style={{
        transform: `scale(${scale})`,
        opacity,
        transition: "transform 0.45s ease, opacity 0.45s ease",
      }}
    >
      <div
        className={`relative size-37.5 overflow-hidden rounded-lg border bg-white/10 shadow-[0_10px_36px_-14px_rgba(0,0,0,0.5)] ${
          isFocus ? "border-white/50" : "border-white/20"
        }`}
      >
        <Image
          src={item.cover}
          alt=""
          fill
          sizes="150px"
          className="object-cover object-center"
        />
      </div>
      <p
        className={`mt-2 truncate font-mono text-[10px] tracking-wide ${
          isFocus ? "text-white" : "text-white/55"
        }`}
      >
        {item.label}
      </p>
    </Link>
  );
}

export function HeroSpotlightClock() {
  const reduced = useReducedMotion();
  const items = useMemo(() => [...heroSpotlightClockProjectAssets], []);
  const count = items.length;
  const dialRef = useRef<HTMLDivElement>(null);
  const spinRef = useRef<gsap.core.Tween | null>(null);
  const [lensDeg, setLensDeg] = useState(0);

  const stepDeg = count > 0 ? 360 / count : 0;

  useEffect(() => {
    const el = dialRef.current;
    if (reduced || count < 2 || !el) return;

    gsap.set(el, { xPercent: 50, yPercent: -50, rotate: 0, force3D: true });
    el.style.setProperty("--dial-rotate", "0deg");

    let disposed = false;

    const advance = () => {
      if (disposed) return;
      const current = Number(gsap.getProperty(el, "rotate")) || 0;
      spinRef.current?.kill();
      spinRef.current = gsap.to(el, {
        rotate: current + stepDeg,
        duration: STEP_S,
        ease: "power2.inOut",
        overwrite: "auto",
        onUpdate: () => syncDialRotate(el),
        onComplete: () => {
          if (disposed) return;
          syncDialRotate(el);
          setLensDeg(Number(gsap.getProperty(el, "rotate")) || 0);
          advance();
        },
      });
    };

    advance();

    return () => {
      disposed = true;
      spinRef.current?.kill();
      gsap.killTweensOf(el);
    };
  }, [count, reduced, stepDeg]);

  if (count === 0) return null;

  const dial = `calc(2 * ${RADIUS})`;
  const peek = `calc(${RADIUS} * 1.08 + ${CARD_PX}px)`;
  const shellHeight = `calc(${dial} + ${CARD_PX}px + 1.75rem)`;

  return (
    <div
      data-ph-float
      aria-label="Project highlights"
      className="pointer-events-none absolute right-0 top-1/2 z-30 hidden -translate-y-1/2 overflow-x-clip overflow-y-visible sm:block"
      style={
        {
          "--radius": RADIUS,
          "--dial": dial,
          width: peek,
          height: shellHeight,
        } as CSSProperties
      }
    >
      <div
        ref={dialRef}
        className="absolute right-0 top-1/2 size-(--dial) origin-center will-change-transform"
        style={{ "--dial-rotate": "0deg" } as CSSProperties}
      >
        {items.map((item, i) => {
          const spoke = i * stepDeg;
          const world = spoke + lensDeg;
          const { scale, opacity, isFocus } = lensStrength(
            shortestDelta(world),
            stepDeg,
          );

          return (
            <div
              key={`${item.slug}-${i}`}
              className="pointer-events-auto absolute left-1/2 top-1/2 size-37.5 will-change-transform"
              style={{
                marginLeft: -CARD_PX / 2,
                marginTop: -CARD_PX / 2,
                transform: `rotate(${spoke}deg) translateX(var(--radius)) rotate(calc(${-spoke}deg - var(--dial-rotate, 0deg)))`,
              }}
            >
              <SpotlightCard
                item={item}
                scale={scale}
                opacity={opacity}
                isFocus={isFocus}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
