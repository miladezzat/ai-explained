---
title: Vibe coding vs agentic engineering
slug: vibe-coding-vs-agentic-engineering
description: Two developers ship the same app with AI. One can explain every line, the other can't. The difference between vibe coding and agentic engineering, and when to use each.
date: 2026-11-06
series: ai-explained
youtube: zlsONiTtJ10
facebook: https://facebook.com/reel/1675783277539884
instagram: https://www.instagram.com/p/DfZmsaJDjuz/
tags: vibe coding, agentic engineering, ai coding, coding agents, software engineering
---
Two developers ship the same app with AI. One can explain every line. The other can't. That's the difference between **vibe coding** and **agentic engineering**.

## Vibe coding

In February 2025, Andrej Karpathy named it: "fully give in to the vibes, embrace exponentials, and forget that the code even exists." Accept every change, skip reading the diffs, and paste errors back in until it works.

He also said it's "not too bad for throwaway weekend projects", and for quick prototypes it's genuinely fun. The term spread so fast that Collins Dictionary made it its word of the year for 2025.

## The trouble with production

Problems start when vibe-coded software reaches real users. Nobody knows how it works, or why it breaks. Every fix is another roll of the dice.

Simon Willison draws the line clearly: if an LLM wrote the code and you then "reviewed it, tested it thoroughly and made sure you could explain how it works to someone else", that's not vibe coding. That's software development.

## Agentic engineering

A year later, Karpathy picked a name for the serious version: **agentic engineering**.

- **Agentic**, because you orchestrate agents that write the code, and you act as the oversight.
- **Engineering**, because there's art, science and expertise to it.

The skill moves from typing code to directing it.

## What it looks like in practice

1. **Start before the first prompt.** A clear spec, the constraints, and what "done" looks like.
2. **Tests the agent has to pass**, so machines check that it works, not vibes.
3. **Review each diff** like a teammate's pull request.
4. **Own what merges.** The agent did the typing; you're responsible for the result.

## Speed today vs change tomorrow

Vibe coding optimizes for speed **today**. Agentic engineering optimizes for code you can still change **next month**.

## Use both

Vibe code to explore an idea. Then engineer it before real users touch it.

## A simple rule

If you couldn't explain a change to a teammate, don't merge it yet.

> Vibes to explore. Engineering to ship.

## Sources

- [Simon Willison, Not all AI-assisted programming is vibe coding (2025-03-19), quoting Karpathy's February…](https://simonwillison.net/2025/Mar/19/vibe-coding/)
- [Wikipedia, Vibe coding](https://en.wikipedia.org/wiki/Vibe_coding)
- [Turing College, Agentic engineering vs vibe coding, quoting Karpathy (February 2026)](https://www.turingcollege.com/blog/agentic-engineering-vs-vibe-coding)
