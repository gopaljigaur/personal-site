const { withContentlayer } = require('next-contentlayer');
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
        destination: 'https://twitter.com/gopalji_gaur',
        permanent: true
      },
      {
        source: '/github',
        destination: 'https://github.com/gopaljigaur',
        permanent: true
      },
      {
        source: '/linkedin',
        destination: 'https://www.linkedin.com/in/gopaljigaur',
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
