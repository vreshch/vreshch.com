## What

New field-report post: `/blog/one-memory-every-ai` - "I Shipped One Memory for Every AI. The Endpoint Was the Easy Part." (dated 2026-06-10).

- `src/content/blog/one-memory-every-ai/article.md` - four lessons from shipping memory.agentage.io/mcp (auth-server-was-the-project, stateless trade-offs, eval-driven tool design, adversarial verification)
- `public/blog/one-memory-every-ai/images/cover.png` - 1200x630 editorial diagram in the house style (light, navy, italic takeaway)

Continues the catalog post's arc (discovery layer → memory layer) and links the agentage launch post.

## Notes for review

- **Link ordering:** the post links https://agentage.io/blog/mcp-endpoint-is-live which is live on dev but **404 on the prod apex until the next agentage prod promote** - merge this after promoting agentage prod (or accept a briefly-dead link).
- Lesson 4 admits two (fixed, prod-re-verified) findings: the CORS reflect-any-origin and the wrong-aud 500. Both verified fixed before disclosure; the unconfirmed rate-limit/introspection finding was deliberately left out.
- No em dashes, no providers, no pricing, no unreleased features. Escaped `\_\_` in bold tool names (prettier).

## How verified

- `npm run verify` green (type-check + lint + build + 23 tests - tests are additive-safe, checked).
- Built site served locally: post renders (shiki + anchors), `/blog` lists it first, sitemap includes the slug.

## Proofs

![post](https://github.com/vreshch/vreshch.com/raw/_proofs-blog-mcp/vreshch-post-top.png)

![index](https://github.com/vreshch/vreshch.com/raw/_proofs-blog-mcp/vreshch-blog-index.png)
