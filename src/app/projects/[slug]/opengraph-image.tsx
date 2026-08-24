import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/lib/projects-server";
import { headlineOf } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

export const alt = "Project — Anirudh Prahlad Joshi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Per-project social card, drawn as the project's episode title card.
 *
 * Without this, sharing a project link falls back to the site-wide card unless
 * `imageUrl` happens to be set. Uses system fonts deliberately: `ImageResponse`
 * cannot reach the `next/font` faces without fetching the font binary at
 * request time, which is not worth the complexity for a social card.
 */
export default async function ProjectOpenGraphImage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProjectBySlug(params.slug);
  const headline = project ? headlineOf(project) : "Project not found";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#111823",
          color: "#F5F0E6",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div style={{ width: 26, height: 26, borderRadius: 13, background: "#E8703A" }} />
          <div style={{ width: 26, height: 26, borderRadius: 13, background: "#F2C038" }} />
          <div style={{ width: 26, height: 26, borderRadius: 13, background: "#1E86A8" }} />
          <div
            style={{
              marginLeft: 14,
              fontSize: 24,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#B9C2CF",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {project?.guestStarring ? `Guest starring ${project.guestStarring}` : "Selected work"}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.08, maxWidth: 1000 }}>
            {headline}
          </div>
          {project && project.tech.length > 0 && (
            <div
              style={{
                marginTop: 30,
                fontSize: 26,
                color: "#B9C2CF",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {project.tech.slice(0, 5).join("  ·  ")}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#8B95A4",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <span>{siteConfig.name}</span>
          <span>Software Engineer · ML</span>
        </div>
      </div>
    ),
    size
  );
}
