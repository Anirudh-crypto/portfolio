"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full z-40 bg-transparent backdrop-blur-sm">
      <div className="flex items-center justify-between py-6 px-6 md:px-12">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight hover:text-primary transition-colors"
        >
          Anirudh.dev
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none p-2 rounded-lg hover:bg-accent transition"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-background/80 backdrop-blur-sm"
          >
            <div className="flex flex-col items-center py-6 space-y-6">
              <Link href="/projects" onClick={() => setIsOpen(false)} className="hover:text-primary text-lg transition-colors">
                Projects
              </Link>
              <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-primary text-lg transition-colors">
                About
              </Link>
              <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-primary text-lg transition-colors">
                Contact
              </Link>
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
