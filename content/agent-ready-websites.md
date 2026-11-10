---
title: Agent-ready websites with llms.txt
slug: agent-ready-websites
description: Can AI agents actually understand your website? llms.txt is one markdown file that tells them what's worth reading. Here's the format and how to add it.
date: 2026-10-30
series: ai-explained
youtube: yiHeKwezHjY
facebook: https://facebook.com/reel/2159391927979940
instagram: https://www.instagram.com/reel/DfHjAqVN7Pa/
tags: llms.txt, ai agents, seo, markdown, documentation
---
AI agents and assistants read websites all the time now, to answer questions, write code against your API, or compare products. But most sites are built for human eyes, not for models. **llms.txt** is a simple proposal to fix that.

## The problem

The llms.txt proposal puts it plainly: "An HTML page wraps its information in navigation, ads, and JavaScript, and converting it back into clean text is difficult and imprecise." And even clean text has a limit: context windows "are still too small for most websites in their entirety."

So an agent visiting your docs wastes tokens on menus and scripts, and may never find the page that matters.

## The fix: one markdown file

`llms.txt` is a markdown file at the root of your site, like `example.com/llms.txt`. It gives agents a short, curated map:

```markdown
# Acme API

> Acme lets you send invoices and get paid by card or bank transfer.

## Docs
- [Quickstart](https://acme.dev/quickstart.md): first invoice in 5 minutes
- [Authentication](https://acme.dev/auth.md): API keys and scopes

## Optional
- [Changelog](https://acme.dev/changelog.md)
```

The format is light:

- an **H1** with the site or project name (the only required part),
- a **blockquote** with a short summary,
- **H2 sections** with lists of links and a note on each,
- an optional **"Optional"** section for things an agent can skip when short on space.

## Clean copies of pages

The proposal also suggests offering a markdown version of each page at the same URL with `.md` added, so `/docs/auth` has `/docs/auth.md`. Agents get the content without the layout.

## robots.txt vs llms.txt

They do different jobs and work together:

- **robots.txt** says *where* bots are allowed to go.
- **llms.txt** says *what's worth reading* once they're there.

The proposal describes it as complementing robots.txt "by providing context for allowed content."

## Who uses it

It's a proposal (from Jeremy Howard of Answer.AI, 2024), not an official standard, but it's spread fast across developer docs. Anthropic's developer docs, for example, publish one at `platform.claude.com/llms.txt`. This site has one too.

> Make your site agent-ready.

## Sources

- [llmstxt.org, The /llms.txt file (Jeremy Howard, Answer.AI; published 2024-09-03, v2)](https://llmstxt.org/)
- [Example in use](https://platform.claude.com/llms.txt)
