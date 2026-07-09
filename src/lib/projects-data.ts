export type ProjectLink = { name: string; url: string; description: string };

export const AI_PROJECTS: ProjectLink[] = [
  {
    name: 'agentage.io',
    url: 'https://agentage.io',
    description: 'Open source AI memory - one markdown memory shared across AI assistants over MCP',
  },
  {
    name: 'MCP directory',
    url: 'https://catalog.agentage.io/mcp',
    description: 'Public directory of Model Context Protocol servers',
  },
  {
    name: '@agentage/memory-core',
    url: 'https://www.npmjs.com/package/@agentage/memory-core',
    description: 'Transport-agnostic engine: config, vault registry, and git-backed storage',
  },
  {
    name: '@agentage/server-memory',
    url: 'https://www.npmjs.com/package/@agentage/server-memory',
    description: 'Stdio MCP server exposing the git-backed markdown memory tools',
  },
  {
    name: 'agentage/cli',
    url: 'https://github.com/agentage/cli',
    description: 'Command-line client - connect, search, and manage your memory from the terminal',
  },
  {
    name: 'agentage/obsidian-sync',
    url: 'https://github.com/agentage/obsidian-sync',
    description:
      'Obsidian plugin - two-way sync your vault to a memory every AI can read and write',
  },
  {
    name: 'agentage/obsidian-galaxy',
    url: 'https://github.com/agentage/obsidian-galaxy',
    description: 'Obsidian plugin - render your vault as a 3D, rotating force-graph',
  },
  {
    name: 'agentage/vscode-agentage',
    url: 'https://github.com/agentage/vscode-agentage',
    description: 'VS Code extension - connect your editor to your memory over MCP',
  },
];

export const CHEMISTRY_LIBRARIES: ProjectLink[] = [
  {
    name: '@chemistry/crystallography.io',
    url: 'https://github.com/chemistry/crystallography.io',
    description: 'Web interface for the COD database',
  },
  {
    name: '@chemistry/crystalview',
    url: 'https://github.com/chemistry/crystalview',
    description: 'Molecular viewer for crystal structures',
  },
  {
    name: '@chemistry/molpad',
    url: 'https://github.com/chemistry/molpad',
    description: 'Molecule editor component',
  },
  {
    name: '@chemistry/chemical-libraries',
    url: 'https://github.com/chemistry/chemical-libraries',
    description: 'Math, elements, and space group utilities',
  },
];
