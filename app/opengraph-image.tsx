import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: 80, background: "#0b0b0d", color: "#f4f4f5" }}>
        <div style={{ fontSize: 28, color: "#9a9aa5" }}>{`${site.name} · ${site.role}`}</div>
        <div style={{ fontSize: 84, fontWeight: 600, letterSpacing: -3, lineHeight: 1.05, maxWidth: 960 }}>{site.headline}</div>
        <div style={{ width: 96, height: 6, background: "#6e8bff", borderRadius: 3 }} />
      </div>
    ),
    size,
  );
}
