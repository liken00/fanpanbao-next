import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        baseBg: "#08080C",
        navBg: "#0B0B0F",
        cardBg: "#151520",
        borderLine: "#272736",
        primary: "#2563EB",
        primaryHover: "#1D4ED8",
        textMain: "#FFFFFF",
        textSub: "#B0B0C3",
        textPlaceholder: "#717185",
        accent: "#00D084",
      },
      borderRadius: {
        sm: "12px",
        md: "14px",
        lg: "16px",
      },
      boxShadow: {
        card: "0 4px 20px rgba(0, 0, 0, 0.35)",
      },
      transitionDuration: {
        base: "250ms",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      backdropBlur: {
        nav: "8px",
      },
    },
  },
  plugins: [],
};

export default config;
