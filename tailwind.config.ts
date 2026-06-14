import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#0F0A0A",
        surface: "#1A1010",
        accent: "#E11D48",
        "accent-soft": "#FB7185",
        text: "#F8FAFC",
        muted: "#94A3B8",
        highlight: "#FBBF24",
        border: "#2D1515"
      },
      boxShadow: {
        rose: "0 0 0 1px rgba(225, 29, 72, 0.18), 0 24px 64px -24px rgba(225, 29, 72, 0.55)",
        glow: "0 0 24px rgba(251, 113, 133, 0.15)"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Fira Code", "monospace"]
      },
      keyframes: {
        shimmer: {
          "0%, 100%": { transform: "translateX(-12%)" },
          "50%": { transform: "translateX(12%)" }
        }
      },
      animation: {
        shimmer: "shimmer 14s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;