---
title: Document-level access control in RAG: filter first
slug: rag-access-control
description: Why RAG apps leak documents users shouldn't see, and how to enforce permissions with chunk tags, query-time filters, and pre- or post-filtering.
date: 2026-11-21
series: ai-explained
youtube: a8ER_Y4kiUE
facebook: https://facebook.com/reel/2438701356865709
instagram: https://www.instagram.com/p/DgA3JyhjHys/
tags: rag, ai security, access control, vector database, ai engineering
---
An intern asks your RAG bot about salaries. It answers. Should it? **Not without document-level access control.**

## Why RAG leaks

A single vector store often holds everything: HR files, contracts, wiki pages. Retrieval ranks chunks by similarity, not by who is allowed to see them. So whatever matches the question can end up in the prompt.

OWASP's Top 10 for LLM Applications lists this under **LLM08: Vector and Embedding Weaknesses**: "Inadequate or misaligned access controls can lead to unauthorized access to embeddings containing sensitive information." The risk grows in multi-tenant setups where many users or apps "share the same vector database", and context can leak from one group to another.

Don't rely on the model to keep secrets. If a chunk reaches the prompt, assume it can reach the answer.

## The rule

Check permissions **before chunks reach the LLM**. OpenFGA's guide puts it this way: the authorization check "should happen after retrieval and before the documents reach the LLM."

## Tag every chunk, filter every query

1. **Store permissions with every chunk**, such as the user and group IDs allowed to read the source document.
2. **Filter at query time** on the current user's groups. Azure AI Search calls this a security filter that "trims search results based on a string containing a group or user identity."
3. **Verify identity first.** That filter is only a string match. Microsoft notes: "There's no authentication or authorization through the security principal." Your app must authenticate the user, then build the filter from verified groups.

## Pre-filtering vs post-filtering

- **Pre-filtering:** list the documents the user can access first (OpenFGA's ListObjects), then pass those IDs as a filter to the vector search. It works well when a user can access relatively few documents.
- **Post-filtering:** search first, then check each result with a batch permission check (BatchCheck). It suits searches that return a manageable number of candidates.

The catch with post-filtering: it "May return fewer than K after filtering." OpenFGA suggests requesting 2 to 3 times more candidates than you need.

## Native enforcement and permission lag

Some search services now enforce source permissions natively. Azure AI Search, for example, can evaluate ACLs from sources like SharePoint or Data Lake storage, using the user's token passed in the `x-ms-query-source-authorization` header.

But permissions change. Azure's indexed ACLs are snapshots with a "roughly daily automatic refresh", and Microsoft states that "Permission refresh doesn't provide immediate revocation."

General practice for sensitive data: sync permission changes as fast as you can, and log which chunks each user received, so you can audit any leak.

> Retrieve only what they're allowed to read.

## Sources

- [OWASP Top 10 for LLM Applications 2025: LLM08 Vector and Embedding Weaknesses](https://genai.owasp.org/llmrisk/llm082025-vector-and-embedding-weaknesses/)
- [Microsoft Learn: Security filters for trimming results in Azure AI Search](https://learn.microsoft.com/en-us/azure/search/search-security-trimming-for-azure-search)
- [Microsoft Learn: Document-level access control in Azure AI Search](https://learn.microsoft.com/en-us/azure/search/search-document-level-access-overview)
- [OpenFGA docs: RAG authorization](https://openfga.dev/docs/modeling/agents/rag-authorization)
