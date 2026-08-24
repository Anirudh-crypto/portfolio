import { cn } from "@/lib/utils";

/**
 * Scrolling marquee band between sections.
 *
 * The items are rendered twice and the track translates by -50%, so the loop
 * is seamless. `prefers-reduced-motion` stops it (see globals.css).
 */
export const Ticker = ({ text, className }: { text: string; className?: string }) => {
  const half = Array.from({ length: 4 }, (_, index) => (
    <span key={index} className="flex items-center gap-6 pr-6">
      <span>{text}</span>
      <span aria-hidden>&#9679;</span>
    </span>
  ));

  return (
    <div
      className={cn(
        "overflow-hidden border-y-[3px] border-foreground bg-mustard text-navy",
        className
      )}
    >
      <div className="marquee py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] sm:text-[13px]">
        {/* Second copy is decorative; the first is what a screen reader reads. */}
        <div className="flex">{half}</div>
        <div className="flex" aria-hidden>
          {half}
        </div>
      </div>
    </div>
  );
};
