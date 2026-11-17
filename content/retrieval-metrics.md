---
title: Retrieval metrics: recall@k, MRR and nDCG for RAG
slug: retrieval-metrics
description: How to measure whether your RAG retrieval finds the right documents, with precision and recall at k, mean reciprocal rank and nDCG, plus a worked example.
date: 2026-11-17
series: ai-explained
youtube: w2fFtF-qO0M
facebook: https://facebook.com/reel/1458086379066223
instagram: https://www.instagram.com/p/Df2kSLMmqU7/
tags: rag, retrieval, evaluation, mrr, ndcg
---
Your RAG answer is wrong. Was it the model, or the search? **Retrieval metrics** tell you.

## Test retrieval on its own

Build a test set: real queries, each labelled with the documents that should come back. Then run only the retriever and score what it returns.

## Precision and recall

- **Precision** is the fraction of retrieved documents that are relevant.
- **Recall** is the fraction of relevant documents you actually retrieved.

A RAG pipeline only keeps the top k results, so you measure at a cutoff k.

**Recall@k** asks: of the documents that matter, how many made it into the top k? If a query has 4 relevant documents and 3 of them are in the top 5, recall@5 is 3/4. For RAG this is often the one to watch: if the right chunk isn't retrieved, the model never sees it.

**Precision@k** counts how much of the top k is relevant. But it ignores where in the top k those documents sit: a hit at position 1 and a hit at position 5 count the same.

## Mean reciprocal rank (MRR)

MRR cares about position. For each query, take one over the rank of the **first** correct result, then average across queries:

| Query | First correct result | Score |
|---|---|---|
| A | rank 3 | 1/3 |
| B | rank 2 | 1/2 |
| C | rank 1 | 1 |

(1/3 + 1/2 + 1) / 3 ≈ **0.61**.

Two pieces of fine print: a query with no correct result scores zero, and any extra relevant results after the first are ignored.

## nDCG

**nDCG** (normalized discounted cumulative gain) goes further. It handles graded relevance (very relevant, somewhat relevant, not relevant) rather than just yes or no, and it rewards putting the best documents near the top. It compares your ranking with the ideal ranking, so a perfect ranking scores 1.

The BEIR retrieval benchmark reports nDCG@10 for every dataset, and calls plain precision and recall "rank unaware".

## Which one to use

- **Recall@k:** what actually reaches the model.
- **MRR:** when the first good answer is what matters.
- **nDCG:** when you care about the whole ranking.

Track them whenever you change chunking, embeddings or rerankers, always on the same query set, so you know whether a change helped retrieval or just moved the problem.

> Don't guess where RAG fails. Measure the retrieval first.

## Sources

- [Wikipedia: Evaluation measures (information retrieval)](https://en.wikipedia.org/wiki/Evaluation_measures_(information_retrieval))
- [Wikipedia: Mean reciprocal rank](https://en.wikipedia.org/wiki/Mean_reciprocal_rank)
- [Manning, Raghavan, Schütze: Introduction to Information Retrieval, evaluation of ranked retrieval results](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-of-ranked-retrieval-results-1.html)
- [Thakur et al., BEIR: A Heterogeneous Benchmark for Zero-shot Evaluation of Information Retrieval Models](https://arxiv.org/abs/2104.08663)
