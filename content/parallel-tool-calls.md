---
title: Parallel tool calls: many tools in one agent turn
slug: parallel-tool-calls
description: How LLM agents request several tools in one response, how to send the results back correctly, and when to turn parallel tool calls off in the Claude and OpenAI APIs.
date: 2026-11-21
series: ai-explained
youtube: TNQ43_cuI58
facebook: https://facebook.com/reel/1095493316878408
instagram: https://www.instagram.com/p/Df_ylKRDtEL/
tags: ai agents, tool use, function calling, llm, ai engineering
---
Ask an agent for the weather in three cities. Does it need three trips? **Not with parallel tool calls.**

## One at a time vs all at once

Without parallel tool calls, an agent runs one tool, waits for a full round trip, then runs the next. Three cities means three model turns.

With parallel tool calls, the model asks for several tools in a single response: one turn, three requests. This is the default today. Claude's docs say: "By default, Claude may call multiple tools in a single response." OpenAI's models do the same unless you switch it off.

## What the response looks like

In Claude's API, the response stops with `stop_reason: "tool_use"` and contains several `tool_use` blocks, one per call. The docs are explicit that "The API doesn't prescribe an execution order," so you're free to run the calls concurrently and skip the waiting.

## Sending the results back

This is where most bugs live. The rules from Claude's docs:

- Return **one `tool_result` for each `tool_use` block**, all together in the next user message.
- Each result is matched to its call by **`tool_use_id`**.
- Put every `tool_result` block **before any text** in that message.
- If you skipped a call, still return a result for it, with **`is_error: true`**.

The most common mistake is sending a separate message for each result. According to Anthropic, that pattern "teaches Claude to avoid parallel calls," so your agent slowly loses the speed-up.

## Only batch independent calls

Parallel calls only make sense when the calls don't depend on each other. The docs put it plainly: "Only batch tool calls that are independent of each other." If one call needs another's output, it has to wait for the next turn.

Want the model to parallelize more? Anthropic suggests a system prompt line along the lines of: "invoke all relevant tools simultaneously rather than sequentially."

## Turning it off

Sometimes you want exactly one call per turn.

- **Claude API:** set `disable_parallel_tool_use: true` inside the `tool_choice` object. With `auto`, Claude then calls at most one tool in each response.
- **OpenAI API:** set `parallel_tool_calls: false`, and the model calls at most one function per request (announced in June 2024).

## When to use which

A few rules of thumb (general practice, not rules from the sources):

- **Turn it off** when calls change shared state, like two writes to the same record, where order matters.
- **Leave it on** otherwise. Fewer round trips means lower latency and faster agents.
- **Run the calls concurrently** in your own code, or you keep the extra waiting anyway.

> Independent calls? Make them together.

## Sources

- [Claude docs: Parallel tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/parallel-tool-use)
- [OpenAI developer community: disable parallel function calling via parallel_tool_calls: false](https://community.openai.com/t/new-api-feature-disable-parallel-function-calling-via-parallel-tool-calls-false/805405)
