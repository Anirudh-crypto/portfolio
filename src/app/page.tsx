import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import { EpisodeCard } from "@/components/episode-card";
import { Container } from "@/components/shared/container";
import { Ticker } from "@/components/shared/ticker";
import { Sticker } from "@/components/shared/sticker";
import { Button } from "@/components/ui/button";
import { getProjects } from "@/lib/projects-server";

const EXPERIENCE = [
  {
    period: "2025 —",
    role: "Student Assistant",
    org: "TUHH",
    description:
      "Industrial analytics and ML-driven automation. A Vue.js front end over Python and MongoDB services.",
    tone: "bg-mustard",
  },
  {
    period: "2023 – 24",
    role: "Associate Software Engineer",
    org: "Bosch Global Software",
    description:
      "Navigation search behaviour and data quality across C++ and Qt desktop platforms.",
    tone: "bg-orange",
  },
  {
    period: "2023",
    role: "Project Trainee",
    org: "Bosch Global Software",
    description: "Refactored map-search logic to cut latency in infotainment software.",
    tone: "bg-cream",
  },
];

export default async function HomePage() {
  const allProjects = await getProjects();
  const featured = allProjects.slice(0, 3);

  return (
    <>
      <HeroSection />

      <Ticker text="Now streaming · Season 01 · Shot on location in Hamburg" />

      <Container className="py-16 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-[16ch] font-display text-[clamp(2rem,1.4rem+2.4vw,3.5rem)]">
            This season&rsquo;s episodes
          </h2>
          {featured.length > 0 && (
            <Sticker tone="orange" tilt={3}>
              {String(featured.length).padStart(2, "0")} of {String(allProjects.length).padStart(2, "0")}
            </Sticker>
          )}
        </div>

        {featured.length > 0 ? (
          <>
            <div className="mt-11 flex flex-col gap-10 lg:gap-12">
              {featured.map((project, index) => (
                <EpisodeCard key={project.id} project={project} index={index} />
              ))}
            </div>

            <div className="mt-12">
              <Button asChild variant="chunky" size="xl">
                <Link href="/projects">
                  See all episodes <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <p className="mt-8 font-mono text-sm text-muted-foreground">
            {"// episodes are in post-production. check back shortly."}
          </p>
        )}
      </Container>

      <section className="blk-teal halftone border-y-[3px] border-foreground">
        <Container className="py-14 lg:py-16">
          <div className="flex flex-wrap items-center gap-5">
            <Sticker tilt={-4}>Recap</Sticker>
            <h2 className="font-display text-[clamp(1.8rem,1.3rem+1.8vw,2.75rem)]">
              Previously on&hellip;
            </h2>
          </div>

          <div className="mt-10 grid gap-7 md:grid-cols-3">
            {EXPERIENCE.map((item) => (
              <article
                key={item.role}
                className={`hard-navy p-6 text-navy ${item.tone}`}
              >
                <p className="font-mono text-[11px] font-bold tracking-[0.18em]">{item.period}</p>
                <h3 className="mt-3 font-display text-xl leading-tight">{item.role}</h3>
                <p className="mt-2 text-[13px] font-extrabold">{item.org}</p>
                <p className="mt-3 text-sm leading-relaxed">{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
