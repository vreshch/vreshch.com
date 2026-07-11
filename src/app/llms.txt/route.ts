import { getAllPosts } from '@/lib/blog';

export const dynamic = 'force-static';

const ORIGIN = 'https://vreshch.com';

export async function GET(): Promise<Response> {
  const posts = await getAllPosts();

  const writing = posts
    .map((post) => {
      const desc = post.description ? `: ${post.description}` : '';
      return `- [${post.title}](${ORIGIN}/blog/${post.slug})${desc}`;
    })
    .join('\n');

  const body = `# Volodymyr Vreshch

> Senior Software Engineer at Microsoft who writes about AI agents, the Model Context Protocol, and AI memory, and builds open-source tooling.

## Writing

${writing}

## Pages

- [Interests](${ORIGIN}/interests): about, background, and track record.
- [Projects](${ORIGIN}/projects): open-source and side projects.
- [Contacts](${ORIGIN}/contacts): ways to get in touch.

## Projects

- [agentage](https://agentage.io): open-source AI memory shared across assistants over MCP.
- [MCP directory](https://catalog.agentage.io/mcp): public directory of Model Context Protocol servers.
- [GitHub](https://github.com/vreshch): open-source projects he works on.
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
