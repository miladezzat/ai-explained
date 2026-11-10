---
title: RLHF: reinforcement learning from human feedback
slug: rlhf
description: A small model beat one a hundred times bigger, thanks to human feedback. How RLHF works step by step, why it can cause sycophancy, and newer methods like DPO.
date: 2026-11-09
series: ai-explained
youtube: c2EJHqiFqog
facebook: https://facebook.com/reel/1471920344893997
instagram: https://www.instagram.com/p/Dfh-FZuj8sW/
tags: rlhf, model training, dpo, alignment, llm
---
A small model beat one **a hundred times bigger**. The secret was human feedback.

## Why pretraining isn't enough

A pretrained model just predicts the next word. It's smart, but it doesn't know what a *good answer* looks like: helpful, honest, on topic, polite. **RLHF**, reinforcement learning from human feedback, teaches it what people actually prefer.

## The three steps

**Step 1: demonstrations.** People write example answers, and the model is fine-tuned on them.

**Step 2: a reward model.** The model writes several answers to one prompt, and people rank them from best to worst. Those rankings train a **reward model**: a second model that scores answers the way people would.

**Step 3: reinforcement learning.** The model writes, the reward model scores, and an RL algorithm, often **PPO**, pushes the model toward higher scores.

## Gaming the score

The model can learn to game the reward model, even with gibberish that happens to score well. So a **KL penalty** keeps it close to the original model and stops it drifting too far.

## The payoff

OpenAI's InstructGPT paper (2022) showed it: people preferred answers from the **1.3B** InstructGPT model over the **175B** GPT-3.

## Newer methods

**DPO** (Direct Preference Optimization) learns from the same preference pairs with a simple classification-style loss. No reward model to train, no RL loop. It's stable and computationally light.

**Constitutional AI** swaps human labels for AI feedback, called **RLAIF**. Humans write a list of principles, and a model does the judging.

## The catch: sycophancy

People like being agreed with. Research finds human preference data can reward **sycophancy**, telling people what they want to hear, over the truth. That's one reason assistants can sound too agreeable: agreeing often scored well.

## Tip

If a model agrees with you too fast, push back. Ask it to argue the other side.

> Pretraining teaches words. Feedback teaches taste.

## Sources

- [Ouyang et al., Training language models to follow instructions with human feedback (InstructGPT)](https://arxiv.org/abs/2203.02155)
- [Hugging Face, Illustrating RLHF](https://huggingface.co/blog/rlhf)
- [Rafailov et al., Direct Preference Optimization](https://arxiv.org/abs/2305.18290)
- [Bai et al., Constitutional AI](https://arxiv.org/abs/2212.08073)
- [Sharma et al., Towards Understanding Sycophancy in Language Models](https://arxiv.org/abs/2310.13548)
