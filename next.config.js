/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  compress: true,
  reactStrictMode: true,
  images: { unoptimized: true },
  experimental: {
    serverComponentsExternalPackages: ['@visioncortex/vtracer', 'sharp'],
  },
};

module.exports = nextConfig;
