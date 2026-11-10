---
title: Context engineering for AI agents
slug: context-engineering
description: Your agent got worse the longer it worked? It's usually the context, not the model. How to choose what goes into the window on every step.
date: 2026-10-30
series: ai-explained
youtube: SsNsQiU9Tf8
facebook: https://facebook.com/1352235447979055/videos/1401507192059524
tags: context engineering, ai agents, context window, prompt engineering, compaction
---
Your AI agent did great for the first ten minutes, then got sloppy. It forgot instructions, repeated work and picked the wrong tools. Usually the problem isn't the model. It's the **context**.

## What context engineering is

Context engineering is choosing what goes into the model's context window, on every single step. Anthropic calls it "the natural progression of prompt engineering": prompt engineering is writing good instructions; context engineering manages everything else the model sees: tools, files, history and tool results.

## More context isn't better

As the window fills up, models get worse at recalling what's in it, an effect called context rot. Anthropic describes an **attention budget**: "every new token introduced depletes this budget by some amount."

So the goal is "the smallest possible set of high-signal tokens" that still gets the job done.

## The building blocks

**System prompt.** Not a giant rulebook, and not vague either. Clear and simple, at what Anthropic calls "the right altitude".

**Tools.** A small set with minimal overlap, so the agent never has to guess which one to use.

**Examples.** Skip the long list of edge cases. Pick a few diverse, canonical ones.

**Data, just in time.** Don't load everything up front. Keep lightweight pointers, like file paths, stored queries or links, and fetch the details only when the agent needs them. That's how a coding agent can work in a huge repo: it searches and opens files as it goes.

## Three fixes for long tasks

Even with care, a long task fills the window. Three techniques help:

1. **Compaction.** Summarize the conversation so far, then continue in a fresh window with the summary.
2. **Structured notes.** The agent writes its progress to a file outside the window (a to-do list, decisions, open questions) and reads it back later.
3. **Sub-agents.** Hand a focused job to a sub-agent with a clean context window. It explores as much as it needs and returns only a short summary.

Coding agents like Claude Code use tricks like these to stay on track over long sessions.

## A quick checklist

- Is every token in the prompt earning its place?
- Do any two tools do the same job?
- Can a big file be a pointer instead?
- Is there a plan for when the window fills up?

> Don't stuff the context. Curate it.

## Sources

- [Anthropic Applied AI team, Effective context engineering for AI agents (2025-09-29)](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
