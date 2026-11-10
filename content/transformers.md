---
title: Transformers and attention, explained
slug: transformers
description: ChatGPT, Claude and Gemini all share one idea from 2017: the transformer. How attention works, what queries, keys and values do, and why long prompts cost more.
date: 2026-11-01
series: ai-explained
youtube: MDNSfVTM_xg
facebook: https://facebook.com/reel/1433466052308873
instagram: https://www.instagram.com/p/DfMuCJ7jkd-/
tags: transformers, attention, llm, neural networks, ai basics
---
ChatGPT, Claude, Gemini. What do they all have in common? One idea from 2017: the **transformer**. It's the T in GPT.

## Where it came from

The transformer was introduced in a Google paper called *Attention Is All You Need* (Vaswani et al., 2017). A transformer reads your text as tokens and predicts the next one. The key idea inside is **attention**.

## The problem it solved

Older models (recurrent networks) read text one word at a time, left to right. That was slow, because each step had to wait for the last, and in long sentences they tended to forget the beginning.

Transformers look at **all the tokens at once**. That's a big reason they train so well on GPUs, which are built to do many calculations in parallel.

## Attention in one example

Take this sentence from Google's blog post on the paper:

> The animal didn't cross the street because **it** was too tired.

What does "it" mean? Attention links "it" to "animal". Change "tired" to "wide", and "it" points to "street" instead. Attention lets every token look at every other token and decide which ones matter for its meaning.

## Queries, keys and values

Under the hood, each token makes three vectors:

- a **query**: what am I looking for?
- a **key**: here's what I have.
- a **value**: here's the information I carry.

Each token's query is compared with every key. Good matches get high scores. The token then takes a weighted mix of the values, so its meaning now includes its context.

## Many heads, many layers

There isn't one attention but many **heads** running side by side. One may track grammar, another who did what to whom. Attention alone doesn't know word order, so models add **position information** to every token. Then they stack dozens of these layers, each building a richer understanding than the last.

## The catch

Every token compares itself with every other token. Double the text, and the attention work grows about four times. That's one reason context windows have limits, and why long prompts are slower and cost more.

> Attention is all you need.

## Sources

- [Vaswani et al., Attention Is All You Need (Google, 2017)](https://arxiv.org/abs/1706.03762)
- [Google Research blog, Transformer](https://research.google/blog/transformer-a-novel-neural-network-architecture-for-language-understanding/)
