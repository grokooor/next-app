import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  productionBrowserSourceMaps: true,
  allowedDevOrigins:['127.0.0.1','localhost'],
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "*", // Allow images from all domains
    },]
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
    };
    config.module.rules.push({
      test: /\.worker\.(js|ts)$/i,
      use: { loader: 'worker-loader', options: { inline: true } },
    });
    return config;
  },
};

export default nextConfig;
