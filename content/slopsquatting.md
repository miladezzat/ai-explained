---
title: Slopsquatting: when AI invents a package and attackers claim it
slug: slopsquatting
description: How attackers register the package names AI coding tools hallucinate, what the research found, and the checks that keep you safe.
date: 2026-11-15
series: ai-explained
youtube: gfT3Oi6IEHg
facebook: https://facebook.com/reel/1122341873881398
instagram: https://www.instagram.com/p/DfxdYwkjDip/
tags: slopsquatting, supply chain security, ai coding, package hallucination, ai security
---
Your AI assistant suggests a package that doesn't exist. An attacker has already registered it.

## What slopsquatting is

**Slopsquatting** means registering a package name that an LLM hallucinated. It's a cousin of typosquatting, where attackers register misspellings of popular packages. The difference: here the "typo" comes from the model, not from you. The term was coined by Seth Larson, the Python Software Foundation's developer in residence.

## How often models make packages up

A paper accepted to USENIX Security 2025 (Spracklen et al.) tested 16 popular code-generating LLMs on 576,000 Python and JavaScript code samples. The average share of hallucinated packages was at least **5.2%** for commercial models and **21.7%** for open-source models. In total the researchers found **205,474 unique** hallucinated package names. Every one of them is a name an attacker could claim.

## How the attack works

1. A model recommends a package that doesn't exist.
2. An attacker publishes malware under that name on a public registry.
3. You, or your coding agent, run the install command, and the package's code runs on your machine.

## It already works in the wild

In 2024, researcher Bar Lanyado of Lasso Security tested the idea. He uploaded an **empty** package called `huggingface-cli`, a name he had seen models hallucinate. In three months it got more than **30,000** real downloads. A repository for research by Alibaba even included instructions to install it in its README. The package was harmless, but a real attacker's wouldn't be.

## Agents raise the stakes

When a human copies an install command, there's at least a chance someone notices an unfamiliar name. A coding agent can install packages without anyone reading the name at all.

## How to protect yourself

- **Check before you install.** Confirm the package exists, look at who publishes it, and be wary of brand-new packages with little history.
- **Pin dependencies** with a lockfile, and **review every new dependency** like a code change.
- **Use tools that flag** unusual, newly published or suspicious packages before they're installed.
- **Constrain agents.** Require approval for installs, or let them install only from a vetted allowlist.

> The model can invent a package. Don't let it install one.

## Sources

- [Spracklen et al., We Have a Package for You! (arXiv, USENIX Security 2025)](https://arxiv.org/abs/2406.10279)
- [Socket: Slopsquatting](https://socket.dev/blog/slopsquatting-how-ai-hallucinations-are-fueling-a-new-class-of-supply-chain-attacks)
- [Lasso Security: AI package hallucinations](https://www.lasso.security/blog/ai-package-hallucinations)
