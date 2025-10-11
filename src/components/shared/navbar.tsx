"use client";
import Link from "next/link";
import ModeToggle from "@/components/mode-toggle";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full flex items-center justify-between p-4 backdrop-blur-lg z-50">
      <Link href="/" className="font-bold text-lg">My Portfolio</Link>
      <div className="flex gap-6 items-center">
        <Link href="/about">About</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/contact">Contact</Link>
        <ModeToggle />
      </div>
    </nav>
  );
}
