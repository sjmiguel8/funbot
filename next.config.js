/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Ensure we can deploy to Amplify
  distDir: 'out',
}

module.exports = nextConfig
