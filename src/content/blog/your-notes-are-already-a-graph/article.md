---
title: 'Your Notes Are Already a Graph. I Turned On the Lights.'
subtitle: 'Plain Markdown plus [[links]] is the format every LLM now reads and writes, and a rotating 3D galaxy is just what that Obsidian graph looks like with the lights on.'
description: 'Your Obsidian vault is already a knowledge graph. Markdown plus links is the format every LLM reads, and Google just shipped the same format. See it as a 3D galaxy.'
date: 2026-06-23
category: coding
cover: images/cover.gif
ogImage: images/thumbnail.png
thumbnail: images/thumbnail.png
readingTime: '7 min read'
mediumUrl: 'https://medium.com/@vreshch'
tags:
  - obsidian
  - knowledge-graph
  - markdown
  - ai
  - knowledge-management
---

Your Obsidian vault is already a graph. [Install Agentage Galaxy](obsidian://show-plugin?id=agentage-galaxy) and one click turns it into a rotating 3D galaxy like the one above. The rest of this piece is why that picture matters.

On June 12, 2026, Google Cloud published a spec called the [Open Knowledge Format](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing). It defines knowledge as "a directory of markdown files with YAML frontmatter." Its reference implementation ships a static HTML file that "turns any OKF bundle into an interactive graph view."

I have been keeping my notes in exactly that format for years, in Obsidian. A folder of Markdown files, joined by `[[links]]`. So this piece is not a prediction. It is a field report from inside the format Google just standardized.

The thesis is simple: your knowledge is already a graph. Plain Markdown plus `[[links]]` is the format both you and every LLM now read and write. A 3D galaxy is just what that graph looks like when you turn on the lights.

And this is not a preference anyone can switch off. These models were trained on oceans of Markdown. They take it in and put it back out by default. That is learned behavior baked into the weights, not a vendor toggle or a customer setting. You can ask a model for less of it, but you are fighting the default, not changing it.

## Why is Markdown the format models read and write?

Because the labs put that choice in writing.

The [llms.txt](https://llmstxt.org/) spec picked Markdown over XML, and it says why: "because we expect many of these files to be read by language models and agents." That is a named standard choosing a format on the explicit grounds that LLMs are the readers. Jeremy Howard proposed it on September 3, 2024.

This is not one person's taste. The agent-config layer standardized on the same primitive, at scale. AGENTS.md is a Markdown-based convention adopted by more than 60,000 open-source projects, and it now sits under the Linux Foundation's [Agentic AI Foundation](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation), formed December 9, 2025, alongside MCP and goose. Anthropic's own CLAUDE.md is a Markdown file the model reads at the start of every session.

So the barrier to "give an AI durable context" is now: create a Markdown file. Nothing else.

There is a tell hiding in the vendor docs. Models lean on Markdown so hard that Anthropic ships a recipe to dial it back down. You wrap an instruction in `<avoid_excessive_markdown_and_bullet_points>`, and the docs note that "removing markdown from your prompt can reduce the volume of markdown in the output." You fight to turn Markdown off.

_When the people who built the model document how to suppress its default output, you have found the default._

## Is your Markdown vault already a knowledge graph?

Yes. The notes are nodes and the `[[links]]` are edges. Open any linked Markdown vault and you are looking at a graph. You have been keeping a knowledge graph without calling it one.

This is not an AI invention. It is the 70-year-old Zettelkasten idea: atomic notes, connected by explicit links, where the connections carry the value. The split is clean: folders answer "where is this?"; links answer "what does this have to do with what?"

That second question is the one an LLM cares about. A folder tells a model where a file sits. A link tells it what that file relates to. Folders are storage. Links are structure.

Most of us already wrote the structure. We just never saw it.

_A folder is an address. A link is a relationship. Only one of them survives contact with an LLM._

## Does a personal vault really line up with Google's knowledge layer?

Same shape. Not the same resolution. Here is the honest split.

Google rebuilt search in 2012 around one idea: "things, not strings." Entities, and the relationships between them. Your notes are the things. Your `[[links]]` are the relationships. The web's open knowledge layer runs on the same primitive: schema.org, whose root type is literally `Thing`. Wikidata, the world's largest open-access knowledge graph, with over 120 million items. Google's own open Data Commons, nodes joined by directed edges.

Nodes joined by edges, all the way down. That is the shape your vault already has.

![A two-column diagram: on the left, notes and links labelled node and edge; on the right, entities and typed relationships labelled Thing and bornIn, showing the same skeleton at different resolutions](/blog/your-notes-are-already-a-graph/images/fig2-same-skeleton.png)
_Same skeleton, different resolution. A real knowledge graph types its edges. An Obsidian link does not, yet._

Now the honest half. Same shape is not the same resolution. A real knowledge graph types its edges: this node is a `Person`, that edge means `bornIn`. Obsidian links are untyped: every edge just says "related." A galaxy shows you the structure. It does not add the types.

_Your vault has the skeleton of the web's knowledge layer. It does not yet have the labels on the bones._

## Google just shipped Markdown, links, and a graph view

Here is where the alignment stops being a metaphor.

On June 12, 2026, Google Cloud published the Open Knowledge Format. It is vendor-neutral, tied to no cloud, model, or framework. And per the spec, "concepts link to each other with normal markdown links, turning the directory into a graph of relationships." A spec from Google now describes the exact directory I have been editing by hand for years.

![Two screenshots side by side: an OKF bundle as a directory of markdown files and its single-file HTML graph view, next to an Obsidian vault folder and its graph view, looking nearly identical](/blog/your-notes-are-already-a-graph/images/fig3-okf-vs-vault.png)
_Left: Google's OKF bundle and its self-contained graph view. Right: an Obsidian vault and its graph. The convergence is structural, not cosmetic._

I did not borrow this format from Google. A directory of Markdown files with links is the obvious place to land: it is the lowest-common-denominator knowledge format that a human can read, an LLM can parse, and a graph can draw.

> When the spec and the second brain converge on the same directory layout, the layout stops being a preference and starts being a standard.

## Is a 3D graph view actually useful, or just eye-candy?

You do not need a plugin to see that your vault is a graph. Obsidian has shipped a graph view in the box for years. Open it and your notes are dots, your `[[links]]` are the lines between them. The structure was always there to look at.

The catch is that the built-in view is flat. A 2D web of dots on a plane. It tells you the connections exist. It is harder to feel their depth, their clusters, the actual scale of what you have built.

So I built a plugin called [Agentage Galaxy](obsidian://show-plugin?id=agentage-galaxy) that renders the same vault as a rotating 3D force-graph. Notes are nodes. `[[links]]` are edges. Top-level folders become colored clusters. Node size tracks the number of connections, so your hubs are the biggest stars. It is built on three.js and 3d-force-graph, and it mirrors the built-in graph, so there is nothing new to learn.

The ownership receipts are simple. It is [MIT-licensed and open source on GitHub](https://github.com/agentage/obsidian-galaxy), and it makes zero network calls. Nothing uploads. It is live in the official Obsidian community directory, desktop-only, and installs in one click. Big vaults run heavier, since this is WebGL on the desktop.

Be clear about what the view is. It is a diagnostic, not a brain. The graph does not retrieve anything or answer a question. What it gives you is the felt shape of your own thinking: the dense cluster you did not know was dense, the orphan note with no edges, the bridge node tying two topics together. That is real, and it is not the same as a model querying your knowledge.

_A graph view is not a query engine. It is a mirror. Do not confuse seeing the shape of your knowledge with searching it._

## What you can do with this in five minutes

Open your vault and turn on the graph. Look for the orphans with no edges and the hubs with too many. That alone will tell you more about your knowledge than any tag system.

Then notice what you are looking at: a directory of Markdown files, joined by links, readable by you and by every model you talk to. Google shipped a spec for it. The labs write their agent configs in it. You have probably been living in it for years.

A graph view is not insight. It is the moment you can finally see that your notes were a graph all along.

---

To see your own vault as a galaxy, [Agentage Galaxy](obsidian://show-plugin?id=agentage-galaxy) is one click in Obsidian: free, open source, and fully local.
