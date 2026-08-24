import type { Metadata } from "next";
import { ProjectExplorer } from "@/components/project-explorer";
import { Container } from "@/components/shared/container";
import { Ticker } from "@/components/shared/ticker";
import { Sticker } from "@/components/shared/sticker";
import { getProjects } from "@/lib/projects-server";

export const metadata: Metadata = {
  title: "The Work",
  description:
    "Selected engineering and machine learning work — production systems, applied research, and streaming data pipelines.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <section className="blk-orange halftone border-b-[3px] border-foreground">
        <Container className="grid items-end gap-10 py-14 lg:grid-cols-[1fr_340px] lg:py-16">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] sm:text-xs">
              The Work
            </span>
            <h1 className="mt-5 font-display text-[clamp(2.4rem,1.6rem+3.4vw,4.6rem)]">
              Every episode,
              <br />
              in order.
            </h1>
          </div>
          <div>
            <p className="text-lg leading-relaxed">
              Streaming pipelines, multimodal models, and one dataset that needed a talking-to.
            </p>
            <div className="mt-6">
              <Sticker tone="cream" tilt={-3}>
                Season 02 in production
              </Sticker>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-12 lg:py-14">
        {projects.length > 0 ? (
          <ProjectExplorer projects={projects} />
        ) : (
          <div className="hard bg-card p-8 text-center">
            <p className="font-mono text-sm text-muted-foreground">
              {"// no episodes published yet. check back shortly."}
            </p>
          </div>
        )}
      </Container>

      <Ticker text="More episodes in post-production · Check back next season" />
    </>
  );
}
