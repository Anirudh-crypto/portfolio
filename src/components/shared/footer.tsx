"use client";

import { useEffect, useState } from "react";

export const Footer = () => {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="soft-divider px-6 py-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 text-sm text-muted-foreground sm:flex-row">
        <p>© {year ?? "-"} Anirudh Prahlad Joshi</p>
        <p>Built with Next.js, Tailwind CSS, and Framer Motion</p>
      </div>
    </footer>
  );
};
