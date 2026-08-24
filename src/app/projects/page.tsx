import type { Metadata } from "next";
import { ProjectExplorer } from "@/components/project-explorer";
import { Reveal } from "@/components/animations/reveal";
import { getProjects } from "@/lib/projects-server";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected engineering and machine learning work — production systems, applied research, and data pipelines.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-8 pb-10">
      <section className="grain-overlay relative rounded-[2rem] border border-border/70 bg-card/65 px-6 py-12 sm:p-12">
        <Reveal immediate>
          <h1 className="section-title text-center">Selected Work</h1>
        </Reveal>
        <Reveal immediate delay={0.1}>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            A set of projects focused on production-ready systems, machine learning, and applied research.
          </p>
        </Reveal>
      </section>

      {projects.length > 0 ? (
        <section>
          <ProjectExplorer projects={projects} />
        </section>
      ) : (
        <section className="surface-card p-8 text-center">
          <p className="text-muted-foreground">
            No projects are published yet. Check back shortly.
          </p>
        </section>
      )}
    </div>
  );
}
