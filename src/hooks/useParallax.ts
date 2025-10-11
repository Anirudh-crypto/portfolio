"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export function useParallax(offset = [0, 1], range = [0, -100]) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const y = useTransform(scrollYProgress, [0, 1], range);
  return { ref, y };
}
