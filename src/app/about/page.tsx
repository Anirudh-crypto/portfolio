import type { Metadata } from "next";
import { Download, Zap } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Dots } from "@/components/shared/dots";
import { Sticker } from "@/components/shared/sticker";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "The Story",
  description:
    "Anirudh Prahlad Joshi — software engineer with product development experience at Bosch and active work in machine learning, computer vision, and NLP.",
  alternates: { canonical: "/about" },
};

const EXPERIENCE = [
  {
    code: "S02",
    period: "Feb 2025 — present",
    role: "Student Assistant",
    org: "Institute of Production Management and Technology, TUHH",
    description:
      "Industrial analytics and ML-driven automation. Built a Vue.js front end for real-time work-order tracking, backed by Python and MongoDB services.",
    tone: "bg-mustard",
  },
  {
    code: "S01E12",
    period: "Jul 2023 — Sep 2024",
    role: "Associate Software Engineer",
    org: "Bosch Global Software Technologies",
    description:
      "Improved navigation systems by optimising search behaviour and data quality across C++ and Qt desktop platforms.",
    tone: "bg-orange",
  },
  {
    code: "S01E04",
    period: "Jan 2023 — May 2023",
    role: "Project Trainee",
    org: "Bosch Global Software Technologies",
    description:
      "Refactored map-search logic to reduce latency and improve maintainability in infotainment software.",
    tone: "bg-teal",
  },
];

const SKILLS = [
  { category: "Languages", items: ["Python", "C++", "TypeScript", "JavaScript"], depth: 4, tone: "bg-mustard" },
  { category: "ML & Data", items: ["PyTorch", "Scikit-learn", "Pandas", "NumPy", "PySpark"], depth: 4, tone: "bg-orange" },
  { category: "Frameworks", items: ["React", "Next.js", "Vue.js", "Angular"], depth: 3, tone: "bg-cream" },
  { category: "Infrastructure", items: ["Docker", "Linux", "Git", "GCP"], depth: 3, tone: "bg-cream" },
  { category: "Focus", items: ["Deep Learning", "Computer Vision", "NLP", "LLMs"], depth: 4, tone: "bg-mustard" },
];

export default function AboutPage() {
  return (
    <>
      <section className="blk-ink halftone border-b-[3px] border-foreground">
        <Container className="grid items-end gap-10 py-14 lg:grid-cols-[1fr_330px] lg:py-16">
          <div>
            <div className="flex items-center gap-4">
              <Dots size={17} />
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] opacity-85 sm:text-xs">
                The Story
              </span>
            </div>
            <h1 className="mt-6 font-display text-[clamp(2.4rem,1.6rem+3.4vw,4.75rem)]">
              Previously on
              <br />
              Anirudh
            </h1>
          </div>
          <p className="text-lg leading-relaxed opacity-90">
            Three years, two very different codebases, and one fairly dramatic change of subject.
          </p>
        </Container>
      </section>

      <Container className="py-14">
        <div className="flex flex-col gap-6">
          {EXPERIENCE.map((item) => (
            <article key={item.code} className="hard grid bg-card sm:grid-cols-[8px_170px_1fr]">
              <div className={`h-2 sm:h-auto ${item.tone}`} />
              <div className="px-6 pt-6 sm:py-6 sm:pl-7 sm:pr-0">
                <span className="inline-block bg-foreground px-2.5 py-1.5 font-mono text-xs font-bold tracking-[0.16em] text-background">
                  {item.code}
                </span>
                <p className="mt-3 font-mono text-[11px] tracking-[0.08em] text-muted-foreground">
                  {item.period}
                </p>
              </div>
              <div className="p-6 sm:py-6 sm:pl-3 sm:pr-7">
                <h2 className="font-display text-xl lg:text-2xl">{item.role}</h2>
                <p className="mt-2 text-sm font-extrabold text-accent">{item.org}</p>
                <p className="mt-3 max-w-[72ch] leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>

      <Container className="pb-14">
        <div className="blk-orange halftone hard-navy relative p-8 sm:p-12">
          <div className="absolute -top-5 right-8 z-10">
            <Sticker tone="cream" tilt={6}>
              <Zap className="h-3.5 w-3.5" /> Plot twist
            </Sticker>
          </div>
          <span className="font-mono text-[13px] font-bold uppercase tracking-[0.22em]">
            Mid-season · The Pivot
          </span>
          <h2 className="mt-5 max-w-[22ch] font-display text-[clamp(1.9rem,1.3rem+2.2vw,3.1rem)]">
            Two seasons of C++. Then a hard left into machine learning.
          </h2>
          <p className="mt-6 max-w-[76ch] text-lg leading-relaxed">
            Shipping navigation software taught me what production actually costs — latency
            budgets, data quality, and the unglamorous work of making something fast enough to be
            used. I brought the same instincts to research. The debugging habits transferred; the
            sleep schedule did not survive.
          </p>
        </div>
      </Container>

      <Container className="pb-16">
        <div className="flex flex-wrap items-end gap-4">
          <h2 className="font-display text-[clamp(1.9rem,1.3rem+2.2vw,3.1rem)]">
            The skills I don&rsquo;t share
          </h2>
          <span className="pb-2 font-mono text-[13px] text-muted-foreground">(like food)</span>
        </div>

        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {SKILLS.map((group) => (
            <div key={group.category} className={`hard-navy p-5 text-navy ${group.tone}`}>
              <h3 className="font-display text-lg leading-tight">{group.category}</h3>
              <div className="mt-3.5 flex gap-1" aria-hidden>
                {[0, 1, 2, 3].map((step) => (
                  <span
                    key={step}
                    className={`h-2 w-full border-2 border-navy ${step < group.depth ? "bg-navy" : "bg-transparent"}`}
                  />
                ))}
              </div>
              <p className="sr-only">Depth: {group.depth} of 4</p>
              <ul className="mt-4 flex flex-col gap-2">
                {group.items.map((item) => (
                  <li key={item} className="text-[13.5px] font-bold">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      <section className="blk-mustard halftone border-y-[3px] border-foreground">
        <Container className="flex flex-wrap items-center justify-between gap-7 py-11">
          <div>
            <h2 className="font-display text-[clamp(1.6rem,1.2rem+1.6vw,2.4rem)]">
              Want the full script?
            </h2>
            <p className="mt-2 text-base opacity-80">Every credit, properly formatted, in PDF.</p>
          </div>
          {/*
            /api/resume picks the German or Indian CV from the visitor's region.
            Geolocation only sets the default — the explicit links below always
            work, so a VPN or a recruiter abroad is never stuck with the wrong
            document. Real links, so this needs no JavaScript.
          */}
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <Button asChild variant="chunkyCream" size="xl">
              <a href="/api/resume">
                <Download className="h-5 w-5" /> Get the full script
              </a>
            </Button>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em]">
              <a className="underline underline-offset-4" href="/api/resume?region=in">
                India version
              </a>
              <span aria-hidden> · </span>
              <a className="underline underline-offset-4" href="/api/resume?region=de">
                Germany version
              </a>
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
