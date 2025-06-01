import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'steve-p.org',
        pathname: '/cards/**',
      },
    ],
  },
};

export default nextConfig;
