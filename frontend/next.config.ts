import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'img.vietqr.io',
      },
      {
        protocol: 'https',
        hostname: 'api.vietqr.io',
      },
    ],
  },
  async rewrites() {
    return [
      {
        // Nhận mọi request bắt đầu bằng /api trên Vercel
        source: '/api/:path*',
        // Lén đẩy sang Render (hoặc localhost khi code offline)
        destination: `${process.env.BACKEND_URL || 'http://localhost:3001'}/api/:path*`,
      },
      {
        // Nhận ảnh từ thư mục uploads khi chạy local fallback
        source: '/uploads/:path*',
        destination: `${process.env.BACKEND_URL || 'http://localhost:3001'}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
