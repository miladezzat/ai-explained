---
title: Rate limits and token budgets: why your LLM app gets a 429
slug: rate-limits-token-budgets
description: How LLM API rate limits work (requests, input and output tokens, token buckets, spend caps) and how to stay under them with retries, backoff and budgets.
date: 2026-11-15
series: ai-explained
youtube: tnjjn0hiCAY
facebook: https://facebook.com/reel/1413262705206897
instagram: https://www.instagram.com/p/DfwWOsCFyqu/
tags: rate limits, llm api, 429, token bucket, ai engineering
---
Your app works in testing, then production hits a **429 Too Many Requests**. Welcome to rate limits.

## What gets capped

LLM APIs cap how much you can send, per organization and per model class. Anthropic, for example, measures three things, each per minute:

- **requests** (RPM),
- **input tokens** (ITPM),
- **output tokens** (OTPM).

Exceed any one of them and you get a 429 error that says which limit you hit.

## A bucket, not a clock

The limits use a **token bucket**: your capacity is refilled continuously up to the maximum, instead of resetting at the top of each minute. That means a limit can bite over shorter windows. In Anthropic's words, "a rate of 60 requests per minute (RPM) might be enforced as 1 request per second." A burst of 60 requests in the first second can fail even though the minute's total looks fine.

## When you hit one

- If the 429 comes with a `retry-after` header, wait that many seconds, then retry.
- If there's no header, back off exponentially (1 s, 2 s, 4 s, 8 s) and add random jitter, so your retries don't all land at the same moment.

## Read the headers

Every response tells you where you stand. Anthropic returns headers such as `anthropic-ratelimit-tokens-limit`, `anthropic-ratelimit-tokens-remaining` and `anthropic-ratelimit-tokens-reset`, with the same trio for requests, input tokens and output tokens. Use them to slow down before you hit the wall.

## Details that help

- **Cached input is cheaper on limits too.** By default, Anthropic's input token limit counts only uncached input, so cache reads don't count toward it.
- **`max_tokens` is free here.** It doesn't factor into the output token limit, so a generous ceiling costs you nothing on rate limits.
- **Ramp limits.** After a sharp jump in traffic, you can get a 429 even while you're under your limits. Grow traffic gradually.
- **Tiers.** Limits grow with usage tiers, and organizations move up automatically based on usage history and account standing.

## The spend limit

On top of rate limits there's a **spend limit**: a maximum monthly cost for the whole organization. Hit it and API usage pauses until 00:00 UTC on the first day of the next month. Retrying won't help.

## Your own token budgets

Provider limits are shared by every user and feature in your organization, so one noisy feature can starve the rest. Set your own **token budgets**: cap tokens per user, per feature and per day, queue requests instead of firing them all at once, watch the remaining headers, and throttle before the 429, not after.

> Rate limits aren't errors to fight. They're a budget to plan.

## Sources

- [Anthropic API docs: Rate limits](https://platform.claude.com/docs/en/api/rate-limits)
