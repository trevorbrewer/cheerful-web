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
        brand: {
          green:   "#2D6A4F", // deep giving green — primary
          mint:    "#74C69D", // light accent
          cream:   "#F8F4EE", // warm off-white background
          charcoal:"#1C1C1E", // primary text
          gold:    "#E9C46A", // warmth / highlight
          coral:   "#E76F51", // CTA / urgency
        },
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body:    ["DM Sans", "sans-serif"],
      },
      borderRadius: {
        xl:  "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;