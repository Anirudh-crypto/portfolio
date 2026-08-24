"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ComponentType, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before animating — use to stagger a list. */
  delay?: number;
  duration?: number;
  /** Pixels to travel upward into place. */
  offset?: number;
  /** `true` animates on mount (above-the-fold), `false` waits for scroll. */
  immediate?: boolean;
  as?: "div" | "section" | "article" | "li";
} & Omit<HTMLMotionProps<"div">, "initial" | "animate" | "whileInView" | "transition" | "children">;

/**
 * Wraps server-rendered children in the site's standard fade-and-rise.
 *
 * Isolating `framer-motion` here keeps the pages themselves server components,
 * so they can export `metadata` and ship their content in the initial HTML.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.45,
  offset = 18,
  immediate = false,
  as = "div",
  ...props
}: RevealProps) {
  // framer-motion types its props per intrinsic element, so indexing with a
  // union of tags produces an incompatible component union. Every tag allowed
  // here takes the same generic HTML props, so a single permissive component
  // type is accurate and keeps the call sites type-checked.
  const Component = motion[as] as ComponentType<HTMLMotionProps<"div">>;
  const transition = { duration, delay, ease: "easeOut" as const };
  const hidden = { opacity: 0, y: offset };
  const visible = { opacity: 1, y: 0 };

  if (immediate) {
    return (
      <Component className={className} initial={hidden} animate={visible} transition={transition} {...props}>
        {children}
      </Component>
    );
  }

  return (
    <Component
      className={className}
      initial={hidden}
      whileInView={visible}
      viewport={{ once: true, margin: "-60px" }}
      transition={transition}
      {...props}
    >
      {children}
    </Component>
  );
}
