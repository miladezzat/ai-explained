---
title: LLM API gateways: one door to every model
slug: llm-api-gateways
description: What an LLM gateway between your apps and model providers gives you: one endpoint, virtual keys and budgets, cost tracking, retries, fallbacks and caching.
date: 2026-11-13
series: ai-explained
youtube: UUki6b3wNEE
facebook: https://facebook.com/reel/1173429171917389
instagram: https://www.instagram.com/p/DfsRKODl5QN/
tags: llm gateway, ai gateway, litellm, cloudflare ai gateway, llmops
---
Five teams, three model providers, and nobody knows who spent what. Sound familiar?

## The problem

Without a gateway, every app holds its own API keys, writes its own retries, and keeps its own logs. Switching providers means touching every codebase, and the bill is one big number with no names on it.

## A gateway in the middle

An **LLM gateway** sits between your apps and the model providers. Apps call the gateway; the gateway calls the providers. You get **one endpoint**, often OpenAI-compatible, in front of many providers.

[LiteLLM](https://docs.litellm.ai/docs/simple_proxy)'s open source, self-hosted proxy is a common example: one OpenAI-compatible endpoint for over 100 providers. "You do not change the client code": you point its base URL at the gateway. It now also fronts MCP tools and A2A agents, not just models.

## Keys, budgets and cost

Each user, team or project gets a **virtual key** with its own allowed models, budget and rate limits. The real provider keys stay inside the gateway. And because the gateway records the cost of each request, the bill finally has names on it.

## Reliability

When a provider has a bad day, the gateway helps:

1. **Retry** the call a few times.
2. **Fall back** to another model, in a fixed order.
3. **Cool down** a deployment that keeps failing before trying it again.
4. **Load balance** across several deployments of the same model.

Logs and metrics can flow from one place to tools like Langfuse, Datadog, OpenTelemetry and Prometheus.

## The managed option

Prefer not to run it yourself? [Cloudflare's AI Gateway](https://developers.cloudflare.com/ai-gateway/) says it takes one line of code to start, and adds analytics, logging, rate limiting, request retries and model fallback.

It can also cache responses, but only on an **exact match** of the whole request: the cache key is a hash of the provider, endpoint, model, auth header and full body. Semantic caching, which would match similar questions, is on Cloudflare's roadmap.

## The trade-off

A gateway is one more hop for every call, and every app now depends on it. Run it close to your apps, run more than one instance, and watch its own latency.

| You have... | Gateway? |
|---|---|
| Several teams or providers | Worth it |
| Shared budgets to enforce | Worth it |
| One script and one key | Overkill |

> One door to every model.

## Sources

- [LiteLLM: AI Gateway (proxy)](https://docs.litellm.ai/docs/simple_proxy)
- [LiteLLM: reliability, retries and fallbacks](https://docs.litellm.ai/docs/proxy/reliability)
- [Cloudflare AI Gateway](https://developers.cloudflare.com/ai-gateway/)
- [Cloudflare AI Gateway: caching](https://developers.cloudflare.com/ai-gateway/features/caching/)
