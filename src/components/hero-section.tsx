"use client";

import Tilt from "react-parallax-tilt";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ParallaxDiv } from "./parallaxDiv";

export function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative flex items-center justify-center min-h-screen w-full text-center overflow-hidden">
      {/* Fullscreen Gradient Glow */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent" />

      {/* Floating Blob */}
      <motion.div
        className="absolute top-40 left-1/2 w-[40rem] h-[40rem] -translate-x-1/2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-3xl opacity-20 -z-10"
        animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 md:px-10 lg:px-16">
        {/* Title */}
        <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} transitionSpeed={1000} className="mb-10">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Hi, I’m Anirudh
          </motion.h1>
        </Tilt>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          A passionate Engineer developing software for fun and crafting immersive digital experiences through motion and design.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <Button
            onClick={() => router.push("/projects")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90"
          >
            View Projects
          </Button>
          <Button variant="outline" onClick={() => router.push("/contact")}>
            Contact Me
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-muted-foreground"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-1 h-8 rounded-full bg-gradient-to-b from-blue-500 to-purple-500 animate-pulse" />
        <span className="text-sm mt-3 tracking-widest opacity-70">Scroll</span>
      </motion.div>

      {/* Fullscreen Parallax Background */}
      <ParallaxDiv
        offset={150}
        className="absolute inset-0 w-full h-full -z-30 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15)_0%,transparent_70%)]"
      />
    </section>
  );
}
