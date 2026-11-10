---
title: Tokens: how AI actually reads text
slug: tokens
description: AI models don't read words, they read tokens. What a token is, why 100 tokens is about 75 words, and how tokens set both your bill and your limits.
date: 2026-10-28
series: ai-explained
youtube: j1pN1yZWt0o
facebook: https://facebook.com/reel/2050498609001395
instagram: https://www.instagram.com/reel/DfCSWPmJI2E/
tags: tokens, tokenization, llm, ai pricing, context window
---
AI models don't read words. They read **tokens**. Understanding tokens explains how you're billed, why long chats hit a limit, and why some languages cost more than others.

## What is a token?

A token is a chunk of text. Sometimes it's a whole word, like `hello`. Sometimes it's part of a word: a long or rare word such as `unbelievable` may be split into pieces like `un`, `believ` and `able`. Spaces and punctuation get folded into tokens too.

Before a model sees your prompt, a **tokenizer** cuts the text into these pieces and turns each one into a number. The model works only with those numbers, and it writes its answer one token at a time.

## The handy rule of thumb

For English text, OpenAI's guidance is:

- **1 token ≈ 4 characters**
- **100 tokens ≈ 75 words**

So a 1,500-word article is roughly 2,000 tokens. Other languages, code and unusual symbols often need more tokens for the same amount of meaning.

## Tokens are what you pay for

API pricing is per token, usually quoted per million. Input tokens (your prompt) and output tokens (the reply) are priced separately, and **output usually costs more**, often several times more, because the model has to generate each one.

That makes a few habits pay off:

- Trim long system prompts and repeated instructions.
- Don't paste a whole file when a function will do.
- Ask for short answers when you don't need long ones.

## Tokens also set the limit

A model's **context window**, the amount of text it can consider at once, is measured in tokens. Your prompt, the chat history and the model's reply all count toward the same limit. When you run out, older content has to be cut or summarized.

## Try it yourself

Most providers offer a tokenizer tool or a token-counting endpoint. Paste a paragraph in and watch it split. Once you see tokens, prompts start to look like a budget.

> Fewer tokens, lower bill.

## Sources

- [OpenAI Help, What are tokens and how to count them](https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them)
- [Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing)
