---
title: AX: agent experience
slug: ax
description: We design for user experience and developer experience. AX, agent experience, is designing products that AI agents can use well. Here's what that means in practice.
date: 2026-10-25
series: ai-explained
youtube: fMRjdBqgZkM
facebook: https://facebook.com/reel/1897148871247734
tags: agent experience, ax, ai agents, api design, developer experience
---
For years we've designed products around UX (user experience) and DX (developer experience). Now there's a third user: the AI agent. **AX**, agent experience, is about making your product easy and safe for agents to use on someone's behalf.

## Where the term comes from

Mathias Biilmann, co-founder and CEO of Netlify, popularized the term in early 2025. His point: agents are already signing up, reading docs, calling APIs and deploying code for people. Products that are hard for agents to use will lose out to products that are easy for them.

## What good AX looks like

**Docs agents can read.** Clean Markdown versions of your docs, an `llms.txt` file, and examples that are complete enough to copy. Agents don't click through menus well.

**APIs and tools, not just screens.** Everything a person can do in your dashboard should be possible through an API, a CLI or an MCP server. An agent shouldn't have to scrape your UI.

**Clear, predictable errors.** An error like `missing field "email"` lets an agent fix itself. `Something went wrong` leaves it stuck.

**Access built for delegation.** Let a person grant an agent scoped, revocable access, with OAuth and fine-grained permissions, instead of sharing their password.

**Safe defaults.** Dry runs, confirmations for destructive actions, and limits, so an agent's mistake stays small.

## Why it matters now

When someone asks an AI assistant to "deploy my site" or "book the cheapest flight", the agent picks the service that works. If it can find the docs, authenticate cleanly and recover from errors, your product gets chosen. If not, the agent moves on, and the user may never know you were an option.

## A quick AX check

- Can an agent find out what your product does from one page?
- Can it sign up and get credentials without a human solving puzzles?
- Can it do the main task through an API or MCP?
- Does every error say what to do next?

> Design for the agent, and the human wins too.

## Sources

- [Mathias Biilmann, Introducing AX: Why Agent Experience Matters (2025)](https://biilmann.blog/articles/introducing-ax/)
- [llmstxt.org, the /llms.txt file](https://llmstxt.org/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
