import { Container } from "@/components/shared/container";
import { Dots } from "@/components/shared/dots";
import { siteConfig } from "@/lib/site";

/**
 * A server component: the year is computed at render time, so the footer never
 * flashes a placeholder before hydration.
 */
export const Footer = () => (
  <footer className="blk-ink halftone border-t-[3px] border-foreground">
    <Container className="flex flex-col gap-5 py-9 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <Dots size={13} />
        <p className="text-sm font-bold">
          No live studio audience was harmed in the making of this portfolio.
        </p>
      </div>
      <p className="font-mono text-xs tracking-[0.16em] opacity-75">
        © {new Date().getFullYear()} · {siteConfig.name.toUpperCase()}
      </p>
    </Container>
  </footer>
);
