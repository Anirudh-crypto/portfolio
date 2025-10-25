"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ProjectModal } from "./project-modal";

interface ProjectCardProps {
  title: string;
  description: string;
  details?: string;
  link?: string;
}

export const ProjectCard = ({ title, description, details, link }: ProjectCardProps) => {
  const [open, setOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const handleTouch = () => {
    // Toggle button visibility for touch screens
    setShowButton((prev) => !prev);
  };

  return (
    <>
      <motion.div
        onTouchStart={handleTouch}
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
        className="relative group rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-6 backdrop-blur-xl overflow-hidden hover:shadow-[0_0_25px_rgba(147,51,234,0.25)] transition-all"
      >
        {/* Subtle gradient hover glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-25 blur-2xl transition-opacity duration-500"
        />

        {/* Cinematic Overlay for touch interaction */}
        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl z-0"
            />
          )}
        </AnimatePresence>

        <div className="relative z-10">
          <h3 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {title}
          </h3>
          <p className="text-gray-400 mb-10 leading-relaxed">{description}</p>

          {/* View Details Button (hover or touch) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: showButton ? 1 : 0, y: showButton ? 0 : 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className={`transition-all duration-300 flex justify-center ${
              showButton ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            <button
              onClick={() => setOpen(true)}
              className="px-5 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all"
            >
              View Details →
            </button>
          </motion.div>
        </div>
      </motion.div>

      <ProjectModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={title}
        description={description}
        details={details}
        link={link}
      />
    </>
  );
};
