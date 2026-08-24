import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { ProjectImage } from "@/components/project-image";
import { Reveal } from "@/components/animations/reveal";
import { getProjectBySlug } from "@/lib/projects-server";
import { siteUrl } from "@/lib/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Rendered on demand rather than prerendered per slug.
 *
 * With static generation, Next caches the `notFound()` result for an unknown
 * slug and replays it as a 200 — a soft 404 that search engines would index as
 * a real page. Rendering per request keeps the status honest, and newly added
 * projects are reachable immediately instead of waiting for a rebuild.
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
     * UI — but the response has already begun streaming by then, so Next
     * cannot retroactively change the status line and the request returns 200
     * (a "soft" 404). Marking the response noindex/nofollow here is what stops
     * search engines treating that page as real, indexable content.
     */
    return { title: "Project not found", robots: { index: false, follow: false } };
  }

  const description = project.description || `${project.title} — a project by Anirudh Prahlad Joshi.`;

  return {
    title: project.title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.title,
      description,
      url: `${siteUrl}/projects/${project.slug}`,
      ...(project.imageUrl ? { images: [{ url: project.imageUrl }] } : {}),
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { title, description, details, tech, link, repoUrl, imageUrl } = project;

  return (
    <article className="space-y-8 pb-10">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        All projects
      </Link>

      <header className="rounded-[2rem] border border-border/70 bg-card/65 px-6 py-12 sm:p-12">
        <Reveal immediate>
          <h1 className="section-title">{title}</h1>
        </Reveal>
        {description && (
          <Reveal immediate delay={0.1}>
            <p className="mt-4 max-w-3xl text-muted-foreground">{description}</p>
          </Reveal>
        )}

        {(link || repoUrl) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-5 py-2 text-sm text-[hsl(var(--accent-foreground))] transition-opacity hover:opacity-90"
              >
                <ExternalLink className="h-4 w-4" />
                Visit Project
              </a>
            )}
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm transition-colors hover:bg-muted/50"
              >
                <Github className="h-4 w-4" />
                Source
              </a>
            )}
          </div>
        )}
      </header>

      {imageUrl && (
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border">
          <ProjectImage
            src={imageUrl}
            alt={`${title} preview`}
            sizes="(max-width: 1280px) 100vw, 72rem"
            className="object-cover"
          />
        </div>
      )}

      {details.length > 0 && (
        <section className="surface-card p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-semibold">Highlights</h2>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            {details.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {tech.length > 0 && (
        <section className="surface-card p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-semibold">Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {tech.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border/80 bg-background/75 px-3 py-1 text-sm text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
