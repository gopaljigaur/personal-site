const { withContentlayer } = require('next-contentlayer');
const metadata = require('./data/metadata.json');
/**
 * @type {import('next').NextConfig}
 */
module.exports = withContentlayer()({
  swcMinify: true,
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/twitter',
        destination: metadata.twitter,
        permanent: true
      },
      {
        source: '/github',
        destination: metadata.github,
        permanent: true
      },
      {
        source: '/linkedin',
        destination: metadata.linkedin,
        permanent: true
      }
    ]
  },
  images: {
    domains: [
      'i.scdn.co', // Spotify Album Art
      'pbs.twimg.com', // Twitter Profile Picture
      'www.gravatar.com' // Gravatar Profile Picture
    ]
  },
  webpack: (config, { dev, isServer }) => {
    // Replace React with Preact only in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        'react/jsx-runtime.js': 'preact/compat/jsx-runtime',
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat'
      });
    }

    return config;
  }
});
