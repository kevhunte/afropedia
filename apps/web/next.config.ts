import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  transpilePackages: ['@afropedia/shared'],
  output: 'standalone',
  // Pin tracing root to the monorepo root so the standalone output always
  // places server.js at apps/web/server.js regardless of where the build runs.
  outputFileTracingRoot: path.join(__dirname, '../../'),
};

export default nextConfig;
