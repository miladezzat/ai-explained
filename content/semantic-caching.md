---
title: Semantic caching: same meaning, same answer
slug: semantic-caching
description: Users ask the same question a hundred ways. Semantic caching matches questions by meaning, returns the saved answer, and skips the LLM call. How to tune it safely.
date: 2026-11-10
series: ai-explained
youtube: DV1BnNehAjM
facebook: https://facebook.com/reel/2232759737283508
instagram: https://www.instagram.com/p/DfjeXKMEn9r/
tags: semantic caching, llm cost, embeddings, vector search, gptcache
---
Your users ask the same question a hundred different ways. Why pay the LLM every single time? **Semantic caching** answers once and reuses that answer whenever someone asks the same thing in other words.

## Exact match vs meaning match

A normal cache matches the **exact text**. Change one word, and it misses.

A semantic cache matches by **meaning**. "Reset my password" and "forgot my password" can hit the same entry.

## How it works

1. Turn each question into an **embedding**, and store it in a vector database with its answer.
2. When a new question arrives, compare it with the closest stored question.
3. **Close enough?** Return the cached answer and skip the LLM.
4. **Not close enough?** Call the model as usual, then store the new question and answer for next time.

## The key setting: the similarity threshold

- **Too tight**, and you rarely hit.
- **Too loose**, and answers go wrong.

As Redis puts it, too tight a threshold "may limit the usefulness of the cache while too loose a threshold might reduce the relevance of responses".

The danger is a **false hit**: "cancel my order" and "cancel my subscription" look close, but aren't.

## Does it pay off?

One study on customer-service chatbot questions (Regmi & Pun) cut API calls by **up to 68.8%**, with **over 97%** of cache hits being correct. And a hit costs one quick vector search instead of a full model call, so answers come back far faster.

## Rules for safe caching

- **Expire answers.** Give each entry a time to live: minutes for prices, hours or a day for FAQs.
- **Key personal answers by user**, or one user could see another's reply.
- **Log every hit with its similarity score**, and review the borderline ones before you loosen the threshold.

## Not the same as prompt caching

**Prompt caching** reuses an identical prompt prefix on the provider's side; the model still runs. **Semantic caching** lives in your app and skips the call entirely when a similar question was already answered. You can use both.

## Tools

GPTCache and Redis's semantic cache (RedisVL) give you embedding, search and a threshold out of the box.

> Same meaning, same answer.

## Sources

- [GPTCache (Zilliz)](https://github.com/zilliztech/GPTCache)
- [RedisVL, SemanticCache guide](https://redis.io/docs/latest/develop/ai/redisvl/user_guide/how_to_guides/llmcache/)
- [Redis, What is semantic caching](https://redis.io/blog/what-is-semantic-caching/)
- [Regmi & Pun, GPT Semantic Cache](https://arxiv.org/abs/2411.05276)
- [Anthropic, Prompt caching](https://claude.com/resources/articles/prompt-caching)
