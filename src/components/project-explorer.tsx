"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/animations/reveal";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";

const ALL = "All";

type ProjectExplorerProps = {
  projects: Project[];
};

/**
 * Client-side filtering over a server-rendered project list.
 *
 * The full list ships in the initial HTML, so crawlers and no-JS visitors still
 * see every project; the filter only narrows what is already there.
 */
export const ProjectExplorer = ({ projects }: ProjectExplorerProps) => {
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
      activeTag === ALL
        ? projects
        : projects.filter((project) => project.tech.includes(activeTag)),
    [projects, activeTag]
  );

  return (
    <div className="space-y-6">
      {tags.length > 1 && (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by technology">
          {[ALL, ...tags].map((tag) => {
            const isActive = tag === activeTag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                aria-pressed={isActive}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm transition-colors",
                  isActive
                    ? "border-transparent bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]"
                    : "border-border text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                {tag}
              </button>
            );
          })}
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        {visibleProjects.length} {visibleProjects.length === 1 ? "project" : "projects"} shown
      </p>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visibleProjects.map((project, index) => (
          <Reveal key={project.id} delay={Math.min(index, 5) * 0.06} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </div>
  );
};
