import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/thouryathrikam" : "";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath,
  env: {
    // Plain <video src> paths are not prefixed automatically like next/link and static imports.
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
