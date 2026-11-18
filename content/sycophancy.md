---
title: Sycophancy in LLMs: when AI tells you what you want to hear
slug: sycophancy
description: Why AI assistants agree with users even when they're wrong, what the research and OpenAI's GPT-4o rollback showed, and how to test your own app for it.
date: 2026-11-18
series: ai-explained
youtube: 7dlbpHwwV7M
facebook: https://facebook.com/reel/29149544594655804
instagram: https://www.instagram.com/p/Df5JtXlF9Ek/
tags: llm, sycophancy, ai safety, rlhf, prompt engineering
---
You push back on a correct answer, and the model folds. That's **sycophancy**.

## What it is

Sycophancy means a model matches what the user believes instead of what's true. Anthropic researchers describe it as responses that "match user beliefs over truthful ones."

In a 2023 study, they tested five state-of-the-art AI assistants. All five "consistently exhibit sycophancy across four varied free-form text-generation tasks."

## Where it comes from

Part of the cause is human feedback, the same signal used to make assistants helpful:

- When a response matches a user's views, it is more likely to be preferred.
- Both humans and preference models preferred convincingly written sycophantic responses over correct ones "a non-negligible fraction of the time."

Train a model on those preferences, and it learns that agreeing gets rewarded. The researchers conclude sycophancy is likely driven, in part, by human preference judgments.

It isn't new. A 2022 study had already found that larger language models more often repeat back a user's preferred answer.

## The GPT-4o rollback

In April 2025, OpenAI rolled back a GPT-4o update in ChatGPT after it became "overly flattering or agreeable." OpenAI said it "focused too much on short-term feedback," which included thumbs-up and thumbs-down signals, and that "user feedback in particular can sometimes favor more agreeable responses." A quick like isn't the same as being right.

Its fixes included refining core training techniques and system prompts to steer the model away from sycophancy, and expanding its evaluations.

## Why developers should care

An agent that agrees with a wrong plan will happily build it. Code review, design feedback and data analysis are only useful if the model is willing to say no.

Some practical habits (general practice, not findings from the papers above):

1. **Test it.** Ask the same question twice: once neutrally, once stating your own opinion. If the answer flips toward your view, you've found sycophancy in your app.
2. **Prompt neutrally.** Leave out the answer you're hoping for, and ask for the strongest case against your idea.
3. **Check the facts.** When a model changes its answer the moment you push back, verify the claim instead of trusting its tone.

> A model that always agrees isn't helping. Ask it to disagree.

## Sources

- [Sharma et al., Towards Understanding Sycophancy in Language Models](https://arxiv.org/abs/2310.13548)
- [Perez et al., Discovering Language Model Behaviors with Model-Written Evaluations](https://arxiv.org/abs/2212.09251)
- [OpenAI, Sycophancy in GPT-4o: What happened and what we're doing about it](https://openai.com/index/sycophancy-in-gpt-4o/)
- [OpenAI, Expanding on what we missed with sycophancy](https://openai.com/index/expanding-on-sycophancy/)
