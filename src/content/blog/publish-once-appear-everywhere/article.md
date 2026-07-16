---
title: 'Publish Once, Appear Everywhere: The Registry-Native Way to Ship an MCP Server'
subtitle: 'I deleted my 26,708-server scraped MCP catalog and rebuilt on the official registry. The digest.'
description: 'I deleted my 26,708-server scraped MCP catalog and rebuilt registry-native on the official MCP Registry. Five takeaways, digest version.'
date: 2026-07-17
category: coding
cover: images/cover.png
ogImage: images/cover.png
readingTime: '2 min read'
mediumUrl: 'PENDING-MEDIUM-URL'
tags:
  - mcp
  - mcp-registry
  - agentage
  - developer-tooling
  - agents
---

July 2026. I deleted the scraped catalog I wrote about in May - 26,708 crawled MCP servers - and rebuilt registry-native on the official [MCP Registry](https://registry.modelcontextprotocol.io/): roughly 17,000 ownership-verified servers. mcpxhub.io now answers with 1,007 redirects, all pointing at [catalog.agentage.io](https://catalog.agentage.io/mcp).

The rebuild holds about ten thousand _fewer_ servers. That's the upgrade.

## The five takeaways

1. **The smaller number is worth more.** A crawler can verify that a repo looks like an MCP server; it cannot verify that anyone owns it. Scraped breadth is unverifiable claims with great SEO. Every registry entry exists because a publisher proved a namespace and signed a record.
2. **Publish once, appear everywhere.** One `mcp-publisher publish` and your server shows up in PulseMCP, Glama, and agentage within a day, carried by their ETL jobs. The five-directory submission grind of 2025 is ending.
3. **There are exactly two doors in.** A package on an allowlisted public registry (npm, PyPI, NuGet, Cargo, OCI, MCPB) or a publicly reachable remote URL. Same server.json either way - my own server walks through both doors from one record.
4. **Subregistries are the architecture, not parasites.** The registry's ecosystem-vision doc expects ETL consumers and reserves namespaced _meta blocks for their enrichment. The registry is upstream infrastructure the way npm is: nobody browses npm, everybody builds on it.
5. **The registry verifies ownership, not quality.** It proves who published - not whether the code is maintained, licensed, or safe. That gap is where catalogs now compete: computed grades, health probes, editorial curation, hosting.

> Trust is the moat now. Breadth is a curl away for anyone.

The full field report - the four-step hosted-publish recipe, real server.json examples, the namespace-proof cheatsheet, and the receipts - is on Medium:

**[Read the full article on Medium](PENDING-MEDIUM-URL)**
