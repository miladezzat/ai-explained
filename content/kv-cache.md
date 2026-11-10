---
title: The KV cache: why the first token is slow
slug: kv-cache
description: Why is the first token slow but the rest stream out fast? The KV cache. How prefill and decode work, how much memory the cache uses, and how PagedAttention helps.
date: 2026-11-09
series: ai-explained
youtube: YPJ1wIz6Fs0
facebook: https://facebook.com/reel/1656030569229677
instagram: https://www.instagram.com/p/Dfg5rKyH34F/
tags: kv cache, llm inference, attention, vllm, gpu memory
---
Why is the first token of an AI answer slow, but the rest stream out fast? The answer is the **KV cache**.

## One token at a time

LLMs write one token at a time. Each new token needs **attention** over every token before it. Without a cache, every step would recompute the whole prefix, and the work would keep growing with the length.

## Keys and values don't change

Attention turns each token into **keys** and **values**. For tokens already written, those never change. So the model stores them: that's the KV cache. Each new token computes only its own keys and values, then appends them to the cache.

## Two phases: prefill and decode

**Prefill** reads your whole prompt at once and builds the cache. This is the heavy part, and it's why you wait for the first token.

**Decode** then generates one token per step, reusing the cache instead of starting over. That's why the rest follow quickly.

## The catch: memory

The cache grows with every token, in every layer. NVIDIA gives the formula per token:

```text
2 (keys and values) × layers × hidden size × bytes per value
```

For **Llama 2 7B** in 16-bit, that's about **half a megabyte per token**, or about **2 GB for 4,096 tokens**, for a single request.

## Serving many users: PagedAttention

When you serve many users at once, that memory gets fragmented and wasted. **vLLM's PagedAttention** manages the cache in small blocks, like virtual memory pages in an operating system. With near-zero waste, more requests fit in one batch, and the paper reports **2 to 4 times** the throughput.

## Shrinking the cache

Models shrink the cache too. **Grouped-query attention** (GQA) shares each key-value head across several query heads, so there's less to store per token.

## Related: prompt caching

Prompt caching builds on the same idea across requests: reuse the computed work for a repeated prompt prefix, instead of running prefill again.

## Tip

Long context costs memory, not just money. Send the model only what it needs.

> Compute once, reuse every step.

## Sources

- [Hugging Face, KV cache blog and Cache strategies docs](https://huggingface.co/blog/kv-cache)
- [NVIDIA, Mastering LLM Techniques](https://developer.nvidia.com/blog/mastering-llm-techniques-inference-optimization/)
- [Kwon et al., Efficient Memory Management for LLM Serving with PagedAttention](https://arxiv.org/abs/2309.06180)
- [Ainslie et al., GQA](https://arxiv.org/abs/2305.13245)
