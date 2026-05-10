---
title: 'Hello, blog'
subtitle: 'A placeholder post that confirms the /blog route is wired end to end.'
description: 'A placeholder post that confirms the /blog route is wired end to end.'
date: 2026-05-10
tags:
  - meta
---

This is a placeholder post.

## What this proves

If you can read this on `/blog/hello-world`, then:

- Markdown source loads from `src/content/blog/<slug>/article.md`.
- YAML frontmatter parses (`title`, `subtitle`, `date`).
- The page renders in the site shell, light + dark.
- Code blocks pass through the highlighter:

```ts
function greet(name: string): string {
  return `hello, ${name}`;
}
```

> **Real posts come next.** This file gets removed in PR #2.

## What's next

- PR #2 imports the first real post and lands the featured-post card on the home page.
