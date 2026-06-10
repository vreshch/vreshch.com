---
title: 'I Shipped One Memory for Every AI. The Endpoint Was the Easy Part.'
subtitle: 'memory.agentage.io/mcp is live: six tools, OAuth 2.1, no API keys. Four field-report lessons from being the resource server.'
description: 'One MCP endpoint gives Claude, ChatGPT, and VS Code a shared, user-owned markdown memory. Four field-report lessons - the auth server was the real project.'
date: 2026-06-10
category: coding
cover: images/cover.png
ogImage: images/cover.png
readingTime: '3 min read'
tags:
  - mcp
  - oauth
  - memory
  - agents
  - agentage
  - developer-tooling
---

June 2026. On June 7, [memory.agentage.io/mcp](https://memory.agentage.io/mcp) went to production: one MCP endpoint that gives every AI client - Claude, Claude Code, VS Code, ChatGPT - a shared, user-owned markdown memory. Six tools: **memory\_\_search**, **memory\_\_read**, **memory\_\_write**, **memory\_\_edit**, **memory\_\_list**, **memory\_\_delete**. You sign in once in the browser with a magic link; no API keys to copy around. EU-resident, exportable, plain markdown you own.

[The catalog post](/blog/vibe-coded-mcp-catalog) ended with a claim: a directory is the front door of a control plane. [mcpxhub.io](https://mcpxhub.io) was the discovery layer. This is the second piece - the memory layer. Same arc, advancing one shipped piece at a time. Here is what shipping this one taught me.

_The tools took days. The login took the month._

## The four lessons

1. **The endpoint was the easy 20%. The authorization server was the project.** MCP's remote story is OAuth 2.1 with PKCE, dynamic client registration, and .well-known discovery metadata, so clients you have never heard of can self-register and connect. The spec is clean. The clients are not: registration requests arrive without a `client_name`, redirect URIs show up pre-encoded or double-encoded, and every client implements the flow slightly differently. None of this is written down anywhere - you find out by being the resource server with the logs open.
2. **Stateless beats sessions, then bills you for it.** JSON-mode Streamable HTTP with no server-side session means every request introspects a token and touches the store. The payoff: restarts and horizontal scaling become boring, which is exactly the property you want from infrastructure. The cost: auth introspection becomes your hot path and the first thing burst traffic trips. Cache the introspection; never relabel a rate-limit as an auth error.
3. **Cross-vendor tool design is an eval problem, not a naming debate.** Six tools, double-underscore-prefixed names, descriptions written for the dumbest common denominator. I stopped arguing about wording in review and started running a cross-model eval - Claude and OpenAI models scoring tool selection against the actual wire schemas. The same six tools have to score 100% on both vendors before a description ships, because the descriptions are the API now. Opinions about naming are free; eval scores are evidence.
4. **Verification has to be adversarial.** I pointed an agent fleet at the live endpoint: wrong-audience tokens, malformed registrations, evil origins, burst traffic. It found what unit tests never would - a CORS policy that reflected any origin and needed scoping down, and a wrong-audience token path that crashed with a 500 where it should have refused with a 401. Both were fixed and re-verified against production before this post. Polite tests confirm what you built; hostile agents tell you what you actually shipped.

> _The protocol work was reading specs. The product work was discovering how everyone else read them._

## The window, again

Lesson one from the catalog still applies: **the opportunity window is shorter than you think.** Vendor memories are shipping fast, but today they are closed, per-tool silos - the memory in your chat app does not follow you into your editor, and vice versa. The cross-vendor, files-first slot is the open window, and it will not stay open. The catalog was the front door; this endpoint is the first server I run in production on the other side of it. So the arc keeps moving the way it has: ship the piece, write the field report, ship the next piece.

The launch details - what the six tools do, how each client connects - are on the product blog: [the MCP endpoint is live](https://agentage.io/blog/mcp-endpoint-is-live).

---

Related: [memory.agentage.io/mcp](https://memory.agentage.io/mcp) - the endpoint this article is about - [the launch post](https://agentage.io/blog/mcp-endpoint-is-live) - [the catalog post](/blog/vibe-coded-mcp-catalog) that set up the arc - [@vreshch on GitHub](https://github.com/vreshch).
