import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type StickerProps = {
  children: ReactNode;
  /** Fixed block colour to sit on. */
  tone?: "mustard" | "orange" | "cream";
  /** Degrees of rotation — small values only; this is a sticker, not a spiral. */
  tilt?: number;
  className?: string;
};

const TONES = {
  mustard: "bg-mustard",
  orange: "bg-orange",
  cream: "bg-cream",
} as const;

/**
 * A rotated, hard-shadowed badge. Always navy-on-light so it stays legible
 * whichever block it lands on, in either theme.
 */
export const Sticker = ({ children, tone = "mustard", tilt = -4, className }: StickerProps) => (
  <span
    style={{ transform: `rotate(${tilt}deg)` }}
    className={cn(
      "inline-flex items-center gap-2 whitespace-nowrap border-[3px] border-navy px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-navy shadow-[4px_4px_0_hsl(var(--navy))] sm:text-xs",
      TONES[tone],
      className
    )}
  >
    {children}
  </span>
);
