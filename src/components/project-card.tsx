"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ProjectModal } from "./project-modal";

interface ProjectCardProps {
  title: string;
  description: string;
  details?: string[];
  tech?: string[];
  link?: string;
}

export const ProjectCard = ({ title, description, details, tech, link }: ProjectCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.article
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="surface-card flex h-full flex-col p-6"
      >
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>

        {tech && tech.length > 0 && (
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
          onClick={() => setOpen(true)}
          className="mt-8 inline-flex w-fit items-center rounded-full border border-border px-4 py-2 text-sm transition-colors hover:bg-muted/50"
        >
          View Details
        </button>
      </motion.article>

      <ProjectModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={title}
        description={description}
        details={details}
        tech={tech}
        link={link}
      />
    </>
  );
};
