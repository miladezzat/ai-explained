---
title: Stop sequences: tell the model exactly when to stop
slug: stop-sequences
description: Stop sequences make an LLM stop generating at a string you choose. How they work in the OpenAI and Claude APIs, how to read stop_reason, and when to use them.
date: 2026-11-26
series: ai-explained
youtube: UgfH2zL3epI
facebook: https://facebook.com/reel/1959924474992504
instagram: https://www.instagram.com/p/DgNFS2ijrti/
tags: llm, prompt engineering, claude api, openai api, ai engineering
---
Your model writes the answer, then keeps going. **A stop sequence ends it right there.** It is one of the simplest parameters in any LLM API, and one of the most useful.

## What a stop sequence is

OpenAI's help center puts it plainly: "Stop sequences are used to make the model stop generating tokens at a desired point." You pass a string, and the moment the model produces it, generation ends.

```python
response = client.messages.create(
    model=MODEL,
    max_tokens=1024,
    stop_sequences=["END"],
    messages=[{"role": "user", "content": "Summarize this, then write END."}],
)
```

Two details differ by provider:

- **OpenAI** calls the parameter `stop`. "The model response will not contain the stop sequence and you can pass up to four stop sequences."
- **Claude** takes a list called `stop_sequences`.

## Why did it stop?

Claude's docs: "Every Messages API response includes a `stop_reason` field that tells you why Claude stopped generating." The common values:

| stop_reason | Meaning |
|---|---|
| `end_turn` | The model finished naturally. |
| `stop_sequence` | "Claude emitted one of your `stop_sequences`." |
| `max_tokens` | It ran out of room. "Raise `max_tokens` or continue the response." |

When the reason is `stop_sequence`, the response's `stop_sequence` field tells you which one matched, so your code can branch on it. Always check `stop_reason` before trusting an answer: a `max_tokens` stop means the output was cut off mid-thought.

## Where they help

General practice from building with them:

- **Exactly one item.** Ask for a numbered list and stop at `2.` to get only the first entry.
- **Few-shot prompts.** If your examples use labels like `Input:` and `Output:`, stop at the next `Input:` so the model does not invent more examples.
- **Cost.** Stopping early saves output tokens, and you pay for every one.

## Pick strings carefully

A stop sequence fires on any match. A common word like "Note" can cut an answer in half the first time the model uses it naturally. Choose rare, unique markers like `END` or `###`.

## Not supported everywhere

Some newer reasoning models reject the parameter. On the OpenAI developer forum, a developer reported `400 Unsupported parameter: 'stop' is not supported with this model` for GPT-5.4, and a reply quoted the API reference: "Not supported with latest reasoning models `o3` and `o4-mini`." Check the docs for your model.

When stop sequences are not available, you have fallbacks:

- **Structured output,** so the response has a defined end.
- **A clear marker** the model writes, which you parse and cut at yourself.
- **Stop on your side when streaming:** close the stream once you have what you need.

> Say when to stop. Save the rest.

## Sources

- [Claude docs: Handling stop reasons](https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons)
- [OpenAI Help Center: How do I use stop sequences in the OpenAI API?](https://help.openai.com/en/articles/5072263-how-do-i-use-stop-sequences-in-the-openai-api)
- [OpenAI developer community: Does GPT-5.4 not support stop sequences?](https://community.openai.com/t/does-gpt-5-4-not-support-stop-sequences-with-the-chat-completions-api/1378338)
