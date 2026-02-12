"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

const experiences = [
  {
    title: "Student Assistant",
    company: "Institute of Production Management and Technology (TUHH)",
    period: "Feb 2025 - Present",
    description:
      "Working on industrial analytics and ML-driven automation, including a Vue.js frontend for real-time work-order tracking with Python and MongoDB services.",
  },
  {
    title: "Associate Software Engineer",
    company: "Bosch Global Software Technologies",
    period: "Jul 2023 - Sep 2024",
    description:
      "Improved navigation systems by optimizing search behavior and data quality in C++ and Qt-based desktop platforms.",
  },
  {
    title: "Project Trainee (Intern)",
    company: "Bosch Global Software Technologies",
    period: "Jan 2023 - May 2023",
    description:
      "Refactored map-search logic to reduce latency and improve maintainability in infotainment software.",
  },
];

const skills = {
  Languages: ["Python", "C++", "JavaScript", "TypeScript"],
  Frameworks: ["React", "Angular", "Next.js", "Vue.js"],
  "Data and ML": ["Pandas", "NumPy", "Scikit-learn", "PyTorch", "PySpark"],
  Tools: ["Git", "Docker", "Linux", "Postman", "Power BI"],
  Focus: ["Deep Learning", "Computer Vision", "LLMs", "NLP"],
};

export default function AboutPage() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Resume.pdf";
    link.download = "Anirudh_Prahlad_Joshi_Resume.pdf";
    link.click();
  };

  return (
    <main className="space-y-8 pb-10">
      <section className="rounded-[2rem] border border-border/70 bg-card/65 px-6 py-12 sm:p-12">
        <h1 className="section-title text-center">About</h1>
        <p className="mx-auto mt-4 max-w-3xl text-center text-muted-foreground">
          Software engineer with 1.5 years of professional product development experience and
          active work in machine learning and AI systems.
        </p>
        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleDownload}
            className="h-10 rounded-full bg-[hsl(var(--accent))] px-6 text-[hsl(var(--accent-foreground))] hover:opacity-90"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Resume
          </Button>
        </div>
      </section>

      <section className="surface-card p-6 sm:p-8">
        <h2 className="mb-6 text-3xl font-semibold">Experience</h2>
        <div className="space-y-4">
          {experiences.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="rounded-xl border border-border bg-background/65 p-5"
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.company} | {item.period}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="surface-card p-6 sm:p-8">
        <h2 className="mb-6 text-3xl font-semibold">Technical Skills</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(skills).map(([category, items], index) => (
            <motion.article
              key={category}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.07 }}
              viewport={{ once: true }}
              className="rounded-xl border border-border bg-background/60 p-4"
            >
              <h3 className="mb-3 text-lg font-semibold">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span key={item} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
