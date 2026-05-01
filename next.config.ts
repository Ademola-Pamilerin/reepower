import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sandboxapi.arecyl.com",
      },
      {
        protocol: "https",
        hostname: "sandboxapi.nigeriavyap.com",
      },
      {
        protocol: "http",
        hostname: "sandboxapi.arecyl.com",
      }
    ],
  },
};

export default nextConfig;
