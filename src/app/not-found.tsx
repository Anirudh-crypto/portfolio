import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { Dots } from "@/components/shared/dots";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "The one where the page wasn't there",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="blk-ink halftone border-b-[3px] border-foreground">
      <Container className="flex min-h-[60vh] flex-col justify-center py-16">
        <div className="flex items-center gap-4">
          <Dots size={17} />
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] opacity-85 sm:text-xs">
            S404 · Missing episode
          </span>
        </div>

        <h1 className="mt-6 max-w-[18ch] font-display text-[clamp(2.2rem,1.5rem+3vw,4.2rem)]">
          The one where the page wasn&rsquo;t there
        </h1>

        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed opacity-90">
          This link may be out of date, or the episode was renamed between seasons.
        </p>

        <div className="mt-9 flex flex-wrap gap-4">
          <Button asChild variant="chunky" size="xl">
            <Link href="/">Back to the pilot</Link>
          </Button>
          <Button asChild variant="chunkyCream" size="xl">
            <Link href="/projects">Browse episodes</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
