"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { ProjectImage } from "@/components/project-image";
import { ProjectModal } from "@/components/project-modal";
import type { Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
};

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { title, description, tech, imageUrl } = project;

  return (
    <>
      <motion.article
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="surface-card flex h-full flex-col overflow-hidden"
      >
        {imageUrl && (
          <div className="relative aspect-video w-full border-b border-border">
            <ProjectImage
              src={imageUrl}
              alt={`${title} preview`}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="flex flex-1 flex-col p-6">
          {/*
            The title links to the project's own page. Besides being the
            expected affordance, it gives crawlers an internal link to each
            detail route — a modal alone leaves them undiscoverable.
          */}
          <h3 className="text-2xl font-semibold">
            <Link
              href={`/projects/${project.slug}`}
              className="rounded transition-colors hover:text-[hsl(var(--accent))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {title}
            </Link>
          </h3>
          {description && (
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
          )}

          {tech.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {tech.slice(0, 4).map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border/80 bg-background/75 px-3 py-1 text-xs text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="mt-8 inline-flex w-fit items-center rounded-full border border-border px-4 py-2 text-sm transition-colors hover:bg-muted/50"
          >
            {/* Naming the project keeps the label meaningful when read out of context. */}
            View Details<span className="sr-only"> for {title}</span>
          </button>
        </div>
      </motion.article>

      <ProjectModal project={project} isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  );
};
