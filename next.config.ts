import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/cv',
        destination: '/interests',
        permanent: true,
      },
      {
        source: '/cv.html',
        destination: '/interests',
        permanent: true,
      },
      {
        source: '/chemistry-js',
        destination: '/projects',
        permanent: true,
      },
      {
        source: '/chemistry-js.html',
        destination: '/projects',
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
