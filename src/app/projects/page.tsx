"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/project-card";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen p-8 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-12"
      >
        My Projects
      </motion.h1>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <ProjectCard key={i} />
        ))}
      </div>
    </main>
  );
}
