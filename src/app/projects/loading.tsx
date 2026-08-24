import { ProjectGridSkeleton } from "@/components/project-card-skeleton";

export default function ProjectsLoading() {
  return (
    <div className="space-y-8 pb-10">
      <section className="grain-overlay relative rounded-[2rem] border border-border/70 bg-card/65 px-6 py-12 sm:p-12">
        <h1 className="section-title text-center">Selected Work</h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          A set of projects focused on production-ready systems, machine learning, and applied research.
        </p>
      </section>

      <ProjectGridSkeleton />
    </div>
  );
}
