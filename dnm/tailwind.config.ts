import type { Config } from "tailwindcss";

// Locked DNM brand tokens (anthropic-skills:dnm-design-system v1.0).
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Kept as literal hex (not var()) so Tailwind can generate opacity-
        // modifier utilities like text-dnm-ink/75 — see esc/tailwind.config.ts
        // for the full explanation of why var() breaks this.
        "dnm-ink": "#007284",
        "dnm-ink-body": "#1A1A1A",
        "dnm-ink-muted": "#4C9CA9",
        "dnm-canvas": "#FBF7F1",
        "dnm-white": "#FFFFFF",
        "dnm-accent": "#F07839",
        "dnm-accent-600": "#D9612A",
        "dnm-data": "#1A8FA0",
        "dnm-dark": "#005B6A",
        "dnm-border": "#E6EAEC",
      },
      fontFamily: {
        display: ["var(--font-bricolage)", "sans-serif"],
        body: ["var(--font-lato)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      borderRadius: {
        xs: "2px",
        sm: "4px",
        md: "6px",
        lg: "10px",
        xl: "14px",
      },
      transitionDuration: {
        fast: "120ms",
        base: "200ms",
        slow: "320ms",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
