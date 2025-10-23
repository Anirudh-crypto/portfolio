"use client";
import { useEffect, useState } from "react";

export const Footer = () => {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="py-10 text-center text-gray-500 dark:text-gray-400 text-sm">
      © {year ?? "—"} Anirudh — Crafted with ❤️ using Next.js & Tailwind
    </footer>
  );
};
