"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  details?: string[];
  tech?: string[];
  link?: string;
}

export const ProjectModal = ({
  isOpen,
  onClose,
  title,
  description,
  details,
  tech,
  link,
}: ProjectModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-5 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.22 }}
            className="relative w-full max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground transition hover:bg-muted"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="pr-8 text-3xl font-semibold">{title}</h2>
            <p className="mt-3 text-muted-foreground">{description}</p>

            {details && details.length > 0 && (
              <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                {details.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}

            {tech && tech.length > 0 && (
              <div className="mt-6">
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

            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex rounded-full bg-[hsl(var(--accent))] px-5 py-2 text-sm text-[hsl(var(--accent-foreground))] transition-opacity hover:opacity-90"
              >
                Visit Project
              </a>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
