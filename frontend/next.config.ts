import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // Nhận mọi request bắt đầu bằng /api trên Vercel
        source: '/api/:path*',
        // Lén đẩy sang Render (hoặc localhost khi code offline)
        destination: `${process.env.BACKEND_URL || 'http://localhost:3001'}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
