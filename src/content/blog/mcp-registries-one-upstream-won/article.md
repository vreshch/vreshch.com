---
title: 'MCP Registries in Mid-2026: One Upstream Won'
subtitle: 'I deleted my 26,708-server scraped MCP catalog and rebuilt on the official registry. The field report, half length.'
description: 'I deleted my 26,708-server scraped MCP catalog and rebuilt registry-native on the official MCP Registry. All the key facts, half the length.'
date: 2026-07-17
category: coding
cover: images/cover.png
ogImage: images/cover.png
readingTime: '4 min read'
mediumUrl: 'https://medium.com/@vreshch/mcp-registries-in-mid-2026-one-upstream-won-2ce541b92036'
tags:
  - mcp
  - mcp-registry
  - agentage
  - developer-tooling
  - agents
---

**July 2026 · [Read the full article on Medium →](https://medium.com/@vreshch/mcp-registries-in-mid-2026-one-upstream-won-2ce541b92036)**

In May I wrote that my vibe-coded catalog indexed **26,708 [Model Context Protocol](https://modelcontextprotocol.io/) servers** and that the next move was a pivot from breadth to trust. Last week I finished that pivot by deleting the catalog. mcpxhub.io now answers with 1,007 redirects, all pointing at the rebuild: [catalog.agentage.io](https://catalog.agentage.io/mcp). The rebuild holds about ten thousand _fewer_ servers. That's the upgrade.

## The number I bragged about was the problem

A crawler can verify that a repo _looks like_ an MCP server. It cannot verify that anyone owns it, that the npm package belongs to the repo, or that the hosted URL is operated by the name on the tin. Scraped breadth is a pile of unverifiable claims with great SEO.

Meanwhile the official [MCP Registry](https://registry.modelcontextprotocol.io/) went live at `registry.modelcontextprotocol.io` (still formally a preview; API frozen at v0.1). It holds roughly **16,967 published servers** as of July 16, 2026, and every one got there the same way: a publisher proved ownership of a namespace and signed a record. Nobody crawled anything.

> 26,708 scraped beats 16,967 verified on a homepage. It loses everywhere else.

## One upstream, many views

![One upstream, many subregistries: publish one record and PulseMCP, Glama, and agentage mirror it downstream](/blog/mcp-registries-one-upstream-won/images/ecosystem.png)

Catalogs are becoming views of the same upstream, each adding a different lens: [PulseMCP](https://www.pulsemcp.com/) layers editorial curation and a newsletter, [Glama](https://glama.ai/mcp/servers) re-publishes everything plus data from running servers in its own sandboxes, and [agentage](https://catalog.agentage.io/mcp) crawls `/v0.1/servers` daily and adds computed grades and health probes.

Not everyone is fully in. [GitHub's MCP registry](https://github.com/mcp) is a separate curated catalog (interop planned, not mirroring); [Smithery](https://smithery.ai/) publishes _into_ the registry but has never stated it sources from it. Convergence is the settled direction, not a completed migration.

The payoff for a server author: **publish once, appear everywhere.** One `mcp-publisher publish` and your server shows up in PulseMCP, Glama, and agentage within a day, carried by their ETL jobs. The five-directory submission grind of 2025 is ending.

## There are exactly two doors in

![Two doors into the registry: package-first proof or URL-first proof, one record can walk through both](/blog/mcp-registries-one-upstream-won/images/doors.png)

The registry hosts metadata, never artifacts. **Door A: a package** on an allowlisted public registry (npm, PyPI, NuGet, Cargo, OCI images, MCPB binaries); base URLs are pinned, and ownership is proven inside the artifact - for npm, a `mcpName` field in `package.json` must match the `server.json` name exactly. **Door B: a remote URL** - a publicly reachable `streamable-http` (or SSE) endpoint in a `remotes` array.

My MCP-search server walks both from a single record: `io.agentage/mcp-catalog` ships as `@agentage/catalog-mcp` on npm _and_ as the hosted endpoint `catalog.agentage.io/mcp`. The schema is stricter than you'd guess: descriptions are capped at **100 characters**, enforced.

## Subregistries are the architecture

The registry's own [ecosystem vision](https://github.com/modelcontextprotocol/registry/blob/main/docs/design/ecosystem-vision.md) says subregistries "add value to the registry ecosystem by providing curation, or extending it with additional metadata", and that it "expects a lot of API requests from ETL jobs". Enrichment lives in namespaced `_meta` blocks, so downstream catalogs annotate the canonical record instead of forking it. Aggregating isn't parasitism; it's the deployment model.

My rebuild consumes `/v0.1/servers`, re-serves the same v0.1 contract with enrichment under `io.agentage.catalog/v0`, and is itself published into the registry it serves. If the contract drifts, I break myself first.

## The hosted-publish recipe, compressed

![Publish a hosted MCP in four steps: init, prove the namespace, publish, and the directories pick it up unattended](/blog/mcp-registries-one-upstream-won/images/recipe.png)

1. **Describe it.** `mcp-publisher init`, then four fields and no `packages` at all: name, description (you get 100 characters), version, and a `remotes` array with your `streamable-http` URL.
2. **Prove the namespace.** `io.github.<you>/*` costs one GitHub device-flow login. A branded namespace needs an apex-domain proof: a DNS TXT record (`v=MCPv1; k=ed25519; p=<public-key>`) or the same key at `/.well-known/mcp-registry-auth`. DNS is the lower-risk default; the keypair needs OpenSSL 3.
3. **Ship it.** `mcp-publisher validate`, then `mcp-publisher publish`.
4. **Do nothing.** The ETL wave distributes. `io.agentage/mcp-catalog` went live on July 6, 2026 exactly this way; PulseMCP lists it, Glama picked up my memory server through the same pipe. I never filled in a form on either.

## The registry verifies ownership, not quality

It proves _who published_, nothing else - a verified namespace can still register a look-alike `mcp-server-postgress`. That gap is where catalogs now compete. Managed hosting buys convenience and concentrates risk (the June 2025 path-traversal flaw in Smithery's hosting layer exposed 3,000+ hosted servers). For the rebuild I stuck to computed signals: A-F grades kept separate, live health probes, AI categorization, no crowd reviews to game, no hosting to breach.

> Trust is the moat now. Breadth is a `curl` away for anyone.

What none of this tells you yet: whether a server's tools are _actually callable_ by real models, end to end, across vendors. That's measurable, and it's the next article: a cross-model routability score for MCP servers.

**[Read the full article on Medium →](https://medium.com/@vreshch/mcp-registries-in-mid-2026-one-upstream-won-2ce541b92036)** - the complete field report with the real `server.json`, the namespace-proof details, and the receipts.

Related: [catalog.agentage.io](https://catalog.agentage.io/mcp) · [the May prequel](/blog/vibe-coded-mcp-catalog) · [@vreshch on GitHub](https://github.com/vreshch)
