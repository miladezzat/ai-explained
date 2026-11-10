---
title: Structured outputs: guaranteed JSON from LLMs
slug: structured-outputs
description: You asked for JSON and got JSON plus a friendly sentence that broke your parser. Structured outputs use constrained decoding so the answer always matches your schema.
date: 2026-11-04
series: ai-explained
youtube: NrFLkKn1SMA
facebook: https://facebook.com/reel/1139014675208317
instagram: https://www.instagram.com/p/DfUdS0pkWQw/
tags: structured outputs, json schema, llm, constrained decoding, tool use
---
You asked the AI for JSON. It gave you JSON, plus a friendly sentence at the top that broke your parser. **Structured outputs** fix that for good.

## The problem

Apps need data in an exact shape: the right fields, the right types, every single time. Asking nicely in the prompt helps, but the model can still miss a field, invent one, or add chatter around it.

## JSON mode vs structured outputs

**JSON mode** was the first fix. It guarantees valid JSON, but, as OpenAI notes, it "does not guarantee that the model's response will conform to a particular schema".

**Structured outputs** go further: you send a JSON Schema, and the answer **must** match it.

## How it works: constrained decoding

At every step of generation, tokens that would break the schema are blocked. OpenAI turns your schema into a grammar, and the engine sets the probability of any invalid token to zero. The model literally can't produce a wrong shape.

The difference is big. In OpenAI's 2024 evals, `gpt-4o-2024-08-06` with structured outputs matched complex schemas **100%** of the time. An older GPT-4 scored **under 40%**.

Claude has the same feature: **JSON outputs** for responses, and **strict tool use** for tool inputs, both using constrained decoding.

## In code

SDKs let you pass a Pydantic (Python) or Zod (TypeScript) class and get a typed object back:

```python
class Refund(BaseModel):
    order_id: str
    amount: float
    reason: str

# pass Refund as the output format; the exact call varies by SDK
refund = parse_response(..., output_format=Refund)  # a typed Refund object
```

For agents, strict tool use matters even more: the tool name and arguments always fit your definition.

## The catches

- **The model can still refuse.** Then you get a refusal, not your JSON, so handle that case.
- **Only part of JSON Schema is supported.** Some keywords, like numeric minimums and maximums on Claude, are skipped.
- **The first request with a new schema can be slower** while the grammar is built. After that it's cached.
- **The shape is guaranteed, the meaning isn't.** Still check that the values make sense.

## Tips

Keep schemas small and flat, and describe each field so the model knows what goes where.

> Don't ask for JSON. Require it.

## Sources

- [OpenAI, Introducing Structured Outputs in the API (2024-08-06)](https://openai.com/index/introducing-structured-outputs-in-the-api/)
- [OpenAI Structured Outputs guide](https://developers.openai.com/api/docs/guides/structured-outputs)
- [Claude docs, Structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs)
