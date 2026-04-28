import type { NextConfig } from "next";
import async from './src/app/products/[productId]/page';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
        pathname: '/**'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/profile',
        destination: '/profile/address',
        permanent: true
      }
    ]
  }
};

export default nextConfig;
