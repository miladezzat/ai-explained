---
title: Diffusion models: how AI turns static into a picture
slug: diffusion-models
description: Diffusion models learn to remove noise, then generate images by starting from pure static and denoising step by step. How training, sampling and guidance work.
date: 2026-11-10
series: ai-explained
youtube: oOVNgesC8k0
facebook: https://facebook.com/reel/1446205110290828
instagram: https://www.instagram.com/p/Dfki4udj0lw/
tags: diffusion models, generative ai, image generation, latent diffusion, machine learning
---
Diffusion models make pictures by starting from pure static, then cleaning it up one small step at a time. The idea sounds backwards, but it's behind many of today's image and video generators.

## Training: add noise, then learn to undo it

Training starts with a real photo.

- **The forward process.** Add a little Gaussian noise to the photo, then more, and more, until nothing is left but static. Nothing is learned here; it's a fixed recipe.
- **The reverse.** The model is shown a noisy image and asked to **predict the noise that was added**. That's the whole training task.

Once the model can predict the noise, you can subtract it, and the image gets a bit cleaner. Repeat, and it gets cleaner still.

## Generation: start from static

To make a new image, start from fresh random noise and run that denoising step again and again until an image appears.

- The original **DDPM** paper (Ho, Jain and Abbeel, 2020) used **1,000 steps**: a thousand passes through the network for one image.
- Faster samplers such as **DDIM** take far fewer steps and run **10x to 50x faster** in wall-clock time.

## The denoiser

The network that predicts the noise was usually a **U-Net**: it shrinks the image down, then builds it back up, so it sees both the big picture and fine detail.

Working on full-size pixels is expensive. **Latent diffusion** solves that: an autoencoder squeezes the image into a small compressed space, and the diffusion process runs in there instead, which cuts the compute a lot.

## Steering with a prompt

Your prompt steers the denoiser through **cross-attention** layers, which let it look at the text at every step.

**Classifier-free guidance** makes the prompt count for more. The model is trained both with and without the prompt, and while sampling it mixes the two predictions. The guidance scale is a trade-off: more guidance means higher quality, but less variety.

## Transformers take over

Newer models swap the U-Net for a **transformer** that works on latent patches. In the DiT paper (Peebles and Xie), more compute consistently meant better images.

It's not just images, either. OpenAI says **Sora** is a diffusion transformer for video, and Google is testing **Gemini Diffusion**, an experimental diffusion model for text.

| Step | What happens |
|---|---|
| Train | Add noise to real images, learn to predict it |
| Sample | Start from static, remove noise step by step |
| Guide | Prompt via cross-attention, guidance scale for strength |

> Static in, picture out. That's diffusion.

## Sources

- [Hugging Face, The Annotated Diffusion Model](https://huggingface.co/blog/annotated-diffusion)
- [Ho, Jain, Abbeel, Denoising Diffusion Probabilistic Models](https://arxiv.org/abs/2006.11239)
- [Song et al., Denoising Diffusion Implicit Models](https://arxiv.org/abs/2010.02502)
- [Rombach et al., Latent Diffusion Models](https://arxiv.org/abs/2112.10752)
- [Ho and Salimans, Classifier-Free Diffusion Guidance](https://arxiv.org/abs/2207.12598)
- [Peebles and Xie, Scalable Diffusion Models with Transformers](https://arxiv.org/abs/2212.09748)
- [OpenAI, Video generation models as world simulators](https://openai.com/index/video-generation-models-as-world-simulators/)
- [Google DeepMind, Gemini Diffusion](https://deepmind.google/models/gemini-diffusion/)
