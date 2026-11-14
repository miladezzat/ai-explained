---
title: Fill-in-the-middle: how code autocomplete sees both sides
slug: fill-in-the-middle
description: How fill-in-the-middle (FIM) training lets code models use the code above and below your cursor, from the 2022 paper to Code Llama, StarCoder2 and Ollama's suffix.
date: 2026-11-14
series: ai-explained
youtube: 0FMNWi2fi9M
facebook: https://facebook.com/reel/2285302412249707
instagram: https://www.instagram.com/p/DfuM8vEF4hi/
tags: fill-in-the-middle, code completion, llm, code llama, ai coding
---
Your cursor sits in the middle of a function. How does the model see the code *below* it?

## The left-to-right problem

A normal language model reads left to right. Given everything before your cursor, it predicts what comes next, and it never sees the code after. But that code matters: the `return` statement, the closing brace, the next call.

## The fix: fill in the middle

In 2022, an OpenAI paper by Bavarian et al., [*Efficient Training of Language Models to Fill in the Middle*](https://arxiv.org/abs/2207.14255), showed a simple fix called **fill-in-the-middle (FIM)**:

1. Cut a training file into three pieces: **prefix**, **middle** and **suffix**.
2. Move the middle to the end.
3. Train as usual.

The model still predicts tokens left to right. It just reads the suffix *before* it writes the middle.

## Special tokens

Sentinel tokens mark the parts:

```
<PRE> def area(r):
<SUF>     return result
<MID>     result = 3.14 * r * r <EOT>
```

At inference, the prompt ends right after `<MID>`, and the model writes until it emits the end token. With the prefix `def area(r):` and the suffix `return result`, it writes the math in between.

The split happens on **characters**, before tokenizing, so a cut can land in the middle of a word, just like a real cursor.

## FIM for free

The paper transformed half of the training documents (a FIM rate of 0.5) and found that it "does not harm the original left-to-right generative capability." The authors call this property **FIM-for-free**: you gain infilling without losing normal completion.

## Where you'll find it

| Model or tool | FIM support |
|---|---|
| Code Llama 7B, 13B, 70B | Infilling supported (34B not listed) |
| StarCoder2 | Trained with the FIM objective |
| Ollama `/api/generate` | Takes a `prompt` and a `suffix` |

```json
{"model": "codellama:code", "prompt": "def compute_gcd(a, b):", "suffix": "    return result"}
```

## In your editor

Your editor sends the code above the cursor as the prefix and the code below as the suffix, then shows the generated middle as ghost text. Good completions also need context, like imports and nearby files, packed into that prefix.

> See both sides, fill the gap.

## Sources

- [Bavarian et al., Efficient Training of Language Models to Fill in the Middle (2022)](https://arxiv.org/abs/2207.14255)
- [Rozière et al., Code Llama: Open Foundation Models for Code](https://arxiv.org/abs/2308.12950)
- [BigCode: StarCoder2-15B model card](https://huggingface.co/bigcode/starcoder2-15b)
- [Ollama API: generate a completion](https://github.com/ollama/ollama/blob/main/docs/api.md)
