"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const router = useRouter();

  return (
    <section className="grain-overlay relative overflow-hidden rounded-[2rem] border border-border/70 bg-card/50 px-6 pb-16 pt-14 sm:px-10 sm:pt-20">
      <motion.div
        className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[hsl(var(--accent)/0.24)] blur-3xl"
        animate={{ y: [0, 12, 0], x: [0, -8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/65 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Software Engineer and ML Enthusiast
        </motion.p>

        <motion.h1
          className="section-title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.65 }}
        >
          Building thoughtful software with a focus on performance, clarity, and craft.
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.65 }}
        >
          I am Anirudh, a developer working across modern web apps and machine learning systems.
          I care about reliable architecture and elegant user experience.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36, duration: 0.65 }}
        >
          <Button
            onClick={() => router.push("/projects")}
            className="h-10 rounded-full bg-[hsl(var(--accent))] px-6 text-[hsl(var(--accent-foreground))] hover:opacity-90"
          >
            View Projects <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/contact")}
            className="h-10 rounded-full border-border bg-transparent px-6"
          >
            Contact
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
