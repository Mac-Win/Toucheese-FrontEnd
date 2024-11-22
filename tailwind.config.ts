import type { Config } from "tailwindcss";
import scrollbarHide from "tailwind-scrollbar-hide";

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
        "1/1": "1/1",
      },
      colors: {
        "custom-bg": "#FFFCF5",
      },
      maxWidth: {
        custom: "600px", // 사용자 정의 값 추가
      },
    },
  },
  plugins: [scrollbarHide], // 플러그인 적용
};

export default config;
