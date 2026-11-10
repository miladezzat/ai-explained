---
title: Open-weight vs open-source AI models
slug: open-weight
description: Lots of AI models are called open, but most aren't open source. What open weights give you, what the OSI's Open Source AI Definition requires, and how to check.
date: 2026-11-04
series: ai-explained
youtube: ZW_UR284CCU
facebook: https://facebook.com/reel/2049449855709903
instagram: https://www.instagram.com/p/DfUBeMeDUi6/
tags: open weight, open source ai, llama, licensing, open models
---
Lots of AI models are called "open". Most of them aren't open source. The difference matters when you build on them.

## Open weights: the cake, not the recipe

An **open-weight** model gives you the trained weights: the file you download and run. But you usually don't get the training data or the training code. It's like getting a finished cake without the recipe.

## What open source AI actually means

In October 2024, the Open Source Initiative published **the Open Source AI Definition 1.0**. It requires four freedoms, for any purpose:

1. **Use** the system.
2. **Study** how it works.
3. **Modify** it.
4. **Share** it.

And it requires three parts to be available: the **parameters** (weights), **the complete code** to train and run the model, and enough **detail about the training data** that a skilled person could build a substantially equivalent system.

## Three real examples

**Meta's Llama 3.1: open weights with rules.** You can download the weights, but the license adds conditions. Companies with over 700 million monthly active users must request a separate license from Meta, and everyone must follow Meta's acceptable use policy. That's open weight, not open source.

**Mistral 7B: a standard open license.** Mistral released it under Apache 2.0, which it said "can be used without restrictions". Still, the training data isn't released.

**AI2's OLMo: fully open.** It releases the weights, the training data and the code.

**Closed models** give you none of that. You send requests to an API and get answers back.

## Think of it as a spectrum

Closed API → open weights with a custom license → open weights with a standard license → fully open.

## Why it matters

- **Open weights** let you run a model yourself, offline, and fine-tune it.
- **Full openness** also lets you check how it was made, and reproduce it.

## Before you ship, read the license

Look for:

- limits on the number of users,
- banned uses,
- rules on using the model's outputs to train other models.

Don't trust the word "open" on its own. Check what's actually released.

> Open weights aren't open source.

## Sources

- [Open Source Initiative, The Open Source AI Definition 1.0 (published 2024-10-28)](https://opensource.org/ai/open-source-ai-definition)
- [Llama 3.1 Community License (2024-07-23), section 2](https://github.com/meta-llama/llama-models/blob/main/models/llama3_1/LICENSE)
- [Mistral AI, Announcing Mistral 7B (2023-09-27)](https://mistral.ai/news/announcing-mistral-7b)
- [Ai2, OLMo](https://allenai.org/olmo)
