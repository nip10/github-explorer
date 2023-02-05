/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["opengraph.githubassets.com"],
  },
};

module.exports = nextConfig;
