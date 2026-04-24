/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D4AC64",
        dark: "#0A0A0A",
        surface: "#111111",
        surface2: "#1A1A1A",
        accent: "#8B6914",
        gold: {
          light: "#E8C98A",
          DEFAULT: "#C9A96E",
          dark: "#8B6914",
        },
        brand: {
          DEFAULT: "#164863",
          light: "#C4DCE8",
        },
      },
      fontFamily: {
        sans: ["Almarai", "Inter", "sans-serif"],
      },
      keyframes: {
        "loader-bar": {
          "0%": { width: "0%", marginLeft: "0%" },
          "50%": { width: "60%", marginLeft: "20%" },
          "100%": { width: "0%", marginLeft: "100%" },
        },
        dot: {
          "0%, 80%, 100%": { opacity: "0.2", transform: "scale(0.8)" },
          "40%": { opacity: "1", transform: "scale(1.3)" },
        },
      },
      animation: {
        marquee: "marquee 18s linear infinite",
        slideDown: "slideDown 0.3s ease forwards",
        "loader-bar": "loader-bar 1.8s ease-in-out infinite",
        dot: "dot 1.4s ease-in-out infinite",
      },
      backdropBlur: { xs: "2px" },
    },
  },
  plugins: [],
};
