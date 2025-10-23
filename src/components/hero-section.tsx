"use client";

import Tilt from "react-parallax-tilt";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ParallaxDiv } from "./parallaxDiv";


export function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-40 overflow-hidden">
      {/* Gradient Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent" />

      {/* Floating Blob */}
      <motion.div
        className="absolute top-40 left-1/3 w-96 h-96 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-3xl opacity-20 -z-10"
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 3D Title */}
      <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} transitionSpeed={1000} className="mb-10">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Hi, I’m Anirudh
        </motion.h1>
      </Tilt>

      {/* Subtitle */}
      <motion.p
        className="max-w-2xl text-lg text-muted-foreground mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        A passionate Engineer developing softwares for hobby.
      </motion.p>

      {/* Buttons */}
      <motion.div
        className="flex space-x-6"
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
        <Button
          variant="outline"
          onClick={() => router.push("/contact")}
        >
          Contact Me
        </Button>
      </motion.div>

      {/* Smooth Parallax Background */}
      <ParallaxDiv
        offset={100}
        className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15)_0%,transparent_70%)]"
      />
    </section>
  );
}
