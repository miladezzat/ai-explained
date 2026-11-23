---
title: LLM cost attribution: who spent the tokens?
slug: llm-cost-attribution
description: How to tie every LLM dollar to a team, feature or customer: log token usage, use standard field names, tag calls, roll up agent runs and measure unit economics.
date: 2026-11-23
series: ai-explained
youtube: oJvtS7cunrs
facebook: https://facebook.com/reel/1143907224718284
instagram: https://www.instagram.com/p/DgE8mBYHxK5/
tags: llm, finops, observability, ai costs, ai engineering
---
Your AI bill doubled this month. Which feature did it? **Without cost attribution, nobody knows.**

## What cost attribution means

Cost attribution means tying every LLM dollar to a team, a feature, or a customer. It's harder than it sounds. The FinOps Foundation notes that "Higher volatility of costs makes trend-based forecasting in general more challenging," and that "Allocation of costs may be more complex, particularly if many projects at once are using the same types of services."

## Start with the token

The unit of LLM spend is the token. You pay for input tokens and output tokens, often at different prices. So the first step is to log usage on every call: input tokens, output tokens, and the model that answered.

You don't have to invent field names. OpenTelemetry's GenAI semantic conventions (still in Development status) define them:

- `gen_ai.usage.input_tokens`: "The number of tokens used in the GenAI input (prompt)." It "SHOULD include all types of input tokens, including cached tokens."
- `gen_ai.usage.output_tokens`: "The number of tokens used in the GenAI response (completion)."
- `gen_ai.usage.cache_read.input_tokens` and `gen_ai.usage.cache_creation.input_tokens` for prompt caching.
- `gen_ai.response.model`, which "must be the exact name of the model actually used", not just the one you requested.

## Tag every call

Token counts tell you how much. Tags tell you who and why. General practice is to attach metadata to every call:

```json
{"team": "support", "feature": "ticket-summary",
 "customer": "acme", "env": "prod"}
```

Then you can group spend by any of them.

## Agents complicate it

With agents, one user request can trigger many model calls: planning, tool calls, retries. Roll them up under one trace or task ID so the whole run is costed together. The FinOps Foundation is candid that this is still open, listing a "Lack of generally accepted frameworks for cost allocation across multi-agent workloads."

## Unit economics

Raw spend isn't enough. FinOps suggests unit metrics such as "Cost Per Inference = Total Inference Costs / Number of Inference Requests."

Even better (general practice): tie cost to outcomes the business already tracks, like cost per resolved ticket or cost per active user. A feature that costs more but resolves more tickets may be the better deal.

## Keep it honest

- **Budgets and alerts per feature**, so one runaway agent loop doesn't burn the month's budget.
- **Reconcile** your own usage logs with the provider's bill regularly, since prices and discounts change.

> Tag every token.

## Sources

- [FinOps Foundation: FinOps for AI](https://www.finops.org/framework/technology-categories/ai)
- [OpenTelemetry GenAI semantic conventions: inference spans](https://raw.githubusercontent.com/open-telemetry/semantic-conventions-genai/2e994c6d59a93bb4fc1752c5378eedb9b8e14d6b/docs/gen-ai/gen-ai-spans.md)
