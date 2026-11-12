"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import { heroSpotlightClockProjectAssets } from "@/lib/content";

const STEP_MS = 5000;
const MOVE_MS = 1200;
const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";
const CARD_PX = 150;
const RADIUS = `calc(${CARD_PX}px + 5.25rem)`;
/** Spoke angle of the focused slot: 9 o'clock, the innermost visible position. */
const FOCUS_DEG = 180;

const items = heroSpotlightClockProjectAssets;
const stepDeg = 360 / items.length;

type ClockItem = (typeof items)[number];

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

function shortestDelta(deg: number) {
  let d = ((deg % 360) + 360) % 360;
  if (d > 180) d -= 360;
  return d;
}

function lensStrength(deltaDeg: number) {
  const steps = Math.min(Math.abs(deltaDeg) / stepDeg, 3);
  return {
    scale: 1.1 - steps * 0.14,
    opacity: 1 - steps * 0.2,
    isFocus: steps < 0.45,
  };
}

function SpotlightCard({
  item,
  rotate,
  scale,
  opacity,
  isFocus,
}: {
  item: ClockItem;
  rotate: number;
  scale: number;
  opacity: number;
  isFocus: boolean;
}) {
  return (
    <Link
      href={`/works/${item.slug}`}
      className="block size-37.5 origin-center will-change-[transform,opacity]"
      style={{
        // Counter-rotates the dial with identical timing, so the card stays upright.
        transform: `rotate(${rotate}deg) scale(${scale})`,
        opacity,
        transition: `transform ${MOVE_MS}ms ${EASE}, opacity ${MOVE_MS}ms ${EASE}`,
      }}
    >
      <div
        className={`relative size-37.5 overflow-hidden rounded-lg border bg-white/10 shadow-[0_10px_36px_-14px_rgba(0,0,0,0.5)] transition-colors duration-500 ${
          isFocus ? "border-white/50" : "border-white/20"
        }`}
      >
        <Image
          src={item.cover}
          alt=""
          width={CARD_PX}
          height={CARD_PX}
          sizes={`${CARD_PX}px`}
          loading="eager"
          draggable={false}
          className="size-full object-cover object-center"
        />
      </div>
      <p
        className={`mt-2 truncate font-mono text-[10px] tracking-wide transition-colors duration-500 ${
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
  const shellRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  // One state change per tick; the movement itself is CSS transitions on
  // transform/opacity, which run on the compositor and stay smooth while the
  // main thread is busy (e.g. the cursor image trail).
  useEffect(() => {
    const el = shellRef.current;
    if (reduced || !el) return;

    let id = 0;
    let inView = false;
    const sync = () => {
      window.clearInterval(id);
      id = 0;
      if (inView && !document.hidden) {
        id = window.setInterval(() => setStep((s) => s + 1), STEP_MS);
      }
    };
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);

    return () => {
      window.clearInterval(id);
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [reduced]);

  const dialDeg = step * stepDeg;

  return (
    <div
      ref={shellRef}
      aria-label="Project highlights"
      className="pointer-events-none absolute right-0 top-1/2 z-100 hidden -translate-y-1/2 overflow-x-clip overflow-y-visible sm:block"
      style={
        {
          "--radius": RADIUS,
          width: `calc(${RADIUS} * 1.08 + ${CARD_PX}px)`,
          height: `calc(2 * ${RADIUS} + ${CARD_PX}px + 1.75rem)`,
        } as CSSProperties
      }
    >
      <div
        className="absolute right-0 top-1/2 size-0 will-change-transform"
        style={{
          transform: `rotate(${dialDeg}deg)`,
          transition: `transform ${MOVE_MS}ms ${EASE}`,
        }}
      >
        {items.map((item, i) => {
          const spoke = FOCUS_DEG + i * stepDeg;
          const { scale, opacity, isFocus } = lensStrength(
            shortestDelta(i * stepDeg + dialDeg),
          );

          return (
            <div
              key={item.slug}
              className="pointer-events-auto absolute left-0 top-0 size-37.5"
              style={{
                marginLeft: -CARD_PX / 2,
                marginTop: -CARD_PX / 2,
                transform: `rotate(${spoke}deg) translateX(var(--radius)) rotate(${-spoke}deg)`,
              }}
            >
              <SpotlightCard
                item={item}
                rotate={-dialDeg}
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
