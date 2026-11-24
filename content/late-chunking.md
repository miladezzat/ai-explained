---
title: Late chunking: embed first, chunk later
slug: late-chunking
description: Late chunking embeds the whole document with a long-context model, then splits the token embeddings into chunks, so each chunk keeps its context.
date: 2026-11-24
series: ai-explained
youtube: 2U7Q2Na0Dx8
facebook: https://facebook.com/reel/1017520508072076
instagram: https://www.instagram.com/p/DgHg3T2F0F_/
tags: rag, embeddings, chunking, retrieval, llm
---
Your RAG chunk says "the city". Which city? **Naive chunking forgot.**

## The problem with naive chunking

A normal RAG pipeline splits a document into chunks first, then embeds each chunk on its own. The paper behind late chunking puts the cost plainly: chunk embeddings made this way "can lose contextual information from surrounding chunks."

Their example is a Wikipedia-style text about Berlin, where "phrases like "its" and "the city" reference "Berlin," which is mentioned only in the first sentence." Embedded alone, a chunk that starts "Its more than 3.85 million inhabitants..." has no idea it's about Berlin.

## Embed first, chunk later

Late chunking flips the order:

1. Run the **whole document** through a long-context embedding model, so every token embedding sees the full context.
2. Cut the resulting token embeddings into chunk spans (the same boundaries you'd have used anyway).
3. Average each span into one vector.

In the paper's words, it's "chunking applied after the transformer model and just before mean pooling."

## Does it work?

Jina AI's Berlin test compares each sentence's similarity to "Berlin":

| Sentence | Naive | Late |
|---|---|---|
| "Its more than 3.85 million inhabitants..." | 0.708 | 0.825 |
| "The city is also one of the states..." | 0.753 | 0.850 |

On retrieval benchmarks (nDCG@10 with jina-embeddings-v2-small-en), late chunking matched or beat naive chunking on every dataset Jina reported. NFCorpus moved the most, from 23.46% to 29.98%; Quora was a tie. Jina also observed that "the longer the document, the more effective the late chunking strategy becomes."

## What it needs

- **A long-context embedding model.** The paper uses "8192 tokens for jina-embeddings-v2-small – roughly ten pages of standard text."
- **No training.** The method "does not require additional model training": same model, same chunk boundaries, different order.
- **A plan for very long documents.** For texts "with more tokens than long-context embedding models can handle", the paper proposes *long late chunking*: process overlapping macro chunks.

## Late chunking vs contextual retrieval

Contextual retrieval asks an LLM to write context for every chunk before embedding. That works, but the paper notes it "is however computationally more expensive, as LLMs are typically much larger than embedding models." Late chunking only needs the embedding model.

## What it doesn't change

Jina stresses that "late chunking still requires boundary cues": you still choose where chunks start and end. And you still retrieve and rank chunks, not whole documents.

> Embed first. Chunk later.

## Sources

- [Günther et al.: Late Chunking: Contextual Chunk Embeddings Using Long-Context Embedding Models (arXiv 2409.04701)](https://arxiv.org/abs/2409.04701)
- [Jina AI: Late Chunking in Long-Context Embedding Models](https://jina.ai/news/late-chunking-in-long-context-embedding-models/)
