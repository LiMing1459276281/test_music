const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 禁用图片优化
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // 完全禁用 ESLint 构建检查
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Replace with your domain name
      },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      stream: false,
      crypto: false,
      net: false,
      dns: false,
      string_decoder: false,
      tls: false,
      'pg-native': false,
      pg: false
    };
    return config;
  }
}

module.exports = withMDX(nextConfig)
