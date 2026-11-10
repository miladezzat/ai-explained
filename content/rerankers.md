---
title: Rerankers: put the best result first
slug: rerankers
description: Your search found the right document but ranked it ninth. Rerankers read the query and each document together to reorder results. Bi-encoders vs cross-encoders explained.
date: 2026-11-08
series: ai-explained
youtube: BNy-7BKfayc
facebook: https://facebook.com/reel/4454408714806830
instagram: https://www.instagram.com/p/DffZIVVDYMq/
tags: rerankers, rag, cross-encoder, retrieval, search
---
Your search found the right document. It just ranked it ninth, and your RAG app only passed the top five to the model. A **reranker** fixes that.

## Why vector search is rough

Vector search is fast because the query and each document are embedded **separately**. That's a **bi-encoder**: each text becomes a vector on its own, and you just measure how close two vectors are. Document vectors can be computed ahead of time, so search is quick.

The cost: details get blurred. Negation, numbers and what the question really asks can get lost in a single vector.

## What a reranker does

A reranker is usually a **cross-encoder**. It reads the query and one document **together** and outputs a relevance score. Reading them side by side catches the details vectors miss.

The catch: nothing can be computed ahead of time. Every query-document pair is a fresh model run, so it's slow.

## Two stages: retrieve wide, rerank tight

1. **Fast retrieval** (vector, keyword or hybrid search) grabs a shortlist, often the top 50 to 100.
2. **The reranker** reorders that shortlist.
3. Keep only the best few for the LLM.

Anthropic's contextual retrieval tests retrieved the top 150 chunks, reranked them with Cohere's reranker, and passed the top 20 to the model. With contextual retrieval plus reranking, failed retrievals dropped from **5.7% to 1.9%**.

## Using one

It's simple: send the query and a list of documents, and you get back each document's index with a relevance score.

```python
results = rerank(query="refund policy for damaged items", documents=docs, top_n=5)
# [{"index": 8, "relevance_score": 0.94}, {"index": 2, ...}, ...]
```

## Options

- **Hosted APIs**: Cohere Rerank, Voyage.
- **Open models**: BGE reranker, Qwen3 Reranker.
- **ColBERT** sits in between: it precomputes token-level vectors for each document, then matches them at query time.
- **An LLM as ranker**: slower and pricier, but very flexible.

## Is it worth the latency?

Reranking adds a little latency. But the model then reads less, and better, context, so answers can get both cheaper and more accurate.

## Tip

Measure it: compare answers with and without the reranker on real questions.

> Retrieve wide, rerank tight.

## Sources

- [Anthropic, Contextual Retrieval](https://www.anthropic.com/news/contextual-retrieval)
- [Cohere, Rerank overview](https://docs.cohere.com/docs/rerank-overview)
- [Redis, Top reranking models to boost RAG accuracy (2026-07-26)](https://redis.io/blog/top-reranking-models-rag-accuracy/)
