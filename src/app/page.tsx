"use client";

import { useLenisScroll } from "@/hooks/useLenisScroll";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ProjectCard } from "@/components/project-card";

export default function HomePage() {
  useLenisScroll();

  return (
    <main className="overflow-hidden">
      <HeroSection />
      <AboutSection />
      <ProjectCard />
    </main>
  );
}
