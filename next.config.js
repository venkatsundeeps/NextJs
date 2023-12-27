/** @type {import('next').NextConfig} */
const nextConfig = {
  //   experimental: {
  //     serverActions: true,
  //   },
  images: {
    domains: ["res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.morfran.com",
      },
    ],
  },
};

module.exports = nextConfig;
