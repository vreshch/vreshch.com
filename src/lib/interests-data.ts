export type NowThread = {
  title: string;
  body: string;
  links: { label: string; href: string }[];
};

export type TimelineEntry = {
  period: string;
  role: string;
  detail?: string;
  receipts?: { label: string; href: string }[];
};

export type ProfileLink = {
  label: string;
  href: string;
};

export const NOW_THREADS: NowThread[] = [
  {
    title: 'AI memory',
    body: 'Open-source work around one markdown memory every AI can read and write.',
    links: [
      { label: 'agentage.io', href: 'https://agentage.io' },
      { label: 'github.com/agentage', href: 'https://github.com/agentage' },
    ],
  },
  {
    title: 'MCP ecosystem',
    body: 'An open directory of Model Context Protocol servers, plus the tooling around it.',
    links: [{ label: 'MCP catalog', href: 'https://catalog.agentage.io/mcp' }],
  },
  {
    title: 'Writing',
    body: 'Essays on agents, MCP, and how AI should remember.',
    links: [{ label: 'Read the blog', href: '/blog' }],
  },
];

export const TIMELINE: TimelineEntry[] = [
  {
    period: '2021 - present',
    role: 'Senior Software Engineer, Microsoft',
    detail: 'Frontend on products used by millions.',
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
        label: '~480 citations, h-index 11 (Google Scholar)',
        href: 'https://scholar.google.com/citations?user=z3jmonEAAAAJ',
      },
      {
        label: 'Sole-author software paper: DiffractWD, J. Appl. Crystallogr. 44, 219-220 (2011)',
        href: 'https://onlinelibrary.wiley.com/doi/abs/10.1107/S0021889810044614',
      },
    ],
  },
  {
    period: 'Education',
    role: 'PhD Inorganic Chemistry, Taras Shevchenko National University of Kyiv; MS Computer Science',
    receipts: [
      {
        label: 'crystallography.io - search over 80k+ Crystallography Open Database structures',
        href: 'https://crystallography.io',
      },
      { label: 'The @chemistry npm scope', href: 'https://www.npmjs.com/org/chemistry' },
    ],
  },
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
