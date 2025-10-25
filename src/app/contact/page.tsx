"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export default function ContactPage() {
  const socials = [
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-8 h-8" />,
      link: "https://www.linkedin.com/in/anirudhpjoshi/",
      color: "from-blue-500 to-indigo-500",
    },
    {
      name: "GitHub",
      icon: <Github className="w-8 h-8" />,
      link: "https://github.com/your-github",
      color: "from-gray-700 to-gray-900",
    },
    {
      name: "Email",
      icon: <Mail className="w-8 h-8" />,
      link: "mailto:ani.josh01@gmail.com",
      color: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6"
      >
        Let’s Connect
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-gray-400 mb-12 text-lg max-w-lg"
      >
        I’m always open to new opportunities and collaborations — whether it’s building products, research, or creative projects.
      </motion.p>

      <div className="flex gap-10">
        {socials.map((social, i) => (
          <motion.a
            key={i}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className={`p-4 rounded-full bg-gradient-to-r ${social.color} text-white shadow-lg hover:shadow-2xl hover:shadow-${social.color.split(" ")[1]}/40 transition-transform`}
          >
            {social.icon}
          </motion.a>
        ))}
      </div>

      {/* Floating Orb Background */}
      <motion.div
        className="absolute top-40 left-1/3 w-96 h-96 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-3xl opacity-20 -z-10"
        animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </main>
  );
}
