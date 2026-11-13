---
title: SWE-bench explained: how coding agents get graded
slug: swe-bench
description: What a SWE-bench score really measures, why SWE-bench Verified exists, and why contamination led to SWE-Bench Pro. How to read a coding benchmark score.
date: 2026-11-13
series: ai-explained
youtube: g3TIyiu2CEY
facebook: https://facebook.com/reel/1823460972225760
instagram: https://www.instagram.com/p/DfrNRkrl98j/
tags: swe-bench, llm benchmarks, coding agents, evals, contamination
---
A model scores 70% on SWE-bench. What does that actually mean? Let's look inside the benchmark every coding model gets compared on.

## One question

SWE-bench asks: **can a model fix a real bug in a real codebase?** It launched in 2023 (presented at ICLR 2024) with **2,294 tasks** taken from real GitHub issues in **12 popular Python projects**.

## How a task works

1. The model gets the repository's code and the text of the issue.
2. It edits the code to fix the issue.
3. The project's own tests decide:
   - **FAIL_TO_PASS** tests failed before the real fix and must pass now.
   - **PASS_TO_PASS** tests passed before and must keep passing, so the fix doesn't break anything else.

If both sets pass, the task counts as **resolved**. The score is simply the percent of tasks resolved. Every run happens in Docker containers, so results can be reproduced.

In the original paper, the best model, Claude 2, solved just **1.96%**.

## SWE-bench Verified

In August 2024, OpenAI released **SWE-bench Verified**: 500 tasks checked by professional software developers. Many original tasks were unfair: issues were underspecified, or tests were "overly specific, and in some cases are even unrelated to the issue."

On the cleaned set, GPT-4o went from 16% to about 33%. Scores kept climbing; by July 2025 even the tiny mini-SWE-agent scored 65% on Verified.

| Variant | Tasks |
|---|---|
| SWE-bench (full) | 2,294 |
| Lite | 300 |
| Verified | 500 |
| Multimodal | 480 |

## The catch: contamination

The issues and their fixes are public, which means models may have seen them during training. OpenAI's own post notes that large pre-trained models "are likely to be contaminated" on these tasks.

A 2025 preprint, *The SWE-Bench Illusion*, tested this. Given only the issue text, models named the buggy file path with up to **76%** accuracy on SWE-bench Verified, but only up to **53%** on repositories outside the benchmark. The authors say gains "may be partially driven by memorization rather than genuine problem-solving."

## SWE-Bench Pro

**SWE-Bench Pro** was built to resist that: 1,865 problems from 41 actively maintained repositories, with held-out and commercial sets that aren't public, and long tasks that "may require hours to days" for a professional engineer.

## How to read a score

Before you trust a number, ask:

- **Which variant?** Full, Lite, Verified and Pro are not comparable.
- **Which agent setup?** The scaffold around the model matters a lot.
- **Could the model have seen it?** Public tasks invite memorization.

> Real bugs, real tests, real caveats.

## Sources

- [Jimenez et al., SWE-bench: Can Language Models Resolve Real-World GitHub Issues?](https://arxiv.org/abs/2310.06770)
- [SWE-bench leaderboards](https://www.swebench.com/)
- [OpenAI: Introducing SWE-bench Verified](https://openai.com/index/introducing-swe-bench-verified/)
- [Liang et al., The SWE-Bench Illusion](https://arxiv.org/abs/2506.12286)
- [SWE-Bench Pro](https://arxiv.org/abs/2509.16941)
