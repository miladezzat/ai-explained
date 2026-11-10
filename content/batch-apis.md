---
title: Batch APIs: cut your LLM bill in half by waiting
slug: batch-apis
description: Batch APIs run LLM requests in the background at 50% of the normal price. How they work, their limits, and which jobs to move to a batch.
date: 2026-11-10
series: ai-explained
youtube: bQs8L6xdwrI
facebook: https://facebook.com/reel/2021704715168312
instagram: https://www.instagram.com/p/Dfj5_DgDOb5/
tags: batch api, llm cost, openai, anthropic, gemini, evals
---
You can cut your LLM bill in half just by waiting. Most of the work an app sends to a model doesn't need an answer this second, and **batch APIs** charge half price for exactly that kind of work.

## Live calls vs work nobody is waiting on

Most apps call the model and wait for each answer. That's right for chat, where a person is watching the screen. But plenty of jobs have nobody waiting on them:

- running evals
- classifying a big dataset
- embedding your docs

A batch API takes all those requests at once and processes them **asynchronously**, in the background.

## Half the price

OpenAI, Anthropic and Google all charge **50% of the standard price** for batch requests. Same models, half the cost.

## How a batch works

You upload a **JSONL** file with one request per line. Each line has a `custom_id` and the normal request body:

```json
{"custom_id": "q-1", "method": "POST", "url": "/v1/responses", "body": {...}}
{"custom_id": "q-2", "method": "POST", "url": "/v1/responses", "body": {...}}
```

Then you submit the batch, and it moves through states: **validating**, **in progress**, then **completed**. The promise is a **24-hour window**, and Anthropic says most batches finish in under an hour.

## Things to get right

- **Results come back in any order.** Match them to requests by `custom_id`, never by line number.
- **Batches are big.** OpenAI allows 50,000 requests per batch. Anthropic allows 100,000 requests or 256 MB, whichever comes first.
- **Rate limits are separate.** At OpenAI, batch rate limits are separate from the normal per-model limits, so a huge batch doesn't eat into your live traffic.
- **Discounts stack.** On Anthropic, the batch discount stacks with prompt caching, so a shared system prompt gets cheaper still.
- **Some requests can fail or expire.** Check each result's status, and resubmit only the ones that didn't succeed.

## When to batch, and when not to

| Batch it | Call it live |
|---|---|
| Evals and test suites | Chat and assistants |
| Bulk content generation | Anything a user is waiting on |
| Moderation of a backlog | Real-time features |
| Embedding a document set | |

A common pattern: collect the day's work, submit one batch, and read the results the next morning.

## Quick tip

Start with your eval suite. It runs often, nobody is waiting on it, and it's an easy 50% saving.

> Not urgent? Batch it, pay half.

## Sources

- [OpenAI, Batch API guide](https://developers.openai.com/api/docs/guides/batch)
- [Anthropic, Message Batches](https://platform.claude.com/docs/en/build-with-claude/batch-processing)
- [Google, Gemini Batch API](https://ai.google.dev/gemini-api/docs/batch-mode)
