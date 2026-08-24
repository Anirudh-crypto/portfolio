"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, systemTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // The resolved theme is unknown until hydration. Render a same-sized inert
  // placeholder rather than nothing, so the navbar does not reflow.
  if (!mounted) {
    return <div aria-hidden className="ml-1 h-11 w-11 border-[3px] border-foreground" />;
  }

  const currentTheme = theme === "system" ? systemTheme : theme;
  const nextTheme = currentTheme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      className="ml-1 flex h-11 w-11 items-center justify-center border-[3px] border-foreground text-foreground transition-colors hover:bg-mustard hover:text-navy"
      aria-label={`Switch to ${nextTheme} theme`}
    >
      {currentTheme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </button>
  );
}
