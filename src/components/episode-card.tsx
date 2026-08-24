import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectImage } from "@/components/project-image";
import { episodeCode, headlineOf, type Project } from "@/lib/projects";

/** Rotates through the block palette so consecutive cards differ. */
const STRIPS = ["bg-orange", "bg-teal", "bg-mustard"] as const;

type EpisodeCardProps = {
  project: Project;
  index: number;
};

export const EpisodeCard = ({ project, index }: EpisodeCardProps) => {
  const { slug, title, description, tech, imageUrl, guestStarring, runtime } = project;
  const headline = headlineOf(project);
  const showsRealTitle = headline !== title;

  return (
    <article className="grid gap-5 sm:grid-cols-[96px_1fr] lg:grid-cols-[126px_1fr] lg:gap-6">
      <div
        aria-hidden
        className="bigno hidden pt-3 font-display text-[92px] leading-none sm:block lg:text-[150px]"
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="hard overflow-hidden bg-card">
        <div className={`h-[15px] border-b-[3px] border-foreground ${STRIPS[index % STRIPS.length]}`} />

        {imageUrl && (
          <div className="relative aspect-video w-full border-b-[3px] border-foreground">
            <ProjectImage
              src={imageUrl}
              alt={`${title} preview`}
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="grid gap-6 p-6 sm:p-7 lg:grid-cols-[1fr_210px]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-foreground px-2.5 py-1.5 font-mono text-[11px] font-bold tracking-[0.18em] text-background">
                {episodeCode(index)}
              </span>
              <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground">
                TV–PG · ML CONTENT
              </span>
            </div>

            <h3 className="mt-4 font-display text-2xl leading-tight lg:text-[31px]">
              <Link href={`/projects/${slug}`} className="hover:text-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {headline}
              </Link>
            </h3>

            {/* Only shown when an episode name is standing in for the real one. */}
            {showsRealTitle && (
              <p className="mt-3 text-sm font-extrabold text-accent">{title}</p>
            )}

            {description && (
              <p className="mt-2.5 leading-relaxed text-muted-foreground">{description}</p>
            )}

            {tech.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {tech.slice(0, 5).map((item) => (
                  <span
                    key={item}
                    className="border-2 border-foreground bg-background px-2.5 py-1.5 font-mono text-[10px] font-bold tracking-[0.07em]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>

          <dl className="flex flex-col gap-3">
            {guestStarring && (
              <div className="border-t-2 border-foreground pt-2">
                <dt className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground">
                  Guest starring
                </dt>
                <dd className="mt-1 text-[13px] font-extrabold">{guestStarring}</dd>
              </div>
            )}
            {runtime && (
              <div className="border-t-2 border-foreground pt-2">
                <dt className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground">
                  Runtime
                </dt>
                <dd className="mt-1 font-mono text-xs font-bold">{runtime}</dd>
              </div>
            )}
            <div className="border-t-2 border-foreground pt-2">
              <dt className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground">
                Watch
              </dt>
              <dd className="mt-1.5">
                <Link
                  href={`/projects/${slug}`}
                  className="inline-flex min-h-11 items-center gap-2 text-[13px] font-extrabold text-accent"
                >
                  Full episode <ArrowRight className="h-4 w-4" />
                  <span className="sr-only">for {headline}</span>
                </Link>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </article>
  );
};
