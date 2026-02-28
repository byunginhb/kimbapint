"use client";

import { Sun, Moon } from "lucide-react";
import { useAppTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useAppTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-1.5 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-ki-surface-alt border border-ki-border-subtle rounded text-ki-text-secondary hover:bg-ki-elevated hover:text-ki-text transition-all text-xs"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <Sun className="w-3.5 h-3.5" />
      ) : (
        <Moon className="w-3.5 h-3.5" />
      )}
    </button>
  );
}
