import type { NextConfig } from "next";

const baseAPI =
  process.env.API_OVERRIDES_PROXY_BASE_URL ||
  "https://api-overrides.anng.dev/api/proxy/main";

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
