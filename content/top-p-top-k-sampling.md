---
title: Top-p vs top-k sampling: what the knobs actually cut
slug: top-p-top-k-sampling
description: Top-k, top-p (nucleus) and min-p sampling all cut the long tail of unlikely tokens. How each one decides where to cut, and why a fixed k fits badly.
date: 2026-11-12
series: ai-explained
youtube: ybN7lVt9F2I
facebook: https://facebook.com/reel/2056227315069673
instagram: https://www.instagram.com/p/Dfpsus-GPtI/
tags: top-p, top-k, nucleus sampling, min-p, llm sampling
---
You've seen settings like `top_k = 50` and `top_p = 0.9`. They're on almost every model playground. But what do they actually cut?

## Quick recap: scores, then a roll

At each step a language model scores every possible next token, turns the scores into probabilities, and samples one. Temperature reshapes those odds; top-k, top-p and min-p decide **which tokens are allowed in the roll at all**.

## The problem is the tail

After "The sky is", a few tokens are likely: *blue*, *clear*, *gray*. Then come thousands of unlikely ones. Each is tiny, but **together** they are not. Sample from the full list long enough and you will eventually pick nonsense. The nucleus sampling paper describes the fix as "truncating the less reliable tail of the distribution".

## Top-k: a fixed number

**Top-k** keeps only the k likeliest tokens and throws away the rest. A 2018 story-generation paper by Fan et al. sampled "from the k = 10 most likely candidates". Set k to one and you get greedy decoding: always the single likeliest token.

The catch is that one fixed k fits badly. Sometimes only two words make sense next; sometimes hundreds do.

- On a **flat** distribution, a small k cuts good options.
- On a **peaked** one, a big k lets junk in.

## Top-p: the nucleus

**Top-p**, or **nucleus sampling**, comes from Holtzman et al.'s 2019 paper *The Curious Case of Neural Text Degeneration*, published at ICLR 2020. Sort the tokens by probability and keep the smallest set whose probabilities add up to at least p.

Because it's based on probability mass, not a count, the set adapts. With p = 0.9, a confident step might keep two tokens, and an open-ended one two hundred (illustrative numbers). In the paper's words, the size "will adjust dynamically based on the shape of the probability distribution".

With either method, the surviving tokens' odds are rescaled to add up to one, and then the model samples.

## Min-p: a cutoff that moves

**Min-p** is a newer idea. It drops any token far less likely than the top one: the threshold uses "the top token's probability as a scaling factor". With min_p = 0.1 and a top token at 0.60, anything under 0.06 goes. When the model is sure, the cutoff is strict; when it isn't, it's looser.

## Defaults, stacking, and the future

| Setting | Hugging Face Transformers default |
|---|---|
| top_k | 50 |
| top_p | 1.0 (keeps everything) |
| min_p | not set |

You can stack these, but each one shrinks the pool further. Change one at a time and test on your real prompts.

And on some new models, the knobs are going away: Google's docs say "Gemini 4 and Gemini 3.6+ models ignore custom values for temperature, top_p, and top_k."

> Cut the tail, keep the sense.

## Sources

- [Fan et al., Hierarchical Neural Story Generation (2018)](https://arxiv.org/abs/1805.04833)
- [Holtzman et al., The Curious Case of Neural Text Degeneration (ICLR 2020)](https://arxiv.org/abs/1904.09751)
- [Nguyen et al., min-p sampling](https://arxiv.org/abs/2407.01082)
- [Hugging Face Transformers: GenerationConfig](https://huggingface.co/docs/transformers/main_classes/text_generation)
- [Google: Gemini prompting strategies](https://ai.google.dev/gemini-api/docs/prompting-strategies)
