"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function AboutPage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const translateX = useTransform(smoothX, [0, 1], ["-5%", "5%"]);
  const translateY = useTransform(smoothY, [0, 1], ["-5%", "5%"]);
  const titleX = useTransform(smoothX, [0, 1], ["2%", "-2%"]);
  const titleY = useTransform(smoothY, [0, 1], ["2%", "-2%"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Anirudh_Prahlad_Joshi_Resume.pdf";
    link.click();
  };

  const experiences = [
    {
      title: "Student Assistant",
      company:
        "Institute of Production Management and Technology (TUHH)",
      period: "Feb 2025 – Present",
      description:
        "Working on industrial analytics and ML-driven automation; building Vue.js frontend for real-time work order tracking with Python and MongoDB integration.",
      tech: "Technologies: Vue.js, Python, MongoDB, Docker",
    },
    {
      title: "Associate Software Engineer",
      company: "Bosch Global Software Technologies",
      period: "July 2023 - Sep 2024",
      description:
        "Enhanced automotive navigation systems by optimizing location search and improving data accuracy across C++ and Qt-based platforms.",
      tech: "Technologies: C++, Qt, SQLite, Visual Studio",
    },
    {
      title: "Project Trainee (Intern)",
      company: "Bosch Global Software Technologies",
      period: "Jan 2023 – May 2023",
      description:
        "Refactored legacy map search algorithms to reduce latency and improve efficiency in infotainment navigation systems.",
      tech: "Technologies: C++, Qt, SQLite, Visual Studio",
    },
  ];

  const skills = {
    Languages: ["Python", "C++", "JavaScript", "TypeScript"],
    Frameworks: ["React", "Angular", "Next.js", "Vue.js", "PowerBI"],
    "Data Science & ML": [
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "PyTorch",
      "PySpark",
    ],
    Tools: ["Git", "Docker", "Linux", "Postman"],
    "Other Skills": ["Deep Learning", "Computer Vision", "LLMs", "NLP"],
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-16 lg:px-32 py-20 overflow-hidden">
      {/* Floating background glow */}
      <motion.div
        className="absolute top-1/3 left-1/2 w-[32rem] h-[32rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 blur-3xl opacity-20 -z-10"
        style={{ x: translateX, y: translateY }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle backdrop glow */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12)_0%,transparent_70%)] -z-20"
        style={{
          x: useTransform(smoothX, [0, 1], ["-2%", "2%"]),
          y: useTransform(smoothY, [0, 1], ["-2%", "2%"]),
        }}
      />

      {/* ---------------- ABOUT ---------------- */}
      <section className="max-w-3xl text-center mb-32 mt-10">
        <motion.h1
          className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-6"
          style={{ x: titleX, y: titleY }}
        >
          About Me
        </motion.h1>

        <p className="text-muted-foreground leading-relaxed text-lg md:text-xl">
          I’m a Software Developer with 1.5 years of experience at Bosch Global
          Software Technologies. Passionate about Machine Learning and AI, I
          enjoy building systems that combine creativity, problem-solving, and
          data-driven decision-making.
        </p>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block"
        >
          <Button
            onClick={handleDownload}
            className="mt-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 shadow-md hover:shadow-lg transition-all"
          >
            <Download className="mr-2 h-4 w-4" />
            Resume
          </Button>
        </motion.div>
      </section>

      {/* ---------------- EXPERIENCE ---------------- */}
      <section className="max-w-6xl w-full mb-32">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-semibold text-center mb-16 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
        >
          Experience
        </motion.h2>

        <div className="flex flex-col lg:flex-row justify-center items-start lg:items-stretch gap-10 relative">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative flex-1 min-w-[280px] p-6 rounded-2xl border border-border/40 bg-gradient-to-b from-background/50 to-transparent backdrop-blur-md shadow-[0_0_25px_rgba(147,51,234,0.15)] hover:shadow-[0_0_35px_rgba(147,51,234,0.25)] transition-all"
            >
              {idx < experiences.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-[-5%] w-[10%] h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 opacity-40" />
              )}

              <div className="flex flex-col items-start text-left space-y-3">
                <h3 className="text-2xl font-semibold text-foreground">
                  {exp.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {exp.company} • {exp.period}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {exp.tech}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------------- SKILLS ---------------- */}
      <section className="max-w-6xl w-full text-center mb-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-semibold mb-16 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
        >
          Technical Skills
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {Object.entries(skills).map(([category, items], idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="
    relative rounded-2xl p-8 
    bg-gradient-to-b 
    from-background/40 to-background/10 
    dark:from-white/5 dark:to-white/0 
    backdrop-blur-md 
    hover:shadow-[0_0_25px_rgba(147,51,234,0.25)] 
    transition-all
  "
            >
              <h3 className="text-xl font-semibold mb-6 text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                {category}
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {items.map((skill, sIdx) => (
                  <motion.span
                    key={sIdx}
                    whileHover={{ scale: 1.1 }}
                    className="px-4 py-2 text-sm rounded-full bg-muted/30 border border-border/30 text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
