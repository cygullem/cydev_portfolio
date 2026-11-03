import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "github.com", pathname: "/**" }],
    localPatterns: [
      { pathname: "/projects/**" },
      { pathname: "/hero-portrait.png" },
    ],
  },
};

export default nextConfig;
