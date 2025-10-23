"use client";

import { useRef, useLayoutEffect, useState } from "react";
import { useMotionValue, animate } from "framer-motion";

export function useParallax(offset = 50) {
  const ref = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  const [isReady, setIsReady] = useState(false);

  // Ensure this only runs after hydration
  useLayoutEffect(() => {
    setIsReady(true);
  }, []);

  useLayoutEffect(() => {
    if (!isReady || !ref.current) return;

    const el = ref.current;
    let frame: number;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const progress = rect.top / window.innerHeight;
      animate(y, progress * offset, { type: "tween", duration: 0.3 });
      frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [isReady, offset, y]);

  return { ref, y };
}
