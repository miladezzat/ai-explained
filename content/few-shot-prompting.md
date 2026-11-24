---
title: Few-shot prompting: show, don't tell
slug: few-shot-prompting
description: Few-shot prompting puts a few worked examples in the prompt so the model copies the format you want. Where it comes from, how many to use, and the traps.
date: 2026-11-24
series: ai-explained
youtube: d7EHGPLUPN0
facebook: https://facebook.com/reel/920135464426414
instagram: https://www.instagram.com/p/DgH8mx7kWZu/
tags: llm, prompt engineering, few-shot, prompting, ai engineering
---
Your prompt says "be concise". The model writes an essay. **Show it, don't tell it.**

## What few-shot prompting is

Few-shot prompting means putting a few worked examples in the prompt: an input, then the output you want. The terms are simple (general usage):

- **Zero-shot**: no examples, just instructions.
- **One-shot**: one example.
- **Few-shot**: a handful.

## Where the name comes from

The term was popularized by the 2020 GPT-3 paper, *Language Models are Few-Shot Learners* (Brown et al.). GPT-3, "an autoregressive language model with 175 billion parameters", was evaluated with no training on each task: "GPT-3 is applied without any gradient updates or fine-tuning, with tasks and few-shot demonstrations specified purely via text interaction with the model."

The paper's headline finding: "scaling up language models greatly improves task-agnostic, few-shot performance."

## Why it works so well

Anthropic's prompting guide calls examples "one of the most reliable ways to steer Claude's output format, tone, and structure," adding that "A few well-crafted examples (known as few-shot or multishot prompting) improve accuracy and consistency."

Say you want to classify support tickets:

```
<examples>
<example>
Ticket: I was charged twice this month.
Label: billing
</example>
<example>
Ticket: The app crashes when I upload a photo.
Label: bug
</example>
</examples>
```

## How to write good examples

- **How many**: "Include 3–5 examples for best results."
- **Relevant**: "Mirror your actual use case closely."
- **Diverse**: "Cover edge cases and vary enough that Claude doesn't pick up unintended patterns."
- **Tagged**: "Wrap examples in `<example>` tags (multiple examples in `<examples>` tags) so Claude can distinguish them from instructions."

The diversity rule is the one people skip. If every example is short and positive, the model may decide every answer should be short and positive too (general practice).

For reasoning tasks, Anthropic suggests you "Present each example as a problem, the method to apply, and the expected answer."

And if you're short on examples: "You can also ask Claude to evaluate your examples for relevance and diversity, or to generate additional ones based on your initial set."

## The trade-off

Examples aren't free. They cost input tokens on every call, and five long examples can easily outweigh the actual question. If your example block doesn't change between requests, put it early in the prompt and use prompt caching (general practice).

> Show, don't tell.

## Sources

- [Brown et al.: Language Models are Few-Shot Learners (arXiv 2005.14165)](https://arxiv.org/abs/2005.14165)
- [Claude docs: Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)
