---
title: Quantization: running big models on small hardware
slug: quantization
description: A 70B model needs about 140 GB of memory. Quantization stores each weight in fewer bits so it fits on one GPU or a laptop, usually with little quality loss.
date: 2026-11-02
series: ai-explained
youtube: S3B_EMJGuG8
facebook: https://facebook.com/reel/1277402627905738
instagram: https://www.instagram.com/p/DfO4y5-lHEl/
tags: quantization, llm inference, local ai, gguf, gpu
---
A 70-billion-parameter model needs about 140 GB of memory. So how do people run it on one GPU, or even a laptop? **Quantization**: storing each number with fewer bits.

## The memory math

Models usually store weights in 16 bits, which is two bytes each. Seventy billion weights times two bytes is 140 GB.

| Precision | Bytes per weight | 70B model |
|---|---|---|
| 16-bit | 2 | ~140 GB |
| 8-bit | 1 | ~70 GB |
| 4-bit | 0.5 | ~35 GB |

(That's the weights only. The KV cache and other overhead come on top.)

## How it works

Round each weight to the nearest of a small set of allowed values, and store a scale so you can map them back. It's like saving a photo with fewer colors: a smaller file, and usually you can't tell the difference.

The price is a little rounding error, so quality can drop, especially at very low bit counts.

## Three milestones

- **LLM.int8() (2022)** ran models up to 175B parameters in 8 bits with no performance loss in its tests. Its trick: a few outlier values are huge, so it keeps those in 16 bits and the rest in 8.
- **GPTQ (2022)** went further, to 3 or 4 bits per weight with negligible accuracy loss, quantizing a 175B model in about four GPU hours.
- **QLoRA (2023)** used 4-bit weights to fine-tune a 65B model on a single 48 GB GPU.

## It's faster, too

Generating text is often limited by memory speed, not math: the GPU spends its time moving weights around. Smaller weights mean less to move, so answers come back faster.

## Running models locally

Formats like **GGUF** (used by llama.cpp and Ollama) ship models ready in 8, 5 or 4 bits. Rules of thumb:

- **8-bit** is nearly lossless.
- **4-bit** is the popular sweet spot for local use.
- **Below 4 bits**, quality usually drops faster. Test on your own tasks before you ship.

Quantization doesn't make a model smarter. It makes the same model cheaper and easier to run.

> Fewer bits, nearly the same brain.

## Sources

- [Dettmers et al., LLM.int8()](https://arxiv.org/abs/2208.07339)
- [Frantar et al., GPTQ (2022)](https://arxiv.org/abs/2210.17323)
- [Dettmers et al., QLoRA (2023)](https://arxiv.org/abs/2305.14314)
