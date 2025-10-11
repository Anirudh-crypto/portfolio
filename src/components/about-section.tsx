"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AboutSection() {
  return (
    <section className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 px-6">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full md:w-1/2"
      >
        <Image
          src="/profile.jpg"
          alt="Profile"
          width={500}
          height={500}
          className="rounded-2xl shadow-lg object-cover"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full md:w-1/2 text-center md:text-left space-y-6"
      >
        <h2 className="text-4xl font-bold">About Me</h2>
        <p className="text-muted-foreground leading-relaxed">
          I’m a creative front-end developer passionate about crafting elegant,
          accessible, and dynamic web interfaces. I love blending visual design
          and code to build user-centered digital experiences.
        </p>
      </motion.div>
    </section>
  );
}
