---
title: LoRA: cheap fine-tuning for big models
slug: lora
description: Fine-tuning a giant model sounds expensive. LoRA freezes the original weights and trains two small matrices instead. How it works, and why adapters are so handy.
date: 2026-11-02
series: ai-explained
youtube: jQPKePzhGB0
facebook: https://facebook.com/reel/994147737062912
instagram: https://www.instagram.com/p/DfP9k9jj4Da/
tags: lora, fine-tuning, peft, qlora, llm training
---
Fine-tuning a giant model sounds expensive. For a 70-billion-parameter model, normal fine-tuning updates all 70 billion numbers. **LoRA**, short for low-rank adaptation, makes it cheap. It's one of the most popular ways to fine-tune big models.

## The idea

LoRA **freezes** the original weights. They don't change at all. Instead, it adds two small matrices next to each layer, and trains only those.

## The math, in one picture

Picture a layer with a grid of 4,000 × 4,000 weights: 16 million numbers. Instead of changing that grid, LoRA learns two thin strips:

- one of 4,000 × 8,
- one of 8 × 4,000.

Multiplied together, they make a 4,000 × 4,000 update, but they hold just **64,000 numbers** in total. That 8 is the **rank**. Higher rank means more capacity, but more to train.

## The results

Microsoft researchers introduced LoRA in 2021. Compared with fully fine-tuning GPT-3 175B, LoRA trained **10,000 times fewer parameters** and needed **3 times less GPU memory**. Quality held up too: on par with or better than full fine-tuning on models like RoBERTa, GPT-2 and GPT-3.

## No slowdown, and handy adapters

You can **merge** the small matrices into the model before serving, so there's no extra latency.

Or keep them separate as an **adapter**: a small file, often just megabytes. One base model can then serve many adapters, one for support, one for legal, one for code, swapped in as needed.

## QLoRA: even cheaper

QLoRA trains LoRA on top of a 4-bit quantized model. That fit fine-tuning a 65B model onto a single 48 GB GPU.

## Not just text

Image models use LoRAs too, to learn a style or a character from a handful of pictures.

## The catch

It's still fine-tuning. LoRA is great for style, format and narrow tasks, not for teaching a model lots of new facts. For knowledge, use RAG.

## Getting started

With Hugging Face's PEFT library, a common starting point is rank 8 or 16 on the attention layers:

```python
from peft import LoraConfig
config = LoraConfig(r=16, target_modules=["q_proj", "v_proj"])
```

Then test the result against the base model on your real tasks.

> Freeze the giant, train the small.

## Sources

- [Hu et al., LoRA](https://arxiv.org/abs/2106.09685)
- [Hugging Face PEFT LoRA guide](https://huggingface.co/docs/peft/main/en/developer_guides/lora)
- [Dettmers et al., QLoRA (2023)](https://arxiv.org/abs/2305.14314)
