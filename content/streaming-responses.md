---
title: Streaming LLM responses
slug: streaming-responses
description: Your AI app goes silent for 20 seconds, then dumps a wall of text. Streaming sends the answer piece by piece. How server-sent events work, and the gotchas.
date: 2026-11-06
series: ai-explained
youtube: QcS-uw8JijI
facebook: https://facebook.com/reel/2056269321720955
instagram: https://www.instagram.com/p/DfZLJiujfC_/
tags: streaming, server-sent events, llm, claude api, ux
---
Your AI app goes silent for twenty seconds, then dumps a wall of text. Users think it's broken. **Streaming** fixes that: the answer arrives piece by piece, so words appear while the model is still writing.

The total time stays about the same. But the wait for the **first word** drops from seconds to a moment, and that's what users feel.

## How it works: server-sent events

Most LLM APIs stream with **server-sent events** (SSE): one HTTP response that stays open and sends small events as they're ready. You turn it on with `stream: true`, and the SDKs hand you the events in a loop.

## The shape of a Claude stream

```text
message_start
content_block_start
content_block_delta   "Hello"
content_block_delta   ", here's"
content_block_delta   " the answer…"
content_block_stop
message_delta         (stop reason, usage)
message_stop
```

Each delta carries a small piece of text. You append it to the screen as it arrives. OpenAI's Responses API works the same way with events like `response.output_text.delta`.

## Gotchas

**Tool calls stream as partial JSON.** Don't parse the arguments until that block is complete.

**Usage arrives near the end**, in the final message delta.

**Errors can arrive mid-stream**, like an overloaded error after text has already started. Keep what arrived and offer a retry. Never assume a stream that started will finish.

**Moderation is harder.** Users see text before it's fully checked, which makes output filtering trickier.

## Streaming also prevents timeouts

Very long answers can exceed HTTP timeouts if you wait for the whole thing. Claude's SDKs require streaming when you ask for a very large `max_tokens`.

## In the UI

- Show a typing cursor while text streams.
- Let users **stop** the stream at any time.
- Keep the scroll position stable so the page doesn't jump.

## When not to stream

Stream anything a person waits to read. Skip it for background jobs that need the full result anyway.

## Tip

Let the SDK collect the stream for you. Most SDKs can stream events to your UI and still give you one final, complete message at the end.

> Stream it. Don't make them wait.

## Sources

- [Claude docs, Streaming Messages](https://platform.claude.com/docs/en/build-with-claude/streaming)
- [OpenAI, Streaming API responses](https://developers.openai.com/api/docs/guides/streaming-responses)
- [MDN, Server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
