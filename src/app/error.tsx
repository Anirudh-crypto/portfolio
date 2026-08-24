"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

/**
 * Route-level error boundary. This became load-bearing once project data is
 * fetched during rendering — a Firestore outage should surface a recoverable
 * page, not a blank screen.
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
    <div className="flex min-h-[60vh] items-center justify-center pb-10">
      <div className="surface-card w-full max-w-lg p-8 text-center sm:p-10">
        <h1 className="text-3xl font-semibold sm:text-4xl">Something went wrong</h1>
        <p className="mt-4 text-muted-foreground">
          This page failed to load. Trying again usually fixes it.
        </p>

        {error.digest && (
          <p className="mt-3 text-xs text-muted-foreground">Reference: {error.digest}</p>
        )}

        <Button onClick={reset} className="mt-8 rounded-full px-6">
          Try again
        </Button>
      </div>
    </div>
  );
}
