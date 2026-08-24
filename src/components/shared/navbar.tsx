"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Container } from "@/components/shared/container";
import { Dots } from "@/components/shared/dots";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/projects", label: "The Work" },
  { href: "/about", label: "The Story" },
  { href: "/contact", label: "Say Hi" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className="sticky top-0 z-50 border-b-[3px] border-foreground bg-background">
      <Container>
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3 sm:gap-4">
            <span className="font-display text-xl leading-none sm:text-2xl">ANIRUDH</span>
            <Dots size={9} className="hidden sm:flex" />
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "border-2 px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] transition-colors",
                  isActive(item.href)
                    ? "border-foreground bg-mustard text-navy"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-11 w-11 items-center justify-center border-[3px] border-foreground text-foreground"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </Container>

      {/*
        CSS-only accordion: the grid row animates from 0fr to 1fr over an
        overflow-hidden child, which transitions to the content's natural
        height without JavaScript measuring it. Replaces the one framer-motion
        usage left in the app — worth ~40 kB off every page, since the navbar
        sits in the root layout.

        `prefers-reduced-motion` neutralises the transition via globals.css.
      */}
      <div
        id="mobile-menu"
        // Hidden from assistive tech and tab order while collapsed.
        inert={!isOpen ? true : undefined}
        className={cn(
          "grid overflow-hidden bg-background transition-[grid-template-rows] duration-200 ease-out md:hidden",
          isOpen ? "grid-rows-[1fr] border-t-[3px] border-foreground" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <Container className="flex flex-col gap-2 py-4">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex h-12 items-center border-[3px] px-4 font-mono text-xs font-bold uppercase tracking-[0.14em]",
                  isActive(item.href)
                    ? "border-foreground bg-mustard text-navy"
                    : "border-foreground text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </Container>
        </div>
      </div>
    </nav>
  );
};
