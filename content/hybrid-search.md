---
title: Hybrid search: BM25 plus vectors, merged with RRF
slug: hybrid-search
description: Vector search understands meaning but misses exact strings; BM25 does the opposite. Hybrid search runs both and merges them with Reciprocal Rank Fusion.
date: 2026-11-11
series: ai-explained
youtube: ZKxwYeQcJ1A
facebook: https://facebook.com/reel/1632354942024628
instagram: https://www.instagram.com/p/DfnHwagDZ3n/
tags: hybrid search, rag, bm25, vector search, reciprocal rank fusion
---
Search a support database for "error code TS-999", and vector search might miss it. Hybrid search won't. It combines keyword search and vector search, so you get both meaning and exact matches.

## Vector search: meaning

Vector search compares **meanings**. Ask about "car trouble" and it can find a document about "engine problems", even though they share no words.

But embeddings can **miss exact matches**: error codes, product IDs, names and dates.

## Keyword search: exact words

That's where keyword search shines. The classic ranking function is **BM25**. It scores documents by the exact words they share with your query:

- **rare words count more** than common ones, and
- **long documents don't win** just for being long, because scores are normalized by length.

So each method has a blind spot: **keywords miss synonyms, vectors miss exact strings.**

## Hybrid: run both, then merge

Hybrid search runs a BM25 search and a vector search **in parallel**, then merges the two ranked lists into one.

Merging is the tricky part. BM25 scores have **no upper limit**, while cosine similarity sits in a narrow range, so you can't just add them.

## Reciprocal Rank Fusion

The common fix is **Reciprocal Rank Fusion (RRF)**. It ignores the raw scores and uses only each document's **rank** in each list:

```python
score = sum(1 / (k + rank) for each list the doc appears in)
# k is usually 60
```

That rewards agreement. With k = 60:

| Document | Ranks | RRF score |
|---|---|---|
| A | #1 in one list, #3 in the other | 0.032 |
| B | #1 in one list, missing from the other | 0.016 |

Some databases **weight the two sides** instead. In Weaviate, the `alpha` setting goes from 0 (pure keyword) to 1 (pure vector).

## Does it help?

In Anthropic's Contextual Retrieval experiments, **embeddings plus BM25 beat embeddings on their own**. With their Contextual Retrieval techniques on top, top-20 retrieval failures dropped **49%**, and **67%** when a reranker was added.

## When to use it

Use hybrid search when people search for **IDs, jargon or names**: documentation, support tickets and code are classic cases.

Many search engines support it out of the box, including **Azure AI Search, Elasticsearch and Weaviate**.

> Meaning plus exact words. That's hybrid search.

## Sources

- [Anthropic, Introducing Contextual Retrieval](https://www.anthropic.com/news/contextual-retrieval)
- [Microsoft Learn, Hybrid search overview](https://learn.microsoft.com/en-us/azure/search/hybrid-search-overview)
- [Microsoft Learn, Relevance scoring in hybrid search using RRF](https://learn.microsoft.com/en-us/azure/search/hybrid-search-ranking)
- [Elastic, Reciprocal rank fusion](https://www.elastic.co/guide/en/elasticsearch/reference/current/rrf.html)
- [Cormack, Clarke and Buettcher, Reciprocal Rank Fusion (SIGIR 2009)](https://plg.uwaterloo.ca/~gvcormac/cormacksigir09-rrf.pdf)
- [Weaviate, Hybrid Search Explained](https://weaviate.io/blog/hybrid-search-explained)
