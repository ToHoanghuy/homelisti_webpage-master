/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "homlisti.tpblog.net",
      },
    ],
    domains: ['localhost'],
  },
};

module.exports = nextConfig;
