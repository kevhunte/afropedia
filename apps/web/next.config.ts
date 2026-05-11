import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@afropedia/shared'],
  output: 'standalone',
};

export default nextConfig;
