/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#0A0A0B",
        surface: "#141416",
        surface2: "#1C1C1F",
        gold: "#C9A24B",
        goldlight: "#E3C878",
        emerald: "#0F5C46",
        ivory: "#F5F1E8",
        muted: "#8A8A8F",
        line: "#26262A",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        body: ["'Inter'", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      keyframes: {
        drawline: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(14px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        drawline: "drawline 0.6s ease forwards",
        fadeUp: "fadeUp 0.6s ease forwards",
      },
    },
  },
  plugins: [],
};
