---
title: Prompt compression: same answer, fewer tokens
slug: prompt-compression
description: Prompt compression removes the tokens a model doesn't need before you send the prompt. How Microsoft's LLMLingua, LongLLMLingua and LLMLingua-2 do it, and how much they save.
date: 2026-11-28
series: ai-explained
youtube: 6eXhL1tcs1k
facebook: https://facebook.com/reel/2311919289603219
instagram: https://www.instagram.com/p/DgS40vFjiob/
tags: llm, prompt engineering, cost optimization, rag, llmlingua
---
Your prompt is ten thousand tokens long. **What if most of them don't matter?** Chain-of-thought examples, few-shot demos and retrieved documents make prompts long; the LLMLingua paper notes that prompts are "becoming increasingly lengthy, even exceeding tens of thousands of tokens."

## Why long prompts hurt

Microsoft's LLMLingua project lists the costs: "Longer prompts, however, can result in 1) increased API response latency, 2) exceeded context window limits," and also "expensive API bills, and 5) performance issues such as "lost in the middle.""

Prompt compression attacks that directly: remove the tokens the model doesn't need before the prompt is sent.

## How LLMLingua works

LLMLingua uses a small language model, "such as GPT2-small or LLaMA-7B," and "identifies and removes unimportant tokens from prompts." The project page describes the signal it uses: "Identify and remove non-essential tokens in prompts using perplexity from a SLM." In general terms, tokens the small model finds easy to predict carry little new information, so they are the first to go.

Three pieces make it work:

- **A budget controller.** It allocates "different budgets, i.e., compression ratio, to different components in a prompt," so the instruction, the examples and the question are not cut equally.
- **Iterative token-level compression.** The blog describes "an iterative token-level compression approach, refining the individual relationships between tokens."
- **Distribution alignment.** The small model is fine-tuned "to capture the distribution information from different closed LLMs," through instruction tuning.

The result, per the paper: "up to 20x compression with little performance loss."

## Strange to read, fine for the model

The output is not pretty. "Although the token-level compressed prompts may be difficult for humans to understand, they prove highly effective for LLMs." When the team asked GPT-4 to restore compressed prompts, "it successfully recovered all key reasoning information."

## LongLLMLingua and LLMLingua-2

LongLLMLingua is "a prompt-compression technique designed for long-context scenarios, such as retrieval-augmented question-answering tasks." It uses a question-aware, coarse-to-fine approach, and the project page reports "a 17.1% performance improvement with 4x compression."

LLMLingua-2 changes the method. It uses "a data distillation procedure to derive knowledge from an LLM to compress prompts," with GPT-4 as the teacher, and treats "prompt compression as a token classification problem": keep or drop each token, using "a BERT-level encoder" that sees the full bidirectional context. The paper reports it is "3x-6x faster than existing prompt compression methods."

LLMLingua "has been integrated into LangChain and LlamaIndex, two widely-used RAG frameworks."

## Trying it on your app

General practice: start where prompts are longest and most repetitive, such as retrieved RAG context or few-shot examples. Keep instructions and the user's question intact, measure token savings, and compare answers before and after on a test set, because a ratio that is safe for one task can drop a key fact in another.

> Cut the filler. Keep the meaning.

## Sources

- [Microsoft Research blog: LLMLingua, innovating LLM efficiency with prompt compression](https://www.microsoft.com/en-us/research/blog/llmlingua-innovating-llm-efficiency-with-prompt-compression/)
- [arXiv: LLMLingua, Compressing Prompts for Accelerated Inference of Large Language Models](https://arxiv.org/abs/2310.05736)
- [Microsoft Research: LLMLingua project](https://www.microsoft.com/en-us/research/project/llmlingua/)
- [arXiv: LLMLingua-2, Data Distillation for Efficient and Faithful prompt compression](https://arxiv.org/abs/2403.12968)
