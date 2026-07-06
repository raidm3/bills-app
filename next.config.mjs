/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    optimizePackageImports: ['@tremor/react', '@headlessui/react', '@heroicons/react'],
  },
};

export default nextConfig;
