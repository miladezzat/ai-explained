---
title: Multimodal models: AI that sees and hears
slug: multimodal
description: Send an AI a photo of your fridge and it suggests dinner. How multimodal models turn images and audio into tokens, from ViT and CLIP to LLaVA.
date: 2026-11-03
series: ai-explained
youtube: y40cWLbZkdo
facebook: https://facebook.com/reel/1447789373998392
instagram: https://www.instagram.com/p/DfSkuwwlBXc/
tags: multimodal, vision models, clip, llm, computer vision
---
Send an AI a photo of your fridge, and it suggests what to cook. How does a model that reads text understand a picture? It's a **multimodal model**: it understands more than text, like images, audio and even video.

## Everything becomes tokens

Language models read tokens. So the trick is to turn a picture into tokens too.

In 2020, Google researchers showed you can cut an image into small squares called **patches** and feed them to a transformer, like words in a sentence. Their paper's title says it: *An Image is Worth 16x16 Words*. A 224-pixel image cut into 16-pixel squares becomes 196 patches, so 196 tokens.

## Matching pictures with words: CLIP

In 2021, OpenAI's **CLIP** learned to match images with captions, training on 400 million image and text pairs from the internet. Images and text ended up in one **shared space**, so a photo of a dog sits near the words "a dog".

That let CLIP recognize things it was never trained to label, just from a text description. This is called zero-shot recognition.

## Chatting about images: LLaVA

To have a conversation about an image, you connect a **vision encoder** to a language model. That's how LLaVA worked in 2023:

1. The vision encoder turns the image into vectors.
2. A small adapter maps those vectors into the language model's token space.
3. The language model reads them alongside your text and answers.

Fun detail: LLaVA used text-only GPT-4 to write its training conversations, from captions of images GPT-4 couldn't see.

## What you can do with it

Paste a screenshot of an error, a chart, a receipt or a whiteboard photo, and ask about it. Audio works the same way: sound becomes tokens, so some models can listen and talk back directly.

## Things to know

- **Images cost tokens.** A big, detailed image can use as many tokens as a page of text.
- **They still make mistakes.** Models can misread small text, miscount objects, or describe details that aren't there.

## Tips

- Crop the image to what matters.
- Ask a specific question about it, not just "what's this?"
- For documents, check numbers the model reads off the image.

> Everything becomes tokens.

## Sources

- [Dosovitskiy et al., An Image is Worth 16x16 Words (2020, Google Research)](https://arxiv.org/abs/2010.11929)
- [Radford et al., Learning Transferable Visual Models From Natural Language Supervision (CLIP, 2021, OpenAI)](https://arxiv.org/abs/2103.00020)
- [Liu et al., Visual Instruction Tuning (LLaVA, 2023)](https://arxiv.org/abs/2304.08485)
