import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — Software Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The default social card for every page that does not define its own.
 * Rendered at build/request time by Satori, so it stays in sync with
 * `siteConfig` instead of being a static asset that goes stale.
 */
export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #111823 0%, #1a2433 55%, #14303d 100%)",
          color: "#f2ede3",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#6fc9dd",
          }}
        >
          Software Engineer · ML
        </div>

        <div style={{ fontSize: 86, fontWeight: 700, lineHeight: 1.1, marginTop: 28 }}>
          {siteConfig.name}
        </div>

        <div
          style={{
            fontSize: 32,
            lineHeight: 1.4,
            marginTop: 28,
            color: "#b9c2cf",
            maxWidth: 900,
          }}
        >
          Building thoughtful software with a focus on performance, clarity, and craft.
        </div>

        <div style={{ display: "flex", gap: 28, marginTop: 48, fontSize: 24, color: "#8b95a4" }}>
          <span>github.com/Anirudh-crypto</span>
          <span>·</span>
          <span>linkedin.com/in/anirudhpjoshi</span>
        </div>
      </div>
    ),
    size
  );
}
