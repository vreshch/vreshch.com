---
title: 'Agentage Galaxy: see your Obsidian vault in 3D'
subtitle: 'A free Obsidian plugin that renders your notes as a 3D, rotating force-graph. Notes are nodes, links are edges, folders form colored clusters. Now in the community directory.'
description: 'Agentage Galaxy is a free Obsidian plugin that shows your vault as a 3D, rotating force-graph. One-click install, fully local, part of Agentage Memory.'
date: 2026-06-23
category: coding
cover: images/cover.png
ogImage: images/cover.png
coverLink: 'https://agentage.io/blog/agentage-galaxy-3d-graph'
tags:
  - agentage
  - ai-memory
  - obsidian
  - launch
  - build-in-public
---

> I'm building **[Agentage Memory](https://agentage.io)** - one shared memory for every AI. Agentage Galaxy is a free Obsidian plugin from the same project, originally published on the [agentage blog](https://agentage.io/blog/agentage-galaxy-3d-graph).

Your vault already knows its own shape. Every `[[link]]` you write is an edge, every note a
node, every folder a cluster. The built-in graph view flattens all of that onto a plane.
**Agentage Galaxy** lifts it into three dimensions, so the structure you have been building
note by note finally looks like what it is: a galaxy.

It is free, it is in the Obsidian community directory today, and it runs entirely on your
device.

![A rotating 3D force-graph of an Obsidian vault](/blog/agentage-galaxy-3d-graph/images/demo.gif)

## What it is

Agentage Galaxy is the built-in graph view, in 3D. The same data model and the same filters,
rendered with [three.js](https://threejs.org) and auto-orbit:

- **Auto-clustered by folder, zero config.** Every top-level folder gets its own color, so the
  shape of your vault pops on first open. Tags, attachments, and unresolved `[[links]]` each
  form their own group.
- **Sized by connections.** Your hub notes are visibly the biggest stars.
- **Nothing new to learn.** The same filters as the built-in graph - search, tags, attachments,
  existing-files-only, orphans - plus full force controls (center, repel, link, distance) and
  node size, link thickness, labels, and arrows.
- **Fly through it.** Auto-orbit with a speed control. Left-drag to rotate, scroll to zoom
  toward the cursor, right-drag to pan, click a node to open that note.

![Agentage Galaxy running inside Obsidian, with the controls panel open](/blog/agentage-galaxy-3d-graph/images/in-obsidian.png)

## Install it

One click from inside Obsidian:

**[Open in Obsidian](obsidian://show-plugin?id=agentage-galaxy)** - or copy
`obsidian://show-plugin?id=agentage-galaxy` into your browser.

Or from the app: Settings -> Community plugins -> Browse -> search **"Agentage Galaxy"** ->
Install -> Enable. Then click the brain icon in the left ribbon, and your vault starts
rotating.

## 100% local

Agentage Galaxy makes zero network calls. It is a pure, offline visualization of the Markdown
you already own - no account, no upload, nothing leaves your machine. Desktop only, because it
renders with WebGL.

## Part of Agentage Memory

Agentage Galaxy shows you one vault. **[Agentage Memory](https://agentage.io)** is the layer
underneath the idea: one set of plain-Markdown notes that every AI you use - Claude, ChatGPT,
VS Code - can read and write over MCP, mirrored locally as files you own.

> One memory. Every AI. Owned by you.

The graph is the view. Memory is the thing every AI shares. Connect any client once at
**[memory.agentage.io](https://memory.agentage.io)**, and your tools stop opening with a blank
slate.

Install [Agentage Galaxy](obsidian://show-plugin?id=agentage-galaxy), and see your vault the
way it has always been shaped.
