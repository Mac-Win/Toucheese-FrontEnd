import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["i.imgur.com", "imgur.com"], // 허용된 이미지 호스트 추가
  },
};

export default nextConfig;
