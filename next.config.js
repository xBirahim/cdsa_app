const withPWA = require("next-pwa")({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
    skipWaiting: true,
  });
  
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "www.brawlhalla.com",
        },
        {
          protocol: "https",
          hostname: "static.wikia.nocookie.net",
        },
      ],
      minimumCacheTTL: 1500000,
    },
  };
  
  module.exports = withPWA(nextConfig);
  