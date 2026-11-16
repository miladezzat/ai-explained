---
title: Positional encoding (RoPE): how Transformers know word order
slug: rope-positional-encoding
description: Why Transformers need positional encoding, how the original sine waves worked, how RoPE rotates queries and keys, and how models stretch past their trained length.
date: 2026-11-16
series: ai-explained
youtube: 2Ognt_14rts
facebook: https://facebook.com/reel/29151863937768398
instagram: https://www.instagram.com/p/DfzW7lIl6-v/
tags: rope, positional encoding, transformers, llm, attention
---
Shuffle the words in a sentence, and attention alone can't tell the difference. **Positional encoding** fixes that.

## Why Transformers need it

The original Transformer "contains no recurrence and no convolution". Attention compares every token with every other token, but nothing in that comparison says which token came first. So the model has to be told where each token sits.

## The original: sine and cosine

The 2017 Transformer used sine and cosine functions of different frequencies to build a distinct pattern for every position. That pattern was **added** to each token's embedding, so the two are summed into one vector.

But often what matters most isn't where a token sits. It's **relative position**: how far apart two tokens are.

## RoPE: rotate instead of add

**RoPE**, rotary position embedding, was introduced in the 2021 RoFormer paper. Instead of adding a pattern, it **rotates**.

- Each query and key vector is rotated by an angle that grows with the token's position.
- When attention takes the dot product of a query and a key, the two rotations combine into their **difference**: the relative distance between the tokens.

In the paper's words, RoPE "encodes the absolute position with a rotation matrix and meanwhile incorporates the explicit relative position dependency in self-attention formulation". Absolute position goes in, and relative position comes out of attention for free.

The vector's dimensions are rotated in pairs, each pair at its own speed, like clock hands running from fast to slow. The paper also lists a useful property: the dependency between tokens decays as their relative distance grows.

## Who uses it

LLaMA removed absolute positional embeddings and instead added RoPE at every layer of the network. Hugging Face's docs describe this as a way to better handle longer sequence lengths.

## Going past the trained length

There's a catch: models still fail to generalize past the sequence length they were trained on. Two well-known fixes work by adjusting RoPE:

- **Position Interpolation** linearly scales position indices down into the range the model was trained on. It extended LLaMA models to context windows of up to 32,768 tokens with minimal fine-tuning, within 1,000 steps.
- **YaRN** (Yet another RoPE extensioN method) refined the approach, needing 10x fewer tokens and 2.5x fewer training steps than previous methods.

> Word order isn't free. RoPE spins it into every query and key.

## Sources

- [Vaswani et al., Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [Su et al., RoFormer: Enhanced Transformer with Rotary Position Embedding](https://arxiv.org/abs/2104.09864)
- [Touvron et al., LLaMA](https://arxiv.org/abs/2302.13971)
- [Hugging Face Transformers docs: Llama](https://huggingface.co/docs/transformers/model_doc/llama)
- [Chen et al., Positional Interpolation](https://arxiv.org/abs/2306.15595)
- [Peng et al., YaRN](https://arxiv.org/abs/2309.00071)
