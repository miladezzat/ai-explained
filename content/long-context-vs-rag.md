---
title: Long context vs RAG: paste it all, or retrieve it?
slug: long-context-vs-rag
description: Million-token context windows can hold thousands of pages. When to paste everything into the prompt, when to retrieve only what matches, and how to combine both.
date: 2026-11-12
series: ai-explained
youtube: rHYaag8ui1s
facebook: https://facebook.com/reel/2001395767219514
instagram: https://www.instagram.com/p/DforYgHF_2A/
tags: long context, rag, context window, retrieval, llm
---
Models can now read a million tokens at once. Gemini and the newest Claude models take a million tokens or more, thousands of pages in a single prompt. So do you still need RAG?

## The two options

- **Long context:** paste every document into the prompt and let the model find what matters.
- **RAG (retrieval augmented generation):** search your documents first, and send only the few chunks that match.

## Which answers better?

A large study by Li et al. found that **long context wins on average** when the model is strong enough. But there are catches.

**Models don't read evenly.** In the *Lost in the Middle* study, facts at the **start or end** of the input were used best, and facts in the **middle** got missed.

**Context rot.** Chroma tested this on many models and found results get **less reliable as the input grows**, even on simple tasks.

**Needles in a haystack.** Google says Gemini finds one hidden fact about **99%** of the time, but accuracy drops when there are many facts to find.

## What it costs

You pay for **every input token, on every request**. A million-token prompt is billed in full every time you send it. RAG sends a few thousand tokens instead, so it stays much cheaper.

**Prompt caching** narrows the gap. Anthropic says caching can cut latency by **more than 2x** and costs by **up to 90%** for a repeated prompt.

Anthropic's rule of thumb: if your knowledge base is **under about 200,000 tokens** (around 500 pages), just put the whole thing in the prompt.

## Combine them: Self-Route

You don't have to pick one. **Self-Route** (from the same Li et al. study) tries RAG first. If the model says it can't answer from the retrieved chunks, it switches to long context. That **cut compute cost a lot** while keeping quality **close to long context**.

## When to use which

| Use long context for | Use RAG for |
|---|---|
| One big contract | A whole company wiki |
| A single codebase | Huge document collections |
| A book | Data that changes all the time |

Either way, put the **key facts near the start or the end** of the prompt, and test with your real questions.

> Small and stable? Paste it. Big and changing? Retrieve it.

## Sources

- [Liu et al., Lost in the Middle](https://arxiv.org/abs/2307.03172)
- [Li et al., Retrieval Augmented Generation or Long-Context LLMs?](https://arxiv.org/abs/2407.16833)
- [Chroma, Context Rot](https://www.trychroma.com/research/context-rot)
- [Anthropic, Introducing Contextual Retrieval](https://www.anthropic.com/news/contextual-retrieval)
- [Google, Gemini long context](https://ai.google.dev/gemini-api/docs/long-context)
- [Anthropic, Claude models overview](https://platform.claude.com/docs/en/about-claude/models/overview)
