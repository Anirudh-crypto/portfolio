import { EpisodeListSkeleton } from "@/components/project-card-skeleton";
import { Container } from "@/components/shared/container";

export default function ProjectsLoading() {
  return (
    <>
      <section className="blk-orange halftone border-b-[3px] border-foreground">
        <Container className="py-14 lg:py-16">
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] sm:text-xs">
            The Work
          </span>
          <h1 className="mt-5 font-display text-[clamp(2.4rem,1.6rem+3.4vw,4.6rem)]">
            Every episode,
            <br />
            in order.
          </h1>
        </Container>
      </section>

      <Container className="py-12 lg:py-14">
        <p className="mb-9 font-mono text-sm text-muted-foreground">
          {"// cueing up the episodes…"}
        </p>
        <EpisodeListSkeleton />
      </Container>
    </>
  );
}
