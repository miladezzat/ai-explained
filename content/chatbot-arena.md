---
title: Chatbot Arena and Elo ratings: how AI models get ranked
slug: chatbot-arena
description: How Chatbot Arena turns blind side-by-side votes into a leaderboard, why it moved from online Elo to Bradley-Terry, and what its critics found.
date: 2026-11-22
series: ai-explained
youtube: kVPa6w1k9Wc
facebook: https://facebook.com/reel/1565782505306120
instagram: https://www.instagram.com/p/DgCzEj5FPXy/
tags: llm, evaluation, benchmarks, leaderboards, ai engineering
---
Which chatbot is best? **Let thousands of people vote.** That's Chatbot Arena.

## How a battle works

You ask one question. Two anonymous models answer side by side, and you vote for the better one. Only then are the names revealed. As the Chatbot Arena paper puts it, "the models' identities revealed only after voting", so brand names can't sway you.

The 2024 paper reported "over 240K votes from about 90K users". The prompts are fresh, written by real users, which matters because static benchmark test sets "can become contaminated over time."

## From votes to ratings

The idea comes from chess. Elo ratings rise when you beat strong players and fall when you lose, and the bigger the rating gap, the more often the higher-rated player is expected to win (general explanation of Elo).

Early on, the arena used classic online Elo, updating after each battle. But in December 2023 the team reported "considerable variability in the ratings using the classic online algorithm": the result depended on the order of battles.

So the arena switched to the **Bradley-Terry model**. It assumes a model's skill doesn't change ("game order does not matter") and fits all votes at once. According to LMSYS, that "gives us significantly more stable ratings and precise confidence intervals."

Read those intervals. If two models' intervals overlap, there's no clear winner, even if one score is a few points higher.

## Can you trust the crowd?

The paper compared crowd votes with expert raters and found "high agreement rates (72% to 83%) between Arena crowd-user and experts." It also took "a first step" toward detecting anomalous voters.

## The critique

In 2025, *The Leaderboard Illusion* argued that "undisclosed private testing practices benefit a handful of providers." Its findings include:

- **Private variants.** "At an extreme, we identify 27 private LLM variants tested by Meta in the lead-up to the Llama-4 release." If you test many and publish only the best, the score looks better than it is.
- **Uneven data.** Google and OpenAI received an estimated 19.2% and 20.4% of all arena data, while 83 open-weight models together received an estimated 29.7%.

The authors recommend limits on private variants per provider, no retracting scores after submission, and fairer sampling.

## How to use it

General practice: treat the arena as one signal among several. It tells you what a broad crowd prefers on general prompts, not how a model performs on your product. Shortlist with the leaderboard, then test models on your own tasks.

> Votes beat vibes. Your evals beat both.

## Sources

- [Chiang et al., Chatbot Arena: An Open Platform for Evaluating LLMs by Human Preference (2024)](https://arxiv.org/html/2403.04132v1)
- [LMSYS blog: Chatbot Arena, New models & Elo system update (2023)](https://lmsys.org/blog/2023-12-07-leaderboard)
- [Singh et al., The Leaderboard Illusion (2025)](https://arxiv.org/abs/2504.20879)
