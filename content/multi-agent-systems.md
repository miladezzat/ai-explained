---
title: Multi-agent systems
slug: multi-agent-systems
description: When one AI agent gets overloaded, give it a team. How a lead agent splits work across specialist subagents, and what it costs in tokens.
date: 2026-10-27
series: ai-explained
youtube: BF_S8PfJhrY
facebook: https://facebook.com/reel/1127482900041853
instagram: https://www.instagram.com/reel/DfA4Ivjh4b2/
tags: multi-agent systems, ai agents, subagents, orchestration, context window
---
Give one AI agent a big job, like researching a market, and it slowly gets overloaded. Its context window fills with search results, half-read pages and notes, and the quality of its thinking drops. The fix many teams use: give it a team.

## What a multi-agent system is

A multi-agent system is several AI agents working on one task, each with its own role, its own tools and its own context. The most common shape is **orchestrator and workers**:

1. A **lead agent** reads the task and makes a plan.
2. It splits the work into parts and hands each part to a **subagent**, a specialist with a narrow job.
3. The subagents work **in parallel**, each in a clean context window.
4. Each one reports back a short summary, and the lead combines them into one answer.

## Why it works

Each subagent only sees what its part needs. It doesn't carry the noise from every other part of the job, so it stays focused. And because they run at the same time, wide tasks finish faster.

Anthropic described this setup for its research feature: a lead agent "coordinates the process while delegating to specialized subagents that operate in parallel". In their internal research eval, a team with a Claude Opus 4 lead and Sonnet 4 subagents beat a single Opus 4 agent by **90.2%**.

## The catch: tokens

Teams are expensive. In the same write-up, Anthropic reported that multi-agent systems use about **15 times more tokens** than a normal chat. Every subagent reads, searches and thinks on its own.

So it's worth it when:

- the task is broad and splits into independent parts (research, comparing many options, reviewing a large codebase),
- the result is valuable enough to justify the cost,
- and the parts don't need to constantly talk to each other.

It's a poor fit for small tasks, or tightly connected work where every step depends on the last.

## Tips if you build one

- Give each subagent a clear goal, the output format you want back, and limits on how much to search.
- Ask for summaries, not raw dumps, so the lead's context stays clean.
- Start with one agent. Add a team only when you can measure that it helps.

> One job each. One answer.

## Sources

- [Anthropic Engineering, How we built our multi-agent research system (2025-06-13)](https://www.anthropic.com/engineering/multi-agent-research-system)
