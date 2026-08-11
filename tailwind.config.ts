import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        control: {
          black: "#ffffff",
          deep: "#f6f7f8",
          panel: "#eef1f4",
          line: "#c8ced6",
          muted: "#4f5864",
          text: "#101216",
          soft: "#20252c",
          warm: "#cf1f2b",
          amber: "#9f111d",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      boxShadow: {
        control: "0 24px 80px rgb(16 18 22 / 0.16)",
        glow: "0 0 0 3px rgb(207 31 43 / 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
