import type { Config } from "tailwindcss";

// Locked BVE brand tokens (anthropic-skills:bve-design-system v1.0).
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Kept as literal hex (not var()) so Tailwind can generate opacity-
        // modifier utilities like text-bve-ink/75 — see esc/tailwind.config.ts
        // for the full explanation of why var() breaks this.
        "bve-ink": "#0A1F44",
        "bve-ink-body": "#1A1A1A",
        "bve-canvas": "#FBF7F1",
        "bve-accent": "#E8A020",
        "bve-accent-glow": "#DEAC54",
        "bve-data": "#0066CC",
        "bve-glass": "#050A11",
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
