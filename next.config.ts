import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  images: { remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }] }
};

export default nextConfig;
