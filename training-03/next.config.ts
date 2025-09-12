import type { NextConfig } from "next";

const REPO_BASE = '/next-training'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: REPO_BASE,        // ルーティングや <Link> にサブパスを付与
  assetPrefix: REPO_BASE,
  images: { unoptimized: true },
};

export default nextConfig;
