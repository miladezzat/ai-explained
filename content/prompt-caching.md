---
title: Prompt caching: pay less for repeated prompts
slug: prompt-caching
description: Your agent resends the same long prompt every turn, and you pay for it every time. Prompt caching reuses the identical start of the prompt at a fraction of the price.
date: 2026-11-04
series: ai-explained
youtube: N3VByhirabA
facebook: https://facebook.com/reel/39549267934716987
instagram: https://www.instagram.com/p/DfVGZEcku00/
tags: prompt caching, llm cost, claude api, tokens, ai agents
---
Your agent sends the same 20-page prompt on every turn: instructions, tool list, documents, chat history. Most of each request matches the one before it, and you pay for every token, every time. **Prompt caching** fixes that.

## What it does

Prompt caching saves the repeated **start** of a prompt (the prefix), so the next request reuses it instead of processing it again.

## How it works on Claude

Claude reads the prompt in a fixed order: **tools, then system, then messages**. The cache covers everything up to a breakpoint you mark with `cache_control`, or you can set it once at the top of the request and let Claude pick the spot.

A cache hit needs the cached part to be **100% identical**. Change one word early in the prompt, and everything after it misses.

## The prices

| | Cost vs normal input |
|---|---|
| Cache read | 0.1× |
| Cache write (5-minute) | 1.25× |
| Cache write (1-hour) | 2× |

So if you send a long prompt just twice, you already pay less than without caching.

The default cache lives for 5 minutes, and every hit resets the clock for free. Need longer gaps between requests? The 1-hour cache costs more to write.

Short prompts aren't cached at all: Claude needs a minimum of 512 to 4,096 tokens, depending on the model.

## Other providers

OpenAI caches long prompts automatically, starting at 1,024 tokens on its newer models. The idea is the same: identical prefixes get cheaper.

## It's faster too

The cached part isn't processed again, so the first token of the answer arrives sooner.

## Design your prompt for the cache

Put what never changes **first**, and what changes **last**:

1. Tools and instructions at the top.
2. Long documents next.
3. The chat history.
4. The new question at the bottom.

And watch for cache breakers: a timestamp at the top of the system prompt, shuffled tool order, or editing tool definitions (which invalidates the whole cache).

## One limit

Caching only cuts **input** cost. Output tokens cost the same as before.

It matters most for agents and long chats, where every turn resends the whole history.

> Same prefix, cheaper call.

## Sources

- [Claude docs, Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)
- [OpenAI, Prompt caching guide](https://developers.openai.com/api/docs/guides/prompt-caching)
