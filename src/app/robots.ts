import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/design-system',
    },
    sitemap: 'https://vreshch.com/sitemap.xml',
  };
}
