---
title: Red teaming LLMs: break your model before attackers do
slug: red-teaming-llms
description: Red teaming LLMs means attacking your own AI system to find flaws first. Who does it, how automated red teaming works, and the limits researchers warn about.
date: 2026-11-26
series: ai-explained
youtube: rrEn053zxYA
facebook: https://facebook.com/reel/2400124600797060
instagram: https://www.instagram.com/p/DgNuxstjhwM/
tags: ai security, ai safety, red teaming, llm, evaluation
---
Before attackers break your model, **pay someone to break it first.** That is red teaming, an idea borrowed from security and now a standard step before AI models ship.

## What red teaming is

Anthropic describes it as "adversarially testing a technological system to identify potential vulnerabilities." NIST's glossary is more formal: AI red-teaming is "A structured testing effort to find flaws and vulnerabilities in an AI system, often in a controlled environment and in collaboration with developers of AI."

In practice, testers try what a motivated attacker would: jailbreak prompts, prompt injection hidden in documents or web pages, and requests for harmful content, to see what slips past the model's safeguards.

## Who does the red teaming

Anthropic's write-up lists several kinds, each catching different problems:

- **Domain experts.** Specialists probe their own field, for example "Trust & Safety: Policy Vulnerability Testing" and "National security: Frontier threats red teaming."
- **Region-specific teams.** "Multilingual and multicultural red teaming," because harms look different across languages and cultures.
- **New modalities.** Images and audio open new ways to attack, so "Multimodal red teaming" gets its own track.
- **The crowd.** "Crowdsourced red teaming for general harms" and community-based red teaming cast a wider net.

## Automated red teaming

Human testers are slow and expensive, so labs also use models to attack models. Anthropic's description:

1. "we use a model to generate attacks that are likely to elicit the target behavior"
2. then "fine-tune a model on those red teamed outputs" so it resists them
3. "We can run this process repeatedly"

## From findings to fixes

Red teaming is not a one-off audit. "Ideally, red teaming is part of an iterative loop that includes assessing an AI model," then "implementing corresponding mitigations, and testing the efficacy of those guardrails." Over time, the goal is to "go from ad hoc, qualitative human testing, to more thorough, quantitative, and automated testing": today's red team finding becomes tomorrow's regression eval.

## The limits

Two warnings are worth keeping in mind:

- **No standards yet.** "The lack of standardized practices for AI red teaming further complicates the situation." Two companies saying "we red teamed it" may mean very different things.
- **Security theater.** Researchers at Carnegie Mellon reviewed red-teaming practice and found its purpose "often vague"; treating it as a fix for every possible risk "verges on security theater."

## Red team your own app

General practice: if you build on top of an LLM, the base model's red teaming does not cover your product. Your system prompt, your tools and your data are new attack surface. Try injection through every input you accept, test what your tools can be tricked into doing, and keep the attacks that worked as test cases.

> Break it first. Fix it fast.

## Sources

- [NIST glossary: artificial intelligence red-teaming](https://csrc.nist.gov/glossary/term/artificial_intelligence_red_teaming)
- [Anthropic: Challenges in red teaming AI systems](https://www.anthropic.com/news/challenges-in-red-teaming-ai-systems)
- [Feffer et al.: Red-Teaming for Generative AI: Silver Bullet or Security Theater?](https://arxiv.org/abs/2401.15897)
