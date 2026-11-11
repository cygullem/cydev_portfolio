import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: /react/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
            },
          },
        ],
        as: '*.js',
      },
    },
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "github.com", pathname: "/**" }],
    localPatterns: [
      { pathname: "/projects/**" },
      { pathname: "/hero-portrait.png" },
      { pathname: "/thumbnail/**" },
      { pathname: "/favicon.png" },
    ],
  },
};

export default nextConfig;
