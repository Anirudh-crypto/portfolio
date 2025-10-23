"use client";

import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ProjectCard } from "@/components/project-card";
import { motion } from "framer-motion";
import { ParallaxDiv } from "@/components/parallaxDiv";

export default function HomePage() {
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
    <main className="flex flex-col items-center justify-center overflow-hidden">
      <HeroSection />
      <AboutSection />

      {/* Projects Section */}
      <section className="relative py-20 px-6 text-center w-full">
        <motion.h2
          className="text-4xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Featured Projects
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
            />
          ))}
        </div>

        {/* Background Parallax Glow */}
        <ParallaxDiv
          offset={120}
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.1)_0%,transparent_70%)]"
        />
      </section>
    </main>
  );
}
