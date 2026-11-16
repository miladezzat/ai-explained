---
title: Logprobs: how sure was your LLM about that answer?
slug: logprobs
description: What token log probabilities are, how to turn them into percentages, how to request them, and four practical ways developers use them.
date: 2026-11-16
series: ai-explained
youtube: z4q73_w3jNs
facebook: https://facebook.com/reel/1196210339401766
instagram: https://www.instagram.com/p/Dfy7Fp2F4rX/
tags: logprobs, llm, confidence, perplexity, ai engineering
---
Your model says "positive". But how sure was it? **Logprobs** tell you.

## What a logprob is

A language model writes one token at a time. At each step it has a probability for every possible next token, and it picks one. A **logprob** is the log of the probability of the token it actually chose.

- A logprob of **0** means 100% probability.
- Every other value is **negative**, and lower means less likely.

To turn a logprob back into a probability, take `e` to that power: `p = exp(logprob)`. So a logprob of -0.1 is about 90%, and -2.3 is about 10%.

## How to get them

In the OpenAI API, set `logprobs` to `true` to get a logprob for each output token, and set `top_logprobs` to also get the most likely alternative tokens at each position. Each token also comes with its bytes, which helps when an emoji or special character is split across several tokens. Gemini responses carry log probability scores too (for example an average logprob per candidate), but not every API exposes them.

## Four ways to use them

1. **Classification confidence.** Ask the model for a one-word label, then read the probability of that label. If it's below your threshold, send the item to a human instead of trusting a coin flip.
2. **Checking answers in Q&A and RAG.** Ask the model whether the retrieved text actually answers the question, and read how sure its "yes" is. A shaky yes is a sign to fall back or say "I don't know".
3. **Highlighting.** Color the low-probability tokens in a generated answer, so reviewers can see exactly where the model hesitated.
4. **Autocomplete.** Only suggest the next words when the model is confident, and stay quiet otherwise.

## Perplexity

Average the logprobs of a piece of text, negate the result, and exponentiate it: that's **perplexity**, `exp(-mean(logprobs))`. Lower perplexity means the text surprised the model less.

## The big caveat

**Confidence isn't correctness.** As the OpenAI cookbook puts it, confidence measures how certain the model is, not whether the answer is right. A model can be very sure and still wrong, so treat logprobs as a signal, not a verdict.

The top alternatives are useful for debugging too: they show you what else the model almost said.

> Don't just read the answer. Read how sure the model was.

## Sources

- [OpenAI Cookbook: Using logprobs](https://developers.openai.com/cookbook/examples/using_logprobs)
- [Gemini API reference: generateContent](https://ai.google.dev/api/generate-content)
