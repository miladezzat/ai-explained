---
title: FlashAttention: faster attention, same answer
slug: flash-attention
description: Why attention is limited by memory traffic on GPUs, how FlashAttention's tiling keeps the work in fast on-chip memory, and what FlashAttention-2 and -3 added.
date: 2026-11-17
series: ai-explained
youtube: ktqsGvYNA0s
facebook: https://facebook.com/reel/2195753707994721
instagram: https://www.instagram.com/p/Df1gStHlobZ/
tags: flashattention, attention, gpu, transformers, llm
---
Attention gets slow and memory-hungry on long inputs. **FlashAttention** made it much faster without changing the answer.

## The cost of attention

Self-attention's time and memory grow **quadratically** with sequence length. Every token is compared with every other token, so double the input and you get four times as many attention scores.

## Two kinds of GPU memory

A GPU has two kinds of memory that matter here:

- **HBM** (high bandwidth memory): big but slower. The FlashAttention paper describes an A100 with 40 to 80 GB of HBM at 1.5 to 2.0 TB/s.
- **SRAM**: tiny, fast and on-chip. The same A100 has 192 KB of SRAM per each of its 108 streaming multiprocessors, roughly an order of magnitude faster than HBM.

That gap means moving data, not doing math, often becomes the bottleneck. Standard attention writes the full score matrix out to HBM, then reads it back for the softmax, and again to produce the output.

## The idea: be IO-aware

In 2022, Tri Dao and colleagues argued that "a missing principle is making attention algorithms IO-aware": counting the reads and writes between levels of GPU memory, not just the arithmetic.

FlashAttention:

1. Loads small **tiles** of queries, keys and values from HBM into SRAM.
2. Computes attention **block by block** inside SRAM.
3. Updates the softmax step by step as each block arrives, so the full score matrix is never written out.

It's **exact**, not an approximation: the same result, with far fewer trips to slow memory. For training, it stores a small softmax normalization factor and **recomputes** attention on-chip in the backward pass instead of storing the huge matrix, so memory grows linearly with sequence length.

The paper reports a 3x speedup on GPT-2 training at sequence length 1K compared with the Hugging Face implementation, and BERT-large training 15% faster than the MLPerf 1.1 speed record.

## FlashAttention-2 and -3

- **FlashAttention-2** (2023) split the work better across the GPU: around 2x faster than the original, reaching 50 to 73% of the theoretical maximum FLOPs/s on an A100.
- **FlashAttention-3** (2024) targets Hopper GPUs like the H100: 1.5 to 2x faster, reaching up to 740 TFLOPs/s in FP16.

## Using it

You rarely call it directly. In Hugging Face Transformers, pass `attn_implementation="flash_attention_2"` to `from_pretrained()`. PyTorch's `scaled_dot_product_attention` tries to pick the best implementation for your inputs, and FlashAttention is one of its CUDA backends.

> The math was never the whole problem. Moving the data was.

## Sources

- [Dao et al., FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness](https://arxiv.org/abs/2205.14135)
- [Dao, FlashAttention-2](https://arxiv.org/abs/2307.08691)
- [Shah et al., FlashAttention-3](https://arxiv.org/abs/2407.08608)
- [Hugging Face Transformers: GPU inference optimization](https://huggingface.co/docs/transformers/perf_infer_gpu_one)
- [PyTorch: scaled_dot_product_attention](https://docs.pytorch.org/docs/stable/generated/torch.nn.functional.scaled_dot_product_attention.html)
