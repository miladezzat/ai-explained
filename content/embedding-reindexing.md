---
title: Embedding model upgrades and reindexing: never mix vectors
slug: embedding-reindexing
description: Why you can't swap the embedding model behind a RAG app without re-embedding everything, and how to migrate with side-by-side collections, dual writes and an alias switch.
date: 2026-11-20
series: ai-explained
youtube: kPanFMQnOo8
facebook: https://facebook.com/reel/2056582985057299
instagram: https://www.instagram.com/p/Df-S2dvjo88/
tags: embeddings, rag, vector database, reindexing, ai engineering
---
A better embedding model just came out. Can you just switch? **Not without reindexing.**

## Why you can't just switch

New embedding models often promise better retrieval or lower cost, so the upgrade is tempting. Here's the catch: "Embeddings that different models generate aren't comparable." Each model maps text in its own way, and even when the dimensions match, the vectors still don't line up.

Queries are part of this too: "Your query embeddings must come from the same model as your stored embeddings." If you mix them, search quietly gets worse, and nothing throws an error to warn you.

So the rule is simple: re-embed your entire corpus with the new model.

## Measure first

Before you migrate, test. As Qdrant's docs put it, a new embedding model "is not automatically better on your data, so measure it before you move traffic." Run retrieval on a representative sample of your own data with both models and compare.

## Migrating with zero downtime

The common pattern is a side-by-side, or blue-green, migration:

1. **Build a new collection** for the new model, while the old one keeps serving traffic.
2. **Turn on dual writes**, so every new document goes into both collections.
3. **Backfill**: re-embed the existing documents in the background, in batches, into the new collection.
4. **Flip the alias.** Your app talks to an alias, "a pointer to an underlying collection," so the code never changes. When the new collection is ready, you point the alias at it. In Elasticsearch, that switch is a single atomic call to the `_aliases` endpoint.
5. **Keep a way back.** If something's wrong, point the alias back to the old collection. Rollback is that simple.
6. **Clean up.** After an observation period, stop dual writes and delete the old collection.

Some databases also let one record hold two named vectors, so the old and new embeddings live side by side during the move instead of in two collections.

## Habits that help

A few practical habits (general practice, not rules from the sources):

- **Tag every vector** with the model name and version, so you always know what's in your index.
- **Budget for it.** Reindexing means embedding everything again, and storing two copies for a while.

> New model, new index. Never mix the two.

## Sources

- [MongoDB docs: Migrate to a new embedding model](https://www.mongodb.com/docs/voyageai/tutorials/migrate-embedding-model/)
- [Qdrant docs: Migrate to a New Embedding Model with Zero Downtime](https://qdrant.tech/documentation/tutorials-operations/embedding-model-migration/)
- [Weaviate docs: Collection aliases](https://docs.weaviate.io/weaviate/tutorials/collection-aliases)
- [Elasticsearch: The Definitive Guide, Index aliases](https://www.elastic.co/guide/en/elasticsearch/guide/current/index-aliases.html)
