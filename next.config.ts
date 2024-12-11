import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "imgur.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  webpack(config, { isServer }) {
    // 빌드에서 제외할 폴더 추가
    if (!isServer) {
      config.resolve.alias["api/test"] = false;
    }
    return config;
  },
};

export default nextConfig;
