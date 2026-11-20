---
title: Model cards: read the label before you ship the model
slug: model-cards
description: What a model card is, the sections the original paper proposed, how Hugging Face model cards work, and what developers should check before picking a model.
date: 2026-11-20
series: ai-explained
youtube: CrBx3Rnx6q4
facebook: https://facebook.com/reel/1854555102311560
instagram: https://www.instagram.com/p/Df9o-5tl_oL/
tags: model cards, responsible ai, hugging face, machine learning, documentation
---
You're about to use an open model. What is it good at? **Its model card should tell you.**

## What a model card is

"Model cards are short documents accompanying trained machine learning models that provide benchmarked evaluation in a variety of conditions," such as across different cultural, demographic or phenotypic groups.

The idea comes from a 2018 paper led by Margaret Mitchell, presented at the FAT* conference on fairness, accountability and transparency in 2019. The authors pictured "short (one to two page) records."

## The proposed sections

The paper suggested these sections, while noting they aren't meant to be complete:

- Model details
- Intended use
- Factors
- Metrics
- Evaluation data
- Training data
- Quantitative analyses
- Ethical considerations
- Caveats and recommendations

**Intended use** is a key one: what the model is for, and what it isn't. And results are broken down by group, not just one average, because a model can be strong overall and weak for some people.

The paper's examples were a smiling detector evaluated across age and gender, and Perspective API's toxicity classifier, shown in two versions.

## Model cards on Hugging Face

Today the most common place you'll see one is Hugging Face, where "you can find a model card as the README.md file in any model repo."

At the top of that README sits a YAML metadata section, with fields like `license`, `language`, `datasets`, `tags` and `base_model`. According to the docs, "the metadata you add to the model card supports discovery and easier use of your model": users can filter models by it, and the license is shown on the page.

Below the metadata, the text should describe the model, its "intended uses & potential limitations," the training parameters, the datasets used, and the evaluation results.

## What developers should do

Some practical habits (general practice, not rules from the sources):

1. **Read the card before you pick a model.** Check the license, the training data and the limitations.
2. **Write one when you fine-tune.** Even a short card tells the next person what they're getting.
3. **Treat a missing card as a warning sign.** No card, or an empty one, means you're guessing.

> Read the label before you ship the model.

## Sources

- [Mitchell et al., Model Cards for Model Reporting](https://arxiv.org/abs/1810.03993)
- [Hugging Face Hub docs: Model Cards](https://huggingface.co/docs/hub/model-cards)
