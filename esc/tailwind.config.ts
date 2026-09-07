import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "esc-orange": "#F07839",
        "esc-dark-teal": "#007284",
        "esc-paper": "#FBF7F1",
        "esc-teal": "#1A8FA0",
        "esc-body-black": "#1A1A1A",
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
