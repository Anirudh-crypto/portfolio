import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Dots } from "@/components/shared/dots";
import { Sticker } from "@/components/shared/sticker";
import { Couch } from "@/components/couch";
import { Button } from "@/components/ui/button";

/**
 * The opening title card. A server component — nothing here needs interactivity,
 * so the whole block ships as HTML.
 */
export function HeroSection() {
  return (
    <section className="blk-ink halftone border-b-[3px] border-foreground">
      <Container className="grid items-center gap-14 py-14 lg:grid-cols-[1fr_400px] lg:gap-16 lg:py-20">
        <div>
          <div className="flex items-center gap-4">
            <Dots size={17} />
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] opacity-85 sm:text-xs">
              S01E01 · The Pilot
            </span>
          </div>

          <h1 className="mt-7 max-w-[13ch] font-display text-[clamp(2.6rem,1.6rem+4vw,5.1rem)]">
            Could I BE any more into machine learning?
          </h1>

          <div className="mt-7">
            <Sticker tilt={-4}>♪ Laugh track</Sticker>
          </div>

          <p className="mt-8 max-w-[48ch] text-lg leading-relaxed opacity-90">
            Software engineer. Two seasons at Bosch making navigation software faster, now at
            TUHH teaching machines to actually look at pictures.
          </p>

          <p className="mt-5 font-mono text-[13px] leading-relaxed opacity-70">
            {"// my family says I “do something with computers.”"}
            <br />
            {"// they are not technically wrong."}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button asChild variant="chunky" size="xl">
              <Link href="/projects">
                See the work <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="chunkyCream" size="xl">
              <Link href="/contact">Say hi</Link>
            </Button>
          </div>
        </div>

        <div className="relative flex items-end justify-center">
          <Couch className="absolute -bottom-12 w-[min(390px,100%)] text-orange" />
          <div className="crt relative aspect-[318/376] w-[min(318px,80%)] -rotate-2 border-4 border-cream shadow-[10px_10px_0_hsl(var(--orange))]">
            <Image
              src="/images/pic.jpg"
              alt="Portrait of Anirudh Prahlad Joshi"
              fill
              sizes="(max-width: 1024px) 80vw, 318px"
              priority
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
