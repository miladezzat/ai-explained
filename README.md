# AI Explained · ai.miladezzat.com

Written explainers for every AI Explained video by Milad Fahmy: one page per topic, with the YouTube Short embedded.

- `content/<slug>.md`: one article per topic (front matter + markdown). The URL is `https://ai.miladezzat.com/<slug>/`.
- `build.mjs`: builds `dist/` (pages, MCP series page, sitemap, RSS, llms.txt). `node build.mjs check` validates every article.
- `assets/`: CSS, JS, favicon. `site.json`: title, links, series.
- `.github/workflows/pages.yml`: every push to `main` builds and deploys to GitHub Pages.

## Article format

```markdown
---
title: Semantic caching: same meaning, same answer
slug: semantic-caching
description: One or two sentences, under 200 characters (used for search and link previews).
date: 2026-11-10
series: ai-explained          # or mcp-a-to-z
episode: 7                    # MCP episodes only
youtube: DV1BnNehAjM          # 11-character video id
facebook: https://facebook.com/reel/...
instagram: https://www.instagram.com/p/...
tags: semantic caching, llm cost, embeddings
---
Intro paragraph, then `## Sections`, a closing `> quote`, and a `## Sources` list with links.
```

At least 250 words, and every fact backed by a source in `## Sources`.

## Local preview

```bash
npm ci
npm run serve   # http://localhost:4321
```
