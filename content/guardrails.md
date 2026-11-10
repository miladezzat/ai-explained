---
title: LLM guardrails: checks around your AI app
slug: guardrails
description: Your support bot promised a customer a full refund. Who let it? Guardrails are checks on input, output and tool calls that catch problems before they cause damage.
date: 2026-10-31
series: ai-explained
youtube: OuBogqbUWmM
facebook: https://facebook.com/reel/1757867698849260
tags: guardrails, ai safety, llm, ai agents, jailbreaks
---
Your support bot just promised a customer a full refund. Nobody approved it. The model was just being helpful. It had no **guardrails**.

## What guardrails are

Guardrails are checks wrapped around your AI app that catch bad input and bad output before they cause damage. The model can't be your only line of defense. Guardrails are code you control.

## Three kinds

**Input guardrails** check what the user sends: off-topic requests, jailbreak attempts, personal data that shouldn't be processed.

**Output guardrails** check what the model answers: made-up facts, leaked secrets, promises it can't keep.

**Tool guardrails** are for agents. The OpenAI Agents SDK describes them as checks that "validate or block calls to those tools before and after execution". Is the refund amount within policy? Did the tool return something sensitive?

## How to build one

**A small, fast model as a classifier.** A cheap model screens every message and answers only "safe" or "unsafe". If unsafe, the main model never sees it. Anthropic recommends this kind of lightweight pre-screen for jailbreaks.

**Simple rules.** Often the best guardrail isn't AI at all: a regex for card numbers, a JSON schema check, a list of allowed topics, a maximum refund amount.

When a check fails, it trips a wire: the agent stops, and you return a safe answer instead.

## Speed vs safety

Guardrails add latency. One fix is to run the guardrail **in parallel** with the main call and cancel if it trips. The catch, as OpenAI's docs note: by then "the agent may have already consumed tokens and executed tools".

So for risky actions, use **blocking mode**: the check finishes before the agent starts.

## Tune them

Every guardrail trades accuracy, speed and cost. Too strict, and real users get blocked for nothing. Test on real examples and tune until false alarms are rare.

And don't rely on one. Stack a few cheap layers: input, tools and output.

> Trust the model, but check the edges.

## Sources

- [OpenAI Agents SDK, Guardrails](https://openai.github.io/openai-agents-python/guardrails/)
- [OpenAI Cookbook, How to implement LLM guardrails](https://developers.openai.com/cookbook/examples/how_to_use_guardrails)
- [Anthropic, Mitigate jailbreaks](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks)
