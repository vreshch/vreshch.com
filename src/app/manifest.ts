import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Volodymyr Vreshch',
    short_name: 'Vreshch',
    description:
      'Senior Software Engineer at Microsoft. I write about AI agents, MCP, and how AI should remember.',
    start_url: '/',
    display: 'standalone',
    background_color: '#1f2028',
    theme_color: '#F59E0B',
    icons: [
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
      { src: '/icons/icon-192.png', type: 'image/png', sizes: '192x192' },
      { src: '/icons/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
  };
}
