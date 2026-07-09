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
      'Open-source AI memory - one markdown memory shared across AI assistants over MCP.',
    image: '/mockups/agentage-io.png',
    imageWidth: 1360,
    imageHeight: 967,
  },
  {
    name: 'MCP Directory',
    url: 'https://catalog.agentage.io/mcp',
    description: 'A public directory of Model Context Protocol servers.',
    image: '/mockups/mcp-directory.png',
    imageWidth: 1360,
    imageHeight: 967,
  },
];
