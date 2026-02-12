"use client";

import { ProjectCard } from "@/components/project-card";
import { portfolioProjects } from "@/lib/projects";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  return (
    <main className="space-y-8 pb-10">
      <section className="grain-overlay relative rounded-[2rem] border border-border/70 bg-card/65 px-6 py-12 sm:p-12">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="section-title text-center"
        >
          Selected Work
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground"
        >
          A set of projects focused on production-ready systems, machine learning, and applied research.
        </motion.p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {portfolioProjects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            viewport={{ once: true }}
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              details={project.details}
              tech={project.tech}
              link={project.link}
            />
          </motion.div>
        ))}
      </section>
    </main>
  );
}
