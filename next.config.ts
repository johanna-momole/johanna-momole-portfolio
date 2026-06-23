import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/resume",
        destination: "/experience",
        permanent: false,
      },
      {
        source: "/projects/healthcare-referral-analytics",
        destination: "/experience",
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
