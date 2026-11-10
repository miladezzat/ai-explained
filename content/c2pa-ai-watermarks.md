---
title: C2PA and AI watermarks
slug: c2pa-ai-watermarks
description: Is this photo real, or did AI make it? Content credentials record where a file came from; watermarks hide a signal inside it. How C2PA and SynthID work, and their limits.
date: 2026-11-07
series: ai-explained
youtube: 7vkHWeAS-M8
facebook: https://facebook.com/reel/2959314594449344
instagram: https://www.instagram.com/p/Dfc0hscj6aX/
tags: c2pa, content credentials, synthid, ai watermarks, deepfakes
---
Is this photo real, or did AI make it? Your eyes can't reliably tell anymore. Two technologies try to help: **content credentials**, which record where a file came from, and **watermarks**, which hide a signal inside the file itself.

## Content credentials: C2PA

Content credentials come from **C2PA**, the Coalition for Content Provenance and Authenticity. It's an open standard for verifying the origin and history of media, backed by hundreds of companies, including Adobe, Microsoft, the BBC, Google, OpenAI and Meta.

**How it works:**

- Each file can carry a **manifest**: who or what made it, when, and with which tools.
- Every edit can add a new entry, and content made by AI is labeled as AI.
- The manifest is **digitally signed** with a certificate, and the content is **hashed**, so changing the file breaks the seal.

Apps show it as a small **"CR" pin**. Tap it to see how the file was made and edited.

## The weak spot: metadata can be stripped

A screenshot, or a re-upload to a platform that strips metadata, can remove the manifest. The credentials are simply gone.

## Watermarks: a signal in the content itself

That's where watermarks come in. Google's **SynthID** hides an invisible signal directly in the content. It works on images, audio, video and even text, where it gently nudges which words the model picks.

Google says the watermark survives common changes like cropping, filters and lossy compression. A detector can check for the signal later, even after the metadata is gone.

## Better together

C2PA combines both. **Durable content credentials** use a watermark (a "soft binding") to find the manifest again, even if it was stripped from the file.

## What neither one proves

C2PA itself says it's not a cure-all for misinformation:

- Credentials show **where a file came from**, not whether what it shows is **true**.
- **Missing credentials don't mean fake.** They mean unknown. Most real photos today have none.

## Tip

Before you share a viral image, check it with a Content Credentials verify tool.

> Credentials tell the story. Watermarks keep the trail.

## Sources

- [C2PA, Technical specification explainer](https://spec.c2pa.org/specifications/specifications/2.2/explainer/Explainer.html)
- [Content Credentials](https://contentcredentials.org/)
- [Google DeepMind, SynthID](https://deepmind.google/science/synthid/)
