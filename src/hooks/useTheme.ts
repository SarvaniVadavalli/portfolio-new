"use client";

import { useEffect, useState, useCallback } from "react";

export type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const stored = localStorage.getItem("theme") as Theme | null;

    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      root.dataset.theme = stored;
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = prefersDark ? "dark" : "light";
      setTheme(initialTheme);
      // If no explicit stored preference, root dataset.theme is unset so system CSS handles it,
      // but keeping dataset.theme in sync is also fine:
      // In prototype: if no dataset.theme, it checked media query.
    }
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const currentIsDark = root.dataset.theme
      ? root.dataset.theme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;

    const nextTheme: Theme = currentIsDark ? "light" : "dark";
    root.dataset.theme = nextTheme;
    try {
      localStorage.setItem("theme", nextTheme);
    } catch {
      // Local storage may be restricted in private mode
    }
    setTheme(nextTheme);
  }, []);

  return { theme, toggleTheme, mounted };
}

