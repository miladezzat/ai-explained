---
title: Byte-pair encoding tokenizers: how models learn their tokens
slug: bpe-tokenizers
description: Byte-pair encoding builds a tokenizer by merging the most frequent pairs of symbols, step by step. A worked example, byte-level BPE in GPT-2, and why rare words cost more tokens.
date: 2026-11-28
series: ai-explained
youtube: SqbjRxTnMS4
facebook: https://facebook.com/reel/1137618842376369
instagram: https://www.instagram.com/p/DgSO5vUDvUp/
tags: llm, tokenization, tokenizers, bpe, nlp
---
Where do a model's tokens come from? **Many models learn them with byte pair encoding.** The Hugging Face Transformers docs call BPE "the most popular tokenization algorithm in Transformers," and the Hugging Face course lists GPT, GPT-2, RoBERTa, BART and DeBERTa among the models that use it.

## Where BPE comes from

The course says BPE "was initially developed as an algorithm to compress texts." In 2015, Sennrich, Haddow and Birch used it for neural machine translation, "encoding rare and unknown words as sequences of subword units" with "a segmentation based on the byte pair encoding compression algorithm."

## How training works

The Transformers docs sum it up: "BPE starts with individual characters and iteratively merges the most frequent adjacent pair."

The Hugging Face course walks through a tiny example. The corpus is five words: "hug" seen 10 times, "pug" 5, "pun" 12, "bun" 4 and "hugs" 5. The base vocabulary is just the characters: b, g, h, n, p, s, u.

Next, the algorithm will "search for the most frequent pair of existing tokens." Here, "u" followed by "g" appears 20 times across hug, pug and hugs. "Thus, the first merge rule learned by the tokenizer is `("u", "g") -> "ug"`." Then it repeats: "u" and "n" become "un", then "h" and "ug" become "hug."

It keeps going to "add new tokens until the desired vocabulary size is reached by learning merges." That size is a design choice: "the target vocabulary size, which equals the base vocabulary size plus the number of merges."

## Tokenizing new text

To encode new text, the tokenizer splits it into characters and then applies "the merge rules learned in order." With the three merges above, "bug" becomes ["b", "ug"].

There is a catch. "mug" becomes ["[UNK]", "ug"], because "m" was never in the base vocabulary. A character the tokenizer never saw becomes an unknown token.

## Byte-level BPE

Byte-level BPE fixes that. The base vocabulary is the 256 possible byte values, so "the base vocabulary has a small size (256), but every character you can think of will still be included." As a result, "GPT-2 doesn't actually have an unknown token."

The Transformers docs give GPT-2's numbers: "GPT-2 uses byte-level BPE with a vocabulary size of 50,257 (256 byte tokens + 50,000 merges + special end-of-text token)." The same docs name Llama, Gemma and Qwen2 among the models that use BPE.

## Why this matters for your prompts

General practice: token counts follow the merges. A common word was merged into one or a few tokens during training. A rare word, a typo or text in a language the tokenizer saw less often is split into many smaller pieces, so it costs more tokens and takes more of the context window. If token counts surprise you, run your text through the model's tokenizer and look at the pieces.

> Merge what repeats. Split the rest.

## Sources

- [Hugging Face LLM Course: Byte-Pair Encoding tokenization](https://huggingface.co/learn/llm-course/chapter6/5)
- [Hugging Face Transformers docs: Tokenization algorithms](https://huggingface.co/docs/transformers/tokenizer_summary)
- [Sennrich, Haddow, Birch: Neural Machine Translation of Rare Words with Subword Units](https://arxiv.org/abs/1508.07909)
