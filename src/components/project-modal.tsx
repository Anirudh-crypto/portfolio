"use client";

import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { ProjectImage } from "@/components/project-image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Project } from "@/lib/projects";

type ProjectModalProps = {
  project: Project;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

/**
 * Built on the Radix dialog rather than a bare overlay so it gets Escape,
 * backdrop dismissal, focus trapping, body scroll lock and the correct ARIA
 * roles without hand-rolling any of them.
 */
export const ProjectModal = ({ project, isOpen, onOpenChange }: ProjectModalProps) => {
  const { slug, title, description, details, tech, link, repoUrl, imageUrl } = project;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto rounded-2xl border-border bg-card p-6 shadow-2xl">
        <DialogHeader className="text-left">
          <DialogTitle className="pr-8 text-3xl font-semibold">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-base text-muted-foreground">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {imageUrl && (
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border">
            <ProjectImage
              src={imageUrl}
              alt={`${title} preview`}
              sizes="(max-width: 640px) 100vw, 40rem"
              className="object-cover"
            />
          </div>
        )}

        {details.length > 0 && (
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            {details.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}

        {tech.length > 0 && (
          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {tech.map((item) => (
                <span key={item} className="rounded-full border border-border px-3 py-1 text-xs">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <Link
            href={`/projects/${slug}`}
            onClick={() => onOpenChange(false)}
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm transition-colors hover:bg-muted/50"
          >
            Open full page
          </Link>
        </div>

        {(link || repoUrl) && (
          <div className="flex flex-wrap gap-3">
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
      </DialogContent>
    </Dialog>
  );
};
