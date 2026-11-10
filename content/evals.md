---
title: LLM evals: tests for AI apps
slug: evals
description: You changed one line in your prompt. Is your AI app better or worse? Without evals you're guessing. How to build tasks, trials and graders that tell you.
date: 2026-10-31
series: ai-explained
youtube: 37ggohA7B-s
facebook: https://facebook.com/reel/2151829558740608
tags: evals, llm evaluation, testing, ai agents, quality
---
You changed one line in your prompt. Is your AI app better now, or worse? Without evals, you're guessing.

## What an eval is

An eval is a test for an AI system: give it an input, then grade the output. Think unit tests, but for answers that can change every time you run them.

Anthropic's vocabulary is useful:

- A **task** is one test case: an input plus what success looks like.
- A **trial** is one attempt at that task.

Because outputs vary, you run several trials and look at the **pass rate**, not one lucky answer.

## Three kinds of graders

| Grader | Good at | Watch out for |
|---|---|---|
| Code | Exact match, regex, "did the tests pass?" Fast, cheap, repeatable. | Can't judge open-ended text. |
| Model | Open-ended answers, tone, helpfulness. | Must be checked against human judgment. |
| Human | The gold standard. | Slow and expensive. Use sparingly. |

Prefer code graders wherever you can.

## Make success measurable

Not "good answers", but "the correct refund amount, every time". Vague criteria give vague scores.

## Start small

You don't need hundreds of cases. Twenty to fifty tasks drawn from **real failures** is a great start. Every bug report is a future test.

## Two suites

- **Capability evals** ask what it can do well. They start with a low pass rate and show progress.
- **Regression evals** ask if it still does everything it used to. They should pass almost every time.

## Watch consistency

If an agent succeeds 75% of the time, it passes three runs in a row only about 42% of the time (0.75 × 0.75 × 0.75). Users feel that inconsistency.

## Read the transcripts

A score tells you *that* it failed, not *why*. Open the failing runs and read them.

## The payoff

When a new model comes out, teams with evals know in days, not weeks, whether it's better for them.

> Stop guessing. Start measuring.

## Sources

- [Anthropic Engineering, Demystifying evals for AI agents (2026-01-09)](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- [Claude docs, Define your success criteria and Create strong empirical evaluations](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests)
