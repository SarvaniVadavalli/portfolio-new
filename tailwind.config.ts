import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        card: "var(--card)",
        ink: "var(--ink)",
        dim: "var(--dim)",
        line: "var(--line)",
        acc: "var(--acc)",
        soft: "var(--soft)",
        key: "var(--key)",
        str: "var(--str)",
        b: "var(--b)",
      },
      fontFamily: {
        sans: ["var(--sans)", "system-ui", "sans-serif"],
        head: ["var(--head)", "system-ui", "sans-serif"],
        mono: ["var(--mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;

