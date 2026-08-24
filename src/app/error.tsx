"use client";

import { useEffect } from "react";
import { Container } from "@/components/shared/container";
import { Dots } from "@/components/shared/dots";
import { Button } from "@/components/ui/button";

/**
 * Route-level error boundary. This is load-bearing because project data is
 * fetched during rendering — a Firestore outage should surface a recoverable
 * page rather than a blank screen.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="blk-ink halftone border-b-[3px] border-foreground">
      <Container className="flex min-h-[60vh] flex-col justify-center py-16">
        <div className="flex items-center gap-4">
          <Dots size={17} />
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] opacity-85 sm:text-xs">
            Technical difficulties
          </span>
        </div>

        <h1 className="mt-6 max-w-[18ch] font-display text-[clamp(2.2rem,1.5rem+3vw,4.2rem)]">
          We&rsquo;ll be right back after this break
        </h1>

        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed opacity-90">
          Something went wrong loading this page. Trying again usually sorts it out.
        </p>

        {error.digest && (
          <p className="mt-4 font-mono text-xs opacity-60">
            {"// reference: "}
            {error.digest}
          </p>
        )}

        <div className="mt-9">
          <Button onClick={reset} variant="chunky" size="xl">
            Roll it again
          </Button>
        </div>
      </Container>
    </section>
  );
}
