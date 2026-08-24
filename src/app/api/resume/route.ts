import { NextResponse } from "next/server";

/**
 * Serves the résumé version that matches the visitor's region.
 *
 * Anirudh keeps a separate CV for the German and Indian job markets. On Vercel
 * every request carries `x-vercel-ip-country`, set at the edge from the
 * visitor's IP; Vercel overwrites it on inbound requests, so it cannot be
 * spoofed in production. It is simply absent locally, which is what makes this
 * testable in development.
 *
 * Detection sets the DEFAULT only. IP geolocation is wrong often enough to
 * matter — VPNs, travel, a recruiter reading from a third country — so
 * `?region=in|de` always wins, and the About page links both explicitly.
 */

export const runtime = "nodejs";

/*
 * A response that varies by country must never be cached at a shared edge, or
 * the first visitor's region would decide the file everyone else receives.
 */
export const dynamic = "force-dynamic";

const REGIONS = {
  de: { file: "resume-de.pdf", filename: "Anirudh_Prahlad_Joshi_Resume_DE.pdf" },
  in: { file: "resume-in.pdf", filename: "Anirudh_Prahlad_Joshi_Resume_IN.pdf" },
} as const;

type Region = keyof typeof REGIONS;

/** Germany doubles as the international default. */
const DEFAULT_REGION: Region = "de";

const isRegion = (value: string | null): value is Region =>
  value !== null && Object.hasOwn(REGIONS, value);

const resolveRegion = (request: Request): { region: Region; source: string } => {
  const override = new URL(request.url).searchParams.get("region")?.toLowerCase() ?? null;

  if (isRegion(override)) {
    return { region: override, source: "override" };
  }

  const country = request.headers.get("x-vercel-ip-country")?.toUpperCase();

  if (country === "IN") {
    return { region: "in", source: "geo" };
  }

  return { region: DEFAULT_REGION, source: country ? "geo" : "default" };
};

/**
 * Reads the PDF back through the site's own origin rather than the filesystem:
 * `public/` is served from the CDN and is not guaranteed to be present in the
 * serverless function bundle.
 */
const fetchResume = async (requestUrl: string, region: Region) => {
  const response = await fetch(new URL(`/${REGIONS[region].file}`, requestUrl), {
    cache: "no-store",
  });

  return response.ok ? response : null;
};

export async function GET(request: Request) {
  const { region, source } = resolveRegion(request);

  let resolved = region;
  let file = await fetchResume(request.url, region);

  // A missing regional file should still hand over a CV, not a 404.
  if (!file && region !== DEFAULT_REGION) {
    console.warn(`Résumé for region "${region}" is missing — falling back to ${DEFAULT_REGION}.`);
    resolved = DEFAULT_REGION;
    file = await fetchResume(request.url, DEFAULT_REGION);
  }

  if (!file) {
    return NextResponse.json({ error: "Résumé is unavailable." }, { status: 404 });
  }

  return new NextResponse(file.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${REGIONS[resolved].filename}"`,
      "Cache-Control": "private, no-store",
      // Lets the choice be inspected with `curl -I`, without downloading.
      "X-Resume-Region": resolved,
      "X-Resume-Region-Source": source,
    },
  });
}
