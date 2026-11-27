---
title: Subagents for context management: delegate the digging, keep the summary
slug: subagents-context
description: Subagents run in their own context window, explore with tens of thousands of tokens, and hand back a short summary, so the main agent's context stays clean. When they help and when they don't.
date: 2026-11-27
series: ai-explained
youtube: 2aGk9yivq3A
facebook: https://facebook.com/reel/29528345726798936
instagram: https://www.instagram.com/p/DgPqouZlj9-/
tags: ai agents, context engineering, subagents, claude code, llm
---
Your agent read fifty files to answer one question. **Now all of them sit in its context.** Every later step pays for that clutter, and the answer it was looking for is buried in the middle.

## Why a full context hurts

Anthropic's context engineering guide explains that as the context grows, "the model's ability to accurately recall information from that context decreases." It describes LLMs as having an "attention budget" that they draw on when parsing large volumes of context. More tokens is not free memory. It is more for the model to sift through.

## What a subagent is

Anthropic's subagents guide puts it simply: "A subagent is an isolated Claude instance with its own context window." The Claude Code docs add that each one runs "with a custom system prompt, specific tool access, and independent permissions."

The main agent hands it one task. The subagent does the messy part, the searching and reading, in its own context. As the docs say, "the subagent does that work in its own context and returns only the summary."

The numbers from Anthropic's engineering post show why that matters: "Each subagent might explore extensively, using tens of thousands of tokens or more," but it "returns only a condensed, distilled summary of its work (often 1,000-2,000 tokens)." The docs frame the goal as: "Preserve context by keeping exploration and implementation out of your main conversation."

## Prompts, tools and parallel work

Each subagent gets its own instructions. Per the docs, "Subagents receive only this system prompt plus basic environment details like the working directory." You can also narrow what it may do: "To restrict tools, use the `tools` field as an allowlist or the `disallowedTools` field as a denylist." A reviewer subagent, for example, can be allowed to search and read but not edit.

Subagents can also fan out. "Multiple subagents can run in parallel, and each can have different permissions." They "report back to the main conversation but can't talk to one another."

## What it costs

Subagents are not free. The guide is direct: "Each one spins up its own context, consumes tokens, and adds a layer of indirection." And because a subagent starts with only its own prompt and basic details, the brief you give it has to carry everything it needs.

The same guide also says when to skip them: "For a quick fix or a focused question, the overhead of delegation outweighs the benefit." Anthropic's context engineering post says multi-agent setups pay off in "complex research and analysis where parallel exploration pays dividends."

## Using subagents in your own agent

General practice: give each subagent one job, a short self-contained brief and a clear return format. Ask for a summary with the facts and file paths you need, not a transcript of everything it read. Keep quick lookups in the main agent, and send broad searches and research to subagents.

> Delegate the digging. Keep the summary.

## Sources

- [Claude Code docs: Subagents](https://code.claude.com/docs/en/subagents)
- [Anthropic: Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Claude blog: How and when to use subagents in Claude Code](https://claude.com/blog/how-and-when-to-use-subagents-in-claude-code)
