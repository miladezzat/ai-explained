---
title: Context compaction: how long-running agents keep going
slug: context-compaction
description: Context compaction summarizes an agent's conversation as it nears the context limit and continues from the summary. How Claude's API and OpenAI do it, what to keep, and the lighter alternative.
date: 2026-11-28
series: ai-explained
youtube: -jNPmrJBSkY
facebook: https://facebook.com/reel/29563108700040026
instagram: https://www.instagram.com/p/DgRzvuVGmcL/
tags: ai agents, context engineering, compaction, llm, claude api
---
Your agent has been working for hours. **Its context window is almost full.** It can stop, or it can compact.

## What compaction is

Anthropic's context engineering guide defines it plainly: "Compaction is the practice of taking a conversation nearing the context window limit, summarizing its contents," and continuing with that summary instead of the full history. The same post calls compaction "the first lever in context engineering to drive better long-term coherence."

## Compaction in Claude's API

Claude's docs describe server-side compaction as a feature that "replaces the older turns of a conversation with a summary that Claude writes on the server, so you need no summarization code of your own."

You opt in with a `context_management` edit. By default, "compaction starts at 150,000 input tokens," and the trigger "`value` must be at least 50,000 tokens." When it fires, the response starts with a `compaction` block holding the summary. On the next request, "The API automatically drops all content blocks prior to the `compaction` block," so the conversation continues from the summary.

You can steer the summary with your own `instructions`, but note the docs: "Custom instructions don't supplement the default prompt. They replace it completely." The feature is in beta, and the docs warn that compaction might fail when tools are defined.

## Compaction in OpenAI's API

OpenAI's Responses API also compacts. You enable it by "setting `context_management` with `compact_threshold`," and "When the rendered token count crosses the configured threshold, the server runs server-side compaction." The result is different in one way: the compaction item is encrypted. "It is opaque and not intended to be human-interpretable," but it "carries forward key prior state and reasoning into the next run using fewer tokens."

## What a good summary keeps

Anthropic describes how Claude Code does it: "The model preserves architectural decisions, unresolved bugs, and implementation details" while "discarding redundant tool outputs or messages." The agent then continues "with this compressed context plus the five most recently accessed files."

That choice is the hard part. "The art of compaction lies in the selection of what to keep versus what to discard," and "overly aggressive compaction can result in the loss of subtle but critical context." The advice: "Start by maximizing recall to ensure your compaction prompt captures every relevant piece of information," then tighten for precision.

## The lighter option

"One of the safest lightest touch forms of compaction is tool result clearing." Claude's context editing feature does this on the server: when the context passes a threshold, old tool results are cleared, and "The API replaces each cleared result with placeholder text indicating to Claude that it was removed." Even so, Claude's docs note that "For most use cases, server-side compaction is the primary strategy for managing context in long-running conversations."

## Using compaction in your own agent

General practice: compact before you hit the wall, not at the last token. Write down what the summary must keep for your task, such as open decisions, failing tests and file paths, and test a few compacted runs to check the agent still knows what matters.

> Keep what matters. Drop the rest.

## Sources

- [Anthropic: Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Claude docs: Compaction](https://platform.claude.com/docs/en/build-with-claude/compaction)
- [Claude docs: Compaction threshold](https://platform.claude.com/docs/en/build-with-claude/compaction-threshold)
- [Claude docs: Context editing](https://platform.claude.com/docs/en/build-with-claude/context-editing)
- [OpenAI docs: Compaction](https://developers.openai.com/api/docs/guides/compaction)
