import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center pb-10">
      <div className="surface-card w-full max-w-lg p-8 text-center sm:p-10">
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">404</p>
        <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">This page does not exist</h1>
        <p className="mt-4 text-muted-foreground">
          The link may be out of date, or the project may have been renamed.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-10 items-center rounded-full bg-[hsl(var(--accent))] px-6 text-sm font-medium text-[hsl(var(--accent-foreground))] transition-opacity hover:opacity-90"
          >
            Back home
          </Link>
          <Link
            href="/projects"
            className="inline-flex h-10 items-center rounded-full border border-border px-6 text-sm transition-colors hover:bg-muted/50"
          >
            Browse projects
          </Link>
        </div>
      </div>
    </div>
  );
}
