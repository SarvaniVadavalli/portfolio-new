"use client";

import React from "react";
import { useTheme } from "@/hooks/useTheme";

interface ThemeToggleProps {
  className?: string;
  id?: string;
}

export default function ThemeToggle({ className = "", id = "theme" }: ThemeToggleProps) {
  const { toggleTheme } = useTheme();

  return (
    <button
      id={id}
      type="button"
      className={className}
      aria-label="Switch between light and dark theme"
      onClick={toggleTheme}
    >
      Theme
    </button>
  );
}

