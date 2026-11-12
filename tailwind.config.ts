import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          DEFAULT: "#0E3B2E",
          dark: "#08261E",
          light: "#175643",
          50: "#F0F7F4",
          100: "#D8EBE3",
          800: "#0E3B2E",
          900: "#08261E",
        },
        gold: {
          DEFAULT: "#B8893B",
          dark: "#966E2B",
          light: "#F3E7CC",
          soft: "#FDF8F0",
          50: "#FCF8F1",
          100: "#F7ECCF",
          600: "#B8893B",
        },
        ivory: {
          DEFAULT: "#FAF6EE",
          surface: "#FDFBF7",
        },
        sand: {
          DEFAULT: "#F2ECDF",
          border: "#E7DFD0",
          hover: "#E9E1D1",
        },
        ink: {
          DEFAULT: "#1C1917",
          muted: "#6B645A",
          light: "#9A9389",
        },
        status: {
          success: "#157F4F",
          "success-bg": "#E8F5EF",
          warning: "#B54708",
          "warning-bg": "#FEF3EB",
          error: "#B42318",
          "error-bg": "#FEE4E2",
          info: "#1D5FBF",
          "info-bg": "#EFF8FF",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.04)",
        elevated: "0 10px 25px -5px rgba(14, 59, 46, 0.08), 0 8px 10px -6px rgba(14, 59, 46, 0.04)",
        modal: "0 20px 40px -10px rgba(28, 25, 23, 0.16)",
      },
    },
  },
  plugins: [],
};
export default config;

