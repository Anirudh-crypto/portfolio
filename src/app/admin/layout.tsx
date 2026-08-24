import type { Metadata } from "next";

/**
 * The admin page is a client component and cannot export `metadata` itself,
 * so the noindex directive lives here. `robots.ts` also disallows the path;
 * this covers crawlers that reach the page by a direct link anyway.
 */
export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
