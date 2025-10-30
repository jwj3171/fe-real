import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // 프론트 /api/auth/signin
        destination: process.env.NEXT_PUBLIC_API_BASE_URL
          ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*` // /api가 이미 포함되어 있으므로 제거
          : "http://localhost:4000/api/:path*",
      },
    ];
  },
};

export default nextConfig;
