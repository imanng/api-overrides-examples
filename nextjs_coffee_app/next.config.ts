import type { NextConfig } from "next";

const baseAPI = "https://api-overrides.anng.dev/api/proxy/main";
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${baseAPI}/:path*`,
      },
    ];
  },
};

export default nextConfig;
