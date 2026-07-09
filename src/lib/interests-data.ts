export type NowThread = {
  title: string;
  body: string;
  image?: { src: string; alt: string; width: number; height: number };
  links: { label: string; href: string }[];
};

export type TimelineEntry = {
  period: string;
  role: string;
  detail?: string;
  receipts?: { label: string; href: string }[];
  image?: { src: string; alt: string; width: number; height: number };
  defaultOpen?: boolean;
};

export type ProfileLink = {
  label: string;
  href: string;
};

export type FocusStat = {
  label: string;
  value: string;
  href: string;
  source: string;
};

export const NOW_THREADS: NowThread[] = [
  {
    title: 'AI memory',
    body: 'Open-source work around one markdown memory every AI can read and write - owned by you, mirrored as plain files.',
    image: {
      src: '/mockups/agentage-io.png',
      alt: 'agentage.io - one memory every AI can read and write',
      width: 1360,
      height: 967,
    },
    links: [
      { label: 'agentage.io', href: 'https://agentage.io' },
      { label: 'github.com/agentage', href: 'https://github.com/agentage' },
    ],
  },
  {
    title: 'MCP ecosystem',
    body: 'An open directory of Model Context Protocol servers - the connective tissue between AI and the tools it uses.',
    image: {
      src: '/mockups/mcp-directory.png',
      alt: 'The MCP directory - an open catalog of Model Context Protocol servers',
      width: 1360,
      height: 967,
    },
    links: [{ label: 'MCP catalog', href: 'https://catalog.agentage.io/mcp' }],
  },
  {
    title: 'Writing',
    body: 'Essays on agents, MCP, and how AI should remember - thinking out loud as I build.',
    links: [{ label: 'Read the blog', href: '/blog' }],
  },
];

export const FOCUS_STATS: FocusStat[] = [
  {
    label: 'years shipping software',
    value: '10+',
    href: 'https://www.linkedin.com/in/vreshch',
    source: 'LinkedIn',
  },
  {
    label: 'open-source repos',
    value: '9',
    href: 'https://github.com/agentage',
    source: 'github.com/agentage',
  },
  {
    label: 'MCP servers indexed',
    value: '15k+',
    href: 'https://catalog.agentage.io/mcp',
    source: 'the catalog',
  },
  {
    label: 'essays in 2026',
    value: '6',
    href: '/blog',
    source: 'the blog',
  },
];

export const TIMELINE: TimelineEntry[] = [
  {
    period: '2021 - present',
    role: 'Senior Software Engineer, Microsoft',
    detail: 'Frontend on products used by millions.',
    defaultOpen: true,
  },
  {
    period: '2016 - 2021',
    role: 'Lead Software Engineer, EPAM Systems',
    detail: 'TypeScript, React, Angular, Node, cloud.',
  },
  {
    period: '2015 - 2016',
    role: 'Software Engineer, GlobalLogic',
  },
  {
    period: '2008 - 2012',
    role: 'Post-doctoral research',
    detail: 'University at Albany (SUNY) and CNRS / Universite de Rennes 1.',
    receipts: [
      {
        label: 'Publications on Google Scholar',
        href: 'https://scholar.google.com/citations?user=z3jmonEAAAAJ',
      },
    ],
  },
  {
    period: 'Education',
    role: 'PhD, Taras Shevchenko National University of Kyiv; MS Computer Science',
    receipts: [{ label: 'The @chemistry npm scope', href: 'https://www.npmjs.com/org/chemistry' }],
  },
];

export const INTERESTS: string[] = [
  'AI agents & orchestration',
  'Model Context Protocol',
  'AI memory & knowledge graphs',
  'Developer experience',
  'Open source',
  'TypeScript & platform engineering',
  'Infrastructure & CI/CD',
];

export const HOBBIES: string[] = [
  'Skiing across the Czech Republic, Austria, and Italy.',
  'Fishing, hiking, and diving whenever the season allows.',
  'Photography and museums.',
  'Training toward long open-water swims of 8-10 km, with an eye on the Bosphorus cross-continental swim.',
];

export const PROFILE_LINKS: ProfileLink[] = [
  { label: 'GitHub', href: 'https://github.com/vreshch' },
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=z3jmonEAAAAJ' },
  { label: 'Medium', href: 'https://medium.com/@vreshch' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vreshch' },
];
