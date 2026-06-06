import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Disable Turbopack for production builds to avoid path-with-spaces resolution issue */
};

export default nextConfig;
