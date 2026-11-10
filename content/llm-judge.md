---
title: LLM-as-a-judge
slug: llm-judge
description: Your chatbot wrote 10,000 answers today. Who grades them? Another model. How LLM-as-a-judge works, its biases, and how to check the grader.
date: 2026-10-31
series: ai-explained
youtube: MpYed4SeUkM
facebook: https://facebook.com/reel/985952391251773
instagram: https://www.instagram.com/p/DfKzLOmibYE/
tags: llm as a judge, evals, llm evaluation, ai quality, rubrics
---
Your chatbot wrote ten thousand answers today. Who grades them all? People are slow and expensive. Code can't judge tone or helpfulness. So teams use another AI: **LLM-as-a-judge**.

## What it is

One model grades another model's output, using a prompt you write, called a **rubric**. A judge model can do it in seconds, for cents.

Does it work? In a well-known 2023 study (Zheng et al., the MT-Bench paper), GPT-4 as a judge agreed with human experts over 80% of the time, about as often as humans agree with each other.

## Three ways to use a judge

1. **Pairwise**: show it two answers and ask which is better. Great for comparing two prompts or two models.
2. **Single answer**: give it one answer and a scale, like 1 to 5, or simply pass or fail.
3. **Reference-guided**: give it the correct answer too. On math questions in the study, this cut grading failures from 70% to 15%.

## Judges have biases

**Position bias.** Many judges prefer whichever answer comes first. Fix: run it twice with the order swapped, and only count a win if it wins both times.

**Verbosity bias.** Longer answers can look better, even when they aren't more correct.

**Self-preference.** A judge may favor answers from its own model. When you can, use a different model to judge.

## Write a clear rubric

Not "Is this good?" but "Is the refund amount correct, and is the reply polite?" Ask for a simple output, like `correct` or `incorrect`, and let the judge think before it scores. Claude's docs recommend a grader with thinking on, so it reasons first.

```text
Score the reply. Answer PASS or FAIL.
PASS only if:
1. The refund amount matches the order total.
2. The tone is polite and doesn't promise anything else.
```

## Check the judge

Label about fifty answers yourself and see how often the judge agrees. If it agrees, it can grade thousands of answers every night and catch problems before your users do. If not, fix the rubric first.

> Let AI grade AI, but check the grader.

## Sources

- [Zheng et al., Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena (NeurIPS 2023)](https://arxiv.org/abs/2306.05685)
- [Claude docs, Define success criteria and build evaluations, tips for LLM-based grading](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests)
