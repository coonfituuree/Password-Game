import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // @ts-expect-error: turbopack не типизирован в Next.js
    turbopack: {
      root: __dirname,
    },
  },
};

export default nextConfig;
