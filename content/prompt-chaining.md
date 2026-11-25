---
title: Prompt chaining: one job per call
slug: prompt-chaining
description: Prompt chaining splits one overloaded prompt into a sequence of small LLM calls, with checks between them. How it works, when to use it, and when not to.
date: 2026-11-25
series: ai-explained
youtube: et88BbpM7HY
facebook: https://facebook.com/reel/3151578158364921
instagram: https://www.instagram.com/p/DgKF0s8j7nG/
tags: llm, prompt engineering, ai agents, workflows, ai engineering
---
One giant prompt, ten jobs, and the output is a mess. **Split it into a chain.**

## What prompt chaining is

Anthropic's definition, from *Building effective agents*: "Prompt chaining decomposes a task into a sequence of steps, where each LLM call processes the output of the previous one."

Their two examples:

- "Writing an outline of a document, checking that the outline meets certain criteria, then writing the document based on the outline."
- "Generating Marketing copy, then translating it into a different language."

## Why it works

"The main goal is to trade off latency for higher accuracy, by making each LLM call an easier task." One focused job per call beats ten jobs in one.

It fits best when "the task can be easily and cleanly decomposed into fixed subtasks."

## Add gates

Between steps, "You can add programmatic checks... on any intermediate steps to ensure that the process is still on track." Anthropic calls these gates. For example, if the outline is missing a required section, retry that step before you spend a call writing the whole document (general practice).

## Inspect every step

Claude's prompting guide gives the practical payoff: "Each step is a separate API call so you can log, evaluate, or branch at any point."

It also names the most common chain: "self-correction: generate a draft → have Claude review it against criteria → have Claude refine based on the review."

## Practical tips

General practice, from building these pipelines:

- **Structured handoffs.** Pass each step's output in a predictable shape, like XML-tagged text or JSON, so the next prompt knows exactly what it received and your gate can check it in code.
- **Right-size the model.** A small, fast model is often enough for a check or a classification step; save the bigger model for the step that writes.
- **Test steps separately.** Because each step has one job, you can write evals for each one.

## Workflow, not agent

Anthropic separates the two. "Workflows are systems where LLMs and tools are orchestrated through predefined code paths." Agents "dynamically direct their own processes and tool usage." A chain is a workflow: the path is fixed in advance, which makes it simpler to test and debug than an agent that decides its own steps.

## Do you still need it?

Models have changed. Claude's guide notes that "With adaptive thinking and subagent orchestration, Claude handles most multistep reasoning internally." Explicit chaining "is still useful when you need to inspect intermediate outputs or enforce a specific pipeline structure."

So follow Anthropic's broader advice: find "the simplest solution possible, and only [increase] complexity when needed."

> Small steps. Checked handoffs.

## Sources

- [Anthropic: Building effective agents](https://www.anthropic.com/research/building-effective-agents)
- [Claude docs: Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)
