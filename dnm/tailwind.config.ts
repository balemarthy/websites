import type { Config } from "tailwindcss";

// PLACEHOLDER tokens — no locked DNM brand system exists yet (unlike ESC,
// which has a dedicated design-system skill). Swap these for the real brand
// palette/fonts once they're defined; keep the var() wiring pattern below.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Kept as literal hex (not var()) so Tailwind can generate opacity-
        // modifier utilities like text-dnm-ink/75 — see esc/tailwind.config.ts
        // for the full explanation of why var() breaks this.
        "dnm-ink": "#14181C",
        "dnm-canvas": "#F7F6F3",
        "dnm-accent": "#3457D5",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
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
