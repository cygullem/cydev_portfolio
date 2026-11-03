import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: 80,
          background: "#ef6534",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 28, opacity: 0.85 }}>{`${site.brand} · ${site.role}`}</div>
        <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05, maxWidth: 960 }}>
          {site.firstName.toUpperCase()}
        </div>
        <div style={{ width: 96, height: 6, background: "#ffffff", borderRadius: 3 }} />
      </div>
    ),
    size,
  );
}
