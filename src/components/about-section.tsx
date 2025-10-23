"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ParallaxDiv } from "./parallaxDiv";

export function AboutSection() {
  return (
    <section className="relative py-20 px-6 flex flex-col items-center justify-center text-center">
      <motion.h2
        className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        About Me
      </motion.h2>

      <div className="flex flex-col md:flex-col items-center gap-10 max-w-15xl">
        <motion.div
          className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/images/pic.jpg"
            alt="Anirudh"
            fill
            className="object-cover"
          />
        </motion.div>

        <motion.p
          className="text-lg text-muted-foreground leading-relaxed md:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          I’m a Software Developer with professional experience of 1.5 years at Bosch Global Software Technologies.
          I have also strong passion for machine learning and AI. I have worked on various projects involving computer vision
          and natural language processing. I love to explore new technologies and continuously enhance my skills.
        </motion.p>
      </div>

      {/* Background Parallax Gradient */}
      <ParallaxDiv
        offset={80}
        className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.15)_0%,transparent_70%)]"
      />
    </section>
  );
}
