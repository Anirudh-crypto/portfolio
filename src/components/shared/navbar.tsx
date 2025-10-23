"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-6 px-6 md:px-12 bg-transparent">
      <Link href="/" className="text-xl font-semibold tracking-tight">
        Anirudh.dev
      </Link>
      <div className="flex items-center space-x-6">
        <Link href="/projects" className="hover:text-primary transition-colors">
          Projects
        </Link>
        <Link href="/about" className="hover:text-primary transition-colors">
          About
        </Link>
        <Link href="/contact" className="hover:text-primary transition-colors">
          Contact
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
};
