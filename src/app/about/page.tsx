"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function AboutPage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring motion for natural feel
  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  // Transform values for parallax
  const translateX = useTransform(smoothX, [0, 1], ["-5%", "5%"]);
  const translateY = useTransform(smoothY, [0, 1], ["-5%", "5%"]);

  // Heading subtle parallax (opposite direction for depth)
  const titleX = useTransform(smoothX, [0, 1], ["2%", "-2%"]);
  const titleY = useTransform(smoothY, [0, 1], ["2%", "-2%"]);

  // Track mouse
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
    link.href = "/resume.pdf"; // Place resume in public/
    link.download = "Anirudh_Prahlad_Joshi_Resume.pdf";
    link.click();
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* Floating gradient blob with parallax motion */}
      <motion.div
        className="absolute top-1/3 left-1/2 w-[32rem] h-[32rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 blur-3xl opacity-20 -z-10"
        style={{
          x: translateX,
          y: translateY,
        }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle background glow */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12)_0%,transparent_70%)] -z-20"
        style={{
          x: useTransform(smoothX, [0, 1], ["-2%", "2%"]),
          y: useTransform(smoothY, [0, 1], ["-2%", "2%"]),
        }}
      />

      {/* About Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl text-center space-y-6"
      >
        {/* Title with cursor parallax */}
        <motion.h1
          className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent"
          style={{
            x: titleX,
            y: titleY,
          }}
        >
          About Me
        </motion.h1>

        <p className="text-muted-foreground leading-relaxed">
          I’m a Software Developer with professional experience of 1.5 years at Bosch Global Software Technologies.
          I’m deeply passionate about machine learning and AI — working on projects involving computer vision and
          natural language processing. I love exploring cutting-edge technologies and continuously enhancing my skills
          through creative problem-solving and design.
        </p>

        {/* Smooth floating button */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="inline-block"
        >
          <Button
            onClick={handleDownload}
            className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 shadow-md hover:shadow-lg transition-all"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Resume
          </Button>
        </motion.div>
      </motion.div>
    </main>
  );
}
