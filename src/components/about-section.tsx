"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AboutSection() {
  return (
    <section className="mt-10 grid gap-8 rounded-[2rem] border border-border/70 bg-card/70 p-6 sm:p-10 lg:grid-cols-[220px_1fr] lg:items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto h-44 w-44 overflow-hidden rounded-full border border-border shadow-sm"
      >
        <Image src="/images/pic.jpg" alt="Anirudh portrait" fill className="object-cover" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="mb-3 text-3xl font-semibold sm:text-4xl">About Me</h2>
        <p className="max-w-3xl text-muted-foreground">
          I have professional experience at Bosch Global Software Technologies and a strong focus on
          machine learning. My work spans software engineering, computer vision, and natural language
          processing, with an emphasis on robust implementation and practical outcomes.
        </p>
      </motion.div>
    </section>
  );
}
