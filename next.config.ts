import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.flabs.in",
        port: "",
        pathname: "/webassets/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
