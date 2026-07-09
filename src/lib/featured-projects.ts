export type FeaturedProject = {
  name: string;
  url: string;
  description: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
};

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    name: 'Agentage',
    url: 'https://agentage.io',
    description:
      'The platform I am building - a memory layer first, more to come. Today: one markdown memory every AI reads and writes through a single MCP endpoint, owned by you.',
    image: '/mockups/agentage-io.png',
    imageWidth: 1360,
    imageHeight: 967,
  },
  {
    name: 'MCP Directory',
    url: 'https://agentage.io/mcp',
    description:
      'A public directory of Model Context Protocol servers - browse, search, and connect the tools that plug into your AI.',
  },
];
