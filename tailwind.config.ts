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
          green:    "#2D6A4F",
          mint:     "#74C69D",
          cream:    "#F8F4EE",
          charcoal: "#1C1C1E",
          gold:     "#E9C46A",
          coral:    "#E76F51",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body:    ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
