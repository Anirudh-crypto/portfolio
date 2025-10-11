// src/types/lenis.d.ts
declare module "@studio-freight/lenis" {
  export interface LenisOptions {
    wrapper?: HTMLElement | Window;
    content?: HTMLElement;
    duration?: number;
    easing?: (t: number) => number;
    direction?: "vertical" | "horizontal";
    gestureDirection?: "vertical" | "horizontal";
    smooth?: boolean;
    mouseMultiplier?: number;
    smoothTouch?: boolean;
    touchMultiplier?: number;
    infinite?: boolean;
  }

  export default class Lenis {
    constructor(options?: LenisOptions);
    on(event: "scroll", callback: (e: { scroll: number }) => void): void;
    raf(time: number): void;
    scrollTo(
      target: HTMLElement | number | string,
      options?: { offset?: number; duration?: number; easing?: (t: number) => number }
    ): void;
    destroy(): void;
  }
}
