"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "@/components/icons";

const modes = ["system", "light", "dark"] as const;
type Mode = (typeof modes)[number];
const icons = { system: Monitor, light: Sun, dark: Moon };
const query = "(prefers-color-scheme: dark)";

function read(): Mode {
  const t = localStorage.getItem("theme");
  return t === "light" || t === "dark" ? t : "system";
}

function apply(mode: Mode) {
  const dark = mode === "dark" || (mode === "system" && matchMedia(query).matches);
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
}

function subscribe(cb: () => void) {
  addEventListener("storage", cb);
  addEventListener("themechange", cb);
  return () => {
    removeEventListener("storage", cb);
    removeEventListener("themechange", cb);
  };
}

export function ThemeToggle() {
  const mode = useSyncExternalStore(subscribe, read, () => "system" as Mode);
  const next = modes[(modes.indexOf(mode) + 1) % modes.length];
  const Icon = icons[mode];

  useEffect(() => {
    if (mode !== "system") return;
    const mq = matchMedia(query);
    const onChange = () => apply("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [mode]);

  return (
    <button
      type="button"
      onClick={() => {
        if (next === "system") localStorage.removeItem("theme");
        else localStorage.setItem("theme", next);
        apply(next);
        dispatchEvent(new Event("themechange"));
      }}
      aria-label={`Theme: ${mode}. Switch to ${next}.`}
      title={`Theme: ${mode}`}
      className="grid size-9 place-items-center rounded-md text-muted transition-colors hover:bg-surface hover:text-foreground"
    >
      <Icon />
    </button>
  );
}
