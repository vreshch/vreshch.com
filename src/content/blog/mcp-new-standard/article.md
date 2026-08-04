---
title: "MCP's New Standard: What Changed and Why It Was Needed"
subtitle: 'Stateless core, MCP Apps, one foundation: the July 28 release explained by someone running two production MCP endpoints.'
description: 'MCP went stateless on July 28. A production MCP operator explains what changed, why it was needed, and measures the migration across 8,588 live servers.'
date: 2026-08-04
category: coding
cover: images/cover.png
readingTime: '8 min read'
mediumUrl: 'https://medium.com/@vreshch/mcps-new-standard-what-changed-and-why-it-was-needed-8ac7556183e7'
tags:
  - mcp
  - agents
  - software-architecture
  - agentage
  - developer-tooling
---

MCP went stateless on July 28, 2026. My server at [memory.agentage.io/mcp](https://agentage.io) had been running that way since May: one server instance per request, no session table, nothing to lose when an instance dies. The first commit of that transport is dated eight days after the release candidate locked. I did not predict anything - I read the roadmap and believed it.

Five days after the spec went final, I probed every remote endpoint in the official registry - 8,588 URLs - to measure whether the migration is real. It is, and its shape says something about how modern standards actually land.

_The request survives. The servers that answered it do not remember._

## What the article covers

1. **Why the handshake had to go.** The session model was honest on a laptop and a trap on a fleet: sticky routing, shared session stores, sessions dying with their instance.
2. **The stateless future was announced in December.** The most telegraphed change in the protocol's history - direction in December, proposal in April, candidate in May, final in July.
3. **The week-one numbers.** My directory at [catalog.agentage.io](https://catalog.agentage.io) indexes 19,598 servers, half of them remote. Of the probed fleet, 293 already negotiate the new spec - and 76.5 percent behave statelessly regardless of what their version field says.
4. **What July 28 does not fix.** The state moved rather than disappeared, deprecations start a twelve-month clock, and context bloat is untouched.

> _Adoption of a well-signposted standard is not an event. It is a version field catching up to behavior._

## Where MCP goes from here

MCP now lives under the Agentic AI Foundation at the Linux Foundation, its SDKs have passed a billion downloads, and GitHub and Cloudflare shipped support before the spec was even final. The argument about whether to adopt it is quietly over; the argument about how to run it well is just beginning. The full article walks through both - with the probe methodology, the operator checklist, and the receipts.

---

Related: [catalog.agentage.io](https://catalog.agentage.io/mcp) - the MCP directory behind the numbers · [agentage Memory](https://agentage.io) - the production endpoint in the story · [@vreshch on GitHub](https://github.com/vreshch).
