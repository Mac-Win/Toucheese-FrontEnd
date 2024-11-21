import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}", // 'features' 폴더 경로 추가
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}", // 'shared' 폴더 경로 추가
  ],
  theme: {
    extend: {
      aspectRatio: {
        "3/4": "3 / 4",
        "16/9": "16 / 9",
      },
      colors: {
        "custom-bg": "#FFFCF5",
      },
    },
  },
  plugins: [],
};

export default config;
