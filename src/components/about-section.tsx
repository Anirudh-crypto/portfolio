"use client";

import { motion } from "framer-motion";
import { useParallax } from "@/hooks/useParallax";

export function AboutSection() {
  const { ref, y } = useParallax([0, 1], [0, -80]);

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col justify-center items-center bg-background text-center"
    >
      <motion.div style={{ y }} className="max-w-2xl px-6">
        <h2 className="text-4xl font-semibold mb-4">About Me</h2>
        <p className="text-muted-foreground leading-relaxed">
          I craft digital experiences with a focus on animation, interaction, and detail. 
          My work merges code and creativity to build fluid, modern web products.
        </p>
      </motion.div>
    </section>
  );
}
