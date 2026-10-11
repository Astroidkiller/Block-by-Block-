import type {Config} from "tailwindcss";
export default {
  content: ["./app/**/*.tsx", "./components/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        // Official User Palette
        "space-indigo": "#22223B",
        "dusty-grape": "#4A4E69",
        "almond-silk": "#C9ADA7",
        parchment: "#F2E9E4",
        "lilac-ash": "#9A8C98",

        // Semantic bindings mapped to the palette (White Canvas SaaS Architecture)
        ink: "#FFFFFF", // Clean White canvas
        s1: "#FFFFFF", // Elevated pure white surface
        s2: "#F2E9E4", // Parchment sunken container / input well
        line: "rgba(201, 173, 167, 0.45)", // Almond Silk subtle border
        cad: "#22223B", // Space Indigo bold accent
        cadh: "#4A4E69", // Dusty Grape hover
        accent: "#4A4E69", // Dusty Grape secondary
        ok: "#22223B", // High-contrast Space Indigo for cleared/sealed (Zero green)
        hold: "#4A4E69", // Dusty Grape for holds/incompletes (Zero red)
        ti: "#22223B", // Space Indigo deep high-contrast text
        slate: "#4A4E69", // Dusty Grape secondary readable text
        subtle: "#9A8C98", // Lilac Ash metadata text
      },
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
        heading: [
          '"Plus Jakarta Sans"',
          "Inter",
          "sans-serif",
        ],
        mono: [
          '"JetBrains Mono"',
          '"SF Mono"',
          "ui-monospace",
          "Menlo",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
