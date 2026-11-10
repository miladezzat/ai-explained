---
title: Context window: the model's working memory
slug: context-window
description: Why does a long AI chat forget the beginning? Meet the context window: everything a model can see at once, measured in tokens, and why bigger isn't always better.
date: 2026-10-28
series: ai-explained
youtube: HZ87QIRYfzU
facebook: https://facebook.com/reel/1730084214759219
instagram: https://www.instagram.com/reel/DfDGvhZT19a/
tags: context window, tokens, llm, context rot, compaction
---
Why does a long AI chat seem to forget how it started? Because every model has a limit on how much it can see at once. That limit is the **context window**.

## The model's working memory

Anthropic describes the context window as "all the text a language model can reference when generating a response, including the response itself", a working memory for the model. It's measured in tokens, the chunks of text models read.

The model has no other memory of your conversation. Each time it answers, it re-reads whatever is in the window. If something isn't in there, the model doesn't know it.

## Everything shares the same space

A lot more goes into the window than your latest message:

- the system prompt and instructions,
- the whole chat history so far,
- files and documents you attached,
- tool definitions and tool results,
- and the reply the model is writing right now.

All of it competes for the same budget. A big PDF or a long tool result can use up much of the space by itself.

## When it fills up

Something has to give. Apps usually do one of two things:

1. **Cut** the oldest messages, which is why early details vanish.
2. **Summarize** them. Anthropic calls this compaction: it "replaces the older turns of a conversation with a summary" so a long session can keep going.

## Bigger isn't always better

Windows have grown fast, and many current models take around a million tokens. But more context isn't automatically better. As the window fills, accuracy and recall can drop, a problem often called **context rot**. Important details get lost in the middle of a huge prompt.

## How to use it well

- Put only what the task needs in the prompt.
- Start a fresh chat when you change topics.
- Summarize long threads before continuing.
- Put the most important instructions where they're easy to find, near the start or the end.

> Keep it lean, keep it sharp.

## Sources

- [Anthropic, Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows)
- [Anthropic, Compaction](https://platform.claude.com/docs/en/build-with-claude/compaction)
