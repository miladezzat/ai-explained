---
title: Vector databases: search by meaning, fast
slug: vector-databases
description: A million documents, one question. Vector databases find the nearest embeddings fast with approximate search like HNSW and IVF. How they work, and when you need one.
date: 2026-11-05
series: ai-explained
youtube: Zhp1YnGCUDU
facebook: https://facebook.com/reel/1506857104593335
instagram: https://www.instagram.com/p/DfWmjm-Fv_f/
tags: vector databases, embeddings, hnsw, pgvector, rag
---
You have a million documents and one question. Comparing the question's embedding with every vector, one by one, is far too slow. That's the job of a **vector database**.

## Quick recap: embeddings

Embeddings turn text into lists of numbers, and similar meanings land close together. A vector database stores those vectors and finds the ones nearest to your question, fast.

## Exact vs approximate search

The **exact** way checks every single vector. That's fine for thousands, painful for millions.

So vector databases use **approximate nearest neighbor** (ANN) search. As the pgvector docs put it, an approximate index "trades some recall for speed".

## HNSW: a graph in layers

The most popular index is **HNSW** (Hierarchical Navigable Small World). Every vector links to its close neighbors, and the links are arranged in layers, from sparse at the top to dense at the bottom.

Search starts on the sparse top layer, jumps toward the query, then drops down a layer and gets closer at every step. It's like finding a street by going country → city → neighborhood.

## IVF: search only nearby clusters

Another option is **IVF** (inverted file index): group the vectors into clusters, then search only the clusters nearest to the query.

The pgvector docs sum up the trade-off: HNSW has better speed for the same recall, but slower build times and more memory; IVFFlat builds faster and uses less memory.

## Settings that matter

- **Recall**: how many of the true nearest neighbors you actually found. Approximate search can miss some. Measure it.
- **Distance**: cosine, dot product or straight-line (Euclidean). Use the one your embedding model was made for.
- **Filters**: real apps need "price under $1,000" or "only this user's docs". Good databases filter **during** the search; filtering afterwards can leave you with fewer results than you asked for.
- **Hybrid search**: mix vector search with keyword search, so exact names and product codes still match.

## Popular picks

- **pgvector**, inside Postgres, if you already run it.
- Dedicated databases like **Pinecone, Qdrant, Weaviate and Milvus**.

## Do you even need one?

With a few thousand vectors, maybe not. A plain array in memory, or your existing database, is enough.

## Where it fits in RAG

In RAG, the vector database is the retrieval step: find the right chunks, then hand them to the model.

> Store meaning. Search by it.

## Sources

- [pgvector README](https://github.com/pgvector/pgvector)
- [Malkov & Yashunin, Efficient and robust approximate nearest neighbor search using Hierarchical Navigable…](https://arxiv.org/abs/1603.09320)
- [Qdrant, Vector search filtering](https://qdrant.tech/articles/vector-search-filtering/)
- [Weaviate docs, Hybrid search](https://docs.weaviate.io/weaviate/search/hybrid)
