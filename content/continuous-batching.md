---
title: Continuous batching: how LLM servers keep the GPU full
slug: continuous-batching
description: Why static batching wastes GPU time on LLM inference, how iteration-level scheduling fixes it, and how chunked prefill and memory management fit in.
date: 2026-11-18
series: ai-explained
youtube: QSthJ-QLnS4
facebook: https://facebook.com/reel/1689676689167381
instagram: https://www.instagram.com/p/Df4gy7nlyNw/
tags: llm inference, continuous batching, vllm, gpu, serving
---
Your GPU serves eight requests together. One finishes early. With naive batching, its slot just sits there. **Continuous batching** fixes that.

## The problem with static batching

With static, request-level batching, a batch runs until its longest request is done. The Orca paper names the two costs:

- requests that finish early "cannot return to the client", and
- newly arrived requests "have to wait until the current batch completely finishes."

LLMs generate one token per step, and answer lengths vary wildly, so a batch is often waiting on one long answer while most of its slots are idle.

## Iteration-level scheduling

In 2022, the Orca paper proposed **iteration-level scheduling**: schedule at the granularity of each step instead of each request. Once a sequence finishes, a new one is inserted in its place, so the batch stays full.

That's **continuous batching**, also called dynamic batching. Orca also used **selective batching**, applying batching only to a selected set of operations. On GPT-3 175B it reported a **36.9x** throughput improvement over NVIDIA FasterTransformer at the same level of latency.

Anyscale later measured up to **23x** the throughput of static batching on their benchmark, using vLLM with continuous batching and its memory optimizations.

## Prefill and decode

Each request has two phases:

1. **Prefill** reads the whole prompt in one go.
2. **Decode** writes the answer one token at a time.

Prefill steps are slow but saturate the GPU's compute, so mixing them with ongoing decodes makes it hard to get both high throughput and low latency. **Chunked prefill**, from Sarathi-Serve, splits a prompt into near-equal chunks and adds new requests to a batch without pausing ongoing decodes.

## Memory is the other limit

Every active sequence holds its own KV cache, so how many requests fit in a batch depends on memory too. That's why servers pair continuous batching with memory techniques like PagedAttention.

## What it means for you

vLLM lists "continuous batching of incoming requests, chunked prefill, prefix caching" among its core features. If you self-host a model, the batching comes from the inference server, not your code. Send requests concurrently and let the scheduler pack them.

> Don't wait for the slowest request. Fill every free slot.

## Sources

- [Yu et al., Orca: A Distributed Serving System for Transformer-Based Generative Models (OSDI 2022)](https://www.usenix.org/conference/osdi22/presentation/yu)
- [Anyscale: How continuous batching enables 23x throughput in LLM inference](https://www.anyscale.com/blog/continuous-batching-llm-inference)
- [Agrawal et al., Sarathi-Serve](https://arxiv.org/abs/2403.02310)
- [Hugging Face: Continuous batching](https://huggingface.co/blog/continuous_batching)
- [vLLM documentation](https://docs.vllm.ai/en/latest/)
