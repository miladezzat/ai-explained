---
title: Self-consistency: ask an LLM many times, then take the vote
slug: self-consistency
description: How self-consistency sampling works, why voting over several reasoning paths makes a model more accurate, what it costs, and how to use it in your own app.
date: 2026-11-19
series: ai-explained
youtube: nmTVbLfcLnc
facebook: https://facebook.com/reel/2259033225017891
instagram: https://www.instagram.com/p/Df7FEyflLjt/
tags: llm, prompt engineering, chain of thought, reasoning, sampling
---
Ask a model the same question five times, and you may get different answers. **Self-consistency** turns that into a strength.

## The idea

Normally, chain-of-thought prompting uses greedy decoding: the model follows one reasoning path, picking the most likely token at each step.

Self-consistency, introduced by Google researchers in 2022 and published at ICLR 2023, replaces that. It "first samples a diverse set of reasoning paths instead of only taking the greedy one," then selects the most consistent answer. In practice, that's a majority vote over the final answers: the most common answer wins.

The intuition is that "a complex reasoning problem typically admits multiple different ways of thinking leading to its unique correct answer." So when paths make mistakes, they often land on different answers, while correct paths tend to agree.

A quick example: five samples answer 18, 18, 26, 18 and 14. Eighteen wins, with three votes out of five.

The diversity comes from sampling with a temperature above zero. Greedy decoding would give the same path every time, so there would be nothing to vote on.

## How much it helps

The gains were big. With the same models and prompts, just changing how answers are decoded, accuracy rose by 17.9 points on GSM8K math word problems. It also improved results on SVAMP (+11.0), AQuA (+12.2), StrategyQA (+6.4) and ARC-challenge (+3.9).

## The catch

- **Answers must be comparable.** Voting needs a final answer you can extract and match, like a number or a multiple-choice letter.
- **It costs more.** Five samples means about five times the generation, in tokens and money.

For free-form text, where no two answers match exactly, **Universal Self-Consistency** (2023) asks the model itself to "select the most consistent answer among multiple candidates."

## Using it in your app

Some practical habits (general practice, not findings from the papers):

1. **Run in parallel, then vote.** Send the same prompt several times at once and count the final answers.
2. **Make the answer easy to extract.** Ask the model to end with "The answer is" followed by the value, the same kind of format the paper parsed.
3. **Pick the right tasks.** Use it where correctness matters more than cost: math, classification and extraction.

> One answer can be lucky. Agreement is evidence.

## Sources

- [Wang et al., Self-Consistency Improves Chain of Thought Reasoning in Language Models](https://arxiv.org/abs/2203.11171)
- [Chen et al., Universal Self-Consistency for Large Language Model Generation](https://arxiv.org/abs/2311.17311)
