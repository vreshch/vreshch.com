import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',

  async redirects() {
    return [
      {
        source: '/cv.html',
        destination: '/cv',
        permanent: true,
      },
      {
        source: '/interests.html',
        destination: '/interests',
        permanent: true,
      },
      {
        source: '/projects.html',
        destination: '/projects',
        permanent: true,
      },
      {
        source: '/chemistry-js.html',
        destination: '/chemistry-js',
        permanent: true,
      },
      {
        source: '/contacts.html',
        destination: '/contacts',
        permanent: true,
      },
      {
        source: '/support.html',
        destination: '/support',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
