"use client";

import { motion, AnimatePresence } from "framer-motion";
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="relative w-full max-w-2xl rounded-2xl p-8 border border-white/20 shadow-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl text-left"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-300 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title */}
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {title}
            </h2>

            {/* Description */}
            <p className="text-gray-300 mb-4">{description}</p>

            {/* Details List */}
            {details && details.length > 0 && (
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                {details.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {/* Technologies Section */}
            {tech && tech.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-sm rounded-full bg-white/10 border border-white/20 text-gray-200 hover:bg-white/20 transition"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Link */}
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 transition"
              >
                Visit Project →
              </a>
            )}

            {/* Soft gradient glow */}
            <motion.div
              className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.2)_0%,transparent_70%)] rounded-2xl"
              animate={{ opacity: [0.8, 0.5, 0.8] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
