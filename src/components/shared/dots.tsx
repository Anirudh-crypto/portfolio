import { cn } from "@/lib/utils";

/**
 * The three-colour dot cluster — the title-card motif that stands in for the
 * old bordered-box section boundaries.
 */
export const Dots = ({ size = 17, className }: { size?: number; className?: string }) => (
  <div className={cn("flex shrink-0 items-center gap-[0.65em]", className)} aria-hidden>
    {["bg-orange", "bg-mustard", "bg-teal"].map((colour) => (
      <span
        key={colour}
        className={cn("block shrink-0 rounded-full", colour)}
        style={{ width: size, height: size }}
      />
    ))}
  </div>
);
