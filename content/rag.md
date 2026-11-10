---
title: RAG: retrieval-augmented generation
slug: rag
description: Models only know what they were trained on. RAG looks up the right facts from your own documents first, then has the model answer from them.
date: 2026-10-25
series: ai-explained
youtube: uqnn_i49ehE
facebook: https://facebook.com/reel/998385966644169
tags: rag, retrieval, embeddings, vector search, llm
---
A language model only knows what was in its training data. It doesn't know your company's docs, last week's policy change, or the contents of your support tickets. Ask anyway and it may guess. **RAG**, retrieval-augmented generation, fixes that by looking things up first.

## The idea in one line

Before the model answers, **retrieve** the most relevant pieces of your own content, **add** them to the prompt, and let the model **generate** an answer from them.

The term comes from a 2020 paper by Patrick Lewis and colleagues at Facebook AI Research, which combined a language model with a searchable index of documents so answers could draw on knowledge the model itself didn't store.

## How a RAG pipeline works

**Once, ahead of time (indexing):**

1. Split your documents into chunks, a few paragraphs each.
2. Turn each chunk into an **embedding**, a vector that captures its meaning.
3. Store the vectors in a vector database or search index.

**Every question (retrieval and generation):**

1. Embed the user's question.
2. Find the chunks whose vectors are closest to it.
3. Put those chunks into the prompt with an instruction like "Answer using only the context below, and say if it isn't there."
4. The model answers, ideally citing which chunks it used.

## Why it's so popular

- **Fresh knowledge.** Update a document and the next answer uses it. No retraining.
- **Your private data.** The model can answer from content it never saw in training.
- **Fewer hallucinations.** Answers are grounded in real text, and you can show the sources.
- **Cheaper than fine-tuning** for most "know our stuff" problems.

## Where RAG goes wrong

Most RAG bugs are retrieval bugs. If the right chunk never comes back, the model can't use it. The usual fixes:

- better chunking (keep related text together),
- hybrid search (keywords plus embeddings),
- a reranker to reorder the top results,
- and evals that check whether the right chunks were found, not just whether the answer sounds good.

> Look it up, then answer.

## Sources

- [Lewis et al., Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (2020)](https://arxiv.org/abs/2005.11401)
- [OpenAI, Retrieval guide](https://developers.openai.com/api/docs/guides/retrieval)
- [Anthropic, Contextual Retrieval](https://www.anthropic.com/news/contextual-retrieval)
