import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AboutSection } from "@/components/about-section";
import { HeroSection } from "@/components/hero-section";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/animations/reveal";
import { getProjects } from "@/lib/projects-server";

export default async function HomePage() {
  const featuredProjects = (await getProjects()).slice(0, 3);

  return (
    <div className="space-y-12 pb-10">
      <HeroSection />
      <AboutSection />

      <section className="rounded-[2rem] border border-border/70 bg-card/55 px-6 py-10 sm:p-10">
        <Reveal as="div" duration={0.5}>
          <h2 className="mb-8 text-3xl font-semibold sm:text-4xl">Featured Projects</h2>
        </Reveal>

        {featuredProjects.length > 0 ? (
          <>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {featuredProjects.map((project, index) => (
                <Reveal key={project.id} delay={index * 0.08} className="h-full">
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>

            <Link
              href="/projects"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm transition-colors hover:bg-muted/50"
            >
              See all projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">Projects are being updated. Check back shortly.</p>
        )}
      </section>
    </div>
  );
}
