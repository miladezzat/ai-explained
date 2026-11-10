---
title: Mixture of Experts (MoE)
slug: moe
description: DeepSeek V3 has 671 billion parameters, but each token uses only 37 billion. How Mixture of Experts models route tokens to a few experts, and the trade-offs.
date: 2026-11-01
series: ai-explained
youtube: 8Km3HLL02n4
facebook: https://facebook.com/reel/1856332735376277
instagram: https://www.instagram.com/p/DfNXQudicLu/
tags: mixture of experts, moe, llm architecture, open models, inference
---
DeepSeek V3 has 671 billion parameters. But each token it processes only uses 37 billion of them. How? It's a **Mixture of Experts**.

## Dense vs mixture of experts

In a normal **dense** model, every parameter works on every token. A bigger model means more compute, every single time.

In a **mixture of experts** (MoE) model, some layers are split into many **experts**: small feed-forward networks side by side. A **router** looks at each token and sends it to just a few experts, often two. The rest sit idle for that token.

## A concrete example: Mixtral

Mixtral 8x7B has eight experts per layer and picks two for every token. It has 47 billion parameters in total but uses about 13 billion per token. Its authors reported it matched or beat Llama 2 70B and GPT-3.5 on the benchmarks they tested: more knowledge, for the compute cost of a much smaller model.

## The experts aren't topic experts

It's tempting to imagine a math expert and a biology expert. In practice, Mixtral's authors found no clear pattern of experts specializing by topic. The router learns whatever split works.

## Training has a catch

The router can learn to favor a few experts and ignore the rest. So MoE models add **load balancing** during training to spread the work. DeepSeek V3, for example, uses its own auxiliary-loss-free balancing strategy.

## Bigger and bigger

Meta's Llama 4 Maverick has 128 routed experts plus a **shared expert** that every token visits: 400 billion parameters in total, 17 billion active. The idea isn't new, though: a 2017 Google paper (Shazeer et al.) used up to thousands of experts for over a thousand times more capacity.

## The trade-off

All the experts must sit in memory, even if only a few run per token. So MoE models are **fast per token but heavy to host**.

## Reading model specs

When you see two numbers, total and active:

- **Active parameters** tell you the speed and compute cost per token.
- **Total parameters** tell you how much memory you need.

> Many experts, a few at a time.

## Sources

- [Mixtral of Experts (arXiv 2401.04088)](https://arxiv.org/abs/2401.04088)
- [DeepSeek-V3 technical report (arXiv 2412.19437)](https://arxiv.org/abs/2412.19437)
- [Meta, The Llama 4 herd (2025)](https://ai.meta.com/blog/llama-4-multimodal-intelligence/)
- [Shazeer et al., Outrageously Large Neural Networks](https://arxiv.org/abs/1701.06538)
