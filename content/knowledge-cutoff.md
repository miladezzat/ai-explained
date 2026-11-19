---
title: Knowledge cutoff: why AI models don't know what happened yesterday
slug: knowledge-cutoff
description: What an LLM's knowledge cutoff is, why the real cutoff often differs from the reported one, and how developers give a model the present.
date: 2026-11-19
series: ai-explained
youtube: BPj6_K4fabc
facebook: https://facebook.com/reel/977052261752269
instagram: https://www.instagram.com/p/Df6pMhfF2Ul/
tags: llm, knowledge cutoff, training data, rag, ai engineering
---
Ask a model about yesterday's news, and it may confidently be wrong. That's the **knowledge cutoff**.

## What it is

A knowledge cutoff is the date after which a model learned nothing new. What it knows is a frozen snapshot of its training data. Unless the app hands it fresh material, through retrieval or a tool call, the model answers from that snapshot.

The cutoff always comes first and the release comes later, often several months to a year later. So on launch day the model is already out of date, and the gap grows every day you use it.

Past its cutoff, a model doesn't go quiet. It gives the most plausible answer it can, which is how you get confident, stale answers. Even its own cutoff is hard for it to know: asked directly, models often guess too early.

## The reported date isn't the whole story

In 2024, researchers at Johns Hopkins University measured how up to date models really are. They found that "effective cutoffs often drastically differ from reported cutoffs." They estimated a separate cutoff for each source, such as Wikipedia or the New York Times, by checking which dated version of that source the model fits best.

They point to two reasons:

- **Old pages in new crawls.** New web crawl dumps contain "non-trivial amounts of old data," so new data isn't as fresh as its date suggests.
- **Deduplication.** Deduplication schemes struggle with semantic duplicates and near-duplicate text, which skews which versions of a page the model sees.

So a model's knowledge isn't one clean date. Different sources can stop at different times.

That's why model docs often word it carefully. Anthropic's model report, for example, states the date up to which a model's knowledge is "most extensive and reliable", rather than promising it knows everything before that date.

## What developers can do

The cutoff bites hardest on fast-moving facts: new library versions, prices, and APIs. Some practical habits (general practice, not findings from the study above):

1. **Give it the date.** Put today's date in the system prompt. Otherwise the model may assume no time has passed since its cutoff.
2. **Supply the facts.** Don't trust recall for anything recent. Use retrieval, search, or a tool call to put current information in the context.
3. **Pass in current docs.** For code, include the docs for the library version you actually use, so the model doesn't write calls from an older release.

> A model knows the past. Give it the present.

## Sources

- [Cheng et al., Dated Data: Tracing Knowledge Cutoffs in Large Language Models](https://arxiv.org/abs/2403.12958)
- [Taskade, Knowledge cutoff](https://www.taskade.com/wiki/ai/knowledge-cutoff)
- [Anthropic Transparency Hub, Model Report](https://www.anthropic.com/transparency)
