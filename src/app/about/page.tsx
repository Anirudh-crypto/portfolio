"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl text-center space-y-6"
      >
        <h1 className="text-4xl font-bold">About Me</h1>
        <p className="text-muted-foreground leading-relaxed">
          I’m a creative developer focused on crafting unique digital experiences
          that blend design, motion, and technology. My passion lies in creating
          immersive UI with modern frontend tools like React, Next.js, and Framer Motion.
        </p>
      </motion.div>
    </main>
  );
}
