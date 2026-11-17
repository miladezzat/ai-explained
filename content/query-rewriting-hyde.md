---
title: Query rewriting and HyDE: better questions, better retrieval
slug: query-rewriting-hyde
description: Why user questions often miss the right documents in RAG, how Rewrite-Retrieve-Read and step-back prompting reshape the query, and how HyDE searches with a fake answer.
date: 2026-11-17
series: ai-explained
youtube: bifLUFgJDCU
facebook: https://facebook.com/reel/29030969676512845
instagram: https://www.instagram.com/p/Df17llVF6tG/
tags: rag, retrieval, hyde, query rewriting, llm
---
Users ask messy questions. Your search index wants clean ones. **Query rewriting** and **HyDE** close that gap.

## The gap

In a typical RAG pipeline, the user's words go straight into retrieval. But the way people ask rarely matches the way documents are written. A 2023 paper on query rewriting puts it plainly: "there is inevitably a gap between the input text and the needed knowledge in retrieval."

## Rewrite, retrieve, read

That paper proposes **Rewrite-Retrieve-Read** instead of the usual retrieve-then-read:

1. **Rewrite:** an LLM turns the question into search queries. The output can be none, one, or several queries.
2. **Retrieve:** run those queries against the search engine.
3. **Read:** the LLM answers from what came back.

A common case is a chat follow-up. "What about its pricing?" means nothing to a search index on its own; rewritten into a standalone query that names the product, it does.

The authors also trained a small rewriter, initialized from **T5-large**, with reinforcement learning, using the reader LLM's performance as the reward. A cheap model learns to write the queries a bigger model benefits from.

**Step-back prompting** goes the other way: instead of making the question more specific, ask a higher-level question first, to derive the general concepts and principles behind it.

## HyDE: search with a fake answer

**HyDE**, Hypothetical Document Embeddings, from Gao and colleagues in 2022, takes a bolder route:

1. An LLM writes a hypothetical document that answers the query.
2. That document is embedded, not the question.
3. The embedding is used to find similar **real** documents.

Why it works: a fake answer looks more like real answers than a short question does, so it lands closer to them in vector space.

The fake document "is unreal and may contain false details". The paper says the encoder's dense bottleneck filters out the incorrect details, and in any case only real documents are retrieved, so the made-up text never becomes your source.

With no relevance labels at all, HyDE significantly outperformed the unsupervised dense retriever Contriever, and was comparable to fine-tuned retrievers across tasks.

## The catch

Every rewrite or hypothetical document is an extra LLM call, adding latency and cost before search even starts. These techniques help most when queries are short, vague or conversational. Measure retrieval quality before and after, on your own queries, to check they're paying for themselves.

> Don't just search for the question. Search for what the answer looks like.

## Sources

- [Ma et al., Query Rewriting for Retrieval-Augmented Large Language Models](https://arxiv.org/abs/2305.14283)
- [Gao et al., Precise Zero-Shot Dense Retrieval without Relevance Labels (HyDE)](https://arxiv.org/abs/2212.10496)
- [Zheng et al., Take a Step Back: Evoking Reasoning via Abstraction in Large Language Models](https://arxiv.org/abs/2310.06117)
