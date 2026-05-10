---
title: 'I Vibe-Coded an MCP Catalog. Coding Was the Easy Part.'
subtitle: 'I shipped 26,708 MCP servers in two weeks of vibe-coded code. Four field-report lessons from running it since.'
description: 'I shipped 26,708 MCP servers in two weeks of vibe-coded code. Four field-report lessons from running it since.'
date: 2026-05-10
cover: images/cover.png
ogImage: images/cover.png
readingTime: '3 min read'
tags:
  - mcp
  - vibe-coding
  - mcpxhub
  - agents
  - developer-tooling
---

May 2026. The catalog behind [mcpxhub.io](https://mcpxhub.io) holds **26,708 Model Context Protocol servers**. The crawler has scanned 47,246 unique repositories; 43,303 cleared first-stage filtering.

I shipped it in two weeks of vibe-coded code. What follows is what running it since has taught me: four lessons, in field-report order.

_Two weeks of code. The lessons came after._

## The four lessons

1. **The opportunity window is shorter than you think.** While I was hardening v1, three competitor catalogs shipped: mcp.so, Glama, Smithery. Whatever you can vibe-code in two weeks, three other people are vibe-coding right now.
2. **Vibe coding accelerates disorder. Maintenance is the discipline.** Schema-by-convention drifted by month eight. The fix wasn't a database swap; it was a Zod schema at every collection boundary plus a Service Provider that hands every job a validator.
3. **Learning speed went up. So did the shape of failure.** A Traefik router collision took down prod because two compose files were copies of each other. The bug I'd never have written by hand is exactly the kind of bug an AI loop produces when you skim.
4. **The dev skill stack is repricing in real time.** Hand-coding and framework recall are commodities. System architecture, eval-driven dev, and agent orchestration are the new bar: the boundaries the model never volunteers.

> _Typing was never the bottleneck. Asking the right question always was. Vibe coding just made the bill itemized._

## What's next

The pivot is from breadth to **trust**: per-server health from commit activity and install success, protocol-conformance probes, signed install metadata, a freshness feed of newly-published servers that pass the gate on day one. The catalog is one piece of a bigger arc. **A directory is the front door of running agents in production.** mcpxhub.io is the discovery layer for a control plane I'm building around it.

---

Related: [mcpxhub.io](https://mcpxhub.io) — the catalog this article is about · [@vreshch on GitHub](https://github.com/vreshch).
