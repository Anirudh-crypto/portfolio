"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  link?: string;
}

export const ProjectCard = ({ title, description, link }: ProjectCardProps) => (
  <motion.div
    whileHover={{ y: -6 }}
    transition={{ type: "spring", stiffness: 250, damping: 20 }}
    className="relative group rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 backdrop-blur-md overflow-hidden hover:shadow-[0_0_25px_rgba(99,102,241,0.25)]"
  >
    {/* Glow border animation */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500"
    />

    <div className="relative z-10">
      <h3 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
        {title}
      </h3>
      <p className="text-gray-400 mb-6 leading-relaxed">{description}</p>

      {/* View details overlay */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover:opacity-100"
      >
        {link ? (
          <Link
            href={link}
            className="px-5 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all"
          >
            View Details →
          </Link>
        ) : (
          <span className="px-5 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-indigo-500/20">
            View Details →
          </span>
        )}
      </motion.div>
    </div>
  </motion.div>
);
