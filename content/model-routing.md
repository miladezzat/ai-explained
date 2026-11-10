---
title: Model routing: the right model for each request
slug: model-routing
description: Your app sends every question to the biggest, priciest model, even "what's 2+2?". Model routing sends easy requests to small models and hard ones to strong models.
date: 2026-11-05
series: ai-explained
youtube: NiEF87udhg0
facebook: https://facebook.com/reel/2320349622135538
instagram: https://www.instagram.com/p/DfXrNsuHclL/
tags: model routing, llm cost, routellm, cascades, ai engineering
---
Your app sends every question to the biggest, most expensive model. Even "what's two plus two?" Most requests are easy, and paying top price for all of them wastes money and time. **Model routing** fixes that.

## What it is

Model routing picks a model for each request: easy ones go to a small, cheap model; hard ones go to a strong one. A **router** sits in front of your models, reads the prompt, and predicts which model can handle it.

## Two kinds of routers

**Rules.** The simplest router: short chat goes to the small model; code and math go to the big one. Easy to build and easy to debug.

**Learned routers.** These are trained on data to learn which prompts the weak model answers just as well as the strong one. RouteLLM, from LMSYS, trained four such routers on human preference data from Chatbot Arena.

## How much it saves

RouteLLM's results, compared with sending everything to GPT-4:

| Benchmark | Cost reduction | Quality kept |
|---|---|---|
| MT Bench | over 85% | 95% of GPT-4 |
| MMLU | 45% | 95% of GPT-4 |
| GSM8K (math) | 35% | 95% of GPT-4 |

Savings depend on the task: the more easy requests you have, the more you save.

## Cascades: try cheap first

Another pattern is a **cascade**: send the request to the cheap model first, and escalate to a bigger one only if the answer looks weak. Stanford's FrugalGPT used cascades and matched GPT-4 at up to 98% lower cost in its tests.

## Faster, too

Small models answer faster, so routing also cuts latency for most users.

## The risk

A router that guesses wrong sends a hard question to a weak model, and quality drops. So measure it:

- Run your evals on each route.
- Track quality and cost together, not just cost.
- Most routers give you one dial, a threshold that trades cost for quality. Tune it on real traffic.

## How to start

Begin with two models and simple rules. Once you have data on which requests the small model gets right, add a learned router.

> Right model, right price.

## Sources

- [Ong et al., RouteLLM](https://arxiv.org/abs/2406.18665)
- [LMSYS, RouteLLM](https://lmsys.org/blog/2024-07-01-routellm/)
- [Chen, Zaharia, Zou, FrugalGPT](https://arxiv.org/abs/2305.05176)
