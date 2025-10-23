"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/project-card";
import { ParallaxDiv } from "@/components/parallaxDiv";


export default function ProjectsPage() {
  const projects = [
    {
      title: "Federated Sentiment Analysis",
      description: "A sentiment analysis tool for social media using apache kafka to handle real-time data streams.",
    },
    {
      title: "Understanding V in multi modal language models",
      description: "A research project exploring the visual capabilities of multi-modal language models.",
    },
    {
      title: "Debiasing the TextVQA dataset",
      description: "A project focused on reducing biases in the TextVQA dataset to improve model fairness and accuracy.",
    },
  ];


  return (
    <main className="relative min-h-screen p-20 flex flex-col items-center overflow-hidden">
      {/* Animated Header */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-bold mb-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
      >
        My Projects
      </motion.h1>

      {/* Projects Grid */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
          />
        ))}
      </div>

      {/* Parallax Background */}
      <ParallaxDiv
        offset={120}
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.1)_0%,transparent_70%)]"
      />
    </main>
  );
}
