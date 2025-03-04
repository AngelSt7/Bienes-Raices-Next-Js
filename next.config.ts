import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "cdn.heroui.dev", // Agrega el dominio de Hero UI
      },
    ],
  },
};

export default nextConfig;
