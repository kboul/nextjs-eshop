import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.stripe.com",
        port: "", // leave empty unless you're using a specific port
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;
