import { siteConfig } from "@/lib/site";

/**
 * A server component: the year is computed at render time, so the footer no
 * longer flashes a placeholder before hydration the way the previous
 * `useEffect`-based version did.
 */
export const Footer = () => (
  <footer className="soft-divider px-6 py-8">
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 text-sm text-muted-foreground sm:flex-row">
      <p>
        © {new Date().getFullYear()} {siteConfig.name}
      </p>
      <p>Built with Next.js, Tailwind CSS, and Framer Motion</p>
    </div>
  </footer>
);
