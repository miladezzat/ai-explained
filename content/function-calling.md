---
title: Function calling: how AI uses tools
slug: function-calling
description: Language models only write text. Function calling lets them ask your code to run a tool, like a weather API, and answer with real data.
date: 2026-10-27
series: ai-explained
youtube: rWvG_wSRM3g
facebook: https://facebook.com/reel/2213552355889197
tags: function calling, tool use, llm, ai agents, json schema
---
A language model can only write text. So how does it tell you today's weather in Cairo? It can't open a browser or call an API. It can do something smarter: ask *your* code to do it. That's function calling, also called tool use.

## Step 1: describe your tools

With every request, you send the model a list of tools. Each one has a name, a short description and the inputs it takes, written as a JSON Schema:

```json
{
  "name": "get_weather",
  "description": "Current weather for a city",
  "input_schema": {
    "type": "object",
    "properties": { "city": { "type": "string" } },
    "required": ["city"]
  }
}
```

## Step 2: the model asks for a call

Now ask "What's the weather in Cairo?" Instead of guessing, the model replies with a structured request: call `get_weather` with `{"city": "Cairo"}`. It picks the tool and fills in the arguments, but it doesn't run anything.

As OpenAI's docs put it, "the model does not run the function itself". Anthropic's API works the same way: Claude returns a `tool_use` block, and your app runs it.

## Step 3: your code runs it

Your application reads that request, calls the real weather API, and sends the result back to the model as a tool result, for example `{"temp_c": 24, "sky": "sunny"}`.

## Step 4: the model answers with real data

With the result in its context, the model writes the final answer: "It's 24°C and sunny in Cairo right now." No guessing, no made-up numbers.

## Why this matters

Function calling is the building block behind almost every AI feature that *does* something:

- looking up live data (prices, orders, weather),
- taking actions (sending an email, creating a ticket),
- and agents, which are really a loop of tool calls until a goal is done.

It also keeps you in control. The model only proposes a call. Your code decides whether to run it, checks the arguments, and can ask a human first for risky actions.

> The model asks. Your code acts.

## Sources

- [OpenAI function calling guide](https://developers.openai.com/docs/guides/function-calling)
- [Anthropic, Tool use (also called function calling)](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)
