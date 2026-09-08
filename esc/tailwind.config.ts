import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // These four are byte-exact matches to their styles/tokens.css token
        // (--orange-500, --teal-500, --paper, --teal-accent-500 respectively) — kept
        // as literal hex, NOT var(), because Tailwind can only generate opacity-
        // modifier utilities (e.g. text-esc-paper/75, used throughout Hero) by
        // decomposing a color into RGB channels at build time, which it cannot do
        // for an opaque var() reference. Wiring these through var() previously
        // broke every /opacity-modified usage silently (Tailwind emitted invalid
        // CSS, so the browser dropped the color and text fell back to whatever it
        // inherited) — see git history for that regression and its fix.
        "esc-orange": "#F07839",
        "esc-dark-teal": "#007284",
        "esc-paper": "#FBF7F1",
        "esc-teal": "#1A8FA0",
        // Not present in styles/tokens.css — no token to wire these to. Left as raw
        // hex; flagged for review rather than guessed at.
        "esc-body-black": "#1A1A1A",
        // dt-50/100/600/900 predate styles/tokens.css and do NOT match the new
        // --teal-050/100/600/900 ramp (dt-600 #4C9CA9 and dt-900 #005B6A in
        // particular are a completely different lightness than --teal-600 #054B56
        // and --teal-900 #041113 — those are near-black background stops, these are
        // mid-tone muted-text stops). Left as raw hex on purpose; flagged for review
        // rather than silently repointed to values that would visibly change every
        // place they're used for body text.
        "dt-50": "#F2F8F9",
        "dt-100": "#DEEDEF",
        "dt-600": "#4C9CA9",
        "dt-900": "#005B6A",
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
      boxShadow: {
        "esc-sm": "0 1px 3px rgba(0,114,132,.07)",
        "esc-md": "0 2px 8px rgba(0,114,132,.09)",
        "esc-lg": "0 4px 16px rgba(0,114,132,.11)",
        "esc-accent": "0 2px 14px rgba(240,120,57,.38)",
        "esc-glow": "0 0 28px 6px rgba(240,120,57,.4), 0 4px 14px rgba(240,120,57,.35)",
      },
      spacing: {
        "1": "4px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "6": "24px",
        "8": "32px",
        "12": "48px",
        "16": "64px",
        "20": "80px",
        "24": "96px",
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
