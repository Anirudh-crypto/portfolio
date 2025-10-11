"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mt-24 border-t border-border py-10 text-center text-sm text-muted-foreground"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-6">
        <p>© {new Date().getFullYear()} YourName. All rights reserved.</p>

        <div className="flex gap-6 justify-center">
          <Link href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
            GitHub
          </Link>
          <Link href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </Link>
          <Link href="mailto:you@example.com">Email</Link>
        </div>
      </div>
    </motion.footer>
  );
}
