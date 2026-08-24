import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import { ProjectImage } from "@/components/project-image";
import { Container } from "@/components/shared/container";
import { Dots } from "@/components/shared/dots";
import { Button } from "@/components/ui/button";
import { getProjectBySlug, getProjects } from "@/lib/projects-server";
import { episodeCode, headlineOf, type Project } from "@/lib/projects";
import { siteUrl } from "@/lib/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Rendered on demand rather than prerendered per slug.
 *
 * With static generation, Next caches the `notFound()` result for an unknown
 * slug and replays it as a 200 — a soft 404 that search engines would index as
 * real content. Rendering per request also means newly added projects are
 * reachable immediately instead of waiting for a rebuild.
 *
 * This is not a per-request Firestore hit: `getProjects()` reads through the
 * tagged, revalidating fetch cache, so only the HTML is rebuilt each time.
 */
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    /*
     * The page below calls `notFound()`, which renders the correct not-found
     * UI — but the response has already begun streaming by then, so Next cannot
     * change the status line and the request returns 200 (a "soft" 404).
     * Marking it noindex is what stops search engines treating it as real,
     * indexable content.
     */
    return { title: "Episode not found", robots: { index: false, follow: false } };
  }

  const description = project.description || `${project.title} — a project by Anirudh Prahlad Joshi.`;

  return {
    title: headlineOf(project),
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: headlineOf(project),
      description,
      url: `${siteUrl}/projects/${project.slug}`,
      ...(project.imageUrl ? { images: [{ url: project.imageUrl }] } : {}),
    },
  };
}

const BEAT_TONES = ["bg-mustard", "bg-orange", "bg-teal text-cream", "bg-mustard"] as const;

const Beat = ({
  index,
  label,
  title,
  children,
}: {
  index: number;
  label: string;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="grid gap-8 border-t-[3px] border-foreground py-10 lg:grid-cols-[150px_1fr] lg:gap-10">
    <div>
      <div aria-hidden className="bigno font-display text-[64px] leading-none lg:text-[92px]">
        {String(index).padStart(2, "0")}
      </div>
      <div
        className={`mt-3 inline-block border-2 border-foreground px-2.5 py-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] shadow-[4px_4px_0_hsl(var(--foreground))] ${BEAT_TONES[index - 1]}`}
      >
        {label}
      </div>
    </div>
    <div>
      <h2 className="mb-4 max-w-[24ch] font-display text-2xl lg:text-3xl">{title}</h2>
      {children}
    </div>
  </div>
);

const Prose = ({ children }: { children: React.ReactNode }) => (
  <p className="max-w-[70ch] text-[16.5px] leading-relaxed text-muted-foreground">{children}</p>
);

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const index = projects.indexOf(project);
  const next: Project | undefined = projects[index + 1];
  const headline = headlineOf(project);
  const { title, description, details, tech, link, repoUrl, imageUrl, metrics } = project;

  /* Beats fall back to the bullet list when the long-form copy is not written. */
  const beats = [
    project.coldOpen && { label: "Cold open", title: "The problem", body: project.coldOpen },
    project.plot && { label: "The plot", title: "The approach", body: project.plot },
    project.twist && { label: "The twist", title: "What actually broke", body: project.twist },
    project.finale && { label: "Series finale", title: "Where it landed", body: project.finale },
  ].filter(Boolean) as { label: string; title: string; body: string }[];

  return (
    <>
      <section className="blk-teal halftone border-b-[3px] border-foreground">
        <Container className="py-10 lg:py-14">
          <Link
            href="/projects"
            className="inline-flex min-h-11 items-center gap-2 font-mono text-[11.5px] font-bold tracking-[0.16em]"
          >
            <ArrowLeft className="h-4 w-4" /> ALL EPISODES
          </Link>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <span className="bg-cream px-3 py-1.5 font-mono text-[13px] font-bold tracking-[0.18em] text-navy">
              {episodeCode(index)}
            </span>
            <Dots size={15} />
          </div>

          <h1 className="mt-6 max-w-[19ch] font-display text-[clamp(2.3rem,1.5rem+3.2vw,4.4rem)]">
            {headline}
          </h1>

          {headline !== title && (
            <p className="mt-5 max-w-[58ch] text-lg font-extrabold">{title}</p>
          )}

          {description && (
            <p className="mt-3 max-w-[58ch] text-lg leading-relaxed opacity-90">{description}</p>
          )}

          {(link || repoUrl) && (
            <div className="mt-9 flex flex-wrap gap-4">
              {link && (
                <Button asChild variant="chunky" size="xl">
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    Visit project <ExternalLink className="h-[18px] w-[18px]" />
                  </a>
                </Button>
              )}
              {repoUrl && (
                <Button asChild variant="chunkyCream" size="xl">
                  <a href={repoUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-[18px] w-[18px]" /> Source
                  </a>
                </Button>
              )}
            </div>
          )}
        </Container>
      </section>

      <Container className="py-12 lg:py-14">
        {metrics.length > 0 && (
          <div className="mb-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.slice(0, 4).map((metric, metricIndex) => (
              <div
                key={`${metric.label}-${metric.value}`}
                className={`hard-navy p-5 text-navy ${metricIndex % 2 === 0 ? "bg-mustard" : "bg-cream"}`}
              >
                {metric.label && (
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] opacity-70">
                    {metric.label}
                  </p>
                )}
                <p className="mt-2 font-mono text-base font-bold">{metric.value}</p>
              </div>
            ))}
          </div>
        )}

        {imageUrl && (
          <div className="hard relative mb-12 aspect-video w-full overflow-hidden">
            <ProjectImage
              src={imageUrl}
              alt={`${title} preview`}
              sizes="(max-width: 1280px) 100vw, 1150px"
              className="object-cover"
            />
          </div>
        )}

        {beats.length > 0
          ? beats.map((beat, beatIndex) => (
              <Beat key={beat.label} index={beatIndex + 1} label={beat.label} title={beat.title}>
                <Prose>{beat.body}</Prose>
              </Beat>
            ))
          : details.length > 0 && (
              <Beat index={1} label="The plot" title="What it took">
                <ul className="max-w-[70ch] list-disc space-y-2 pl-5 text-[16.5px] leading-relaxed text-muted-foreground">
                  {details.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Beat>
            )}

        {tech.length > 0 && (
          <div className="border-t-[3px] border-foreground pt-10">
            <h2 className="font-display text-2xl">The crew</h2>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {tech.map((item) => (
                <span
                  key={item}
                  className="border-2 border-foreground bg-background px-3 py-2 font-mono text-[11px] font-bold tracking-[0.07em]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </Container>

      {next && (
        <section className="blk-orange halftone border-y-[3px] border-foreground">
          <Container className="flex flex-wrap items-center justify-between gap-7 py-11">
            <div>
              <span className="font-mono text-[13px] font-bold uppercase tracking-[0.22em]">
                Next episode
              </span>
              <p className="mt-3 max-w-[24ch] font-display text-2xl lg:text-3xl">
                {headlineOf(next)}
              </p>
            </div>
            <Button asChild variant="chunkyCream" size="xl">
              <Link href={`/projects/${next.slug}`}>
                Watch <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </Container>
        </section>
      )}
    </>
  );
}
