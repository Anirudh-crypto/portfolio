import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Constrains content inside a full-bleed section.
 *
 * The layout's `<main>` is edge-to-edge so colour blocks can run the full
 * width of the viewport; everything readable sits inside one of these.
 */
export const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={cn("mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-11", className)}>
    {children}
  </div>
);
