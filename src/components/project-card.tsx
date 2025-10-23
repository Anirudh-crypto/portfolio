"use client";

import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
}

export const ProjectCard = ({ title, description }: ProjectCardProps) => (
  <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} transitionSpeed={1000}>
    <motion.div
      className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-lg hover:shadow-2xl transition"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </motion.div>
  </Tilt>
);
