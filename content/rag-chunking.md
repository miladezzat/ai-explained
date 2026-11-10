---
title: RAG chunking strategies
slug: rag-chunking
description: Your RAG app has the answer but keeps retrieving the wrong paragraph. Often the problem is chunking. Fixed-size, recursive, semantic and contextual chunking compared.
date: 2026-11-08
series: ai-explained
youtube: O4OpIGpz8Ds
facebook: https://facebook.com/reel/2468906267249911
instagram: https://www.instagram.com/p/DfewdAcjGv0/
tags: rag, chunking, contextual retrieval, embeddings, retrieval
---
Your RAG app has the answer in its documents, but it keeps retrieving the wrong paragraph. Often the problem isn't the model. It's the **chunking**: how you cut documents into pieces before embedding them.

## Size matters

- **Too big**, and the match gets blurry: one chunk covers five topics.
- **Too small**, and each piece loses its meaning: half a sentence about "it".

## The main strategies

**Fixed size.** Cut every few hundred tokens, no matter where you land. Simple and predictable.

**Overlap.** Repeat a little text between neighbors, so a sentence cut at the edge still appears whole in the next chunk.

**Recursive splitting.** Try to split on paragraphs first, then lines, then words, keeping text together as long as it can.

**Structure-aware.** For structured docs, split on headings and sections, so each chunk stays on one topic.

**Semantic chunking.** Use embeddings to start a new chunk where the meaning shifts.

## What the data says

Chroma compared these strategies on the same data. Plain recursive splitting at **200 tokens with no overlap** did well: 88.1% recall versus 91.9% for an LLM-based chunker in their setup. The fancy methods weren't always better.

Start simple, then measure.

## The hidden problem: lost context

Take this chunk:

> The company's revenue grew by 3% over the previous quarter.

Which company? Which quarter? Cut out of its document, the chunk has lost the context that makes it findable.

## The fix: contextual retrieval

Anthropic's **contextual retrieval** has an LLM write a short note about where each chunk came from, usually 50 to 100 tokens, like "From ACME's Q2 2023 report; revenue was $314M last quarter." The note is added to the chunk **before** embedding and keyword indexing.

In Anthropic's tests, failed retrievals dropped by **49%**, and by **67%** with reranking added.

## Keep metadata

Store the source, section and date with every chunk. It helps filtering, citations and debugging.

## Tip

Build a small test set of real questions with known answers, and compare chunk sizes on it before you pick one.

> Cut smart, keep context.

## Sources

- [Chroma, Evaluating Chunking Strategies for Retrieval](https://www.trychroma.com/research/evaluating-chunking)
- [Anthropic, Introducing Contextual Retrieval](https://www.anthropic.com/news/contextual-retrieval)
- [LangChain docs, RecursiveCharacterTextSplitter](https://docs.langchain.com/oss/python/integrations/splitters/recursive_text_splitter)
