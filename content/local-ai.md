---
title: Local AI: run a model on your own laptop
slug: local-ai
description: Your laptop can run its own AI model, fully offline. How local AI works, why 4-bit quantization makes it fit, and where cloud models still win.
date: 2026-10-26
series: ai-explained
youtube: H2uPCphpL_8
facebook: https://facebook.com/reel/1892454635096786
tags: local ai, ollama, open models, quantization, privacy
---
Your laptop can run its own AI model, with no internet connection and no account. That's local AI: the model runs on your device, so your prompts and files never leave it.

## How it works

A language model is a big file of numbers (its weights) plus a program that runs it. Cloud AI keeps both on a provider's servers. Local AI downloads an **open-weight model** to your machine and runs it there.

The easiest way to start is a free tool like [Ollama](https://github.com/ollama/ollama). One command downloads and starts a model:

```bash
ollama run gemma3
```

Families like Gemma, Llama, Qwen and OpenAI's open-weight gpt-oss are all available this way. OpenAI says the smaller gpt-oss-20b can run within 16 GB of memory, which is a normal laptop.

## The trick that makes it fit

An 8-billion-parameter model stored at 16 bits per weight needs about 16 GB just for the weights. That's too much for most laptops.

**Quantization** fixes this by storing each weight with fewer bits. With llama.cpp's popular 4-bit format (Q4_K_M, about 4.9 bits per weight), the same 8B model shrinks to roughly 5 GB. You lose a little quality, but far less than you'd expect, and suddenly the model runs on everyday hardware.

## Why run AI locally?

- **Privacy.** Sensitive code, contracts or health data never go to a third party.
- **Offline.** It works on a plane, or anywhere without a connection.
- **Cost.** No per-token bill. You pay once, in hardware.
- **Control.** The model never changes under you, and nobody can turn it off.

## The catch

Local models are smaller than the top cloud models, so they are less capable at hard reasoning, long documents and complex coding. They are also only as fast as your hardware: a laptop GPU or Apple silicon helps a lot.

A good rule: use local models for private, simple or high-volume work (summaries, classification, autocomplete, drafts), and send the hard problems to a frontier model in the cloud.

> Private, offline, yours.

## Sources

- [Ollama, open-source tool to download and run models such as gpt-oss, Qwen and Gemma locally (`ollama run…](https://github.com/ollama/ollama)
- [OpenAI gpt-oss](https://github.com/openai/gpt-oss)
- [llama.cpp quantization](https://github.com/ggml-org/llama.cpp/tree/master/tools/quantize)
