import type { Metadata } from "next";
import { Github, Linkedin, Mail } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/animations/reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Anirudh Prahlad Joshi about software, machine learning, and product-focused engineering roles.",
  alternates: { canonical: "/contact" },
};

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
    <div className="space-y-8 pb-10">
      <section className="rounded-[2rem] border border-border/70 bg-card/60 px-6 py-12 sm:p-12">
        <Reveal immediate>
          <h1 className="section-title text-center">Let&apos;s Connect</h1>
        </Reveal>

        <Reveal immediate delay={0.1}>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            I am open to opportunities in software, machine learning, and product-focused engineering.
          </p>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-3">
          {socials.map((social, index) => {
            const Icon = social.icon;
            return (
              <Reveal key={social.name} delay={index * 0.08} duration={0.4} offset={16}>
                <a
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="surface-card group block h-full rounded-2xl p-5 transition-colors hover:bg-muted/25"
                >
                  <Icon className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-foreground" />
                  <h2 className="mt-5 text-xl font-semibold">{social.name}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{social.note}</p>
                </a>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="surface-card mx-auto max-w-2xl p-6 sm:p-8">
        <h2 className="text-2xl font-semibold">Send a message</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Prefer email? Reach me at{" "}
          <a className="underline underline-offset-4" href="mailto:ani.josh01@gmail.com">
            ani.josh01@gmail.com
          </a>
          .
        </p>

        <div className="mt-6">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
