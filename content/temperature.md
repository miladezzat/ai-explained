---
title: Temperature, top-p and top-k
slug: temperature
description: Same prompt, same model, different answer every time. Why? Temperature. How sampling works, what top-p and top-k do, and why Claude's newest API dropped them.
date: 2026-11-01
series: ai-explained
youtube: Mu2QnY4R4Ck
facebook: https://facebook.com/reel/28787563614257091
instagram: https://www.instagram.com/p/DfNDCWijnjV/
tags: temperature, sampling, top p, llm, claude api
---
Same prompt, same model, a different answer every time. Why? Because of **temperature** and how models pick each next token.

## Every token is a probability

A model doesn't just pick the next word. It gives every possible token a probability. After "The sky is", "blue" might get 70%, "clear" 15%, and "falling" just 2%.

Always taking the top token is called **greedy decoding**. It's predictable, but research on text generation found it tends to produce text that is "bland and strangely repetitive". So models **sample** instead: they roll weighted dice over those odds.

## What temperature does

Temperature reshapes the odds before the roll:

- **Low (like 0.2)** makes the top token even likelier: focused and consistent. Good for code, extraction and facts.
- **High (like 0.8 or more)** flattens the odds: varied and surprising. Great for brainstorming, but expect more mistakes.

Temperature 0 isn't a perfect off switch, either. Answers can still change a little between runs.

## Top-p and top-k

Two more knobs trim the dice before rolling:

- **Top-p** (nucleus sampling) keeps the likeliest tokens that add up to, say, 90% of the probability, and drops the long tail.
- **Top-k** keeps a fixed number, like the top 50.

OpenAI's docs recommend changing temperature **or** top-p, not both. They pull on the same thing.

## The news: Claude dropped the knobs

In Claude's API version from October 2026 (2026-10-21), temperature, top-p and top-k are removed. A request that sends them returns an error, even at the default value. The newest Claude models already accepted only the defaults, so the knob had nothing left to turn.

No setting replaces it. You steer with clear prompts, good examples and structured outputs.

## Practical advice

On models that still have the knob: low for facts, higher for ideas. And test both on your real prompts instead of guessing.

> Same prompt, different roll.

## Sources

- [OpenAI API reference (openai-python, chat completions params)](https://github.com/openai/openai-python)
- [Claude API migration guide, version 2026-10-21, Sampling parameters are removed](https://platform.claude.com/docs/en/api/migration-2026-10-21)
- [Holtzman et al., The Curious Case of Neural Text Degeneration (2019)](https://arxiv.org/abs/1904.09751)
