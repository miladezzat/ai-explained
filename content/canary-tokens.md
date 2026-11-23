---
title: Canary tokens: catch system prompt leaks
slug: canary-tokens
description: A canary token is a random string hidden in your system prompt that raises an alert if it shows up in output. Here's how it works, and why it isn't enough.
date: 2026-11-23
series: ai-explained
youtube: ZbodzszVXog
facebook: https://facebook.com/reel/1596634765564399
instagram: https://www.instagram.com/p/DgGAt98nASm/
tags: llm, ai security, prompt injection, owasp, canary tokens
---
Someone just got your app to recite its system prompt. **Would you even know?**

## The problem: system prompt leakage

A prompt leak is when "an attacker manipulates the model to reveal its system instructions" (Gakh and Bahsi, 2025). It's common enough that OWASP gives it its own entry in the Top 10 for LLM Applications: **LLM07:2025 System Prompt Leakage**.

## The tripwire

A canary token is a tripwire: "High-entropy marker strings hidden in system prompts and context that raise an alert when they appear in model output" (Klu).

The recipe is simple:

1. Generate a random string, for example `CANARY-7f3a9c2e`.
2. Put it in the system prompt.
3. Scan every response for that exact string.
4. If it shows up, the prompt leaked. Raise an alert.

In the open-source detectors studied by Gakh and Bahsi, "the canary word is a randomly generated hex string", and "if the canary word appears in the model's response, the canary check scan fires an alarm." Rebuff and Vigil both ship this check.

A few details matter:

- **Randomness.** High entropy means it never appears in normal output by chance, so no false alarms.
- **Freshness.** Generate one per session or per request. Then a leaked token tells you exactly which conversation it came from (general practice).
- **Placement.** Klu notes canaries can go into RAG context and "agent working memory", not just the system prompt.

## Why it isn't enough

Canaries are easy to dodge. An attacker who asks the model to "summarize, translate, or ROT13-encode its instructions" still gets the content, and "Exact-match scanning misses this entirely."

It's not just theory. Gakh and Bahsi found "the implementations of canary word checks in Vigil and Rebuff were not effective at detecting prompt leak attacks."

And timing works against you. "A canary firing means the attack already succeeded at the model layer; it is the last line of defense, not the first."

## The real fix: don't keep secrets in the prompt

OWASP's bigger lesson is that "the system prompt should not be considered a secret, nor should it be used as a security control." In their view, "disclosure of the system prompt itself does not present the real risk"; what's inside it is.

So:

- **No secrets inside.** Credentials, API keys and connection strings "should not be contained within the system prompt language."
- **Enforce rules outside the model.** Don't rely on prompt wording for strict behavior; "rely on systems outside of the LLM", like permissions checked in code.
- **Guardrails on output.** "An independent system that can inspect the output" catches more than an exact-match string check.

Use canaries as a cheap alarm, not as a lock.

> Set the tripwire. Don't trust the prompt.

## Sources

- [OWASP: LLM07:2025 System Prompt Leakage](https://genai.owasp.org/llmrisk/llm072025-system-prompt-leakage/)
- [Gakh and Bahsi: Enhancing Security in LLM Applications: A Performance Evaluation of Early Detection Systems (arXiv 2506.19109)](https://arxiv.org/html/2506.19109v1)
- [Klu: Prompt injection canary tokens](https://klu.ai/glossary/prompt-injection-canary-tokens)
