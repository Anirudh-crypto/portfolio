"use client";

import { motion } from "framer-motion";
import { useParallax } from "@/hooks/useParallax";

export function HeroSection() {
  const { ref, y } = useParallax([0, 1], [0, 50]);

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-background to-muted"
    >
      <motion.h1
        style={{ y }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl md:text-7xl font-bold"
      >
        <span className="text-primary">Hey, I’m You</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="mt-4 max-w-md text-muted-foreground"
      >
        A creative developer building interactive web experiences.
      </motion.p>
    </section>
  );
}
