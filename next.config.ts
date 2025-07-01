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
  },
  experimental: {
    reactCompiler: true // use babel-plugin-react-compiler to avoid rerenders
  },
  // Disable React strict mode temporarily to avoid double rendering issues
  reactStrictMode: false
};

export default nextConfig;
