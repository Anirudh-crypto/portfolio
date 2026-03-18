"use client";

import { AboutSection } from "@/components/about-section";
import { HeroSection } from "@/components/hero-section";
import { ProjectCard } from "@/components/project-card";
import { useFirestoreProjects } from "@/hooks/use-firestore-projects";
import { mergeProjects } from "@/lib/projects";
import { motion } from "framer-motion";

export default function HomePage() {
  const { projects: firestoreProjects } = useFirestoreProjects();
  const featuredProjects = mergeProjects(firestoreProjects).slice(0, 3);

  return (
    <main className="space-y-12 pb-10">
      <HeroSection />
      <AboutSection />

      <section className="rounded-[2rem] border border-border/70 bg-card/55 px-6 py-10 sm:p-10">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-3xl font-semibold sm:text-4xl"
        >
          Featured Projects
        </motion.h2>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              details={project.details}
              tech={project.tech}
              link={project.link}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
