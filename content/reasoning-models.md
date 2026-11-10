---
title: Reasoning models: AI that thinks before it answers
slug: reasoning-models
description: Some AI models stop and think before answering. How reasoning models work, what thinking tokens cost, how to set the effort, and when to use them.
date: 2026-10-29
series: ai-explained
youtube: HyyHQWhPVVo
facebook: https://facebook.com/reel/1586098909496231
instagram: https://www.instagram.com/reel/DfFgCehy-jp/
tags: reasoning models, extended thinking, llm, tokens, ai models
---
Some AI models answer instantly. Others pause, work through the problem, and only then reply. Those are **reasoning models**, and knowing when to use them saves both time and money.

## How they work

Before writing the final answer, a reasoning model produces a stream of internal reasoning: it breaks the problem into steps, tries an approach, checks it, and sometimes backtracks. Only after that does it write the reply you see.

OpenAI calls these **reasoning tokens**. Anthropic calls the feature **extended thinking**: "Claude thinks against that budget before it starts its final answer." Depending on the provider, you may see a summary of that thinking, or none of it.

## Thinking costs tokens

That reasoning isn't free. It's made of tokens, and:

- you're **billed** for thinking tokens, as output tokens,
- they **take up space** in the context window,
- and they **add time** before the answer arrives.

A hard problem might use thousands of thinking tokens for a short final answer.

## You can set the effort

Most APIs let you choose how hard the model thinks:

- OpenAI's `reasoning.effort`: "Lower effort favors speed and lower token usage, while at higher effort the model thinks more completely."
- Anthropic's thinking budget: higher budgets allow more thorough reasoning, at the cost of more latency.

Start low and raise it only when the answers aren't good enough.

## When to use them

| Good fit | Poor fit |
|---|---|
| Tricky coding and debugging | Quick factual questions |
| Multi-step planning | Rewriting or formatting text |
| Math and logic | Simple classification |
| Agent workflows with many steps | Chat where speed matters most |

A good pattern in apps: route simple requests to a fast model and send only the hard ones to a reasoning model, or turn the effort up only for those.

> Fast answer or deep thought: pick the right one.

## Sources

- [OpenAI, Reasoning models guide](https://developers.openai.com/api/docs/guides/reasoning)
- [Anthropic, Extended thinking](https://platform.claude.com/docs/en/build-with-claude/extended-thinking)
