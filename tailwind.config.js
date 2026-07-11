/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#f4efe6",
          muted: "#ece4d6",
          deep: "#e3d9c6",
          warmer: "#efe6d4",
          cream: "#faf5ed",
        },
        ink: {
          DEFAULT: "#2b2620",
          soft: "#4a4339",
          faint: "#8a8073",
          lighter: "#b8afa3",
        },
        accent: {
          DEFAULT: "#9c6b4a",
          soft: "#b8896a",
          pale: "#d4b8a3",
        },
        cover: {
          DEFAULT: "#3d342c",
          light: "#5c5045",
          dark: "#2a231d",
          edge: "#4a3f35",
        },
      },
      fontFamily: {
        serif: [
          "Georgia",
          "Palatino Linotype",
          "Book Antiqua",
          "Palatino",
          "Times New Roman",
          "Times",
          "serif",
        ],
        sans: [
          "ui-sans-serif",
          "system-ui",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      letterSpacing: {
        wider: "0.15em",
        widest: "0.25em",
      },
      maxWidth: {
        reading: "48rem",
      },
      boxShadow: {
        "page-hover":
          "0 8px 36px -10px rgba(43, 38, 32, 0.32), 0 2px 8px -2px rgba(43, 38, 32, 0.10)",
        "button-hover": "0 4px 16px -6px rgba(43, 38, 32, 0.3)",
        glow: "0 0 40px -12px rgba(156, 107, 74, 0.12)",
      },
      transitionDuration: {
        gentle: "400ms",
      },
    },
  },
  plugins: [],
};
