---
title: Agent tracing: see every step your agent takes
slug: agent-tracing
description: Your agent gave a wrong answer. Which step went wrong? Tracing records every model call and tool call as spans in a tree, so you can debug speed, cost and mistakes.
date: 2026-11-01
series: ai-explained
youtube: YxXO-UgzFGc
facebook: https://facebook.com/reel/1530908718875281
instagram: https://www.instagram.com/p/DfMShnhl5k9/
tags: agent tracing, observability, opentelemetry, ai agents, debugging
---
Your agent gave a customer the wrong answer. Which step went wrong? It made six model calls and four tool calls. Without **tracing**, you'll never know.

## What tracing records

Agent tracing records everything your agent does in one run: every model call, every tool call, every decision. Normal logs are just lines of text. Agents take many steps, and you need to see how those steps connect.

## Traces and spans

- A **trace** is one full run, from the user's request to the final answer.
- A trace is made of **spans**. A span is one step, with a start time, an end time and a **parent**, so the steps form a tree.

```text
agent run                     6.2 s
├─ model call: plan           1.1 s
├─ tool call: search_orders   0.4 s
├─ tool call: get_policy      3.9 s   ← the slow one
└─ model call: answer         0.8 s
```

Each span stores what you need to debug: the model, the input and output, the tokens used, and any error.

## Three questions tracing answers

**Why is it slow?** Look at the timeline and find the one step that takes most of the time.

**Why is it expensive?** Add up the tokens per span and find the call that burns most of your budget.

**Why is the answer wrong?** Open the trace and read exactly what the model saw and what each tool returned. Often the model was fine; a tool returned the wrong data.

## Tools and standards

Many agent frameworks trace by default. The OpenAI Agents SDK records model calls, tool calls, handoffs and guardrails out of the box.

There's also an open standard in progress: **OpenTelemetry's GenAI semantic conventions**, with operations like `invoke_agent` and `execute_tool` and attributes for the model and token counts. Using the standard lets you send traces to the observability tool you already use, instead of getting locked in.

## Careful with user data

Traces can hold everything users typed. The OpenAI SDK records inputs and outputs by default (you can turn that off). OpenTelemetry does the opposite: message content is only captured if you opt in. Decide on purpose.

## Connect traces to evals

When an eval fails, the trace shows you why. Together they turn "it's broken" into "step three got the wrong policy".

> If you can't see it, you can't fix it.

## Sources

- [OpenAI Agents SDK, Tracing](https://openai.github.io/openai-agents-python/tracing/)
- [OpenTelemetry GenAI semantic conventions (Status](https://github.com/open-telemetry/semantic-conventions-genai)
