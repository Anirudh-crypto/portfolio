"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, systemTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // The resolved theme is unknown until hydration. Render a same-sized inert
  // placeholder rather than nothing, so the navbar does not reflow.
  if (!mounted) {
    return (
      <div
        aria-hidden
        className="size-9 rounded-lg border border-border"
      />
    );
  }

  const currentTheme = theme === "system" ? systemTheme : theme;
  const nextTheme = currentTheme === "light" ? "dark" : "light";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(nextTheme)}
      className="rounded-lg border border-border text-muted-foreground hover:text-foreground"
      aria-label={`Switch to ${nextTheme} theme`}
    >
      {currentTheme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </Button>
  );
}
