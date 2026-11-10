---
title: Embeddings: meaning you can measure
slug: embeddings
description: How does AI know "dog" and "puppy" mean almost the same thing? Embeddings turn text into vectors, so similar meanings land close together.
date: 2026-10-29
series: ai-explained
youtube: s10G1GGLJrk
facebook: https://facebook.com/reel/1128043979637222
instagram: https://www.instagram.com/reel/DfEbWgZOPgS/
tags: embeddings, vector search, semantic search, rag, llm
---
How does an AI system know that "dog" and "puppy" mean almost the same thing, or that "cheap flights" and "budget airfare" are the same search? The answer is **embeddings**.

## Text as a point on a map

An embedding turns a piece of text into a long list of numbers, called a vector. OpenAI's `text-embedding-3-small`, for example, returns 1,536 numbers per input; `text-embedding-3-large` returns 3,072.

Think of each vector as a point on a huge map of meaning. The embedding model is trained so that:

- texts with **similar meanings land close together**,
- texts with **different meanings land far apart**.

"Dog" and "puppy" end up neighbours. "Dog" and "invoice" end up in different corners.

## Measuring closeness

Because they're just numbers, you can measure how close two embeddings are. The most common measure is **cosine similarity**: the angle between two vectors. As OpenAI's guide puts it, "small distances suggest high relatedness and large distances suggest low relatedness."

```python
score = cosine_similarity(embed("cheap flights"), embed("budget airfare"))
# close to 1.0 → very similar
```

## Search by meaning, not keywords

A classic keyword search for "cheap flights" misses a page titled "Budget airfare deals", because no words match. With embeddings, you:

1. Embed every document once and store the vectors.
2. Embed the user's query.
3. Return the documents whose vectors are closest.

That's **semantic search**, and it finds the right page even when the words are different.

## What embeddings power

- **RAG**: find the most relevant chunks of your docs and give them to a model to answer from.
- **Clustering**: group support tickets or feedback by topic automatically.
- **Recommendations**: "people who read this also liked…" by finding nearby items.
- **Classification and anomaly detection**: spot things that sit far from everything else.

## Tips

- Use the same embedding model for documents and queries, or the maps won't line up.
- Store vectors in a vector database or an index once you have more than a few thousand.
- Re-embed when you switch models; vectors from different models aren't comparable.

> Embeddings: meaning you can measure.

## Sources

- [OpenAI, Vector embeddings guide](https://developers.openai.com/api/docs/guides/embeddings)
