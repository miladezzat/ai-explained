---
title: GraphRAG: RAG with a knowledge graph
slug: graphrag
description: Ask a normal RAG app for the main themes in your data and it misses the big picture. GraphRAG builds a knowledge graph and community summaries first. How it works.
date: 2026-11-05
series: ai-explained
youtube: dUTZXyS1Y3E
facebook: https://facebook.com/reel/1828202644979755
instagram: https://www.instagram.com/p/DfXCRRmGzoT/
tags: graphrag, rag, knowledge graph, microsoft, retrieval
---
Ask your RAG app, "What are the main themes in these documents?" It grabs the five most similar chunks and misses the big picture. **GraphRAG** was built for exactly that kind of question.

## Why plain RAG struggles

RAG finds the chunks most similar to your question and hands them to the model. That's great for specific facts. But Microsoft researchers showed that "RAG fails on global questions directed at an entire text corpus", like asking for the main themes. No single chunk holds the answer.

## How GraphRAG works

GraphRAG adds a big step **before** any question is asked:

1. **Build a knowledge graph.** An LLM reads every chunk and pulls out entities (people, companies, places) and the relationships between them. Entities become nodes; relationships become links.
2. **Find communities.** It groups closely linked entities into communities, using the Leiden clustering algorithm.
3. **Summarize ahead of time.** It writes a summary for every community. Now the whole dataset has a map.

## Two ways to search

**Global search**, for big-picture questions: each community summary produces a partial answer, and the partial answers are merged into one final response.

**Local search**, for specific questions: start at the entity you asked about and fan out to its neighbors in the graph.

## Does it work?

In the 2024 paper, GraphRAG beat a conventional RAG baseline on both how **comprehensive** and how **diverse** its answers were, on datasets around a million tokens, like podcast transcripts and news articles.

## The catch: cost

Building the index is expensive. The LLM reads and summarizes everything up front. So Microsoft later introduced **LazyGraphRAG**, which defers that work: its indexing cost is about the same as vector RAG, 0.1% of full GraphRAG.

## When to use it

| Question | Use |
|---|---|
| "What does our refund policy say?" | Plain RAG |
| "What themes come up across all customer interviews?" | GraphRAG |
| "How are these companies connected?" | GraphRAG |

For simple lookups, plain RAG is cheaper and just as good. Start there, and add the graph when you need it.

## Tip

Try it on a small sample first, and check that the entity graph actually makes sense before you index everything.

> Search the chunks, or map the whole story.

## Sources

- [Edge et al., From Local to Global](https://arxiv.org/abs/2404.16130)
- [Microsoft GraphRAG docs](https://microsoft.github.io/graphrag/)
- [Microsoft Research, LazyGraphRAG](https://www.microsoft.com/en-us/research/blog/lazygraphrag-setting-a-new-standard-for-quality-and-cost/)
