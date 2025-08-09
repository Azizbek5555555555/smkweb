/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // unoptimized: true,
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
