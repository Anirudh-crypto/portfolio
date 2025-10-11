"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export function ProjectCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <Image
          src="/placeholder-project.jpg"
          alt="Project thumbnail"
          width={600}
          height={400}
          className="object-cover w-full h-60"
        />
        <CardContent className="p-5">
          <h3 className="text-xl font-semibold mb-2">Project Title</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Short project description goes here — what it does, tech used, and goal.
          </p>
          <div className="flex justify-end">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary flex items-center gap-1 text-sm font-medium"
            >
              View Project <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
