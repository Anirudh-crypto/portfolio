import type { Metadata } from "next";
import { Github, Linkedin, Mail } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Container } from "@/components/shared/container";
import { Dots } from "@/components/shared/dots";
import { Ticker } from "@/components/shared/ticker";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Say Hi",
  description:
    "Get in touch with Anirudh Prahlad Joshi about software, machine learning, and product-focused engineering roles.",
  alternates: { canonical: "/contact" },
};

const SOCIALS = [
  {
    name: "Email",
    icon: Mail,
    href: `mailto:${siteConfig.links.email}`,
    handle: siteConfig.links.email,
    tone: "bg-orange",
  },
  {
    name: "GitHub",
    icon: Github,
    href: siteConfig.links.github,
    handle: "Anirudh-crypto",
    tone: "bg-mustard",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: siteConfig.links.linkedin,
    handle: "anirudhpjoshi",
    tone: "bg-cream",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="blk-mustard halftone border-b-[3px] border-foreground">
        <Container className="py-14 lg:py-16">
          <div className="flex items-center gap-4">
            <Dots size={17} />
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] sm:text-xs">
              Say Hi
            </span>
          </div>
          <h1 className="mt-6 font-display text-[clamp(2.5rem,1.6rem+4vw,5.4rem)]">
            How you deployin&rsquo;?
          </h1>
          <p className="mt-6 max-w-[54ch] text-lg leading-relaxed">
            Open to roles in software and machine learning. Leave a note on the door and I will get
            back to you.
          </p>
        </Container>
      </section>

      <Container className="py-14">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_370px]">
          <div className="hard bg-card p-7 sm:p-9">
            <div className="mb-7 flex items-center gap-4">
              <Dots size={13} />
              <span className="font-mono text-[13px] font-bold uppercase tracking-[0.22em]">
                Leave a message after the beep
              </span>
            </div>
            <ContactForm />
          </div>

          <div className="flex flex-col gap-5">
            {SOCIALS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className={`hard-navy flex items-center gap-5 p-5 text-navy transition-transform hover:translate-x-[2px] hover:translate-y-[2px] ${social.tone}`}
                >
                  <Icon className="h-6 w-6 shrink-0" />
                  <span>
                    <span className="block font-display text-lg leading-none">{social.name}</span>
                    <span className="mt-1.5 block font-mono text-xs font-bold">
                      {social.handle}
                    </span>
                  </span>
                </a>
              );
            })}

            <div className="blk-teal border-[3px] border-foreground p-5">
              <p className="font-mono text-[13px] leading-relaxed">
                {"// based in Hamburg"}
                <br />
                {"// currently at TUHH"}
                <br />
                {"// usually awake"}
              </p>
            </div>
          </div>
        </div>
      </Container>

      <Ticker text="Shot on location in Hamburg · No laugh track required" />
    </>
  );
}
