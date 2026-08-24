/**
 * Canonical site metadata, shared by the root layout, sitemap, robots, and the
 * OG image so they can never disagree.
 *
 * Set `NEXT_PUBLIC_SITE_URL` in production. Vercel's project URL is used as a
 * fallback, and localhost as a last resort so local builds still work.
 */
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000");

export const siteConfig = {
  name: "Anirudh Prahlad Joshi",
  shortName: "Anirudh",
  title: "Anirudh | Portfolio",
  description:
    "Software engineer working across modern web applications and machine learning systems — with professional experience at Bosch and applied research in computer vision and NLP.",
  locale: "en_US",
  links: {
    github: "https://github.com/Anirudh-crypto",
    linkedin: "https://www.linkedin.com/in/anirudhpjoshi/",
    email: "ani.josh01@gmail.com",
  },
} as const;
