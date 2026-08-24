"use client";

import { useMemo, useState } from "react";
import { EpisodeCard } from "@/components/episode-card";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";

const ALL = "All";

/**
 * Client-side filtering over a server-rendered project list.
 *
 * The full list ships in the initial HTML, so crawlers and no-JS visitors still
 * see every project; the filter only narrows what is already there.
 */
export const ProjectExplorer = ({ projects }: { projects: Project[] }) => {
  const [activeTag, setActiveTag] = useState<string>(ALL);

  const tags = useMemo(() => {
    const counts = new Map<string, number>();

    for (const project of projects) {
      for (const item of project.tech) {
        counts.set(item, (counts.get(item) ?? 0) + 1);
      }
    }

    // Most-used technologies first, alphabetical within a tier.
    return [...counts.entries()]
      .sort(([leftTag, leftCount], [rightTag, rightCount]) =>
        rightCount - leftCount || leftTag.localeCompare(rightTag)
      )
      .map(([tag]) => tag);
  }, [projects]);

  const visibleProjects = useMemo(
    () =>
      activeTag === ALL ? projects : projects.filter((project) => project.tech.includes(activeTag)),
    [projects, activeTag]
  );

  return (
    <div>
      {tags.length > 1 && (
        <div
          role="group"
          aria-label="Filter projects by technology"
          className="flex flex-wrap gap-2.5 pb-9"
        >
          {[ALL, ...tags].map((tag) => {
            const isActive = tag === activeTag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                aria-pressed={isActive}
                className={cn(
                  "flex h-11 items-center border-2 border-foreground px-4 font-mono text-xs font-bold tracking-[0.07em] transition-colors",
                  isActive
                    ? "bg-mustard text-navy shadow-[3px_3px_0_hsl(var(--foreground))]"
                    : "bg-background hover:bg-muted"
                )}
              >
                {tag}
              </button>
            );
          })}
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        {visibleProjects.length} {visibleProjects.length === 1 ? "episode" : "episodes"} shown
      </p>

      <div className="flex flex-col gap-10 lg:gap-12">
        {visibleProjects.map((project) => (
          <EpisodeCard
            key={project.id}
            project={project}
            /* Numbering follows the full list, so filtering does not renumber. */
            index={projects.indexOf(project)}
          />
        ))}
      </div>
    </div>
  );
};
