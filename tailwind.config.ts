import type { Config } from "tailwindcss";
import scrollbarHide from "tailwind-scrollbar-hide";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        "3/4": "3 / 4",
        "16/9": "16 / 9",
        "1/1": "1/1",
      },
      colors: {
        "custom-bg": "#FFFCF5",
      },
      maxWidth: {
        custom: "var(--max-width)",
      },
    },
  },
  plugins: [scrollbarHide],
};

export default config;
