---
title: Speculative decoding: faster LLMs, same output
slug: speculative-decoding
description: A small model can make a big one faster with exactly the same output. How speculative decoding drafts tokens and verifies them in one pass, and when it helps.
date: 2026-11-09
series: ai-explained
youtube: 3UukAmjprGk
facebook: https://facebook.com/reel/1700596078155686
instagram: https://www.instagram.com/p/DfhU7nSDd7F/
tags: speculative decoding, llm inference, latency, draft model, gpu
---
A small model can make a big one faster, with **exactly the same output**. That's **speculative decoding**.

## Why generation is slow

Generating text is slow because each token is one step, and every step reads all of the model's weights from memory. Chips can do hundreds of trillions of operations per second, but memory moves only trillions of bytes per second. The math sits waiting for data.

That has a useful side effect: checking **several** tokens at once costs about the same as producing **one**.

## How it works

1. A small, fast **draft model** guesses the next few tokens.
2. The big model checks all the guesses in **one parallel pass**, and keeps the ones it agrees with.
3. At the first wrong guess, it throws away the rest and writes the correct token itself.
4. Repeat.

A special sampling rule (a modified rejection sampling scheme) keeps the big model's probability distribution, so the output matches running the big model alone.

Why it pays off: many tokens are easy, like a closing bracket or the end of a common phrase. The draft gets those right, so several tokens land per pass.

## The results

- The original paper (Leviathan et al.) showed **2 to 3 times** faster generation on T5-XXL.
- DeepMind reported **2 to 2.5 times** on Chinchilla 70B.
- It's in production: Google says it helps AI Overviews in Search answer faster.

## Drafts without a draft model

The guesses don't have to come from a separate model:

- **N-gram lookup** copies spans from the prompt. Great when the answer repeats your input, like editing code.
- **EAGLE** and **multi-token prediction** train small heads on the big model to guess ahead.

APIs offer a cousin of this: OpenAI's **Predicted Outputs**. Pass the code you expect back, and an edit to it comes back faster.

## When it helps

It shines at **low traffic**, when latency matters most. Under heavy load the gains shrink, because the GPU is already busy with other requests.

## Tip

If you self-host, test it on your own prompts and watch the **acceptance rate**. More accepted guesses means more speed.

> Guess fast, check once.

## Sources

- [Leviathan, Kalman, Matias, Fast Inference from Transformers via Speculative Decoding](https://arxiv.org/abs/2211.17192)
- [Chen et al. (DeepMind), Accelerating LLM Decoding with Speculative Sampling](https://arxiv.org/abs/2302.01318)
- [Google Research, Looking back at speculative decoding (2024-12-06)](https://research.google/blog/looking-back-at-speculative-decoding/)
- [vLLM docs, Speculative Decoding](https://docs.vllm.ai/en/latest/features/speculative_decoding/)
- [OpenAI, Predicted Outputs](https://developers.openai.com/api/docs/guides/predicted-outputs)
