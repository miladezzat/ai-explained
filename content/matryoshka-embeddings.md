---
title: Matryoshka embeddings: one vector, many sizes
slug: matryoshka-embeddings
description: How Matryoshka Representation Learning trains embeddings you can cut short, what OpenAI and Hugging Face measured, and how to truncate them safely.
date: 2026-11-16
series: ai-explained
youtube: CJGbYAllsrY
facebook: https://facebook.com/reel/2432808677461637
instagram: https://www.instagram.com/p/Df0BuCaF3-u/
tags: embeddings, matryoshka, vector search, rag, llm
---
An embedding can be 3,072 numbers long. What if you kept only the first 256 and it still worked? That's the promise of **Matryoshka embeddings**.

## Dolls inside dolls

The name comes from Russian nesting dolls, where each smaller doll sits inside a bigger one. A Matryoshka embedding is built the same way: the first dimensions form a small, usable embedding on their own, and every longer prefix adds more detail.

A normal embedding doesn't work like that. Its meaning is spread across every dimension, so if you chop off the end, quality drops faster.

## How it's trained

The method is **Matryoshka Representation Learning** (MRL), from Kusupati and colleagues in 2022. During training, the loss is computed at several sizes at once, for example on the first 768, 512, 256, 128 and 64 dimensions of the same vector. The model learns what the paper calls "coarse-to-fine representations", so one embedding can "adapt to the computational constraints of downstream tasks".

The paper reports:

- up to **14x smaller** embeddings for ImageNet-1K classification at the same level of accuracy
- up to **14x faster** real-world large-scale retrieval

## Where you've already met it

OpenAI's **text-embedding-3** models were trained with this technique; the announcement's footnote links the MRL paper. Their API takes a `dimensions` parameter that shortens the vector. OpenAI says text-embedding-3-large shortened to **256** dimensions still outperforms an unshortened text-embedding-ada-002 embedding of 1,536 dimensions on the MTEB benchmark.

Hugging Face measured the effect on a small model: at **8.3%** of the embedding size, the Matryoshka model kept **98.37%** of its performance, versus 96.46% for a standard model trained the usual way.

## How to use it

1. Embed as usual with a model trained this way.
2. Keep the first N dimensions. In Sentence Transformers, that's the `truncate_dim` argument.
3. **Normalize again.** If the full vectors were normalized, the truncated ones no longer are, so re-normalize before comparing them with cosine similarity or a dot product.

Read the model card first: some models need an extra step. Hugging Face notes that Nomic's nomic-embed-text-v1.5 requires a layer norm before truncation.

## Why bother

Shorter vectors mean less storage, less memory and faster search over millions of documents. There's also a neat two-stage trick: **shortlist** candidates using short vectors, then **rerank** the survivors with the full-size ones. You get most of the speed of small vectors and most of the accuracy of big ones.

The trade-off is simple: shorter is cheaper but less accurate. How much you lose depends on your model and your data, so test a few sizes on your own retrieval set before you pick one.

> Keep the doll that fits your budget. One embedding, many sizes.

## Sources

- [Kusupati et al., Matryoshka Representation Learning](https://arxiv.org/abs/2205.13147)
- [OpenAI, New embedding models and API updates](https://openai.com/index/new-embedding-models-and-api-updates/)
- [Hugging Face, Introduction to Matryoshka Embedding Models](https://huggingface.co/blog/matryoshka)
