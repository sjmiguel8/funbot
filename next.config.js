/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['react-bootstrap'],
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "@popperjs/core": false,
    };
    return config;
  },
};

module.exports = nextConfig;
