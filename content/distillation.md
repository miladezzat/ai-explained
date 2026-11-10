---
title: Distillation: big teacher, small student
slug: distillation
description: How do you fit a big model's smarts into your phone? Distillation trains a small student model to copy a big teacher. How it works, and its limits.
date: 2026-11-02
series: ai-explained
youtube: RVtWEH3M4K8
facebook: https://facebook.com/reel/2932198473821699
instagram: https://www.instagram.com/p/DfPUAekDVGM/
tags: distillation, small language models, model training, llm, fine-tuning
---
How do you fit a big model's smarts into something small enough to run on your phone? You **distill** it.

## Teacher and student

Distillation trains a small **student** model to copy a big **teacher** model. Geoffrey Hinton's team named the technique in 2015, describing it as a way to compress the knowledge of a large model "into a single model which is much easier to deploy".

## Soft labels carry knowledge

Normal training uses **hard labels**: this picture is a cat, and nothing else.

A teacher gives **soft labels**: its full set of probabilities, like 90% cat, 9% dog, 1% car. Those small numbers carry knowledge. They say a cat looks much more like a dog than a car.

The student learns from all of it, so it picks up the teacher's sense of what's similar, not just the right answer. That's why a student can learn more from a teacher than from the raw data alone.

## A classic example: DistilBERT

DistilBERT (2019) is a distilled version of Google's BERT. It's **40% smaller** and **60% faster**, while keeping **97%** of BERT's language understanding.

## With LLMs, it often looks simpler

For large language models, distillation is often just: the teacher writes answers, and the student is fine-tuned on them. DeepSeek did this with its R1 reasoning model, releasing six distilled students from 1.5 to 70 billion parameters, built on Qwen and Llama.

## Why bother?

A smaller model is cheaper and faster, and it can run on your own hardware. It's ideal for one narrow task at high volume, where a big model is too slow or too expensive.

## Distillation vs quantization

They're easy to confuse:

- **Quantization** shrinks the *same* model by storing its numbers with fewer bits.
- **Distillation** trains a *new*, smaller model.

You can do both: distill, then quantize the student.

## The catches

- The student rarely beats the teacher.
- It's best at what it was shown, so choose the training data carefully.
- **Check the license.** OpenAI's terms, for example, ban using its output "to develop models that compete with OpenAI".

## The recipe

1. Collect real prompts from your task.
2. Get great answers from the teacher.
3. Train the student on them.
4. Test the student against the teacher on held-out examples.

> Big teacher, small student.

## Sources

- [Hinton, Vinyals, Dean, Distilling the Knowledge in a Neural Network (2015)](https://arxiv.org/abs/1503.02531)
- [Sanh et al., DistilBERT (2019)](https://arxiv.org/abs/1910.01108)
- [DeepSeek-AI, DeepSeek-R1 (2025)](https://arxiv.org/abs/2501.12948)
- [OpenAI Terms of Use, What you cannot do](https://openai.com/policies/terms-of-use)
