import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: {
    root: process.cwd(),
  },
  allowedDevOrigins: [
    "depending-true-warranty-willing.trycloudflare.com",
    "*.trycloudflare.com",
    "*.loca.lt",
    "localhost:3000",
  ],
};

export default nextConfig;
