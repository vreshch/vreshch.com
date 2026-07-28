---
title: 'Can Your Agent Search for MCPs?'
subtitle: 'The official registry holds 17,000+ servers - but your agent cannot query it. One thin MCP fixes that.'
description: 'Your agent cannot query the official MCP registry. find-mcp gives it mcp_search over 17,000+ working, LLM-graded MCP servers with one line of config.'
date: 2026-07-28
category: coding
cover: images/cover.png
ogImage: images/cover.png
mediumUrl: 'https://medium.com/@vreshch/can-your-agent-search-for-mcps-f6c85fd512f8'
tags:
  - agentage
  - mcp
  - ai-agents
  - developer-tools
  - find-mcp
---

> This piece was originally published on Medium - [Can Your Agent Search for MCPs?](https://medium.com/@vreshch/can-your-agent-search-for-mcps-f6c85fd512f8). The directory behind it is [catalog.agentage.io](https://catalog.agentage.io/mcp).

The official MCP registry holds more than 17,000 servers. It is a source-of-truth database built for other programs to crawl - not a tool your agent can call in the middle of a task. So the server your agent needs stays invisible until you stop, open a directory, and hand-edit a config file.

The fix is one discovery MCP. Point your agent at it and it reads the directory's tool descriptions and picks the right server itself - no browsing, no config editing. **You used to browse. Now you ask.**

## The four things that made it work

1. **The agent searches, not you.** One MCP exposes three tools - `mcp_search`, `mcp_get`, `mcp_categories`. The tool descriptions are the router; all the intelligence is server-side.
2. **Two ways in.** A remote endpoint at [catalog.agentage.io/mcp](https://catalog.agentage.io/mcp) with no auth and no install, or `npx -y @agentage/find-mcp` for Claude Desktop, Cursor, and VS Code. Same three tools either way.
3. **Curation is the product.** The directory crawls the official registry and drops the dead servers - more than half of them - that your agent should never see.
4. **Thin client on purpose.** About 290 lines. The client stays portable and boring so the directory can carry the weight.

> _A directory earns its keep by what it removes - the dead servers your agent should never see._

**[Read the full write-up on Medium →](https://medium.com/@vreshch/can-your-agent-search-for-mcps-f6c85fd512f8)**

---

Related: [catalog.agentage.io](https://catalog.agentage.io/mcp) - [@agentage/find-mcp on npm](https://www.npmjs.com/package/@agentage/find-mcp) - [@vreshch on GitHub](https://github.com/vreshch).
