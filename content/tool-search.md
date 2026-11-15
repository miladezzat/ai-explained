---
title: Tool search for large tool sets: give agents thousands of tools
slug: tool-search
description: Why loading every tool definition hurts agents, and how tool search with defer_loading lets a model discover only the tools a task needs.
date: 2026-11-15
series: ai-explained
youtube: HQpvz5r4scU
facebook: https://facebook.com/reel/41008098982114151
instagram: https://www.instagram.com/p/Dfwx4iWFywk/
tags: tool search, ai agents, mcp, tool use, context window
---
Give your agent five MCP servers, and its context is full before it starts. **Tool search** fixes that.

## The problem: every definition costs context

When you give a model tools, every tool definition goes into the context window: its name, its description and its input schema. That adds up fast. Anthropic's example is a typical setup with five servers (GitHub, Slack, Sentry, Grafana and Splunk): 58 tools and about 55K tokens of definitions before the conversation even starts.

It's not just tokens. According to Claude's docs, the model's ability to pick the right tool degrades once you go past 30 to 50 available tools.

## The idea: discover tools on demand

Tool search flips the approach. Instead of loading every definition up front, the agent searches a catalog and loads only what the task needs.

1. Mark tools with **`defer_loading: true`**. They're still sent with the request, but they're kept out of the model's context.
2. Add one **tool search tool**. It's the model's way into the deferred catalog.
3. The model searches. The API returns matching **`tool_reference`** blocks (up to five by default) and automatically expands them into full tool definitions.

There are two variants: **regex**, where the model writes Python-style regex patterns, and **BM25**, where it searches in natural language. A single request can hold up to 10,000 deferred tools.

## What it buys you

- **Context.** Claude's docs say tool search typically cuts the definition load by over 85 percent, loading only the three to five tools a request needs.
- **Accuracy.** In Anthropic's MCP evaluations, Opus 4 went from 49% to 74% with tool search, and Opus 4.5 from 79.5% to 88.1%.
- **Caching.** Deferred tools are excluded from the initial prompt, so prompt caching keeps working.

## How to use it well

- **Keep your favorites loaded.** Leave your three to five most used tools non-deferred, so the model can call them without a search first.
- **MCP servers.** You don't mark each tool. Set `defer_loading` once in the MCP toolset's `default_config` for the whole server, or per tool in its `configs`.
- **Know when it's worth it.** The docs suggest it once you have ten or more tools, or your tool definitions take more than 10K tokens.
- Don't set `defer_loading` on the tool search tool itself.

> Don't load every tool. Let the agent find the one it needs.

## Sources

- [Claude docs: Tool search tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool)
- [Anthropic engineering: Introducing advanced tool use](https://www.anthropic.com/engineering/advanced-tool-use)
