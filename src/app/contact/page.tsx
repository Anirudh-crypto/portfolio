"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const socials = [
  {
    name: "LinkedIn",
    icon: Linkedin,
    link: "https://www.linkedin.com/in/anirudhpjoshi/",
    note: "Professional profile and updates",
  },
  {
    name: "GitHub",
    icon: Github,
    link: "https://github.com/Anirudh-crypto",
    note: "Code repositories and experiments",
  },
  {
    name: "Email",
    icon: Mail,
    link: "mailto:ani.josh01@gmail.com",
    note: "Direct contact for work and collaboration",
  },
];

export default function ContactPage() {
  return (
    <main className="pb-10">
      <section className="rounded-[2rem] border border-border/70 bg-card/60 px-6 py-12 sm:p-12">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="section-title text-center"
        >
          Let&apos;s Connect
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground"
        >
          I am open to opportunities in software, machine learning, and product-focused engineering.
        </motion.p>

        <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-3">
          {socials.map((social, index) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.name}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                viewport={{ once: true }}
                className="surface-card group rounded-2xl p-5 transition-colors hover:bg-muted/25"
              >
                <Icon className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-foreground" />
                <h2 className="mt-5 text-xl font-semibold">{social.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{social.note}</p>
              </motion.a>
            );
          })}
        </div>
      </section>
    </main>
  );
}
