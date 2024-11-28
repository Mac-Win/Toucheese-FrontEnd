import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // 프로토콜 설정
        hostname: "i.imgur.com", // 허용할 첫 번째 호스트
        port: "", // 포트 번호는 기본값
        pathname: "/**", // 모든 경로 허용
      },
      {
        protocol: "https", // 두 번째 호스트의 프로토콜 설정
        hostname: "imgur.com", // 허용할 두 번째 호스트
        port: "", // 포트 번호는 기본값
        pathname: "/**", // 모든 경로 허용
      },
    ],
  },
};

export default nextConfig;
