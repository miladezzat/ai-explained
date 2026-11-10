---
title: Small language models (SLMs)
slug: slm
description: Bigger isn't always better. Small language models with a few billion parameters are catching up, and they're cheaper, faster and can run on your phone.
date: 2026-11-03
series: ai-explained
youtube: PVO_uTuoatc
facebook: https://facebook.com/reel/2144877349526027
instagram: https://www.instagram.com/p/DfSfGI2GkXJ/
tags: small language models, slm, phi, local ai, ai agents
---
Bigger isn't always better. **Small language models** are catching up fast, and for many jobs they're the smarter choice.

## What counts as small?

A small language model, or SLM, has a few billion parameters or fewer. The biggest frontier models are many times larger. That makes SLMs cheaper and faster to run, and small enough for a laptop or even a phone.

## How good can a small model be?

Microsoft's Phi models are a good example of how far they've come:

- **phi-1 (2023)** had just 1.3 billion parameters and scored 50.6% on HumanEval, a coding benchmark.
- **phi-3-mini (2024)**, with 3.8 billion parameters, rivaled Mixtral 8x7B and GPT-3.5 on benchmarks, scoring 69% on MMLU (a broad knowledge test), while being small enough to run on a phone.

## Why they got so good

The phi-1 paper's title says it: *Textbooks Are All You Need*. The trick was **data quality**: "textbook quality" code and exercises, not just anything from the web. Add more training, and often **distillation** from bigger models, and small models punch far above their size.

## SLMs and agents

A 2025 NVIDIA position paper argues small models are "sufficiently powerful, inherently more suitable, and necessarily more economical for many invocations in agentic systems".

Its idea is to **mix models**: small ones handle the routine, repetitive steps (parse this, classify that, call this tool), and a big one steps in for open-ended conversation and hard reasoning.

## Other advantages

- **Privacy**: run one on your device, and your data stays there.
- **Cheap fine-tuning**: make one great at your exact task.
- **Speed**: fast answers, even without a big GPU.

## The catch

Small models know less about the world, and struggle more with long, hard reasoning. Benchmarks aren't your app, so test a small model on your own tasks before you switch.

## Where to start

Popular families include **Phi, Gemma, Llama and Qwen**, with versions from under a billion to a few billion parameters. A good path: prove the idea with a big model, then try a small one, and keep it if the quality holds.

> Small model, big savings.

## Sources

- [Gunasekar et al., Textbooks Are All You Need (2023)](https://arxiv.org/abs/2306.11644)
- [Abdin et al., Phi-3 Technical Report (2024)](https://arxiv.org/abs/2404.14219)
- [Belcak et al., Small Language Models are the Future of Agentic AI (2025, NVIDIA research, position paper)](https://arxiv.org/abs/2506.02153)
