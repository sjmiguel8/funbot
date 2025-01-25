/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'graphql-tag/loader'
        }
      ]
    });
    return config;
  },
  // output: 'export',
  images: {
    unoptimized: true,
  },
  // Ensure we can deploy to Amplify
  distDir: 'out',
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' https://d8mvw3yuxp9od.cloudfront.net 'unsafe-inline' 'unsafe-eval';
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              font-src 'self' https://fonts.gstatic.com;
              img-src 'self' data: blob: https://*.amazonaws.com;
              connect-src 'self' https://*.amazonaws.com https://*.amazoncognito.com;
              frame-src 'self' https://*.amazoncognito.com;
            `.replace(/\s{2,}/g, ' ').trim()
          }
        ]
      }
    ];
  }
};
