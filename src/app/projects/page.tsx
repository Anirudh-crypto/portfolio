"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { ProjectCard } from "@/components/project-card";
import { ParallaxDiv } from "@/components/parallaxDiv";

export default function ProjectsPage() {
  const projects = [
    {
      title: "Federated Sentiment Analysis",
      description:
        "A sentiment analysis tool for social media using Apache Kafka to handle real-time data streams.",
    },
    {
      title: "Understanding V in Multi-Modal Language Models",
      description:
        "A research project exploring the visual capabilities of multi-modal language models.",
    },
    {
      title: "Debiasing the TextVQA Dataset",
      description:
        "A project focused on reducing biases in the TextVQA dataset to improve model fairness and accuracy.",
    },
  ];

  // Mouse-reactive background movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 20 });
  const blobX = useTransform(smoothX, [0, 1], ["-8%", "8%"]);
  const blobY = useTransform(smoothY, [0, 1], ["-8%", "8%"]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-20 md:px-12 lg:px-24">
      {/* Floating background glow */}
      <motion.div
        className="absolute top-1/3 left-1/2 w-[40rem] h-[40rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-3xl opacity-20 -z-10"
        style={{ x: blobX, y: blobY }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-extrabold mb-16 text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-md"
      >
        My Projects
      </motion.h1>

      {/* Projects Grid */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <ProjectCard
              title={project.title}
              description={project.description}
            />
          </motion.div>
        ))}
      </div>

      {/* Parallax background layer */}
      <ParallaxDiv
        offset={150}
        className="absolute top-0 left-0 w-[120vw] h-[120vh] -translate-x-[10vw] -translate-y-[10vh] -z-20 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.1)_0%,transparent_70%)]"
      />
    </main>
  );
}
