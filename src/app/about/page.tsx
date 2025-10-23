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
          I’m a Software Developer with professional experience of 1.5 years at Bosch Global Software Technologies.
          I have also strong passion for machine learning and AI. I have worked on various projects involving computer vision
          and natural language processing. I love to explore new technologies and continuously enhance my skills.
        </p>
      </motion.div>
    </main>
  );
}
